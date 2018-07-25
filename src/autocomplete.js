const pokemon = require("../pokemon-list");

const search = inputString => {
  //pokemon.results[24].name;
  if (typeof inputString === "string") {
    if (inputString === "") {
      return [];
    }
    let resultsArray = [];
    const resultsObj = pokemon.results
      .filter(x => x.name.includes(inputString))
      .map(x => resultsArray.push(x.name));
    //console.log(resultsArray);
    return resultsArray;
  } else {
    return "Error";
  }
};

module.exports = search;
