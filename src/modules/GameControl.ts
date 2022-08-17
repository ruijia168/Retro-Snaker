import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";
class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  //创建一个属性来存储蛇的移动方向
  direction: string = "";
  //创建一个属性记录游戏是否结束
  isLive = true

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(10,2);
    this.init();
  }
  //游戏的初始化方法,调用后游戏即开始
  init() {
    //绑定键盘按键按下的事件
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    //调用run方法
    this.run()
  }
  //创建键盘按下的响应函数
  keydownHandler(e: KeyboardEvent) {
    //需要检查按键是否合法

    //修改direction
    this.direction = e.key;
  }
  run() {
    //根据方向来让蛇的位置改变
    let X = this.snake.X;
    let Y = this.snake.Y;
    //根据按键修改X和Y
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 10;
        break;
      case "Down":
      case "ArrowDown":
        Y += 10;
        break;
      case "Left":
      case "ArrowLeft":
        X -= 10;
        break;
      case "Right":
      case "ArrowRight":
        X += 10;
        break;
    }
    //吃到没有
   this.checkEat(X,Y)
       
    
    //修改蛇的X,Y
    try {
        this.snake.X = X;
        this.snake.Y = Y
    } catch (err:any) {
        alert(err.message)
        this.isLive = false
    }
    
    //开启一个定时调用
    this.isLive && setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30)
  }
  //定义一个方法，用来检查蛇吃东西
  checkEat(X:number,Y:number){
     if(X=== this.food.X && Y === this.food.Y){
         //食物位置重置
         this.food.change()
         //分数增加
         this.scorePanel.addScore()
         //蛇增加一节
         this.snake.addBody()
     }
  }
}

export default GameControl;
