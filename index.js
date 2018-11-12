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

   type Teams {
    id: Int 
    name: String
    abbreviation: String
    teamName: String
    locationName: String
    firstYearOfPlay: String
    divisionName: String
    divisionShort: String
    divisionId: Int
    conferenceName: String
    conferenceId: Int
    franchiseId: Int
    venueName: String
    venueCity: String
    venueTimeZone: String
    officialSiteUrl: String
  }

  type Query {
    getPlayer(id: Int): Player,
    getTeams: [Teams]
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
      return root.franchise.id
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
        console.log(response.data)
        return response.data.teams
      })
      return teams
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