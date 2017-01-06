/*
    加载依赖的css文件
    加载html模板页
    加载json数据文件
    根据json数据渲染dom
 */
define(function(require, exports, module) {
    //依赖jquery
    var $ = require('jquery');

    function dom(id){
        //css
        seajs.use('./static/duRoll/du-Roll.css',function(){
            //html模板
            var tpl = require('./du-Roll-Template.html');
            $("#"+id).html(tpl);
            //json数据
            var data = require('../../rollData.json');
            console.log(data);

            applyDom(id,data);
        });
    }

    function applyDom(id,data){
        //根据json数据渲染dom
        var len = data.count;
        var items = data.items;
        var $imgBox = $('#'+id).find('.du-ImgBox');
        var $pointBox = $('#'+id).find('.du-PointBox');
        for(var i=0;i<len;i++){
            $imgBox.append('<li><a href="'+ items[i].href +'"><img src="'+ items[i].src +'" alt="'+ items[i].alt +'"/></a></li>');
            $pointBox.append('<li><a href="javascript:;">'+ (i+1) +'</a></li>')
        }
    }

    // 对外提供接口
    module.exports.dom = dom;

})

