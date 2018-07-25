var test = require("tape");
const search = require("./autocomplete");

const dummyArray = [{}];

test("Testing Tape is working", function(t) {
  t.equal(1, 1, "One should equal one");
  t.end();
});

test("Testing autocomplete returns an array", function(t) {
  let actual = search("");
  let expected = [];
  t.deepEqual(actual, expected, "function has returned an array");
  actual = search([]);
  expected = "Error";
  t.deepEqual(actual, expected, "argument inputString must be a string");
  t.end();
});

test("Testing autocomplete returns array of information correctly", function(t) {
  let actual = search("ex"); // user has entered a string input
  let expected = [
    "exeggcute",
    "exeggutor",
    "exploud",
    "excadrill",
    "toxapex",
    "exeggutor-alola"
  ];
  t.deepEqual(
    actual,
    expected,
    "function has only return pokemon names including ex"
  );
  t.end();
});
