import { CanvasContext } from "./CanvasRender";

export class MouseEvent {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly buttons: number
  ) {}
}
export class KeyEvent {
  constructor(public readonly key: string) {}
}
export class CanvasHelper {
  protected canvCtx: CanvasContext|null;
  constructor(protected htmlCanvas: HTMLCanvasElement) {
    this.canvCtx = this.htmlCanvas.getContext("2d");

    //listeners
    this.htmlCanvas.addEventListener("mousemove", (e) => {
      var rect = this.htmlCanvas.getBoundingClientRect();

      this.onMouseMove(
        new MouseEvent(e.clientX - rect.left, e.clientY - rect.top, e.buttons)
      );
    });
    this.htmlCanvas.addEventListener("mousedown", (e) => {
      var rect = this.htmlCanvas.getBoundingClientRect();
      this.onMouseDown(
        new MouseEvent(e.clientX - rect.left, e.clientY - rect.top, e.buttons)
      );
    });
    this.htmlCanvas.addEventListener("mouseup", (e) => {
      var rect = this.htmlCanvas.getBoundingClientRect();
      this.onMouseUp(
        new MouseEvent(e.clientX - rect.left, e.clientY - rect.top, e.buttons)
      );
    });
    this.htmlCanvas.addEventListener("keydown", (e) => {
        this.onkeyDown(new KeyEvent(e.key))  
    },false);
  }
  public resize(w: number, h: number) {
    this.htmlCanvas.width = w;
    this.htmlCanvas.height = h;
    this.canvCtx = this.htmlCanvas.getContext("2d");
    this.repaint();
  }
  public repaint() {
    this.ondraw(this.canvCtx!);
  }
  protected ondraw(ctx: CanvasContext) {}
  protected onMouseDown(e: MouseEvent) {}
  protected onMouseUp(e: MouseEvent) {}
  protected onMouseMove(e: MouseEvent) {}
  protected onkeyDown(e: KeyEvent) {}
}
