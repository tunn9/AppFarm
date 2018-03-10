/**
 * Debug Class
 * Wrapper of Console log
 * @author FPT Software
 */

var debug = {
    DEBUG_MODE: true,
    APP_TAG: 'myApp',

    /**
     * Print log with 2 styles
     * - One argument. Example: log('Message content');
     * - Two arguments. Example: log(TAG, 'Message content');
     */
    log: function() {
        if (debug.DEBUG_MODE) {
            var message = arguments[0];
            if (arguments.length === 2) {
                message += '#' + arguments[1];
            }
            if (typeof(message) === 'object') {
                console.log(message);
            }else{
                console.log(message);
            }

        }
    },
    error: function() {
        var message = arguments[0];
        if (arguments.length === 2) {
            message += '#' + arguments[1];
        }
        if (typeof(message) === 'object') {
            console.error(message);
        }
    }
};


var loadingPage = {

    showPageLoading: function (Element) {

        var html = '<div class="loading-page-wapper dialog-overlay"></div>';
        Element.append(html).find('.loading-page-wapper').animate({
            opacity: 1
        },100);
    },
    hidePageLoading: function () {
        $('.loading-page-wapper').remove();
    },
    hide: function () {
        $('.loading-page').animate({
            opacity: 0
        },300, function () {
            $('.loading-page').remove();
        })
    }

};

var network = {

    check: function () {
        return window.navigator.onLine;
    },
    errorMessage: function () {
        var param = {
            title: 'Alert',
            msg: messages.network
        };
        $.Alert(param);
    }

};



