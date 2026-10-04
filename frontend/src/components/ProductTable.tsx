import type { Product } from "../types/product";

interface ProductTableProps {
  products: Product[];
  onDelete: (productId: number) => void;
}

function ProductTable({
  products,
  onDelete,
}: ProductTableProps) {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div>
      <h2>Products</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Minimum</th>
            <th>Supplier</th>
            <th>Expiration</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>{product.minimum_stock}</td>
              <td>{product.supplier ?? "-"}</td>
              <td>{product.expiration_date ?? "-"}</td>
              <td>
                <button
                  onClick={() => onDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;