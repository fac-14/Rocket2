// modular xhr request
// takes TWO callbacks: parsecb (for parsing the JSON response) (logic.js)
// and domcb, for rendering to DOM (from dom.js)
function xhr(method, url, parsecb, domcb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(xhr.responseText);
      parsecb(result, domcb);
    } else if (this.status == 404) {
      // return 404 as a number if a 404, helpful for functions
      parsecb(404, domcb);
    }
  };
  xhr.open(method, url, true);
  xhr.send();
}

// parse the pokemon description
function pokeDescripParse(input, domcb) {
  if (input == 404) {
    domcb("It's a 404. Maybe one day it will be a real Pokemon. But not today");
  } else {
    var pokeDescripResponse = input.flavor_text_entries;

    for (var i = 0; i < pokeDescripResponse.length; i++) {
      if (pokeDescripResponse[i].language.name == "en") {
        var pokeDescrip = pokeDescripResponse[i].flavor_text;
        break;
      }
    }
    domcb(pokeDescrip);
  }

  // .flavor_text_entries
  // .language.name == “en”
  // . flavor_text
}

// parse our main pokemon API request
function pokeParse(data, domcb) {
  if (data == 404) {
    var api404 = {
      name: "Ditto (404)",
      entryNumber: "404",
      moves: ["Bad Spelling", "Silly Fingers", "Cat on Keyboard"],
      type: ["Error"],
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
    };
    domcb(api404);
  } else {
    // types and move come as two big object arrays - we want to return shorter arrays
    typesParsed = [];
    for (var i = 0; i < data.types.length; i++) {
      typesParsed.push(data.types[i].type.name);
    }
    movesParsed = [];
    for (var i = 0; i < 3; i++) {
      movesParsed.push(data.moves[i].move.name);
    }
    // setup the rest of our parse - more straightforward
    var pokeApiResponse = {
      name: data.name,
      entryNumber: data.id,
      moves: movesParsed,
      type: typesParsed,
      sprite: data.sprites.front_default
    };
    domcb(pokeApiResponse);
  }
}

// parse a gipy function
function giphyParse(input, domcb) {
  var parsedLinks = [];
  input.data.forEach(function(item) {
    parsedLinks.push(item.images.downsized.url);
  });
  domcb(parsedLinks);
}
