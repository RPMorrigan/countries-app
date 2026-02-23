// We're adding a router to navigate between pages like saved countries and country details.
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';
import SavedCountries from './pages/SavedCountries';
import "./App.css";

// Using components, we can make our code clean and easily managed.
function App() {
  const [countries, setCountries] = useState([]);

// API calls need to wait on the API to respond as there is a disparity in how fast the page loads vs the 
  const apiRequest = async () =>  {
        try {
            let response = await fetch(
                'https://restcountries.com/v3.1/independent?status=true&fields=flags,capital,name,population,region,borders,cca3'
            );
            const data = await response.json();
            console.log(data);
            setCountries(data);           
        } catch (error) {
      console.log('Error: ' + error.message);
        }
    };

    useEffect(() => {
        apiRequest();
    }, []);

    console.log(countries);

  return (
    // The things inside BrowserRouter creates a visible link which points to our other pages. Though the stuff between Routes doesn't render anything to the page.
    <BrowserRouter>
      <nav>
        <h1><Link to="/">Where in the world?</Link></h1>
        <p><Link to="/saved-countries">Saved Countries</Link></p>
      </nav>

      {/* Routes provide pathing for a document to redirect you to the other document. */}
      <Routes>
        <Route path="/" element={<Home countries={countries} />} />
        <Route path="/country-detail/:countryName" element={<CountryDetail countries={countries} />} />
        <Route path="/saved-countries" element={<SavedCountries countries={countries} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
