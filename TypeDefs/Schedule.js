const Schedule = `
  type Schedule {
    date: String
    totalItems: Int
    totalEvents: Int
    totalGames: Int
    totalMatches: Int
    games: [Game]
  }
`

module.exports = Schedule
