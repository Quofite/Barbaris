import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import HeaderMenu from './components/header';

import DownloadPage from './pages/download';
import MainPage from './pages/main';

//ROUTING
const App = () => (
  <Router>
    <HeaderMenu />
    <main style={{ marginTop: "2em" }}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/download" element={<DownloadPage />} />
      </Routes>
    </main>
  </Router>
);

export default App;
