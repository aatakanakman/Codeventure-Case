import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signin from "./pages/Auth/Signin";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Profile from "./pages/Profile";
import Error404 from "./pages/Error404";
import Home from "./pages/Admin/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <div id="context">
        <Routes>
          <Route exact={true} path="/" element={<Blogs />} />
          <Route path="/blog/:blog_id" element={<BlogDetail />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-blog" element={<Home />} />
          <Route path="*" element={Error404}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
