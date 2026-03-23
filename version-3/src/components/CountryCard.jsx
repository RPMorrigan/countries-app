import { Link } from "react-router-dom";

function CountryCard({ country}) {
// I was manually loading each value independently, but it was difficult to read and verbose.
    const {
        // In order to access the value inside flags, I discovered that I could nest another destructiring assignment.
        region,
        flags: { svg: flag },
        name: { common: name },
        population,
        capital,
    } = country;

    return (
        <Link to={`/country-detail/${name}`} className="card-link">
                {/* Creates a link to a detailed page for each country. */}
                {/* This card is comprised of a main div called 'card', an image for the flag, and a content div that holds the  */}
                <div className="card">
                    <img src={flag} alt={name} />
                    <div className="card-content">
                        <h3>{name}</h3>
                        {/* Span is used here to style the labels. These are simmply bolded. */}
                        <p><span>Population:</span> {population}
                            <br/>
                            <span>Capital:</span> {capital}
                            <br/>
                        <span>Region:</span> {region}
                        </p>
                    </div>
                </div>
            </Link>
    );
}

export default CountryCard;