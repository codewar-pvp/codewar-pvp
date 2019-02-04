'use strict'

const db = require('../server/db')
const {User, Question} = require('../server/db/models')
const fs = require('fs')

let UserFriends = db.model('user_friend')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({name: 'Stuart', email: 'stuart@email.com', password: '123'}),
    User.create({name: 'Shan', email: 'shan@email.com', password: '123'}),
    User.create({name: 'Scott', email: 'scott@email.com', password: '123'}),
    User.create({name: 'Jason', email: 'json@email.com', password: '123'}),
    User.create({name: 'Murphy', email: 'murphy@email.com', password: '123'})
  ])

  const friends = await Promise.all([
    UserFriends.create({userId: 1, friendId: 3}),
    UserFriends.create({userId: 2, friendId: 3}),
    UserFriends.create({userId: 1, friendId: 2}),
    UserFriends.create({userId: 2, friendId: 5}),
    UserFriends.create({userId: 2, friendId: 4}),
    UserFriends.create({userId: 3, friendId: 1}),
    UserFriends.create({userId: 3, friendId: 2}),
    UserFriends.create({userId: 2, friendId: 1}),
    UserFriends.create({userId: 5, friendId: 2}),
    UserFriends.create({userId: 4, friendId: 2})
  ])

  const questions = await Promise.all([
    Question.create({
      id: 1,
      title: 'Two Sum',
      description:
        'Given an array of integers and a target, find the indices of the two numbers in the array that add up to the target. The function twoSum should return an array of these two indices (with the lower index of the two being the first element in the returned array). You may assume that each input has exactly one solution. EXAMPLE: Input: numbers = [2, 7, 11, 15], target = 9; Output: [0, 1].',
      level: 'Hard',
      rating: 3,
      author: 'Scott',
      category: 'ARRAY, CONTROL FLOW',
      testSpecs: fs.readFileSync('server/codeSpecFiles/twoSum.spec.js', 'utf8'),
      funcHeader:
        'function twoSum(numbers, target) { \n  // code goes here...\n}',
      input: [[[2, 7, 11, 15], 9], [[1234, 5678, 9012], 14690], [[2, 2, 3], 4]],
      output: [[0, 1], [1, 2], [0, 1]]
    }),
    Question.create({
      id: 2,
      title: 'Insert Interval',
      description:
        'Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary). You may assume that the intervals were initially sorted according to their start times.',
      level: 'Hard',
      rating: 1,
      author: 'Jason',
      category: 'ARRAY, FUNDAMENTALS',
      testSpecs: fs.readFileSync(
        'server/codeSpecFiles/insertInterval.spec.js',
        'utf8'
      ),
      funcHeader:
        'function insert(intervals, newInterval) { \n  // code goes here...\n}',
      input: [
        [[[1, 3], [6, 9]], [2, 5]],
        [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]]
      ],
      output: [[[1, 5], [6, 9]], [[1, 2], [3, 10], [12, 16]]]
    }),
    Question.create({
      id: 3,
      title: 'Evaluate Mathematical Expression',
      description:
        'Given a mathematical expression as a string you must return the result as a number.\n\n ## Numbers may be both whole numbers and/or decimal numbers. The same goes for the returned result.\n\n You need to support the following mathematical operators:\n\n - Multiplication `*`\n - Division `/` (as true division)\n - Addition `+`\n - Subtraction `-`\n\n Operators are always evaluated from left-to-right, and `*` and `/` must be evaluated before `+` and `-`.\n\n ## Parentheses\n You need to support multiple levels of nested parentheses, ex. `(2 / (2 + 3.33) * 4) - -6`\n\n ## Whitespace\n There may or may not be whitespace between numbers and operators.\n\n An addition to this rule is that the minus sign (`-`) used for negating numbers and parentheses will *never* be separated by whitespace. I.e., all of the following are **valid** expressions.\n\n```\n 1-1    // 0\n 1 -1   // 0\n 1- 1   // 0 \n1 - 1  // 0\n1- -1  // 2\n1 - -1 // 2\n\n6 + -(4)   // 2\n6 + -( -4) // 10\n```\n\nAnd the following are **invalid** expressions\n```\n1 - - 1    // Invalid\n1- - 1     // Invalid\n6 + - (4)  // Invalid\n6 + -(- 4) // Invalid\n```\n\n## Validation\nYou do not need to worry about validation - you will only receive **valid** mathematical expressions following the above rules.\n\n```if:javascript\nNOTE: Both `eval` and `Function` are disabled. Same goes for `String.match`.\n```\n\n```if:php\nNOTE: `eval` is disallowed in your solution.\n```\n\n```if:python\nNOTE: `eval` and `exec` are disallowed in your solution.\n```',
      level: 'Hard',
      rating: 5,
      author: 'Stuart',
      category: 'ARRAY, NUMBERS',
      testSpecs: fs.readFileSync(
        'server/codeSpecFiles/evalMathExp.spec.js',
        'utf8'
      ),
      funcHeader: 'function calc(expression) { \n  // code goes here...\n}',
      input: [
        ['1+1'],
        ['1 - 1'],
        ['1* 1'],
        ['1/1'],
        ['-123'],
        ['123'],
        ['2/2+3 * 4.75- -6'],
        ['12* 123'],
        ['2/(2 + 3) * 4.33 - -6']
      ],
      output: [2, 0, 1, 1, -123, 123, 21.24, 1476, 7.732]
    }),
    Question.create({
      id: 4,
      title: 'Reverse Words in a String',
      description:
        'Given an input string, reverse the string word by word. \n EXAMPLE: \nInput: "the sky is blue";\n Output: "blue is sky the".\n NOTE:\n A word is defined as a sequence of non-space characters.\n While the input string may contain leading or trailing spaces, your reversed string should not contain leading or trailing spaces.\n You should reduce multiple spaces between two words to a single space in the reversed string.',
      level: 'Medium',
      rating: 4,
      author: 'Scott',
      category: 'ARRAY,DATA STRUCTURE',
      testSpecs: fs.readFileSync(
        'server/codeSpecFiles/reverseWords.spec.js',
        'utf8'
      ),
      funcHeader: 'function reverseWords(str) { \n  // code goes here...\n}',
      input: [['DOG IS GOD'], ['the sky is blue']],
      output: [['GOD IS DOG'], ['blue is sky the']]
    }),
    Question.create({
      id: 5,
      title: 'Next Largest Number with the Same Digits',
      description:
        'Create a function that takes a positive integer number and returns the next largest number formed by the same digits (e.g. 135 ==> 531) \n If no larger number can be composed using those digits (i.e. 9), return -1.',
      level: 'Medium',
      rating: 2,
      author: 'Shan',
      category: 'ARRAY, ALGORITHMS',
      testSpecs: fs.readFileSync(
        'server/codeSpecFiles/nextLargestNum.spec.js',
        'utf8'
      ),
      funcHeader: 'function nextLargest(n) { \n  // code goes here...\n}',
      input: [[12], [514], [2018], [9], [111], [531]],
      output: [21, 541, 2081, -1, -1, -1]
    }),
    Question.create({
      id: 6,
      title: 'Largest Number',
      description:
        'Given an array of integers, return the largest integer. EXAMPLE: Input: [54, 77, 2]; Output: 77.',
      level: 'Easy',
      rating: 3,
      author: 'Jason',
      category: 'ARRAY, ALGORITHMS',
      funcHeader: 'function largestNum(array) { \n  // code goes here...\n}',
      testSpecs: fs.readFileSync(
        'server/codeSpecFiles/largestNum.spec.js',
        'utf8'
      ),
      input: [[1, 2, 3], [7, 2, 3, 99, 3], [10, 23, 342, 87]],
      output: [3, 99, 342]
    }),
    Question.create({
      id: 7,
      title: 'Median Number',
      description:
        'Given an array of integers of an odd length, return the median integer. EXAMPLE: Input: [54, 77, 22, 656, 2, 6, 444]; Output: 54.',
      level: 'Medium',
      rating: 4,
      author: 'Jason',
      category: 'ARRAY, ALGORITHMS',
      funcHeader: 'function medianNum(array) { \n  // code goes here...\n}',
      testSpecs: fs.readFileSync(
        'server/codeSpecFiles/medianNum.spec.js',
        'utf8'
      ),
      input: [
        [54, 77, 22, 656, 2, 6, 444],
        [7, 3, 5],
        [23, 999999, 24, 65, 21]
      ],
      output: [54, 5, 24]
    }),
    Question.create({
      id: 8,
      title: 'Intersection',
      description:
        'Given two ordered arrays of integers, return an ordered array of all of the integers that they have in common. EXAMPLE: Input: [1, 5, 17, 65, 88, 98], [2, 5, 34, 54, 65, 66, 67, 88, 99, 132]; Output: [5, 65, 88].',
      level: 'Medium',
      rating: 3,
      author: 'Jason',
      category: 'ARRAY, ALGORITHMS',
      funcHeader:
        'function intersection(array1, array2) { \n  // code goes here...\n}',
      testSpecs: fs.readFileSync(
        'server/codeSpecFiles/intersection.spec.js',
        'utf8'
      ),
      input: [
        [[1, 5, 17, 65, 88, 98], [2, 5, 34, 54, 65, 66, 67, 88, 99, 132]],
        [[3, 5, 7], [4, 6, 7]]
      ],
      output: [[5, 65, 88], [7]]
    }),
    Question.create({
      id: 9,
      title: 'No Vowels Allowed!',
      description:
        'Given a string, return a string with all of the vowels (excluding y) removed (if any). EXAMPLE: Input: "andromeda"; Output: "ndrmd".',
      level: 'Easy',
      rating: 3,
      author: 'Jason',
      category: 'STRING, ALGORITHMS',
      funcHeader: 'function noVowels(string) { \n  // code goes here...\n}',
      testSpecs: fs.readFileSync(
        'server/codeSpecFiles/noVowels.spec.js',
        'utf8'
      ),
      input: ['castle', 'elephant', 'andromeda'],
      output: ['cstl', 'lphnt', 'ndrmd']
    }),
    Question.create({
      id: 10,
      title: 'Alphabetize',
      description:
        'Given an array of string, return a new array of those strings in alphabetical order." EXAMPLE: Input: ["name", "my", "Joe", "hi"]; Output: ["hi", "my", "Joe", "name"].',
      level: 'Easy',
      rating: 2,
      author: 'Jason',
      category: 'ARRAY, STRING, ALGORITHMS',
      funcHeader: 'function alphabetize(array) { \n  // code goes here...\n}',
      testSpecs: fs.readFileSync(
        'server/codeSpecFiles/alphabetize.spec.js',
        'utf8'
      ),
      input: [['name', 'my', 'Joe', 'hi']],
      output: [['Joe', 'hi', 'my', 'name']]
    }),
    Question.create({
      id: 11,
      title: 'Replace Character',
      description:
        'Given a string of words, return a new string that replaces every instance of the character "a" with the character "b". EXAMPLE: Input: "I would like to see an elephant one day", Output: "I would like to see bn elephbnt one day".',
      level: 'Easy',
      rating: 2,
      author: 'Jason',
      category: 'ARRAY, STRING, ALGORITHMS',
      funcHeader: 'function replaceAB(string) { \n  // code goes here...\n}',
      testSpecs: fs.readFileSync(
        'server/codeSpecFiles/replaceChar.spec.js',
        'utf8'
      ),
      input: ['I would like to see an elephant one day'],
      output: ['I would like to see bn elephbnt one dby']
    }),
    Question.create({
      id: 12,
      title: 'Quantum Mechanics',
      description:
        'Given an array of "electrons", return a new array of "quarks". If you are unfamiliar with quantam mechanics, please check out the very helpful wikipedia page. It is a good place to start. Aftewards, consider getting a phd in theoretical physics. Once complete, you should have a good foundation for approaching this question.',
      level: 'Hard',
      rating: 5,
      author: 'Jason',
      category: 'ARRAY, QUANTAM MECHANICS',
      funcHeader: 'function quantam(array) { \n  // code goes here...\n}',
      testSpecs: fs.readFileSync(
        'server/codeSpecFiles/quantumMech.spec.js',
        'utf8'
      ),
      input: [['electrons']],
      output: [['quarks']]
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${friends.length} friends`)
  console.log(`seeded ${questions.length} questions`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}
// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.

if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
