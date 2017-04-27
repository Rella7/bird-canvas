/**
 * Created by lenovo on 2017/3/11.
 */
(function (fb) {
    function Game(option) {
        this.ctx = option.ctx;
        this.currentTime = 0;
        this.lastTime = new Date();
        this.deltaTime = 0;
        this.roles = [];
        this.hero = null;
        this.isRunning = true;
        this.srcList = ['birds', 'sky', 'land', 'pipe1', 'pipe2'];
        this.objList = FB.loadImages(this.srcList, this.init, this);
    };
    // 点击减速
    Game.prototype.initEvent = function () {
        var that = this;
        this.ctx.canvas.onclick = function () {
            that.hero.speed = -0.3;
        };
    };
    // 初始化环境
    Game.prototype.initEnv = function () {
        //蓝天
        for (var i = 0; i < 2; i++) {
            var sky = new FB.Sky({
                ctx: this.ctx,
                img: this.objList["sky"],
                x: this.objList['sky'].width * i,
                y: 0,
                speed: 3
            });
            this.roles.push(sky);
        }
        //管道
        for (var i = 0; i < 6; i++) {
            var pipe = new FB.Pipe({
                ctx: this.ctx,
                topImg: this.objList["pipe2"],
                bottomImg: this.objList["pipe1"],
                x: this.objList["pipe2"].width*3 * i + 400,
                spaceHeight: 200,
                speed: 3
            })
            this.roles.push(pipe);
        }
        //陆地
        for (var i = 0; i < 4; i++) {
            var land = new FB.Land({
                ctx: this.ctx,
                img: this.objList["land"],
                x: this.objList['land'].width * i,
                y: this.ctx.canvas.height - this.objList["land"].height,
                speed: 3
            });
            this.roles.push(land);
        }
        //小鸟
        var bird = new FB.Bird({
            ctx: this.ctx,
            img: this.objList["birds"],
            x: 100,
            y: 100,
            speed: 0
        });
        this.roles.push(bird);
        this.hero = bird;
    };
    //逐步动画
    Game.prototype.render = function () {
        var that = this;
        (function render() {
            // 清空画布
            that.ctx.clearRect(0, 0, that.ctx.canvas.width, that.ctx.canvas.height);
            // 计算相关时间
            that.currentTime = new Date();
            that.deltaTime = that.currentTime - that.lastTime;
            that.lastTime = that.currentTime;
            // 使每次画管子路径之前都清空
            that.ctx.beginPath();

            that.roles.forEach(function (v) {
                v.draw(that.deltaTime);
            });
            // 控制小鸟和上下边界的碰撞
            if (that.hero.y < 0 || that.hero.y + that.hero.perHeight > that.ctx.canvas.height - that.objList["land"].height) {
                that.isRunning = false;
            }
            // 控制小鸟和管子碰撞
            if (that.ctx.isPointInPath(that.hero.x + that.hero.perWidth, that.hero.y + that.hero.perHeight)) {
                that.isRunning = false;
            }else if (that.ctx.isPointInPath(that.hero.x, that.hero.y + that.hero.perHeight)) {
                that.isRunning = false;
            }else if (that.ctx.isPointInPath(that.hero.x, that.hero.y + that.hero.perHeight/2)) {
                that.isRunning = false;
            }
            // 调用动画
            if (that.isRunning) {
                requestAnimationFrame(render);
            }
        })();
    };
    Game.prototype.init = function () {
        this.initEnv();
        this.initEvent();
        this.render();
    }
    fb.Game = Game;
})(FB);