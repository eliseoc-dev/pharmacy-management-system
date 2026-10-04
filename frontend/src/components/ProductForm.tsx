import { useState } from "react";

import type { ProductCreate } from "../types/product";

interface ProductFormProps {
  onCreate: (product: ProductCreate) => Promise<void>;
}

function ProductForm({
  onCreate,
}: ProductFormProps) {
  const [form, setForm] = useState<ProductCreate>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    minimum_stock: 0,
    category: "",
    supplier: "",
    expiration_date: "",
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value, type } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "number"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    await onCreate({
      ...form,
      description: form.description || null,
      supplier: form.supplier || null,
      expiration_date:
        form.expiration_date || null,
    });

    setForm({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      minimum_stock: 0,
      category: "",
      supplier: "",
      expiration_date: "",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="description"
        placeholder="Description"
        value={form.description ?? ""}
        onChange={handleChange}
      />

      <input
        name="price"
        type="number"
        step="0.01"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />

      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        required
      />

      <input
        name="minimum_stock"
        type="number"
        placeholder="Minimum stock"
        value={form.minimum_stock}
        onChange={handleChange}
        required
      />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />

      <input
        name="supplier"
        placeholder="Supplier"
        value={form.supplier ?? ""}
        onChange={handleChange}
      />

      <input
        name="expiration_date"
        type="date"
        value={form.expiration_date ?? ""}
        onChange={handleChange}
      />

      <button type="submit">
        Create product
      </button>
    </form>
  );
}

export default ProductForm;