class Food{
    //定义一个属性表示食物对应的元素
    element:HTMLElement;

    constructor(){
        // 获取页面food并且赋值给element
        this.element = document.querySelector('.food')!;
    }
    //定义一个获取食物X坐标的方法
    get X(){
        return this.element.offsetLeft
    }
    //y轴
    get Y(){
        return this.element.offsetTop
    }
    change(){
        //蛇移动一次10px
       let top =  Math.round(Math.random()*29)*10
       let left = Math.round(Math.random()*29)*10
        this.element.style.left = `${left}px`
        this.element.style.top = `${top}px`
    }
} 
export default Food