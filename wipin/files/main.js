//loading-page
$(window).on('load', function() {
    $('#fuse-splash-screen').fadeOut(500)
    $("body").addClass('visible')
})


/*========================= Scroll To Top Using Y Practice ==========================*/

let btnUp = document.getElementById("up_btn");

if (btnUp) {
    window.addEventListener("scroll", () => {
        if (window.scrollY >= 600) {
            btnUp.classList.add('fade')
        } else {
            btnUp.classList.remove('fade')
        }
    })
    btnUp.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            right: 0,
            behavior: "smooth"
        });
    })

}



/*========================= lazy laod for background image ==========================*/

var ll = $('.lazy-bg');
var lh = []
var wscroll = 0;
var wh = $(window).height();

function update_offsets() {
    $('.lazy-bg').each(function() {
        var x = $(this).offset().top;
        lh.push(x);
    });
};

function lazy() {
    wscroll = $(window).scrollTop();
    for (i = 0; i < lh.length; i++) {
        if (lh[i] <= wscroll + (wh - 200)) {
            $('.lazy-bg').eq(i).addClass('loaded');
        };
    };
};

// Page Load
update_offsets();
lazy();

$(window).on('scroll', function() {
    lazy();
});

/*=================== testimonials owl carousel ===================*/
$(".testimonials_section .owl-carousel").owlCarousel({
    autoplay: false,
    nav: true,
    dots: false,
    navText: ['<i class="fal fa-chevron-left"></i>', '<i class="fal fa-chevron-right"></i>'],
    loop: true,
    responsive: {
        0: { items: 1 },
        768: { items: 2 }
    }
})


/* ===============================  Animated Reveal  =============================== */

var animateReveal = function() {

    var controller = new ScrollMagic.Controller();

    var greveal = $('.gsap-reveal');

    // gsap reveal
    $('.gsap-reveal').each(function() {
        $(this).append('<span class="cover"></span>');
    });
    if (greveal.length) {
        var revealNum = 0;
        greveal.each(function() {
            var cover = $(this).find('.cover');

            var tl = new TimelineMax();

            setTimeout(function() {
                tl
                    .fromTo(cover, 2, { skewX: 0 }, { xPercent: 101, transformOrigin: "0% 100%", ease: Expo.easeInOut })
            }, revealNum * 0);

            var scene = new ScrollMagic.Scene({
                    triggerElement: this,
                    duration: "0%",
                    reverse: false,
                    offset: "-300%",
                })
                .setTween(tl)
                .addTo(controller);

            revealNum++;

        });
    }

    // gsap reveal hero
    $('.gsap-reveal-hero').each(function() {
        var html = $(this).html();
        $(this).html('<span class="reveal-wrap"><span class="cover"></span><span class="reveal-content">' + html + '</span></span>');
    });
    var grevealhero = $('.gsap-reveal-hero');

    if (grevealhero.length) {
        var heroNum = 0;
        grevealhero.each(function() {

            var cover = $(this).find('.cover'),
                revealContent = $(this).find('.reveal-content');

            var tl2 = new TimelineMax();

            setTimeout(function() {

                tl2
                    .to(cover, 1, {
                        marginLeft: '0',
                        ease: Expo.easeInOut,
                        onComplete() {
                            tl2.set(revealContent, { x: 0 });
                            tl2.to(cover, 1, { marginLeft: '102%', ease: Expo.easeInOut });
                        }
                    })
            }, heroNum * 0);

            var scene = new ScrollMagic.Scene({
                    triggerElement: this,
                    duration: "0%",
                    reverse: false,
                    offset: "-300%",
                })
                .setTween(tl2)
                .addTo(controller);

            heroNum++;
        });
    }

}

animateReveal();

/* ===============================  WOW.js  =============================== */

new WOW().init();


/********************** owl carousel thumb ***********************/

var bigimage = $("#big_image");
var thumbs = $("#thumbs_gallary");
var syncedSecondary = true;

bigimage
    .owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        autoplay: false,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: ['<i class="fal fa-chevron-left" aria-hidden="true"></i>', '<i class="fal fa-chevron-right" aria-hidden="true"></i>'],
    })
    .on("changed.owl.carousel", syncPosition);

thumbs
    .on("initialized.owl.carousel", function() {
        thumbs
            .find(".owl-item")
            .eq(0)
            .addClass("current");
    })
    .owlCarousel({
        items: 4,
        dots: false,
        nav: false,
        navText: ['<i class="fal fa-chevron-left" aria-hidden="true"></i>', '<i class="fal fa-chevron-right" aria-hidden="true"></i>'],
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: 2,
        responsiveRefreshRate: 100
    })
    .on("changed.owl.carousel", syncPosition2);

function syncPosition(el) {
    //if loop is set to false, then you have to uncomment the next line
    //var current = el.item.index;

    //to disable loop, comment this block
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

    if (current < 0) {
        current = count;
    }
    if (current > count) {
        current = 0;
    }
    //to this
    thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
    var onscreen = thumbs.find(".owl-item.active").length - 1;
    var start = thumbs
        .find(".owl-item.active")
        .first()
        .index();
    var end = thumbs
        .find(".owl-item.active")
        .last()
        .index();

    if (current > end) {
        thumbs.data("owl.carousel").to(current, 100, true);
    }
    if (current < start) {
        thumbs.data("owl.carousel").to(current - onscreen, 100, true);
    }
}

function syncPosition2(el) {
    if (syncedSecondary) {
        var number = el.item.index;
        bigimage.data("owl.carousel").to(number, 100, true);
    }
}

thumbs.on("click", ".owl-item", function(e) {
    e.preventDefault();
    var number = $(this).index();
    bigimage.data("owl.carousel").to(number, 300, true);
});


$(".dropdown-link").on('click', function() {
    $(this).find(".dropdown-list").toggleClass('show')
})

$("body").on('click', function() {
    $(".dropdown-list").removeClass('show')
})

$(".dropdown-list, .dropdown-link").on('click', function(e) {
    e.stopPropagation();
})


//mobile menu display
$('.toggle-menu-icon').on('click', function() {
    $("body").addClass('mobile-nav-on')
})
$(document).on('click', '.mobile-navigation #close-menu-moblie a', function() {
    $('body').removeClass('mobile-nav-on');
});
$(document).on('click', '.toggle-menu, .mobile-menu-overlay', function() {
    $('body').toggleClass('mobile-nav-on');
});

// Hide cart side content 
$(document).on('click', '.toggle-cartside', function() {
    $('.cart-side-content').toggleClass('opened');
});



/* ===============================  show password =============================== */
$(".toggle-password").click(function() {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});

$('#datetimepicker1 input').click(function(event) {
    $('#datetimepicker1 ').data("DateTimePicker").show();
});

$(".date-input").on('change', function() {
    $(this).next().text($(this).val())
})