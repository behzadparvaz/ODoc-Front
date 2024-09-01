
export function debounce(func, timeout = 600) {
    let timer;
    const debounced = (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
    debounced.cancel = () => {
      clearTimeout(timer);
    };
    return debounced;
  }
  