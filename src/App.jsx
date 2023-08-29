import { HashRouter, Routes, Route } from "react-router-dom";

// pages and components
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/create" element={<Create />} />
          </Routes>
          <Routes>
            <Route path="/edit" element={<Edit />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
