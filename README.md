# du-Roll

- html
```html
    <div id="myRollBox" class="du-RollBox"></div>
```
- js
```html
    <script src="../sea-modules/sea.js"></script>
    <script src="../sea-modules/seajs-text.js"></script>
    <script src="../sea-modules/seajs-css.js"></script>
```
- show
```javascript
   seajs.config({
       alias: {
           "jquery": "jquery-seajs-1.10.1.js",
           "handlebars":"handlebars.seajs.min.js"
       }
   })

   seajs.use("./static/duRoll/du-Roll",function(ex){
       //加载css，加载json数据并渲染dom
       ex.dom('myRollBox');

       // 加载duRoll事件
       seajs.use("./static/duRoll/du-Roll-Ev",function(DuRoll){
           var roll = new DuRoll('myRollBox');
           roll.init({
               index:0,
               arrow:true,
               autoPlay:true,
               event:'click',
               pptSpeed:3000,
               goSpeed:500
           });
       })
   })
```
[demo.html](https://dujunhui.github.io/du-Roll/demo.html)

