import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home.jsx";
import Upload from "./pages/Upload"; // Assuming this is the correct import
import App from "./App";
import User from "./pages/User";
import './pages/styles.css'; // Import the CSS file
import Wardrobe from './pages/Wardrobe';
import './App.css'; // Import your CSS file

export default function Apps() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="App" element={<App />} />
          <Route path="Upload" element={<Upload />} />
          <Route path="User" element={<User />} />
          <Route path="Wardrobe" element={<Wardrobe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Apps />, document.getElementById("root"));
