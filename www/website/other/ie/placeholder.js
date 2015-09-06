// 原理 有placeholder这个属性的后面再加上一个label, 再把label设置为与input 同宽, margin-left定位到input里面
// 还要配合样式的修改
// <!--[if lte IE 9 ]>
// 	<script src="other/ie/placeholder.js"></script>
// <![endif]-->

//.placeholder {
//	color: #aaa !important;
//	display: inline-block;
//	vertical-align: middle;
//	cursor: text;
// }

$(document).ready(function() {
	$('[placeholder]').each(function() {
		$(this).after('<label class="placeholder" for="' + $(this).attr('id') + '" style="width:' + $(this).outerWidth() + 'px; height:' + $(this).outerHeight() + 'px; line-height:' + $(this).outerHeight() + 'px; margin-left:-' + $(this).outerWidth() + 'px; text-indent: ' + $(this).css('padding-left') + ';">' + $(this).attr('placeholder') + '</label>');
		if ($(this).val()) {
			$(this).siblings('.placeholder').hide();
		}
	});
	$('[placeholder]').focus(function() {
		$(this).siblings('.placeholder').hide();
	}).blur(function() {
		if ($(this).val() !== '') return;
		$(this).siblings('.placeholder').show();
	})

	$(document).on('click', '.placeholder', function() {
		$(this).prev('[placeholder]').focus();
	});
});

