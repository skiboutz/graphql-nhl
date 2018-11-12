const Team = `
  type Team {
    id: Int 
    name: String
    abbreviation: String
    teamName: String
    locationName: String
    firstYearOfPlay: String
    division: Division
    conferenceName: String
    conferenceId: Int
    franchiseId: Int
    venueName: String
    venueCity: String
    venueTimeZone: String
		officialSiteUrl: String
		roster:[Player]
  }
`

module.exports = Team