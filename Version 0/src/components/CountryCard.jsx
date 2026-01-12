function CountryCard({ count }) {
    // TODO: Attempt destructuring.
    const flag = count.flags.svg;
    const name = count.name.common;
    const population = count.population.toLocaleString();
    const capital = count.capital;
    const region = count.region;
    
    return (
        // This card is comprised of a main div called 'card', an image for the flag, and a content div that holds the 
        <div className="card">
            <img src={flag} alt={name} />
            <div className="card-content">
                <h3>{name}</h3>
                {/* Span is used here to style the labels. These are simmply bolded. */}
                <p><span>Population:</span> {population}
                    <br/>
                    <span>Capital:</span> {capital}
                    <br/>
                <span>Region:</span> {region}</p>
            </div>
        </div>
    )
}

export default CountryCard;