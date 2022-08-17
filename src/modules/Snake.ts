class Snake {
  head: HTMLElement;
  bodies: HTMLCollection;
  element: HTMLElement;
  constructor() {
    this.head = document.querySelector(".snake > div")! as HTMLElement;
    this.bodies = document
      .getElementsByClassName("snake")[0]
      .getElementsByTagName("div");
    this.element = document.querySelector(".snake")!;
  }

  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }
  set X(value: number) {
    //相同不更改
    if (this.X === value) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了！！！");
    }
    //蛇移动方向不能与按键相反
    if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetLeft === value){
        //如果发生了掉头,让蛇向反方向继续移动
        if(value>this.X){
            //value大于X.则说明蛇在向右走,此时发生掉头,应该是蛇继续想坐走
            value = this.X - 10
        }else{
            value = this.X + 10
        }
    }
    //移动
    this.moveBody();

    //判断X的合法值0-290之间
    this.head.style.left = value + "px";
    //检查是否撞到自己
    this.checkHeadBody()
  }
  set Y(value: number) {
    if (this.Y === value) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了！！！");
    }
    if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetTop === value){
        //如果发生了掉头,让蛇向反方向继续移动
        if(value>this.Y){
            //value大于X.则说明蛇在向右走,此时发生掉头,应该是蛇继续想坐走
            value = this.Y - 10
        }else{
            value = this.Y + 10
        }
    }
    //移动
    this.moveBody();

    this.head.style.top = value + "px";
    
    this.checkHeadBody()
  }
  //增加身体的方法
  addBody() {
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }
  //移动身体
  moveBody() {
    //将后边的位置为前边的位置
    //第二节 = 第一节 以此类推
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      //将这个值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = `${X}px`;
      (this.bodies[i] as HTMLElement).style.top = `${Y}px`;
    }
  }
  checkHeadBody(){
    //获取所有的身体,检查其是否和蛇头坐标发生重叠
    for(let i =1;i<this.bodies.length;i++){
        if(this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y === (this.bodies[i] as HTMLElement).offsetTop){
            throw new Error('撞到自己了！！！')
        }
    }
  }
}
export default Snake;
