import { useEffect, useState } from "react";

import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "./services/productService";
import type {
  Product,
  ProductCreate,
} from "./types/product";


function App() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);


  async function loadProducts() {
    try {
      setLoading(true);
      setError(null);

      const data = await getProducts();

      setProducts(data);

    } catch {
      setError("Could not load products.");

    } finally {
      setLoading(false);
    }
  }


  async function handleCreate(
    product: ProductCreate
  ) {
    try {
      await createProduct(product);
      await loadProducts();

    } catch {
      setError("Could not create product.");
    }
  }


  async function handleDelete(
    productId: number
  ) {
    try {
      await deleteProduct(productId);
      await loadProducts();

    } catch {
      setError("Could not delete product.");
    }
  }


  useEffect(() => {
    loadProducts();
  }, []);


  return (
    <main>
      <h1>
        Pharmacy Management System
      </h1>

      <ProductForm
        onCreate={handleCreate}
      />

      {error && (
        <p>{error}</p>
      )}

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductTable
          products={products}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
}


export default App;