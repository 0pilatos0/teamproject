//#region Left

let draggingLeft = false
dragBarLeft.addEventListener('mousedown', () => {
    draggingLeft = true
})

document.body.addEventListener('mousemove', (e) => {
    if(draggingLeft) editorLeft.style.width = `${e.screenX}px`
})

document.body.addEventListener('mouseup', (e) => {
    draggingLeft = false
})

hideButtonLeft.addEventListener('click', () => {
    if(hideButtonLeft.innerText == "<"){
        editorLeft.style.minWidth = 0
        editorLeft.style.width = 0
        holderLeft.style.display = "none"
        hideButtonLeft.innerText = ">"
    }
    else{
        editorLeft.style.minWidth = `250px`
        editorLeft.style.width = `250px`
        holderLeft.style.display = "grid"
        hideButtonLeft.innerText = "<"
    }
})

let reloadBase = (objects, htmlList) => {
    htmlList.innerHTML = ""
    for (let i = 0; i < objects.length; i++) {
        let li = document.createElement('li')
        li.innerText = objects[i].constructor.name
        htmlList.appendChild(li)
        li.addEventListener('click', () => {
            let properties = objects[i].json
            inspector.innerHTML = ''
            for (let x = 0; x < Object.entries(properties).length; x++) {
                let entry = Object.entries(properties)[x]
                let type = entry[1].constructor.name
                let name = entry[0]
                let value = entry[1]
                switch (type) {
                    case 'Vector2':
                        dynamicFieldCreator(type, name, [value.x, value.y], objects[i])
                        break;
                    case 'Boolean':
                        dynamicFieldCreator(type, name, value, objects[i])
                        break;
                    default:
                        break;
                }
            }
        })
    }
}

let reloadHTMLObjectList = () => { reloadBase(window.htmlObjects, htmlObjectList) }
let reloadGameObjectList = () => { reloadBase(window.gameObjects, gameObjectList) }

htmlObjectList.addEventListener('contextmenu', (e) => {
    dynamicObjectDisplay(e, window.htmlObjectTypes, htmlObjectDisplay)
})

gameObjectList.addEventListener('contextmenu', (e) => {
    dynamicObjectDisplay(e, window.gameObjectTypes, gameObjectDisplay)
})

//#endregion left
//#region right
let draggingRight = false
dragBarRight.addEventListener('mousedown', () => {
    draggingRight = true
})

document.body.addEventListener('mousemove', (e) => {
    if(draggingRight) {editorRight.style.width = `calc(100vw - ${e.screenX}px)`}
})

document.body.addEventListener('mouseup', (e) => {
    draggingRight = false
})

hideButtonRight.addEventListener('click', () => {
    if(hideButtonRight.innerText == ">"){
        editorRight.style.minWidth = 0
        editorRight.style.width = 0
        hideButtonRight.innerText = "<"
    }
    else{
        editorRight.style.minWidth = `250px`
        editorRight.style.width = `250px`
        hideButtonRight.innerText = ">"
    }
})

//#endregion

let dynamicFieldCreator = (type, name, value, element) => {
    let holder = document.createElement('div')
    switch (type) {
        case 'Vector2':
            for (let i = 0; i < value.length; i++) {
                let label = document.createElement('label')
                label.innerText = `${name} ${i ? 'y' : 'x'}: `
                holder.appendChild(label)
                let input = document.createElement('input')
                input.type = 'number'
                input.value = parseInt(value[i])
                input.addEventListener('input', () => {
                    element[name][i ? 'y' : 'x'] = `${input.value}`
                })
                holder.appendChild(input)
                let text = document.createElement('label')
                text.innerText = 'px'
                holder.appendChild(text)
                holder.appendChild(document.createElement('br'))
            }
            break;
        case 'Boolean':
            let label = document.createElement('label')
            label.innerText = `${name}`
            holder.appendChild(label)
            let input = document.createElement('input')
            input.type = 'checkbox'
            input.checked = value
            input.addEventListener('input', () => {
                element[name] = input.checked
            })
            holder.appendChild(input)
            break;
        default:
            break;
    }
    inspector.appendChild(holder)
}

let dynamicObjectDisplay = (e, list, htmlObject) => {
    e.preventDefault()
    htmlObject.style.display = "block"
    htmlObject.style.left = `${e.clientX - 7.5}px`
    htmlObject.style.top = `${e.clientY - 7.5}px`
    htmlObject.addEventListener('mouseleave', () => {
        htmlObject.style.display = "none"
    })
    htmlObject.innerHTML = ''
    for (let i = 0; i < list.length; i++) {
        let li = document.createElement('li')
        let button = document.createElement('button')
        button.innerText = list[i]
        li.appendChild(button)
        htmlObject.appendChild(li)
    }
}