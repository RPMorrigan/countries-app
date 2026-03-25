// Boilerplate code which sets up our server.
// Also sets up our server with easy variables to use in the rest of the code.
import express from 'express';
import pg from 'pg';
import config from './config.js';

const app = express();
const port = 3000;

const db = new pg.Pool({
    connectionString: config.databaseUrl,
    ssl: true
})

app.use(express.json());

app.listen(port, () => {
    console.log("Port's up, mate! Set sail starboard!");
})


// Helper Functions

// addOneUser()
const addOneUser = async (name, email, country_name, bio) => {

    let addUser = await db.query(
        `
        INSERT INTO users (name, email, country_name, bio)
        VALUES ($1, $2, $3, $4)`, [name, email, country_name, bio]
    );

    console.log('User added successfully!');

    return ('User added successfully!');

}

// getNewestUser()
const getNewestUser = async () => {

    let newestUser = await db.query(
        `
        SELECT * FROM users
        ORDER BY user_id DESC
        LIMIT 1`
    );

    console.log(newestUser.rows[0]);

    return (newestUser.rows[0]);

};

// saveOneCountry(country)
const saveOneCountry = async (country) => {

    let newCountry = await db.query(
        `
        INSERT INTO country_counts (country_name, count)
        VALUES ($1, 1)
        ON CONFLICT (country_name)
        DO UPDATE SET count = country_counts.count + 1`, [country]
    );

    console.log(`${country} was added to saved countries!`);

    return (`${country} was added to saved countries!`);

};

// getAllSavedCountries()
const getAllSavedCountries = async () => {

    let allCountries = await db.query(
        `
        SELECT *
        FROM saved_countries`
    );

    console.log(allCountries.rows);

    return (allCountries.rows);

}

// updateOneCountryCount(country, count)
const updateOneCountryCount = async (country) => {

    let update = await db.query(
        `
        INSERT INTO country_counts (country_name, count)
        VALUES ($1, 1)
        ON CONFLICT (country_name)
        DO UPDATE SET count = country_counts.count +1;`, [country]
    );

    console.log(`${country}'s count was successfully incremented by 1!`);

    return (`${country}'s count was successfully incremented by 1!`);

}

// unsaveOneCountry(country)
const unsaveOneCountry = async (country) => {

    let unsaved = await db.query(
        `
        DELETE FROM saved_countries
        WHERE country_name = $1`,[country]
    );

    console.log(`${country} was unsaved successfully!`);

    return (`${country} was unsaved successfully!`);

}

// unsaveAllCountries()
const unsaveAllCountries = async () => {

    let deleteAll = await db.query(
        `DELETE FROM saved_countries`
    );

    console.log('All countries were wiped!')

    return ('All countries were wiped!');

}

// resetOneCountryCount(country)
const resetOneCountryCount = async (country) => {

    let resetCount = await db.query(
        `
        UPDATE country_counts
        SET count = 1
        WHERE country_name = $1`, [country]
    );

    console.log(`${country}'s count was reset successfully!`);

    return (`${country}'s count was reset successfully!`);

}

// ==========================================================

// Endpoints

// Add one user
app.post('/add-one-user/', async (req, res) => {
    try {

        const { name, email, country_name, bio } = req.body;

        const result = await addOneUser(name, email, country_name, bio);

        res.send(result);

    } catch (error) {
        console.error(error);
        res.status(500).json(`Error adding user. ${error.message}`);
    }
})

// Get newest user
app.get('/get-newest-user', async (req, res) => {

    console.log('checkpoint');

    try {

        const result = await getNewestUser();

        res.json(result)

    } catch (error) {
        console.error(error);
        res.status(500).json(`Error getting newest user. ${error.message}`);
    }
})

// save-one-country
app.post('/save-one-country/:country', async (req, res) => {
    try {

        let country = req.params.country;
        console.log('attempting to save country:', country);
        const result = await saveOneCountry(country);

        res.send(result);

    } catch (error) {
        console.error('Complete error details:', error);
        res.status(500).json(`Error adding country. ${error.message}`);
    }
})

// get-all-saved countries
app.get('/get-all-saved-countries', async (req, res) => {
    try {

        const result = await getAllSavedCountries();

            res.json(result)

    } catch (error) {
        console.error(error);
        res.status(500).json(`Error getting countries. ${error.message}`);
    }
})

// update-one-country-count/:country
app.post('/update-one-country-count/:country', async (req, res) => {

    try {

        let country = req.params.country;

        const result = await updateOneCountryCount(country);

        res.send(result);
        
    } catch (error) {
        console.error(error);
        res.status(500).json(`Error unsaving country. ${error.message}`)
    }

})

app.post('/unsave-one-country/:country', async (req, res) => {

    try {

        let country = req.params.country

        const result = await unsaveOneCountry(country);

        res.send(result);
        
    } catch (error) {
        console.error(error);
        res.status(500).json(`Error unsaving countries. ${error.message}`)
    }

})

// update-one-country-count
app.post('/unsave-all-countries', async (req, res) => {
    try {

        const result = await unsaveAllCountries();

        res.send(result);

    } catch (error) {
        console.error(error);
        res.status(500).json(`Error unsaving all countries. ${error.message}`);
    }
})

// reset-one-country-count
app.post('/reset-one-country-count/:country', async (req, res) => {

    try {
        
        let country = req.params.country;

        const result = await resetOneCountryCount(country);

        res.send(result);

    } catch (error) {
        console.error(error);
        res.status(500).json(`Error resetting ${country}'s count. ${error.message}`)
    }

})
