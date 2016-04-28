$(document).ready(function () {
  if (!placeholderIsSupported()) {
    $('[placeholder]').each(function () {
      $(this).after('<label class="placeholder" for="' + $(this).attr('id') + '" style="width:' + $(this).outerWidth() + 'px; margin-left:-' + $(this).outerWidth() + 'px">' + $(this).attr('placeholder') + '</label>');
      $(this).focus(function () {
        $(this).siblings('.placeholder').hide();
      }).blur(function () {
        if ($(this).val() !== '') {
          return;
        }
        $(this).siblings('.placeholder').show();
      });
    });
  }

  function placeholderIsSupported() {
    var test = document.createElement('input');
    return ('placeholder' in test);
  }
});
