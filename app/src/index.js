// Test import of a JavaScript module
import steps from '@/js/steps';

// Test import of styles
import '@/styles/index.scss'


const app = document.querySelector('#root')
app.append(steps);

// init carousel
var elem = document.querySelector('.steps');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'center',
  contain: true,
  draggable: false,
  freeScroll: false,
  pageDots: true,
  autoPlay: false,
  fullscreen: true
});
