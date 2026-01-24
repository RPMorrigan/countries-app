import { useState } from 'react';

function SavedCountries({ countries = []}) {
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        country: '',
        bio: ''
    });

    const inputHandler = (e) => {
        const { name, value } = e.target;
        
        setUserData({
            ...userData,
            [name]: value
        });
    };
    
    const submitHandler = (e) => {
        e.preventDefault();

        console.log("New user added!")
        console.log(userData);
    };

    return (
        <div className="big-wrap">
            <div className="h-wrap">
            <h2>My Saved Countries</h2>
            <h2>My Profile</h2>
            </div>

            <div className="form-wrap">

                <form className="user-form" onSubmit={submitHandler}>
                    
                    {/* name input */}
                    <input
                        type="text"
                        name="fullName"
                        value={userData.fullName}
                        onChange={inputHandler}
                        placeholder="Full name" />
                    
                    {/* email input */}
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={inputHandler}
                        placeholder="Email" />
                    
                    {/* country selector */}
                    <select
                        name="country"
                        id="selector"
                        value={userData.country}
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
                        value={userData.bio}
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