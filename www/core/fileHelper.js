/**
 * fileHelper Class
 *
 * @author FPT Software
 */

var fileHelper = {
    // CONSTANTS
    //

    TAG: 'fileHelper',

    // PROPERTIES
    //

    loadedScripts: [],

    /**
     * Load JavaScript files in synchronous/asynchronous mode
     *
     * @param {Array.<string>} fileArr
     * @param {Function} onDoneListener
     * @returns {void}
     */
    importScripts: function(fileArr, onDoneListener) {
        if (!fileArr) {
            return;
        }
        // Do not re-load scripts when it is already exists
        var filteredFiles = [];
        var item;
        for (var i = 0, n = fileArr.length; i < n; i++) {
            item = fileArr[i];
            if (fileHelper.loadedScripts.indexOf(item) < 0) {
                filteredFiles.push(item);
                fileHelper.loadedScripts.push(item);
                console.log(fileHelper.TAG, 'importScripts() ' + item);
            }
        }
        // Check async request
        var isAsync;
        if (onDoneListener) {
            isAsync = true;
        } else {
            isAsync = false;
        }
        // Prepare loading list
        var loadedArr = $.map(filteredFiles, function(path) {
            return $.ajax({
                url: path,
                dataType: "script",
                async: isAsync
            });
        });
        loadedArr.push($.Deferred(function(deferred) {
            $(deferred.resolve);
        }));
        // Load controller and view scripts
        $.when($, loadedArr).then(function() {
            if (onDoneListener) {
                onDoneListener();
            }
        });
    },

    importJSONFile: function(path, successCallback, errorCallback) {
        $.ajax({
            url: path,
            dataType: "json",
            async: false,
            success: successCallback,
            error: errorCallback
        });
    },

    importTxtFile: function(path, successCallback, errorCallback) {
        $.ajax({
            url: path,
            dataType: "text",
            async: false,
            success: successCallback,
            error: errorCallback
        });
    },

    /**
     * Get url of file with root path Process for Cordova and Karma environment
     *
     * @param {string} filePath
     * @returns {string} Full path with protocol file://... or contents://... or
     *          http://localhost:9789/base/cpm/
     */
    getUrl: function(filePath) {
        var url = this.getLocationHref();
        var rootPath;
        var basePath;
        if (url.indexOf('http://localhost') >= 0 && url.indexOf('/context.html') >= 0) {
            // Current server is Karma
            // Format Url like: http://localhost:9876/context.html/.......
            rootPath = url.split('/context.html')[0];
            basePath = '/base/cpm/www/';
        } else {
            // Current server is Cordova
            rootPath = url.split('/www')[0];
            basePath = '/www/';
        }

        return (rootPath + basePath + filePath);
    },

    getLocationHref: function() {
        return document.location.href;
    }

}; // End Class
