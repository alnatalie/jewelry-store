"use client";
import Image from "next/image";
import {useStore} from '@nanostores/react';
import classes from "./productCard.module.css";

import { errorStore, isLoadingStore, productStore } from "../../../stores/product";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";



export function SearchProducts() {
  const products = useStore(productStore);
  const isLoading = useStore(isLoadingStore);
  const error = useStore(errorStore);

  if(isLoading) return <div>Загрузка...</div>; //Здесь сделать спиннер!!!!
  if(error) return <div>Ошибка:{error}</div>;
  if(!products.length) return <div>Товары не найдены</div>

  return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
        {products.map((p) => (
          <Card
            key={p.id}
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <CardActionArea component={Link} href={`/products/${p.id}`}>
            <CardMedia component="img"
            height="350"
            image={p.img}
            alt={p.name}
            sx={{objectFit: 'contain', p:2}}/>

            <CardContent sx={{flexGrow:1}}>
              <Typography gutterBottom variant="h5" component="div">
                {p.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {p.description.substring(0,100)}...
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="h6">{p.price}</Typography>
            </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
  );
}
