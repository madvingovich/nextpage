$(document).ready(function() {
    
    let footerItems = $('footer > *'),
        form = $('footer form');
    
    $('.contact-handle').on('click', function() {
        $('html,body').animate({
            scrollTop: 0
        }, 200)
    });
    //hide footer items and show form
    $('.btn-dark').on('click', function() {
        if(this.className.match(/disabled/)) return;

        footerItems.addClass('hidden');
        form.addClass('form-active');
    });
    //backward
    $('.form-close').on('click', function() {
        footerItems.removeClass('hidden');
        form.removeClass('form-active');
    });

    validateInput('footer input[type=email]', /\w+@\w+\.\w+/gi);

    validateInput('footer .input-name', /^[A-Za-z ?]+$/gi);

    validateInput('footer input[type=tel]', /^\+?\d+$/gi);

    function validateInput(selector, regexp) {
        $(selector).on('blur', function() {
            if(this.value.length === 0) return;

            if(!this.value.match(regexp)) {
                $(this.parentNode).addClass('error');
            }

        }).on('focus', function() {
            $(this.parentNode).removeClass('error');
        });
    }
});