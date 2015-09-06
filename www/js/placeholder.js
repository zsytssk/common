$(document).ready(function() {
	// 原理 有placeholder这个属性的后面再加上一个label, 再把label设置为与input 同宽, margin-left定位到input里面
	// 还要配合样式的修改
	$('[placeholder]').each(function() {
		$(this).after('<label class="placeholder" for="' + $(this).attr('id') + '" style="width:' + $(this).outerWidth() + 'px; margin-left:-' + $(this).outerWidth() + 'px">' + $(this).attr('placeholder') + '</label>');
		$(this).focus(function() {
			$(this).siblings('.placeholder').hide();
		}).blur(function() {
			if ($(this).val() !== '') {
				return;
			}
			$(this).siblings('.placeholder').show();
		});
	});
});

// 样式
// .placeholder {
// 	color: #aaa !important;
// 	display: inline-block;
// 	vertical-align: middle;
// 	text-indent: 6px;
// }