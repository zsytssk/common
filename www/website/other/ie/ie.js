$(document).ready(function () {
	$('input[type=text], input[type=password]').each(function () {
		$(this).css({
			'line-height': $(this).height() + 'px'
		});
		var default_value = $(this).val();
		if(default_value) {
			$(this).val(default_value);
		} else {
			$(this).val(' ').val('');
		}
	});

});
