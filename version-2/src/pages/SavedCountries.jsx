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
    

    // Sets our user data up to be stored, then stores it into the API via POST request.
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
        
            // Formats the API's reply to a json then stores it into result which is then console logged for debugging.
            const result = await response.json();
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
    
    // Requests newest/latest user data via GET request to the API.
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
                bio: userData.bio,
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Runs getNewestUserData once on page load.
    useEffect(() => {
    getNewestUserData();
    }, []);
    
    // Requests list of user's saved countries via GET request
    const getUserCountries = async () => {
        try {
            const response = await fetch(
                '/api/get-all-saved-countries',
                {
                    method: 'GET'
                }
            );
            const data = await response.json();
            setUserCountries(data);
            
        } catch (error) { 
            console.log(error);
        }
    }

    useEffect(() => { 
        getUserCountries();
    }, []);

    return (
        <div className="big-wrap">
            <div className="h-wrap">
                <h2>My Saved Countries</h2>
                <div className="saved-countries-wrapper">
                    {/* When there is anything in newestUserData AND userCountries, proceed to mapping the data */}
                    {newestUserData && userCountries?.map((countryObj) => {
                        // Load just the country name from the simple object to make it easier to use and read.
                        const countryName = countryObj.country_name;
                    
                        // Use each country name to find and match it with the actual country object from the Rest API.
                        // Then return the object and load it into 'fullCountry' to be passed on.
                        const fullCountry = countries.find(c =>
                            c.name.common.toLowerCase() === countryName.toLowerCase()
                        );

                        // if fullCountry exists, pass the country code as the key
                        // Then pass the entire object to be mapped into the country card component.
                        if (fullCountry) {
                            return <CountryCard key={fullCountry.cca3} country={fullCountry} />
                        }

                        // Warn is something I just found out about today while working with limited instruction from the API.
                        // I am likely to use it in the future.
                        console.warn(`Country not found: ${countryName}`);

                        return null;

                    })}
                </div>

                {/* If a user has registered, go on to render the welcome message with the user's name dynamically changed.
                Otherwise, simply display, "My Profile" */}
                {newestUserData ?
                    <h2>{`Welcome back, ${newestUserData.fullName}!`}</h2>
                    :
                    <h2>My Profile</h2>
                }
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