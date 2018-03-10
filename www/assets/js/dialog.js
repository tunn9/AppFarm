/**
 * Created by TuNN9 on 2/10/2017.
 */
(function ($) {

    var dialog = {

        // var settings
        container: null,
        type: null,
        icon: null,
        title: null,
        msg: null,
        placeholder: null,
        textAlign: null,
        buttonCancelName: null,
        buttonSuccessName: null,
        loadingStatus: null,


        // var Dom
        popupID: null,
        popupOverlayID: null,
        textareaID: null,
        flagStatus: {
            'show': true,
            'hide': false
        },

        // var button
        buttonControl: {
            'loading': null,
            'cancel': null,
            'action': null
        },

        // var type
        result: true,

        /*
         * Method init
         * @type: type for dialog
         * @setting: variable type object
         * @callback: function callback
         *
         */
        init: function (type, settings, callback) {

            // set value for variable
            dialog.type         =   type;
            dialog.container    =   settings.container ? settings.container : $('body');
            dialog.icon         =   settings.icon ? settings.icon : '';
            dialog.title        =   settings.title ? settings.title : '';
            dialog.msg          =   settings.msg ? settings.msg : '';
            dialog.placeholder  =   settings.placeholder ? settings.placeholder : '';
            dialog.textAlign    =   settings.text_align ? settings.text_align : 'dialog-center';
            dialog.buttonCancelName     =   settings.button_cancel ? settings.button_cancel : 'Cancel';
            dialog.buttonSuccessName    =   settings.button_success ? settings.button_success : 'Ok';
            dialog.loadingStatus        =   settings.loadingstatus ? settings.loadingstatus : false;


            // call function create html
            dialog.createHTML();

            // call function set value for Dom
            dialog.setValueDom();

            // call function Textarea
            dialog.handleTextarea();

            // set position for popup
            dialog.setPositionPopup();

            // set postion top
            dialog.setTopPostionPopup();

            // call function bind event
            dialog.bindEventHanler(callback);

        },

        /*
         * Method set value Dom
         *
         * @return: variable
         */
        setValueDom: function () {

            dialog.popupID                  =   $('.dialog-wrapper');
            dialog.popupOverlayID           =   $('.dialog-overlay');
            dialog.buttonControl.cancel     =   $('.dialog-cancel');
            dialog.buttonControl.loading    =   $('.dialog-loading');
            dialog.buttonControl.action     =   $('.dialog-action');
            dialog.textareaID               =   $('#dialog-comment-textarea');

            // call method off event wapper
            if (dialog.type !== 'prompt') {
                dialog.handleOffEventWapper();
            }

        },

        /*
         *
         *
         */
        handleOffEventWapper: function () {

            dialog.popupID.unbind("touchmove");
            dialog.popupID.on("touchmove", function (ev) {
                ev.preventDefault();
            });

            dialog.popupOverlayID.unbind("touchmove");
            dialog.popupOverlayID.on("touchmove", function (ev) {
                ev.preventDefault();
            });
        },

        /*
         * Method create HTML
         *
         * @return: html
         *
         */
        createHTML: function () {

            var header  = dialog._createHtmlHeader();
            var content = dialog._createHtmlContent();
            var footer  = dialog._createHtmlFooter();
            var classStyle = dialog.textAlign;

            if (dialog.type === 'alert') {
                classStyle += ' dialog-alert';
            } else if (dialog.type === 'warning') {
                classStyle += ' dialog-warning';
            } else if (dialog.type === 'prompt') {
                classStyle += ' dialog-prompt open-lock-action';
            }
            var popupWapper = '<div class="dialog-wrapper ' + classStyle + '">' +
                    '<div class="dialog-inner">' +
                        header + content +
                    '</div>' +
                    footer +
                '</div>';

            if ($('.dialog-overlay').length == 0) {
                var overlay = dialog.createOverlay();
                var newNode = popupWapper + overlay;
            } else {
                var newNode = popupWapper;
            }


            if ($('.dialog-wrapper').length == 0) {
                dialog.container.append(newNode).find('.dialog-wrapper').addClass('fscaleUp');
            }

        },

        /*
         * Method: handleTextarea
         *
         */
        handleTextarea: function () {

            if (dialog.type === 'prompt') {

                var timefocus = setTimeout(function () {
                    dialog.textareaID.focus();
                    clearTimeout(timefocus);
                }, 450);

                dialog.textareaID.on('paste change keyup', function (e) {
                    var check = $(e.currentTarget);
                    var height = 30;
                    $(this).css({
                        "height": '30px',
                        "min-height": '30px',
                        "max-height": '30px'
                    });
                    var clear = setTimeout(function () {
                        if (check.val().length > 0) {
                            dialog.popupID.removeClass('open-lock-action');
                        } else {
                            dialog.popupID.addClass('open-lock-action');
                        }
                        clearTimeout(clear);
                    },200);

                    var scrollHeight = check[0].scrollHeight;
                    if (scrollHeight > 30 && scrollHeight < 70) {
                        height = scrollHeight;
                    }
                    if (scrollHeight > 70) {
                        height = 57;
                    }

                    if (height !== 30) {
                        $(this).css({
                            "height": height + 'px',
                            "min-height": "",
                            "max-height": ""
                        });
                    }
                });

            }
        },

        /*
         * Method: Set position Top
         * @desc: set position top when show or hide keyboard
         */
        setTopPostionPopup: function () {
            if (dialog.type === 'prompt') {

                var ua = navigator.userAgent.toLowerCase();
                var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
                if (isAndroid) {
                    window.addEventListener(eventHelper.NATIVE_KEYBOARD_SHOW, dialog.keyboardShowHandler);
                    window.addEventListener(eventHelper.NATIVE_KEYBOARD_HIDE, dialog.keyboardHideHandler);
                }
            }

        },
        keyboardShowHandler: function (event) {
            event.preventDefault();
            var heightPopup = dialog.popupID.innerHeight();
            var heightBody = $('body').height();
            var top = ( heightBody - heightPopup ) / 2;
            dialog.popupID.animate({
                top: top + 'px'
            }, 300);

        },
        keyboardHideHandler: function (event) {
            event.preventDefault();
            var heightPopup = dialog.popupID.innerHeight();
            var heightBody = $('body').height();
            var top = ( heightBody - heightPopup ) / 2;
            dialog.popupID.animate({
                top: top + 'px'
            }, 300);

        },
        offEventKeyBoardHandlerDiglogPage: function () {
            var ua = navigator.userAgent.toLowerCase();
            var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
            if (isAndroid) {
                window.removeEventListener(eventHelper.NATIVE_KEYBOARD_SHOW, dialog.keyboardShowHandler, false);
                window.removeEventListener(eventHelper.NATIVE_KEYBOARD_HIDE, dialog.keyboardHideHandler, false);
            }
        },

        /*
         * Set position popup
         *
         */
        setPositionPopup: function () {

            var widthPopup  = dialog.popupID.innerWidth();
            var heightPopup = dialog.popupID.innerHeight();
            var widthBody   = $('body').width();
            var heightBody  = $('body').height();
            var top  = ( heightBody - heightPopup ) / 2;
            var left = ( widthBody - widthPopup ) / 2;
            dialog.popupID.css({
                top: top + 'px',
                left: left + 'px'
            });
        },

        /*
         * Method create overlay
         *
         * @return: html
         */
        createOverlay: function () {
            return '<div class="dialog-overlay"><a href="#" class="dialog-loading"></a></div>';
        },

        /*
         * Method create HTML Header
         *
         * @return: html
         */
        _createHtmlHeader: function () {

            var node = '<h3 class="dialog-header">';

            // check icon
            if (dialog.icon) {
                node += dialog.icon;
            }

            node += dialog.title;

            node += '</h3>';

            return node;
        },

        /*
         * Method create HTMML Content
         *
         * @return: html
         */
        _createHtmlContent: function () {
            var node = '<div class="dialog-content">';
            if (dialog.type === 'prompt') {
                node += '<div class="dialog-textarea"><textarea id="dialog-comment-textarea" data-role="none" data-wrapper-class="text-input" placeholder="' + dialog.placeholder + '"></textarea></div>';
            } else {
                node += dialog.msg;
            }
            node += '</div>';
            return node;
        },

        /*
         * Method create HTML Footer
         *
         * @retrun html
         */
        _createHtmlFooter: function () {

            var node = '<div class="dialog-footer">';
            if (dialog.type === 'alert' || dialog.type === 'warning' || dialog.type === 'flink') {
                node += '<a class="dialog-action" href="#">' + dialog.buttonSuccessName + '</a>';
            }else {
                node += '<a class="dialog-cancel" href="#">' + dialog.buttonCancelName + '</a>' +
                    '<a class="dialog-action" href="#">' + dialog.buttonSuccessName + '</a>'
            }
            node += '</div>';
            return node;
        },

        /*
         *  Bind event for screen
         *
         */
        bindEventHanler: function (callback) {

            // handler event
            dialog.buttonControl.cancel.on('tap', function (event) {
                event.preventDefault();
                dialog.loadingStatus = false;
                dialog.result = false;
                if (callback && dialog.result === false && ( dialog.type === 'confirm' || dialog.type === 'prompt')) {
                    callback(dialog.result);
                }

                dialog.handlerCancel();
            });
            dialog.buttonControl.action.on('tap', function (event) {
                event.preventDefault();
                if (dialog.type === 'prompt') {
                    dialog.textareaID.blur();
                    dialog.result = dialog.textareaID.val();
                } else {
                    dialog.result = true;
                }
                dialog.handlerActionSuccess(callback);

            });

        },


        /*
         * Method Success
         *
         * @callback: function
         */
        handlerActionSuccess: function (callback) {
            if (callback) {
                var call = setTimeout(function () {
                    callback(dialog.result);
                    clearTimeout(call);
                }, 350);
            }
            dialog.handlerCancel();
            dialog.handlerOffEvent();

        },

        /*
         * Method cancel popup
         *
         */
        handlerCancel: function () {

            if (dialog.type === 'prompt') {
                dialog.textareaID.blur();
            }
            if (dialog.popupID) {
                dialog.popupID.addClass('fopacityDown');
                var clearPopup = setTimeout(function () {
                    dialog.popupID.remove();
                    clearTimeout(clearPopup);
                }, 300);
            }

            if (dialog.loadingStatus === true) {

                dialog.handlerOverlay(dialog.flagStatus.show);
            } else {
                dialog.handlerOverlay(dialog.flagStatus.hide);
            }
            dialog.handlerOffEvent();
        },

        /*
         * Method handler loading
         *
         * @flag: variable true and fale
         */
        handlerOverlay: function (flag) {

            if (flag === true) {
                dialog.buttonControl.loading.addClass('showloading');
            } else {
                if ($(".dialog-overlay").length > 0) {
                    dialog.buttonControl.loading.removeClass('showloading');
                    dialog.popupOverlayID.addClass('fopacityDown');
                    var overlay = setTimeout(function () {
                        dialog.popupOverlayID.remove();
                        clearTimeout(overlay);
                    }, 300);
                }

            }

        },

        /*
         * Method off event
         *
         */
        handlerOffEvent: function () {
            if (dialog.buttonControl.cancel) dialog.buttonControl.cancel.off();
            if (dialog.buttonControl.action) dialog.buttonControl.action.off();
            if (dialog.type === 'prompt') {
                dialog.offEventKeyBoardHandlerDiglogPage();
            }
        }

    };

    // short
    $.Alert = function (settings, callback) {

        dialog.init('alert', settings, callback);
    };
    $.AlertSingle = function (msg, callback) {
        var settings = {
            msg: msg
        };
        dialog.init('alert', settings, callback);
    };

    $.Confirm = function (settings, callback) {
        dialog.init('confirm', settings, callback);
    };

    $.Warning = function (settings, callback) {
        dialog.init('warning', settings, callback);
    };
    $.Prompt = function (settings, callback) {
        dialog.init('prompt', settings, callback);
    };

}(jQuery));