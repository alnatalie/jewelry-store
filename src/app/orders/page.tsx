'use client'
import { Container, Typography, Box, Button, LinearProgress, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { remult } from "remult";
import Link from "next/link";
import { useStore } from "@nanostores/react";
import { errorOrderStore, isLoadingOrderStore, orderStore } from "../../../stores/order-store";

export default function OrdersPage() {
  const orders = useStore(orderStore);
  const isLoading = useStore(isLoadingOrderStore);
  const error = useStore(errorOrderStore);

  if(isLoading) return <LinearProgress />
  if(error) return <Typography color="error">{error}</Typography>;


  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        История заказов
      </Typography>

      {orders.length === 0 ? (
        <Typography>У вас пока нет заказов</Typography>
      ) : (
        orders.map(order => (
          <Paper key={order.id} elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Заказ #{order.id.substring(0, 8)} от {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Сумма: {order.totalAmount.toFixed(2)} ₽
            </Typography>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Товар</TableCell>
                    <TableCell align="right">Цена</TableCell>
                    <TableCell align="right">Количество</TableCell>
                    <TableCell align="right">Сумма</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell align="right">{item.price.toFixed(2)} ₽</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{(item.price * item.quantity).toFixed(2)} ₽</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ))
      )}
    </Container>
  );
}