export function generateFrames(firstFrame, numberOfFrames, dirpath) {
  // add '/' to dir path if not present
  dirpath = dirpath || '';
  if (dirpath.length > 0 && dirpath[dirpath.length-1]!=='/') {
    dirpath = dirpath + '/';
  }
  let filenameExt = getFileExt(firstFrame);
  let r = /^(.*?)(\d*)$/.exec(filenameExt[0]);
  let suffix = filenameExt[1] ? `.${filenameExt[1]}` : '';

  let baseName = r[1];
  let lastDigits = r[2];
  let lastDigitAsNumber = Number.parseInt(lastDigits);
  if (isNaN(lastDigitAsNumber)) {
    lastDigitAsNumber = 0;
    console.warn(`'${firstFrame}' doesn't have digits at its end!`);
  }
  let zeropad = lastDigits.length;
  let ret = [];

  for (let i = 0; i < numberOfFrames; i++) {
    ret.push(`${dirpath}${baseName}${addZeroes(lastDigitAsNumber+i, zeropad)}${suffix}`);
  }

  return ret;
}

export function addZeroes(number, zeropad) {
  let numberStr = number.toString();
  let ret = number.toString();
  for (var i = 0; i < zeropad - numberStr.length; i++) {
    ret = '0' + ret;
  }
  return ret;
}

export function getFileExt(filename) {
  let s = filename.split('.');
  const ext = s.length > 1 ? s.slice(-1).join('') : '';
  const name = s.length > 1 ? s.slice(0, -1).join('.') : filename;

  return [name, ext];
}
