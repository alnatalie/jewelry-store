import { NextResponse } from 'next/server';

import { Product } from '@/shared/entities/Product';
import { remult } from 'remult';

export async function GET(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const products = await remult.repo(Product).find({
      where: { categoryId: params.categoryId },
      include: { category: true, material: true }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}