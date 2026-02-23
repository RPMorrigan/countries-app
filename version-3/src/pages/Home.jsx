import CountryCard from '../components/CountryCard'
import { useState } from 'react';

function Home({ countries = [] }) {
    // usrInput keeps the value of of whatever a user has typed into the search bar.
    // usrRegion changes with a different selection on our dropdown.
    const [usrInput, setInput] = useState('');
    const [usrRegion, setRegion] = useState('');


    // We need this to extract each change to our search bar, and the second handler, selectHandler, does the same for our dropdown.
    let searchHandler = (e) => {
        setInput(e.target.value);
    };

    let selectHandler = (e) => {
        setRegion(e.target.value);
    }


        return (
            <div className="wrapper">
                <div className="user-input">

                    {/* Here is our search bar. It doesn't need to be part of a form for what we are doing. This should help update the countries on our page to anything that has a matching token */}
                    <input
                        onChange={searchHandler}
                        type="search"
                        id="usrSearch"
                        name="usrSearch"
                        value={usrInput}
                        placeholder="Search for a country..." />

                    {/* To avoid sifting through the data myself and making mistakes, I've set this up to automatically add the regions specified. If there is any change to the regions in the data, it will be reflected in this set of options */}
                    <select name="countDD" onChange={selectHandler}>

                        {/* I set this first option so that we have a nothing state. */}
                        <option value="selector">
                            Filter by Region
                        </option>

                        {/* (...new Set) Set is useful here because it only allowes for one instance of a piece of data to be added. So it is uniquely suited for this data. The '...' simply instructs our code to itterate through content */}
                        {
                            [...new Set(countries.map(item => item.region))]
                                .sort().map((region) => (
                                    <option key={region} value={region}>{region}</option>
                                    // Because each instance of a region is unique, the 'key' prop can also be set to region
                        ))}
                    </select>
                </div>
                <main>

                    {/* countries is what we've extracted from our API call. We are filtering it based on the user's input and selected region */}
                    {countries.filter((data) => {
                        return (
                            // There is 2 sections to this filter. The first checks if the user's input is included in the country's name, this includes partial matches. The second checks if the user's selected region matches the country's region. If usrRegion is blank, it will return all regions.
                            data.name.common.toLowerCase()
                                .includes(usrInput.toLowerCase())
                            &&
                            (usrRegion === '' || data.region.toLowerCase() === usrRegion.toLowerCase() || usrRegion === 'selector')
                            // This statement is inclusive. So it would say, if the first condition is met AND if the selector is blank, or the user's input matches exactly, or if the region is a match for the selector, render.
                            // This way we don't have to attempt to exclude countries. Which works well alongside 'Set()'
                        )
                    })
                        // Once our data is filtered to what the user is requesting, we map each item to our CountryCard component.
                        // We include a key with the country's name to avoid react issues.
                        .map((data) => {
                            return <CountryCard
                                key={data.name.common}
                                country={data} />
                        })}
                </main>
            </div>
        )
    }

export default Home;