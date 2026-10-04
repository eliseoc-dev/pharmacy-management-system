import type {
  Product,
  ProductCreate,
} from "../types/product";

const API_URL = "http://127.0.0.1:8000";


export async function getProducts(
  search = "",
  category = ""
): Promise<Product[]> {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.append("search", search.trim());
  }

  if (category.trim()) {
    params.append("category", category.trim());
  }

  const query = params.toString();

  const url = query
    ? `${API_URL}/products?${query}`
    : `${API_URL}/products`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  return response.json();
}


export async function getLowStockProducts(): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}/products/alerts/low-stock`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch low-stock products."
    );
  }

  return response.json();
}


export async function getExpiringProducts(
  days = 365
): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}/products/alerts/expiring?days=${days}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch expiring products."
    );
  }

  return response.json();
}


export async function createProduct(
  product: ProductCreate
): Promise<Product> {
  const response = await fetch(
    `${API_URL}/products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create product.");
  }

  return response.json();
}


export async function updateProduct(
  productId: number,
  product: ProductCreate
): Promise<Product> {
  const response = await fetch(
    `${API_URL}/products/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update product.");
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