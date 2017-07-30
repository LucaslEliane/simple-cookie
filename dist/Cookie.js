"use strict";
;
(function (window) {
    var Cookie = (function () {
        function Cookie() {
            this._parseReg = /([^\s\;]+)\;?\s*/g;
            this._cookieString = document.cookie;
            this._cookie = this.$parseCookie();
        }
        Cookie.prototype.$reInit = function () {
            if (this._cookieString === document.cookie) {
                return false;
            }
            this._cookieString = document.cookie;
            this._cookie = this.$parseCookie();
            return true;
        };
        Cookie.prototype.$parseCookie = function () {
            var parseResult = {};
            var unit;
            while ((unit = this._parseReg.exec(this._cookieString))) {
                var unitSplit = unit[1].split('=');
                parseResult[unitSplit[0]] = unitSplit[1];
            }
            return parseResult;
        };
        Cookie.prototype.getCookie = function (c_name) {
            this.$reInit();
            console.log(this._cookie);
            if (this._cookie[c_name]) {
                return window.decodeURIComponent(this._cookie[c_name]);
            }
            else {
                window.console.warn("There is no cookie named: " + c_name + ", the cookie may expired");
                return null;
            }
        };
        Cookie.prototype.setCookie = function (c_name, config) {
            this.$reInit();
            if (!config.expires && !config.maxAge) {
                window.console.warn("cookie " + c_name + " should have an expires or max-age value");
                return;
            }
            var cookieString = '';
            cookieString += c_name + "=" + window.encodeURIComponent(config.value);
            config.domain && (cookieString += ";domain=" + window.encodeURIComponent(config.domain));
            config.path && (cookieString += ";path=" + window.encodeURIComponent(config.path));
            config.expires && (cookieString += ";expires=" + window.encodeURIComponent(config.expires));
            config.maxAge && (cookieString += ";max-age=" + window.encodeURIComponent(config.maxAge));
            cookieString += ';';
            this._cookie[c_name] = "" + window.encodeURIComponent(config.value);
            document.cookie = cookieString;
            this._cookieString = document.cookie;
        };
        Cookie.prototype.checkCookie = function (c_name) {
            this.$reInit();
            if (this._cookie[c_name]) {
                return true;
            }
            return false;
        };
        return Cookie;
    }());
    if (window.hasOwnProperty('$cookie')) {
        window.console.warn("cookie module cannot execute, because there is a '$cookie' property in the window object");
        return false;
    }
    Object.defineProperty(window, '$cookie', {
        value: new Cookie(),
        writable: false,
        configurable: false,
        enumerable: true
    });
})(window);
//# sourceMappingURL=Cookie.js.map