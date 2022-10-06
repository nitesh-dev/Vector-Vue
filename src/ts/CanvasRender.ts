import { Ellipse, Line, PaintStyle, Rect, Shape } from "./Shape";
import { Point } from "./Type";

export type CanvasContext = CanvasRenderingContext2D;
export class Color {
  constructor(public nColor: string) {}
  // public static rgba(r: number, g: number, b: number, a: number): Color {
  //   return new Color(`rgba(${r},${g},${b},${a / 255})`);
  // }
  public static hex(rgba: number): Color {
    return new Color(`#${rgba.toString(16)}`);
  }
  public static random(): Color {
    return this.hex(Math.floor(Math.random() * 16777215));
  }
}
export class CanvasRender {
  protected readonly domCanvas: HTMLCanvasElement;
  protected clearColor: Color = Color.hex(0xffffffff);
  constructor(public ctx: CanvasContext) {
    this.domCanvas = ctx.canvas;
  }
  public get w(): number {
    return this.domCanvas.width;
  }
  public get h(): number {
    return this.domCanvas.height;
  }
  public get hw(): number {
    return this.domCanvas.width * 0.5;
  }
  public get hh(): number {
    return this.domCanvas.height * 0.5;
  }
  protected setFillColor(color: Color) {
    this.ctx.fillStyle = color.nColor;
  }
  protected setStrokeColor(color: Color) {
    this.ctx.strokeStyle = color.nColor;
  }
  public drawShape(shape: Shape) {
    shape.ondraw(this)
  }
  public drawOutlineShape(shape: Shape) {
    shape.ondraw(this)
  }

  public drawEllipse(shape: Ellipse) {
   // this.ctx.save();

    this.ctx.strokeStyle = shape.strokeColor.nColor;
    this.ctx.fillStyle = shape.fillColor.nColor;
    this.ctx.lineWidth = shape.strokeWidth;
    this.ctx.beginPath();
    this.ctx.ellipse(
      shape.x,
      shape.y,
      Math.abs(shape.radiusX),
      Math.abs(shape.radiusY),
      0,
      0,
      2 * Math.PI
    );
    if (
      shape.paintStyle == PaintStyle.FILL ||
      shape.paintStyle == PaintStyle.BOTH
    ) {
      this.ctx.fill();
    }
    if (
      shape.paintStyle == PaintStyle.STROKE ||
      shape.paintStyle == PaintStyle.BOTH
    ) {
      this.ctx.stroke();
    }
    this.ctx.closePath();

    // this.setFillColor(circle.color);
    // this.ctx.beginPath();
    // this.ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    // this.ctx.fill();
    // this.ctx.closePath();
  }
  public drawRect(shape: Rect) {
    //this.ctx.save();

    this.ctx.strokeStyle = shape.strokeColor.nColor;
    this.ctx.fillStyle = shape.fillColor.nColor;
    this.ctx.lineWidth = shape.strokeWidth;
    this.ctx.beginPath();
    this.ctx.rect(shape.x,shape.y,shape.width,shape.height)
    if (
      shape.paintStyle == PaintStyle.FILL ||
      shape.paintStyle == PaintStyle.BOTH
    ) {
      this.ctx.fill();
    }
    if (
      shape.paintStyle == PaintStyle.STROKE ||
      shape.paintStyle == PaintStyle.BOTH
    ) {
      this.ctx.stroke();
    }
    this.ctx.closePath();

    // this.setFillColor(circle.color);
    // this.ctx.beginPath();
    // this.ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    // this.ctx.fill();
    // this.ctx.closePath();
  }
  quadratic(p1: Point, p2: Point, p3: Point) {
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.quadraticCurveTo(p2.x, p2.y, p3.x, p3.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }
  clear() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }
}
