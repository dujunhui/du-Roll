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
            var Handlebars = require('handlebars');
            var tpl = require('./du-Roll-Template.html');
            var demoTplc = Handlebars.compile(tpl);

            //Handlebars.registerHelper('itemindex', function(items, options) {
            //
            //    for(var i=0, j=items.length; i<j; i++) {
            //        return  i;
            //    }
            //
            //});

            //json数据
            var data = require('../../rollData.json');
            $("#"+id).html( demoTplc(data));

        });
    }



    // 对外提供接口
    module.exports.dom = dom;

})

