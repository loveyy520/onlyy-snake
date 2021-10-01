export default class Food {

    constructor(foodNum: number = 0) {
        // this.stage 
        // this.stage.innerHTML += `<div class="food food${foodNum}"><div></div><div></div><div></div><div></div></div>`
        // this.element = document.querySelector(`.food${foodNum}`)!

        // this.element.style.top = this.top + 'px'
        // this.element.style.left = this.left + 'px'
        this.element = document.querySelector('.food')!

    }
    // 食物对应的元素
    element: HTMLElement
    // private stage: HTMLElement = document.querySelector(".stage")!
    // private top = Math.round(Math.random() * 29) * 10
    // private left = Math.round(Math.random() * 29) * 10

    get X() {
        return this.element.offsetLeft
    }

    get Y() {
        return this.element.offsetTop
    }

    set X(val: number) {
        this.element.style.left = val + 'px'
    }

    set Y(val: number) {
        this.element.style.top = val + 'px'
    }

    change = () => {
        let top = Math.round(Math.random() * 29) * 10,
            left = Math.round(Math.random() * 29) * 10

        this.X = left
        this.Y = top
    }
}
