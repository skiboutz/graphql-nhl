const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')

const typeDefs = gql`
  type Player {
    fullName: String
    firstName: String
    lastName: String
    primaryNumber: Int
    birthDate: String
    currentAge: Int
    birthCity: String
    birthStateProvince: String
    birthCountry: String
    nationality: String
    height: String
    weight: Int
    active: Boolean
    alternateCaptain: Boolean
    captain: Boolean
    rookie: Boolean
    shootsCatches: String
    rosterStatus: String
    teamName: String
    teamId: Int
  }

  type Query {
    getPlayer(id: Int): Player
  }
`;

const resolvers = {
  Player: {
    teamName: root => {
      return root.currentTeam.name 
    },
    teamId: root => {
      return root.currentTeam.id
    }
  },
  Query: {
    getPlayer: async (_, { id }) => {
      const player = await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${id}`)
      .then(response => {
        return response.data.people[0]
      })
      return player
    },
  }
}

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});