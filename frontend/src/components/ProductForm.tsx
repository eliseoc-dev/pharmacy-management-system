import {
  useEffect,
  useState,
} from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import type {
  Product,
  ProductCreate,
} from "../types/product";


interface ProductFormProps {
  editingProduct: Product | null;

  onCreate: (
    product: ProductCreate
  ) => Promise<void>;

  onUpdate: (
    productId: number,
    product: ProductCreate
  ) => Promise<void>;

  onCancelEdit: () => void;
}


const EMPTY_FORM: ProductCreate = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  minimum_stock: 0,
  category: "",
  supplier: "",
  expiration_date: "",
};


function ProductForm({
  editingProduct,
  onCreate,
  onUpdate,
  onCancelEdit,
}: ProductFormProps) {
  const [form, setForm] =
    useState<ProductCreate>(EMPTY_FORM);


  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        description:
          editingProduct.description ?? "",
        price: Number(editingProduct.price),
        stock: editingProduct.stock,
        minimum_stock:
          editingProduct.minimum_stock,
        category: editingProduct.category,
        supplier:
          editingProduct.supplier ?? "",
        expiration_date:
          editingProduct.expiration_date ?? "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editingProduct]);


  function handleChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const {
      name,
      value,
      type,
    } = event.target;

    setForm((current) => ({
      ...current,

      [name]:
        type === "number"
          ? Number(value)
          : value,
    }));
  }


  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const cleanProduct: ProductCreate = {
      ...form,

      description:
        form.description || null,

      supplier:
        form.supplier || null,

      expiration_date:
        form.expiration_date || null,
    };


    if (editingProduct) {
      await onUpdate(
        editingProduct.id,
        cleanProduct
      );
    } else {
      await onCreate(cleanProduct);
    }


    setForm(EMPTY_FORM);
  }


  return (
    <section className="panel product-form-panel">
      <div className="panel-header">
        <div>
          <h2>
            {editingProduct
              ? "Edit Product"
              : "Add Product"}
          </h2>

          <p>
            {editingProduct
              ? `Editing product #${editingProduct.id}`
              : "Register a new pharmacy product"}
          </p>
        </div>
      </div>


      <form
        className="product-form"
        onSubmit={handleSubmit}
      >
        <label>
          Product name

          <input
            name="name"
            placeholder="Paracetamol 500mg"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>


        <label>
          Description

          <input
            name="description"
            placeholder="Product description"
            value={form.description ?? ""}
            onChange={handleChange}
          />
        </label>


        <label>
          Price

          <input
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>


        <label>
          Current stock

          <input
            name="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </label>


        <label>
          Minimum stock

          <input
            name="minimum_stock"
            type="number"
            min="0"
            value={form.minimum_stock}
            onChange={handleChange}
            required
          />
        </label>


        <label>
          Category

          <input
            name="category"
            placeholder="Analgesics"
            value={form.category}
            onChange={handleChange}
            required
          />
        </label>


        <label>
          Supplier

          <input
            name="supplier"
            placeholder="Supplier name"
            value={form.supplier ?? ""}
            onChange={handleChange}
          />
        </label>


        <label>
          Expiration date

          <input
            name="expiration_date"
            type="date"
            value={
              form.expiration_date ?? ""
            }
            onChange={handleChange}
          />
        </label>


        <div className="form-actions">
          <button
            className="primary-button"
            type="submit"
          >
            {editingProduct
              ? "Save changes"
              : "Create product"}
          </button>


          {editingProduct && (
            <button
              className="secondary-button"
              type="button"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}


export default ProductForm;