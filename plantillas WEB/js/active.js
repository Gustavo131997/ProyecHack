var mr_firstSectionHeight,
    mr_nav,
    mr_navOuterHeight,
    mr_navScrolled = false,
    mr_navFixed = false,
    mr_outOfSight = false,
    mr_floatingProjectSections,
    mr_scrollTop = 0;
(function($) {
    "use strict"; // Start of use strict


    /* ---------------------------------------------
     Scripts initialization
     --------------------------------------------- */

    $(window).load(function() {

        // Page loader

        $("body").imagesLoaded(function() {
            $(".page-loader div").fadeOut();
            $(".page-loader").delay(200).fadeOut("slow");
        });



        // init_scroll_navigate();

        $(window).trigger("scroll");
        $(window).trigger("resize");

        // Hash menu forwarding
        if ((window.location.hash) && ($(window.location.hash).length)) {
            var hash_offset = $(window.location.hash).offset().top;
            $("html, body").animate({
                scrollTop: hash_offset
            });
        }

        mr_firstSectionHeight = $('.main-container section:nth-of-type(1)').outerHeight(true);

    });

    $(document).ready(function() {

        $(window).trigger("resize");
        // initialize all functions
        init_lightbox();
        init_parallax();
        init_shortcodes();
        init_tooltips();
        init_counters();
        init_team();
        initPageSliders();
        initWorkFilter();
        init_map();
        init_wow();
        init_masonry();

        // Smooth scroll to inner links

        $('.inner-link').each(function() {
            var href = $(this).attr('href');
            if (href.charAt(0) !== "#") {
                $(this).removeClass('inner-link');
            }
        });

        if ($('.inner-link').length) {
            $('.inner-link').smoothScroll({
                offset: 0,
                speed: 800
            });
        }

        // ajax mail Chimp
        $('#start-mc-form').ajaxChimp({
            language: 'tr98',
            // Replace this with your own mailchimp post URL
            url: 'http://hasib-rahman.us8.list-manage2.com/subscribe/post?u=74e8ba57153fb3b7bae403d34&id=514058c103'
        });


        // Mailchimp translation
        //
        // Defaults:
        //'submit': 'Submitting...',
        //  0: 'We have sent you a confirmation email',
        //  1: 'Please enter a value',
        //  2: 'An email address must contain a single @',
        //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
        //  4: 'The username portion of the email address is invalid (the portion before the @: )',
        //  5: 'This email address looks fake or invalid. Please enter a real email address'

        $.ajaxChimp.translations.tr98 = {
            'submit': 'Submitting...',
            0: '<p> We will be in touch soon!</p>',
            1: '<p> Please enter a value.</p>',
            2: '<p> E-mail address is not valid.</p>',
            3: '<p> E-mail address is not valid.</p>',
            4: '<p> E-mail address is not valid.</p>',
            5: '<p> E-mail address is not valid.</p>'
        };

        // Update scroll variable for scrolling functions

        addEventListener('scroll', function() {
            mr_scrollTop = window.pageYOffset;
        }, false);


        // Navigation

        if (!$('nav').hasClass('fixed') && !$('nav').hasClass('absolute')) {

            // Make nav container height of nav

            $('.nav-container').css('min-height', $('nav').outerHeight(true));

            $(window).resize(function() {
                $('.nav-container').css('min-height', $('nav').outerHeight(true));
            });

            // Compensate the height of parallax element for inline nav

            if ($(window).width() > 768) {
                $('.parallax:nth-of-type(1) .background-image-holder').css('top', -($('nav').outerHeight(true)));
            }

            // Adjust fullscreen elements

            if ($(window).width() > 768) {
                $('section.fullscreen:nth-of-type(1)').css('height', ($(window).height() - $('nav').outerHeight(true)));
            }

        } else {
            $('body').addClass('nav-is-overlay');
        }

        if ($('nav').hasClass('bg-dark')) {
            $('.nav-container').addClass('bg-dark');
        }


        // Fix nav to top while scrolling

        mr_nav = $('body .nav-container nav:first');
        mr_navOuterHeight = $('body .nav-container nav:first').outerHeight();
        window.addEventListener("scroll", updateNav, false);

        // Menu dropdown positioning

        $('.menu > li > ul').each(function() {
            var menu = $(this).offset();
            var farRight = menu.left + $(this).outerWidth(true);
            if (farRight > $(window).width() && !$(this).hasClass('mega-menu')) {
                $(this).addClass('make-right');
            } else if (farRight > $(window).width() && $(this).hasClass('mega-menu')) {
                var isOnScreen = $(window).width() - menu.left;
                var difference = $(this).outerWidth(true) - isOnScreen;
                $(this).css('margin-left', -(difference));
            }
        });

        // Mobile Menu

        $('.mobile-toggle').on('click', function() {
            $('.nav-bar').toggleClass('nav-open');
            $(this).toggleClass('active');
        });

        $('.menu li').on('click', function(e) {
            if (!e) e = window.event;
            e.stopPropagation();
            if ($(this).find('ul').length) {
                $(this).toggleClass('toggle-sub');
            } else {
                $(this).parents('.toggle-sub').removeClass('toggle-sub');
            }
        });

        $('.module.widget-handle').on('click', function() {
            $(this).toggleClass('toggle-widget-handle');
        });

        $('.search-widget-handle .search-form input').on('click', function(e) {
            if (!e) e = window.event;
            e.stopPropagation();
        });

        // Offscreen Nav

        if ($('.offscreen-toggle').length) {
            $('body').addClass('has-offscreen-nav');
        } else {
            $('body').removeClass('has-offscreen-nav');
        }

        $('.offscreen-toggle').on('click', function() {
            $('.main-container').toggleClass('reveal-nav');
            $('nav').toggleClass('reveal-nav');
            $('.offscreen-container').toggleClass('reveal-nav');
        });

        $('.main-container').on('click', function() {
            if ($(this).hasClass('reveal-nav')) {
                $(this).removeClass('reveal-nav');
                $('.offscreen-container').removeClass('reveal-nav');
                $('nav').removeClass('reveal-nav');
            }
        });

        $('.offscreen-container a').on('click', function() {
            $('.offscreen-container').removeClass('reveal-nav');
            $('.main-container').removeClass('reveal-nav');
            $('nav').removeClass('reveal-nav');
        });
    });

    $(window).resize(function() {
        js_height_init();

    });


    /* --------------------------------------------
     Platform detect
     --------------------------------------------- */
    var mobileTest;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobileTest = true;
        $("html").addClass("mobile");
    } else {
        mobileTest = false;
        $("html").addClass("no-mobile");
    }

    var mozillaTest;
    if (/mozilla/.test(navigator.userAgent)) {
        mozillaTest = true;
    } else {
        mozillaTest = false;
    }
    var safariTest;
    if (/safari/.test(navigator.userAgent)) {
        safariTest = true;
    } else {
        safariTest = false;
    }

    // Detect touch devices    
    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
    }


    /* ---------------------------------------------
     Sections helpers
     --------------------------------------------- */

    // Sections backgrounds

    var pageSection = $(".home-section, .page-section, .small-section, .split-section, .bg-img");
    pageSection.each(function(indx) {

        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

    // Function for block height 100%
    function height_line(height_object, height_donor) {
        height_object.height(height_donor.height());
        height_object.css({
            "line-height": height_donor.height() + "px"
        });
    }


    // Progress bars
    var progressBar = $(".progress-bar");
    progressBar.each(function(indx) {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
    });




    function updateNav() {

        var scrollY = mr_scrollTop;

        if (scrollY <= 0) {
            if (mr_navFixed) {
                mr_navFixed = false;
                mr_nav.removeClass('fixed');
            }
            if (mr_outOfSight) {
                mr_outOfSight = false;
                mr_nav.removeClass('outOfSight');
            }
            if (mr_navScrolled) {
                mr_navScrolled = false;
                mr_nav.removeClass('scrolled');
            }
            return;
        }

        if (scrollY > mr_firstSectionHeight) {
            if (!mr_navScrolled) {
                mr_nav.addClass('scrolled');
                mr_navScrolled = true;
                return;
            }
        } else {
            if (scrollY > mr_navOuterHeight) {
                if (!mr_navFixed) {
                    mr_nav.addClass('fixed');
                    mr_navFixed = true;
                }

                if (scrollY > mr_navOuterHeight * 2) {
                    if (!mr_outOfSight) {
                        mr_nav.addClass('outOfSight');
                        mr_outOfSight = true;
                    }
                } else {
                    if (mr_outOfSight) {
                        mr_outOfSight = false;
                        mr_nav.removeClass('outOfSight');
                    }
                }
            } else {
                if (mr_navFixed) {
                    mr_navFixed = false;
                    mr_nav.removeClass('fixed');
                }
                if (mr_outOfSight) {
                    mr_outOfSight = false;
                    mr_nav.removeClass('outOfSight');
                }
            }

            if (mr_navScrolled) {
                mr_navScrolled = false;
                mr_nav.removeClass('scrolled');
            }

        }
    }


    function updateFloatingFilters() {
        var l = mr_floatingProjectSections.length;
        while (l--) {
            var section = mr_floatingProjectSections[l];

            if ((section.elemTop < mr_scrollTop) && typeof window.mr_variant == "undefined") {
                section.filters.css({
                    position: 'fixed',
                    top: '16px',
                    bottom: 'auto'
                });
                if (mr_navScrolled) {
                    section.filters.css({
                        transform: 'translate3d(-50%,48px,0)'
                    });
                }
                if (mr_scrollTop > (section.elemBottom - 70)) {
                    section.filters.css({
                        position: 'absolute',
                        bottom: '16px',
                        top: 'auto'
                    });
                    section.filters.css({
                        transform: 'translate3d(-50%,0,0)'
                    });
                }
            } else {
                section.filters.css({
                    position: 'absolute',
                    transform: 'translate3d(-50%,0,0)'
                });
            }
        }
    }



    /* ---------------------------------------------
     Lightboxes
     --------------------------------------------- */

    function init_lightbox() {

        // Works Item Lightbox              
        $(".work-lightbox-link").magnificPopup({
            gallery: {
                enabled: true
            },
            mainClass: "mfp-fade"
        });

        // Works Item Lightbox  
        $(".lightbox-gallery-1").magnificPopup({
            gallery: {
                enabled: true
            }
        });

        // Other Custom Lightbox
        $(".lightbox-gallery-2").magnificPopup({
            gallery: {
                enabled: true
            }
        });
        $(".lightbox-gallery-3").magnificPopup({
            gallery: {
                enabled: true
            }
        });
        $(".lightbox").magnificPopup();

    }



    /* -------------------------------------------
     Parallax
     --------------------------------------------- */

    function init_parallax() {

        // Parallax        
        if (($(window).width() >= 1024) && (mobileTest === false)) {
            $(".parallax-1").parallax("50%", 0.1);
            $(".parallax-2").parallax("50%", 0.2);
            $(".parallax-3").parallax("50%", 0.3);
            $(".parallax-4").parallax("50%", 0.4);
            $(".parallax-5").parallax("50%", 0.5);
            $(".parallax-6").parallax("50%", 0.6);
            $(".parallax-7").parallax("50%", 0.7);
            $(".parallax-8").parallax("50%", 0.5);
            $(".parallax-9").parallax("50%", 0.5);
            $(".parallax-10").parallax("50%", 0.5);
            $(".parallax-11").parallax("50%", 0.05);
        }

    }



    /* ---------------------------------------------
     Shortcodes
     --------------------------------------------- */
    // Tabs minimal 
    function init_shortcodes() {

        var tpl_tab_height;
        $(".tpl-minimal-tabs > li > a").on('click', function() {

            if (!($(this).parent("li").hasClass("active"))) {
                tpl_tab_height = $(".tpl-minimal-tabs-cont > .tab-pane").filter($(this).attr("href")).height();
                $(".tpl-minimal-tabs-cont").animate({
                    height: tpl_tab_height
                }, function() {
                    $(".tpl-minimal-tabs-cont").css("height", "auto");
                });

            }

        });

        // Accordion
        var allPanels = $(".accordion > dd").hide();
        allPanels.first().slideDown("easeOutExpo");
        $(".accordion > dt > a").first().addClass("active");

        $(".accordion > dt > a").on('click', function() {

            var current = $(this).parent().next("dd");
            $(".accordion > dt > a").removeClass("active");
            $(this).addClass("active");
            allPanels.not(current).slideUp("easeInExpo");
            $(this).parent().next().slideDown("easeOutExpo");

            return false;

        });

        // Toggle
        var allToggles = $(".toggle > dd").hide();

        $(".toggle > dt > a").on('click', function() {

            if ($(this).hasClass("active")) {

                $(this).parent().next().slideUp("easeOutExpo");
                $(this).removeClass("active");

            } else {
                var current = $(this).parent().next("dd");
                $(this).addClass("active");
                $(this).parent().next().slideDown("easeOutExpo");
            }

            return false;
        });

        // Responsive video
        $(".video, .resp-media, .blog-media").fitVids();
        $(".work-full-media").fitVids();

    }



    /* ---------------------------------------------
     Tooltips (bootstrap plugin activated)
     --------------------------------------------- */

    function init_tooltips() {

        $(".tooltip-bot, .tooltip-bot a, .nav-social-links a").tooltip({
            placement: "bottom"
        });

        $(".tooltip-top, .tooltip-top a").tooltip({
            placement: "top"
        });

    }



    /* ---------------------------------------------
     Fun Facts section
     --------------------------------------------- */

    function init_counters() {
        $(".count-number").appear(function() {
            var count = $(this);
            count.countTo({
                from: 0,
                to: count.html(),
                speed: 1300,
                refreshInterval: 60,
            });

        });
    }




    /* ---------------------------------------------
     Team
     --------------------------------------------- */

    function init_team() {

        // Hover        
        $(".team-item").on('click', function() {
            if ($("html").hasClass("mobile")) {
                $(this).toggleClass("js-active");
            }
        });

    }


    /* ---------------------------------------------
     Sliders
     --------------------------------------------- */
    function initPageSliders() {

        // Fullwidth slider
        $(".fullwidth-slider").owlCarousel({
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        // Fullwidth slider
        $(".fullwidth-slider-fade").owlCarousel({
            transitionStyle: "fadeUp",
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        // Fullwidth gallery
        $(".fullwidth-gallery").owlCarousel({
            transitionStyle: "fade",
            autoPlay: 5000,
            slideSpeed: 700,
            singleItem: true,
            autoHeight: true,
            navigation: false,
            pagination: false
        });

        // Item carousel
        $(".item-carousel").owlCarousel({
            autoPlay: 2500,
            //stopOnHover: true,
            items: 3,
            itemsDesktop: [1199, 3],
            itemsTabletSmall: [768, 3],
            itemsMobile: [480, 1],
            navigation: false,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        // Item carousel
        $(".small-item-carousel").owlCarousel({
            autoPlay: 2500,
            stopOnHover: true,
            items: 6,
            itemsDesktop: [1199, 4],
            itemsTabletSmall: [768, 3],
            itemsMobile: [480, 2],
            pagination: false,
            navigation: false,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        // Single carousel
        $(".single-carousel").owlCarousel({
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        // Content Slider
        $(".content-slider").owlCarousel({
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        // portfolio slider
        $("#portfolio-carousel").owlCarousel({
            autoPlay: 3000, //Set AutoPlay to 3 seconds
            items: 3,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 3],
            navigation: true,
            pagination: false,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]

        });

        // Photo slider
        $(".photo-slider").owlCarousel({
            slideSpeed: 350,
            items: 4,
            itemsDesktop: [1199, 4],
            itemsTabletSmall: [768, 2],
            itemsMobile: [480, 1],
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        // Work slider
        $(".work-full-slider").owlCarousel({
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        // Blog posts carousel
        $(".blog-posts-carousel").owlCarousel({
            autoPlay: 5000,
            stopOnHover: true,
            items: 3,
            itemsDesktop: [1199, 3],
            itemsTabletSmall: [768, 2],
            itemsMobile: [480, 1],
            pagination: false,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        // Blog posts carousel alt
        $(".blog-posts-carousel-alt").owlCarousel({
            autoPlay: 3500,
            stopOnHover: true,
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            pagination: false,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        // Image carousel
        $(".image-carousel").owlCarousel({
            autoPlay: 5000,
            stopOnHover: true,
            items: 4,
            itemsDesktop: [1199, 3],
            itemsTabletSmall: [768, 2],
            itemsMobile: [480, 1],
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        // Fullwidth slideshow

        var sync1 = $(".fullwidth-slideshow");
        var sync2 = $(".fullwidth-slideshow-pager");

        $(".fullwidth-slideshow").owlCarousel({
            autoPlay: 5000,
            stopOnHover: true,
            transitionStyle: "fade",
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            pagination: false,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            afterAction: syncPosition,
            responsiveRefreshRate: 200
        });
        $(".fullwidth-slideshow-pager").owlCarousel({
            autoPlay: 5000,
            stopOnHover: true,
            items: 8,
            itemsDesktop: [1199, 8],
            itemsDesktopSmall: [979, 7],
            itemsTablet: [768, 6],
            itemsMobile: [480, 4],
            autoHeight: true,
            pagination: false,
            navigation: false,
            responsiveRefreshRate: 100,
            afterInit: function(el) {
                el.find(".owl-item").eq(0).addClass("synced");
            }
        });

        function syncPosition(el) {
            var current = this.currentItem;
            $(".fullwidth-slideshow-pager").find(".owl-item").removeClass("synced").eq(current).addClass("synced");
            if ($(".fullwidth-slideshow-pager").data("owlCarousel") !== undefined) {
                center(current);
            }
        }

        $(".fullwidth-slideshow-pager").on("click", ".owl-item", function(e) {
            e.preventDefault();
            var number = $(this).data("owlItem");
            sync1.trigger("owl.goTo", number);
        });

        function center(number) {
            var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
            var num = number;
            var found = false;
            for (var i in sync2visible) {
                if (num === sync2visible[i]) {
                    var found = true;
                }
            }
            if (found === false) {
                if (num > sync2visible[sync2visible.length - 1]) {
                    sync2.trigger("owl.goTo", num - sync2visible.length + 2);
                } else {
                    if (num - 1 === -1) {
                        num = 0;
                    }
                    sync2.trigger("owl.goTo", num);
                }
            } else
            if (num === sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", sync2visible[1]);
            } else
            if (num === sync2visible[0]) {
                sync2.trigger("owl.goTo", num - 1);
            }
        }

        var owl = $(".fullwidth-slideshow").data("owlCarousel");

        $(document.documentElement).keyup(function(event) {
            // handle cursor keys
            if (event.keyCode == 37) {
                owl.prev();
            } else
            if (event.keyCode == 39) {
                owl.next();
            }
        });

        if ($(".owl-carousel").length) {
            var owl = $(".owl-carousel").data('owlCarousel');
            owl.reinit();
        }
    }


    /* ---------------------------------------------
         Fullscreen menu
       --------------------------------------------- */

    var fm_menu_wrap = $("#fullscreen-menu");
    var fm_menu_button = $(".fm-button");

    function init_fullscreen_menu() {

        fm_menu_button.on('click', function() {

            if ($(this).hasClass("animation-process")) {
                return false;
            } else {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active").css("z-index", "2001").addClass("animation-process");

                    fm_menu_wrap.find(".fm-wrapper-sub").fadeOut("fast", function() {
                        fm_menu_wrap.fadeOut(function() {
                            fm_menu_wrap.find(".fm-wrapper-sub").removeClass("js-active").show();
                            fm_menu_button.css("z-index", "1030").removeClass("animation-process");

                        });
                    });

                    if ($(".owl-carousel").lenth) {
                        $(".owl-carousel").data("owlCarousel").play();
                    }

                } else {
                    if ($(".owl-carousel").lenth) {
                        $(".owl-carousel").data("owlCarousel").stop();
                    }
                    $(this).addClass("active").css("z-index", "2001").addClass("animation-process");

                    fm_menu_wrap.fadeIn(function() {
                        fm_menu_wrap.find(".fm-wrapper-sub").addClass("js-active");
                        fm_menu_button.removeClass("animation-process");
                    });
                }

                return false;
            }

        });

        $("#fullscreen-menu").find("a:not(.fm-has-sub)").on('click', function() {

            if (fm_menu_button.hasClass("animation-process")) {
                return false;
            } else {
                fm_menu_button.removeClass("active").css("z-index", "2001").addClass("animation-process");

                fm_menu_wrap.find(".fm-wrapper-sub").fadeOut("fast", function() {
                    fm_menu_wrap.fadeOut(function() {
                        fm_menu_wrap.find(".fm-wrapper-sub").removeClass("js-active").show();
                        fm_menu_button.css("z-index", "1030").removeClass("animation-process");

                    });
                });

                if ($(".owl-carousel").lenth) {
                    $(".owl-carousel").data("owlCarousel").play();
                }
            }
        });

        // Sub menu

        var fmHasSub = $(".fm-has-sub");
        var fmThisLi;

        fmHasSub.on('click', function() {

            fmThisLi = $(this).parent("li:first");
            if (fmThisLi.hasClass("js-opened")) {
                fmThisLi.find(".fm-sub:first").slideUp(function() {
                    fmThisLi.removeClass("js-opened");
                    fmThisLi.find(".fm-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
                });
            } else {
                $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
                fmThisLi.addClass("js-opened");
                fmThisLi.find(".fm-sub:first").slideDown();
            }

            return false;

        });

    }




    /* ---------------------------------------------
     Portfolio section
     --------------------------------------------- */

    // Projects filtering
    var fselector = 0;
    var work_grid = $("#start-works-grid");

    function initWorkFilter() {
        var isotope_mode;
        if (work_grid.hasClass("masonry")) {
            isotope_mode = "masonry";
        } else {
            isotope_mode = "fitRows";
        }
        work_grid.imagesLoaded(function() {
            work_grid.isotope({
                itemSelector: '.start-work-item',
                layoutMode: isotope_mode,
                filter: fselector
            });
        });

        $(".start-portfolio-filter > li > a").on('click', function() {
            $(".start-portfolio-filter > li > a").removeClass("active");
            $(this).addClass("active");
            fselector = $(this).attr('data-filter');

            work_grid.isotope({
                itemSelector: '.start-work-item',
                layoutMode: isotope_mode,
                filter: fselector
            });
            return false;
        });
    }




    /* ---------------------------------------------
     Height 100%
     --------------------------------------------- */
    function js_height_init() {
        $(".js-height-full").height($(window).height());
        $(".js-height-parent").each(function() {
            $(this).height($(this).parent().first().height());
        });
    }




    /* ---------------------------------------------
     Google map
     --------------------------------------------- */

    var gmMapDiv = $("#map-canvas");

    function init_map() {

        $(".map-section").on('click', function() {
            $(this).toggleClass("js-active");
            $(this).find(".mt-open").toggle();
            $(this).find(".mt-close").toggle();
        });


        if (gmMapDiv.length) {

            var gmCenterAddress = gmMapDiv.attr("data-address");
            var gmMarkerAddress = gmMapDiv.attr("data-address");


            gmMapDiv.gmap3({
                action: "init",
                marker: {
                    address: gmMarkerAddress,
                    options: {
                        icon: "images/map-marker.png"
                    }
                },
                map: {
                    options: {
                        zoom: 14,
                        zoomControl: true,
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.SMALL
                        },
                        mapTypeControl: false,
                        scaleControl: false,
                        scrollwheel: false,
                        streetViewControl: false,
                        draggable: true,
                        styles: [{
                            "featureType": "water",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "#d3d3d3"
                            }]
                        }, {
                            "featureType": "transit",
                            "stylers": [{
                                "color": "#808080"
                            }, {
                                "visibility": "off"
                            }]
                        }, {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                "visibility": "on"
                            }, {
                                "color": "#b3b3b3"
                            }]
                        }, {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "#ffffff"
                            }]
                        }, {
                            "featureType": "road.local",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "visibility": "on"
                            }, {
                                "color": "#ffffff"
                            }, {
                                "weight": 1.8
                            }]
                        }, {
                            "featureType": "road.local",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                "color": "#d7d7d7"
                            }]
                        }, {
                            "featureType": "poi",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "visibility": "on"
                            }, {
                                "color": "#ebebeb"
                            }]
                        }, {
                            "featureType": "administrative",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#a7a7a7"
                            }]
                        }, {
                            "featureType": "road.arterial",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "#ffffff"
                            }]
                        }, {
                            "featureType": "road.arterial",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "#ffffff"
                            }]
                        }, {
                            "featureType": "landscape",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "visibility": "on"
                            }, {
                                "color": "#efefef"
                            }]
                        }, {
                            "featureType": "road",
                            "elementType": "labels.text.fill",
                            "stylers": [{
                                "color": "#696969"
                            }]
                        }, {
                            "featureType": "administrative",
                            "elementType": "labels.text.fill",
                            "stylers": [{
                                "visibility": "on"
                            }, {
                                "color": "#737373"
                            }]
                        }, {
                            "featureType": "poi",
                            "elementType": "labels.icon",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        }, {
                            "featureType": "poi",
                            "elementType": "labels",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        }, {
                            "featureType": "road.arterial",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                "color": "#d6d6d6"
                            }]
                        }, {
                            "featureType": "road",
                            "elementType": "labels.icon",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        }, {}, {
                            "featureType": "poi",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "#dadada"
                            }]
                        }]
                    }
                }
            });
        }
    }


    /* ---------------------------------------------
     WOW animations
     --------------------------------------------- */

    function init_wow() {

        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 90,
            mobile: false,
            live: true
        });

        if ($("body").hasClass("appear-animate")) {
            wow.init();
        }
    }


    /* ---------------------------------------------
     Masonry
     --------------------------------------------- */

    function init_masonry() {

        $(".masonry").imagesLoaded(function() {
            $(".masonry").masonry();
        });
    }

})(jQuery); // End of use strict