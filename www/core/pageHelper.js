/**
 * pageHelper Class
 * @author FPT Software
 */

var pageHelper = {
    // CONSTANTS
    //

    TAG: 'pageHelper',

    MODULE_CSS_FOLDER: 'css/themes/cpm',
    CONTROLLER_POSTFIX: 'Controller',
    VIEW_POSTFIX: 'View',

    // PROPERTIES
    //

    // METHODS
    //

    /**
     * Load needed scripts for page
     * @param {string} pageUrl
     * @param {function} onDoneListener
     */
    getControlScriptFiles: function (pageUrl) {
        console.log(this.TAG + '#loadControlScriptsForPage()');
        var fileName = this.getFileNameFromUrl(pageUrl);
        var rootPath = pageUrl.replace(fileName, '');
        var name = fileName.split('.')[0];
        var controllerName = name + pageHelper.CONTROLLER_POSTFIX;
        var viewName = name + pageHelper.VIEW_POSTFIX;
        var ret = [
            rootPath + viewName + '.js',
            rootPath + controllerName + '.js'
        ];

        return ret;
    },

    getCssScriptFiles: function (pageUrl) {
        var moduleName = this.getModuleNameFromUrl(pageUrl);
        var ret = [];
        if (moduleName !== '') {
            ret.push(fileHelper.getUrl(pageHelper.MODULE_CSS_FOLDER + '/' + moduleName + '.css'));
        }

        return ret;
    },

    getFileNameFromUrl: function (pageUrl) {
        var ret = null;
        var pieces = pageUrl.match(/\/([^\/?#]+)[^\/]*$/);
        if (pieces) {
            ret = pieces[1];
        }

        return ret;
    },

    getPageIdFromUrl: function (pageUrl) {
        var ret = null;
        var fileName = this.getFileNameFromUrl(pageUrl);
        if (fileName !== null) {
            ret = fileName.split('.')[0].replace(/[^\w\s]/gi, '').toLowerCase();
        }

        return ret;
    },

    getControllerNameFromUrl: function (pageUrl) {
        var ret = null;
        var fileName = this.getFileNameFromUrl(pageUrl);
        if (fileName !== null) {
            ret = fileName.split('.')[0] + pageHelper.CONTROLLER_POSTFIX;
        }

        return ret;
    },

    getViewNameFromUrl: function (pageUrl) {
        var ret = null;
        var fileName = this.getFileNameFromUrl(pageUrl);
        if (fileName !== null) {
            ret = fileName.split('.')[0] + pageHelper.VIEW_POSTFIX;
        }

        return ret;
    },

    getModuleNameFromUrl: function (pageUrl) {
        var ret = '';
        var parser = pageUrl.split('/www/screen/');
        if (parser) {
            var modulePartial = parser[1];
            var names = modulePartial.split('/');
            if (names.length > 0) {
                ret = names[0];
            }
        }

        return ret;
    },

    /**
     * Do change page by url
     * Reference: http://api.jquerymobile.com/jquery.mobile.changepage/
     * @param {String} pageUrl The url of destination page
     * @param {Object} options The setting of change page API
     */
    changePage: function (pageUrl, options) {
        var opts = {};
        if (options) {
            opts = options;
        }
        if(!opts.transition){
            opts.transition = 'fade';
        }
        $.mobile.changePage(pageUrl, opts);
    }

}; //End Class