interface MockWindow extends Window {
  encodeURIComponent: (decodeURIComponent: string) => string;
  decodeURIComponent: (encodeURIComponent: string) => string;
}
;(function(window: MockWindow) {

  interface CookieObject {
    [name: string]: string;
  }

  interface CookieConfig {
    value: string;
    domain?: string;
    expires?: string;
    maxAge?: string;
    path?: string;
  }

  class Cookie {
    private _parseReg: RegExp;
    private _cookieString: string;
    private _cookie: CookieObject;

    public constructor() {
      this._parseReg = /([^\s\;]+)\;?\s*/g;
      this._cookieString = document.cookie;
      this._cookie = this.$parseCookie();
    }

    private $reInit(): boolean {
      if (this._cookieString === document.cookie) {
        return false;
      }
      this._cookieString = document.cookie;
      this._cookie = this.$parseCookie();
      return true;
    }

    private $parseCookie(): CookieObject {
      let parseResult: CookieObject = {};
      let unit: RegExpExecArray | null;
      while ((unit = this._parseReg.exec(this._cookieString))) {
        const unitSplit = unit[1].split('=');
        parseResult[unitSplit[0]] = unitSplit[1];
      }
      return parseResult;
    }

    public getCookie(c_name: string): string | null {
      this.$reInit();
      console.log(this._cookie);
      if (this._cookie[c_name]) {
        return window.decodeURIComponent(this._cookie[c_name]);
      } else {
        window.console.warn(`There is no cookie named: ${c_name}, the cookie may expired`);
        return null;
      }
    }

    public setCookie(c_name: string, config: CookieConfig) {
      this.$reInit();
      if (!config.expires && !config.maxAge) {
        window.console.warn(`cookie ${c_name} should have an expires or max-age value`);
        return 
      }
      let cookieString: string = '';
      cookieString += `${c_name}=${window.encodeURIComponent(config.value)}`;
      config.domain && ( cookieString += `;domain=${window.encodeURIComponent(config.domain)}` );
      config.path && ( cookieString += `;path=${window.encodeURIComponent(config.path)}` );
      config.expires && ( cookieString += `;expires=${window.encodeURIComponent(config.expires)}` );
      config.maxAge && ( cookieString += `;max-age=${window.encodeURIComponent(config.maxAge)}` );
      cookieString += ';';

      this._cookie[c_name] = `${window.encodeURIComponent(config.value)}`;
      document.cookie = cookieString;
      this._cookieString = document.cookie;
    }

    public checkCookie(c_name: string): boolean {
      this.$reInit();
      if (this._cookie[c_name]) {
        return true;
      }
      return false;
    }
  }

  if (window.hasOwnProperty('$cookie')) {
    window.console.warn(`cookie module cannot execute, because there is a '$cookie' property in the window object`);
    return false;
  }
  Object.defineProperty(
    window,
    '$cookie',
    {
      value: new Cookie(),
      writable: false,
      configurable: false,
      enumerable: true
    }
  )
})(<MockWindow>window);