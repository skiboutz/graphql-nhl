const Resolvers = {
  Player: {
    team:  async (root, {}, { dataSources }) => {
      return await dataSources.teamAPI.returnTeam( root.currentTeam.id )
    },
  },
  Team: {
    players: async (root, {}, { dataSources }) => {
      const players = await dataSources.teamAPI.returnRoster( root.id)
      const promises = players.map(async player => {
        return await dataSources.playerAPI.returnPlayer(player.person.id)
      })
      return Promise.all(promises)
    },
    division: async( root, {}, { dataSources }) => {
      return await dataSources.divisionAPI.returnDivision(root.division.id)
    },
    conference: async( root, {}, { dataSources }) => {
      return await dataSources.conferenceAPI.returnConference(root.conference.id)
    }
  },
  Query: {
    getPlayer: async (_, { id }, { dataSources }) => {
      return await dataSources.playerAPI.returnPlayer(id)
      
    },
    getTeams: async (_, {}, { dataSources }) => {
      return await dataSources.teamAPI.returnTeams()
    },
    getTeam: async (_, { id, getRoster }, { dataSources }) => {
      return await dataSources.teamAPI.returnTeam(id)
    },
    getDivisions: async (_, {}, { dataSources }) => {
      return await dataSources.divisionAPI.returnDivisions()
    },
    getDivision: async (_, { id }, { dataSources }) => {
      return await dataSources.divisionAPI.returnDivision(id)
    },
    getConferences: async (_, {}, { dataSources }) => {
      return await dataSources.conferenceAPI.returnConferences()
    },
    getConference: async (_, { id }, { dataSources }) => {
      return await dataSources.conferenceAPI.returnConference(id)
    },
  },
}

module.exports = Resolvers
