const s = "sidhu"

function test() {
    console.log("Test function executed");
}

let num = 1221
let or = num
let rev = 1
while (num != 0) {
    rev = rev * 10 + num % 10
    num /= 10
}
if (rev == or) {
    console.log(`it is a palindrome`)
} else {
    console.log(`it is not a palindrom`)
}