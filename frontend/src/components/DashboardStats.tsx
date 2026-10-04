interface DashboardStatsProps {
  totalProducts: number;
  lowStock: number;
  expiring: number;
  totalUnits: number;
}


function DashboardStats({
  totalProducts,
  lowStock,
  expiring,
  totalUnits,
}: DashboardStatsProps) {
  return (
    <section className="stats-grid">
      <article className="stat-card">
        <span className="stat-label">
          Total Products
        </span>

        <strong>{totalProducts}</strong>

        <span className="stat-description">
          Registered products
        </span>
      </article>


      <article className="stat-card warning">
        <span className="stat-label">
          Low Stock
        </span>

        <strong>{lowStock}</strong>

        <span className="stat-description">
          Require attention
        </span>
      </article>


      <article className="stat-card danger">
        <span className="stat-label">
          Expiring
        </span>

        <strong>{expiring}</strong>

        <span className="stat-description">
          Within 365 days
        </span>
      </article>


      <article className="stat-card success">
        <span className="stat-label">
          Inventory Units
        </span>

        <strong>{totalUnits}</strong>

        <span className="stat-description">
          Total units in stock
        </span>
      </article>
    </section>
  );
}

export default DashboardStats;