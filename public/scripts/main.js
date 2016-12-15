String.prototype.format = function () {
    var a = this, b, c = arguments.length;
    for (b = 0; b < c; b++)
        a = a.replace(new RegExp("\\{" + b + "\\}", "gi"), arguments[b]);
    return a
};

$(document).ready(function () {
    $(".button-collapse").sideNav();

    $(".img-mobile-landscape,.img-tablet-landscape").click(function (ev) {
        ev.preventDefault();
        $("#mobile-preview,#tablet-preview").toggleClass("landscape");
        $('.img-mobile-landscape,.img-tablet-landscape').attr('show-device', ($(this).attr('show-device') === 'portrait' ? 'landscape' : 'portrait'));

        var page = $(this).data('page');
        var showDevice = $(this).attr('show-device');

        $('#mobile-preview .preview-documents').attr('src', Config.mobile.format(Config.blog_active, showDevice, page.number));
        $('#tablet-preview .preview-documents').attr('src', Config.tablet.format(Config.blog_active, showDevice, page.number));
    });

    $(".img-desktop").click(function (ev) {
        ev.preventDefault();
        var context = $('#content').attr('context');
        var parent = $('#content-data');

        $(".img-mobile, .img-tablet").removeClass("device-active");
        $(this).addClass("device-active");

        parent.find("#mobile-container, #tablet-container").hide();
        parent.find("#desktop-container").show();
    });

    $(".img-tablet").click(function (ev) {
        ev.preventDefault();
        var context = $('#content').attr('context');
        var parent = $('#content-data');

        $(".img-desktop, .img-mobile").removeClass("device-active");
        $(this).addClass("device-active");

        parent.find("#desktop-container, #mobile-container").hide();
        parent.find("#tablet-container").show();
    });

    $(".img-mobile").click(function (ev) {
        ev.preventDefault();
        var context = $('#content').attr('context');
        var parent = $('#content-data');

        $(".img-desktop, .img-tablet ").removeClass("device-active");
        $(this).addClass("device-active");

        parent.find("#desktop-container, #tablet-container").hide();
        parent.find("#mobile-container").show();
    });

    $(window).resize(function () {
        if (this.resizeTO)
            clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function () {
            $(this).trigger('resizeEnd');
        }, 500);
    });

    $(window).bind('resizeEnd', function () {
        if (window.matchMedia('(max-width: 1024px)').matches) {
            $(".img-mobile").trigger("click");
        }
    });

    $("#menu-side-nav-linkapedia").click(function () {
        var i = setInterval(function () {
            var opacity = $("#sidenav-overlay").css("opacity");
            if (opacity === "1") {
                $("#slide-out").attr("style", "transform: translateX(0) !important;");
                clearInterval(i);
            }
        }, 100);
    });

    $("body").on("click", "#sidenav-overlay", function () {
        $(window).trigger("resize");
    });

    var blogActive = Config.blogs[Config.blog_active];

    $('.blog-name').text(blogActive.name);

    var liDOM;

    $.each(blogActive.pages, function (i, page) {
        liDOM = $('<li>{0}</li>'.format(page.name));
        page.number = i + 1;
        liDOM.data('page', page);

        $('.list-pages').append(liDOM);
    });

    $('.list-pages li').click(function () {
        var page = $(this).data('page');
        var showDevice = $($('[show-device]')[0]).attr('show-device');
        $('[show-device]').data('page', page);

        $('#mobile-preview .preview-documents').attr('src', Config.mobile.format(Config.blog_active, showDevice, page.number));
        $('#tablet-preview .preview-documents').attr('src', Config.tablet.format(Config.blog_active, showDevice, page.number));
        $('#desktop-preview .preview-documents').attr('src', Config.desktop.format(Config.blog_active, page.number));

        $('.com-linkapedia-widget-topics').attr('src', Config.documents_relateds.format(Config.blog_active, page.doc));
        $('.icon-com-linkapedia-widget-topics').show();

        $('.com-linkapedia-widget-topics').hide();
        $('.screen').css('overflow', 'auto');
    });
});

