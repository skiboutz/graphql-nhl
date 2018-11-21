const validateSeasons = require('../utilities/season.js')

const Resolvers = {
  Player: {
    team:  async ( parent, {}, { dataSources }) => {
      if( parent.active === false) return
      return await dataSources.teamAPI.returnTeam( parent.currentTeam.id )
    },
  },
  Team: {
    players: async ( parent, {}, { dataSources }) => {
      const players = await dataSources.teamAPI.returnRoster( parent.id, parent.season )
      const promises = players.map(async player => {
        return await dataSources.playerAPI.returnPlayer(player.person.id )
      })
      return Promise.all(promises)
    },
    division: async( parent, {}, { dataSources }) => {
      return await dataSources.divisionAPI.returnDivision( parent.division.id )
    },
    conference: async( parent, {}, { dataSources }) => {
      return await dataSources.conferenceAPI.returnConference( parent.conference.id ) 
    },
    stats: async( parent, {}, { dataSources }) => {
      return await dataSources.teamAPI.returnStats( parent.id, parent.season )
    },
  },
  Query: {
    getPlayer: async (_, { id }, { dataSources }) => {
      return await dataSources.playerAPI.returnPlayer(id)
      
    },
    getTeams: async (_, { season }, { dataSources }) => {
      validateSeasons(season)
      return await dataSources.teamAPI.returnTeams( season )
    },
    getTeam: async (_, { id, season }, { dataSources }) => {
      validateSeasons(season)
      return await dataSources.teamAPI.returnTeam(id, season)
    },
    getTeamByName: async (_, { name, season }, { dataSources }) => {
      validateSeasons(season)
      return await dataSources.teamAPI.returnTeamByName(name, season)
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
