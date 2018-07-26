# Rocket2

Team Rocket Week 2

https://hackmd.io/gE51x2vyRwO5MH5xnmiWtg

// CLIENT

- text input
  - event listener attached to that input
    - listen for what is being searched in the text input
      - make a request to the server with a value
      - waits for a response from the server with a value
    - update the autocomplete field with the values returned from server

// SERVER

- /search endpoint
  - wait for a query from client
  - run autocomplete function
    > > input string
    > > << array of up to 5 strings
  - send the autocomplete output back to client
    - e.g. writeHead(200) & content-type & [pikachu, raichu]
