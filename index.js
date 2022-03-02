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

    for(let i = 0; i < 5; i++) {
      if(positions[i] !== '') {
        if(word[i] !== positions[i]) {
          isWordPossible = false
        }
      }
      if(letterNotIn?.[word[i]] === i) {
        isWordPossible = false
      }
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


  const wordsInput = []

  for(let i = 0; i < 5; i++){
    wordsInput.push(Number(prompt('Enter the Status for the ' + (i+1) + ' Letter: ')))
  }

  for(let i = 0; i < 5; i++){
    if(wordsInput[i] === 2) {
      usedLetters.push(lastWord[i])
      positions[i] = lastWord[i]
    }
  }

  for(let i = 0; i < 5; i++){
    if(wordsInput[i] === 1) {
      addJustDifferentLetters([lastWord[i]], CorrectLetters)
      letterNotIn[lastWord[i]] = i
    }
  }

  for(let i = 0; i < 5; i++){
    if(wordsInput[i] === 0) {
      if(!positions.includes(lastWord[i])) {
        impossibleLetters.push(lastWord[i])
      }
    }
  }



  gameInfos[lastWord] = {
    firstWordStatus : wordsInput[0],
    secondWordStatus : wordsInput[1],
    thirdWordStatus : wordsInput[2],
    fourthWordStatus : wordsInput[3],
    fifthWordStatus : wordsInput[4]
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
