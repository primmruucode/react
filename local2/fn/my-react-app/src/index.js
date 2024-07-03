import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Cloth"; // Assuming this is the correct import
import App from "./App";
import './pages/styles.css'; // Import the CSS file

export default function Apps() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="App" element={<App />} />
          <Route path="blogs" element={<Blogs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Apps />, document.getElementById("root"));
