'use client'

import { Button } from "@mui/material";
import { addToCart, useCart } from "../../../stores/cart-of-product";
import { CartItem } from "@/shared/entities/CartItem";

export function AddToCartButton({product} : {product: Omit<CartItem, 'quantity' | 'createdAt'>}){
    const cart = useCart();
    const item = cart[product.id];
  
    return(
      <Button variant="contained"
      size="large"
      // startIcon={AddShoppingCartIcon}
      onClick={()=> addToCart({
        id: product.id,
        name:product.name,
        price:product.price,
      })}
      sx={{mt:2}}>
        {item ? `В корзине (${item.quantity})` : 'Добавить в корзину'}
      </Button>
    )
  
  }