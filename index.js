const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')
const Player = require('./TypeDefs/Player')
const Teams = require('./TypeDefs/Teams')
const { makeExecutableSchema } = require('graphql-tools')

const Query = `
  type Query {
    getPlayer(id: Int): Player,
    getTeams: [Teams]
  }
`


const resolvers = {
  Player: {
    teamName: root => {
      return root.currentTeam.name 
    },
    teamId: root => {
      return root.currentTeam.id
    }
  },
  Teams: {
    divisionName: root => {
      return root.division.name
    },
    divisionShort: root => {
      return root.division.nameShort
    },
    divisionId: root => {
      return root.division.id
    },
    conferenceName: root => {
      return root.conference.name
    },
    conferenceId: root => {
      return root.conference.id
    },
    franchiseId: root => {
      return root.franchise.franchiseId
    },
    venueName: root => {
      return root.venue.name
    },
    venueCity: root => {
      return root.venue.city
    },
    venueTimeZone: root => {
      return root.venue.timeZone.tz
    },

  },
  Query: {
    getPlayer: async (_, { id }) => {
      const player = await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${id}`)
      .then(response => {
        return response.data.people[0]
      })
      return player
    },    
    getTeams: async() => {
      const teams = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams`)
      .then(response => {
        return response.data.teams
      })
      return teams
    },
  }
}


const schema = makeExecutableSchema({
  typeDefs: [ Query, Player, Teams ],
  resolvers: resolvers,
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});