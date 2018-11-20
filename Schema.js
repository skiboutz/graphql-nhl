
const Conference = require('./TypeDefs/Conference')
const Division = require('./TypeDefs/Division')
const Player = require('./TypeDefs/Player')
const Team = require('./TypeDefs/Team')
const TeamStats = require('./TypeDefs/TeamStats')
const TimeZone = require('./TypeDefs/TimeZone')
const Venue = require('./TypeDefs/Venue')
const Resolvers = require('./Resolvers/Resolvers')
const { makeExecutableSchema } = require('graphql-tools')

const Query = `
  type Query {
    getPlayer(id: Int!): Player,
		getTeams: [Team],
		getTeam(id: Int): Team,
		getDivisions: [Division],
		getDivision(id: Int): Division,
		getConferences: [Conference],
		getConference(id: Int): Conference
  }
`

const schema = makeExecutableSchema({
  typeDefs: [
		Conference, 
		Division,
		Player, 
		Query, 
		Team,
		TeamStats,
		TimeZone,
		Venue, 
	],
  resolvers: Resolvers,
})

module.exports = schema