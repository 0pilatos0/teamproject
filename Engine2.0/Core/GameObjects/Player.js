import { GameObject } from "../GameObject.js"
import { Sprite } from "../Sprite.js"

export class Player extends GameObject{
    #controllable
    #keysPressed = []
    constructor(position, size, controllable = false){
        super(position, size, Sprite('/Engine2.0/Sprites/Player.png'))
        this.#controllable = controllable
        this.#init()
    }

    #init = () => {
        if(this.#controllable){
            window.player = this
            document.body.addEventListener('keydown', this.#keydown)
            document.body.addEventListener('keyup', this.#keyup)
        }
    }

    update(){
        super.update()
        for (let i = 0; i < this.#keysPressed.length; i++) {
            let key = this.#keysPressed[i]
            switch (key) {
                case 'w':
                case 'W':
                    this.position.y -= 100 * window.deltaTime
                    break;
                case 'a':
                case 'A':
                    this.position.x -= 100 * window.deltaTime
                    break;
                case 's':
                case 'S':
                    this.position.y += 100 * window.deltaTime
                    break;
                case 'd':
                case 'D':
                    this.position.x += 100 * window.deltaTime
                    break;
                default:
                    break;
            }
        }
        if(this.position.x < 0){
            this.position.x = 0
        }
        if(this.position.y < 0){
            this.position.y = 0
        }
        if(this.position.x > window.mapBoundX){
            this.position.x = window.mapBoundX
        }
        if(this.position.y > window.mapBoundY){
            this.position.y = window.mapBoundY
        }
    }

    render = (ctx) => {
        if(!this.sprite) return
        let renderX = 0
        let renderY = 0
        if(this.position.x + this.size.x / 2 >= window.displayWidth / 2 && this.position.x + this.size.x / 2 < window.mapBoundX - window.displayWidth / 2){
            renderX = -this.size.x / 2
        }
        if(this.position.y + this.size.y / 2 >= window.displayHeight / 2 && this.position.y + this.size.y / 2 < window.mapBoundY - window.displayHeight / 2){
            renderY = -this.size.y / 2
        }
        if(this.position.x + this.size.x / 2 >= window.displayWidth / 2 && this.position.x + this.size.x / 2 < window.mapBoundX - window.displayWidth / 2 && this.position.y + this.size.y / 2 >= window.displayHeight / 2 && this.position.y + this.size.y / 2 < window.mapBoundY - window.displayHeight / 2){
            renderX = -this.size.x / 2
            renderY = -this.size.y / 2
        }
        ctx.drawImage(this.sprite, renderX || this.position.x - window.displayWidth / 2, renderY || this.position.y - window.displayHeight / 2)
        // if(this.position.y + this.size.y / 2 >= window.mapBoundY - window.displayHeight / 2){
        //     super.render(ctx)
        // }
        // if(this.position.x + this.size.x / 2 >= window.mapBoundX - window.displayWidth / 2){
        //     super.render(ctx)
        // }
    }

    #keydown = (e) => {
        if(this.#keysPressed.indexOf(e.key) == -1) this.#keysPressed.push(e.key)
    }

    #keyup = (e) => {
        this.#keysPressed.splice(this.#keysPressed.indexOf(e.key), 1)
    }

    get json(){
        let data = super.json
        data.controllable = this.#controllable
        return data
    }
}