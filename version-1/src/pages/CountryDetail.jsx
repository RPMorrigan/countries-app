import { useParams } from "react-router-dom";

const CountryDetail = ({ countries} = {}) => {
    const { countryName } = useParams();
    const country = countries.find(count => count.name.common.toLowerCase() === countryName.toLowerCase());

    if (!country) {
        return <div> Country not found!</div>
    }

    return (
        <div className="detail-page" >
            <button>Back</button>
            <img src={country.flags.svg} />
            <h2>{countryName}</h2>
            <button>Save</button>
            <div>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Capital: {country.capital}</p>
            <p>Region: {country.region}</p>
            </div>

            {/* TODO make border buttons */}

            <div>
                <h3>This is where I would put my border countries... IF I HAD ANY!</h3>
                <button>Border</button>
            </div>

        </div>
    )
}

export default CountryDetail;