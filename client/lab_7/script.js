function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin);
}

function dataHandler (restoArray) {
  console.log('fired data handler');
  const range = [...Array(15).keys()];
  const newList = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, restoArray.length - 1);
    return restoArray[restNum];
  });
  return newList;
}

function createHtmlList(collection) {
  console.log(collection);
  const targetList = document.querySelector('.resto-list');
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const newLines = `<li>${item.name.toLowerCase()}</li>`;
    targetList.innerHTML += newLines;
  });
}

async function mainEvent() {
  const button = document.querySelector('.submit');
  button.style.display = 'none';
  const userchoice = document.querySelector('#resto-name');
  const userlocation = document.querySelector('#zip-code');
  const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const arrayFromJson = await results.json();

  if (arrayFromJson.length > 0) {
    button.style.display = 'block';
    button.addEventListener('click', async (submitEvent) => {
      submitEvent.preventDefault();
      console.log('clicked');
      const restaurants = dataHandler(arrayFromJson);
      createHtmlList(restaurants);
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
