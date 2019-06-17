//@ts-check
const randEmoji = require('./rand_emoji')

setInterval(() => {
    console.log(randEmoji())
}, 1000);