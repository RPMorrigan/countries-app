import { useParams } from "react-router-dom";

function CountryDetail({ countries }) {
    const countryName = useParams().countryName;
    
    return (
        <>
            <h2>Country Detail Page</h2>
            <p>{countryName}</p>
        </>
    )
}

export default CountryDetail;