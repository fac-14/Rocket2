const pokemon = require("../pokemon-list");
const pokemonList = pokemon.results;

const maxResults = 5;

const removeWhitespace = input =>
  input
    .toLowerCase()
    .split("")
    .filter(x => /[a-z]/.test(x))
    .join("");

const getFiveResults = (search, obj) => {
  let count = 0;
  let output = [];
  obj
    .filter(x => x.name.includes(search) && count++ < maxResults)
    .map(x => output.push(x.name));
  return output;
};

const search = inputString => {
  if (typeof inputString === "string") {
    if (inputString === "") {
      return [];
    }
    const parsedInput = removeWhitespace(inputString);
    const resultsArray = getFiveResults(parsedInput, pokemonList);
    return resultsArray;
  } else {
    return "Error";
  }
};

module.exports = search;
