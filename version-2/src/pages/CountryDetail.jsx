import { useParams, useNavigate } from "react-router-dom";

const CountryDetail = ({ countries = [] }) => {
    // Stores just the name of the necessary country
    const { countryName } = useParams();
    // Lets us build things like a back button or set up links to bordering countries.
    const navigate = useNavigate();
    // This says, if there is a country object with the same name as the one we're looking for in countries, load it into our variable, 'country'.
    const country = countries?.find(count => count.name.common.toLowerCase() === countryName.toLowerCase());
        
    if (!country) {
        return <div> Country not found!</div>
    }

    return (
        <div className="detail-page" >
            <div className="main-content">
            <button onClick={() => navigate("/")}>Back</button>
                <img src={country.flags.svg} alt={country.name.common} />
            <div className="details">
            <h2>{ countryName }</h2>
                    <button className="save-button">Save</button>
                    <div className="details-paragraphs">
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