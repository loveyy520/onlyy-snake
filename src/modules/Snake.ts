export default class Snake {
    element: HTMLElement
    head: HTMLElement
    bodies: HTMLCollection
    isLive = true
    constructor() {
        this.head = document.querySelector("#snake>div")!
        this.element = document.getElementById("snake")!
        // 这样返回的是HTMLcollection,如用queryselectorAll则返回的是nodeList
        this.bodies = this.element.getElementsByTagName("div")
        // this.bodies = document.querySelectorAll("#snake>div")
    }

    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }

    set X(value: number) {
        if (this.X === value) { return }

        this.head.style.left = value + 'px'
    }
    set Y(value: number) {
        if (this.Y === value) { return }
        this.head.style.top = value + 'px'
    }

    grow = () => {
        let X = (this.bodies[this.bodies.length - 1] as HTMLElement).offsetLeft,
            Y = (this.bodies[this.bodies.length - 1] as HTMLElement).offsetTop,
            str_ele = `<div style="left:${X}px;top:${Y}px"></div>`
        this.element.insertAdjacentHTML("beforeend", str_ele)
    }

    run = (moveDirection: number) => {

        // 根据移动方向检测是否要撞墙
        this.isInStage(moveDirection)



        // 身体先移动
        this.moveBody()

        // 头部移动
        if (this.isLive) {
            switch (moveDirection) {
                // -2上，2下，-1左，1右
                case -2:
                    this.isLive && (this.Y -= 10)
                    break
                case 2:
                    this.isLive && (this.Y += 10)
                    break
                case -1:
                    this.isLive && (this.X -= 10)
                    break
                case 1:
                    this.isLive && (this.X += 10)
                    break
            }
        }

        // 检测是否撞到自己
        this.isKnockSelf()

        // 返回蛇的状态，以判断游戏是否结束
        return this.isLive
    }

    // 身体移动
    moveBody = () => {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            (this.bodies[i] as HTMLElement).style.left = (this.bodies[i - 1] as HTMLElement).offsetLeft + 'px';
            (this.bodies[i] as HTMLElement).style.top = (this.bodies[i - 1] as HTMLElement).offsetTop + 'px'
        }
    }

    // 是否在舞台范围内,触碰边界则蛇死亡
    isInStage = (derection: number) => {

        switch (derection) {
            case -2:
                this.isLive = this.Y > 0
                break
            case 2:
                this.isLive = this.Y < 290
                break
            case -1:
                this.isLive = this.X > 0
                break
            case 1:
                this.isLive = this.X < 290
                break
            default:
                this.isLive = true
                break
        }
        // return this.X>=0 && this.X<=290 && this.Y>0 && this.Y<=290
    }

    // 是否撞到自己
    isKnockSelf = () => {
        for (let i = 1; i < this.bodies.length; i++) {
            if (this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y === (this.bodies[i] as HTMLElement).offsetTop) {
                this.isLive = false
            }
        }
    }

}