import Canvas from "./Canvas.js"
import Event from "./Event.js"
import Sprite from "./Sprite.js"
import Vector2 from "./Vector2.js"
declare var window: any
export default class Tileset extends Event{
    static tiles: Array<Sprite> = []
    private _tiles: Array<Sprite> = []
    private _columns: number = 0
    private _rows: number = 0

    constructor(data: any){
        super()
        this.init(data)
    }

    private init(data: any){
        let imgPath: string, tileWidth: number, tileHeight: number
        let img = new Image()
        let onlyPath = typeof data == "string"
        imgPath = onlyPath ? data : data.image
        img.onload = () => {
            tileWidth = onlyPath ? window.spriteSize / window.spriteScaleFactor : data.tilewidth
            tileHeight = onlyPath ? window.spriteSize / window.spriteScaleFactor : data.tileheight
            this._rows = img.height / tileHeight
            this._columns = img.width / tileWidth
            let totalTiles: number = this._columns * this._rows
            this._tiles.fill(new Sprite(''), 0, totalTiles)
            Tileset.tiles.fill(new Sprite(''), 0, totalTiles)
            let doneTiles: number = 0
            for (let i = 0; i < totalTiles; i++) {
                let canvas = new Canvas(new Vector2(tileWidth, tileHeight))
                canvas.ctx.drawImage(img, -(i%this._columns) * tileWidth, -Math.floor(i/this._columns) * tileHeight)
                let spriteData: any = !onlyPath ? {offsetId: data.offsetId} : {}
                for (let j = 0; j < data?.tiles?.length; j++) { Object.assign(spriteData, (data.tiles[j].id == i ? data.tiles[j] : spriteData)) }
                new Sprite(canvas.element.toDataURL('image/png'), new Vector2(window.spriteSize, window.spriteSize), spriteData, this).on('load', (sprite: Sprite) => {
                    Tileset.tiles[i] = sprite
                    this._tiles[i] = sprite
                    doneTiles++
                    if(doneTiles == totalTiles) {
                        this.trigger('load', this)
                    }
                })
            }
        }
        img.src = imgPath
    }

    get tiles(){
        return this._tiles
    }

    get tiles2D(){
        let rtn = []
        for (let y = 0; y < this._rows; y++) {
            rtn.push([])
            rtn[y] = this._tiles.slice(y*this._columns, ((y+1)*this._columns)-1)
        }
        return rtn
    }
}