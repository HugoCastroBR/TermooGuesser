const findTheBestWordToStart = require('./findTheBestWordToStart.js')
const fs = require('fs')
const prompt = require('prompt-sync')({
  'fake_val': 'OPTIONAL CONFIG VALUES HERE'
});


// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

const cycle = (func,arg=true,min=0,max=4) => {
  for(let i = max; i >= min; i--) {
    if(arg){
      func(i)
    }
    else{
      func()
    }
  }
}

let WordsValues = {}

const positions = ['','','','','']
const allLetters = 'abcdefghijklmnopqrstuvwxyz'.split('')
const impossibleLetters = []
const usedLetters = []
const usedWords = []
const gameInfos = {}
const CorrectLetters = []
const letterNotIn = {}
const possibleLetters = () => {
  const letters = allLetters.filter(letter => {
    return !usedLetters.includes(letter)
  })
  return letters
}

const showLog = (word) => {
  console.log('impossibleLetters: ', impossibleLetters)
  console.log('\n')
  console.log('You have used letters: ', usedLetters)
  console.log('You have used words: ', usedWords)
  console.log('Your game infos are: ', gameInfos)
  console.log('Possible Letters: ', possibleLetters())
  console.log('\n')
  console.log('Positions: ', positions)
  console.log('\n')
}

const addJustDifferentLetters = (fromArray,toArray) => {
  fromArray.forEach(letter => {
    if(!toArray.includes(letter)) {
      toArray.push(letter)
    }
  })
}
const inputAnWord = (word) => {

  const letters = word.split('')
  const inUse = []
  let canBeUsed = true
  letters.forEach(letter => {
    if(usedLetters.includes(letter) && !positions.includes(letter)) {
      addJustDifferentLetters([letter], inUse)
      canBeUsed = false
    }
  })

  if(canBeUsed) {
    console.log('You can use this word: ', word)
    usedWords.push(word)
    // addJustDifferentLetters(letters,usedLetters)
    // letters.forEach(letter => {
    //   if(!usedLetters.includes(letter)) {
    //     usedLetters.push(letter)
    //   }
    // })
    showLog()
    getReview()
  }else{
    console.log('You can\'t use this word: ', word)
    console.log('You have used letters that are in this word: ', inUse)
    console.log('\n')

    getInput()
  }
  
}


const getInput = () => {
  let wordPlayed = prompt('Enter a word: ')
  console.log('you played: ', wordPlayed)
  inputAnWord(wordPlayed)
}


const getPossibleWords = () => {
  const data = fs.readFileSync('words.json', 'utf8')

  WordsValues = JSON.parse(data)

  const SortedKeys = Object.keys(WordsValues).sort(function(a,b){return WordsValues[a]-WordsValues[b]})
  let newWordsValues = {}
  SortedKeys.forEach(key => {
    newWordsValues[key] = WordsValues[key]
  })

  WordsValues = newWordsValues



  const allWords = Object.keys(WordsValues)
  const possibleWords = allWords.filter(word => {
    let isWordPossible = true


    let correctLettersInWord = 0
    const countPositions = CorrectLetters.reduce((acc,curr) => {
      if(curr !== '') {
        acc++
      }
      return acc
    },0)

    word.split('').forEach(letter => {
      if(CorrectLetters.includes(letter)) {
        correctLettersInWord++
      }
    })


    if(countPositions !== correctLettersInWord) {
      isWordPossible = false
    }

    CorrectLetters.forEach(letter => {
      if(!word.includes(letter)) {
        isWordPossible = false
      }
    })



    word.split('').forEach(letter => {
      if(impossibleLetters.includes(letter)){
        isWordPossible = false
      }
    })
    if(positions[0] !== '') {
      if(word[0] !== positions[0]) {
        isWordPossible = false
      }

    }
    if(positions[1] !== '') {
      if(word[1] !== positions[1]) {
        isWordPossible = false
      }
    }
    if(positions[2] !== '') {
      if(word[2] !== positions[2]) {
        isWordPossible = false
      }
    }
    if(positions[3] !== '') {
      if(word[3] !== positions[3]) {
        isWordPossible = false
      }
    }
    if(positions[4] !== '') {
      if(word[4] !== positions[4]) {
        isWordPossible = false
      }
    }

    if(letterNotIn?.[word[0]] === 0) {
      isWordPossible = false
    }
    if(letterNotIn?.[word[1]] === 1) {
      isWordPossible = false
    }
    if(letterNotIn?.[word[2]] === 2) {
      isWordPossible = false
    }
    if(letterNotIn?.[word[3]] === 3) {
      isWordPossible = false
    }
    if(letterNotIn?.[word[4]] === 4) {
      isWordPossible = false
    }

    


    return isWordPossible
  })

  console.log('Possible words: ', possibleWords)
}



const getReview = () => {
  const lastWord = usedWords[usedWords.length - 1]




  console.log('\n')
  console.log('For position Correct, type: 2')
  console.log('For position Incorrect, type: 1')
  console.log('For Incorrect Word, type: 0')
  console.log('\n')
  console.log('You played: ', lastWord)
  console.log('\n')
  let firstWordStatus = Number(prompt('Enter the Status for the first Letter: '))
  let secondWordStatus = Number(prompt('Enter the Status for the second Letter: '))
  let thirdWordStatus = Number(prompt('Enter the Status for the third Letter: '))
  let fourthWordStatus = Number(prompt('Enter the Status for the fourth Letter: '))
  let fifthWordStatus = Number(prompt('Enter the Status for the fifth Letter: '))

 





  if(firstWordStatus === 2) {
    usedLetters.push(lastWord[0])
    positions[0] = lastWord[0]
  }
  if(secondWordStatus === 2) {
    usedLetters.push(lastWord[1])
    positions[1] = lastWord[1]
  }
  if(thirdWordStatus === 2) {
    usedLetters.push(lastWord[2])
    positions[2] = lastWord[2]
  }
  if(fourthWordStatus === 2) {
    usedLetters.push(lastWord[3])
    positions[3] = lastWord[3]
  }
  if(fifthWordStatus === 2) {
    usedLetters.push(lastWord[4])
    positions[4] = lastWord[4]
  }

  if(firstWordStatus === 1) {
    addJustDifferentLetters([lastWord[0]], CorrectLetters)
    letterNotIn[lastWord[0]] = 0
  }
  if(secondWordStatus === 1) {
    addJustDifferentLetters([lastWord[1]], CorrectLetters)
    letterNotIn[lastWord[1]] = 1
  }
  if(thirdWordStatus === 1) {
    addJustDifferentLetters([lastWord[2]], CorrectLetters)
    letterNotIn[lastWord[2]] = 2
  }
  if(fourthWordStatus === 1) {
    addJustDifferentLetters([lastWord[3]], CorrectLetters)
    letterNotIn[lastWord[3]] = 3
  }
  if(fifthWordStatus === 1) {
    addJustDifferentLetters([lastWord[4]], CorrectLetters)
    letterNotIn[lastWord[4]] = 4
  }


  if(firstWordStatus === 0) {
    if(!positions.includes(lastWord[0])) {
      impossibleLetters.push(lastWord[0])
    }
  }
  if(secondWordStatus === 0) {
    if(!positions.includes(lastWord[1])) {
      impossibleLetters.push(lastWord[1])
    }
  }
  if(thirdWordStatus === 0) {
    if(!positions.includes(lastWord[2])) {
      impossibleLetters.push(lastWord[2])
    }
  }
  if(fourthWordStatus === 0) {
    if(!positions.includes(lastWord[3])) {
      impossibleLetters.push(lastWord[3])
    }
  }
  if(fifthWordStatus === 0) {
    if(!positions.includes(lastWord[4])) {
      impossibleLetters.push(lastWord[4])
    }
  }

  gameInfos[lastWord] = {
    firstWordStatus,
    secondWordStatus,
    thirdWordStatus,
    fourthWordStatus,
    fifthWordStatus
  }


  
}


const eachBet = () => {
  getInput()
  getPossibleWords()

}


const start = () => {
  // getPossibleWords()
  const firstWord = findTheBestWordToStart()
  console.log('Your first word is: ', firstWord.word)
  getPossibleWords()
  cycle(eachBet,false)
  // eachBet()
  // eachBet()
  // eachBet()
  // eachBet()
  // eachBet()
  
}

start()
