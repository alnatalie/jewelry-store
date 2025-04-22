"use client";

import {useStore} from '@nanostores/react';


import { errorStore, isLoadingStore, productStore } from "../../../stores/product";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';



export function SearchProducts() {
  const products = useStore(productStore);
  const isLoading = useStore(isLoadingStore);
  const error = useStore(errorStore);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true);
  }, []);

  if(!isMounted) {
    return <div style={{height:'4px'}}></div>;
  }
  if(isLoading) return <div><LinearProgress color="inherit"/></div>; 
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
