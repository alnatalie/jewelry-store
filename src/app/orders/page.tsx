'use client'
import { Container, Typography, Box, Button } from "@mui/material";
import { remult } from "remult";
import Link from "next/link";

export default function OrdersPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Мои заказы
      </Typography>
      {remult.authenticated() ? (
        <Box>
          <Typography>Здесь будут ваши заказы</Typography>
        </Box>
      ) : (
        <Box textAlign="center">
          <Typography paragraph>Для просмотра заказов необходимо авторизоваться</Typography>
          <Button 
            variant="contained" 
            component={Link}
            href="/api/auth/signin"
          >
            Войти
          </Button>
        </Box>
      )}
    </Container>
  );
}