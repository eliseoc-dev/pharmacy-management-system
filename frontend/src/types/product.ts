export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string;
  stock: number;
  minimum_stock: number;
  category: string;
  supplier: string | null;
  expiration_date: string | null;
  created_at: string;
}

export interface ProductCreate {
  name: string;
  description: string | null;
  price: number;
  stock: number;
  minimum_stock: number;
  category: string;
  supplier: string | null;
  expiration_date: string | null;
}