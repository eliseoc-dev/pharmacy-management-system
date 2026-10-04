import type { Product } from "../types/product";


interface ProductTableProps {
  products: Product[];

  onEdit: (product: Product) => void;

  onDelete: (
    productId: number
  ) => Promise<void>;
}


function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        No products found.
      </div>
    );
  }


  return (
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Supplier</th>
            <th>Expiration</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>


        <tbody>
          {products.map((product) => {
            const lowStock =
              product.stock <=
              product.minimum_stock;


            return (
              <tr key={product.id}>
                <td>
                  <div className="product-name">
                    {product.name}
                  </div>

                  <small>
                    ID #{product.id}
                  </small>
                </td>


                <td>
                  {product.category}
                </td>


                <td>
                  ${Number(
                    product.price
                  ).toFixed(2)}
                </td>


                <td>
                  {product.stock}
                </td>


                <td>
                  {product.supplier ?? "-"}
                </td>


                <td>
                  {product.expiration_date ??
                    "-"}
                </td>


                <td>
                  <span
                    className={
                      lowStock
                        ? "status-badge low"
                        : "status-badge good"
                    }
                  >
                    {lowStock
                      ? "Low stock"
                      : "Available"}
                  </span>
                </td>


                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-button"
                      onClick={() =>
                        onEdit(product)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        onDelete(product.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


export default ProductTable;