/**
 * @fileoverview Slick fullscreen slider
 *
 * @author Alex Pivtorak <alex.pivtorak@gmail.com>
 * @version 0.7
 */

'use strict';

jQuery(function($) {
    var el, set, timeRemain, sliderContinue;


    // App
    var Application = {

        settings: {
            sliderAutoplaySpeed: 7000,
            sliderSpeed: 1000
        },

        elements: {
            slider: $('#slick'),
            slickAllThumbs: $('.slick-dots button'),
            slickActiveThumb: $('.slick-dots .slick-active button'),
            
        },

        init: function() {
            set = this.settings;
            el = this.elements;


            this.slider();
            
        },

        /**
         * Slider
         */
        slider: function() {

            el.slider.on('init', function() {
                $(this).find('.slick-dots button').text('');
                Application.dotsAnimation();
                
            });

            el.slider.slick({
                arrows: true,
                dots: false,
                autoplay: true,
                autoplaySpeed: set.sliderAutoplaySpeed,
                fade: false,
                speed: set.sliderSpeed,
                pauseOnHover: false,
                pauseOnDotsHover: true
            });

var $slider = $('.slider').slick({
    fade: true,
    focusOnSelect: true,
    lazyLoad: 'ondemand',
    speed: 1000
});

$('.slider').on('init', function(slick) {
    console.log('fired!');
    $('.slider').fadeIn(3000);
});
$(window).load(function() {
    $('.slider').fadeIn(3000);
});
            $('.slick-dots').hover(
                function() {
                    var trackWidth = $('.slick-dots .slick-active button').width();
                    $('.slick-dots .slick-active button').stop().width(trackWidth);
                    el.slider.slick('slickPause');
                    clearTimeout(sliderContinue);
                },
                function() {
                    Application.dotsAnimation(timeRemain);
                    var trackWidth = $('.slick-dots .slick-active button').width();


                    sliderContinue = setTimeout(function() {
                        el.slider.slick('slickNext');
                        el.slider.slick('slickPlay');
                    }, timeRemain);
                }
            );

            el.slider.on('beforeChange', function() {
                $('.slick-dots button').stop().width(0);
            });

            el.slider.on('afterChange', function() {
                $('.slick-dots button').width(0);
                Application.dotsAnimation();
            });

        },

        /**
         *
         * @param remain {number}
         */

        dotsAnimation: function(remain) {

            if (remain) {
                var newDuration = remain;
            } else {
                var newDuration = set.sliderAutoplaySpeed;
            }

            $('.slick-dots .slick-active button').animate({ width: '100%' },
                {
                    duration: newDuration,
                    easing: 'linear',
                    step: function(now, fx) {
                        var timeCurrent = Math.round((now*set.sliderAutoplaySpeed)/100);
                        timeRemain = set.sliderAutoplaySpeed - timeCurrent;
                    }
                }
            );
        },


    };



    //Init
    Application.init();
  
    $(window).load(function() {
      $('.slick-slide .img--holder').height($(window).height());
    });
  
    $(window).resize(function() {
      $('.slick-slide .img--holder').height($(window).height());
    });

});

$.fn.ulSelect = function(){
  var ul = $(this);

  if (!ul.hasClass('zg-ul-select')) {
    ul.addClass('zg-ul-select');
  }
  // SVG arrow
  var arrow = '<svg id="ul-arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 32 32"><line stroke-width="1" x1="" y1="" x2="" y2="" stroke="#449FDB" opacity=""/><path d="M4.131 8.962c-0.434-0.429-1.134-0.429-1.566 0-0.432 0.427-0.432 1.122 0 1.55l12.653 12.528c0.434 0.429 1.133 0.429 1.566 0l12.653-12.528c0.432-0.429 0.434-1.122 0-1.55s-1.136-0.429-1.566-0.002l-11.87 11.426-11.869-11.424z" fill="#111"/></svg>';
  $('li:first-of-type', this).addClass('active').append(arrow);
  $(this).on('click', 'li', function(event){
    
    // Remove div#selected if it exists
    if ($('#selected--zg-ul-select').length) {
      $('#selected--zg-ul-select').remove();
    }
    ul.before('<div id="selected--zg-ul-select">');
    var selected = $('#selected--zg-ul-select');
    $('li #ul-arrow', ul).remove();
    ul.toggleClass('active');
    // Remove active class from any <li> that has it...
    ul.children().removeClass('active');
    // And add the class to the <li> that gets clicked
    $(this).toggleClass('active');

    var selectedText = $(this).text();
    if (ul.hasClass('active')) {
      selected.text(selectedText).addClass('active').append(arrow);
    }
    else {
      selected.text('').removeClass('active'); 
      $('li.active', ul).append(arrow);
    }
    });
    // Make ul tabbable
    /*$(ul).focus(function(){
     $(this).keydown(function(e) {
      if(e.which == 38 || 40) { // Up or down keypress
        $(this).addClass('active');
        var liActive =  $('li.active', ul);
        var liPrev = $('li.active', ul).prev();
        var liNext =  $('li.active', ul).next();
        if(e.which == 38) { // Down
          liActive.removeClass('active');
          liPrev.addClass('active');
        }
        if(e.which == 40) { // Down
          liActive.removeClass('active');
          liNext.addClass('active');
        }
      }
     });
     $(this).keydown(function(){
        if(e.which == 13) { // Down
          ul.removeClass('active');
        }
      });
    });*/
    // Close the faux select menu when clicking outside it 
    $(document).on('click', function(event){
    if($('ul.zg-ul-select').length) {
     if(!$('ul.zg-ul-select').has(event.target).length == 0) {
      return;
    }
    else {
      $('ul.zg-ul-select').removeClass('active');
      $('#selected--zg-ul-select').removeClass('active').text('');
      $('#ul-arrow').remove();
      $('ul.zg-ul-select li.active').append(arrow);
    } 
    }
    });
  }

// Run
$('#be-select').ulSelect();