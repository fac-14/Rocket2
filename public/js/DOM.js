//IIFE (Not Eevee...)
(function() {
  //define vars for search button and input
  var searchButton = document.querySelector("#searchButton");
  var randButton = document.querySelector("#randButton");
  var searchInput = document.querySelector('input[name="searchInput"]');
  var pokemonDetails = document.querySelector("#pokemon-details");

  //opening pokeball animation vars
  var pokeballBackground = document.querySelector(".pokemon-overlay");
  var pokeballLeft = document.querySelector(".pokemon-left");
  var pokeballRight = document.querySelector(".pokemon-right");
  var pokeballRotate = document.querySelector(".pokemon-container");

  //define search function
  function searchPokemon() {
    var x = document.getElementById("search-input").value.trim();
    if (x == "") {
      alert("Please enter a pokemon name! :)");
      return;
    }
    if (pokeballLeft.classList.contains("pokemon-left-animation")) {
      pokeballLeft.classList.remove("pokemon-left-animation");
      pokeballRight.classList.remove("pokemon-right-animation");
      pokeballBackground.classList.add("pokemon-overlay-background");
    }
    pokeballRotate.classList.add("pokemon-container-rotate");
    xhr(
      "GET",
      "https://pokeapi.co/api/v2/pokemon/" + searchInput.value.toLowerCase(),
      pokeParse,
      pokeCallback
    );
  }

  //add event listeners to trigger search

  searchButton.addEventListener("click", searchPokemon);
  var node = document.getElementById("search-input");
  node.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      searchPokemon();
    } else {
      autocomplete(node.value);
    }
  });

  var autoContainer = document.getElementById("autocomplete-container");

  function autocomplete(searchString) {
    if (searchString === "") {
      //remove parent autocomplete element
      killChildren(autoContainer);
    } else {
      xhr(
        "GET",
        "http://localhost:4000/search/" + searchString,
        autocompleteCallback
      );
    }
  }

  function autocompleteCallback(data) {
    var response = data.response;
    //remove parent
    killChildren(autoContainer);
    //create parent element
    autoParentNode = document.createElement("ul");
    //add the ID autoParent
    autoParentNode.id = "autoParent";
    response.forEach(function(name) {
      var child = document.createElement("li");
      child.classList.add("search-suggestion");
      child.textContent = name;
      autoParentNode.appendChild(child);
      //create child elements and append to parent
    });
    //append parent to the DOM

    autoContainer.appendChild(autoParentNode);
  }

  randButton.addEventListener("click", function() {
    if (pokeballLeft.classList.contains("pokemon-left-animation")) {
      pokeballLeft.classList.remove("pokemon-left-animation");
      pokeballRight.classList.remove("pokemon-right-animation");
      pokeballBackground.classList.add("pokemon-overlay-background");
    }
    pokeballRotate.classList.add("pokemon-container-rotate");
    console.log("Testing Random!");
    var rand = Math.floor(Math.random() * 802);
    console.log("https://pokeapi.co/api/v2/pokemon/" + rand);
    xhr(
      "GET",
      "https://pokeapi.co/api/v2/pokemon/" + rand,
      pokeParse,
      pokeCallback
    );
  });

  //abstract function to add text elements within pokemon details
  var addNewNode = function(parentNodeId, element, text, className) {
    var parent = document.getElementById(parentNodeId);
    var elem = document.createElement(element);
    var elemText = document.createTextNode(text);
    elem.appendChild(elemText);
    if (className) {
      elem.classList.add(className);
    }
    parent.appendChild(elem);
  };

  // function to add a new text-based element to the details section

  var addDetailsNode = function(element, text, className) {
    addNewNode("pokemon-details", element, text, className);
  };

  //remove all children from a parent node

  var killChildren = function(parentNode) {
    while (parentNode.hasChildNodes()) {
      parentNode.removeChild(parentNode.lastChild);
    }
  };

  //callback function to be run on pokeAPI response
  var pokeCallback = function(pokeResponse) {
    // console.log(pokeResponse);

    //remove all existing child nodes from #pokemon-details
    killChildren(pokemonDetails);

    // capitalising the Pokemon name (e.g. Bulbasaur)
    var name = pokeResponse.name;
    name = name.split("");
    name[0] = name[0].toUpperCase();
    name = name.join("");

    //add name as h1 of page
    var pokemonName = document.getElementById("pokemon-name");
    pokemonName.innerText = name;

    //add new child nodes to #pokemon-details

    //add sprite image
    var spriteContainer = document.createElement("div");
    var sprite = document.createElement("img");
    sprite.src = pokeResponse.sprite;
    sprite.alt = "Sprite image of " + pokeResponse.name;
    spriteContainer.classList.add("sprite-image");
    spriteContainer.appendChild(sprite);
    pokemonDetails.appendChild(spriteContainer);

    // Adding details is now stretch goal - replace if needed:

    // addDetailsNode('h3', 'Description:');
    // addDetailsNode('p', pokeResponse.description);

    addDetailsNode("h3", "Pokedex Entry Number:", "pokemon-entry-header");
    addDetailsNode("p", pokeResponse.entryNumber, "pokemon-entry-text");

    //turn types array into string
    var types = "";

    for (i = 0; i < pokeResponse.type.length; i++) {
      if (i > 0) {
        types += " / ";
      }
      types += pokeResponse.type[i];
    }

    addDetailsNode("h3", "Types:", "pokemon-types-header");
    addDetailsNode("p", types, "pokemon-types-text");

    //create header for moves

    addDetailsNode("h3", "Moves:", "pokemon-moves-header");

    //create UL for moves and add each move as an LI
    var movesList = document.createElement("ul");
    // var movesHeader = document.createElement("h3");
    // var movesHeaderText = document.createTextNode("Moves:");
    // movesHeader.appendChild(movesHeaderText);
    // pokemonDetails.appendChild(movesHeader);

    //append each move as LI
    pokeResponse.moves.forEach(function(move) {
      var li = document.createElement("li");
      var liText = document.createTextNode(move);
      li.appendChild(liText);
      movesList.appendChild(li);
    });
    pokemonDetails.appendChild(movesList);

    // ROUND 2: kick it all off again with a description call
    xhr(
      "GET",
      "https://pokeapi.co/api/v2/pokemon-species/" + pokeResponse.name,
      pokeDescripParse,
      pokeDescripCallback
    );

    // phew - with THAT all done, let's now update our gif display!
    // that's right - we're nesting XHRs in our callbacks in our callbacks!
    // THIS IS GETTING WAY TOO META FOR MEEEEEEEEEEEeeeee
    var giphyQuery =
      pokeResponse.entryNumber == 404 ? "ditto" : pokeResponse.name;
    xhr(
      "GET",
      "https://api.giphy.com/v1/gifs/search?q=" +
        giphyQuery +
        "&limit=25&rating=g&api_key=" +
        giphyApiKey,
      giphyParse,
      gifCallback
    );
  };

  var pokeDescripCallback = function(pokeDescripResponse) {
    var description = document.getElementById("pokemon-description");

    killChildren(description);

    var header = document.createElement("h3");
    header.classList.add("description-header");
    var headerText = document.createTextNode("Description:");
    var descripElem = document.createElement("p");
    descripElem.classList.add("description-text");
    var descripText = document.createTextNode(pokeDescripResponse);
    descripElem.appendChild(descripText);
    header.appendChild(headerText);
    description.appendChild(header);
    description.appendChild(descripElem);
  };

  var gifArray = [];

  //callback function to be run on Giphy API response
  gifCallback = function(giphyResponse) {
    // console.log(giphyResponse);
    if (giphyResponse) {
      gifArray = giphyResponse;
    }
    var image = document.getElementById("image");
    var gif = document.createElement("img");
    var randomGif = Math.floor(Math.random() * gifArray.length);

    killChildren(image);

    gif.src = gifArray[randomGif];
    gif.alt = "Randomly generated gif";
    gif.classList.add("pokemon-gif");

    // animation - pull back the pokeball to reveal the MAGIC

    pokeballRotate.classList.remove("pokemon-container-rotate");
    pokeballBackground.classList.remove("pokemon-overlay-background");
    pokeballLeft.classList.add("pokemon-left-animation");
    pokeballRight.classList.add("pokemon-right-animation");

    image.appendChild(gif);
  };

  // function to randomly generate the next gif, calling on Giphy API response
  var getNextGIF = document.getElementById("getNextGIF");

  getNextGIF.addEventListener("click", function() {
    // var name = document.querySelector("#pokemon-details > h2").textContent;
    // lookUpGiphy(name, gifCallback);
    gifCallback();
  });
})();
