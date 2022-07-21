let pname = "Max";
let age = 29;
const hasHobbies = true;

// hasHobbies = false;

const summarizeUser = (userName, userAge, userHasHobby) => {
  return (
    "Name is " +
    userName +
    ", age is " +
    userAge +
    " and the user has hobbies: " +
    userHasHobby
  );
};

const add = (a) => a + 10;
const random = () => 24 + 15;

console.log(add(5));
console.log(random());
console.log(summarizeUser(pname, age, hasHobbies));
console.log(summarizeUser("akshay", 67, "playing"));

const person = {
  name: "Akshay",
  age: 29,
  greet() {
    console.log("hi there I am " + this.name + " my age is " + this.age);
  },
};

person.greet();

//arrays
const hobbies = ["Sports", "Cooking"];
hobbies.push("pragramming");

for (let hobby of hobbies) {
  console.log(hobby);
}

const pop = hobbies.map((hobby) => "hobby: " + hobby);
console.log(hobbies);
