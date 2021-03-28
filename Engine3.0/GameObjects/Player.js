import Animation from "../Core/Animation.js";
import GameObject from "../Core/GameObject.js";
import Tileset from "../Core/Tileset.js";
import Vector2 from "../Core/Vector2.js";
export default class Player extends GameObject {
    constructor(position, size, controllable = false) {
        super(position, size);
        this._controllable = false;
        this._keysPressed = [];
        this._speed = 500;
        this._oldPosition = new Vector2(this.position.x, this.position.y);
        this._animations = [];
        this._controllable = controllable;
        this.initialize();
    }
    initialize() {
        if (this._controllable) {
            document.body.addEventListener('keydown', this.keydown.bind(this));
            document.body.addEventListener('keyup', this.keyup.bind(this));
            window.player = this;
            new Tileset("/Engine3.0/Players/Player1.png").on('load', (tileset) => {
                console.log(tileset.tiles2D);
                for (let i = 0; i < tileset.tiles2D.length; i++) {
                    this._animations.push(new Animation());
                    for (let j = 0; j < tileset.tiles2D[i].length; j++) {
                        this._animations[i].add(tileset.tiles2D[i][j], 200);
                    }
                }
                this.trigger('load', this);
            });
        }
    }
    render(ctx) {
        if (!this.sprite)
            return;
        if (!this.visible)
            return;
        let renderX = null;
        let renderY = null;
        if (this.position.x + this.size.x / 2 >= window.displayWidth / 2 && this.position.x + this.size.x / 2 < window.mapBoundX - window.displayWidth / 2)
            renderX = -this.size.x / 2;
        if (this.position.y + this.size.y / 2 >= window.displayHeight / 2 && this.position.y + this.size.y / 2 < window.mapBoundY - window.displayHeight / 2)
            renderY = -this.size.y / 2;
        if (this.position.x + this.size.x / 2 >= window.mapBoundX - window.displayWidth / 2)
            renderX = this.position.x - window.mapBoundX + window.displayWidth / 2;
        if (this.position.y + this.size.y / 2 >= window.mapBoundY - window.displayHeight / 2)
            renderY = this.position.y - window.mapBoundY - window.displayHeight / 2;
        ctx.drawImage(this.sprite.sprite, renderX !== null && renderX !== void 0 ? renderX : this.position.x - window.displayWidth / 2, renderY !== null && renderY !== void 0 ? renderY : this.position.y - window.displayHeight / 2);
    }
    update() {
        super.update();
        this._oldPosition = new Vector2(this.position.x, this.position.y);
        let steps = 15;
        for (let k = 0; k < this._keysPressed.length; k++) {
            let key = this._keysPressed[k];
            switch (key) {
                case 'w':
                case 'W':
                    for (let s = 0; s < steps; s++) {
                        this.position.y -= this._speed * window.deltaTime / steps;
                        this.checkCollisions(() => { this.position.y = Math.round(this._oldPosition.y); });
                    }
                    break;
                case 'a':
                case 'A':
                    for (let s = 0; s < steps; s++) {
                        this.position.x -= this._speed * window.deltaTime / steps;
                        this.checkCollisions(() => { this.position.x = Math.round(this._oldPosition.x); });
                    }
                    break;
                case 's':
                case 'S':
                    for (let s = 0; s < steps; s++) {
                        this.position.y += this._speed * window.deltaTime / steps;
                        this.checkCollisions(() => { this.position.y = Math.round(this._oldPosition.y); });
                    }
                    break;
                case 'd':
                case 'D':
                    for (let s = 0; s < steps; s++) {
                        this.position.x += this._speed * window.deltaTime / steps;
                        this.checkCollisions(() => { this.position.x = Math.round(this._oldPosition.x); });
                    }
                    break;
                default:
                    break;
            }
        }
        if (this._animations.length == 9) {
            if (this.pressed('w') && !this.pressed('d') && !this.pressed('a'))
                this.sprite = this._animations[4].activeSprite;
            else if (this.pressed('a') && this.pressed('w'))
                this.sprite = this._animations[5].activeSprite;
            else if (this.pressed('a') && !this.pressed('w') && !this.pressed('s'))
                this.sprite = this._animations[6].activeSprite;
            else if (this.pressed('a') && this.pressed('s'))
                this.sprite = this._animations[7].activeSprite;
            else if (this.pressed('s') && !this.pressed('a') && !this.pressed('d'))
                this.sprite = this._animations[8].activeSprite;
            else if (this.pressed('d') && !this.pressed('w') && !this.pressed('s'))
                this.sprite = this._animations[2].activeSprite;
            else if (this.pressed('d') && this.pressed('s'))
                this.sprite = this._animations[1].activeSprite;
            else if (this.pressed('d') && this.pressed('w'))
                this.sprite = this._animations[3].activeSprite;
            else
                this.sprite = this._animations[0].activeSprite;
        }
        if (this.position.x < 0)
            this.position.x = 0;
        if (this.position.y < 0)
            this.position.y = 0;
        if (this.position.x + this.size.x > window.mapBoundX)
            this.position.x = window.mapBoundX - this.size.x;
        if (this.position.y + this.size.y > window.mapBoundY)
            this.position.y = window.mapBoundY - this.size.y;
    }
    keydown(e) {
        if (this._keysPressed.indexOf(e.key) == -1)
            this._keysPressed.push(e.key);
    }
    keyup(e) {
        this._keysPressed.splice(this._keysPressed.indexOf(e.key), 1);
    }
    pressed(key) {
        return this._keysPressed.indexOf(key) > -1;
    }
    checkCollisions(callback) {
        if (!window.mapRenderArea)
            return;
        for (let l = 0; l < window.mapRenderArea.length; l++) {
            for (let y = 0; y < window.mapRenderArea[l].length; y++) {
                for (let x = 0; x < window.mapRenderArea[l][y].length; x++) {
                    let gameObject = window.mapRenderArea[l][y][x];
                    if (gameObject == null)
                        continue;
                    if (!gameObject.visible)
                        continue;
                    if (gameObject.sprite.type == 0 /* DEFAULT */)
                        continue;
                    if (gameObject == this)
                        continue;
                    if (gameObject.position.x < this.position.x - window.displayWidth / 2 && gameObject.position.x >= this.position.x + window.displayWidth / 2)
                        continue;
                    if (gameObject.position.y < this.position.y - window.displayHeight / 2 && gameObject.position.y >= this.position.y + window.displayHeight / 2)
                        continue;
                    if (!this.colliding(gameObject))
                        continue;
                    switch (gameObject.sprite.type) {
                        case 1 /* COLLIDABLE */:
                            callback();
                            break;
                        case 2 /* INTERACTABLE */:
                            gameObject.visible = false; //TODO make it destroyable
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
}