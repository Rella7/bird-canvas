/**
 * Created by lenovo on 2017/3/11.
 */
/*
 绘制管子
 */
(function (fb) {
    function Pipe(option) {
        this.ctx = option.ctx;
        this.topImg = option.topImg;
        this.bottomImg = option.bottomImg;
        this.topY = 0;
        this.bottomY = 0;
        this.x = option.x;
        this.spaceHeight = option.spaceHeight;
        this.speed = option.speed;
        //管子的y坐标
        this.initHeight();
    }
    // 绘制管子
    Pipe.prototype.draw = function () {
        this.x -= this.speed;
        if (this.x <= -this.topImg.width){
            this.x += this.topImg.width*3*6;
        }
        this.ctx.drawImage(this.topImg,this.x,this.topY);
        this.ctx.drawImage(this.bottomImg,this.x,this.bottomY);
        // 画碰撞路径
        this.initPath();
    };
    // 计算管子的y坐标
    Pipe.prototype.initHeight = function () {
        this.topY = -(Math.random()*80+260);
        this.bottomY = (this.topY+this.topImg.height+this.spaceHeight);
    };
    // 绘制管子路径
    Pipe.prototype.initPath = function () {
        this.ctx.rect(this.x,this.topY,this.topImg.width,this.bottomImg.height);
        this.ctx.rect(this.x,this.bottomY,this.bottomImg.width,this.bottomImg.height);
    };
    FB.Pipe = Pipe;
})(FB);