import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';
import SavedCountries from './pages/SavedCountries';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1><Link to="/">Where in the World?</Link></h1>
        <p><Link to="/SavedCountries">Saved Countries</Link></p>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CountryDetail" element={<CountryDetail />} />
        <Route path="/SavedCountries" element={<SavedCountries />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
