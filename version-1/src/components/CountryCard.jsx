import { Link } from "react-router-dom";

function CountryCard({ count }) {
// I was manually loading each value independently, but I think this is a lot cleaner.
    const {
        flags: { svg: flag },
        name: { common: name },
        population,
        capital,
        region
    } = count;
    
    const countryName = useParams();
    console.log(countryName);

    return (
        <>
            {/* Creates a link to a detailed page for each country. */}
            <Link to={`/CountryDetail/${name}`} className="card-link">
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
        </>
    );
}

export default CountryCard;