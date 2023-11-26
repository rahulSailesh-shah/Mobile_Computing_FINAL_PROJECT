// function greet() {
//   console.log(`${this.name} -- ${this.age}`);
// }

// var obj = { name: "Rahul", age: 25 };
// const boundGreet = greet.bind(obj);
// boundGreet();

function callback() {
  console.log("Callback fn");
}

function test(opr) {
  console.log("ffff");

  opr();
}

test(callback);
