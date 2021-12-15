jslottery
=========

[![npm](https://img.shields.io/npm/v/jslottery.svg?style=flat-square)](https://www.npmjs.com/package/jslottery)

实现效果

![](./docs/jslottery.gif)

example

`react` `normal`

## Usage

### npm 安装

```
$ npm install jslottery
```

### 示例

#### HTML

```html
<div class="machine">
	<table class="machine-table">
	      <tbody>
	      <tr>
	       <td class="prize-cell" data-id="1" ></td>
	       <td class="prize-cell" data-id="2" ></td>
	       <td class="prize-cell" data-id="3" ></td>
	       <td class="prize-cell" data-id="4" ></td>
	      </tr>
	      <tr>
	       <td class="prize-cell" data-id="12" ></td>	        			        	
	       <td class="machine-control-cell" colspan="2" rowspan="2">
	       <div class="machine-control" onclick="ClickMe(event)">
	       <span>抽奖</span>
	       </div>
	       </td>	        			 	        			
	       <td class="prize-cell" data-id="5" ></td>      			
	       </tr>
	      <tr>
	       <td class="prize-cell" data-id="11" ></td>
	       <td class="prize-cell" data-id="6" ></td>
	      </tr>
	      <tr>
	       <td class="prize-cell" data-id="10"></td>
	       <td class="prize-cell" data-id="9" ></td>
	       <td class="prize-cell" data-id="8" ></td>
	       <td class="prize-cell" data-id="7" ></td>
	      </tr>
	      </tbody>
	</table>
</div>
```

#### CSS

```css
.machine{
	margin: 0px auto;
	width:280px;
}
.prize-cell{
	background-color: #cb1573;
	width: 64px;
	height: 66px;
	position: relative;
}
.prize-cell.active{
	background-color: #ffff7e;
}
.prize-cell::after{
	background:rgba(0,0,0,0.2) none repeat scroll 0% 0%;
	content: "";
	bottom: 0px;
	left: 0;
	right: 0;
	height: 5px;
	position: absolute;
}
.machine-control-cell{			
	background-color: #278EF2;
}
.machine-control{
	width: 92px;
	height: 96px;
	position: absolute;
	margin: -44px 0px 0px 20px;
	border-radius: 42%;
	border: 1px solid #ff0;
	cursor: pointer;
}
.machine-control span{
	font-size: 30px;
	float: left;
	margin: 28px 0px 0px 16px;
}
```

#### JavaScript

``` javascript
'use strict'

let Jslottery = require('jslottery')


var lottery = Jslottery({
		scrollDom:'prize-cell',
		scrollId:'data-id',		
		startPosition:1,
		callback:function(type,data){
			if(type==1){
				//开始滚动
				console.log("开始")
			}

			if(type==2){
				//滚动完成
				console.log("结束")
			}

			if(type==0){
				//出现错误
				console.log("错误")
			}

			if(type==3){
				//滚动每一个格子
				console.log(data)
			}
        }
	});

function ClickMe(){
	lottery.options.stopPosition=Math.floor(Math.random()*1+11);		
	lottery.options.speed=Math.floor(Math.random()*200+300);
	lottery.options.speedUpPosition=Math.floor(Math.random()*6+1);
	lottery.options.speedDownPosition=Math.floor(Math.random()*6+1);
	lottery.options.speedUp=Math.floor(Math.random()*30+20);
	lottery.options.speedDown=Math.floor(Math.random()*100+600);
	lottery.options.totalCircle=Math.floor(Math.random()*2+5);
	lottery.start();
}

```
## 参数说明
```	javascript
let domNumber,                      //dom个数
    Lottery,                        //全局的Lottery对象                     
    LotteryTimeout = false,         //当前滚动定时器
    LotteryCircle = 0,              //当前滚动圈数
    LotteryCircleStep = 0,          //当前滚动总步数
    LotteryFinish = false,          //判断是否滚动完成
    LotteryInitSpeed = null,        //记录正常的滚动速度
    LotteryError = false,           //错误标识
    LotteryStarted = false;         //开始滚动

var options = {
        scrollDom:null,                         //滚动显示的dom  这里是使用class名称
        startPosition:1,                        //开始位置
        stopPosition:2,                         //停止位置
        totalCircle:2,                          //滚动的圈数
        speed:400,                              //正常速度  （这里的速度就是定时器的时间间隔，间隔越短，速度越快）
        speedUp:100,                            //加速的时候速度
        speedDown:600,                          //减速的时候速度
        speedUpPosition:3,                      //加速点 （这里会和滚动的总步数进行比较 理论上总步数 = 总长度 * 总圈数 + stopPosition - startPosition +1 ）
        speedDownPosition:5,                    //减速点
        scrollId:null,                          //滚动的dom上的属性号，是用来标记滚动结束获得的id号对应的奖项
        callback:function(type){}               /**
                                                 *	滚动回调函数   
												 *	回调类型		 
												 					type==1 : 开始滚动 
                                                                 	type==2 : 停止滚动
                                                                	type==0 : 出现错误
                                                                	type==3 : 滚动每个格子的回调
												 *	回调内容      	
												 					data = {}
                                                 */
                                                
    };
```

## 如何开发编译源码

`jslottery`的是通过`webpack`进行打包的

`example`是使用`parcel`进行构建的

```bash
#克隆
git clone https://github.com/Topthinking/Jslottery.git

#依赖
cd Jslottery
npm install

#测试用例
cd example/normal
npm run dev
```

打开浏览器访问 `localhost:3000`

