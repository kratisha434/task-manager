function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#001529",
        color: "white",
      }}
    >
      <h2>📋 AI Task Manager</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <a href="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </a>
        <a href="/create" style={{ color: "white", textDecoration: "none" }}>
          Create Task
        </a>
      </div>
    </div>
  );
}

export default Navbar;