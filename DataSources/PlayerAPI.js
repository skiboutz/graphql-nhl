const { RESTDataSource } = require('apollo-datasource-rest')

class PlayerAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://statsapi.web.nhl.com/api/v1/people/'
  }
  async returnPlayer(id) {
    const playerData = await this.get(`/${id}`)
    return playerData.people[0]
  }
}

module.exports = PlayerAPI
