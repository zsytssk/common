$(document).ready(function() {
	$('input[type=text], input[type=password]').each(function() {
		$(this).css({
			'line-height': $(this).height() + "px"
		});
		var default_value = $(this).val();
		if (default_value) {
			$(this).val(default_value);
		} else {
			$(this).val(' ').val('');
		}
	});

	// ie6
	if($("html").is(".ie6")) {
		$('<em style="zoom: 1;"></em>').insertBefore('img');
		DD_belatedPNG.fix('')
		$("").addClass('inp');
	}
});