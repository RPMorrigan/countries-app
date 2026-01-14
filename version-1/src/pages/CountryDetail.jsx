import { useParams } from "react-router-dom";

function CountryDetail({ countries }) {
    const {name} = useParams();
    
    return (
        <>
            <h2>Country Detail Page</h2>
            <p>{countryName.countryName}</p>
        </>
    )
}

// Loader funciton
export const countryDetailLoader = async ({ params }) => {
    const countryName = params.countryName;
}

export default CountryDetail;