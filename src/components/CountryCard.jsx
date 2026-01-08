function CountryCard() {
    const flag = 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Transgender_Pride_flag.svg';
    const countryName = 'Lezbos';
    const countryDesc = `This is the most gayest empire on earth.`;
    return (
        <div className='card'>
            <img src={flag} alt={countryName} />
            <div className="card-content">
                <h2>{countryName}</h2>
                <p>{countryDesc}</p>
            </div>
        </div>
    )
}

export default CountryCard;