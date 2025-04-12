/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    games.forEach((game) => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game-card');
        gameDiv.innerHTML = `
            <h2>${game.name}</h2>
            <img class='game-img' src='${game.img}' />
            <p>${game.description}</p>
            <p>Backers: ${game.backers}</p>
        `;
        gamesContainer.appendChild(gameDiv);
    });
}
addGamesToPage(GAMES_JSON)
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

const totalGame = GAMES_JSON.reduce((total,game)=>{
    return total + game.backers
},0)
/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
contributionsCard.innerHTML = `${totalGame.toLocaleString('en-US')}`

// set the inner HTML using a template literal and toLocaleString to get a number with commas

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
let totalRaised = GAMES_JSON.reduce((total,game)=>{
    return total + game.pledged
},0)
totalRaised = totalRaised.toLocaleString('en-US')
raisedCard.innerHTML = `${totalRaised}`
// set inner HTML using template literal

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

function getFunded(){
    return GAMES_JSON.filter(game=>
       game.goal <= game.pledged
    )
}
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfunded = GAMES_JSON.filter(game=>
        game.goal > game.pledged
    )
    addGamesToPage(unfunded)
    console.log(unfunded)


}
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const funded = getFunded()
    addGamesToPage(funded)

}
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON)
   

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
allBtn.addEventListener("click", showAllGames);
fundedBtn.addEventListener("click", filterFundedOnly);
unfundedBtn.addEventListener("click", filterUnfundedOnly);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

const numUnfunded = GAMES_JSON.reduce((acc,game)=>{
    return game.pledged < game.goal ? acc + 1 :acc
},0)
// use filter or reduce to count the number of unfunded games
console.log(numUnfunded)

// create a string that explains the number of unfunded games using the ternary operator
const display = `A total of $${totalRaised} has been raised for ${GAMES_JSON.length}.
Currently, ${numUnfunded} remains unfunded. We need your help to fund these games`

// create a new DOM element containing the template string and append it to the description container
const para = document.createElement('p')
para.textContent= display
descriptionContainer.appendChild(para)
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

const [mostFunded,secondFunded,...others] =sortedGames
const firstWord = mostFunded.name
const secondWord = secondFunded.name

const firstP = document.createElement('p')
const secondP = document.createElement('p')
firstP.textContent = firstWord
secondP.textContent = secondWord
firstGameContainer.appendChild(firstP)
secondGameContainer.appendChild(secondP)
