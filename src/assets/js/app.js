$(document).ready(function () {
    console.log("Jquery is work")

    /* Spiral animation */
    // Detect request animation frame
    var scroll = window.requestAnimationFrame ||
        // IE Fallback
        function (callback) { window.setTimeout(callback, 1000 / 60) };
    var elementsToShow = document.querySelectorAll('.spiral');

    function loop() {

        Array.prototype.forEach.call(elementsToShow, function (element) {
            if (isElementInViewport(element)) {
                element.classList.add('start');
            } else {
                // element.classList.remove('start');
            }
        });

        scroll(loop);
    }

    // Call the loop for the first time
    loop();

    // Helper function from: http://stackoverflow.com/a/7557433/274826
    function isElementInViewport(el) {
        // special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        var rect = el.getBoundingClientRect();
        return (
            (rect.top <= 0
                && rect.bottom >= 0)
            ||
            (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.top <= (window.innerHeight || document.documentElement.clientHeight))
            ||
            (rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
        );
    }

    /* Libs usign */

    // Bootstrap toast using
    $('#top-toast').toast();
    

    // Slick-slider using
    $('.top-carousel').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
    });

    $('.news-carousel').slick({
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4
    });

    $('#residence-carousel').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        nextArrow: $('.residence-carousel-arrow--next'),
        prevArrow:  $('.residence-carousel-arrow--next')
    });

    $('.team-leadership__carousel').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        nextArrow: $('.team-carousel-arrow--next'),
        prevArrow:  $('.team-carousel-arrow--prev')
      });
          

    // Layzy load using
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();

    // Countdown using
    // countDownFunc($('.countdown'));
});






















/**
 * downCount: Simple Countdown clock with offset
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

function countDownFunc(items, trigger) {
    items.each(function () {
        var countDown = $(this),
            dateTime = $(this).data('date-time');

        var countDownTrigger = (trigger) ? trigger : countDown;
        countDownTrigger.downCount({
            date: dateTime,
            offset: +5
        }, function () {
            document.getElementById('discount-button').setAttribute("disabled", "disabled");
            alert('Время вышло!!!');
        });
    });
}

(function ($) {

    $.fn.downCount = function (options, callback) {
        var settings = $.extend({
            date: null,
            offset: null
        }, options);

        // Throw error if date is not set
        if (!settings.date) {
            $.error('Date is not defined.');
        }

        // Throw error if date is set incorectly
        if (!Date.parse(settings.date)) {
            $.error('Incorrect date format, it should look like this, 12/24/2012 12:00:00.');
        }

        // Save container
        var container = this;

        /**
         * Change client's local date to match offset timezone
         * @return {Object} Fixed Date object.
         */
        var currentDate = function () {
            // get client's current date
            var date = new Date();

            // turn date to utc
            var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

            // set new Date object
            var new_date = new Date(utc + (3600000 * settings.offset))

            return new_date;
        };

        /**
         * Main downCount function that calculates everything
         */
        function countdown() {
            var target_date = new Date(settings.date), // set target date
                current_date = currentDate(); // get fixed current date

            // difference of dates
            var difference = target_date - current_date;

            // if difference is negative than it's pass the target date
            if (difference < 0) {
                // stop timer
                clearInterval(interval);

                if (callback && typeof callback === 'function') callback();

                return;
            }

            // basic math variables
            var _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;

            // calculate dates
            var days = Math.floor(difference / _day),
                hours = Math.floor((difference % _day) / _hour),
                minutes = Math.floor((difference % _hour) / _minute),
                seconds = Math.floor((difference % _minute) / _second);

            // fix dates so that it will show two digets
            days = (String(days).length >= 2) ? days : '0' + days;
            hours = (String(hours).length >= 2) ? hours : '0' + hours;
            minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
            seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

            // based on the date change the refrence wording

            var ref_days = (days === '01') ? 'день' : (days === '02' || days === '03' || days === '04') ? 'дня' : 'дней',
                ref_hours = (hours === '01') ? 'час' : (hours === '02' || hours === '03' || hours === '04') ? 'часа' : 'часов',
                ref_minutes = (minutes === '01') ? 'минута' : (minutes === '02' || minutes === '03' || minutes === '04') ? 'минуты' : 'минут',
                ref_seconds = 'секунд';

            // set to DOM

            container.find('.days').text(days);
            container.find('.hours').text(hours);
            container.find('.minutes').text(minutes);
            container.find('.seconds').text(seconds);

            container.find('.days_ref').text(ref_days);
            container.find('.hours_ref').text(ref_hours);
            container.find('.minutes_ref').text(ref_minutes);
            container.find('.seconds_ref').text(ref_seconds);
        };

        // start
        var interval = setInterval(countdown, 1000);
    };

})(jQuery);