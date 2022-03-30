'use strict'

function noElseIf (p) {
  if (p < 100) {
    testMethod()
  } else if (p > 3) {
    statementError()
  }
}

function testMethod() {
  return 999

  const a = 1
  console.log(a)
}

function statementError (arg) {
  for (let i = 0; i < 9; ++i) {
    console.log('i', i)
  }

  testMethod()

  arg = arg * 9
  let answer = 0
  switch (arg) {
    case 1:
      answer += 11
      break;
    case 2:
      answer += 22

      break
    default:
      answer += 1000
  }

  console.log('answer', answer)

  Object.keys(arg).filter(it => it > 10).map(it => `[${it}]`)

  const x = arg ? 'OK' : 'NG'
  const y = arg
    ? 'OK'
    : answer
      ? 'more'
      : 'none'
}

async function asyncFunc () {
  return await 9
}

function noUnexpectedMultiline () {
  const x = this.service
  [1, 3, 5].map(it => it + 5)

  const y = this.service;
  [1, 3, 5].map(it => it + 5)

  if (
    x ||
    y
  ) {
    return
  }
}

class Sample {
  constructor (a) {
    this.a = a
  }

  noEmptyLineBeforeReturn (arg) {
    const result = arg * 8
    return result
  }

  noEmptyLineBeforeThrow (arg) {
    const error = new Error(arg)
    throw error
  }

  noUnneededTernary (arg) {
    var a = x === 2 ? true : false

    return a
  }

  /**
   * brace style
   * @param {boolean} arg - true: 999
   * @returns {number} sending value.
   */
  braceStyle (arg) {
    if (arg) {
      return 999
    }
    else {
      return -1
    }
  }

  /**
   *
   * @param {*} arg
   * @returns {number}
   */
  semiSpacing (arg) {
    const y = this.service
    ;[1, 3, 5].map(it => it + 5)

    const a = arg + 9 ; const b = a * 30;const c = a + b + y

    return c
  }

  /*
   *spaced comment
   *@returns {number} space count
   */
  spacedComment () {
    //spaced comment
    return 999
  }

  spaceBeforeBlocks (){
    // space-before-blocks
  }

  spaceInfixOps () {
    return 1+5;
  }

  noWhitespaceBeforeProperty () {
    return this. errorMessage
  }

  paddedBlocks () {

    return 888
  }

  commaStyle () {
    return [
      1
      , 3
      , 5
    ]
  }

  camel_case () {
    return 5
  }
}