const first = 'abc'
const second = 'bcc'
const regexFinalWords = new RegExp(`${second}$`)

console.log(regexFinalWords.test(first))




