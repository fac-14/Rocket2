/* THESE TESTS ARE WILDLY OUTDATED AND WILL ALL FAIL */

var test = require("tape");
var logic = require("./logic.js");

test("Tape is working", function(t) {
  t.equal(1, 1, "1 equals 1");
  t.end();
});

/*test("gimme a name", function(t) {
  var actual = logic.APICall("pikachu");
  var expected = "pikachu";
  t.equal(actual, expected, "name should be pikachu");
  t.end();
});*/

test("Pokedex entry number is 1", function(t) {
  var actual = logic.entryNumber;
  var expected = 1;
  t.equal(actual, expected, "entryNumber key should have value of 1");
  t.end();
});

test("4 moves", function(t) {
  var actual = logic.moves;
  var expected = ["captivate", "razor wind", "swords dance"];
  t.deepEqual(actual, expected, "bulbasaur should have a few moves");
  t.end();
});

test("description", function(t) {
  var actual = logic.description;
  var expected =
    "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.";
  t.equal(actual, expected, "description should be present");
  t.end();
});

test("sprite", function(t) {
  var actual = logic.sprite;
  var expected =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png";
  t.equal(actual, expected, "description should be present");
  t.end();
});
test("object", function(t) {
  var actual = logic;
  var expected = {
    name: "bulbasaur",
    entryNumber: 1,
    moves: ["captivate", "razor wind", "swords dance"],
    type: ["poison", "grass"],
    description:
      "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  };
  t.deepEqual(actual, expected, "should return object");
  t.end();
});
