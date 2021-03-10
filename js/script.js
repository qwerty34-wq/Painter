var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d")

var pencilBtn = document.getElementById("pencilBtn")
var rubberBtn = document.getElementById("rubberBtn")
var beanBtn = document.getElementById("beanBtn")

var spanCoords = document.getElementById("spanCoords")

var btnMinus = document.getElementById("btnMinus")
var btnPlus = document.getElementById("btnPlus")
var numField = document.getElementById("numField")

var colorElements = document.querySelectorAll(".item")

var lineRubber = 20
var strokeRubber = "white"

var lineWidth = 1
var strokeStyle = "black"
var lineJoin = "round"

var paint = false
var coord = {x: 0, y: 0}

var width = 0
var height = 0

var isRubberUsed = false


function canvasWH() {
    if(width == window.innerWidth && height ==  window.innerHeight) return

    context.canvas.width = window.innerWidth
    width = window.innerWidth
    context.canvas.height = window.innerHeight
    height = window.innerHeight

    setPencilColor(strokeStyle)
    setLineWidth(lineWidth)
}

canvasWH()

function draw() {
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.lineJoin = lineJoin;
    pencilBtn.style.border = "4px solid rgb(197, 197, 197)"
}

function getCoords(e) {
    
    var x, y;

    x = e.layerX;
    y = e.layerY;

    return { x: x, y: y };
}

window.onload = () => {
    draw()
}

canvas.onmousedown = (e) => {
    canvasWH()

    paint = true
    context.beginPath()
    context.moveTo(getCoords(e).x, getCoords(e).y)
} 

canvas.onmousemove = (e) => {
    spanCoords.innerText = `X: ${e.layerX}  Y: ${e.layerY}`

    if(!paint) return

    context.lineTo(getCoords(e).x, getCoords(e).y)
    context.stroke()
    context.restore()
}

canvas.onmouseup = () => {
    paint = false
}


function clearControlBtnBorder() {
    pencilBtn.style.border = ""
    rubberBtn.style.border = ""
}

function setPencil() {
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    pencilBtn.style.border = "4px solid rgb(197, 197, 197)"
    btnsPlusMinusDisable(false)
    isRubberUsed = false
}

pencilBtn.onclick = function(){
    clearControlBtnBorder()
    setPencil()
}

function btnsPlusMinusDisable(bool) {
    btnMinus.disabled = bool
    btnPlus.disabled = bool
}

rubberBtn.onclick = function(){
    clearControlBtnBorder()
    context.lineWidth = lineRubber;
    context.strokeStyle = strokeRubber;
    this.style.border = "4px solid rgb(197, 197, 197)"
    btnsPlusMinusDisable(true)
    isRubberUsed = true
}

beanBtn.onclick = () => {
    context.canvas.width = window.innerWidth
    width = window.innerWidth
    context.canvas.height = window.innerHeight
    height = window.innerHeight

    setPencilColor(strokeStyle)
    setLineWidth(lineWidth)
    clearControlBtnBorder()
    setPencil()
}

function checkNumFieldValue(str) {
    if (str === "+") {
        if (+numField.value == 50) {
            return false
        }
    }
    else{
        if (+numField.value == 1) {
            return false
        }
    }

    return true
}

function setLineWidth(n) {
    lineWidth = n
    context.lineWidth = lineWidth;
}


btnPlus.onclick = () => {
    if(!checkNumFieldValue("+")) return

    let value = +numField.value
    value += 1
    numField.value = value

    setLineWidth(value)
}

btnMinus.onclick = () => {
    if(!checkNumFieldValue("-")) return

    let value = +numField.value
    value -= 1
    numField.value = value

    setLineWidth(value)
}

var clearAll = function() {
    colorElements.forEach(elem => {
        elem.style.border = "1px solid black"
    })
}


function setPencilColor(color) {
    strokeStyle = color
    context.strokeStyle = strokeStyle;
}


colorElements.forEach(element => {
    element.addEventListener('click', function() {

        if(isRubberUsed) return

        clearAll()

        this.style.border = "4px solid rgb(197, 197, 197)"
        
        let color = this.id.split("-")[1]
        
        setPencilColor(color)

    })
})