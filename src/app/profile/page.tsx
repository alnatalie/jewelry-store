
"use client";
// import Admin from "@/demo/Admin";
import Auth from "@/demo/auth/Auth";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { remult } from "remult";

export default function ProfilePage() {
  const [user, setUser] = useState(remult.user);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await remult.initUser();
        setUser(remult.user);
      } catch (error) {
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  //обработчик для кнопки выхода
  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
      await remult.initUser();
      setUser(remult.user);
      window.location.href = '/';
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h6">Загрузка...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {user ? (
        <Box>
          <Typography variant="h4" gutterBottom>
            Профиль пользователя
          </Typography>
          <Typography variant="body1" paragraph>
            Вы вошли как: <strong>{user.name}</strong>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignOut}
            sx={{ mt: 2 }}
          >
            Выйти
          </Button>
        </Box>
      ) : showAuth ? (
        <Auth />
      ) : (
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Вход в систему
          </Typography>
          <Typography variant="body1" paragraph>
            Для добавления товаров в корзину необходимо авторизоваться
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowAuth(true)}
            sx={{ mt: 2 }}
          >
            Войти
          </Button>
        </Box>
      )}
    </Container>
  );
}
