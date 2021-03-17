import { Map } from "./Map.js"
import { Scene } from "./Scene.js"

export class Window{
    #canvas
    #ctx
    #scene

    constructor(){
        this.#init()
        this.map = new Map()
    }

    #init = () => {
        window.spriteSize = 96
        this.#canvas = document.createElement('canvas')
        this.#ctx = this.#canvas.getContext('2d')
        this.#resize()
        window.addEventListener('resize', this.#resize)
        document.body.appendChild(this.#canvas)
        this.#scene = new Scene()
        window.requestAnimationFrame(this.#render)
        setInterval(() => { this.#update() }, 1000/60)
    }
     
    #resize = () => {
        this.#canvas.width = window.innerWidth
        this.#canvas.height = window.innerHeight

        let scaleFitNative = Math.min(window.innerWidth / 1920, window.innerHeight / 1080)

        window.displayWidth = window.innerWidth / scaleFitNative
        window.displayHeight = window.innerHeight / scaleFitNative

        this.#ctx.setTransform(scaleFitNative, 0, 0, scaleFitNative, window.innerWidth / 2, window.innerHeight / 2)
        this.#ctx.imageSmoothingEnabled = scaleFitNative < 1

        window.maxSpritesX = Math.round(window.displayWidth / window.spriteSize) + 1
        window.maxSpritesY = Math.round(window.displayHeight / window.spriteSize) + 1

        console.log(window.maxSpritesX)
        console.log(window.maxSpritesY)
    }

    #render = () => {
        window.requestAnimationFrame(this.#render)
        this.#ctx.clearRect(-window.displayWidth / 2, -window.displayHeight / 2, window.displayWidth, window.displayHeight)
        this.#ctx.fillRect(-window.displayWidth / 2, -window.displayHeight / 2, window.displayWidth, window.displayHeight)
        this.map.render(this.#ctx)
        this.#scene.render(this.#ctx)
        window.player.render(this.#ctx)
    }

    #update = () => {
        this.#scene.update()
        this.map.update()
        window.player.update()
    }
}