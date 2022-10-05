class Size {
  constructor(
    public width: number=0,
    public height: number=0
  ){}
}
class Point {
  constructor(
    public x: number=0,
    public y: number=0
  ){}
}
class TreeNode {
  isOpen: boolean=false;
  name: string="";
  nodes: TreeNode[]=[];
}
 class Bound {
  constructor(
    public left: number = 0,
    public top: number = 0,
    public right: number = 0,
    public bottom: number = 0
  ) {}
  getWidth() {
    return this.right - this.left;
  }
  getHeight() {
    return this.bottom - this.top;
  }
  expand(delta: number): Bound {
    this.left -= delta;
    this.top -= delta;
    this.right += delta;
    this.bottom += delta;
    return Object.assign({}, this);
  }
}
export  { Size, Point, TreeNode ,Bound};
