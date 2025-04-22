import { Product } from "@/shared/entities/Product";
import { remult } from "remult";
import ProductDetails from "@/components/productPage";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number(params.id);
  if (isNaN(productId)) {
    return <div>Неверный ID товара</div>;
  }

  try {
    const res = await fetch(`${process.env.API_URL || "http://localhost:3000"}/api/product/${productId}`, {
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      return <div>Ошибка: {res.status === 404 ? "Товар не найден" : "Ошибка при загрузке товара"}</div>;
    }

    const product = await res.json();

    return <ProductDetails product={product} />;
  } catch (error) {
    console.error('Ошибка при загрузке товара:', error);
    return <div>Произошла ошибка при загрузке товара</div>;
  }
}