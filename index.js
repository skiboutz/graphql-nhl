const { ApolloServer } = require('apollo-server')
const PlayerAPI = require('./DataSources/PlayerAPI')
const ConferenceAPI = require('./DataSources/ConferenceAPI')
const DivisionAPI = require('./DataSources/DivisionAPI')
const TeamAPI = require('./DataSources/TeamAPI')
const schema = require('./Schema')

const server = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      playerAPI: new PlayerAPI(),
      conferenceAPI: new ConferenceAPI(),
      divisionAPI: new DivisionAPI(),
      teamAPI: new TeamAPI(),
    }
  },
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
