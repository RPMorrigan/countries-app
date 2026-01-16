function SavedCountries() {
    // this is just a placeholder for now.
    return (
        <div className="big-wrap">
            <div className="h-wrap">
            <h2>My Saved Countries</h2>
            <h2>My Profile</h2>
            </div>

            <div className="form-wrap">
            <form className="user-form">
                <input type="text" placeholder="Full name" />
                <input type="email" placeholder="Email" />
                    <select name="country-add-select" id="selector">
                        <option className="option-grey">Country</option>
                </select>
                    <textarea placeholder="Bio" />
                    <button type="submit">Submit</button>
            </form>
            </div>
        </div>
    )
}

export default SavedCountries;