function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin);
}

function dataHandler (restoArray) {
  // console.log('fired data handler');
  const listSize = restoArray.length;
  const range = [...Array(listSize).keys()];
  // eslint-disable-next-line no-unused-vars
  const newList = range.map((item, index) => restoArray[index]);
  return newList;
}

function createHtmlList(collection, entry, numba) {
  // console.table(collection);

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

  let displaylength = Math.min(filterZip.length, 15);

  const range2 = [...Array(displaylength).keys()];
  const displayed = range2.map((item, index) => {
    let restNum = getRandomIntInclusive(0, (displaylength - 1));
    let thisone = filterZip.splice(restNum, 1);
    // console.log(thisone[0]);
    displaylength -= 1;
    return thisone[0];
  });

  // console.log('displayed = ', displayed);
  const targetList = document.querySelector('.resto_list');
  targetList.innerHTML = '';

  displayed.forEach((item) => {
    const newLines = `<li>${item.name.toLowerCase()}<br>${item.zip}</li>`;
    targetList.innerHTML += newLines;
  });
}

async function mainEvent() {
  const button = document.querySelector('.submit');
  button.style.display = 'none';
  const userchoice = document.querySelector('#resto_name');
  const userlocation = document.querySelector('#zip');
  const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const arrayFromJson = await results.json();

  if (arrayFromJson.length > 0) {
    button.style.display = 'block';
    let currentArray = [];
    let filterPhrase = '';
    let filterNum = '';

    userchoice.addEventListener('input', async (event) => {
      filterPhrase = event.target.value;
      console.log(filterPhrase);
      if (currentArray.length < 1) { return; }
      // console.log(event.target.value);
      createHtmlList(currentArray, filterPhrase, filterNum);
    });

    userlocation.addEventListener('input', async (event) => {
      filterNum = event.target.value;
      console.log(filterNum);
      if (currentArray.length < 1) { return; }
      // console.log(event.target.value);
      createHtmlList(currentArray, filterPhrase, filterNum);
      // console.log(filterZip);
    });

    button.addEventListener('click', async (submitEvent) => {
      submitEvent.preventDefault();
      // console.log('clicked');
      currentArray = dataHandler(arrayFromJson);
      createHtmlList(currentArray, filterPhrase, filterNum);
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
