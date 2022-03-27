let currentImg;
let imgs;
let numImgs;

function updateVisible() {
  console.log('reached img update function');
  console.log(imgs);
  for (const image of imgs) {
    image.classList.remove('visible');
    image.classList.add('hidden');
  };
  imgs[currentImg].classList.remove('visible');
  imgs[currentImg].classList.add('visible');
};
  
function slideDown() {
  if (currentImg === 0) {
    currentImg = numImgs - 1;
  } else {
    currentImg -= 1;
  }
  updateVisible();
}

function slideUp() {
  if (currentImg === numImgs - 1) {
    currentImg = 0;
  } else {
    currentImg += 1;
  }
  updateVisible();
}

function mainEvent() {
  console.log('DOM Content Loaded.');

  currentImg = 0;
  imgs = document.querySelectorAll('.carousel-item');
  numImgs = imgs.length;

  previous = document.querySelector('#prev');
  next = document.querySelector('#next');

  previous.addEventListener('click', () => slideDown());
  next.addEventListener('click', () => slideUp());
}

document.addEventListener('DOMContentLoaded', () => mainEvent());