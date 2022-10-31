<template>
    <canvas id="three-contant"></canvas>
</template>

<script setup lang="ts">
// 全局引入
import * as THREE from 'three'
// 局部引入
import {
    BoxGeometry,
    Color,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from 'three'
import { onMounted } from 'vue'
// 定义尺寸
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

// 初始化渲染器
/* WebGLRenderer 用 WebGL 渲染出场景。
通过 new THREE.WebGLRenderer 初始化渲染器，并将 canvas 容器作为参数传给它。
通过调用 setSize 方法设置渲染器的尺寸；
调用 setPixelRatio 设置 canvas 的像素比为当前设备的屏幕像素比，避免高分屏下出现模糊情况。
*/
let render: HTMLCanvasElement
let renderer: THREE.WebGLRenderer
onMounted(() => {
    render = document.querySelector('#three-contant') as HTMLCanvasElement
    renderer = new WebGLRenderer({ canvas: render })
    renderer.setSize(size.width, size.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    tick()
})

// 设置场景
/*
    Scene 是场景对象，所有的网格对象、灯光、动画等都需要放在场景中,使用 new THREE.Scene 初始化场景，
    常用属性和方法：
    fog：设置场景的雾化效果,可以渲染出一层雾气，隐层远处的的物体。
    overrideMaterial：强制场景中所有物体使用相同材质。
    autoUpdate：设置是否自动更新。
    background：设置场景背景，默认为黑色。
    children：所有对象的列表。
    add()：向场景中添加对象。
    remove()：从场景中移除对象。
    getChildByName()：根据名字直接返回这个对象。
    traverse()：传入一个回调函数访问所有的对象。
*/
const scene = new Scene()
scene.background = new Color('#fff')
// 设置相机
/*  透视相机 PerspectiveCamera
    PerspectiveCamera(fov, aspect, near, far)
    fov：表示视场，就是能够看到的角度范围，人的眼睛大约能够看到 180度 的视场，
    视角大小设置要根据具体应用，一般游戏会设置 60~90 度，默认值 45。
    aspect：表示渲染窗口的长宽比，如果一个网页上只有一个全屏的 canvas 画布且画布上只有一个窗口，
    那么 aspect 的值就是网页窗口客户区的宽高比 window.innerWidth/window.innerHeight。
    near：属性表示的是从距离相机多远的位置开始渲染，一般情况会设置一个很小的值。 默认值 0.1。
    far：属性表示的是距离相机多远的位置截止渲染，如果设置的值偏小，会有部分场景看不到，默认值 1000。
*/
const camera = new PerspectiveCamera(75, size.width / size.height, 0.1, 100)
camera.position.z = 3
// scene.add(camera)
// BoxGeometry 是四边形的原始几何类，来创建立方体或者不规则四边形。
/*
    width：X轴 的宽度，默认为 1。
    height：Y轴 的高度，默认为 1。
    depth：Z轴 的深度，默认为 1。
    widthSegments：可选，宽度的分段数，默认是 1。
    heightSegments：可选，高度的分段数，默认是 1。
    depthSegments：可选，深度的分段数，默认是 1
 */
const geometry = new BoxGeometry(1, 1, 1)
// 基础网格材质是一种一个以简单着色方式来绘制几何体的材质，它不受光照的影响。
/*
    parameters：可选，用于定义材质外观的对象，具有一个或多个属性如 color、map 等。
*/
const material = new MeshBasicMaterial({ color: 0x03c03c })
const mesh = new Mesh(geometry, material)
scene.add(mesh)

const tick = () => {
    // 更新渲染器
    renderer.render(scene, camera)

    // mesh && (mesh.rotation.x += 0.02)
    mesh && (mesh.rotation.y += 0.02)
    // 页面重绘时调用自身
    window.requestAnimationFrame(tick)
}

// 页面缩放事件监听
/*
同时更新渲染器的尺寸和相机视角比例，并调用 .updateProjectionMatrix() 手动更新相机对象的投影矩阵属性。
*/
window.addEventListener('resize', () => {
    size.width = window.innerWidth
    size.height = window.innerHeight
    // 更新渲染
    renderer.setSize(size.width, size.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
})
</script>

<style scoped lang="less">
#three-contant {
    width: 100px;
    height: 100px;
}
</style>
