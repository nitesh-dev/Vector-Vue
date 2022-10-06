export class ArrayHelper<Type> {
  constructor(public arr: Array<Type>) {}
  remove(obj: Type): Type | null {
    const index = this.arr.indexOf(obj);
    if (index != -1) {
      return this.arr.splice(index, 1)[0];
    }
    return null;
  }
  sendToTop(obj: Type) {
    //find
    const res = this.find(obj);
    //remove
    if (res != null) {
      this.remove(res);
      //add to top
      this.arr.push(res);
    }
  }
  addToBack(obj: Type) {
    this.arr.unshift(obj);
  }
  sendToBottom(obj: Type) {
    //means to first
    //find
    const res = this.find(obj);
    //remove
    if (res != null) {
      this.remove(res);
      //add to top
      this.addToBack(res);
    }
  }
  makeEmpty() {
    this.arr.splice(0,this.arr.length)
  }
  find(obj: Type): Type | null {
    const res = this.arr.filter((o) => o === obj);
    if (res.length > 0) {
      return res[0];
    }
    return null;
  }
  push(obj: Type) {
    this.arr.push(obj);
  }
  pop() {
    this.arr.pop();
  }
  length() {
    return this.arr.length;
  }
}
