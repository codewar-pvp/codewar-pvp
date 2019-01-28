'use strict'

const db = require('../server/db')
const {User, Question} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const questions = await Promise.all([
    Question.create({
      id: 1,
      title: 'Two Sum Extreme',
      description: 'This is the description of two sum',
      level: 'Hard',
      rating: 3,
      author: 'Scott',
      category: 'ARRAY, CONTROL FLOW'
    }),
    Question.create({
      id: 2,
      title: 'Binary Watch',
      description:
        'A binary watch has 4 LEDs on the top which represent the hours (0-11)...',
      level: 'Medium',
      rating: 1,
      author: 'Jason',
      category: 'ARRAY, FUNDAMENTALS'
    }),
    Question.create({
      id: 3,
      title: 'Happy Pigs',
      description: 'Fun coding problem',
      level: 'Medium',
      rating: 5,
      author: 'Stuart',
      category: 'ARRAY, NUMBERS'
    }),
    Question.create({
      id: 4,
      title: 'Binary Search',
      description: 'This is binary search description',
      level: 'Easy',
      rating: 4,
      author: 'Scott',
      category: 'ARRAY,DATA STRUCTURE'
    }),
    Question.create({
      id: 5,
      title: 'Happy Number',
      description: 'The number should be happy',
      level: 'Easy',
      rating: 2,
      author: 'Shan',
      category: 'ARRAY, ALGORITHMS'
    })
  ])

  console.log(`seeded ${users.length} users`)
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
