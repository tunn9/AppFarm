/**
 * storageManager Static Class
 * Manage global members, objects need to pass cross html pages.
 * This class auto register at bootime of application
 * @author FPT Software
 */

var storageManager = {
    // CONSTANTS
    //
    TAG: 'storageManager',

    // PROPERTIES
    //
    /**
     * Item manager in memory
     */
    items: {},

    // METHODS
    //  
    // put(key, obj)
    // get(key)
    // del(key)
    // putLocalStorage(key, obj)
    // getLocalStorage(key)
    // deleteLocalStorage(key)
    // isValidKey_(key)

    /**
     * Store Objbect in memory
     */
    put: function (key, obj) {
        if (!this.isValidKey_(key)) {
            debug.error(this.TAG, 'put() The key is invalid. key=' + key);
            return false;
        }
        this.items[key] = obj;
        return true;
    },

    /**
     * Retrieve data from memory
     * @returns {Object} The data of object by key
     */
    get: function (key) {
        if (!this.isValidKey_(key)) {
            debug.error(this.TAG, 'put() The key is invalid.');
            return null;
        }
        var ret = this.items[key];
        return (ret ? ret : null);
    },

    /**
     * Remove objet from memory
     */
    delete: function (key) {
        if (!this.isValidKey_(key)) {
            debug.error(this.TAG, 'put() The key is invalid.');
            return false;
        }
        if (this.items[key]) {
            delete this.items[key];
        }
    },

    /**
     * Store Objbect in LocalStorage of browser
     */
    putLocalStorage: function (key, obj) {
        if (!this.isValidKey_(key)) {
            debug.error(this.TAG, 'put() The key is invalid. key=' + key);
            return false;
        }
        window.localStorage.setItem(key, JSON.stringify(obj));
        return true;
    },

    /**
     * Retrieve data from LocalStorage of browser
     * @returns {Object} The data of object by key
     *                  null if have not found data
     */
    getLocalStorage: function (key) {
        if (!this.isValidKey_(key)) {
            debug.error(this.TAG, 'put() The key is invalid.');
            return null;
        }
        var ret = window.localStorage.getItem(key);
        if (ret !== '') {
            ret = JSON.parse(ret);
        } else {
            ret = null;
        }
        return ret;
    },

    /**
     * Remove objet from LocalStorage of browser
     */
    deleteLocalStorage: function (key) {
        if (!this.isValidKey_(key)) {
            debug.error(this.TAG, 'put() The key is invalid.');
            return false;
        }
        window.localStorage.removeItem(key);
    },

    /**
     * The key string must be not contains special characters
     */
    isValidKey_: function (key) {
        var regex = /[^\w\s]/gi;
        return (regex.test(key) !== true);

    },

    /**
     * Clear all data in local storage
     */
    clearAll : function(){
        window.localStorage.clear();
    }
}; // End Class