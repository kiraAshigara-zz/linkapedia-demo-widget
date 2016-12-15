(function () {

    String.prototype.contains = function (text) {
        return this.toLowerCase().indexOf(text.toLowerCase()) !== -1;
    };

    $('.icon-com-linkapedia-widget-topics').click(function () {
        $('.screen').css('overflow', 'hidden');
        $('.com-linkapedia-widget-topics').css('display', 'block');

        $.each($('.com-linkapedia-widget-topics'), function (i, iframe) {
            iframe.contentWindow.postMessage("openDocuments", "*");
        });
    });

    window.addEventListener('message', function (event) {
        if (event.origin.contains("localhost") || event.origin.contains("linkapedia.com")) {
            if (event.data === "closeDocuments") {
                $('.com-linkapedia-widget-topics').hide();
                $('.screen').css('overflow', 'auto');
            }
        } else {
            return;
        }
    }, false);

})();