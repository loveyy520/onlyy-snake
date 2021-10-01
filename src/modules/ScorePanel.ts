export default class ScorePanel {
    lastLevelScore = 0
    score = 0
    level = 1
    scoreEle: HTMLElement
    levelEle: HTMLElement
    maxLevel: number
    upScore: number
    constructor(maxLevel: number = 10, upScore: number = 2) {
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
        this.maxLevel = maxLevel
        this.upScore = upScore
    }

    // 加分
    addScore(delta_score: number = 1) {
        this.score += delta_score
        this.scoreEle.innerHTML = this.score + ''
        // 判断分数升级
        if (this.score - this.lastLevelScore > this.upScore) {
            this.levelUp()
            this.lastLevelScore = this.score
            this.upScore += 3 * this.level
        }
    }

    // 升级
    levelUp() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + ''
        }
    }
}