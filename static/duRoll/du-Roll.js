define(function(require, exports, module) {

    var $ = require('jquery');
    //var tpl = require('./du-Roll-Template.html');
    ////载入html
    //$("#myRollBox").html(tpl);

    function DuRoll(id){

        this.$pptBox = $('#'+id);


        this.$imgBox = this.$pptBox.find('.du-ImgBox');
        this.$pointBox = this.$pptBox.find('.du-PointBox');
        this.$pptBtnBox = this.$pptBox.find('.du-ArrowsBox');

        this.$lBtn = this.$pptBtnBox.find('.du-Prev');
        this.$rBtn = this.$pptBtnBox.find('.du-Next');

        this.$items = this.$imgBox.children();
        this.$points = this.$pointBox.children();

        this.settings = {     //默认参数
            arrow : true,     //是否显示左右箭头
            autoPlay : true,  //是否轮播
            event : 'click',  //事件类型
            index : 2,        //初始化第几个显示
            delay : 0,        //延迟时间
            pptSpeed : 2000,  //轮播速度
            goSpeed : 500     //单页滚动速度
        }


    }

    DuRoll.prototype.init = function(opt){
        $.extend(this.settings,opt);

        //初始化
        var len = this.$items.length;//li的个数
        var w = this.$pptBox.outerWidth();//一个li的宽度
        var showNum = this.settings.index;//当前显示的第几个
        var onOff = true;//帕金森开关
        var timer = null;//滚动轮播的计时器
        var tNum = showNum;

        var This = this;
        initItemCss(showNum,0);
        pointsCss(showNum);

        //1.判断是否自动轮播
        if(this.settings.autoPlay){
            timer = setInterval(function(){
                playFn();
            },This.settings.pptSpeed);

            This.$pptBox.on('mouseover',function(){
                clearInterval(timer);//停止自动轮播
            })
            This.$pptBox.on('mouseout',function(){
                tNum = showNum;
                timer = setInterval(function(){
                    playFn();
                },This.settings.pptSpeed);//开始自动轮播
            })
        }

        //2.判断是否显示左右箭头
        if(this.settings.arrow){
            This.$pptBox.on('mouseover',function(){
                This.$pptBtnBox.css('display','block');//显示箭头
                return false;
            })
            This.$pptBox.on('mouseout',function(){
                This.$pptBtnBox.css('display','none');;//隐藏箭头
            })
            btnInit();
        }else{
            This.$pptBtnBox.css('display','none');;//隐藏箭头
        }


        //为圆点添加事件
        pointsEvent();
        function pointsEvent(){
            //为点点添加点击事件
            for(var i=0;i<This.$points.length;i++){
                This.$points.eq(i).on(This.settings.event,function(){
                    clickFn($(this).index());
                })
            }
        }


        //调整li的css样式
        function initItemCss(num,l){
            This.$items.eq(num).css({
                display  : 'block',
                position : 'absolute',
                top      : 0,
                left     : l
            });
        }
        //point点的css样式
        function pointsCss(index){
            This.$points.removeClass('active');
            This.$points.eq(index).addClass('active');
        }


        function playFn(){
            tNum = showNum;
            tNum++;
            clickFn(tNum%len);
        }

        function btnInit(){
            //左箭头
            This.$lBtn.click(function(){
                if(onOff){
                    onOff = false;
                    tNum = showNum;
                    tNum--;
                    tNum = tNum<0?len-1:tNum;
                    goLeft(tNum);
                    pointsCss(tNum);
                }
            });
            //右箭头
            This.$rBtn.click(function(){
                if(onOff){
                    onOff = false;
                    tNum = showNum;
                    tNum++;
                    tNum = tNum>len-1?0:tNum;
                    goRight(tNum);
                    pointsCss(tNum);
                }
            })
        }


        function clickFn(cNum){//cNum是点击纪录的下标

            if(onOff){

                onOff = false;
                pointsCss(cNum);//点初始化

                if(cNum == showNum){
                    onOff = true;
                }else{
                    if(cNum > showNum){//点的下标值比当前的下标值大
                        //右
                        goRight(cNum);
                    }else{
                        //左
                        goLeft(cNum);
                    }
                }
            }
        }

        //右
        function goRight(index){
            initImgBoxCss(2*w,0);
            initItemCss(showNum,0);
            initItemCss(index,w);

            go(index,-w);
        }
        //左
        function goLeft(index){
            initImgBoxCss(2*w,-w);
            initItemCss(index,0);
            initItemCss(showNum,w);

            go(index,0);
        }

        //调整Ul的css样式
        function initImgBoxCss(w,l){
            This.$imgBox.css({
                width : w,
                left  : l
            });
        }

        //开始滚动
        function go(index,l){
            This.$imgBox.animate({
                left  : l
            }, This.settings.goSpeed,'swing', function(){
                //滚动结束后
                initImgBoxCss('','');
                This.$items.eq(showNum).css({
                    display  : 'none',
                    position : '',
                    left     : '',
                    top      : ''
                });
                This.$items.eq(index).css({
                    position : 'absolute',
                    left     : 0,
                    top      : 0
                });
                showNum = index;
                onOff = true;
            });
        }
    }

    // 对外提供接口
    module.exports = DuRoll;

})

