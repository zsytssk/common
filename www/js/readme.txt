## zu.js  
尝试自己写一个类似zepto的js  
api  
-> on  
-> find  
-> eq  
-> find  
-> addClass  
-> closest  
-> removeClass  
-> on  
-> trigger  

-? 触发的的事件无法冒泡  
-> 自定义事件无法触发 on(event, selector, callback)  
-> 因为在on中作的是event.target 在不在selector下面  
-> 我现在暂时放在 event 的detail上面, 在on里面判断 event detail  


# placeholder.js  
-| 原理 有placeholder这个属性的后面再加上一个label,  
-> 再把label设置为与input 同宽 margin-left定位到input里面  
-> label_for == input_id  

-| 样式  
.placeholder {  
  color: #aaa !important;  
  display: inline-block;  
  vertical-align: middle;  
  text-indent: 6px;  
}  

# jquery.zsyValidate.js  
-| 可以将需要动态修改页面的元素的 做一个单独的选项 在后来的时候更新dom  
---&&---  
-| watchDom:true  
-> 页面内容会改变相应的验证也需要改变  
-> 我在插件里面写的这么多，不如给外面一个接口 让外面 触发  
-> 更具有灵活性。。。  
-| 清除原先的绑定 更新新的绑定  
-> 在当前的 this 有input textarea blur focus update valite_ele  
-> 在submit_btn点击的时候执行更新  
-> 关键什么时候更新 input blur 如果这个input不在 $input 中 当前中  
---&&---  
-> 那么 submit_btn 点击的时候呢  
-? 对比两个jqery对象  
-> 两者的length 如果不一样return false  
-> length 一样 比较里面的每一个对象 如果有一个不一样  
---&&---  
-| 这个插件能不能把验证off掉 再 on  

-| 适用: input(text, password, checkbox, radio) select  

-| demo  
-> dom  
<input type='text' required class='required' title='提示文字' pattern='正则表达式'>  
<select required data-validategroup="adressSelect" name="" id="" title="X1地址"></select>  
-> js  
$('.newAdress').zsyValidate({  
    submit_btn: '.newAdress .gm-btn2',  
    valite_ele: '[required]:visible',  
    tipFunc: function(type, msg, obj) {  
        // 每一个验证返回操作函数  
        var $tip = $(obj).siblings('.tip');  
        if (type == 'success') {  
            $(obj).data('validatevalid', true);  
            // validateGroup 用来控制 eg:多个select对应一个提示的情况  
            if ($(obj).data('validategroup')) {  
                var $list = $('[data-validategroup=' + $(obj).data('validategroup') + ']')  
                for (var i = 0; i < $list.length; i++) {  
                    if (!$list.eq(i).data('validatevalid')) {  
                        return false;  
                    }  
                }  
            }  
            $tip.slideUp(200);  
        } else {  
            $(obj).data('validateValid', false);  
            if (msg == 'empty') {  
                var tipTxt = $(obj).attr('title') + '不能为空';  
            } else {  
                var tipTxt = '请输入正确地' + $(obj).attr('title');  
            }  
            $tip.find('span').html(tipTxt);  
            $tip.slideDown(200);  
        }  
    },  
    submitFunc: function() {  
        // 验证成功执行函数  
    }  
})