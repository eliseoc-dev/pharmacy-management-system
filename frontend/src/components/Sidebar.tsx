function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">+</div>

        <div>
          <h2>PharmaSys</h2>
          <span>Management</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <a className="nav-item active" href="#dashboard">
          Dashboard
        </a>

        <a className="nav-item" href="#products">
          Products
        </a>

        <a className="nav-item" href="#alerts">
          Inventory Alerts
        </a>
      </nav>

      <div className="sidebar-footer">
        Pharmacy Management System
      </div>
    </aside>
  );
}

export default Sidebar;