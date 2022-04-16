/* eslint-disable prefer-const */

// a random number generator, to get a random item out of a large list (in createHtmlList function)
function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin);

  // newMin = first number in range (first item in list? usually 0), ceil = rounded up
  // newMax = last number in range (last item in list?), floor = rounded down
  // uses a random multiplier (between 0 & 1) to determine how high in range the random number is.
}

// duplicates the downloaded data into a separate list we can change and interact with
function dataHandler (restoArray) {
  const listSize = restoArray.length;
  const range = [...Array(listSize).keys()];
  const newList = range.map((item, index) => restoArray[index]);
  return newList;

  // restoArray = the original, downloaded array of restaurants that have been inspected
  // range = an empty Array with a certain number* of placeholders, in this case listSize
  // listSize = the same # of items as the original restoArray
  // newList: "maps" (copies) each object (restaurant) in restoArray to an identical spot in "range"
}

// this is the big daddy function, it does both search filtering & auto-displaying the results.
function createHtmlList(collection, entry, numba) {
// ^ collection = the duplicated restoArray
  // entry & numba = user inputs for name & zip
  // the next two "filter functions" apply filters based on user-input before we change the page

  const filterSearch = collection.filter((item) => {
    currentname = item.name.toLowerCase();
    currentinput = entry.toLowerCase();
    return currentname.includes(currentinput);

    // ^ filters out the items whose names don't "include" the characters in the user's "name" input
    // converts both the restaurant's name & user input to lowercase to ensure a match
  });

  const filterZip = filterSearch.filter((item) => {
    currentzip = numba;
    restozip = item.zip;
    return restozip.includes(currentzip);

    // ^ filters out the items whose zipcodes dont include any numbers in user "zip" input
    // the list is always double-filtered, even if one field is empty the other still works.
  });

  // if the filtered list is < 15 items, select them all. If it's more, select up to 15 (randomly).
  let displaylength = Math.min(filterZip.length, 15);

  const range2 = [...Array(displaylength).keys()]; // new array for the "displayed" results

  // eslint-disable-next-line no-unused-vars
  const displayed = range2.map((item, index) => { // maps up to 15 unique search results to range2
    let restNum = getRandomIntInclusive(0, (displaylength - 1));
    let thisone = filterZip.splice(restNum, 1);
    displaylength -= 1;
    return thisone[0];

    // randomly picks a number from the filtered list of restaurants
    // adds that restaurant (thisone[0]) to the list of restaurants that will be displayed

    // **NOTE: "splice" removes that restaurant from the "filtered" list (& shrinks "length" by 1)
    // ^^ this is to avoid duplicate results added to "displayed" list each time through the loop.

    // does this until there are no more items, or until 15 items are in the "displayed" list
  });

  // the part of the page that we want to add the search results to
  const targetList = document.querySelector('.resto_list');
  targetList.innerHTML = '';

  displayed.forEach((item) => { // this part actually adds the updated search to the user display
    const newLines = `<li>${item.name.toLowerCase()}<br>${item.zip}</li>`;
    targetList.innerHTML += newLines;
  });
}

// main code works even if the user has input before clicking, or if user clicks w/no input
// it is designed to run the above function instantly every time user input changes.
async function mainEvent() {
  const button = document.querySelector('.submit');
  button.style.display = 'none';
  const userchoice = document.querySelector('#resto_name');
  const userlocation = document.querySelector('#zip');
  const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const arrayFromJson = await results.json();
  // submit button, user input fields, downloaded restaurant inspection list all initialized

  // all of the website's functionality is in here; user actions are what run the functions:
  if (arrayFromJson.length > 0) { // site is static/inactive until the back-end data starts loading
    button.style.display = 'block';
    let currentArray = [];
    let filterPhrase = '';
    let filterNum = '';
    // initially, button is inivisble, filters empty, currentArray is empty

    userchoice.addEventListener('input', async (event) => {
      filterPhrase = event.target.value;
      if (currentArray.length < 1) { return; }
      createHtmlList(currentArray, filterPhrase, filterNum);
      // reads and stores user input from "Restaurant name";
      // once they click submit and get their initial search results (currentArray),
      // createHtmlList auto-filters & updates the data based on new input.
    });

    userlocation.addEventListener('input', async (event) => {
      filterNum = event.target.value;
      if (currentArray.length < 1) { return; }
      createHtmlList(currentArray, filterPhrase, filterNum);
      // same as above, but this updates the results based on user input in "zip code"
    });

    button.addEventListener('click', async (submitEvent) => {
      submitEvent.preventDefault();
      currentArray = dataHandler(arrayFromJson);
      createHtmlList(currentArray, filterPhrase, filterNum);
      // when submit button is clicked, "currentArray" copies the whole data set for filtering,
      // "createHtmlList" displays the initial results that match the user's pre-entered filters,
      // Then the other "input" eventListeners (for name & zip) handle all future activity.
    });
    // NOTE: the button comes last because you want the site to store user input before they click,
    // but the filters are inactive until you deliberately click the button & populate currentArray.
  }
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());
// ^ this entire script (mainEvent) doesn't run until the page's front-end display is loaded.