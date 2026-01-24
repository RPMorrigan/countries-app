import { useParams, useNavigate } from "react-router-dom";

const CountryDetail = ({ countries } = {}) => {
    const { countryName } = useParams();
    const navigate = useNavigate();
    const country = countries.find(count => count.name.common.toLowerCase() === countryName.toLowerCase());
        
    if (!country) {
        return <div> Country not found!</div>
    }

    return (
        <div className="detail-page" >
            <button onClick={() => navigate("/")}>Back</button>
            <div className="main-content">
            <img src={ country.flags.svg } />
            <div className="details">
            <h2>{ countryName }</h2>
            <button>Save</button>
            <p>Population: { country.population.toLocaleString() }</p>
            <p>Capital: { country.capital }</p>
            <p>Region: { country.region }</p>
            </div>
            </div>

            {/* TODO make border buttons */}

            <div className="border-countries">
                <h3>Bordering Countries</h3>
                <div className="border-buttons">
                {country.borders?.map((item) => {
                    const borderCountry = countries.find(country => country.cca3 === item);
                    return borderCountry ? (
                        <button key={item}>{borderCountry.name.common}</button>
                    ) : null;
                })}
                    </div>
            </div>

        </div>
    )
}

export default CountryDetail;