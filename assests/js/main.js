"use strict";

(function($){
	$('.slider-single').slick({
	 	slidesToShow: 1,
	 	slidesToScroll: 1,
	 	arrows: true,
	 	fade: false,
	 	adaptiveHeight: true,
	 	infinite: false,
		useTransform: true,
	 	speed: 400,
	 	cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
	});

	$('.slider-nav')
	 	.on('init', function(event, slick) {
	 		$('.slider-nav .slick-slide.slick-current').addClass('is-active');
	 	})
	 	.slick({
	 		slidesToShow: 3,
	 		slidesToScroll: 3,
	 		dots: false,
	 		arrows: false,
	 		focusOnSelect: false,
	 		infinite: false
	});

	$('.slider-single').on('afterChange', function(event, slick, currentSlide) {
	 	$('.slider-nav').slick('slickGoTo', currentSlide);
	 	var currrentNavSlideElem = '.slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
	 	$('.slider-nav .slick-slide.is-active').removeClass('is-active');
	 	$(currrentNavSlideElem).addClass('is-active');
	});

	$('.slider-nav').on('click', '.slick-slide', function(event) {
	 	event.preventDefault();
	 	var goToSingleSlide = $(this).data('slick-index');

	 	$('.slider-single').slick('slickGoTo', goToSingleSlide);
	});

	function _instanceof(left, right) { 
		if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { 
			return !!right[Symbol.hasInstance](left); } else { return left instanceof right; 
			} 
		}

	function _classCallCheck(instance, Constructor) { 
		if (!_instanceof(instance, Constructor)) { 
			throw new TypeError("Cannot call a class as a function"); 
		} 
	}

	function _defineProperties(target, props) { 
		for (var i = 0; i < props.length; i++) { 
			var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; 
			if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); 
		} 
	}

	function _createClass(Constructor, protoProps, staticProps) { 
		if (protoProps) _defineProperties(Constructor.prototype, protoProps); 
		if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; 
	}

	var StickyNavigation = function () {
	  function StickyNavigation() {
	    var _this = this;

	    _classCallCheck(this, StickyNavigation);

	    this.currentId = null;
	    this.currentTab = null;
	    this.tabContainerHeight = 70;
	    var self = this;
	    $('.et-hero-tab').click(function () {
	      self.onTabClick(event, $(this));
	    });
	    $(window).scroll(function () {
	      _this.onScroll();
	    });
	    $(window).resize(function () {
	      _this.onResize();
	    });
	  }

	  _createClass(StickyNavigation, [{
	    key: "onTabClick",
	    value: function onTabClick(event, element) {
	      event.preventDefault();
	      var scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
	      $('html, body').animate({
	        scrollTop: scrollTop
	      }, 600);
	    }
	  }, {
	    key: "onScroll",
	    value: function onScroll() {
	      this.checkTabContainerPosition();
	      this.findCurrentTabSelector();
	    }
	  }, {
	    key: "onResize",
	    value: function onResize() {
	      if (this.currentId) {
	        this.setSliderCss();
	      }
	    }
	  }, {
	    key: "checkTabContainerPosition",
	    value: function checkTabContainerPosition() {
	      var offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;

	      if ($(window).scrollTop() > offset) {
	        $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
	      } else {
	        $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
	      }
	    }
	  }, {
	    key: "findCurrentTabSelector",
	    value: function findCurrentTabSelector(element) {
	      var newCurrentId;
	      var newCurrentTab;
	      var self = this;
	      $('.et-hero-tab').each(function () {
	        var id = $(this).attr('href');
	        var offsetTop = $(id).offset().top - self.tabContainerHeight;
	        var offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;

	        if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
	          newCurrentId = id;
	          newCurrentTab = $(this);
	        }
	      });

	      if (this.currentId != newCurrentId || this.currentId === null) {
	        this.currentId = newCurrentId;
	        this.currentTab = newCurrentTab;
	        this.setSliderCss();
	      }
	    }
	  }, {
	    key: "setSliderCss",
	    value: function setSliderCss() {
	      var width = 0;
	      var left = 0;

	      if (this.currentTab) {
	        width = this.currentTab.css('width');
	        left = this.currentTab.offset().left;
	      }

	      $('.et-hero-tab-slider').css('width', width);
	      $('.et-hero-tab-slider').css('left', left);
	    }
	  }]);

	  return StickyNavigation;
	}();

	new StickyNavigation();

	var map = new google.maps.Map(document.getElementById("map_div"), {
	  center: new google.maps.LatLng(33.808678, -117.918921),
	  zoom: 14,
	  mapTypeId: google.maps.MapTypeId.ROADMAP,
	});

	google.maps.event.addDomListener(window, "load", function () {
	  
	  var infoWindow = new google.maps.InfoWindow();

	  function createMarker(options, html) {
	    var marker = new google.maps.Marker(options);
	    if (html) {
	      google.maps.event.addListener(marker, "click", function () {
	        infoWindow.setContent(html);
	        infoWindow.open(options.map, this);
	      });
	    }
	    return marker;
	  }

	  var marker0 = createMarker({
	    position: new google.maps.LatLng(33.808678, -117.918921),
	    map: map,
	    icon: "https://1.bp.blogspot.com/_GZzKwf6g1o8/S6xwK6CSghI/AAAAAAAAA98/_iA3r4Ehclk/s1600/marker-green.png"
	  }, "<h1>Marker 0</h1><p>This is the home marker.</p>");

	  var marker1 = createMarker({
	    position: new google.maps.LatLng(33.818038, -117.928492),
	    map: map,
	    icon: "https://1.bp.blogspot.com/_GZzKwf6g1o8/S6xwK6CSghI/AAAAAAAAA98/_iA3r4Ehclk/s1600/marker-green.png"
	  }, "<h1>Marker 1</h1><p>This is marker 1</p>");

	  var marker2 = createMarker({
	    position: new google.maps.LatLng(33.803333, -117.915278),
	    map: map,
	    icon: "https://1.bp.blogspot.com/_GZzKwf6g1o8/S6xwK6CSghI/AAAAAAAAA98/_iA3r4Ehclk/s1600/marker-green.png"
	  }, "<h1>Marker 2</h1><p>This is marker 2</p>");
	});

	window.onresize = function() {
	  var currCenter = map.getCenter();
	  google.maps.event.trigger(map, 'resize');
	  map.setCenter(currCenter);
	};

	$(".more-reviews").click(function() { 
    $(".catalog-review").addClass('more-r');
  });

	function twoCalendars(day, month, year) {

		var calendarTable = [];

		var calendar = $('.doubleCalendar').datepicker({
		    inline: true,
		    defaultDate: new Date(year,month,day),
		    showOtherMonths: false,
		    numberOfMonths: 2,
		    dayNamesMin: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
		    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
		   
		});
	}

	twoCalendars(1, 1, 2020);

	$( function() {
    $( "#slider" ).slider({  
      slide: function( event, ui ) {  	                         
        updateHandleValues(ui);
      },
	 		change: function(event, ui) {
	    	updateHandleValues(ui);
	  	}
    });
	   
  }); 

})(jQuery)