/**
 * Global variables
 */
"use strict";
var isNoviBuilder = window.xMode;
var userAgent = navigator.userAgent.toLowerCase(),
  initialDate = new Date(),

  $document = $(document),
  $window = $(window),
  $html = $("html"),

  isDesktop = $html.hasClass("desktop"),
  isRtl = $html.attr("dir") === "rtl",
  isIE = userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1]) : userAgent.indexOf("trident") != -1 ? 11 : userAgent.indexOf("edge") != -1 ? 12 : false,
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isTouch = "ontouchstart" in window,
  isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/),
  onloadCaptchaCallback,
  plugins = {
    pointerEvents: isIE < 11 ? "js/pointer-events.min.js" : false,
    bootstrapTooltip: $("[data-toggle='tooltip']"),
    bootstrapModalDialog: $('.modal'),
    bootstrapTabs: $(".tabs-custom-init"),
    rdNavbar: $(".rd-navbar"),
		materialParallax: $(".parallax-container"),
    rdGoogleMaps: $(".rd-google-map"),
    rdMailForm: $(".rd-mailform"),
    rdInputLabel: $(".form-label"),
    regula: $("[data-constraints]"),
    owl: $(".owl-carousel"),
		mailchimp: $('.mailchimp-mailform'),
    statefulButton: $('.btn-stateful'),
    isotope: $(".isotope"),
    popover: $('[data-toggle="popover"]'),
    viewAnimate: $('.view-animate'),
    radio: $("input[type='radio']"),
    checkbox: $("input[type='checkbox']"),
    customToggle: $("[data-custom-toggle]"),
    facebookWidget: $('#fb-root'),
    counter: $(".counter"),
    progressLinear: $(".progress-linear"),
    circleProgress: $(".progress-bar-circle"),
    dateCountdown: $('.DateCountdown'),
    countDown: $(".countdown"),
    pageLoader: $("#page-loader"),
    captcha: $('.recaptcha'),
		lightGallery: $("[data-lightgallery='group']"),
		lightGalleryItem: $("[data-lightgallery='item']"),
		lightDynamicGalleryItem: $("[data-lightgallery='dynamic']"),
    campaignMonitor: $('.campaign-mailform'),
    bootstrapDateTimePicker: $("[data-time-picker]"),
    slick: $('.slick-slider'),
    customWaypoints: $('[data-custom-scroll-to]'),
    calendar: $(".rd-calendar")
  };

/**
 * Initialize All Scripts
 */
$document.ready(function () {


  /**
   * initCustomScrollTo
   * @description  init smooth anchor animations
   */
  function initCustomScrollTo(obj) {
    var $this = $(obj);
    if (!isNoviBuilder) {
      $this.on('click', function (e) {
        e.preventDefault();
        $("body, html").stop().animate({
          scrollTop: $($(this).attr('data-custom-scroll-to')).offset().top
        }, 1000, function () {
          $window.trigger("resize");
        });
      });
    }
  }



	/**
	 * @desc Initialize owl carousel plugin
	 * @param {object} c - carousel jQuery object
	 */
	function initOwlCarousel(c) {
		var aliaces = ["-", "-xs-", "-sm-", "-md-", "-lg-", "-xl-", "-xxl-"],
			values = [0, 480, 576, 768, 992, 1200, 1600],
			responsive = {};

		for (var j = 0; j < values.length; j++) {
			responsive[values[j]] = {};
			for (var k = j; k >= -1; k--) {
				if (!responsive[values[j]]["items"] && c.attr("data" + aliaces[k] + "items")) {
					responsive[values[j]]["items"] = k < 0 ? 1 : parseInt(c.attr("data" + aliaces[k] + "items"), 10);
				}
				if (!responsive[values[j]]["stagePadding"] && responsive[values[j]]["stagePadding"] !== 0 && c.attr("data" + aliaces[k] + "stage-padding")) {
					responsive[values[j]]["stagePadding"] = k < 0 ? 0 : parseInt(c.attr("data" + aliaces[k] + "stage-padding"), 10);
				}
				if (!responsive[values[j]]["margin"] && responsive[values[j]]["margin"] !== 0 && c.attr("data" + aliaces[k] + "margin")) {
					responsive[values[j]]["margin"] = k < 0 ? 30 : parseInt(c.attr("data" + aliaces[k] + "margin"), 10);
				}
			}
		}

		// Enable custom pagination
		if (c.attr('data-dots-custom')) {
			c.on("initialized.owl.carousel", function (event) {
				var carousel = $(event.currentTarget),
					customPag = $(carousel.attr("data-dots-custom")),
					active = 0;

				if (carousel.attr('data-active')) {
					active = parseInt(carousel.attr('data-active'));
				}

				carousel.trigger('to.owl.carousel', [active, 300, true]);
				customPag.find("[data-owl-item='" + active + "']").addClass("active");

				customPag.find("[data-owl-item]").on('click', function (e) {
					e.preventDefault();
					carousel.trigger('to.owl.carousel', [parseInt(this.getAttribute("data-owl-item")), 300, true]);
				});

				carousel.on("translate.owl.carousel", function (event) {
					customPag.find(".active").removeClass("active");
					customPag.find("[data-owl-item='" + event.item.index + "']").addClass("active")
				});
			});
		}

		if (c.attr('data-nav-custom')) {
			c.on("initialized.owl.carousel", function (event) {
				var carousel = $(event.currentTarget),
					customNav = $(carousel.attr("data-nav-custom"));

				// Custom Navigation Events
				customNav.find(".owl-arrow-next").click(function (e) {
					e.preventDefault();
					carousel.trigger('next.owl.carousel');
				});
				customNav.find(".owl-arrow-prev").click(function (e) {
					e.preventDefault();
					carousel.trigger('prev.owl.carousel');
				});
			});
		}


		c.on("initialized.owl.carousel", function () {
			initLightGalleryItem(c.find('[data-lightgallery="item"]'), 'lightGallery-in-carousel');
		});

		c.owlCarousel({
			autoplay: isNoviBuilder ? false : c.attr("data-autoplay") === "true",
			loop: isNoviBuilder ? false : c.attr("data-loop") !== "false",
			items: 1,
			center: c.attr("data-center") === "true",
			dotsContainer: c.attr("data-pagination-class") || false,
			navContainer: c.attr("data-navigation-class") || false,
			mouseDrag: isNoviBuilder ? false : c.attr("data-mouse-drag") !== "false",
			nav: c.attr("data-nav") === "true",
			dots: c.attr("data-dots") === "true",
			dotsEach: c.attr("data-dots-each") ? parseInt(c.attr("data-dots-each"), 10) : false,
			animateIn: c.attr('data-animation-in') ? c.attr('data-animation-in') : false,
			animateOut: c.attr('data-animation-out') ? c.attr('data-animation-out') : false,
			responsive: responsive,
			navText: c.attr("data-nav-text") ? $.parseJSON( c.attr("data-nav-text") ) : [],
			navClass: c.attr("data-nav-class") ? $.parseJSON( c.attr("data-nav-class") ) : ['owl-prev', 'owl-next']
		});
	}



	/**
	 * @desc Initialize the gallery with set of images
	 * @param {object} itemsToInit - jQuery object
	 * @param {string} addClass - additional gallery class
	 */
	function initLightGallery(itemsToInit, addClass) {
		if (!isNoviBuilder) {
			$(itemsToInit).lightGallery({
				thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
				selector: "[data-lightgallery='item']",
				autoplay: $(itemsToInit).attr("data-lg-autoplay") === "true",
				pause: parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
				addClass: addClass,
				mode: $(itemsToInit).attr("data-lg-animation") || "lg-slide",
				loop: $(itemsToInit).attr("data-lg-loop") !== "false"
			});
		}
	}

	/**
	 * @desc Initialize the gallery with dynamic addition of images
	 * @param {object} itemsToInit - jQuery object
	 * @param {string} addClass - additional gallery class
	 */
	function initDynamicLightGallery(itemsToInit, addClass) {
		if (!isNoviBuilder) {
			$(itemsToInit).on("click", function () {
				$(itemsToInit).lightGallery({
					thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
					selector: "[data-lightgallery='item']",
					autoplay: $(itemsToInit).attr("data-lg-autoplay") === "true",
					pause: parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
					addClass: addClass,
					mode: $(itemsToInit).attr("data-lg-animation") || "lg-slide",
					loop: $(itemsToInit).attr("data-lg-loop") !== "false",
					dynamic: true,
					dynamicEl: JSON.parse($(itemsToInit).attr("data-lg-dynamic-elements")) || []
				});
			});
		}
	}

	/**
	 * @desc Initialize the gallery with one image
	 * @param {object} itemToInit - jQuery object
	 * @param {string} addClass - additional gallery class
	 */
	function initLightGalleryItem(itemToInit, addClass) {
		if (!isNoviBuilder) {
			$(itemToInit).lightGallery({
				selector: "this",
				addClass: addClass,
				counter: false,
				youtubePlayerParams: {
					modestbranding: 1,
					showinfo: 0,
					rel: 0,
					controls: 0
				},
				vimeoPlayerParams: {
					byline: 0,
					portrait: 0
				}
			});
		}
	}



  /**
   * isScrolledIntoView
   * @description  check the element whas been scrolled into the view
   */
  function isScrolledIntoView(elem) {
    if (!isNoviBuilder) {
      return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
    }
    else {
      return true;
    }
  }

  /**
   * initOnView
   * @description  calls a function when element has been scrolled into the view
   */
  function lazyInit(element, func) {
    var $win = jQuery(window);
    $win.on('load scroll', function () {
      if ((!element.hasClass('lazy-loaded') && (isScrolledIntoView(element)))) {
        func.call();
        element.addClass('lazy-loaded');
      }
    });
  }


	/**
	 * @desc Attach form validation to elements
	 * @param {object} elements - jQuery object
	 */
	function attachFormValidator(elements) {
		// Custom validator - phone number
		regula.custom({
			name: 'PhoneNumber',
			defaultMessage: 'Invalid phone number format',
			validator: function() {
				if ( this.value === '' ) return true;
				else return /^(\+\d)?[0-9\-\(\) ]{5,}$/i.test( this.value );
			}
		});

		for (var i = 0; i < elements.length; i++) {
			var o = $(elements[i]), v;
			o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
			v = o.parent().find(".form-validation");
			if (v.is(":last-child")) o.addClass("form-control-last-child");
		}

		elements.on('input change propertychange blur', function (e) {
			var $this = $(this), results;

			if (e.type !== "blur") if (!$this.parent().hasClass("has-error")) return;
			if ($this.parents('.rd-mailform').hasClass('success')) return;

			if (( results = $this.regula('validate') ).length) {
				for (i = 0; i < results.length; i++) {
					$this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error");
				}
			} else {
				$this.siblings(".form-validation").text("").parent().removeClass("has-error")
			}
		}).regula('bind');

		var regularConstraintsMessages = [
			{
				type: regula.Constraint.Required,
				newMessage: "The text field is required."
			},
			{
				type: regula.Constraint.Email,
				newMessage: "The email is not a valid email."
			},
			{
				type: regula.Constraint.Numeric,
				newMessage: "Only numbers are required"
			},
			{
				type: regula.Constraint.Selected,
				newMessage: "Please choose an option."
			}
		];


		for (var i = 0; i < regularConstraintsMessages.length; i++) {
			var regularConstraint = regularConstraintsMessages[i];

			regula.override({
				constraintType: regularConstraint.type,
				defaultMessage: regularConstraint.newMessage
			});
		}
	}

	/**
	 * @desc Check if all elements pass validation
	 * @param {object} elements - object of items for validation
	 * @param {object} captcha - captcha object for validation
	 * @return {boolean}
	 */
	function isValidated(elements, captcha) {
		var results, errors = 0;

		if (elements.length) {
			for (var j = 0; j < elements.length; j++) {

				var $input = $(elements[j]);
				if ((results = $input.regula('validate')).length) {
					for (k = 0; k < results.length; k++) {
						errors++;
						$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
					}
				} else {
					$input.siblings(".form-validation").text("").parent().removeClass("has-error")
				}
			}

			if (captcha) {
				if (captcha.length) {
					return validateReCaptcha(captcha) && errors === 0
				}
			}

			return errors === 0;
		}
		return true;
	}

  /**
   * Init Bootstrap tooltip
   * @description  calls a function when need to init bootstrap tooltips
   */
  function initBootstrapTooltip(tooltipPlacement) {
    if (window.innerWidth < 599) {
      plugins.bootstrapTooltip.tooltip('destroy');
      plugins.bootstrapTooltip.tooltip({
        placement: 'bottom'
      });
    } else {
      plugins.bootstrapTooltip.tooltip('destroy');
      plugins.bootstrapTooltip.tooltipPlacement;
      plugins.bootstrapTooltip.tooltip();
    }
  }


  /**
   * Copyright Year
   * @description  Evaluates correct copyright year
   */
  var o = $(".copyright-year");
  if (o.length) {
    o.text(initialDate.getFullYear());
  }

  /**
   * Page loader
   * @description Enables Page loader
   */
  if (plugins.pageLoader.length > 0) {
    setTimeout(function () {
      plugins.pageLoader.addClass("loaded");
      $window.trigger("resize");
    }, 100);
  }

	/**
	 * @desc Validate google reCaptcha
	 * @param {object} captcha - captcha object for validation
	 * @return {boolean}
	 */
	function validateReCaptcha(captcha) {
		var captchaToken = captcha.find('.g-recaptcha-response').val();

		if (captchaToken.length === 0) {
			captcha
				.siblings('.form-validation')
				.html('Please, prove that you are not robot.')
				.addClass('active');
			captcha
				.closest('.form-wrap')
				.addClass('has-error');

			captcha.on('propertychange', function () {
				var $this = $(this),
					captchaToken = $this.find('.g-recaptcha-response').val();

				if (captchaToken.length > 0) {
					$this
						.closest('.form-wrap')
						.removeClass('has-error');
					$this
						.siblings('.form-validation')
						.removeClass('active')
						.html('');
					$this.off('propertychange');
				}
			});

			return false;
		}

		return true;
	}


	/**
	 * @desc Initialize Google reCaptcha
	 */
	window.onloadCaptchaCallback = function () {
		for (var i = 0; i < plugins.captcha.length; i++) {
			var $capthcaItem = $(plugins.captcha[i]);

			grecaptcha.render(
				$capthcaItem.attr('id'),
				{
					sitekey: $capthcaItem.attr('data-sitekey'),
					size: $capthcaItem.attr('data-size') ? $capthcaItem.attr('data-size') : 'normal',
					theme: $capthcaItem.attr('data-theme') ? $capthcaItem.attr('data-theme') : 'light',
					callback: function (e) {
						$('.recaptcha').trigger('propertychange');
					}
				}
			);
			$capthcaItem.after("<span class='form-validation'></span>");
		}
	};


	// Google ReCaptcha
	if (plugins.captcha.length) {
		$.getScript("//www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit&hl=en");
	}

  /**
   * Is Mac os
   * @description  add additional class on html if mac os.
   */
  if (navigator.platform.match(/(Mac)/i)) $html.addClass("mac-os");

  /**
   * Is Safari
   * @description  add additional class on html if mac os.
   */
  if (isSafari) $html.addClass("safari-browser");

  /**
   * IE Polyfills
   * @description  Adds some loosing functionality to IE browsers
   */
  if (isIE) {
    if (isIE < 10) {
      $html.addClass("lt-ie-10");
    }

    if (isIE < 11) {
      if (plugins.pointerEvents) {
        $.getScript(plugins.pointerEvents)
          .done(function () {
            $html.addClass("ie-10");
            PointerEventsPolyfill.initialize({});
          });
      }
    }

    if (isIE === 11) {
      $("html").addClass("ie-11");
    }

    if (isIE === 12) {
      $("html").addClass("ie-edge");
    }
  }

  /**
   * Bootstrap Tooltips
   * @description Activate Bootstrap Tooltips
   */
  if (plugins.bootstrapTooltip.length) {
    var tooltipPlacement = plugins.bootstrapTooltip.attr('data-placement');
    initBootstrapTooltip(tooltipPlacement);
    $(window).on('resize orientationchange', function () {
      initBootstrapTooltip(tooltipPlacement);
    })
  }

  /**
   * bootstrapModalDialog
   * @description Stap vioeo in bootstrapModalDialog
   */
  if (plugins.bootstrapModalDialog.length > 0) {
    var i = 0;

    for (i = 0; i < plugins.bootstrapModalDialog.length; i++) {
      var modalItem = $(plugins.bootstrapModalDialog[i]);

      modalItem.on('hidden.bs.modal', $.proxy(function () {
        var activeModal = $(this),
          rdVideoInside = activeModal.find('video'),
          youTubeVideoInside = activeModal.find('iframe');

        if (rdVideoInside.length) {
          rdVideoInside[0].pause();
        }

        if (youTubeVideoInside.length) {
          var videoUrl = youTubeVideoInside.attr('src');

          youTubeVideoInside
            .attr('src', '')
            .attr('src', videoUrl);
        }
      }, modalItem))
    }
  }


  /**
   * RD Google Maps
   * @description Enables RD Google Maps plugin
   */
  if (plugins.rdGoogleMaps.length) {
    var i;

    $.getScript("//maps.google.com/maps/api/js?key=AIzaSyAwH60q5rWrS8bXwpkZwZwhw9Bw0pqKTZM&sensor=false&libraries=geometry,places&v=3.7", function () {
      var head = document.getElementsByTagName('head')[0],
        insertBefore = head.insertBefore;

      head.insertBefore = function (newElement, referenceElement) {
        if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') != -1 || newElement.innerHTML.indexOf('gm-style') != -1) {
          return;
        }
        insertBefore.call(head, newElement, referenceElement);
      };

      for (i = 0; i < plugins.rdGoogleMaps.length; i++) {

        var $googleMapItem = $(plugins.rdGoogleMaps[i]);

        lazyInit($googleMapItem, $.proxy(function () {
          var $this = $(this),
            styles = $this.attr("data-styles");

          $this.googleMap({
            marker: {
              basic: $this.data('marker'),
              active: $this.data('marker-active')
            },
            styles: styles ? JSON.parse(styles) : [],
            onInit: function (map) {
              var inputAddress = $('#rd-google-map-address');


              if (inputAddress.length) {
                var input = inputAddress;
                var geocoder = new google.maps.Geocoder();
                var marker = new google.maps.Marker(
                  {
                    map: map,
                    icon: $this.data('marker-url'),
                  }
                );

                var autocomplete = new google.maps.places.Autocomplete(inputAddress[0]);
                autocomplete.bindTo('bounds', map);
                inputAddress.attr('placeholder', '');
                inputAddress.on('change', function () {
                  $("#rd-google-map-address-submit").trigger('click');
                });
                inputAddress.on('keydown', function (e) {
                  if (e.keyCode == 13) {
                    $("#rd-google-map-address-submit").trigger('click');
                  }
                });


                $("#rd-google-map-address-submit").on('click', function (e) {
                  e.preventDefault();
                  var address = input.val();
                  geocoder.geocode({'address': address}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                      var latitude = results[0].geometry.location.lat();
                      var longitude = results[0].geometry.location.lng();

                      map.setCenter(new google.maps.LatLng(
                        parseFloat(latitude),
                        parseFloat(longitude)
                      ));
                      marker.setPosition(new google.maps.LatLng(
                        parseFloat(latitude),
                        parseFloat(longitude)
                      ))
                    }
                  });
                });
              }
            }
          });
        }, $googleMapItem));
      }
    });
  }

  /**
   * Facebook widget
   * @description  Enables official Facebook widget
   */
  if (plugins.facebookWidget.length) {
    lazyInit(plugins.facebookWidget, function () {
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_EN/sdk.js#xfbml=1&version=v2.5";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    });
  }

  /**
   * Radio
   * @description Add custom styling options for input[type="radio"]
   */
  if (plugins.radio.length) {
    var i;
    for (i = 0; i < plugins.radio.length; i++) {
      var $this = $(plugins.radio[i]);
      $this.addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
    }
  }

  /**
   * Checkbox
   * @description Add custom styling options for input[type="checkbox"]
   */
  if (plugins.checkbox.length) {
    var i;
    for (i = 0; i < plugins.checkbox.length; i++) {
      var $this = $(plugins.checkbox[i]);
      if (!$this.hasClass('toggle-custom')) {
        $this.addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>")
      }
    }
  }

  /**
   * Popovers
   * @description Enables Popovers plugin
   */
  if (plugins.popover.length) {
    if (window.innerWidth < 767) {
      plugins.popover.attr('data-placement', 'bottom');
      plugins.popover.popover();
    }
    else {
      plugins.popover.popover();
    }
  }

  /**
   * Bootstrap Buttons
   * @description  Enable Bootstrap Buttons plugin
   */
  if (plugins.statefulButton.length) {
    $(plugins.statefulButton).on('click', function () {
      var statefulButtonLoading = $(this).button('loading');

      setTimeout(function () {
        statefulButtonLoading.button('reset')
      }, 2000);
    })
  }

  /**
   * UI To Top
   * @description Enables ToTop Button
   */
  if (isDesktop && !isNoviBuilder) {
    $().UItoTop({
      easingType: 'easeOutQuart',
      containerClass: 'ui-to-top fa fa-angle-up'
    });
  }

  /**
   * RD Navbar
   * @description Enables RD Navbar plugin
   */
  if (plugins.rdNavbar.length) {
    plugins.rdNavbar.RDNavbar({
      stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone") && !isNoviBuilder) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false,
      responsive: {
        0: {
          stickUp: (!isNoviBuilder) ? plugins.rdNavbar.attr("data-stick-up") === 'true' : false
        },
        768: {
          stickUp: (!isNoviBuilder) ? plugins.rdNavbar.attr("data-sm-stick-up") === 'true' : false
        },
        992: {
          stickUp: (!isNoviBuilder) ? plugins.rdNavbar.attr("data-md-stick-up") === 'true' : false
        },
        1200: {
          stickUp: (!isNoviBuilder) ? plugins.rdNavbar.attr("data-lg-stick-up") === 'true' : false
        }
      },
      callbacks: {
        onStuck: function () {
          var navbarSearch = this.$element.find('.rd-search input');

          if (navbarSearch) {
            navbarSearch.val('').trigger('propertychange');
          }
        },
        onDropdownOut: function () {
          return true;
        },
        onUnstuck: function () {
          if (this.$clone === null)
            return;

          var navbarSearch = this.$clone.find('.rd-search input');

          if (navbarSearch) {
            navbarSearch.val('').trigger('propertychange');
            navbarSearch.blur();
          }
        }
      }
    });
    if (plugins.rdNavbar.attr("data-body-class")) {
      document.body.className += ' ' + plugins.rdNavbar.attr("data-body-class");
    }
  }

  /**
   * ViewPort Universal
   * @description Add class in viewport
   */
  if (plugins.viewAnimate.length) {
    var i;
    for (i = 0; i < plugins.viewAnimate.length; i++) {
      var $view = $(plugins.viewAnimate[i]).not('.active');
      $document.on("scroll", $.proxy(function () {
        if (isScrolledIntoView(this)) {
          this.addClass("active");
        }
      }, $view))
        .trigger("scroll");
    }
  }


	// Isotope
	if (plugins.isotope.length) {
		var isogroup = [];
		for (var i = 0; i < plugins.isotope.length; i++) {
			var isotopeItem = plugins.isotope[i],
				isotopeInitAttrs = {
					itemSelector: '.isotope-item',
					layoutMode: isotopeItem.getAttribute('data-isotope-layout') ? isotopeItem.getAttribute('data-isotope-layout') : 'masonry',
					filter: '*'
				};

			if (isotopeItem.getAttribute('data-column-width')) {
				isotopeInitAttrs.masonry = {
					columnWidth: parseFloat(isotopeItem.getAttribute('data-column-width'))
				};
			} else if (isotopeItem.getAttribute('data-column-class')) {
				isotopeInitAttrs.masonry = {
					columnWidth: isotopeItem.getAttribute('data-column-class')
				};
			}

			var iso = new Isotope(isotopeItem, isotopeInitAttrs);
			isogroup.push(iso);
		}


		setTimeout(function () {
			for (var i = 0; i < isogroup.length; i++) {
				isogroup[i].element.className += " isotope--loaded";
				isogroup[i].layout();
			}
		}, 200);

		var resizeTimout;

		$("[data-isotope-filter]").on("click", function (e) {
			e.preventDefault();
			var filter = $(this);
			clearTimeout(resizeTimout);
			filter.parents(".isotope-filters").find('.active').removeClass("active");
			filter.addClass("active");
			var iso = $('.isotope[data-isotope-group="' + this.getAttribute("data-isotope-group") + '"]'),
				isotopeAttrs = {
					itemSelector: '.isotope-item',
					layoutMode: iso.attr('data-isotope-layout') ? iso.attr('data-isotope-layout') : 'masonry',
					filter: this.getAttribute("data-isotope-filter") === '*' ? '*' : '[data-filter*="' + this.getAttribute("data-isotope-filter") + '"]'
				};
			if (iso.attr('data-column-width')) {
				isotopeAttrs.masonry = {
					columnWidth: parseFloat(iso.attr('data-column-width'))
				};
			} else if (iso.attr('data-column-class')) {
				isotopeAttrs.masonry = {
					columnWidth: iso.attr('data-column-class')
				};
			}
			iso.isotope(isotopeAttrs);
		}).eq(0).trigger("click")
	}

  /**
   * WOW
   * @description Enables Wow animation plugin
   */
  if (isDesktop && !isNoviBuilder && $html.hasClass("wow-animation") && $(".wow").length) {
    new WOW().init();
  }


  /**
   * Slick carousel
   * @description  Enable Slick carousel plugin
   */
  if (plugins.slick.length) {
    var i;
    for (i = 0; i < plugins.slick.length; i++) {
      var $slickItem = $(plugins.slick[i]);

      $slickItem.on('init', function (slick) {
        initLightGallery($('[data-lightgallery="group-slick"]'), 'lightGallery-in-carousel');
        initLightGallery($('[data-lightgallery="item-slick"]'), 'lightGallery-in-carousel');
      });
      
      $slickItem.slick({
        slidesToScroll: parseInt($slickItem.attr('data-slide-to-scroll')) || 1,
        asNavFor: $slickItem.attr('data-for') || false,
        dots: $slickItem.attr("data-dots") == "true",
        infinite: isNoviBuilder ? false : $slickItem.attr("data-loop") == "true",
        focusOnSelect: false,
        arrows: $slickItem.attr("data-arrows") == "true",
        swipe: $slickItem.attr("data-swipe") == "true",
        autoplay: isNoviBuilder ? false : $slickItem.attr("data-autoplay") == "true",
        centerMode: $slickItem.attr("data-center-mode") == "true",
        centerPadding: $slickItem.attr("data-center-padding") ? $slickItem.attr("data-center-padding") : '0.50',
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 0,
            settings: {
              slidesToShow: parseInt($slickItem.attr('data-items')) || 1,
              swipe: $slickItem.attr('data-swipe') || false
            }
          },
          {
            breakpoint: 479,
            settings: {
              slidesToShow: parseInt($slickItem.attr('data-xs-items')) || 1,
              swipe: $slickItem.attr('data-xs-swipe') || false
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: parseInt($slickItem.attr('data-sm-items')) || 1,
              swipe: $slickItem.attr('data-sm-swipe') || false
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: parseInt($slickItem.attr('data-md-items')) || 1,
              swipe: $slickItem.attr('data-md-swipe') || false
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: parseInt($slickItem.attr('data-lg-items')) || 1,
              swipe: $slickItem.attr('data-lg-swipe') || false
            }
          }
        ]
      })
        .on('afterChange', function (event, slick, currentSlide, nextSlide) {
          var $this = $(this),
            childCarousel = $this.attr('data-child');

          if (childCarousel) {
            $(childCarousel + ' .slick-slide').removeClass('slick-current');
            $(childCarousel + ' .slick-slide').eq(currentSlide).addClass('slick-current');
          }
        });
    }
  }

  $('.slick-style-1').on('click', '.slick-slide', function (e) {
    e.stopPropagation();
    var index = $(this).data("slick-index"),
      targetSlider = $('.slick-style-1');
    if (targetSlider.slick('slickCurrentSlide') !== index) {
      targetSlider.slick('slickGoTo', index);
    }
  });




// lightGallery
	if (plugins.lightGallery.length) {
		for (var i = 0; i < plugins.lightGallery.length; i++) {
			initLightGallery(plugins.lightGallery[i]);
		}
	}

	// lightGallery item
	if (plugins.lightGalleryItem.length) {
		// Filter carousel items
		var notCarouselItems = [];

		for (var z = 0; z < plugins.lightGalleryItem.length; z++) {
			if (!$(plugins.lightGalleryItem[z]).parents('.owl-carousel').length &&
				!$(plugins.lightGalleryItem[z]).parents('.swiper-slider').length &&
				!$(plugins.lightGalleryItem[z]).parents('.slick-slider').length) {
				notCarouselItems.push(plugins.lightGalleryItem[z]);
			}
		}

		plugins.lightGalleryItem = notCarouselItems;

		for (var i = 0; i < plugins.lightGalleryItem.length; i++) {
			initLightGalleryItem(plugins.lightGalleryItem[i]);
		}
	}

	// Dynamic lightGallery
	if (plugins.lightDynamicGalleryItem.length) {
		for (var i = 0; i < plugins.lightDynamicGalleryItem.length; i++) {
			initDynamicLightGallery(plugins.lightDynamicGalleryItem[i]);
		}
	}

	// Owl carousel
	if (plugins.owl.length) {
		for (var i = 0; i < plugins.owl.length; i++) {
			var c = $(plugins.owl[i]);
			plugins.owl[i].owl = c;

			initOwlCarousel(c);
		}
	}

  /**
   * Bootstrap tabs
   * @description Activate Bootstrap Tabs
   */
  if (plugins.bootstrapTabs.length) {
    var i;
    for (i = 0; i < plugins.bootstrapTabs.length; i++) {
      var bootstrapTabsItem = $(plugins.bootstrapTabs[i]);

      //If have owl carousel inside tab - resize owl carousel on click
      if (bootstrapTabsItem.find('.owl-carousel').length) {
        // init first open tab

        var carouselObj = bootstrapTabsItem.find('.tab-content .tab-pane.active .owl-carousel');

        initOwlCarousel(carouselObj);

        //init owl carousel on tab change
        bootstrapTabsItem.find('.nav-custom a').on('click', $.proxy(function () {
          var $this = $(this);

          $this.find('.owl-carousel').trigger('destroy.owl.carousel').removeClass('owl-loaded');
          $this.find('.owl-carousel').find('.owl-stage-outer').children().unwrap();

          setTimeout(function () {
            var carouselObj = $this.find('.tab-content .tab-pane.active .owl-carousel');

            if (carouselObj.length) {
              for (var j = 0; j < carouselObj.length; j++) {
                var carouselItem = $(carouselObj[j]);
                initOwlCarousel(carouselItem);
              }
            }

          }, isNoviBuilder ? 1500 : 300);

        }, bootstrapTabsItem));
      }

      //If have slick carousel inside tab - resize slick carousel on click
      if (bootstrapTabsItem.find('.slick-slider').length) {
        bootstrapTabsItem.find('.tabs-custom-list > li > a').on('click', $.proxy(function () {
          var $this = $(this);
          var setTimeOutTime = isNoviBuilder ? 1500 : 300;

          setTimeout(function () {
            $this.find('.tab-content .tab-pane.active .slick-slider').slick('setPosition');
          }, setTimeOutTime);
        }, bootstrapTabsItem));
      }
    }
  }


  /**
   * RD Input Label
   * @description Enables RD Input Label Plugin
   */
  if (plugins.rdInputLabel.length) {
    plugins.rdInputLabel.RDInputLabel();
  }

  /**
   * Regula
   * @description Enables Regula plugin
   */
  if (plugins.regula.length) {
    attachFormValidator(plugins.regula);
  }


	// MailChimp Ajax subscription
	if (plugins.mailchimp.length) {
		for (i = 0; i < plugins.mailchimp.length; i++) {
			var $mailchimpItem = $(plugins.mailchimp[i]),
				$email = $mailchimpItem.find('input[type="email"]');

			// Required by MailChimp
			$mailchimpItem.attr('novalidate', 'true');
			$email.attr('name', 'EMAIL');

			$mailchimpItem.on('submit', $.proxy( function ( $email, event ) {
				event.preventDefault();

				var $this = this;

				var data = {},
					url = $this.attr('action').replace('/post?', '/post-json?').concat('&c=?'),
					dataArray = $this.serializeArray(),
					$output = $("#" + $this.attr("data-form-output"));

				for (i = 0; i < dataArray.length; i++) {
					data[dataArray[i].name] = dataArray[i].value;
				}

				$.ajax({
					data: data,
					url: url,
					dataType: 'jsonp',
					error: function (resp, text) {
						$output.html('Server error: ' + text);

						setTimeout(function () {
							$output.removeClass("active");
						}, 4000);
					},
					success: function (resp) {
						$output.html(resp.msg).addClass('active');
						$email[0].value = '';
						var $label = $('[for="'+ $email.attr( 'id' ) +'"]');
						if ( $label.length ) $label.removeClass( 'focus not-empty' );

						setTimeout(function () {
							$output.removeClass("active");
						}, 6000);
					},
					beforeSend: function (data) {
						var isNoviBuilder = window.xMode;

						var isValidated = (function () {
							var results, errors = 0;
							var elements = $this.find('[data-constraints]');
							var captcha = null;
							if (elements.length) {
								for (var j = 0; j < elements.length; j++) {

									var $input = $(elements[j]);
									if ((results = $input.regula('validate')).length) {
										for (var k = 0; k < results.length; k++) {
											errors++;
											$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
										}
									} else {
										$input.siblings(".form-validation").text("").parent().removeClass("has-error")
									}
								}

								if (captcha) {
									if (captcha.length) {
										return validateReCaptcha(captcha) && errors === 0
									}
								}

								return errors === 0;
							}
							return true;
						})();

						// Stop request if builder or inputs are invalide
						if (isNoviBuilder || !isValidated)
							return false;

						$output.html('Submitting...').addClass('active');
					}
				});

				return false;
			}, $mailchimpItem, $email ));
		}
	}


	// Campaign Monitor ajax subscription
	if (plugins.campaignMonitor.length) {
		for (i = 0; i < plugins.campaignMonitor.length; i++) {
			var $campaignItem = $(plugins.campaignMonitor[i]);

			$campaignItem.on('submit', $.proxy(function (e) {
				var data = {},
					url = this.attr('action'),
					dataArray = this.serializeArray(),
					$output = $("#" + plugins.campaignMonitor.attr("data-form-output")),
					$this = $(this);

				for (i = 0; i < dataArray.length; i++) {
					data[dataArray[i].name] = dataArray[i].value;
				}

				$.ajax({
					data: data,
					url: url,
					dataType: 'jsonp',
					error: function (resp, text) {
						$output.html('Server error: ' + text);

						setTimeout(function () {
							$output.removeClass("active");
						}, 4000);
					},
					success: function (resp) {
						$output.html(resp.Message).addClass('active');

						setTimeout(function () {
							$output.removeClass("active");
						}, 6000);
					},
					beforeSend: function (data) {
						// Stop request if builder or inputs are invalide
						if (isNoviBuilder || !isValidated($this.find('[data-constraints]')))
							return false;

						$output.html('Submitting...').addClass('active');
					}
				});

				// Clear inputs after submit
				var inputs = $this[0].getElementsByTagName('input');
				for (var i = 0; i < inputs.length; i++) {
					inputs[i].value = '';
					var label = document.querySelector( '[for="'+ inputs[i].getAttribute( 'id' ) +'"]' );
					if( label ) label.classList.remove( 'focus', 'not-empty' );
				}

				return false;
			}, $campaignItem));
		}
	}


	// RD Mailform
	if (plugins.rdMailForm.length) {
		var i, j, k,
			msg = {
				'MF000': 'Successfully sent!',
				'MF001': 'Recipients are not set!',
				'MF002': 'Form will not work locally!',
				'MF003': 'Please, define email field in your form!',
				'MF004': 'Please, define type of your form!',
				'MF254': 'Something went wrong with PHPMailer!',
				'MF255': 'Aw, snap! Something went wrong.'
			};

		for (i = 0; i < plugins.rdMailForm.length; i++) {
			var $form = $(plugins.rdMailForm[i]),
				formHasCaptcha = false;

			$form.attr('novalidate', 'novalidate').ajaxForm({
				data: {
					"form-type": $form.attr("data-form-type") || "contact",
					"counter": i
				},
				beforeSubmit: function (arr, $form, options) {
					if (isNoviBuilder)
						return;

					var form = $(plugins.rdMailForm[this.extraData.counter]),
						inputs = form.find("[data-constraints]"),
						output = $("#" + form.attr("data-form-output")),
						captcha = form.find('.recaptcha'),
						captchaFlag = true;

					output.removeClass("active error success");

					if (isValidated(inputs, captcha)) {

						// veify reCaptcha
						if (captcha.length) {
							var captchaToken = captcha.find('.g-recaptcha-response').val(),
								captchaMsg = {
									'CPT001': 'Please, setup you "site key" and "secret key" of reCaptcha',
									'CPT002': 'Something wrong with google reCaptcha'
								};

							formHasCaptcha = true;

							$.ajax({
								method: "POST",
								url: "bat/reCaptcha.php",
								data: {'g-recaptcha-response': captchaToken},
								async: false
							})
								.done(function (responceCode) {
									if (responceCode !== 'CPT000') {
										if (output.hasClass("snackbars")) {
											output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + captchaMsg[responceCode] + '</span></p>')

											setTimeout(function () {
												output.removeClass("active");
											}, 3500);

											captchaFlag = false;
										} else {
											output.html(captchaMsg[responceCode]);
										}

										output.addClass("active");
									}
								});
						}

						if (!captchaFlag) {
							return false;
						}

						form.addClass('form-in-process');

						if (output.hasClass("snackbars")) {
							output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>');
							output.addClass("active");
						}
					} else {
						return false;
					}
				},
				error: function (result) {
					if (isNoviBuilder)
						return;

					var output = $("#" + $(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output")),
						form = $(plugins.rdMailForm[this.extraData.counter]);

					output.text(msg[result]);
					form.removeClass('form-in-process');

					if (formHasCaptcha) {
						grecaptcha.reset();
					}
				},
				success: function (result) {
					if (isNoviBuilder)
						return;

					var form = $(plugins.rdMailForm[this.extraData.counter]),
						output = $("#" + form.attr("data-form-output")),
						select = form.find('select');

					form
						.addClass('success')
						.removeClass('form-in-process');

					if (formHasCaptcha) {
						grecaptcha.reset();
					}

					result = result.length === 5 ? result : 'MF255';
					output.text(msg[result]);

					if (result === "MF000") {
						if (output.hasClass("snackbars")) {
							output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + msg[result] + '</span></p>');
						} else {
							output.addClass("active success");
						}
					} else {
						if (output.hasClass("snackbars")) {
							output.html(' <p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' + msg[result] + '</span></p>');
						} else {
							output.addClass("active error");
						}
					}

					form.clearForm();

					if (select.length) {
						select.select2("val", "");
					}

					form.find('input, textarea').trigger('blur');

					setTimeout(function () {
						output.removeClass("active error success");
						form.removeClass('success');
					}, 3500);
				}
			});
		}
	}




  /**
   * Custom Toggles
   */
  if (plugins.customToggle.length) {
    var i;

    for (i = 0; i < plugins.customToggle.length; i++) {
      var $this = $(plugins.customToggle[i]);

      $this.on('click', $.proxy(function (event) {
        event.preventDefault();
        var $ctx = $(this);
        $($ctx.attr('data-custom-toggle')).add(this).toggleClass('active');
      }, $this));

      if ($this.attr("data-custom-toggle-hide-on-blur") === "true") {
        $("body").on("click", $this, function (e) {
          if (e.target !== e.data[0]
            && $(e.data.attr('data-custom-toggle')).find($(e.target)).length
            && e.data.find($(e.target)).length == 0) {
            $(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
          }
        })
      }

      if ($this.attr("data-custom-toggle-disable-on-blur") === "true") {
        $("body").on("click", $this, function (e) {
          if (e.target !== e.data[0] && $(e.data.attr('data-custom-toggle')).find($(e.target)).length == 0 && e.data.find($(e.target)).length == 0) {
            $(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
          }
        })
      }
    }
  }

  /**
   * jQuery Count To
   * @description Enables Count To plugin
   */
  if (plugins.counter.length) {
    var i;

    for (i = 0; i < plugins.counter.length; i++) {
      var $counterNotAnimated = $(plugins.counter[i]).not('.animated');
      $document
        .on("scroll", $.proxy(function () {
          var $this = this;

          if ((!$this.hasClass("animated")) && (isScrolledIntoView($this))) {
            $this.countTo({
              refreshInterval: 40,
              from: 0,
              to: parseInt($this.text(), 10),
              speed: $this.attr("data-speed") || 1000,
              formatter: function (value, options) {
                if ($this.attr('data-zero') == 'true') {
                  value = value.toFixed(options.decimals);
                  if (value < 10) {
                    return '0' + value;
                  }
                  return value;
                } else {
                  return value.toFixed(options.decimals);
                }
              }
            });
            $this.addClass('animated');
          }
        }, $counterNotAnimated))
        .trigger("scroll");
    }
  }

  /**
   * TimeCircles
   * @description  Enable TimeCircles plugin
   */
  if (plugins.dateCountdown.length) {
    var i;
    for (i = 0; i < plugins.dateCountdown.length; i++) {
      var dateCountdownItem = $(plugins.dateCountdown[i]),
        time = {
          "Days": {
            "text": "Days",
            "show": true,
            color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
          },
          "Hours": {
            "text": "Hours",
            "show": true,
            color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
          },
          "Minutes": {
            "text": "Minutes",
            "show": true,
            color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
          },
          "Seconds": {
            "text": "Seconds",
            "show": true,
            color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
          }
        };

      dateCountdownItem.TimeCircles({
        color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "rgba(247, 247, 247, 1)",
        animation: "smooth",
        bg_width: dateCountdownItem.attr("data-bg-width") ? dateCountdownItem.attr("data-bg-width") : 0.6,
        circle_bg_color: dateCountdownItem.attr("data-bg") ? dateCountdownItem.attr("data-bg") : "rgba(0, 0, 0, 1)",
        fg_width: dateCountdownItem.attr("data-width") ? dateCountdownItem.attr("data-width") : 0.03
      });

      $(window).on('load resize orientationchange', function () {
        if (window.innerWidth < 479) {
          dateCountdownItem.TimeCircles({
            time: {
              "Days": {
                "text": "Days",
                "show": true,
                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
              },
              "Hours": {
                "text": "Hours",
                "show": true,
                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
              },
              "Minutes": {
                "text": "Minutes",
                "show": true,
                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
              },
              Seconds: {
                "text": "Seconds",
                show: false,
                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
              }
            }
          }).rebuild();
        } else if (window.innerWidth < 767) {
          dateCountdownItem.TimeCircles({
            time: {
              "Days": {
                "text": "Days",
                "show": true,
                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
              },
              "Hours": {
                "text": "Hours",
                "show": true,
                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
              },
              "Minutes": {
                "text": "Minutes",
                "show": true,
                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
              },
              Seconds: {
                text: '',
                show: false,
                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
              }
            }
          }).rebuild();
        } else {
          dateCountdownItem.TimeCircles({time: time}).rebuild();
        }
      });
    }
  }

  /**
   * Circle Progress
   * @description Enable Circle Progress plugin
   */
  if (plugins.circleProgress.length) {
    var i;
    for (i = 0; i < plugins.circleProgress.length; i++) {
      var circleProgressItem = $(plugins.circleProgress[i]);
      $document
        .on("scroll", function () {
          if (!circleProgressItem.hasClass('animated')) {

            var arrayGradients = circleProgressItem.attr('data-gradient').split(",");

            circleProgressItem.circleProgress({
              value: parseFloat(circleProgressItem.text(), 10),
              size: circleProgressItem.attr('data-size') ? circleProgressItem.attr('data-size') : 140,
              fill: {gradient: arrayGradients, gradientAngle: Math.PI / 4},
              startAngle: -Math.PI / 4 * 2,
              emptyFill: circleProgressItem.attr('data-empty-fill') ? circleProgressItem.attr('data-empty-fill') : "rgb(245,245,245)",
              thickness: circleProgressItem.attr('data-thickness') ? parseInt(circleProgressItem.attr('data-thickness')) : 10,

            }).on('circle-animation-progress', function (event, progress, stepValue) {
              $(this).find('span').text(String(stepValue.toFixed(2)).replace('0.', '').replace('1.', '1'));
            });
            circleProgressItem.addClass('animated');
          }
        })
        .trigger("scroll");
    }
  }

  /**
   * Linear Progress bar
   * @description  Enable progress bar
   */
  if (plugins.progressLinear.length) {
    for (i = 0; i < plugins.progressLinear.length; i++) {
      var progressBar = $(plugins.progressLinear[i]);
      $window
        .on("scroll load", $.proxy(function () {
          var bar = $(this);
          if (!bar.hasClass('animated-first') && isScrolledIntoView(bar)) {
            var end = parseInt($(this).find('.progress-value').text(), 10);
            bar.find('.progress-bar-linear').css({width: end + '%'});
            bar.find('.progress-value').countTo({
              refreshInterval: 40,
              from: 0,
              to: end,
              speed: 500
            });
            bar.addClass('animated-first');
          }
        }, progressBar));
    }
  }

	// Material Parallax
	if (plugins.materialParallax.length) {
		if (!isNoviBuilder && !isIE && !isMobile) {
			plugins.materialParallax.parallax();

			// heavy pages fix
			$window.on('load', function () {
				setTimeout(function () {
					$window.scroll();
				}, 500);
			});
		} else {
			for (var i = 0; i < plugins.materialParallax.length; i++) {
				var parallax = $(plugins.materialParallax[i]),
					imgPath = parallax.data("parallax-img");

				parallax.css({
					"background-image": 'url(' + imgPath + ')',
					"background-size": "cover"
				});
			}
		}
	}


  /**
   * Bootstrap Date time picker
   */
  if (plugins.bootstrapDateTimePicker.length) {
    var i;
    for (i = 0; i < plugins.bootstrapDateTimePicker.length; i++) {
      var $dateTimePicker = $(plugins.bootstrapDateTimePicker[i]);
      var options = {};

      options['format'] = 'dddd DD MMMM YYYY - HH:mm';
      if ($dateTimePicker.attr("data-time-picker") == "date") {
        options['format'] = 'dddd DD MMMM YYYY';
        options['minDate'] = new Date();
      } else if ($dateTimePicker.attr("data-time-picker") == "time") {
        options['format'] = 'HH:mm';
      }

      options["time"] = ($dateTimePicker.attr("data-time-picker") != "date");
      options["date"] = ($dateTimePicker.attr("data-time-picker") != "time");
      options["shortTime"] = true;

      $dateTimePicker.bootstrapMaterialDatePicker(options);
    }
  }
  
  /**
   * jQuery Countdown
   * @description  Enable countdown plugin
   */
  if (plugins.countDown.length) {
    var i;
    for (i = 0; i < plugins.countDown.length; i++) {
      var countDownItem = plugins.countDown[i],
        d = new Date(),
        type = countDownItem.getAttribute('data-type'),
        time = countDownItem.getAttribute('data-time'),
        format = countDownItem.getAttribute('data-format'),
        settings = [];

      d.setTime(Date.parse(time)).toLocaleString();
      settings[type] = d;
      settings['format'] = format;
      $(countDownItem).countdown(settings);
    }
  }

  /**
   * Custom Waypoints
   */
  if (plugins.customWaypoints.length && !isNoviBuilder) {
    initCustomScrollTo(plugins.customWaypoints);
  }


  function initRowEvents(events) {
    if (!events.length) {
      return false;
    }

    for (i = 0; i < events.length; i++) {
      var $event = $(events[i]);

      $event.on('click', i, function (event) {
        var $selectedEvent = $(this),
          hiddenEvents = $selectedEvent.find('.rdc-table_events'),
          ch = hiddenEvents.outerHeight(),
          animationDuration = 330,
          revealOffset = 0,
          eventRow,
          openedEvents = $(".rdc-calendar-event-panel");

        if ($selectedEvent.find('.rdc-table_prev').length || $selectedEvent.find('.rdc-table_next').length) {
          return;
        }

        if ($selectedEvent.hasClass("opened")) {
          eventRow = $('#calendarEvent' + event.data + ' .event-panel');
          eventRow.animate({height: "0"}, animationDuration);

          setTimeout(function () {
            eventRow.parent().remove();
          }, animationDuration);
        } else {
          if (openedEvents.length) {
            openedEvents.animate({height: "0"}, animationDuration);

            $('.rdc-table_has-events.opened').removeClass('opened');

            setTimeout(function () {
              openedEvents.remove();
            }, animationDuration);

            revealOffset = animationDuration * 1.2;
          }
          
         
          setTimeout(function () {
            $selectedEvent.parent().after("<div class='rdc-calendar-event-panel' id='calendarEvent" + event.data + "'><div class='event-panel'></div></div>");
            eventRow = hiddenEvents.clone().appendTo($('#calendarEvent' + event.data + ' .event-panel'));
            ch = eventRow.outerHeight();
            eventRow.parent().css("height", "0");
            eventRow.parent().animate({height: ch + "px"}, animationDuration);
            console.log(ch);
            
          }, revealOffset);
        }

        setTimeout(function () {
          $selectedEvent.toggleClass("opened");
        }, revealOffset);
      });
    }
  }

  function initEventsCounter() {
    var $events = $('.rdc-table_has-events');

    for (var j = 0; j < $events.length; j++) {
      var $currentItem = $($events[j]),
        $eventsCount = $currentItem.find('.rdc-table_events-count');
      $eventsCount.html('<span class="rdc-table_events-count-inner">' + $currentItem.find('ul.rdc-inline-event-list > li').length + ' Available' + '</span>');
    }
  }

  /**
   * RD Calendar
   * @description Enables RD Calendar plugin
   */
  if (plugins.calendar.length) {
    var i;
    for (i = 0; i < plugins.calendar.length; i++) {
      var calendarItem = $(plugins.calendar[i]);

      calendarItem.rdCalendar({
        days: calendarItem.attr("data-days") ? calendarItem.attr("data-days").split(/\s?,\s?/i) : ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        month: calendarItem.attr("data-months") ? calendarItem.attr("data-months").split(/\s?,\s?/i) : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      });

      if (calendarItem.data('events-inline') === true) {
        calendarItem.on('rdc.refresh', function () {
          initRowEvents($('.rdc-table_has-events'));
          initEventsCounter();
        });

        initRowEvents($('.rdc-table_has-events'));
        initEventsCounter();
      }
    }


    $window.on('resize', function () {
      var eventToResize = $('.rdc-calendar-event-panel');

      if (eventToResize.length) {
        var eventInnerRow = eventToResize.find('.event-panel'),
          ch = eventToResize.find('.rdc-table_events').outerHeight();

        eventInnerRow.css({
          height: ch + 'px'
        });
      }
    });
  }

});

