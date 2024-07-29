import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home.jsx";
import Upload from "./pages/Upload"; // Assuming this is the correct import
import App from "./App";
import User from "./pages/User.jsx";
import "./pages/styles.css"; // Import the CSS file
import Wardrobe from "./pages/Wardrobe";
/* import Profile from "./Components/Profile/Profile"; */
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import "./App.css"; // Import your CSS file
import { AuthProvider } from './Components/Auth/AuthContext.jsx';

export default function Apps() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="App" element={<App />} />
          <Route path="Upload" element={<Upload />} />
          <Route path="User" element={<User />} />
          <Route path="Wardrobe" element={<Wardrobe />} />
          {/* <Route path="Profile" element={<Profile />} /> */}
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

ReactDOM.render(<Apps />, document.getElementById("root"));
