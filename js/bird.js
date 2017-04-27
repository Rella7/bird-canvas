/**
 * Created by lenovo on 2017/3/11.
 */
/*
 小鸟的绘制
 */
(function (fb) {
    function Bird(option) {
        this.ctx = option.ctx;
        this.img = option.img;
        this.x = option.x;
        this.y = option.y;
        this.perWidth = this.img.width / 3;
        this.perHeight = this.img.height;
        this.speed = option.speed;
        this.acc = 0.0005;
        this.maxSpeed = 1;
        this.maxAngle = Math.PI / 4;
        this.index = 0;
    };
    Bird.prototype.draw = function (deltaTime) {
        // 小鸟移动的距离h
        var deltaY = this.speed * deltaTime + this.acc * deltaTime * deltaTime / 2;
        // 小鸟速度
        this.speed += this.acc * deltaTime;
        // 旋转之前保存状态
        this.ctx.save();
        // 移动到中心点
        this.ctx.translate(this.x + this.perWidth / 2, this.y + this.perHeight / 2);
        // 旋转
        var currentAngle = this.speed / this.maxSpeed * this.maxAngle;
        this.ctx.rotate(currentAngle);
        if (currentAngle == this.maxAngle) {
            currentAngle = this.maxAngle;
        }
        ;
        // 绘制小鸟图片
        this.y += deltaY;
        this.ctx.drawImage(this.img, this.perWidth * this.index, 0, this.perWidth, this.perHeight, -this.perWidth / 2, -this.perHeight / 2, this.perWidth, this.perHeight);
        this.index++;
        this.index = this.index % 3;
        // 释放保存状态
        this.ctx.restore();
    }
    fb.Bird = Bird;
})(FB);