import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ color: "white", fontSize: "20px", display: "flex", gap: "24px" }}>
          <div>IAP Developer Dashboard</div>
          <Link to="/" style={{ color: "white" }}>Dashboard</Link>
        </Header>

        <Content style={{ padding: "24px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
