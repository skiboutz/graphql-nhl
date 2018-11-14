
const Player = require('./TypeDefs/Player')
const Venue = require('./TypeDefs/Venue')
const TimeZone = require('./TypeDefs/TimeZone')
const Team = require('./TypeDefs/Team')
const Division = require('./TypeDefs/Division')
const Conference = require('./TypeDefs/Conference')
const Resolvers = require('./Resolvers/Resolvers')
const { makeExecutableSchema } = require('graphql-tools')

const Query = `
  type Query {
    getPlayer(id: Int!): Player,
		getTeams: [Team],
		getTeam(id: Int, getRoster: Boolean = false): Team,
		getDivisions: [Division],
		getDivision(id: Int): Division,
		getConferences: [Conference],
		getConference(id: Int): Conference
  }
`

const schema = makeExecutableSchema({
  typeDefs: [Query, Player, Team, Division, Conference, Venue, TimeZone],
  resolvers: Resolvers,
})

module.exports = schema