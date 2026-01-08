import CountryCard from '../components/CountryCard'

function Home() {
    return (
        <>
            <div className="user-input">
                <input type="text" placeholder="Search for a country..." />
                <select name="countDD" aria-required>
                        <option className="filterOp0" value="" aria-disabled>Filter by Region</option>
                        <option value="mx">Mexico</option>
                        <option value="jp">Japan</option>
                        <option value="usa">United States</option>
                </select>
            </div>
            <main>
            <CountryCard />
            </main>
        </>
    )
}

export default Home;