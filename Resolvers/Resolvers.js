const Resolvers = {
  Query: {
    getPlayer: async (_, { id }, { dataSources }) => {
      const player = await dataSources.playerAPI
        .returnPlayer(id)
        .then(async player => {
          player.teamInfo = await dataSources.teamAPI.returnTeam(
            player.currentTeam.id
          )
          return player
        })
      return player
    },
    getTeams: async (_, {}, { dataSources }) => {
      return await dataSources.teamAPI.returnTeams()
    },
    getTeam: async (_, { id }, { dataSources }) => {
      const team = await dataSources.teamAPI.returnTeam(id).then(async team => {
        const roster = await dataSources.teamAPI.returnRoster(team.id)
        const promises = roster.map(async person => {
          return await dataSources.playerAPI.returnPlayer(person.person.id)
        })
        team.roster = Promise.all(promises)
        return team
      })
      return team
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
