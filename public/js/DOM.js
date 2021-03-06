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

  //create objects for our 4 API calls
  var pokeApiCall = {};
  var giphyApiCall = {};
  var pokeDescriptionCall = {};
  var autocompleteApiCall = {};

  function abortXhr() {
    if (firstRequestDone === "undefined") {
      var firstRequestDone = true;
    } else if (firstRequestDone) {
      pokeApiCall.abort();
      giphyApiCall.abort();
      pokeDescriptionCall.abort();
    }
  }

  var count = 0;

  function setPokeball(openOrClose) {
    if (openOrClose === "close") {
      count = 0;
      // if (pokeballLeft.classList.contains("pokemon-left-animation")) {
      pokeballLeft.classList.remove("pokemon-left-animation");
      pokeballRight.classList.remove("pokemon-right-animation");
      pokeballBackground.classList.add("pokemon-overlay-background");
      pokeballRotate.classList.add("pokemon-container-rotate");
      //}
    } else if (openOrClose === "open") {
      count++;
      if (count === 3) {
        pokeballRotate.classList.remove("pokemon-container-rotate");
        pokeballBackground.classList.remove("pokemon-overlay-background");
        pokeballLeft.classList.add("pokemon-left-animation");
        pokeballRight.classList.add("pokemon-right-animation");
      }
    }
  }

  //define search function
  function searchPokemon() {
    abortXhr();
    var x = document.getElementById("search-input").value.trim();
    if (x == "") {
      alert("Please enter a pokemon name! :)");
      return;
    }

    setPokeball("close");

    xhr(
      pokeApiCall,
      "GET",
      "https://pokeapi.co/api/v2/pokemon/" + searchInput.value.toLowerCase(),
      pokeParse,
      pokeCallback
    );
  }

  //add event listeners to trigger search

  searchButton.addEventListener("click", function() {
    //abortSearch();
    searchPokemon();
  });

  var node = document.getElementById("search-input");
  node.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      //abortSearch();
      searchPokemon();
    } else {
      //autocomplete(node.value);
      waitForInput(node.value);
    }
  });

  var lastSearch = "";
  function waitForInput(searchString) {
    lastSearch = searchString.split("").join("");
    setTimeout(function() {
      if (searchString === lastSearch) {
        autocomplete(searchString);
      }
    }, 500);
  }

  var autoContainer = document.getElementById("autocomplete-container");
  var lastString = "";
  function autocomplete(searchString) {
    if (searchString === "") {
      //remove parent autocomplete element
      killChildren(autoContainer);
    } else if (searchString !== lastString) {
      xhr(
        autocompleteApiCall,
        "GET",
        "/search/" + searchString,
        autocompleteCallback
      );
    }
    lastString = searchString;
  }

  function autocompleteCallback(data) {
    var response = data.response;
    //remove parent
    killChildren(autoContainer);
    if (response.length === 0) {
      killChildren(autoContainer); // this works on Chrome
      // TODO: can somebody PLEASE work out why this works on firefox and killChildren(autoContainer) here does NOT?
      return;
    } else {
      //create parent element
      autoParentNode = document.createElement("ul");
      //add the ID autoParent
      autoParentNode.id = "autoParent";
      response.forEach(function(name) {
        var parsedName = name.charAt(0).toUpperCase() + name.substr(1);
        var child = document.createElement("li");
        child.classList.add("search-suggestion");
        child.textContent = parsedName;
        child.addEventListener("click", function() {
          searchInput.value = parsedName;
          killChildren(autoContainer);
        });
        autoParentNode.appendChild(child);
        //create child elements and append to parent
      });
      //append parent to the DOM
    }

    autoContainer.appendChild(autoParentNode);
  }

  randButton.addEventListener("click", function() {
    //abortSearch();
    setPokeball("close");
    var rand = Math.floor(Math.random() * 802);
    abortXhr();
    xhr(
      pokeApiCall,
      "GET",
      "https://pokeapi.co/api/v2/pokemon/" + rand,
      pokeParse,
      pokeCallback
    );
  });

  document.addEventListener("click", function() {
    if (document.activeElement === document.getElementById("search-input")) {
      autoContainer.style.visibility = "visible";
    } else {
      autoContainer.style.visibility = "hidden";
    }
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
    setPokeball("open");

    // ROUND 2: kick it all off again with a description call
    xhr(
      pokeDescriptionCall,
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
      giphyApiCall,
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
    setPokeball("open");
  };

  var gifArray = [];

  //callback function to be run on Giphy API response
  gifCallback = function(giphyResponse) {
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
    setPokeball("open");

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
