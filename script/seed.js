'use strict'

const db = require('../server/db')
const {User, Question} = require('../server/db/models')

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
      title: 'Two Sum Extreme',
      description:
        ' Given an array of integers, find two numbers such that they add up to a specific target number.The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are not zero-based.You may assume that each input would have exactly one solution. Input: numbers={2, 7, 11, 15}, target=9 Output: index1=1, index2=2',
      level: 'Hard',
      rating: 3,
      author: 'Scott',
      category: 'ARRAY, CONTROL FLOW',
      testSpecs:
        'describe(`${questionTitle} question`, () => {try {userOutput.forEach((item, idx) => {it(`The input for the question: ${JSON.stringify(input[idx])}, output expected to be a ${expectedOutputType}.`, () => {expect(item).to.be.a(expectedOutputType)})it(`Expected output: ${output[idx]}, instead got: ${item}`, () => {expect(item).to.eql(output[idx])})})} catch (error) {console.log("did not pass the test!")}})',
      funcHeader: 'function twoSum(numbers, target) { \n //code goes here \n }',
      input: `[[[2,7,11,15],9],[[1234,5678,9012],14690],[[2,2,3],4]]`,
      output: `[[0,1],[1,2],[0,1]]`
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
      testSpecs: 'Test specs will go here',
      funcHeader:
        '/**\n* Definition for an interval.\n* function Interval(start, end) {\n*     this.start = start;\n*     this.end = end;\n* }\n*/\n/**\n* @param {Interval[]} intervals\n* @param {Interval} newInterval\n* @return {Interval[]}\n*/\n function insert(intervals, newInterval) { \n };',
      input:
        '[[[[1,3],[6,9]], [2,5]], [[[1,2],[3,5],[6,7],[8,10],[12,16]],[4,8]]]',
      output: '[[[1,5],[6,9]], [[1,2],[3,10],[12,16]]]'
    }),
    Question.create({
      id: 3,
      title: 'Evaluate Mathematical Expression',
      description:
        '# Instructions\n\nGiven a mathematical expression as a string you must return the result as a number.\n\n## Numbers\nNumber may be both whole numbers and/or decimal numbers. The same goes for the returned result.\n\n## Operators\nYou need to support the following mathematical operators:\n\n - Multiplication `*`\n - Division `/` (as true division)\n - Addition `+`\n - Subtraction `-`\n\nOperators are always evaluated from left-to-right, and `*` and `/` must be evaluated before `+` and `-`.\n\n## Parentheses\nYou need to support multiple levels of nested parentheses, ex. `(2 / (2 + 3.33) * 4) - -6`\n\n## Whitespace\nThere may or may not be whitespace between numbers and operators.\n\nAn addition to this rule is that the minus sign (`-`) used for negating numbers and parentheses will *never* be separated by whitespace. I.e., all of the following are **valid** expressions.\n\n```\n1-1    // 0\n1 -1   // 0\n1- 1   // 0\n1 - 1  // 0\n1- -1  // 2\n1 - -1 // 2\n\n6 + -(4)   // 2\n6 + -( -4) // 10\n```\n\nAnd the following are **invalid** expressions\n```\n1 - - 1    // Invalid\n1- - 1     // Invalid\n6 + - (4)  // Invalid\n6 + -(- 4) // Invalid\n```\n\n## Validation\nYou do not need to worry about validation - you will only receive **valid** mathematical expressions following the above rules.\n\n```if:javascript\nNOTE: Both `eval` and `Function` are disabled. Same goes for `String.match`.\n```\n\n```if:php\nNOTE: `eval` is disallowed in your solution.\n```\n\n```if:python\nNOTE: `eval` and `exec` are disallowed in your solution.\n```',
      level: 'Hard',
      rating: 5,
      author: 'Stuart',
      category: 'ARRAY, NUMBERS',
      testSpecs: 'Test specs will go here',
      funcHeader:
        'function calc(expression) { \n //evaluate expression and return result\n }',
      input: `[
        ["1+1"],
        ["1 - 1"],
        ["1* 1"],
        ["1/1"],
        ["-123"],
        ["123"],
        ["2/2+3 * 4.75- -6"],
        ["12* 123"],
        ["2/(2 + 3) * 4.33 - -6"]
      ]`,
      output: `[2,0, 1,1, -123, 123, 21.24, 1476, 7.732]`
    }),
    Question.create({
      id: 4,
      title: 'Reverse Words in a String',
      description:
        'Given an input string, reverse the string word by word. \n Example: \nInput: "the sky is blue",\nOutput: "blue is sky the".\nNote:\nA word is defined as a sequence of non-space characters.\nInput string may contain leading or trailing spaces. However, your reversed string should not contain leading or trailing spaces.\nYou need to reduce multiple spaces between two words to a single space in the reversed string.',
      level: 'Medium',
      rating: 4,
      author: 'Scott',
      category: 'ARRAY,DATA STRUCTURE',
      testSpecs: 'Test specs will go here',
      funcHeader:
        '/**\n* @param {string} str\n* @returns {string}\n*/\nfunction reverseWords(str) { \n //code goes here \n }',
      input: `["the sky is blue"]`,
      output: `["blue is sky the"]`
    }),
    Question.create({
      id: 5,
      title: 'Next bigger number with the same digits',
      description:
        'You have to create a function that takes a positive integer number and returns the next bigger number formed by the same digits: 135==>531\n If no bigger number can be composed using those digits, return -1 9===>-1',
      level: 'Medium',
      rating: 2,
      author: 'Shan',
      category: 'ARRAY, ALGORITHMS',
      testSpecs: 'Test specs will go here',
      funcHeader:
        '/** \n * @param {number} n \n */ \n function nextBigger(n) { \n // coding start here... \n }',
      input: `[[12],[514],[2018],[9],[111],[531]]`,
      output: `[21,541,2081,-1,-1,-1]`
    }),
    Question.create({
      id: 6,
      title: 'Return Largest Number',
      description: 'Takes in an array of integers and returns the largest one',
      level: 'Easy',
      rating: 1,
      author: 'Jason',
      category: 'ARRAY, ALGORITHMS',
      funcHeader: 'function largestNum(array) { \n //code goes here \n }',
      testSpecs: 'Test specs will go here',
      input: '[[1, 2, 3], [7, 2, 3, 99, 3], [10, 23, 342, 87]]',
      output: '[3, 99, 342]'
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
