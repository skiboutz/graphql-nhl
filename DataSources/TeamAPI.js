const { RESTDataSource } = require('apollo-datasource-rest')

class TeamAPI extends RESTDataSource {
	constructor() {
		super()
		this.baseURL = 'https://statsapi.web.nhl.com/api/v1/teams'
	}
	
	async returnTeam(id) {
		const team = await this.get(`/${id}`)
		// //TODO: Refactor this with reduce
		// let newTeam = team.teams[0] 
		// newTeam.venueName = newTeam.venue.name 
		// newTeam.venueCity = newTeam.venue.city 
		// newTeam.venueTimeZone = newTeam.venue.timeZone.tz
		// console.log(team)

		// // const newTeam =  team.teams[0].reduce(( accumulator, data ) => ({
		// // 	...accumulator,
		// // 	...data,
		// // 	venueName: data.venue.name,
		// // 	venueCity: data.venu.city,
		// // 	venueTimeZone: data.venue.timeZone.tz

		// // }),{})
		// console.log(newTeam)
		return team.teams[0]
	}
	
	async returnTeams() {
		const team = await this.get(`/`)
		return team.teams
	}

	async returnRoster(id) {
		const roster = await this.get(`/${id}?expand=team.roster`)
		return roster.teams[0].roster.roster
	}
}

module.exports = TeamAPI

