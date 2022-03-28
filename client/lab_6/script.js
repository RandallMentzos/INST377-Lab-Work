function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin); 
};

function dataHandler (restoArray) {
  console.log('fired data handler');
  console.table(restoArray); 
  const range = [...Array(15).keys()];
  range.forEach(item => {
    console.log('range item', item);
  })
  
  // this is called "dot notation"
  // arrayFromJson.data - we're accessing a key called 'data' on the returned object
  // it contains all 1,000 records we need
}

async function mainEvent() { // the async keyword means we can make API requests
  const form = document.querySelector('.main_form');
  const button = document.querySelector('.submit');
  button.style.display = 'none';
  const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object

  if (arrayFromJson.length > 0) {
    button.style.display = 'block';
    button.addEventListener('click', async (submitEvent) => {
      submitEvent.preventDefault();
      console.log('clicked'); 
      dataHandler(arrayFromJson);
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
