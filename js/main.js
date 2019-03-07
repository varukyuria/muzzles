import Ipic from './ipic.js';
import { generateFrames } from './misc.js';

const SUN = 0;
const MON = 1;
const TUE = 2;
const WED = 3;
const THU = 4;
const FRI = 5;
const SAT = 6;

const main = document.getElementById('main');

new Ipic({
  name: 'skull',
  frames: generateFrames('skull00.jpg', 6, 'assets/pics/skull/frames'),
  fullview: 'assets/pics/skull/skull.jpg',
  parent: main,
  days: [],
  mouseThreshold: -40
});
