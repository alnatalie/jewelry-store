'use client'

'use client'
import { Button } from '@mui/material';

import { toast } from 'react-hot-toast';
import { addToCart } from '../../../stores/cart-of-product';

export function AddToCartButton({ product }: { product: { id: string; name: string; price: number } }) {
  const handleAddToCart = async () => {
    try {
      await addToCart(product);
      toast.success(`${product.name} добавлен в корзину`);
    } catch (error) {
      toast.error('Не удалось добавить в корзину');
    }
  };

  return (
    <Button 
      variant="contained" 
      onClick={handleAddToCart}
    >
      Добавить в корзину
    </Button>
  );
}