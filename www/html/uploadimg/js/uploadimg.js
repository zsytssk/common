$(document).ready(function () {
	$('.uploadimg-box .bg').on('click', function (event) {
		$(this).parent().find('input').click();
	});
	$('.uploadimg-box .delete').on('click', function (event) {
		initUploadBox($(this).parent());
	});
	$('.uploadimg-box input[type=file]').on('change', function (event) {
		var $box = $(this).parent();
		var $input = $(this);
		var $img = $(this).siblings('img');
		var oPreviewImg = null,
			oFReader = new window.FileReader(),
			rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

		oFReader.onloadstart = function (e) {
			$box.addClass('uploading');
		};
		oFReader.onerror = function (evt) {
			initUploadBox($box);
			switch(evt.target.error.code) {
			case evt.target.error.NOT_FOUND_ERR:
				alert('File Not Found!');
				break;
			case evt.target.error.NOT_READABLE_ERR:
				alert('File is not readable');
				break;
			case evt.target.error.ABORT_ERR:
				break; // noop
			default:
				alert('An error occurred reading this file.');
			}
		};
		oFReader.onload = function (oFREvent) {
			console.log(oFREvent.target.result);
			$img.attr('src', oFREvent.target.result);
			$box.addClass('uploaded').removeClass('uploading');
		};

		var aFiles = $input[0].files;
		if(aFiles.length === 0) {
			return;
		}
		if(!rFilter.test(aFiles[0].type)) {
			alert('You must select a valid image file!');
			return;
		}
		oFReader.readAsDataURL(aFiles[0]);
	});

	function initUploadBox(obj) {
		$(obj).removeClass('uploading, uploaded');
		$(obj).find('img').attr('src', '');
	}
});
