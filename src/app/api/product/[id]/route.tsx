import { Product } from "@/shared/entities/Product";
import { remult } from "remult";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const productId = Number(params.id);

  if (isNaN(productId)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
  }

  try {
    const product = await remult.repo(Product).findOne({
      where: { id: productId },
      include: {
        category: true,
        material: true,
        size: true,
      },
    });

    if (!product) {
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    }

    return Response.json(product);
  } catch (error) {
    console.error("Ошибка загрузки товара:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
