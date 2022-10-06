<script setup lang='ts'>

import { onMounted, reactive, ref, watch } from 'vue';
import ShapeBar from '../components/ShapeBar.vue';
import { CanvasHelper, MouseEvent } from '../ts/CanvasHelper';
import { Color } from '../ts/CanvasRender';
import { Help } from '../ts/help';
import { CanvasRender } from "../ts/CanvasRender";
import { Ellipse, Line, PaintStyle, Rect, Shape } from '../ts/Shape';
const selectedTool = ref('transform')
const selectedShape = ref<Shape | null>()
const canv = ref<HTMLCanvasElement>()
const canvasPanel = ref<HTMLElement>()
const shapes = Array<Shape>();
var drawer: Drawer
const paintOptions = ref([
    { text: 'Fill', value: PaintStyle.FILL },
    { text: 'Stroke', value: PaintStyle.STROKE },
    { text: 'Both', value: PaintStyle.BOTH },
])
const refNum = ref(0)
//-------------------------
onMounted(() => {
    shapes.push(new Rect())
    shapes.push(new Ellipse())
    shapes.push(new Rect())
    selectedShape.value = shapes[1]
    drawer = new Drawer(canv.value!)
    const re = new ResizeObserver((e) => {
        if (canvasPanel.value)
            drawer.resize(
                canvasPanel.value.offsetWidth,
                canvasPanel.value.offsetHeight
            )

    })
    re.observe(canvasPanel.value!)

})

//-------------------------
watch(selectedTool, (newVal) => {

})
watch(() => selectedShape, (newVal, oldVal) => {
    drawer.repaint()
}, { deep: true })
//-----------
class Drawer extends CanvasHelper {
    render: CanvasRender
    downPoint = new Point()
    shapeDiffPoint = new Point()
    constructor(can: HTMLCanvasElement) {
        super(can)
        this.render = new CanvasRender(this.canvCtx!)
    }
    protected ondraw(ctx: CanvasRenderingContext2D): void {
        this.render.clear()
        shapes.forEach((e) => {
            this.render.drawShape(e)
        })
        if (selectedShape.value) {
            const bound = selectedShape.value.getBound().expand(2)
            const oldDash = ctx.getLineDash()
            ctx.setLineDash([5, 5])
            ctx.strokeRect(
                bound.left,
                bound.top,
                bound.right - bound.left,
                bound.bottom - bound.top,
            );
            ctx.setLineDash(oldDash)


        }
    }
    protected onMouseDown(e: MouseEvent): void {
        this.downPoint.x = e.x
        this.downPoint.y = e.y
        selectedShape.value = null
        if (selectedTool.value == 'transform') {
            selectedShape.value = this.findShape(this.downPoint)
            if (selectedShape.value != null) {
                this.shapeDiffPoint.x = e.x - selectedShape.value.x
                this.shapeDiffPoint.y = e.y - selectedShape.value.y
            }
            // console.log(selectedShape.value)
        }
        //console.log(shapes)
    }
    protected onMouseUp(e: MouseEvent): void {

    }
    protected onMouseMove(e: MouseEvent): void {
        const diffPoint = new Point(
            e.x - this.downPoint.x,
            e.y - this.downPoint.y,
        )
        //-------create shape
        if (
            selectedTool.value == "rect" &&
            e.buttons == 1 &&
            selectedShape.value == null
        ) {
            const rect = new Rect(
                this.downPoint.x, this.downPoint.y,
                diffPoint.x, diffPoint.y
            )
            selectedShape.value = rect
            shapes.push(rect)
        }
        else if (
            selectedTool.value == "ellipse" &&
            e.buttons == 1 &&
            selectedShape.value == null
        ) {

            const shape = new Ellipse(
                this.downPoint.x + diffPoint.x * 0.5,
                this.downPoint.y + diffPoint.y * 0.5,
                diffPoint.x * 0.5,
                diffPoint.y * 0.5,
            )
            selectedShape.value = shape
        }
        //transform
        else if (
            selectedTool.value == "transform" &&
            e.buttons == 1 &&
            selectedShape.value != null
        ) {
            const r = selectedShape.value
            r.x = e.x - this.shapeDiffPoint.x;
            r.y = e.y - this.shapeDiffPoint.y;
        }
        //update created selected shape
        if (
            (
                selectedTool.value == "rect" ||
                selectedTool.value == "ellipse"
            ) &&
            e.buttons == 1 &&
            selectedShape.value != null
        ) {

            if (selectedShape.value instanceof Rect) {
                const r = selectedShape.value as Rect
                r.width = diffPoint.x;
                r.height = diffPoint.y;
                console.log(diffPoint)

            }
            else if (selectedShape.value instanceof Ellipse) {
                const ellipse = selectedShape.value as Ellipse
                ellipse.x = this.downPoint.x + diffPoint.x * 0.5
                ellipse.y = this.downPoint.y + diffPoint.y * 0.5
                ellipse.radiusX = diffPoint.x * 0.5
                ellipse.radiusY = diffPoint.y * 0.5
            }

        }
        this.repaint()
    }
    //----------help
    findShape(p: Point): Shape | null {
        for (let i = 0; i < shapes.length; i++) {
            //searching from last
            const shape = shapes[shapes.length - i - 1];
            if (shape.isInside(p)) {
                return shape
            }

        }
        return null
    }

}
</script>

<template>
    <div class="panels">
        <div class="shapePanel">
            <ShapeBar @tool-changed="(a,b)=>{selectedTool=b}"></ShapeBar>
        </div>
        <div ref="canvasPanel" class="canvPanel">
            <canvas ref="canv" tabindex="1"></canvas>
        </div>
        <div class="propertyPanel">
            {{selectedTool}}
            <br>
            shapes {{shapes.length}}
            <!--ellipse-->
            <div v-if="(selectedShape instanceof Ellipse)">ellipse tool
                <div class="twoCol">
                    <label>x</label>
                    <input type="text" v-model="(selectedShape as Ellipse).x" />
                    <label>y</label>
                    <input type="text" v-model="(selectedShape as Ellipse).y" />
                    <label> radX</label>
                    <input type="text" v-model="(selectedShape as Ellipse).radiusX" />
                    <label> radY</label>
                    <input type="text" v-model="(selectedShape as Ellipse).radiusY" />
                    <label> fillColor</label>
                    <input type="color" v-model="(selectedShape as Ellipse).fillColor.nColor" />
                    <label> strokeColor</label>
                    <input type="color" v-model="(selectedShape as Ellipse).strokeColor.nColor" />
                    <label> isFill</label>
                    <select v-model="(selectedShape as Ellipse).paintStyle">
                        <option v-for="op in paintOptions" :value="op.value">
                            {{op.text}}
                        </option>
                    </select>
                    <label> strokeWidth</label>
                    <input type="text" v-model="(selectedShape as Ellipse).strokeWidth" />
                </div>
                <div class="log">{{selectedShape}}</div>
            </div>
            <!--rect-->
            <div v-else-if="(selectedShape instanceof Rect)">rect tool </div>
            <!--Line-->
            <div v-else-if="(selectedShape instanceof Line)">ellipse tool </div>
            <div v-else>unknow</div>
        </div>
    </div>
</template>

<style scoped>
canvas {
    outline: none;
}


.panels {
    display: grid;
    grid-template-columns: 50px auto 150px;
    height: 100vh;
    background-color: aqua;
}

.shapePanel {
    overflow: scroll;
    height: 100%;
}

.twoCol>* {
    width: 100%;
}

.canvPanel {
    overflow: hidden;
}

.twoCol {
    /* display: grid;
    grid-template-columns: 100px auto;
    height: 100%; */


}

.propertyPanel {
    height: 100vh;
    overflow: auto;
}

.twoCol>div>* {
    /* display: block;
    max-width: 100px; */
}

.log {
    font-size: 11px;
}

.twoCol>div>label {
    display: block;
    margin: 0px;
    padding: 0px;
    font-size: 12px;
    padding-left: 10px;
}

.propertyPanel {
    border-left: 1px solid rgba(0, 0, 0, 0.5);
    ;
}

::-webkit-scrollbar {
    display: none;
}

canvas {
    background-color: beige;
}
</style>


<script lang="ts">import { Point } from '../ts/Type';



/**
 * 
 * 
 * 
 * 





  <div class="in">
                <label > color</label>
                <input type="text" v-model="(selectedShape as Ellipse).color.nColor">
            </div>
            <div class="in">
                <label > x</label>
                <input type="text" v-model="(selectedShape as Ellipse).x">
            </div>
            <div class="in">
                <label > y</label>
                <input type="text" v-model="(selectedShape as Ellipse).y">
            </div>
            <div class="in">
                <label > radX</label>
                <input type="text" v-model="(selectedShape as Ellipse).radiusX">
            </div>
            <div class="in">
                <label > radY</label>
                <input type="text" v-model="(selectedShape as Ellipse).radiusY">
            </div>
            <div class="in">
                <label > isfill</label>
                <input type="checkbox" v-model="(selectedShape as Ellipse).isFill">
            </div>
 */
</script>