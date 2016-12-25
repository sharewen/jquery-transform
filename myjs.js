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
    var autoInterVal=3000;//��ʱ�����ʱ��
    //����ʱ�ų�ʼ��
    function init(){
        $left=$('.left'),
        $right=$('.right'),
        $play=$('.play'),
        $imglist=$('.box ul li')
        configer();
        setEvent();//���¼�
    }
    //���ó�ʼ��ת�Ƕ�
    function configer(){
        var ang=4,aint=-4;
        //����ͼƬ��ת�����ĵ�
        $imglist.transform({origin:origin});
        $imglist.each(function(i){
            var $this=$(this);
            $this.transform({rotate:aint+i*ang+'deg'});
        })
    }
    //���¼�
    function setEvent(){
        $left.bind('click',function(){
            anigo(-1);//�����ƶ�
            return false;//�൱����ֹĬ���¼��������on�¼�����˴���㲻��������
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
    //����ͼƬ
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
    //���ĸ������ƶ�
    function anigo(d){
        //���������������ٵ��ʱ���ᶯ��ֱ����ǰ���������Ž�����һ������
        if(rotating) return false;
        rotating=true;

        imgArrIndex += d;
        //��ͼƬ����ֵ����ͼƬ������1ʱ��������ֵ��Ϊ0�����ִ�ͷ��ʼ
        if(imgArrIndex>imgAll.length-1){
            imgArrIndex=0;
        }else if(imgArrIndex<0){
            imgArrIndex=imgAll.length-1;
        }
        //�������ͼƬ�ĸ�����li
        $imglist.each(function(i){
            var $thisItem=$(this);
            var $thisImg=$thisItem.children('img');//��ǰ�������е�ͼƬ
            var $targetImg=$(imgAll[imgArrIndex][i]);//��ͼƬ�������õ�ͼƬ��תΪjq����
            //�жϵ�����Ҽ�ͷ�������ͷ�����ֱ���������ת����������Ҽ�ͷ�������һ��ʱ����̣�������ͷ���Ҳ��һ��ʱ�����
            var thisTime=(d===1)?imgTime*i:imgTime*($imglist.length-1-i);
            $thisItem.append($targetImg);//����һ���ͼƬ����li��
            $thisImg.transform({origin:imgOrigin});//��ǰͼƬ����Բ�ĵ�
            //�����ťʱ����ͼƬ�����������ת�����������Ҽ�����ͼƬ��תΪ����45�ȣ�����һ��ʼͼƬҪ�ڸ�45�ȴ��
            $targetImg.transform({origin:imgOrigin,rotate:(0-d)*imgAng+'deg'});
            //����ÿ��ͼƬ��ʱ��ת
            setTimeout(function(){
                $thisImg.animate({rotate:imgAng*d+'deg'});
                $targetImg.animate({rotate:'0deg'},500,function(){
                    $thisImg.remove();//ɾ����ǰ��ͼƬ��������������ӽ�����ͼƬ��Ϊ�˱�֤��ǰֻ��һ��ͼƬ�������Ų����������Ч��������һ��li�±���2��ͼƬ��
                    //���4��ͼƬ�����궯���ˣ���ʱ�����ˣ��Ÿ���ֵΪfalse
                    if(thisTime==($imglist.length-1)*imgTime){
                        rotating=false;
                    }
                });
            },thisTime);

        });
    }
    //�Զ�����
    function autoGo(){
        clearInterval(autoTimer);
        anigo(1);//setInterval��һ�ε���ʱҲ�Ǽ��autoInterValʱ����ִ�У����Ե�����ˡ����š���ťʱ�ȵ���һ�β��ţ�����������Ŷ�����
        autoTimer=setInterval(function(){
            anigo(1);//�������Ҳ���
        },autoInterVal);
    }
    //��ͣ����
    function autoStop(){
        clearInterval(autoTimer);
    }
    return init;
})();
loopPlayInit();