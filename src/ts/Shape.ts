import { Color, CanvasRender } from "./CanvasRender";
import { Help } from "./help";
import { Bound, Point } from "./Type";
export enum PaintStyle {
  STROKE,
  FILL,
  BOTH,
}
export class Shape {
  public paintStyle: number = PaintStyle.BOTH;
  public strokeWidth = 1;
  public fillColor: Color = Color.random();
  public strokeColor: Color = Color.random();
  constructor(
    public x: number = Help.rand(0, 500),
    public y: number = Help.rand(0, 300),
  ) {}
  ondraw(render: CanvasRender) {}
  updateFirstSize(p: Point) {}
  isInside(p: Point): boolean {
    return false;
  }
  getBound(): Bound {
    return new Bound();
  }
 
}

export class Rect extends Shape {
  isFill = false;
  constructor(
    public x: number = Help.rand(0, 500),
    public y: number = Help.rand(0, 300),
    public width: number = Help.rand(100, 200),
    public height: number = Help.rand(50, 200)
  ) {
    super();
  }
  override ondraw(render: CanvasRender) {
    render.drawRect(this);
  }
  override updateFirstSize(p: Point): void {
    this.width = p.x;
    this.height = p.y;
  }
  override isInside(p: Point): boolean {
    if (
      p.x >= this.x &&
      p.x <= this.x + this.width &&
      p.y >= this.y &&
      p.y <= this.y + this.height
    ) {
      return true;
    }
    return false;
  }
  override getBound(): Bound {
    return new Bound(this.x, this.y, this.x + this.width, this.y + this.height);
  }
}
export class Ellipse extends Shape {
  constructor(
    public x: number = Help.rand(0, 500),
    public y: number = Help.rand(0, 300),
    public radiusX: number = Help.rand(20, 100),
    public radiusY: number = Help.rand(20, 100)
  ) {
    super();
  }
  override ondraw(render: CanvasRender) {
    render.drawEllipse(this);
  }
  override isInside(p: Point): boolean {
    const a = this.radiusX;
    const b = this.radiusY;
    const x = p.x - this.x;
    const y = p.y - this.y;
    const res = (x * x) / (a * a) + (y * y) / (b * b);
    if (res <= 1) {
      return true;
    }
    return false;
  }
  override getBound(): Bound {
    return new Bound(
      this.x - this.radiusX,
      this.y - this.radiusY,
      this.x + this.radiusX,
      this.y + this.radiusY
    );
  }
}
export class Line extends Shape {
  constructor(public a: Point, public b: Point) {
    super();
  }
  override ondraw(render: CanvasRender) {}
}
export class Triangle extends Shape {
  constructor(public a: Point, public b: Point, public c: Point) {
    super();
  }
  override ondraw(render: CanvasRender) {}
}
