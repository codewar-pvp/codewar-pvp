'use strict'

const db = require('../server/db')
const {User, Question} = require('../server/db/models')

let UserFriends = db.model('user_friend')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'stuart@email.com', password: '123'}),
    User.create({email: 'shan@email.com', password: '123'}),
    User.create({email: 'scott@email.com', password: '123'}),
    User.create({email: 'json@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const friends = await Promise.all([
    UserFriends.create({userId: 1, friendId: 3}),
    UserFriends.create({userId: 2, friendId: 3}),
    UserFriends.create({userId: 1, friendId: 2}),
    UserFriends.create({userId: 2, friendId: 5}),
    UserFriends.create({userId: 2, friendId: 4})
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
        'function numericalCompare(a, b) {return a - b;}Test.assertSimilar(twoSum([1,2,3], 4).sort(numericalCompare), [0,2]);Test.assertSimilar(twoSum([1234,5678,9012], 14690).sort(numericalCompare), [1,2]);Test.assertSimilar(twoSum([2,2,3], 4).sort(numericalCompare), [0,1]);',
      funcHeader: 'function twoSum(numbers, target) { \n //code goes here \n }'
    }),
    Question.create({
      id: 2,
      title: 'Binary Watch',
      description:
        'A binary watch has 4 LEDs on the top which represent the hours (0-11)...',
      level: 'Medium',
      rating: 1,
      author: 'Jason',
      category: 'ARRAY, FUNDAMENTALS',
      testSpecs: 'Test specs will go here',
      funcHeader: 'function twoSum(numbers, target) { \n //code goes here \n }'
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
      title: 'Happy Number',
      description: 'The number should be happy',
      level: 'Easy',
      rating: 2,
      author: 'Shan',
      category: 'ARRAY, ALGORITHMS',
      testSpecs: 'Test specs will go here',
      funcHeader: 'function twoSum(numbers, target) { \n //code goes here \n }'
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
