const { RESTDataSource } = require('apollo-datasource-rest')

class TeamAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://statsapi.web.nhl.com/api/v1/teams'
  }

  async returnTeam(id, season) {
    const team = await this.get(`/${id}`)
    team.teams[0].season = season
    return team.teams[0]
  }

  async returnTeams(season) {
    const teams = await this.get(`?season=${season}`)
    const returnTeams = teams.teams.map( async team => {
      team.season = season
      return team
    })
    
    return await returnTeams
  }

  async returnRoster(id, season) {
    const roster = await this.get(`/${id}?expand=team.roster&season=${season}`)
    return roster.teams[0].roster.roster
  }

  async returnStats(id, season) {
    const stats = await this.get(`/${id}?expand=team.stats&season=${season}`)
    return stats.teams[0].teamStats[0].splits[0].stat
  }
}

module.exports = TeamAPI

