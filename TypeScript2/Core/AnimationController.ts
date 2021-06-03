import Animation from "./Animation.js";
import AnimationState from "./Enums/AnimationState.js";
import Event from "./Event.js";

export default class AnimationController extends Event{
    private _animations: Array<Animation> = []
    private _activeAnimation: number = -1

    constructor(){
        super()
    }

    set active(index: number){
        if(this._activeAnimation > -1) this._animations[this._activeAnimation].state = AnimationState.PAUSED
        this._activeAnimation = index
        this._animations[this._activeAnimation].state = AnimationState.PLAYING
    }

    get active(){
        return this._activeAnimation
    }

    public add(animation: Animation){
        this._animations.push(animation)
    }

    public addMultiple(animations: Array<Animation>){
        for (let i = 0; i < animations.length; i++) {
            this._animations.push(animations[i])
        }
    }

    get activeAnimation(){
        return this._animations[this._activeAnimation]
    }
}