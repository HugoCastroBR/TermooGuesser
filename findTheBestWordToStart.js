const getPoints = require('./getPoints.js')
const fs = require('fs')

// const fs = require('fs')


const readTextFile =  (fileName) => {
  const wordList = []
  // return fs.readFile(fileName, 'utf8', (err, data) => {
  //   if (err) throw err
  //   const words = data.split(',')
  //   words.forEach(word => {
  //     if(word.length === 5) {
  //       // console.log(word)
  //       wordList.push(word)
  //       // console.log(wordList)
  //     }
  //   })
  //   // fs.writeFile('output.txt', wordList.toString(), (err) => {
  //   //   if (err) throw err
  //   //   console.log('The file has been saved!')
  //   // })
  // })

  const data = fs.readFileSync(fileName, 'utf8')
  const words = data.split(',')

  words.forEach(word => {
    let wordWithoutSimbols = word.replace(/\s/g, '')
    if(wordWithoutSimbols.length === 5) {
      // console.log(word)
      wordList.push(wordWithoutSimbols)
        // console.log(wordList)
    }
  })

  console.log(wordList)
  return wordList

}



const genPoints =  () => {
  const wordList = readTextFile('words.txt')
  const wordObject = {}

  wordList.forEach(word => {
    const points = getPoints(word)
    if(!isNaN(points)) {
      wordObject[word] = getPoints(word)
    }
    
  })

  return wordObject
}

// V = X1 + X2 + X3 + X4 + X5
// Xx = Xx% * 100
const findTheMaxValueFromAnObject = (object) => {
  let maxValue = 0
  let word = ''
  for(let key in object) {
    if(object[key] > maxValue) {
      word = key
      maxValue = object[key]
    }
  }
  fs.writeFileSync('words.json', JSON.stringify(object))
  return {word, value:maxValue}
}


const findTheBestWordToStart = () => {
  return findTheMaxValueFromAnObject(genPoints())
}

module.exports = findTheBestWordToStart
