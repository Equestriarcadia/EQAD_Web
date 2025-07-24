/* Template: Aria - Business HTML Landing Page Template
   Author: Inovatik
   Created: Jul 2019
   Description: Custom JS file
*/

(function($) {
    "use strict";

    console.log(
		' _____ _____ _____ ____     _____     _                 _\n' +
        '|   __|     |  _  |    \\   |   | |___| |_ _ _ _ ___ ___| |_\n' +
        '|   __|  |  |     |  |  |  | | | | -_|  _| | | | . |  _| \'_|\n' +
        '|_____|__  _|__|__|____/   |_|___|___|_| |_____|___|_| |_,_|\n' +
        '         |__|\n' +
        '\n' +
        'EQAD_Web - By Leonsu_L & JessDaodao\n' +
        '网站基于模板二次创作，已在GitHub开源：https://github.com/Equestriarcadia/EQAD_Web'
	);

	$(window).on('load', function() {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});

    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 20) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });

	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
	});

    $(".navbar-nav li a").on("click", function(event) {
    if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });

	$("#js-rotating").Morphext({
		animation: "fadeIn",
		separator: ",",
		speed: 2000,
		complete: function () {
			// Called after the entrance animation is executed.
		}
    });
    
	var a = 0;
	$(window).scroll(function() {
		if ($('#counter').length) {
			var oTop = $('#counter').offset().top - window.innerHeight;
			if (a == 0 && $(window).scrollTop() > oTop) {
			$('.counter-value').each(function() {
				var $this = $(this),
				countTo = $this.attr('data-count');
				$({
				countNum: $this.text()
				}).animate({
					countNum: countTo
				},
				{
					duration: 2000,
					easing: 'swing',
					step: function() {
					$this.text(Math.floor(this.countNum));
					},
					complete: function() {
					$this.text(this.countNum);
					}
				});
			});
			a = 1;
			}
		}
    });

	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

	document.addEventListener('DOMContentLoaded', function() {
    	const navLinks = document.querySelectorAll('.sidebar-nav-menu a.page-scroll');
    
    	window.addEventListener('scroll', function() {
    	    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
    	    navLinks.forEach(link => {
    	        const targetId = link.getAttribute('href').substring(1);
    	        const targetElement = document.getElementById(targetId);
            
    	        if (targetElement) {
    	            const targetPosition = targetElement.offsetTop;
    	            const targetHeight = targetElement.offsetHeight;
                
    	            if (scrollPosition >= targetPosition + 200 && 
    	                scrollPosition < targetPosition + targetHeight + 245) {
    	                link.classList.add('active');
    	            } else {
    	                link.classList.remove('active');
    	            }
    	        }
    	    });
    	});
    
    	window.dispatchEvent(new Event('scroll'));
	});

})(jQuery);
