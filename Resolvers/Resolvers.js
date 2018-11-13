const axios = require('axios')

const Resolvers = {
	Team: {
		roster: async (root) => {
			const roster = await(axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${root.id}?expand=team.roster`))
			.then(response => {
				const rosterPositions = response.data.teams[0].roster.roster
				const promises = rosterPositions.map(item => {
					return returnPlayer(item.person.id)
				})
				return Promise.all(promises)
			})
			return roster
		}
	},
  Query: {
    getPlayer: async (_, { id }, { dataSources }) => {
			const player = await dataSources.playerAPI.returnPlayer(id)
			.then(async player => {
				player.teamInfo = await dataSources.teamAPI.returnTeam(player.currentTeam.id)
				return player
			})
			return player
    },    
    getTeams: async(_,{},{ dataSources }) => {
      return await dataSources.teamAPI.returnTeams()
    }, 
    getTeam:  async(_,{id},{ dataSources }) => {
			const team = await dataSources.teamAPI.returnTeam(id)
			.then(async team => {
				team.division = dataSources.divisionAPI.returnDivision(team.division.id)
				return team
			})
			.then(async team => {
				team.conference = dataSources.conferenceAPI.returnConference(team.conference.id)
				return team
			})
			return team
		},
		getDivisions: async(_,{},{ dataSources }) => {
      return await dataSources.divisionAPI.returnDivisions()
		},
		getDivision: async(_,{id},{ dataSources }) => {
      return await dataSources.divisionAPI.returnDivision(id)
		},
		getConferences: async(_,{},{ dataSources }) => {
      return await dataSources.conferenceAPI.returnConferences()
		},
		getConference: async(_, {id}, { dataSources }) => {
      return await dataSources.conferenceAPI.returnConference(id)
		},

  }
}

const returnPlayer = async (id) => {
	const player = await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${id}`)
	.then(response => {
		return response.data.people[0]
	})
	return player
}
module.exports = Resolvers