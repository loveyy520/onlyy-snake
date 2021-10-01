import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";


export default class Controlor {
    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel(10, 3)
        this.isGameOver = false
        this.init()
    }
    snake: Snake
    food: Food
    scorePanel: ScorePanel
    moveDirection = 0
    private moveAble: boolean = true
    private isGameOver: boolean
    private timer: NodeJS.Timeout | null = null
    init = () => {
        document.addEventListener('keydown', this.keydownHandler)
        this.food.change()
        this.run()
    }
    // 处理按键事件
    keydownHandler = (e: KeyboardEvent) => {
        e.preventDefault()
        let thisDerection: number = 0
        switch (e.key) {
            case 'w':
            case 'W':
            case 'ArrowUp':
            case 'Up':
                thisDerection = -2
                break
            case 's':
            case 'S':
            case 'ArrowDown':
            case 'Down':
                thisDerection = 2
                break
            case 'a':
            case 'A':
            case 'ArrowLeft':
            case 'Left':
                thisDerection = -1
                break
            case 'd':
            case 'D':
            case 'ArrowRight':
            case 'Right':
                thisDerection = 1
                break
            case 'Enter':
                this.moveAble = !this.moveAble
                if (this.moveAble) { this.run() }
                break
        }
        thisDerection !== 0 && thisDerection !== -this.moveDirection && (this.moveDirection = thisDerection)

    }
    // 跑起来
    run = () => {
        // 蛇死亡则游戏结束
        this.isGameOver = !this.snake.run(this.moveDirection)
        // 避免每次都赋值
        // !this.snake.run(this.moveDirection) && (this.isGameOver = false)

        // 游戏是否结束
        if (this.isGameOver) {
            this.moveAble = false

            alert(`游戏结束!\n您的得分为：${this.scorePanel.score}`)
            return clearTimeout(Number(this.timer))
        }

        if (this.ateFood()) {
            // 吃到食物，蛇变长，另一处生成食物
            this.snake.grow()
            this.scorePanel.addScore()
            this.foodComeOut()
        }
        if (this.moveAble) {
            this.timer = setTimeout(() => {

                clearTimeout(Number(this.timer))
                this.run()
            }, 300 - (this.scorePanel.level - 1) * 5);
        }

    }
    // 监测是否吃到食物
    ateFood = () => {
        return this.snake.X === this.food.X && this.snake.Y === this.food.Y
    }

    // 生成食物
    foodComeOut = () => {
        this.food.change()
        for (let i in this.snake.bodies) {
            if ((this.snake.bodies[i] as HTMLElement).offsetLeft === this.food.X && (this.snake.bodies[i] as HTMLElement).offsetTop === this.food.Y) {
                this.foodComeOut()
            }
        }
    }
}