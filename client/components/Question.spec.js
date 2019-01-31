import {expect} from 'chai'

// This part from User to click button to run code.
function largestNum(array) {
  let largest = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i] > largest) {
      largest = array[i]
    }
  }
  return largest
}

// This part from DB test table
const input = [[], [1, 2, 3], [10, 23, 342, 87], [7, 2, 3, 99, 3]]
const output = [0, 3, 342, 7]
const expectedOutputType = 'number'
const questionTitle = 'Two Sum'

const str = JSON.stringify([['test', [0, 1, 3], 1]])
console.log(JSON.parse(str))
// This part run in VM code
const userOutput = input.map(item => largestNum(item))

describe(`${questionTitle} question`, () => {
  try {
    userOutput.forEach((item, idx) => {
      it(`The input for the question: ${JSON.stringify(
        input[idx]
      )}, output expected to be a ${expectedOutputType}.`, () => {
        expect(item).to.be.a(expectedOutputType)
      })

      it(`Expected output: ${output[idx]}, instead got: ${item}`, () => {
        expect(item).to.eql(output[idx])
      })
    })
  } catch (error) {
    console.log('did not pass the test!')
  }
})
