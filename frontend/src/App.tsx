import {
  useEffect,
  useMemo,
  useState,
} from "react";

import DashboardStats from "./components/DashboardStats";
import ProductFilters from "./components/ProductFilters";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import Sidebar from "./components/Sidebar";

import {
  createProduct,
  deleteProduct,
  getExpiringProducts,
  getLowStockProducts,
  getProducts,
  updateProduct,
} from "./services/productService";

import type {
  Product,
  ProductCreate,
} from "./types/product";


function App() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [lowStockProducts, setLowStockProducts] =
    useState<Product[]>([]);

  const [expiringProducts, setExpiringProducts] =
    useState<Product[]>([]);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);


  async function loadDashboard() {
    try {
      setLoading(true);
      setError(null);

      const [
        productData,
        lowStockData,
        expiringData,
      ] = await Promise.all([
        getProducts(search, category),
        getLowStockProducts(),
        getExpiringProducts(365),
      ]);

      setProducts(productData);
      setLowStockProducts(lowStockData);
      setExpiringProducts(expiringData);

    } catch {
      setError(
        "Could not connect to the pharmacy API."
      );

    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    const timer = setTimeout(() => {
      loadDashboard();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, category]);


  async function handleCreate(
    product: ProductCreate
  ) {
    try {
      setError(null);

      await createProduct(product);

      await loadDashboard();

    } catch {
      setError(
        "Could not create product."
      );
    }
  }


  async function handleUpdate(
    productId: number,
    product: ProductCreate
  ) {
    try {
      setError(null);

      await updateProduct(
        productId,
        product
      );

      setEditingProduct(null);

      await loadDashboard();

    } catch {
      setError(
        "Could not update product."
      );
    }
  }


  async function handleDelete(
    productId: number
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError(null);

      await deleteProduct(productId);

      if (
        editingProduct?.id === productId
      ) {
        setEditingProduct(null);
      }

      await loadDashboard();

    } catch {
      setError(
        "Could not delete product."
      );
    }
  }


  const categories = useMemo(() => {
    return Array.from(
      new Set(
        products.map(
          (product) => product.category
        )
      )
    ).sort();
  }, [products]);


  const totalUnits = products.reduce(
    (total, product) =>
      total + product.stock,
    0
  );


  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <header
          className="page-header"
          id="dashboard"
        >
          <div>
            <span className="eyebrow">
              Inventory Management
            </span>

            <h1>
              Pharmacy Dashboard
            </h1>

            <p>
              Monitor products, inventory
              levels and expiration dates.
            </p>
          </div>
        </header>


        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        <DashboardStats
          totalProducts={products.length}
          lowStock={lowStockProducts.length}
          expiring={expiringProducts.length}
          totalUnits={totalUnits}
        />


        <ProductForm
          editingProduct={editingProduct}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onCancelEdit={() =>
            setEditingProduct(null)
          }
        />


        <section
          className="panel"
          id="products"
        >
          <div className="panel-header">
            <div>
              <h2>Inventory</h2>

              <p>
                Search, filter and manage
                pharmacy products.
              </p>
            </div>
          </div>


          <ProductFilters
            search={search}
            category={category}
            categories={categories}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
            onClear={() => {
              setSearch("");
              setCategory("");
            }}
          />


          {loading ? (
            <div className="loading">
              Loading inventory...
            </div>
          ) : (
            <ProductTable
              products={products}
              onEdit={setEditingProduct}
              onDelete={handleDelete}
            />
          )}
        </section>


        <section
          className="alerts-grid"
          id="alerts"
        >
          <article className="panel">
            <div className="panel-header">
              <div>
                <h2>Low Stock</h2>

                <p>
                  Products below minimum
                  inventory.
                </p>
              </div>
            </div>

            {lowStockProducts.length === 0 ? (
              <p className="success-text">
                No low-stock products.
              </p>
            ) : (
              <div className="alert-list">
                {lowStockProducts.map(
                  (product) => (
                    <div
                      className="alert-item"
                      key={product.id}
                    >
                      <span>
                        {product.name}
                      </span>

                      <strong>
                        {product.stock} left
                      </strong>
                    </div>
                  )
                )}
              </div>
            )}
          </article>


          <article className="panel">
            <div className="panel-header">
              <div>
                <h2>
                  Expiration Alerts
                </h2>

                <p>
                  Products expiring within
                  365 days.
                </p>
              </div>
            </div>

            {expiringProducts.length === 0 ? (
              <p className="success-text">
                No expiration alerts.
              </p>
            ) : (
              <div className="alert-list">
                {expiringProducts.map(
                  (product) => (
                    <div
                      className="alert-item"
                      key={product.id}
                    >
                      <span>
                        {product.name}
                      </span>

                      <strong>
                        {product.expiration_date}
                      </strong>
                    </div>
                  )
                )}
              </div>
            )}
          </article>
        </section>
      </main>
    </div>
  );
}


export default App;