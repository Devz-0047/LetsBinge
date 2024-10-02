// eslint-disable-next-line
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../src/features/Navbar";
// eslint-disable-next-line
import Login from "./pages/Login";
// eslint-disable-next-line
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Trending from "./pages/Trending";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Library" element={<Library />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
