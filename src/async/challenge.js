const fetchData = require('../utils/fetchData');
const API = 'https://rickandmortyapi.com/api/character/'
//si algo nunca va a cmabiar o mover lo ponemos en mayusculas

const anotherFunction = async (url_api) => {
  try {
    const data = await fetchData(url_api)
    const character = await fetchData(`${API}${data.results[0].id}`)
    const origin = await fetchData(character.origin.url)
    
    console.log(data.info.count)
    console.log(character.name)
    console.log(origin.dimension)
  }
  catch (error) {
    console.error(error)
  }
}

console.log('Before')
anotherFunction(API)
console.log('After')

// Te botará:
// Before
// After
// 826
// Rick Sanchez
// Dimension C-137
