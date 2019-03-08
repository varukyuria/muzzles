export default class Ipic {
  constructor(config) {
    this.config = config;
    this.name = config.name || '';
    this.selected = false;

    // how much should the mouse move before showing next frame
    this.mouseThreshold = config.mouseThreshold || 40;

    // configure `frames` parameter
    this.currentFrame = 0;
    this.frames = config.frames;
    if (this.frames && !Array.isArray(this.frames)) {
      this.frames = [this.frames];
    }

    // `fullview` is a pic that contains all the frames
    this.fullview = config.fullview;

    // configure `days` parameter
    this.days = config.days || [];
    if (!Array.isArray(this.days)) {
      this.days = [this.days];
    }

    // parent element
    this.parent = config.parent || document.body;

    // create pics and stuff if today is in `days`
    if (this.days.length === 0 || this.days.includes((new Date()).getDay())) {
      // create container
      if (config.container) {
        this.container = config.container;
      }
      else {
        this.container = document.createElement('div');
        this.container.classList.add('ipic-container');
        this.parent.appendChild(this.container);
      }

      // add frame img
      if (this.frames) {
        this.img = this.addImg(this.frames[0], this.container, config.width);
        this.loadFrames();
        // set inline if in config
        if (config.inline) {
          this.img.style.display = 'inline';
        }
        // flip image
        if (config.flip) {
          this.img.style.transform = 'scaleX(-1)';
        }
      }
      // add fullview img
      if (this.fullview) {
        this.imgFull = this.addImg(this.fullview, this.container, config.fullviewWidth);
      }
      // warn if this ipic is basically useless
      if (!this.frames && !this.fullview) {
        console.warn(`${this.name === '' ? 'Unnamed Ipic' : `'${this.name}'`} doesn't have any images.`)
      }

      // add frame switch functionality if it's not a static pic
      if (this.frames && this.frames.length > 1) {
        let initialMouse;
        let initialFrame;
        // select with mouse click
        this.img.onmousedown = (e) => {
          initialMouse = {x: e.pageX, y: e.pageY};
          initialFrame = this.currentFrame;
          this.selected = true;
          e.preventDefault();
        };

        // swap frames on mouse movement
        document.body.addEventListener('mousemove', (e) => {
          if (!this.selected) return;
          const delta = {x: e.pageX - initialMouse.x, y: e.pageY - initialMouse.y};
          this.setFrame(initialFrame + Math.floor(delta.x / this.mouseThreshold));
        }, false);

        // deselect
        document.body.addEventListener('mouseup',(e) => {
          this.selected = false;
        }, false);
      }
    }
  }

  setFrame(number) {
    number = number % this.frames.length;
    if (number < 0) {
      number = this.frames.length + number;
    }
    this.currentFrame = number;
    this.img.src = this.frames[this.currentFrame];
  }

  nextFrame() {
    this.setFrame(this.currentFrame+1);
  }

  prevFrame() {
    this.setFrame(this.currentFrame-1);
  }

  loadFrames() {
    this.frames.forEach(frame => Ipic.phantomLoad(frame));
  }

  static phantomLoad(src) {
    let img = new Image();
    img.src = src;
  }

  addImg(src, parent, maxWidth) {
    let ret = new Image();
    ret.src = src;
    ret.classList.add('ipic');
    if (parent) parent.appendChild(ret);
    ret.onload = () => {
      // set max image width to image's original width or to `maxWidth` if provided
      ret.style.maxWidth = maxWidth ? maxWidth : `${ret.naturalWidth}px`;
    }
    return ret;
  }
}
