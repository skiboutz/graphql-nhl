const axios = require('axios')

const Resolvers = {
  Player: {
    teamName: root => {
      return root.currentTeam.name 
    },
    teamId: root => {
      return root.currentTeam.id
    }
  },
  Teams: {
    franchiseId: root => {
      return root.franchise.franchiseId
    },
	},
	Team: {
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
    getPlayer: async (_, { id }) => {
      return await returnPlayer(id)
    },    
    getTeams: async() => {
      const teams = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams`)
      .then(response => {
        return response.data.teams
      })
      return teams
    }, 
    getTeam: async (_, { id }) => {
      const team = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${id}`)
      .then(response => {
        return response.data.teams[0]
      })
      return team
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