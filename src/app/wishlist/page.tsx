"use client"

import { useStore } from "@nanostores/react";
import { Box, Button, Container, /* GridLegacy as  */Grid, Typography } from "@mui/material";
import ProductDetails from "@/components/productPage";
import { wishlistStore } from "../../../stores/wishlist-store";

export default function WishlistPage() {
    const wishlist = useStore(wishlistStore);
  
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Избранное
        </Typography>
  
        {Object.keys(wishlist).length === 0 ? (
          <Box textAlign="center" py={10}>
            <Typography variant="h6" gutterBottom>
              Ваш список избранного пуст
            </Typography>
            <Button
              variant="contained"
              href="/catalog"
              sx={{ mt: 2 }}
            >
              Перейти в каталог
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {Object.values(wishlist).map((product) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                lg={3}
                key={product.id}
                sx={{
                  display: 'flex', // Добавляем flex
                  flexDirection: 'column' // Для правильного растягивания
                }}
              >
                <Box sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <ProductDetails product={product} />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    );
  }
