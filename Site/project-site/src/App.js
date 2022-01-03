import "./App.css";
import "semantic-ui-css/semantic.min.css"

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import HeaderMenu from "./components/header";
import Footer from "./components/footer";

import DownloadPage from "./pages/download";
import MainPage from "./pages/main";
import ToolsPage from "./pages/tools";

//ROUTING
const App = () => (
  <Router>
    <HeaderMenu />
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/download" element={<DownloadPage />} />
      <Route path="/tools" element={<ToolsPage />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
