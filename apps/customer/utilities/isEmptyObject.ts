export function isEmpty(obj: {}) {
  try {
    if (typeof obj === 'object' && obj) {
      for (var prop in obj) {
        if (obj?.hasOwnProperty(prop)) return false;
      }
    } else {
      return true;
    }

    return true;
  } catch (err) {
    console.log(err);
  }
}
