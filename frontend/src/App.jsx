import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import { Dashboard } from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Orders from "./pages/Orders";
import Tables from "./pages/Tables";
import Dishes from "./pages/Dishes";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
