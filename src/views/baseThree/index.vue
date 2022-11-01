<template>
    <div class="shadow_page">
        <div id="loading-text-intro"><p>Loading</p></div>
        <div class="content" style="visibility: hidden">
            <nav class="header"></nav>
            <section class="section first">
                <div class="info"></div>
                <canvas id="canvas-container" class="webgl"></canvas>
            </section>
            <section class="section second">
                <div class="second-container"></div>
                <canvas id="canvas-container-details" class="webgl"></canvas>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from '@vue/runtime-core'
import {
    Group,
    LoadingManager,
    PerspectiveCamera,
    Scene,
    sRGBEncoding,
    WebGLRenderer
} from 'three'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TWEEN  } from 'three/examples/jsm/libs/tween.module.min.js';

let section: HTMLElement
let width: number
let height: number
let renderer: WebGLRenderer
let renderer2: WebGLRenderer
onMounted(() => {
    // 初始化渲染器1
    section = document.getElementsByClassName('section')[0]
    width = section.clientWidth
    height = section.clientHeight
    renderer = new WebGLRenderer({
        canvas: document.querySelector('#canvas-container'),
        //  是否执行抗锯齿
        antialias: true,
        alpha: true,
        // 提示用户代理怎样的配置更适用于当前的WebGL环境
        powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // 定义渲染器是否在渲染每一帧之前自动清除其输出。
    renderer.autoClear = true
    renderer.outputEncoding = sRGBEncoding

    renderer2 = new WebGLRenderer({
        canvas: document.querySelector('#canvas-container-details'),
        antialias: true
    })

    renderer2.setSize(width, height)
    renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer2.outputEncoding = sRGBEncoding

    initLoadingManager()
})

// 初始化场景
const scene = new Scene()

// 初始化相机
const cameraGroup = new Group()
scene.add(cameraGroup)

const camera1 = new PerspectiveCamera(35, width / height, 1, 100)
camera1.position.set(19, 1.54, -0.1)
cameraGroup.add(camera1)

const camera2 = new PerspectiveCamera(35, width / height, 1, 100)
camera2.position.set(3.2, 2.8, 3.2)
camera2.rotation.set(0, 1, 0)
cameraGroup.add(camera2)

scene.add(cameraGroup)

function initLoadingManager() {
    const loadingManager = new LoadingManager()
    loadingManager.onLoad = () => {
        document.querySelector('.content').style.visibility = 'visible'
        const yPosition = { y: 0 }
        const ftsLoader = document.querySelector('.lds-roller')
        const loadingCover = document.getElementById('loading-text-intro');
        // 隐藏加载页面动画
        new
    }
}

// 页面缩放事件监听
window.addEventListener('resize', () => {
    let section = document.getElementsByClassName('section')[0]
    camera.aspect = section.clientWidth / section.clientHeight
    camera.updateProjectionMatrix()
    camera2.aspect = section.clientWidth / section.clientHeight
    camera2.updateProjectionMatrix()
    renderer.setSize(section.clientWidth, section.clientHeight)
    renderer2.setSize(section.clientWidth, section.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
</script>

<style scoped lang="less">
.section {
    width: 100vw;
    height: 100vh;
}
</style>
