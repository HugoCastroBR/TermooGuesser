const lettersAndValues = {
  'a':14.63,
  'e':12.57,
  'o':10.73,
  's':7.81,
  'r':6.53,
  'i':6.18,
  'n':5.05,
  'd':4.99,
  'm':4.74,
  'u':4.63,
  't':4.34,
  'c':3.88,
  'l':2.78,
  'p':2.52,
  'v':1.67,
  'g':1.30,
  'h':1.28,
  'q':1.20,
  'b':1.04,
  'f':1.02,
  'z':0.47,
  'j':0.40,
  'x':0.21,
  'k':0.02,
  'w':0.01,
  'y':0.01,
}



function getPoints(text) {
  let points = 0
  let usedLetters = []
  text.split('').forEach(letter => {
    if(!usedLetters.includes(letter)) {
      const value = lettersAndValues[letter]
      points += value
      usedLetters.push(letter)
    }
  })

  return points
}


module.exports = getPoints