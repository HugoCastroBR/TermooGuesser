const fs = require('fs')

const wordList = []

const addJustDifferentLetters = (fromArray,toArray) => {
  fromArray.forEach(letter => {
    if(!toArray.includes(letter)) {
      toArray.push(letter)
    }
  })
}
fs.readFile('words.txt', 'utf8', (err, data) => {
    if (err) throw err
    const words = data.split('\n')
    words.forEach(word => {
      if(word.length === 6) {
        console.log(word)
        // wordList.push(word.toLowerCase())
        addJustDifferentLetters([word.replace('\n','').toLowerCase()],wordList)
        // console.log(wordList)
      }
    })
    fs.writeFile('output.txt', wordList.toString(), (err) => {
      if (err) throw err
      console.log('The file has been saved!')
    })
})