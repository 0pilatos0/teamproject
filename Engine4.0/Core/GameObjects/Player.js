import Animation from "../Animation.js";
import AnimationController from "../AnimationController.js";
import GameObject from "../GameObject.js";
import Input from "../Input.js";
import Map from "../Map.js";
import Tileset from "../Tileset.js";
import Vector2 from "../Vector2.js";
import Window from "../Window.js";
export default class Player extends GameObject {
    constructor(position, size, controllable = false) {
        super(position, size);
        this._controllable = false;
        this._speed = 500;
        this._oldPosition = new Vector2(this.position.x, this.position.y);
        this._animationController = new AnimationController();
        this._controllable = controllable;
        if (this._controllable) {
            Player.player = this;
            new Tileset("/Engine4.0/Players/Player1.png").on('load', (tileset) => {
                var _a, _b;
                for (let i = 0; i < tileset.tiles2D.length; i++) {
                    let animation = new Animation();
                    for (let j = 0; j < tileset.tiles2D[i].length; j++) {
                        animation.add(tileset.tiles2D[i][j], 200);
                    }
                    this._animationController.add(animation);
                }
                (_a = this.collider) === null || _a === void 0 ? void 0 : _a.on('enter', (gameObject) => {
                    var _a, _b;
                    if (((_a = gameObject.collider) === null || _a === void 0 ? void 0 : _a.type) == 1 /* COLLIDABLE */) {
                        if (Input.pressed('w'))
                            this.position.y = Math.round(this._oldPosition.y);
                        if (Input.pressed('a'))
                            this.position.x = Math.round(this._oldPosition.x);
                        if (Input.pressed('s'))
                            this.position.y = Math.round(this._oldPosition.y);
                        if (Input.pressed('d'))
                            this.position.x = Math.round(this._oldPosition.x);
                    }
                    if (((_b = gameObject.collider) === null || _b === void 0 ? void 0 : _b.type) == 2 /* INTERACTABLE */) {
                        gameObject.destroy();
                    }
                });
                (_b = this.collider) === null || _b === void 0 ? void 0 : _b.on('stay', (gameObject) => {
                    var _a;
                    if (((_a = gameObject.collider) === null || _a === void 0 ? void 0 : _a.type) == 1 /* COLLIDABLE */) {
                        if (Input.pressed('w'))
                            this.position.y = Math.round(this._oldPosition.y);
                        if (Input.pressed('a'))
                            this.position.x = Math.round(this._oldPosition.x);
                        if (Input.pressed('s'))
                            this.position.y = Math.round(this._oldPosition.y);
                        if (Input.pressed('d'))
                            this.position.x = Math.round(this._oldPosition.x);
                    }
                });
            });
        }
    }
    update() {
        this._oldPosition = new Vector2(this.position.x, this.position.y);
        let steps = 20;
        if (Input.pressed('w')) {
            for (let s = 0; s < steps; s++) {
                this._oldPosition.y = this.position.y;
                this.position.y -= this._speed * Window.deltaTime / steps;
                super.update();
            }
        }
        if (Input.pressed('a')) {
            for (let s = 0; s < steps; s++) {
                this._oldPosition.x = this.position.x;
                this.position.x -= this._speed * Window.deltaTime / steps;
                super.update();
            }
        }
        if (Input.pressed('s')) {
            for (let s = 0; s < steps; s++) {
                this._oldPosition.y = this.position.y;
                this.position.y += this._speed * Window.deltaTime / steps;
                super.update();
            }
        }
        if (Input.pressed('d')) {
            for (let s = 0; s < steps; s++) {
                this._oldPosition.x = this.position.x;
                this.position.x += this._speed * Window.deltaTime / steps;
                super.update();
            }
        }
        if (Input.pressed('w') && !Input.pressed('d') && !Input.pressed('a'))
            this._animationController.active = 4;
        else if (Input.pressed('a') && Input.pressed('w'))
            this._animationController.active = 5;
        else if (Input.pressed('a') && !Input.pressed('w') && !Input.pressed('s'))
            this._animationController.active = 6;
        else if (Input.pressed('a') && Input.pressed('s'))
            this._animationController.active = 7;
        else if (Input.pressed('s') && !Input.pressed('a') && !Input.pressed('d'))
            this._animationController.active = 8;
        else if (Input.pressed('d') && !Input.pressed('w') && !Input.pressed('s'))
            this._animationController.active = 2;
        else if (Input.pressed('d') && Input.pressed('s'))
            this._animationController.active = 1;
        else if (Input.pressed('d') && Input.pressed('w'))
            this._animationController.active = 3;
        else
            this._animationController.active = 0;
        this.spriteIndex = this._animationController.activeAnimation.activeSpriteIndex;
        if (this.position.x < 0)
            this.position.x = 0;
        if (this.position.y < 0)
            this.position.y = 0;
        if (this.position.x + this.size.x > Map.active.bounds.right)
            this.position.x = Map.active.bounds.right - this.size.x;
        if (this.position.y + this.size.y > Map.active.bounds.bottom)
            this.position.y = Map.active.bounds.bottom - this.size.y;
    }
}