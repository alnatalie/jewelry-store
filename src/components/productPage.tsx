'use client'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Product } from "@/shared/entities/Product";
import toast, { Toaster } from "react-hot-toast";
import { addToCart } from "../../stores/cart-of-product";
import { remult } from "remult";
import {
  wishlistStore,
  addToWishList,
  removeFromWhishlist,
} from "../../stores/wishlist-store";
import { useStore } from "@nanostores/react";


export default function ProductDetails({ product }: { product: Product }) {
  const whishlist = useStore(wishlistStore);
  const isFavorite  = !!whishlist[product.id];

  const handleAddToCart = async () => {
    try {
      if (!remult.authenticated()) {
        toast.error("Для добавления в корзину необходимо авторизоваться", {
          position: "top-center",
          duration: 3000,
        });
        return;
      }
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
      });
      toast.success(`${product.name} добавлен в корзину`, {
        position: "top-center",
        duration: 2000,
        style: {
          backgroundColor: "#4caf50",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#4caf50",
        },
      });
    } catch (error) {
      toast.error("Не удалось добавить товар в корзину");
    }
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromWhishlist(product.id)
      toast("Товар удален из избранного", {
        position: "top-center",
        duration: 2000,
        icon: "🗑️",
        style: {
          backgroundColor: "#ff9800",
          color: "#fff",
        },
      });
  
    } else {
      addToWishList(product)
      toast.success("Товар добавлен в избранное", {
        position: "top-center",
        duration: 2000,
        style: {
          backgroundColor: "#4caf50",
          color: "#fff",
        },
      });
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 4 }}
    >
      <Toaster />
      <Paper
        elevation={3}
        sx={{ p: 4 }}
      >
        <Grid
          container
          spacing={4}
        >
          {/* Изображение товара */}
          <Grid
            item
            xs={12}
            md={6}
          >
            <Box
              component="img"
              src={product.img}
              alt={product.name}
              sx={{
                width: "100%",
                height: "400px",
                objectFit: "contain",
                backgroundColor: "#f5f5f5",
              }}
            />
          </Grid>

          {/* Информация о товаре */}
          <Grid
            item
            xs={12}
            md={6}
            component="div"
          >
            <Typography
              variant="h4"
              component="h3"
              gutterBottom
            >
              {product.name}
            </Typography>

            <Typography
              variant="h5"
              component="p"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                mb: 3,
              }}
            >
              {product.price} ₽
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography
              variant="body1"
              paragraph
            >
              {product.description}
            </Typography>

            {/* Характеристики */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                gutterBottom
              >
                Характеристики:
              </Typography>
              <Typography>Материал: {product.material?.name}</Typography>
              <Typography>Тип изделия: {product.category?.name}</Typography>
            </Box>

            {/* Кнопки */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {/* Кнопка добавления в корзину */}
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "grey.700",
                  "&:hover": {
                    backgroundColor: "grey.800",
                  },
                  flexGrow: 1,
                }}
                onClick={handleAddToCart}
              >
                Добавить в корзину
              </Button>

              {/* Кнопка добавления в избранное */}
              <IconButton
                aria-label="add to favorites"
                onClick={handleToggleFavorite}
                sx={{
                  border: "1px solid",
                  borderColor: isFavorite ? "transparent" : "grey.400",
                  backgroundColor: isFavorite ? "error.main" : "transparent",
                  "&:hover": {
                    backgroundColor: isFavorite ? "error.dark" : "grey.100",
                  },
                  width: 48,
                  height: 48,
                }}
              >
                {isFavorite ? (
                  <FavoriteIcon sx={{ color: "white" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: "grey.700" }} />
                )}
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
