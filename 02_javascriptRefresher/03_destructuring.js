const person = {
  pname: "max",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  greet() {
    console.log(`Hi, I am ${this.name}`);
  },
};

const printName = ({ pname }) => {
  console.log(pname);
};

printName(person);

const { pname, age } = person;
console.log(pname, age);

const hobbies = ["sports", "cookies"];

const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);
