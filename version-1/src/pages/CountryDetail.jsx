import { useParams } from "react-router-dom";

function CountryDetail({ countries }) {
    const countryName = useParams().countryName;

    // placeholder to eliminate an error for the moment
    console.log(countries)

    return (
        <>
            <button>Back</button>
            <img />
            <h2>{ countryName }</h2>
        </>
    )
}

export default CountryDetail;