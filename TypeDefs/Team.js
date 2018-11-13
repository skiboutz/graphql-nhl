const Team = `
  type Team {
    id: Int 
    name: String
    abbreviation: String
    teamName: String
    locationName: String
    firstYearOfPlay: String
    division: Division
    conference: Conference
    franchiseId: Int
    venue: Venue
		officialSiteUrl: String
		roster:[Player]
  }
`

module.exports = Team
