# I CHOOSE A SERVER-SIDE AUTOCOMPLETE FUNCTION

## THIS LOOKS FAMILIAR

![no](https://media.giphy.com/media/7T200DTPdx31e/giphy.gif)

Be quiet. Just play with the autocomplete, ok. 

## HAVE A LOOK YOURSELF

:heart_eyes_cat: https://stormy-chamber-34525.herokuapp.com/ :heart_eyes_cat:

## WHAT IF I WANT TO RUN IT LOCALLY 

- Git clone
- npm i
- npm start
- Profit! 

## WHAT SHOULD I BE PAYING ATTENTION TO HERE THEN? 

- Notice how there's some code on the client side that adds a timer to search commands
- The mouseover state of the autocomplete box 
- Clicking a result adds it to your search box 
- Our totes sweet self-made API that we self-made 
- THERE ARE TESTS, THERE ARE ACTUALLY WORKING TESTS THAT WORK AND WERE ACTUALLY USEFUL! 

### ALRIGHT, FINE, TELL ME WHAT'S NEW THIS WEEK: 

We added an autocomplete to our stuff from last week. We thought an autocomplete was going to be relatively breezy. In some ways it was! IN MOST WAYS IT WAS NOT. 

// CLIENT FLOW 

- text input
  - event listener attached to that input
    - listen for what is being searched in the text input
      - make a request to the server with a value
      - waits for a response from the server with a value
    - update the autocomplete field with the values returned from server

// SERVER FLOW

- /search endpoint
  - wait for a query from client
  - run autocomplete function
    > > input string
    > > << array of up to 5 strings
  - send the autocomplete output back to client
    - e.g. writeHead(200) & content-type & [pikachu, raichu]

## WHAT ABOUT THE DESIGN CHAL---

![no](https://media.giphy.com/media/nR4L10XlJcSeQ/giphy.gif)
