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
      funcHeader: 'function twoSum(numbers, target) { \n //code goes here \n }'
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
        '/**\n* Definition for an interval.\n* function Interval(start, end) {\n*     this.start = start;\n*     this.end = end;\n* }\n*/\n/**\n* @param {Interval[]} intervals\n* @param {Interval} newInterval\n* @return {Interval[]}\n*/\n const insert = function(intervals, newInterval) { \n };',
      input:
        '[[[[1,3],[6,9]], [2,5]], [[[1,2],[3,5],[6,7],[8,10],[12,16]],[4,8]]]',
      output: '[[[1,5],[6,9]], [[1,2],[3,10],[12,16]]]'
    }),
    Question.create({
      id: 3,
      title: 'Happy Pigs',
      description: 'Fun coding problem',
      level: 'Medium',
      rating: 5,
      author: 'Stuart',
      category: 'ARRAY, NUMBERS',
      testSpecs: 'Test specs will go here',
      funcHeader: 'function twoSum(numbers, target) { \n //code goes here \n }'
    }),
    Question.create({
      id: 4,
      title: 'Binary Search',
      description: 'This is binary search description',
      level: 'Easy',
      rating: 4,
      author: 'Scott',
      category: 'ARRAY,DATA STRUCTURE',
      testSpecs: 'Test specs will go here',
      funcHeader: 'function twoSum(numbers, target) { \n //code goes here \n }'
    }),
    Question.create({
      id: 5,
      title: 'Random Pick with Blacklist',
      description:
        'Given a blacklist B containing unique integers from [0, N), write a function to return a uniform random integer from [0, N) which is NOT in B. Optimize it such that it minimizes the call to system’s Math.random(). Note: 1 <= N <= 1000000000 0 <= B.length < min(100000, N) [0, N) does NOT include N. See interval notation. \n Example 1: Input: ["Solution","pick","pick","pick"] [[1,[]],[],[],[]] Output: [null,0,0,0] \n  Example 2: Input: [["Solution","pick","pick","pick"][[2,[]],[],[],[]] Output: [null,1,1,1] \n  Example 3: Input: ["Solution","pick","pick","pick"][[3,[1]],[],[],[]] Output: [null,0,0,2] \n  Example 4: Input: ["Solution","pick","pick","pick"] [[4,[2]],[],[],[]] Output: [null,1,3,1] \n  Explanation of Input Syntax: The input is two lists: the subroutines called and their arguments. Solutions constructor has two arguments, N and the blacklist B. pick has no arguments. Arguments are always wrapped with a list, even if there are not any.',
      level: 'Hard',
      rating: 2,
      author: 'Shan',
      category: 'ARRAY, ALGORITHMS',
      testSpecs: 'Test specs will go here',
      funcHeader:
        '/** \n * @param {number} N \n * @param {number[]} blacklist*/ \n var Solution = function(N, blacklist) { \n }; \n /** \n * @return {number} \n */ \n Solution.prototype.pick = function() { \n   \n};\n /** \n* Your Solution object will be instantiated and called as such: \n* var obj = Object.create(Solution).createNew(N, blacklist) \n* var param_1 = obj.pick()\n*/'
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
      output: '[[3], [99], [342]]'
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
