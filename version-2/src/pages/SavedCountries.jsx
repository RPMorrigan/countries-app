import { useState, useEffect } from 'react';
import CountryCard from '../components/CountryCard';

function SavedCountries({ countries = [] }) {
    // The country data objects set/added on from our submit handler
    const [userCountries, setUserCountries] = useState([]);
    // Allows us to fetch and use the latest user data in the API's array.
    const [newestUserData, setNewestUserData] = useState(null);
    // Form data
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        country: '',
        bio: ''
    });

    // Updates our useState whenever user input changes.
    const inputHandler = (e) => {
        const { name, value } = e.target;
        // Iterates through previous data then dynamically replaces key pair values. 
        setFormData({ ...formData, [name]: value });
    };
    
    const storeFormData = async (data) => {
        const response = await fetch(
            '/api/add-one-user',
            {
                // Type of request
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',   
                },

                // Converting json to string
                body: JSON.stringify(
                    {
                        name: data.fullName,
                        country_name: data.country,
                        email: data.email,
                        bio: data.bio,
                    }),
                }
            );
            const result = await response.text();
            console.log('result', result);
    };
    
        // Processes user data and then resets form.
        const submitHandler = async (e) => {
            e.preventDefault();
    
            console.log(formData);
            await storeFormData(formData);
    
            // Resets the form.
            setFormData({
                fullName: '',
                email: '',
                country: '',
                bio: '',
            })
    
    };
    
    // Collects newest user data.
    const getNewestUserData = async () => {
        try {
            const response = await fetch(
                '/api/get-newest-user',
                {
                    method: 'GET',
                }
            );
            const data = await response.json();
            const userData = data[0];
            setNewestUserData({
                fullName: userData.name,
                email: userData.email,
                country: userData.country_name,
                bio: userData.boi,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
    getNewestUserData();
  }, []);

    return (
        <div className="big-wrap">
            <div className="h-wrap">
                <h2>My Saved Countries</h2>
                
                <div className="saved-countries-wrapper">
                    {userCountries.map((country) => (
                        <CountryCard key={ country.name.common } country={ country } />
                    )) }
                </div>

            <h2>My Profile</h2>
            </div>

            <div className="form-wrap">

                <form className="user-form" onSubmit={submitHandler}>
                    
                    {/* name input */}
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={inputHandler}
                        placeholder="Full name" />
                    
                    {/* email input */}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={inputHandler}
                        placeholder="Email" />
                    
                    {/* country selector */}
                    <select
                        name="country"
                        id="selector"
                        value={formData.country}
                        onChange={inputHandler}
                    >
                        
                        {/* select options */}
                        <option value="">Select a country</option>
                        {countries && countries.length > 0 &&
                            // Here, I'm using similar code as I did on my Home page. Generating options for the first instance of every country.
                            [...new Set(countries.map((item) => item.name.common))]
                                .map((countryName) =>
                                    <option
                                        key={countryName}
                                        value={countryName} >
                                        {countryName}
                                    </option>
                            )
                        }
                    </select>
                {/* User Bio */}
                    <textarea
                        name="bio"
                        id="bio"
                        value={formData.bio}
                        onChange={inputHandler}
                        placeholder="Bio"
                        />
                <button type="submit">Submit</button>
            </form>

            </div>
        </div>
    )
}

export default SavedCountries;