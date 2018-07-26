var test = require("tape");
const search = require("./autocomplete");

test("Testing Tape is working", function(t) {
  t.equal(1, 1, "One should equal one");
  t.end();
});

test("Basic I/O functions", function(t) {
  let actual = search("");
  let expected = "{'response':[]}";
  t.deepEqual(actual, expected, "function has returned an empty JSON object");
  actual = search([]);
  expected = "Error";
  t.deepEqual(actual, expected, "argument inputString must be a string");
  t.end();
});

test("Testing autocomplete returns array of information correctly", function(t) {
  let actual = JSON.stringify(search("ex")); // user has entered a string input
  let expected = JSON.stringify({
    response: ["exeggcute", "exeggutor", "exploud", "excadrill", "toxapex"]
  });
  t.deepEqual(
    actual,
    expected,
    "function has only return 5 pokemon names including ex"
  );
  t.end();
});

test("Testing function ignores whitespace", function(t) {
  let actual = search("bulba saur"); // user has entered a string input
  let expected = { response: ["bulbasaur"] };
  t.deepEqual(
    actual,
    expected,
    "function should return bulbasaur when searching for bulba saur"
  );
  actual = JSON.stringify(search("to ge pi")); // user has entered a string input
  expected = JSON.stringify({ response: ["togepi"] });
  t.deepEqual(
    actual,
    expected,
    "function should return togepi when searching for to ge pi"
  );
  actual = JSON.stringify(search("      charmander")); // user has entered a string input
  expected = JSON.stringify({ response: ["charmander"] });
  t.deepEqual(
    actual,
    expected,
    "function should return charmander when searching for '      charmander'"
  );
  t.end();
});

test("Capitalisation on Input", function(t) {
  let actual = search("Bulbasaur");
  let expected = { response: ["bulbasaur"] };
  t.deepEqual(
    actual,
    expected,
    "function should return bulbasaur when searching for Bulbasaur"
  );
  actual = JSON.stringify(search("Charmander"));
  expected = JSON.stringify({ response: ["charmander"] });
  t.deepEqual(
    actual,
    expected,
    "function should return charmander when searching for Charmander"
  );
  actual = JSON.stringify(search("BuLbAsAuR"));
  expected = JSON.stringify({ response: ["bulbasaur"] });
  t.deepEqual(
    actual,
    expected,
    "function should return charmander when searching for Charmander"
  );
  t.end();
});

test("Remove invalid characters", function(t) {
  let actual = JSON.stringify(search("bulbasa88ur"));
  let expected = JSON.stringify({ response: ["bulbasaur"] });
  t.deepEqual(actual, expected, "should ignore numbers");
  actual = JSON.stringify(search("$%charmander"));
  expected = JSON.stringify({ response: ["charmander"] });
  t.deepEqual(actual, expected, "function should ignore special characters");
  actual = JSON.stringify(search("(){}=>togepi"));
  expected = JSON.stringify({ response: ["togepi"] });
  t.deepEqual(actual, expected, "should ignore characters used in JS");
  t.end();
});
