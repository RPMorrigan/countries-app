import { useParams } from "react-router-dom";

function CountryDetail() {
    const countryName = useParams().countryName;

    return (
        <>
            <button>Back</button>
            <img />
            <h2>{countryName}</h2>
            <button>Save</button>
            <p>Population:</p>
            <p>Capitol:</p>
            <p>Region:</p>
            {/* TODO: map out bordering countries */}
        </>
    )
}

export default CountryDetail;