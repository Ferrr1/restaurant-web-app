import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import { Dashboard } from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Products from "./pages/Products";
import Transactions from "./pages/Transactions";
import Orders from "./pages/Orders";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
