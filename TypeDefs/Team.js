const Team = `
  type Team {
    id: Int 
    name: String
    abbreviation: String
    teamName: String
    locationName: String
    firstYearOfPlay: String
    divisionName: String
    divisionShort: String
    divisionId: Int
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