
import Image from "next/image";
import { Product } from "@/shared/entities/Product";
import { remult } from "remult";
// import { initApi } from "remult/next";
import { Box, Button, Chip, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import { AddToCartButton } from "@/components/buttons/cartButton";




export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  // await initApi();

  const product = await remult.repo(Product).findId(Number(params.id), {
    include: {
      category: true,
      material: true,
    }
  })

  if (!product) return (
    <Container maxWidth="lg">
      <Typography variant="h4">Товар не найден</Typography>
    </Container>

  ) 

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
    <Paper elevation={3} sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {/* Изображение товара */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '400px',
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <Image
              src={product.img}
              alt={product.name}
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Box>
        </Grid>

        {/* Информация о товаре */}
        <Grid item xs={12} md={6} component="div">
          <Typography variant="h3" component="h1" gutterBottom>
            {product.name}
          </Typography>

          <Chip
            label={`${product.price} ₽`}
            color="primary"
            sx={{ fontSize: '1.2rem', p: 1.5, mb: 3 }}
          />

          <Divider sx={{ my: 3 }} />

          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          {/* Характеристики */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>Характеристики:</Typography>
            <Typography>Материал: {product.material?.name}</Typography>
            <Typography>Категория: {product.category?.name}</Typography>
          </Box>

          {/* Кнопка добавления в корзину */}
          <AddToCartButton product={product} />
        </Grid>
      </Grid>
    </Paper>
  </Container>

   
  );
}


