/*String*/
const address = "Surabaya";
console.log(address);

/*Number*/
const score = 0.1 + 0.2;
const isScoreValid = 0.3 == score;
console.log(score); // 0.30000000000004
console.log(isScoreValid); //false

/*Boolean*/
let isRainy = true; //true or false
console.log(isRainy);//true

/*Null*/
let nullable = null;
console.log(nullable);//null

/*Undefined*/
let undefinedVar = undefined;
console.log(undefinedVar);//undefined

/*
    Notes:
    null, undefined is same, null is for variable that null or empty
    undefined is variable that has not defined
    and it is same to boolean false if we use condition
*/

const names = ['Dazzel', 'axe','kunka','terrorblade','meepo']
names.forEach((name) => {
    console.log(name);
})


const x = 21;
const y = 23;
const z = (y-x)*2.5;
console.log(z);

console.log( true || 10 && false);

const angka  = [10, 8, 7, 5, 6, 3, 2, 4, 1]
console.log(angka);
angka.sort();
console.log(angka);

const countries = ["albania", "turkey", "netherland", "germany", "spain", "england"];
countries.includes("turkey");