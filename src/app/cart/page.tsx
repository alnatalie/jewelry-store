"use client";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Divider,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  LinearProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useStore } from "@nanostores/react";

import { toast } from "react-hot-toast";
import {
  cartStore,
  clearCart,
  errorStore,
  isLoadingStore,
  removeFromCart,
} from "../../../stores/cart-of-product";
import { useRouter } from "next/navigation";
import { createOrder } from "../../../stores/order-store";
import { remult } from "remult";

export default function CartPage() {
  const router = useRouter();
  const cartItems = useStore(cartStore);
  const isLoading = useStore(isLoadingStore);
  const error = useStore(errorStore);

  if (!remult.authenticated()) {
    return (
        <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
                Пожалуйста, авторизуйтесь, чтобы просмотреть корзину
            </Typography>
            <Button 
                variant="contained" 
                onClick={() => router.push('/api/auth/signin')}
                sx={{ mt: 2 }}
            >
                Войти
            </Button>
        </Container>
    );
}

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.price || item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  

  const handleRemoveItem = async (itemId: string) => {
    await removeFromCart(itemId);
    toast.success("Товар удален из корзины");
  };

  const handleCheckout = async () => {
    try {
      if (cartItems.length === 0) {
        toast.error("Корзина пуста");
        return;
      }
  
      toast.loading("Оформление заказа...", { id: "checkout" });
  
      //Создаем заказ
      const newOrder = await createOrder(cartItems);
      
      //очищаем корзину только после успешного создания заказа
      await clearCart();
  
      toast.success(`Заказ #${newOrder.id.substring(0, 8)} успешно оформлен!`, { 
        id: "checkout",
        duration: 4000 
      });
  
      //Перенаправление на страницу заказов
      router.push("/orders");
      router.refresh(); //обновляем данные на странице заказов
    } catch (error) {
      console.error("Ошибка оформления заказа:", error);
      toast.error(
        error instanceof Error ? error.message : "Ошибка при оформлении заказа",
        { id: "checkout" }
      );
    }
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container
      maxWidth="md"
      sx={{ py: 4 }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Корзина
      </Typography>

      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          xs={12}
          md={8}
        >
          <TableContainer
            component={Paper}
            elevation={3}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Товар</TableCell>
                  <TableCell align="right">Цена</TableCell>
                  <TableCell align="right">Количество</TableCell>
                  <TableCell align="right">Сумма</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => {
                  const price = item.price || item.product?.price || 0;
                  const sum = price * item.quantity;

                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Typography>{item.product?.name || "Товар"}</Typography>
                      </TableCell>
                      <TableCell align="right">{price.toFixed(2)} ₽</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{sum.toFixed(2)} ₽</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={isLoading}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
        >
          <Paper
            elevation={3}
            sx={{ p: 3 }}
          >
            <Typography
              variant="h6"
              gutterBottom
            >
              Итоговая информация
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                mb={1}
              >
                <Typography>Товары ({cartItems.length})</Typography>
                <Typography>{subtotal.toFixed(2)} ₽</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                display="flex"
                justifyContent="space-between"
              >
                <Typography variant="h6">Итого:</Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  {subtotal.toFixed(2)} ₽
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<ShoppingCartCheckoutIcon />}
              onClick={handleCheckout}
              disabled={cartItems.length === 0 || isLoading}
              sx={{
                py: 1.5,
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              Оформить заказ
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
