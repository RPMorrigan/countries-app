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

// addOneCountry()
const addOneUser = async (user_name, email, bio ) => {

    let addCountry = await db.query(
        `
        INSERT INTO users (user_name)
        VALUES ($1, $2, $3)`, [user_name, email, bio]
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

    console.log(newestUser.rows);

    return (newestUser.rows);

};

// saveOneCountry(country)
const saveOneCountry = async (country) => {

    let newCountry = await db.query(
        `
        INSERT INTO saved_countries (country_name)
        VALUES ($1)`, [country]
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
const updateOneCountryCount = async (country, count) => {

    let update = db.query(
        `
        UPDATE saved_countries
        SET count = $1 + 1
        WHERE name = $2`, [count, country]
    );

    console.log(`${country}'s count was successfully set to ${count} `);

    return (`${country}'s count was successfully set to ${count} `);

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
const unsavedAllCountries = async () => {

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
        UPDATE saved_countries
        SET count = 0
        WHERE name = $1`, [country]
    );

    console.log(`${country}'s count was reset successfully!`);

    return (`${country}'s count was reset successfully!`);

}

// ==========================================================

// Endpoints

// Add one user
app.post('api/add-one-user/', async (req, res) => {
    try {

        const { user_name, email, bio } = req.body;

        const result = await addOneUser(user_name, email, bio);

        res.send(result);

    } catch (error) {
        console.error(error);
        res.status(500).json('Error adding user. Try again.');
    }
})

// Ged newest user
app.get('api/get-newest-user', async (req, res) => {
    try {

        const result = await getNewestUser();

        res.json(result.rows)

    } catch (error) {
        console.error(error);
        res.status(500).json('Error getting newest user. Try again.');
    }
})

// save-one-country
app.post('api/add-one-country/:country', async (req, res) => {
    try {

        let newCountry = req.params.newCountry;

        const result = await addOneCountry(newCountry);

        res.send(result);

    } catch (error) {
        console.error(error);
        res.status(500).json('Error adding country. Try again.');
    }
})

// get-all-saved countries
app.get('api/get-all-saved-countries', async (req, res) => {
    try {

        const result = getAllSavedCountries();

            res.json(result.rows)

    } catch (error) {
        console.error(error);
        res.status(500).json('Error getting countries. Try again.');
    }
})

app.post('unsave-one-country/:country', async (req, res) => {

    try {

        let country = req.params.country;

        const result = await unsaveOneCountry(country);

        res.send(result.rows);
        
    } catch (error) {
        console.error(error);
        res.status*(500).json('Error unsaving country. Try again.')
    }

})

app.post('unsave-all-countries', async (req, res) => {

    try {

        const result = await unsavedAllCountries();

        res.send(result);
        
    } catch (error) {
        console.error(error);
        res.status*(500).json('Error unsaving countries. Try again.')
    }

})

// update-one-country-count
app.post('api/update-one-country-count/:country', async (req, res) => {
    try {

        let country = req.params.country;

        const result = updateOneCountryCount(country);

        res.send(result);

    } catch (error) {
        console.error(error);
        res.status(500).json('Error resetting country count. Try again.');
    }
})
