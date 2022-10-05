import { Size } from "./Type";

namespace Help {
  export function log(msg: string) {
    console.log(msg);
  }
  export function getElementSize(element: HTMLElement): Size {
    const r = element.getBoundingClientRect();
    return { width: element.offsetWidth, height: element.offsetHeight };
  }
  export function rand(a: number, b: number): number {
    return Math.random() * (b - a) + a;
  }
}

export { Help };
