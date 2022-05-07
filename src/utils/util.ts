export function debounce(fn: Function, wait: number = 50) {
  let timer: any = null;
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      //@ts-ignore
      fn.apply(this, args);
    }, wait);
  };
}


export const classnames = (data: ClassListData = {}) => {
  let classList = [];
  for (let i in data) {
    if (data[i]) classList.push(i);
  }
  return classList.join(" ");
};
