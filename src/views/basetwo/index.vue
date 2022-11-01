<template>
    <canvas id="basetwo"></canvas>
</template>

<script setup lang="ts">
import {
    AmbientLight,
    Color,
    DirectionalLight,
    Fog,
    Group,
    IcosahedronGeometry,
    Mesh,
    MeshLambertMaterial,
    MeshPhongMaterial,
    MeshToonMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    SphereGeometry,
    SpotLight,
    TorusGeometry,
    Vector3,
    WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onMounted } from 'vue'
// 定义渲染尺寸
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
let renderer: WebGLRenderer
let controls: OrbitControls
onMounted(() => {
    const render = document.querySelector('#basetwo') as HTMLCanvasElement
    renderer = new WebGLRenderer({ canvas: render })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // 初始化控制器
    /* 
        镜头轨道控制器 OrbitControls ，通过它可以对三维场景用鼠标 🖱 进行缩放、平移、旋转等操作，
        本质上改变的不是场景，而是相机的位置参数。
        可以选择通过设置 controls.enableDamping 为 true 来开启控制器的移动惯性，
        这样在使用鼠标交互过程中就会感觉更加流畅和逼真。

    */
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    tick()
})
const scene = new Scene()
scene.background = new Color(0x1a1a1a)

// Fog 类定义的是线性雾，雾的密度随着距离线性增大，即场景中物体雾化效果随着随距离线性变化。
/* 
color: 表示雾的颜色，如设置为白色，场景中远处物体为蓝色，场景中最近处距离物体是自身颜色，
最远和最近之间的物体颜色是物体本身颜色和雾颜色的混合效果。
near：表示应用雾化效果的最小距离，距离活动摄像机长度小于 near 的物体将不会被雾所影响。
far：表示应用雾化效果的最大距离，距离活动摄像机长度大于 far 的物体将不会被雾所影响。
*/
scene.fog = new Fog(0x4169e1, 1, 1000)
// AmbientLight 环境光，它是一种基础光源，整个场景中的物体都将接收它的颜色。其中两个参数分别代表光照的颜色和强度。
const light = new DirectionalLight(0x8b1a1a, 13.5)
scene.add(light)

const camera = new PerspectiveCamera(40, sizes.width / sizes.height)
scene.add(camera)
camera.position.set(20, 100, 450)

// 先创建立方体和材质，再用它们生成网格模型，最后将它添加到场景中即可。
// 星球模型使用了非光泽表面材质 MeshLambertMaterial，立方体采用 SphereGeometry 生成。
const SphereMaterial = new MeshToonMaterial({
    color: 0x03c03c,
    // 几何模型的线框结构
    wireframe: true
})
const sphereGeometry = new SphereGeometry(100, 32, 32)
const planet = new Mesh(sphereGeometry, SphereMaterial)
scene.add(planet)

// 光环
const torusGeometry = new TorusGeometry(150, 8, 2, 120)
const torusMaterial = new MeshLambertMaterial({
    color: 0x40a9ff,
    wireframe: true
})
const ring = new Mesh(torusGeometry, torusMaterial)
ring.rotation.x = Math.PI / 2
ring.rotation.y = -0.1 * (Math.PI / 2)
scene.add(ring)

// 卫星
const IcoGeometry = new IcosahedronGeometry(16, 0)
const IcoMaterial = new MeshToonMaterial({ color: 0xfffc00 })
const satellite = new Mesh(IcoGeometry, IcoMaterial)
scene.add(satellite)
// 星星
const stars = new Group()
for (let i = 0; i < 500; i++) {
    const geometry = new IcosahedronGeometry(Math.random() * 2, 0)
    const material = new MeshToonMaterial({ color: 0xeeeeee })
    const mesh = new Mesh(geometry, material)
    mesh.position.x = (Math.random() - 0.5) * 700
    mesh.position.y = (Math.random() - 0.5) * 700
    mesh.position.z = (Math.random() - 0.5) * 700
    mesh.rotation.x = Math.random() * 2 * Math.PI
    mesh.rotation.y = Math.random() * 2 * Math.PI
    mesh.rotation.z = Math.random() * 2 * Math.PI
    stars.add(mesh)
}
scene.add(stars)

let rot = 0
// 动画
const axis = new Vector3(0, 0, 1)
const tick = () => {
    // 更新渲染器
    renderer.render(scene, camera)
    // 给网格模型添加一个转动动画
    rot += Math.random() * 0.8
    const radian = (rot * Math.PI) / 180
    // 星球位置动画
    planet && (planet.rotation.y += 0.005)
    // 星球轨道环位置动画
    ring && ring.rotateOnAxis(axis, Math.PI / 400)
    // 卫星位置动画
    satellite.position.x = 250 * Math.sin(radian)
    satellite.position.y = 100 * Math.cos(radian)
    satellite.position.z = -100 * Math.cos(radian)
    satellite.rotation.x += 0.005
    satellite.rotation.y += 0.005
    satellite.rotation.z -= 0.005
    // 星星动画
    stars.rotation.y += 0.0009
    stars.rotation.z -= 0.0003
    // 更新控制器
    controls.update()
    // 页面重绘时调用自身
    window.requestAnimationFrame(tick)
}

// 页面缩放事件监听
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // 更新渲染
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // 更新相机
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
})
</script>

<style scoped lang="less"></style>
