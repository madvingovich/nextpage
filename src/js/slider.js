$(document).ready(function() {
    
    let paginateItems = $('.process-nav-item'),
        processItems = $('.process-body');

    paginateItems.on('click', function() {
        changeSlide($(this).index());
    });

    $('.next').on('click', function() {
        changeSlide('next')
    });

    $('.prev').on('click', function() {
        changeSlide('prev')
    })

    //indicator === number || 'next' || 'prev'
    function changeSlide(indicator) {
        let activePaginateItem = $('.process-nav-item-active'),
            activeProcessItem = $('.process-body-active');

        if(typeof indicator === 'string') {

            let index = activePaginateItem.index();

            if(indicator === 'next') {
                indicator = index === paginateItems.length - 1 ? 0 : index + 1;
            }
            else if(indicator === 'prev')
            {
                indicator = index === 0 ? paginateItems.length - 1 : index - 1;
            }
            else {
                throw new Error('Indicator value must be number, \'next\' or \'prev\'')
            }

        }

        if(activePaginateItem.index() === indicator) return;

        paginateItems.removeClass('process-nav-item-active');
        $(paginateItems[indicator]).addClass('process-nav-item-active');

        processItems.removeClass('process-body-active');
        activeProcessItem.addClass('process-body-hidden');
        setTimeout(function() {
            activeProcessItem.removeClass('process-body-hidden');
            $(processItems[indicator]).addClass('process-body-active');
        },200)
    }
});