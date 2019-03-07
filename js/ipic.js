export default class Ipic {
  constructor(config) {
    this.name = config.name || '';
    this.selected = false;
    // how much should the mouse move before showing next frame
    this.mouseThreshold = config.mouseThreshold || 40;
    this.currentFrame = 0;
    this.frames = config.frames;
    if (this.frames && !Array.isArray(this.frames)) {
      this.frames = [this.frames];
    }
    this.fullview = config.fullview;
    this.days = config.days || [];
    if (!Array.isArray(this.days)) {
      this.days = [this.days];
    }
    this.parent = config.parent || document.body;

    if (this.days.length === 0 || this.days.includes((new Date()).getDay())) {
      this.container = document.createElement('div');
      this.container.classList.add('ipic-container');
      this.parent.appendChild(this.container);
      if (this.frames) {
        this.img = this.addImg(this.frames[0], this.container);
      }
      if (this.fullview) {
        this.imgFull = this.addImg(this.fullview, this.container);
      }
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

        // switch to frame based on mouse movement
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

  addImg(src, parent) {
    let ret = new Image();
    ret.src = src;
    ret.classList.add('ipic');
    if (parent) parent.appendChild(ret);
    ret.onload = () => {
      ret.style.maxWidth = `${ret.naturalWidth}px`;
    }
    return ret;
  }
}
