const axios = require('axios')

const Resolvers = {
  Player: {
    teamInfo: root => {
			return returnTeam(root.currentTeam.id)
    }
  },
	Team: {
    division: root => {
      return returnDivision(root.division.id)
    },
    conference: root => {
      return returnConference(root.conference.id)
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
      return await dataSources.playerAPI.returnPlayer(id)
    },    
    getTeams: async(_,{},{ dataSources }) => {
      return await dataSources.teamAPI.returnTeams()
    }, 
    getTeam:  async(_,{id},{ dataSources }) => {
      return await dataSources.teamAPI.returnTeam(id)
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

const returnDivision = async (id) => {
	const division = await axios.get(`https://statsapi.web.nhl.com/api/v1/divisions/${id}`)
	.then(response => {
		return response.data.divisions[0]
	})
	return division

}

const returnConference = async (id) => {
	const conference = await axios.get(`https://statsapi.web.nhl.com/api/v1/conferences/${id}`)
	.then(response => {
		return response.data.conferences[0]
	})
	return conference
}

const returnTeam = async (id) => {
	const team = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${id}`)
	.then(response => {
		return response.data.teams[0]
	})
	return team
}

const returnPlayer = async (id) => {
	const player = await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${id}`)
	.then(response => {
		return response.data.people[0]
	})
	return player
}
module.exports = Resolvers