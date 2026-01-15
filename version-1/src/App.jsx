// We're adding a router to navigate between pages like saved countries and country details.
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';
import SavedCountries from './pages/SavedCountries';
import "./App.css";

// Using components, we can make our code clean and easily managed.
function App() {
  return (
    // The things inside BrowserRouter creates a visible link which points to our other pages. Though the stuff between Routes doesn't render anything to the page.
    <BrowserRouter>
      <nav>
        <h1><Link to="/">Where in the world?</Link></h1>
        <p><Link to="/SavedCountries">Saved Countries</Link></p>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country-detail/:countryName" element={<CountryDetail />} />
        <Route path="/SavedCountries" element={<SavedCountries />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
