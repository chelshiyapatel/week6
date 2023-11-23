console.log("Welcome to user registration app !!!!!!")

import express from 'express'
import router from './routes/routes.js'
import bodyParser from 'body-parser'
import userModel from './models/userModel.js'
// import session for creating session object middleware
import session from 'express-session'
// import MongoStore to store the sessions in mongodb
import MongoStore from 'connect-mongo'
import {} from 'dotenv/config';

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`)
})

app.set("view engine", "ejs")

// create a session store first using mongostore

const uri = "mongodb+srv://chelshiyapatel26:chelshiya@cluster0.w3ou2na.mongodb.net/userReg?retryWrites=true&w=majority"

// create a session store for storing the session object
// session store is created using conect-mongo package
const session_store = MongoStore.create({
    mongoUrl:process.env.MONGO_URI,
    dbName:"userReg",
    collectionName:"userReg_Sessions"
})

// use the session as middleware
// craete a middleware for sessions using session

app.use(session({
    secret: "A secret key",
    resave: false,
    saveUninitialized: false,
    store: session_store
}))


app.use('/', router)