const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const mariadb = require('mariadb');
// const passport = require("passport");

const app = express();
// const port = process.env.PORT || 3003;
const port = 3003;
const users = require("./routes/users.Route");
const entries = require("./routes/entries.Route");

require('dotenv').config();
// dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionLimit: 5
});

async function connectDB() {
    let conn;
    try {
        conn = await pool.getConnection();
    } catch (err) {
        throw err;
    } finally {
        // if (conn) conn.release(); //release to pool
        if (conn) console.log("connected to DB")
    }
}

// x-Origin
app.use(cors());

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// MongoDB connectivity
// const db = require("./config/keys").mongoURI;
// mongoose
//     .connect(db, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false
//     })
//     .then(() => console.log("MongoDB connection success! (Photo-Cat on Atlas)"))
//     .catch(err => console.log(err));

// Passport middleware
// app.use(passport.initialize());

// Passport config
// require("./config/passport")(passport);

app.use("/users", users);
app.use("/entries", entries);

app.listen(port, () => {
    console.log(`Weevr backend server is running on port: ${port}`);
});