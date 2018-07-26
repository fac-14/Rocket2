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
  let expected = ["exeggcute", "exeggutor", "exploud", "excadrill", "toxapex"];
  t.deepEqual(
    actual,
    expected,
    "function has only return 5 pokemon names including ex"
  );
  t.end();
});

test("Testing function ignores whitespace", function(t) {
  let actual = search("bulba saur"); // user has entered a string input
  let expected = ["bulbasaur"];
  t.deepEqual(
    actual,
    expected,
    "function should return bulbasaur when searching for bulba saur"
  );
  actual = search("to ge pi"); // user has entered a string input
  expected = ["togepi"];
  t.deepEqual(
    actual,
    expected,
    "function should return togepi when searching for to ge pi"
  );
  actual = search("      charmander"); // user has entered a string input
  expected = ["charmander"];
  t.deepEqual(
    actual,
    expected,
    "function should return charmander when searching for '      charmander'"
  );
  t.end();
});

test("Capitalisation on Input", function(t) {
  let actual = search("Bulbasaur");
  let expected = ["bulbasaur"];
  t.deepEqual(
    actual,
    expected,
    "function should return bulbasaur when searching for Bulbasaur"
  );
  actual = search("Charmander");
  expected = ["charmander"];
  t.deepEqual(
    actual,
    expected,
    "function should return charmander when searching for Charmander"
  );
  actual = search("BuLbAsAuR");
  expected = ["bulbasaur"];
  t.deepEqual(
    actual,
    expected,
    "function should return charmander when searching for Charmander"
  );
  t.end();
});

test("Remove invalid characters", function(t) {
  let actual = search("bulbasa88ur");
  let expected = ["bulbasaur"];
  t.deepEqual(actual, expected, "should ignore numbers");
  actual = search("$%charmander");
  expected = ["charmander"];
  t.deepEqual(actual, expected, "function should ignore special characters");
  actual = search("(){}=>togepi");
  expected = ["togepi"];
  t.deepEqual(actual, expected, "should ignore characters used in JS");
  t.end();
});
