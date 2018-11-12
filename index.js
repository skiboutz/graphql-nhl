const { ApolloServer, gql } = require('apollo-server');
const Player = require('./TypeDefs/Player')
const Teams = require('./TypeDefs/Teams')
const Team = require('./TypeDefs/Team')
const Resolvers = require('./Resolvers/Resolvers')
const { makeExecutableSchema } = require('graphql-tools')

const Query = `
  type Query {
    getPlayer(id: Int): Player,
		getTeams: [Teams],
		getTeam(id: Int): Team
  }
`

const schema = makeExecutableSchema({
  typeDefs: [ Query, Player, Teams, Team ],
  resolvers: Resolvers,
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});