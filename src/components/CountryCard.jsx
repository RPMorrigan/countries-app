function CountryCard({ count }) {
    const flag = count.flags.svg;
    const name = count.name.common;
    const population = count.population.toLocaleString();
    const capital = count.capital;
    const region = count.region;
    
    return (
        <div className="card">
            <img src={flag} alt={name} />
            <div className="card-content">
                <h3>{name}</h3>
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