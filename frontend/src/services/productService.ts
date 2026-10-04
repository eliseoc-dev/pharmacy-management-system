import type { Product, ProductCreate } from "../types/product";

const API_URL = "http://127.0.0.1:8000";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  return response.json();
}

export async function createProduct(
  product: ProductCreate
): Promise<Product> {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to create product.");
  }

  return response.json();
}

export async function deleteProduct(
  productId: number
): Promise<void> {
  const response = await fetch(
    `${API_URL}/products/${productId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete product.");
  }
}