const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors'); //connect the diff local host servers

const app = express();

//allow cross-origin requests
app.use(cors());

mongoose.connect("<youUrl>", { useNewUrlParser: true });
//once connection is open, execute callback fn
mongoose.connection.once('open', () => {
    console.log('connected to databse');
});

//handoff control of graphql request to the fn
//pass a schema into graphqlHTTP
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

//port 4000, callback fn
app.listen(4000, () => {
    console.log('listening for requests on port 4000')
});