import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CountryDetail = ({ countries = [] }) => {
    // Stores just the name of the necessary country
    const { countryName } = useParams();
    // Lets us build things like a back button or set up links to bordering countries.
    const navigate = useNavigate();
    // This says, if there is a country object with the same name as the one we're looking for in countries, load it into our variable, 'country'.
    const country = countries?.find(count => count.name.common.toLowerCase() === countryName.toLowerCase());
    // View count
    const [viewCount, setViewCount] = useState(0);
    
    // Runs once on page load only.
    useEffect(() => {
        // If there's nothing in country, end the useEffect and return nothing.
        if (!country) return;

        // Retrieve the the current country count by updating it and fetching it at the same time via POST request
        // as it returns the count data in an object which is able to later be rendered for the user.
        const getViewCount = async () => {
            try {
                let response = await fetch(
                    '/api/update-one-country-count',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "country_name": country.name.common
                        })
                    }
                );
                const data = await response.json();
                setViewCount(data.count);
            } catch (error) {
                console.log('Error: ' + error.message);
            }
        }
        
        // Call getViewCount every time the country name changes.
        getViewCount();
    }, [country]);
    
    // Checks that the data is present in our console for debugging.
    console.log(viewCount);

    // If for some reason, country is not found, return, "Country not found!"
    if (!country) {
        return <div> Country not found!</div>
    }

    // Saves a country name into the saved countries array for our API via POST request.
    const saveCountry = async () => {
        try {
            let response = await fetch(
                '/api/save-one-country',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "country_name": countryName
                    })
                }
            );
            const resultText = await response.text();
            console.log(resultText);
        } catch (error) {
            console.log('Error: ' + error.message);
        }
    }

    return (
        <div className="detail-page" >
            <div className="main-content">
            <button className="back-button" onClick={() => navigate("/")}>Back</button>
                <img src={country.flags.svg} alt={country.name.common} />
            <div className="details">
            <h2>{ countryName }</h2>
                    <button className="save-button" onClick={saveCountry}>Save</button>
                    <div className="details-paragraphs">
                    {/* View count */}
                        <p>View Count: {viewCount}</p>
                    {/* to local string formats the raw digits into something more legible */}
                    <p>Population: {country.population.toLocaleString()}</p>
                    {/* I see a lot of exception handling when I'm looking for solutions, so I am attempting to remember to add these things */}
            <p>Capital: { country.capital?.[0] || 'N/A' }</p>
            <p>Region: { country.region }</p>
                    </div>
                <div className="border-countries">
                <p>Bordering Countries</p>
                <div className="border-buttons">
                {country.borders?.map((item) => {
                    const borderCountry = countries.find(country => country.cca3 === item);
                    return borderCountry ? (
                        <button
                            key={item}
                            onClick={() => navigate(`/country-detail/${borderCountry.name.common}`)}
                        >
                            {borderCountry.name.common}
                        </button>
                    ) : null;
                })}
                    </div>
            </div>
                </div>
            </div>

        </div>
    )
}

export default CountryDetail;