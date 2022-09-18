const { buildSchema } = require("graphql");

module.exports = buildSchema(`
 type PERSON { 
    message: String!
    views: Int!
 }

 type rootQuery {
    hello: PERSON!
    }

 schema {         
   query: rootQuery
 }
`);
