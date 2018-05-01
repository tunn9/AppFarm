/**
 * HttpService class
 * Progress get set api
 */

var httpService = {

    dataLocal: false,
    dataServer: 'http://27.72.145.192:8888/dts/',

    /**
     * Get list latest tickets list on home screen.
     * @param url_para {Object} Storage token of request in this object.
     * @param data {Object} Storage parameters for get data.
     * @returns {*}
     */

    login: function (url_para, data) {
        return httpService.connectServer("user/login", "POST", url_para, data);
    },
    logout: function (url_para, data) {
        return httpService.connectServer("user/logout", "POST", url_para, data);
    },
    register: function (url_para, data) {
        return httpService.connectServer("user/register", "PUT", url_para, data);
    },
    updateUser: function (url_para, data) {
        return httpService.connectServer("data/users", "POST", url_para, data);
    },
    resetPassword: function (url_para, data) {
        return httpService.connectServer("user/resetPassword", "POST", url_para, data);
    },
    profiler: function (url_para, data) {
        return httpService.connectServer("data/users", "GET", url_para, data);
    },
    getListArea: function (url_para, data) {
        return httpService.connectServer("data/areas", "GET", url_para, data);
    },
    getDeviceList: function (url_para, data) {
        return httpService.connectServer("data/devices", "GET", url_para, data);
    },
    getDeviceListAuto: function (url_para, data, id) {
        return httpService.connectServer("data/devices?type=3&notUse=true&areaId="+id+"", "GET", url_para, data);
    },
    deleteArea: function (url_para, data) {
        return httpService.connectServer("data/areas", "DELETE", url_para, data);
    },
    detailArea: function (url_para, data, id) {
        return httpService.connectServer("data/areas/"+ id, "GET", url_para, data);
    },
    createArea: function (url_para, data) {
        return httpService.connectServer("data/areas", "PUT", url_para, data);
    },
    getOutput: function (url_para, data, id) {
        return httpService.connectServer("data/device/" + id, "GET", url_para, data);
    },
    editArea: function (url_para, data) {
        return httpService.connectServer("data/areas", "POST", url_para, data);
    },
    getListSettingsAuto: function (url_para, data) {
        return httpService.connectServer("data/settingsAuto", "GET", url_para, data);
    },
    getIndexSettingsAuto: function (url_para, data, id) {
        return httpService.connectServer("data/settingsAuto/" + id + "/readIndex", "GET", url_para, data);
    },
    unLockIndexSettingsAuto: function (url_para, data, areaID, indexID) {
        return httpService.connectServer("data/settingsAuto/" + areaID + "/" +indexID+ "/releaseIndex", "POST", url_para, data);
    },

    // deleteSettingsAuto: function (url_para, data) {
    //     return httpService.connectServer("data/settingsAuto", "DELETE", url_para, data);
    // },
    editSettingsAuto: function (url_para, data, id) {
        return httpService.connectServer("data/settingsAuto/"+id+"", "GET", url_para, data);
    },
    deleteSettingsAuto: function (url_para, data) {
        return httpService.connectServer("data/deleteSetingsAuto", "DELETE", url_para, data);
    },
    getListScreenDevice: function (url_para, data) {
        return httpService.connectServer("data/devices", "GET", url_para, data);
    },
    getListDeviceID: function (url_para, data) {
        return httpService.connectServer("data/device", "GET", url_para, data);
    },
    removeListScreenDevice: function (url_para, data) {
        return httpService.connectServer("data/devices", "DELETE", url_para, data);
    },
    addNewDevice: function (url_para, data) {
        return httpService.connectServer("data/devices", "PUT", url_para, data);
    },
    updateDevice: function (url_para, data) {
        return httpService.connectServer("data/devices", "POST", url_para, data);
    },
    detailDevice: function (url_para, data, id) {
        return httpService.connectServer("data/devices/" + id, "GET", url_para, data);
    },
    getHistory: function (url_para, data, id) {
        return httpService.connectServer("data/areas/sensor/history/" + id, "GET", url_para, data);
    },



    connectServer: function (api, method, url_para, data) {
        var dfd = new $.Deferred();
        var param = '';
        var token = '';  
                 
        if (url_para !== '') {
            param = Object.keys(url_para).map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(url_para[key]);
            }).join('&');
            param = "?" + param;
        }
        console.log(param);

        var setUrl;
        if (httpService.dataLocal) {
            setUrl = "../../assets/data/" + api + ".json";
        } else {
            if (param !== '') {
                setUrl = httpService.dataServer + api + param;
            } else {
                setUrl = httpService.dataServer + api;
            }
        }
        console.log(setUrl);

        // get token when logged
        var datalogin = storageManager.getLocalStorage(constants.LOGIN.DATA_LOGIN);
        if(datalogin){
            token = datalogin.data;
        }

        $.ajax({
            url: setUrl,
            type: method,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            headers: {
                "Authorization": "Basic " + token
            },
            data: JSON.stringify(data),
            timeout: 300000
        }).done(function (data) {
            dfd.resolve(data);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            dfd.reject(jqXHR.status, textStatus, errorThrown);
        });
        return dfd.promise();
    },

    importJSONFile: function (path, successCallback) {
       $.ajax({
           url: path,
           dataType: "json",
           async: false,
           success: successCallback
       })
    }

};


