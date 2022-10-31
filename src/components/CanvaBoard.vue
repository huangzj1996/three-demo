<template>
    <div class="canvaWrap" @click="handleClearSelect">
        <BaseBoard
            msg="几何画板"
            ref="boardDom"
            :onMouseChange="handleMouseChange"
        >
            <div class="shapeWrap">
                <div
                    v-for="item in canvasBox.rect"
                    :key="item.key"
                    :class="[
                        'shape',
                        'rect',
                        curSelect === item.key ? 'active' : ''
                    ]"
                    :style="{
                        left: item.style.left,
                        top: item.style.top,
                        width: item.style.width,
                        height: item.style.height
                    }"
                    :data-key="item.key"
                    @dblclick.stop="handleSelected(item.key)"
                >
                    <span
                        v-if="curSelect === item.key"
                        @click="handleDel(item.key)"
                        >x</span
                    >
                </div>
            </div>
        </BaseBoard>
        <div class="toolbar">
            <div
                :class="['toolItem', curShape === 'rect' ? 'active' : '']"
                @click="handleShapeClick('rect')"
            >
                <svg width="20" height="16">
                    <rect
                        x="0"
                        y="0"
                        width="20"
                        height="16"
                        style="fill: transparent; stroke: #fff; stroke-width: 2"
                    />
                </svg>
            </div>
            <div
                :class="['toolItem', curShape === 'circle' ? 'active' : '']"
                @click="handleShapeClick('circle')"
            >
                <svg width="22" height="22">
                    <circle
                        cx="11"
                        cy="11"
                        r="10"
                        stroke="#fff"
                        stroke-width="1"
                        fill="transparent"
                    />
                </svg>
            </div>
            <div
                :class="['toolItem', curShape === 'line' ? 'active' : '']"
                @click="handleShapeClick('line')"
            >
                <svg width="22" height="22">
                    <line
                        x1="2"
                        y1="2"
                        x2="20"
                        y2="20"
                        style="stroke: rgb(255, 255, 255); stroke-width: 1"
                    />
                </svg>
            </div>
            <div class="toolItem" :class="['toolItem']">
                <span>图层</span>
            </div>
            <div class="toolItem" :class="['toolItem']">
                <span>撤销</span>
            </div>
            <div class="toolItem" :class="['toolItem']">
                <span>重做</span>
            </div>
            <div class="toolItem" :class="['toolItem']" @click="handleClear">
                <span>清空</span>
            </div>
            <div class="toolItem" :class="['toolItem']">
                <span>下载</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseBoard from './BaseBoard.vue'
type shapeType = 'rect' | 'circle' | 'line'
interface IBaseShapeProp {
    type: shapeType
    key: string
    style: any
}

const curShape = ref<shapeType | ''>('')
const curSelect = ref('')
let templateDot: any[] = []
const mouseAbsPos = ref({
    x: 0,
    y: 0
})

const canvasBox = ref<{ [key in shapeType]: IBaseShapeProp[] }>({
    rect: [],
    circle: [],
    line: []
})

const handleClearSelect = () => {}

const handleMouseChange = (x: number, y: number) => {
    mouseAbsPos.value = { x, y }
    // 如果有选中的元素, 则判断为移动当前选中元素
    if (curSelect.value && templateDot.length) {
        const [x0, y0] = templateDot
        canvasBox.value['rect'] = canvasBox.value['rect'].map((v) => {
            if (v.key === curSelect.value) {
                const { left, top } = v.style
                templateDot = [x, y]
                return {
                    ...v,
                    style: {
                        ...v.style,
                        left: parseFloat(left) + (x - x0) + 'px',
                        top: parseFloat(top) + (y - y0) + 'px'
                    }
                }
            }
            return v
        })
        return
    }

    // 否则则生成元素
    const [a1, b1, key] = templateDot
    console.log(a1, b1, key)
    if (curShape.value && templateDot.length) {
        let dx = x - a1
        let dy = y - b1
        let curIndex = canvasBox.value['rect'].findIndex((v) => v.key === key)
        if (curIndex > -1) {
            canvasBox.value['rect'][curIndex] = {
                ...canvasBox.value['rect'][curIndex],
                style: {
                    left: (dx > 0 ? a1 : x) + 'px',
                    top: (dy > 0 ? b1 : y) + 'px',
                    width: Math.abs(dx) + 'px',
                    height: Math.abs(dy) + 'px'
                }
            }
        }
    }
}

const handleSelected = (key: string) => {
    curSelect.value = key
}

const handleDel = (key: string) => {
    canvasBox.value['rect'] = canvasBox.value['rect'].filter(
        (v) => v.key !== key
    )
    curSelect.value = ''
    templateDot = []
}

onMounted(()=>{
    
})

// 点击添加点击样式
const handleShapeClick = (type: shapeType) => {
    // 先判断再赋值
    curShape.value = type === curShape.value ? '' : type
}
// 清空
const handleClear = () => {
    canvasBox.value['rect'] = []
}
</script>

<style scoped lang="less">
.canvaWrap {
    position: relative;
    color: @primary;
    .toolbar {
        position: absolute;
        top: 20px;
        left: 16px;
        width: 42px;
        height: 546px;
        background-color: rgba(0, 0, 0, 0.8);
        border-radius: 4px;
        .toolItem {
            height: 28px;
            margin: 4px 6px 6px;
            border-radius: 4px;
            background-color: rgb(87, 86, 86);
            text-align: center;
            font-size: 12px;
            color: #fff;
            cursor: pointer;
            span {
                line-height: 28px;
            }
            &.active {
                background-color: rgb(144, 139, 139);
            }
            svg {
                vertical-align: middle;
            }
        }
    }
    .shapeWrap {
        .shape {
            position: absolute;
            border: 1px solid #646cff;
            background-color: transparent;
            &.active {
                border-width: 2px;
                cursor: move;
                span {
                    position: absolute;
                    right: -10px;
                    top: -10px;
                    user-select: none;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    line-height: 18px;
                    border-radius: 50%;
                    background-color: red;
                    color: #fff;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
