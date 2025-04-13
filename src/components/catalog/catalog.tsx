"use client";
import Image from "next/image";
import { Product } from "@/shared/entities/Product";
import { useEffect, useState } from "react";
import { remult } from "remult";
import classes from "./productCard.module.css";
import useSWR from "swr";

const API_URL = "http://localhost:3000/catalog";

export function SearchProducts() {
  const { data, error, isLoading, isValidating } = useSWR(API_URL, {
    revalidateOnFocus: false,
  });

  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    remult.repo(Product).find().then(setProducts);
  }, []);

  return (
    <>
      <div className={classes.flex}>
        {products.map((p) => (
          <div
            key={p.id}
            className={classes.productCard}
          >
            <Image
              src={p.img}
              alt={p.name}
              width={250}
              height={300}
            />
            <h3>{p.name}</h3>
            <span>{p.description}</span>
            <span>{p.price}</span>
          </div>
        ))}
      </div>
    </>
  );
}
