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