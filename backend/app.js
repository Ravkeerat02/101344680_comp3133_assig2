//Ravkeerat Singh - 101344680
const {ApolloServer} = require('apollo-server');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Apollo server
const typeDefs= require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const Server = new ApolloServer({
    typeDefs
    ,resolvers
});

const SERVER_PORT = 5000 //port numberer initialized

//DB connection string
const DB_URL = "mongodb+srv://RK_02:ab8UjMGR44roYdJH@cluster0.iu4uasl.mongodb.net/comp3133_assignmnet1?retryWrites=true&w=majority"

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Successfully connected to the database");
    return Server.listen({port: SERVER_PORT});    
})
.then((res) => {
    console.log(`Server running at ${res.url}`);
});