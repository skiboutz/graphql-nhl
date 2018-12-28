const { RESTDataSource } = require('apollo-datasource-rest')

class ProspectAPI extends RESTDataSource {
    constructor() {
      super()
      this.baseURL = 'https://statsapi.web.nhl.com/api/v1/draft/prospects'
    }
  
    async returnProspects() {
      const prospects = await this.get(``)
      return prospects.prospects.sort((a,b) => {
        return a.fullName.localeCompare(b.fullName)
      })
    }

    async returnProspect(id) {
      const prospects = await this.get(`/${id}`)
      return prospects.prospects[0]
    }
  }
  
  module.exports = ProspectAPI