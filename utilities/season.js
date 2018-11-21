const moment = require('moment')

const validateSeasons = (season) => {
  //Ensure the years are valid length and format
  if( season.toString().length !== 8 ) {
    throw new Error('season must be 8 digits representing 2 consecutive years')
  }

  //Check that the years are consecutive
  const yearOne = season.toString().slice(0,4)
  const yearTwo = season.toString().slice(4,8)

  if( parseInt(yearOne) !== parseInt(yearTwo) -1 ) {
    throw new Error('season must consist of 2 consecutive years ex: 20172018')
  }

  //Check if year one is valid
  if( parseInt(yearOne) < 1917 ) {
    throw new Error('season year one must be greater than 1917')
  }

  //Check if year two is valid
  const currentMonth = moment().month() + 1
  const maxYear = currentMonth >= 7 && currentMonth <= 12 ? moment().year() + 1 : moment().year()
  
  if( yearTwo > maxYear ) {
    throw new Error(`season year two must be less than ${maxYear}`)
  }
  
}

module.exports = validateSeasons