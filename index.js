const { ApolloServer } = require('apollo-server')
const PlayerAPI = require('./DataSources/PlayerAPI')
const ConferenceAPI = require('./DataSources/ConferenceAPI')
const DivisionAPI = require('./DataSources/DivisionAPI')
const TeamAPI = require('./DataSources/TeamAPI')
const Player = require('./TypeDefs/Player')
const Team = require('./TypeDefs/Team')
const Division = require('./TypeDefs/Division')
const Conference = require('./TypeDefs/Conference')
const Resolvers = require('./Resolvers/Resolvers')
const { makeExecutableSchema } = require('graphql-tools')

const Query = `
  type Query {
    getPlayer(id: Int): Player,
		getTeams: [Team],
		getTeam(id: Int): Team,
		getDivisions: [Division],
		getDivision(id: Int): Division,
		getConferences: [Conference],
		getConference(id: Int): Conference
  }
`

const schema = makeExecutableSchema({
  typeDefs: [ Query, Player, Team, Division, Conference ],
	resolvers: Resolvers
});

const server = new ApolloServer({ 
	schema,
	dataSources: () => {
		return {
			playerAPI: new PlayerAPI(),
			conferenceAPI: new ConferenceAPI(),
			divisionAPI: new DivisionAPI(),
			teamAPI: new TeamAPI()
		}
	}
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});