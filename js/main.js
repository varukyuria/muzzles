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

// skull
new Ipic({
  name: 'skull',
  frames: generateFrames('skull00.jpg', 6, 'assets/pics/skull'),
  fullview: 'assets/pics/skull/skull.jpg',
  parent: main,
  fullviewWidth: '700px',
  days: [],
  mouseThreshold: -40
});

// skeleton
new Ipic({
  name: 'skeleton',
  frames: generateFrames('skeleton00.jpg', 3, 'assets/pics/skeleton'),
  fullview: 'assets/pics/skeleton/skeleton.jpg',
  parent: main,
  days: [],
  width: '250px',
  fullviewWidth: '500px',
  mouseThreshold: 40
});

// torso layers back
let temp = new Ipic({
  name: 'torso layers back',
  frames: generateFrames('torso_layers_back00.jpg', 10, 'assets/pics/torso_layers/back'),
  // fullview: 'assets/pics/torso_layers/back/torso_layers_back.jpg',
  inline: true,
  parent: main,
  width: '300px',
  days: [],
  mouseThreshold: 20
});
// torso layers front
new Ipic({
  name: 'torso layers front',
  frames: generateFrames('torso_layers_front00.jpg', 6, 'assets/pics/torso_layers/front'),
  // fullview: 'assets/pics/torso_layers/front/torso_layers_front.jpg',
  inline: true,
  parent: main,
  container: temp.container,
  width: '300px',
  days: [],
  mouseThreshold: 20
});

// female external oblique
new Ipic({
  name: 'female external oblique',
  frames: generateFrames('external_oblique00.jpg', 3, 'assets/pics/female/torso/external_oblique'),
  // fullview: 'assets/pics/female/torso/external_oblique/external_oblique.jpg',
  parent: main,
  days: [],
  mouseThreshold: -40
});

// echorche
new Ipic({
  name: 'echorche',
  frames: generateFrames('echorche00.jpg', 3, 'assets/pics/echorche'),
  fullview: 'assets/pics/echorche/echorche.jpg',
  parent: main,
  days: [],
  width: '250px',
  fullviewWidth: '500px',
  mouseThreshold: 40
});

// female arms
new Ipic({
  name: 'female arms',
  frames: generateFrames('arms00.jpg', 36, 'assets/pics/female/arms/frames'),
  parent: main,
  days: [],
  mouseThreshold: 20
});

// female arms full view
new Ipic({
  name: 'female arms full view',
  frames: generateFrames('armsfull00.jpg', 4, 'assets/pics/female/arms/full'),
  parent: main,
  width: '600px',
  days: [],
  mouseThreshold: 40
});

// upper limb rotation 1
new Ipic({
  name: 'upper limb rotation 1',
  frames: generateFrames('upperlimb_rotation1_0000.jpg', 12, 'assets/pics/upperlimb/rotation1'),
  parent: main,
  width: '600px',
  days: [],
  mouseThreshold: 30
});

// upper limb rotation 2
new Ipic({
  name: 'upper limb rotation 2',
  frames: generateFrames('upperlimb_rotation2_0000.jpg', 12, 'assets/pics/upperlimb/rotation2'),
  parent: main,
  width: '600px',
  days: [],
  mouseThreshold: 30
});