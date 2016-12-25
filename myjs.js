/**
 * Created by hxl on 2016/1/22.
 */
var loopPlayInit=(function(){
   var $left=null,$right=null,$play=null,
       $imglist=null,origin=['390px','600px']
       imgOrigin=['390px','1000px'];
    var imgAll=createImg([
        ['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg'],
        ['img/5.jpg','img/6.jpg','img/7.jpg','img/8.jpg'],
        ['img/9.jpg','img/10.jpg','img/11.jpg','img/12.jpg']
    ]);
    var imgArrIndex=0;
    var imgAng=45;
    var imgTime=300;
    var rotating=false;
    var autoTimer=null;
    var autoInterVal=3000;//定时器间隔时间
    //调用时才初始化
    function init(){
        $left=$('.left'),
        $right=$('.right'),
        $play=$('.play'),
        $imglist=$('.box ul li')
        configer();
        setEvent();//绑定事件
    }
    //设置初始旋转角度
    function configer(){
        var ang=4,aint=-4;
        //设置图片旋转的中心点
        $imglist.transform({origin:origin});
        $imglist.each(function(i){
            var $this=$(this);
            $this.transform({rotate:aint+i*ang+'deg'});
        })
    }
    //绑定事件
    function setEvent(){
        $left.bind('click',function(){
            anigo(-1);//向左移动
            return false;//相当于阻止默认事件，如果用on事件，则此代码便不起作用了
        })
        $right.bind('click',function(){
            anigo(1);
            return false;
        })
        $play.bind('click',function(){
            var play='play',pause='pause',$btn=$(this);
            if($btn.text()=='play'){
                $btn.text(pause);
                autoGo();
            }else{
                $btn.text(play);
                autoStop();
            }
            return false;
        })
    }
    //创建图片
    function createImg(arr){
        var imgArr=[];
        for(var i in arr){
            imgArr[i]=[];
            for(var x in arr[i]){
                imgArr[i][x]=new Image();
                imgArr[i][x].src=arr[i][x];
            }
        }
        return imgArr;
    }
    //向哪个方向移动
    function anigo(d){
        //当正在做动画，再点击时不会动，直到当前动画结束才进行下一个动画
        if(rotating) return false;
        rotating=true;

        imgArrIndex += d;
        //当图片索引值大于图片个数减1时，让索引值变为0，即又从头开始
        if(imgArrIndex>imgAll.length-1){
            imgArrIndex=0;
        }else if(imgArrIndex<0){
            imgArrIndex=imgAll.length-1;
        }
        //遍历存放图片的父盒子li
        $imglist.each(function(i){
            var $thisItem=$(this);
            var $thisImg=$thisItem.children('img');//当前下面所有的图片
            var $targetImg=$(imgAll[imgArrIndex][i]);//从图片数组中拿到图片并转为jq对象
            //判断点击是右箭头还是左箭头，并分别设置其旋转间隔，如点击右箭头则左面第一张时间最短，点击左箭头则右侧第一张时间最短
            var thisTime=(d===1)?imgTime*i:imgTime*($imglist.length-1-i);
            $thisItem.append($targetImg);//把下一组的图片放入li中
            $thisImg.transform({origin:imgOrigin});//当前图片设置圆心点
            //点击按钮时设置图片从左面或右面转出来，如点击右键，则图片旋转为正角45度，所以一开始图片要在负45度存放
            $targetImg.transform({origin:imgOrigin,rotate:(0-d)*imgAng+'deg'});
            //设置每个图片延时旋转
            setTimeout(function(){
                $thisImg.animate({rotate:imgAng*d+'deg'});
                $targetImg.animate({rotate:'0deg'},500,function(){
                    $thisImg.remove();//删除当前的图片，即留下了新添加进来的图片，为了保证当前只有一个图片，这样才不会出现闪动效果，否则一个li下便有2张图片了
                    //如果4张图片都做完动画了，延时结束了，才给赋值为false
                    if(thisTime==($imglist.length-1)*imgTime){
                        rotating=false;
                    }
                });
            },thisTime);

        });
    }
    //自动播放
    function autoGo(){
        clearInterval(autoTimer);
        anigo(1);//setInterval第一次调用时也是间隔autoInterVal时间后才执行，所以当点击了‘播放’按钮时先调用一次播放，便可立即播放动画了
        autoTimer=setInterval(function(){
            anigo(1);//从左向右播放
        },autoInterVal);
    }
    //暂停播放
    function autoStop(){
        clearInterval(autoTimer);
    }
    return init;
})();
loopPlayInit();