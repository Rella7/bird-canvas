/**
 * Created by lenovo on 2017/3/11.
 */
 /*
 Èë¿Ú
 */
(function FB(win) {
    var FB = {};
    FB.loadImages = function (imglist,callback,obj) {
        var count = 0;
        var objlist = {};
        imglist.forEach(function (v) {
            var img = new Image();
            img.src = "imgs/"+v+".png";
            objlist[v]=img;
            img.onload = function () {
                count++;
                if(count===imglist.length){
                    callback.call(obj);
                }
            }
        })
        return objlist;
    };
    win.FB = FB;
})(window);