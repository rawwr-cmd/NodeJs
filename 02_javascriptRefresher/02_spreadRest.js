const hobbies = ["training", "playing", "selling chickens"];

// const copiedArray = hobbies.slice(2);
// console.log(copiedArray);

//spread
const newArray = [
  ...hobbies,
  "programming",
  "banging chicks",
  "making silly jokes",
];
console.log(newArray);
console.log(hobbies);

const person = {
  name: "Akshay",
  age: 29,
  greet() {
    console.log("hi there I am " + this.name + " my age is " + this.age);
  },
};

const copiedPerson = { ...person, subjects: ["maths", "physics"] };
console.log(copiedPerson);
console.log(person);

//rest
const popper = (name, ...numbers) => {
  let total = 0;
  for (let num of numbers) {
    total += num;
  }
  return "I am " + name + " and I know " + total;
};

console.log(popper("Akshay", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

//2

const popper1 = (...args) => {
  return args; //will give a list of arrays
};

console.log(popper1(12, 353, 463, 633));
