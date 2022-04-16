/* eslint-disable prefer-const */

// a random number generator, to get a random item out of a large list (in createHtmlList function)
function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin);
}

// duplicates the downloaded data into a separate list we can change and interact with
function dataHandler (restoArray) {
  const listSize = restoArray.length;
  const range = [...Array(listSize).keys()];
  const newList = range.map((item, index) => restoArray[index]);
  return newList;
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
  });

  const filterZip = filterSearch.filter((item) => {
    currentzip = numba;
    restozip = item.zip;
    return restozip.includes(currentzip);
  });

  // if the filtered list is < 15 items, select them all. If it's more, select up to 15 (randomly).
  let displaylength = Math.min(filterZip.length, 15);

  const range2 = [...Array(displaylength).keys()];

  // eslint-disable-next-line no-unused-vars
  const displayed = range2.map((item, index) => {
    let restNum = getRandomIntInclusive(0, (displaylength - 1));
    let thisone = filterZip.splice(restNum, 1);
    displaylength -= 1;
    return thisone[0];
  });

  // this last section adds the search results to the page
  const targetList = document.querySelector('.resto_list');
  targetList.innerHTML = '';

  displayed.forEach((item) => {
    const newLines = `<li>${item.name.toLowerCase()}<br>${item.zip}</li>`;
    targetList.innerHTML += newLines;
  });
}

// main code works even if the user has input before clicking, or if user clicks w/no input
async function mainEvent() {
  const button = document.querySelector('.submit');
  button.style.display = 'none';
  const userchoice = document.querySelector('#resto_name');
  const userlocation = document.querySelector('#zip');
  const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const arrayFromJson = await results.json();

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
  }
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());
// ^ this entire script (mainEvent) doesn't run until the page's front-end display is loaded.