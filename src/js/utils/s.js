(function(require, define, dataAndEvents, exports, deepDataAndEvents, ignoreMethodDoesntExist, ax) {
  ax = window.ActiveXObject;
  !function e(t, n, r) {
    /**
     * @param {string} o
     * @param {?} dx
     * @return {?}
     */
    function s(o, dx) {
      if (!n[o]) {
        if (!t[o]) {
          /** @type {(Function|boolean)} */
          var i = "function" == typeof require && require;
          if (!dx && i) {
            return i(o, true);
          }
          if (a) {
            return a(o, true);
          }
          throw new Error("Cannot find module '" + o + "'");
        }
        var module_ = n[o] = {
          exports : {}
        };
        t[o][0].call(module_.exports, function(e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, module_, module_.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    /** @type {(Function|boolean)} */
    var a = "function" == typeof require && require;
    /** @type {number} */
    var o = 0;
    for (;o < r.length;o++) {
      s(r[o]);
    }
    return s;
  }({
    1 : [function(dataAndEvents, module) {
      !function(name, definition) {
        if ("undefined" != typeof module && module.exports) {
          module.exports.browser = definition();
        } else {
          if ("function" == typeof define && define.amd) {
            define(definition);
          } else {
            this[name] = definition();
          }
        }
      }("bowser", function() {
        /**
         * @param {string} name
         * @return {?}
         */
        function detect(name) {
          /**
           * @param {RegExp} re
           * @return {?}
           */
          function $(re) {
            var matches = name.match(re);
            return matches && (matches.length > 1 && matches[1]) || "";
          }
          /**
           * @param {RegExp} regex
           * @return {?}
           */
          function getVersion(regex) {
            var matches = name.match(regex);
            return matches && (matches.length > 1 && matches[2]) || "";
          }
          var o;
          var key = $(/(ipod|iphone|ipad)/i).toLowerCase();
          /** @type {boolean} */
          var db = /like android/i.test(name);
          /** @type {boolean} */
          var ui = !db && /android/i.test(name);
          var v = $(/edge\/(\d+(\.\d+)?)/i);
          var version = $(/version\/(\d+(\.\d+)?)/i);
          /** @type {boolean} */
          var block = /tablet/i.test(name);
          /** @type {boolean} */
          var brace = !block && /[^-]mobi/i.test(name);
          if (/opera|opr/i.test(name)) {
            o = {
              name : "Opera",
              opera : t,
              version : version || $(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
            };
          } else {
            if (/windows phone/i.test(name)) {
              o = {
                name : "Windows Phone",
                windowsphone : t
              };
              if (v) {
                /** @type {boolean} */
                o.msedge = t;
                o.version = v;
              } else {
                /** @type {boolean} */
                o.msie = t;
                o.version = $(/iemobile\/(\d+(\.\d+)?)/i);
              }
            } else {
              if (/msie|trident/i.test(name)) {
                o = {
                  name : "Internet Explorer",
                  msie : t,
                  version : $(/(?:msie |rv:)(\d+(\.\d+)?)/i)
                };
              } else {
                if (/chrome.+? edge/i.test(name)) {
                  o = {
                    name : "Microsoft Edge",
                    msedge : t,
                    version : v
                  };
                } else {
                  if (/chrome|crios|crmo/i.test(name)) {
                    o = {
                      name : "Chrome",
                      chrome : t,
                      version : $(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                    };
                  } else {
                    if (key) {
                      o = {
                        name : "iphone" == key ? "iPhone" : "ipad" == key ? "iPad" : "iPod"
                      };
                      if (version) {
                        o.version = version;
                      }
                    } else {
                      if (/sailfish/i.test(name)) {
                        o = {
                          name : "Sailfish",
                          sailfish : t,
                          version : $(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
                        };
                      } else {
                        if (/seamonkey\//i.test(name)) {
                          o = {
                            name : "SeaMonkey",
                            seamonkey : t,
                            version : $(/seamonkey\/(\d+(\.\d+)?)/i)
                          };
                        } else {
                          if (/firefox|iceweasel/i.test(name)) {
                            o = {
                              name : "Firefox",
                              firefox : t,
                              version : $(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
                            };
                            if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(name)) {
                              /** @type {boolean} */
                              o.firefoxos = t;
                            }
                          } else {
                            if (/silk/i.test(name)) {
                              o = {
                                name : "Amazon Silk",
                                silk : t,
                                version : $(/silk\/(\d+(\.\d+)?)/i)
                              };
                            } else {
                              if (ui) {
                                o = {
                                  name : "Android",
                                  version : version
                                };
                              } else {
                                if (/phantom/i.test(name)) {
                                  o = {
                                    name : "PhantomJS",
                                    phantom : t,
                                    version : $(/phantomjs\/(\d+(\.\d+)?)/i)
                                  };
                                } else {
                                  if (/blackberry|\bbb\d+/i.test(name) || /rim\stablet/i.test(name)) {
                                    o = {
                                      name : "BlackBerry",
                                      blackberry : t,
                                      version : version || $(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
                                    };
                                  } else {
                                    if (/(web|hpw)os/i.test(name)) {
                                      o = {
                                        name : "WebOS",
                                        webos : t,
                                        version : version || $(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
                                      };
                                      if (/touchpad\//i.test(name)) {
                                        /** @type {boolean} */
                                        o.touchpad = t;
                                      }
                                    } else {
                                      /** @type {({bada: boolean, name: string, version: ?}|{name: ?, version: ?}|{name: string, safari: boolean, version: ?}|{name: string, tizen: boolean, version: ?})} */
                                      o = /bada/i.test(name) ? {
                                        name : "Bada",
                                        bada : t,
                                        version : $(/dolfin\/(\d+(\.\d+)?)/i)
                                      } : /tizen/i.test(name) ? {
                                        name : "Tizen",
                                        tizen : t,
                                        version : $(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || version
                                      } : /safari/i.test(name) ? {
                                        name : "Safari",
                                        safari : t,
                                        version : version
                                      } : {
                                        name : $(/^(.*)\/(.*) /),
                                        version : getVersion(/^(.*)\/(.*) /)
                                      };
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          if (!o.msedge && /(apple)?webkit/i.test(name)) {
            /** @type {string} */
            o.name = o.name || "Webkit";
            /** @type {boolean} */
            o.webkit = t;
            if (!o.version) {
              if (version) {
                o.version = version;
              }
            }
          } else {
            if (!o.opera) {
              if (/gecko\//i.test(name)) {
                /** @type {string} */
                o.name = o.name || "Gecko";
                /** @type {boolean} */
                o.gecko = t;
                o.version = o.version || $(/gecko\/(\d+(\.\d+)?)/i);
              }
            }
          }
          if (o.msedge || !ui && !o.silk) {
            if (key) {
              /** @type {boolean} */
              o[key] = t;
              /** @type {boolean} */
              o.ios = t;
            }
          } else {
            /** @type {boolean} */
            o.android = t;
          }
          /** @type {string} */
          var className = "";
          if (o.windowsphone) {
            className = $(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
          } else {
            if (key) {
              className = $(/os (\d+([_\s]\d+)*) like mac os x/i);
              className = className.replace(/[_\s]/g, ".");
            } else {
              if (ui) {
                className = $(/android[ \/-](\d+(\.\d+)*)/i);
              } else {
                if (o.webos) {
                  className = $(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
                } else {
                  if (o.blackberry) {
                    className = $(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
                  } else {
                    if (o.bada) {
                      className = $(/bada\/(\d+(\.\d+)*)/i);
                    } else {
                      if (o.tizen) {
                        className = $(/tizen[\/\s](\d+(\.\d+)*)/i);
                      }
                    }
                  }
                }
              }
            }
          }
          if (className) {
            /** @type {string} */
            o.osversion = className;
          }
          /** @type {string} */
          var c = className.split(".")[0];
          return block || ("ipad" == key || (ui && (3 == c || 4 == c && !brace) || o.silk)) ? o.tablet = t : (brace || ("iphone" == key || ("ipod" == key || (ui || (o.blackberry || (o.webos || o.bada)))))) && (o.mobile = t), o.msedge || (o.msie && o.version >= 10 || (o.chrome && o.version >= 20 || (o.firefox && o.version >= 20 || (o.safari && o.version >= 6 || (o.opera && o.version >= 10 || (o.ios && (o.osversion && o.osversion.split(".")[0] >= 6) || o.blackberry && o.version >= 10.1)))))) ? o.a =
            t : o.msie && o.version < 10 || (o.chrome && o.version < 20 || (o.firefox && o.version < 20 || (o.safari && o.version < 6 || (o.opera && o.version < 10 || o.ios && (o.osversion && o.osversion.split(".")[0] < 6))))) ? o.c = t : o.x = t, o;
        }
        /** @type {boolean} */
        var t = true;
        var bowser = detect("undefined" != typeof navigator ? navigator.userAgent : "");
        return bowser.test = function(value) {
          /** @type {number} */
          var i = 0;
          for (;i < value.length;++i) {
            var val = value[i];
            if ("string" == typeof val && val in bowser) {
              return true;
            }
          }
          return false;
        }, bowser._detect = detect, bowser;
      });
    }, {}],
    2 : [function(when, module, arg) {
      (function(Promise) {
        !function(dataAndEvents, factory) {
          if ("object" == typeof arg && "object" == typeof module) {
            module.exports = factory();
          } else {
            if ("function" == typeof define && define.amd) {
              define([], factory);
            } else {
              if ("object" == typeof arg) {
                arg.localforage = factory();
              } else {
                dataAndEvents.localforage = factory();
              }
            }
          }
        }(this, function() {
          return function(queue) {
            /**
             * @param {number} id
             * @return {?}
             */
            function item(id) {
              if (t[id]) {
                return t[id].exports;
              }
              var mod = t[id] = {
                exports : {},
                id : id,
                loaded : false
              };
              return queue[id].call(mod.exports, mod, mod.exports, item), mod.loaded = true, mod.exports;
            }
            var t = {};
            return item.m = queue, item.c = t, item.p = "", item(0);
          }([function($, __exports__, eval) {
            /**
             * @param {?} dataAndEvents
             * @param {Function} object
             * @return {undefined}
             */
            function clone(dataAndEvents, object) {
              if (!(dataAndEvents instanceof object)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            /** @type {boolean} */
            __exports__.__esModule = true;
            var handlebars = function(parameters) {
              /**
               * @param {Object} _this
               * @param {string} name
               * @return {undefined}
               */
              function next(_this, name) {
                /**
                 * @return {?}
                 */
                _this[name] = function() {
                  /** @type {Arguments} */
                  var args = arguments;
                  return _this.ready().then(function() {
                    return _this[name].apply(_this, args);
                  });
                };
              }
              /**
               * @return {?}
               */
              function call() {
                /** @type {number} */
                var i = 1;
                for (;i < arguments.length;i++) {
                  var data = arguments[i];
                  if (data) {
                    var name;
                    for (name in data) {
                      if (data.hasOwnProperty(name)) {
                        arguments[0][name] = isArray(data[name]) ? data[name].slice() : data[name];
                      }
                    }
                  }
                }
                return arguments[0];
              }
              /**
               * @param {?} value
               * @return {?}
               */
              function getValue(value) {
                var property;
                for (property in self) {
                  if (self.hasOwnProperty(property) && self[property] === value) {
                    return true;
                  }
                }
                return false;
              }
              var $cookies = {};
              var self = {
                INDEXEDDB : "asyncStorage",
                LOCALSTORAGE : "localStorageWrapper",
                WEBSQL : "webSQLStorage"
              };
              /** @type {Array} */
              var models = [self.INDEXEDDB, self.WEBSQL, self.LOCALSTORAGE];
              /** @type {Array} */
              var resultItems = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"];
              var data = {
                description : "",
                driver : models.slice(),
                name : "localforage",
                size : 4980736,
                storeName : "keyvaluepairs",
                version : 1
              };
              var exports = function(w) {
                var t = {};
                return t[self.INDEXEDDB] = !!function() {
                  try {
                    var options = options || (w.indexedDB || (w.webkitIndexedDB || (w.mozIndexedDB || (w.OIndexedDB || w.msIndexedDB))));
                    return "undefined" != typeof w.openDatabase && (w.navigator && (w.navigator.userAgent && (/Safari/.test(w.navigator.userAgent) && !/Chrome/.test(w.navigator.userAgent)))) ? false : options && ("function" == typeof options.open && "undefined" != typeof w.IDBKeyRange);
                  } catch (n) {
                    return false;
                  }
                }(), t[self.WEBSQL] = !!function() {
                  try {
                    return w.openDatabase;
                  } catch (t) {
                    return false;
                  }
                }(), t[self.LOCALSTORAGE] = !!function() {
                  try {
                    return w.localStorage && ("setItem" in w.localStorage && w.localStorage.setItem);
                  } catch (t) {
                    return false;
                  }
                }(), t;
              }(parameters);
              /** @type {function (*): boolean} */
              var isArray = Array.isArray || function(arr) {
                  return "[object Array]" === Object.prototype.toString.call(arr);
                };
              var p = function() {
                /**
                 * @param {?} callback
                 * @return {undefined}
                 */
                function config(callback) {
                  clone(this, config);
                  /** @type {string} */
                  this.INDEXEDDB = self.INDEXEDDB;
                  /** @type {string} */
                  this.LOCALSTORAGE = self.LOCALSTORAGE;
                  /** @type {string} */
                  this.WEBSQL = self.WEBSQL;
                  this._defaultConfig = call({}, data);
                  this._config = call({}, this._defaultConfig, callback);
                  /** @type {null} */
                  this._driverSet = null;
                  /** @type {null} */
                  this._initDriver = null;
                  /** @type {boolean} */
                  this._ready = false;
                  /** @type {null} */
                  this._dbInfo = null;
                  this._wrapLibraryMethodsWithReady();
                  this.setDriver(this._config.driver);
                }
                return config.prototype.config = function(options) {
                  if ("object" == typeof options) {
                    if (this._ready) {
                      return new Error("Can't call config() after localforage has been used.");
                    }
                    var k;
                    for (k in options) {
                      if ("storeName" === k) {
                        options[k] = options[k].replace(/\W/g, "_");
                      }
                      this._config[k] = options[k];
                    }
                    return "driver" in options && (options.driver && this.setDriver(this._config.driver)), true;
                  }
                  return "string" == typeof options ? this._config[options] : this._config;
                }, config.prototype.defineDriver = function(options, handler, reject) {
                  var promise = new Promise(function($sanitize, reject) {
                    try {
                      var key = options._driver;
                      /** @type {Error} */
                      var thrownError = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                      /** @type {Error} */
                      var error = new Error("Custom driver name already in use: " + options._driver);
                      if (!options._driver) {
                        return void reject(thrownError);
                      }
                      if (getValue(options._driver)) {
                        return void reject(error);
                      }
                      /** @type {Array} */
                      var codeSegments = resultItems.concat("_initStorage");
                      /** @type {number} */
                      var i = 0;
                      for (;i < codeSegments.length;i++) {
                        var member = codeSegments[i];
                        if (!member || (!options[member] || "function" != typeof options[member])) {
                          return void reject(thrownError);
                        }
                      }
                      var promise = Promise.resolve(true);
                      if ("_support" in options) {
                        promise = options._support && "function" == typeof options._support ? options._support() : Promise.resolve(!!options._support);
                      }
                      promise.then(function(val) {
                        exports[key] = val;
                        /** @type {Object} */
                        $cookies[key] = options;
                        $sanitize();
                      }, reject);
                    } catch (ex) {
                      reject(ex);
                    }
                  });
                  return promise.then(handler, reject), promise;
                }, config.prototype.driver = function() {
                  return this._driver || null;
                }, config.prototype.getDriver = function(key, callback, reject) {
                  var LOCALSTORAGE = this;
                  var promise = function() {
                    if (getValue(key)) {
                      switch(key) {
                        case LOCALSTORAGE.INDEXEDDB:
                          return new Promise(function(Application) {
                            Application((0,eval)(1));
                          });
                        case LOCALSTORAGE.LOCALSTORAGE:
                          return new Promise(function(Application) {
                            Application((0,eval)(2));
                          });
                        case LOCALSTORAGE.WEBSQL:
                          return new Promise(function(Application) {
                            Application((0,eval)(4));
                          });
                      }
                    } else {
                      if ($cookies[key]) {
                        return Promise.resolve($cookies[key]);
                      }
                    }
                    return Promise.reject(new Error("Driver not found."));
                  }();
                  return promise.then(callback, reject), promise;
                }, config.prototype.getSerializer = function(cb) {
                  var promise = new Promise(function(Application) {
                    Application((0,eval)(3));
                  });
                  return cb && ("function" == typeof cb && promise.then(function(outErr) {
                    cb(outErr);
                  })), promise;
                }, config.prototype.ready = function(fn) {
                  var me = this;
                  var jQuery = me._driverSet.then(function() {
                    return null === me._ready && (me._ready = me._initDriver()), me._ready;
                  });
                  return jQuery.then(fn, fn), jQuery;
                }, config.prototype.setDriver = function(requires, recurring, reject) {
                  /**
                   * @return {undefined}
                   */
                  function next() {
                    self._config.driver = self.driver();
                  }
                  /**
                   * @param {Array} arr
                   * @return {?}
                   */
                  function some(arr) {
                    return function() {
                      /**
                       * @return {?}
                       */
                      function resolve() {
                        for (;i < arr.length;) {
                          var part = arr[i];
                          return i++, self._dbInfo = null, self._ready = null, self.getDriver(part).then(function(props) {
                            return self._extend(props), next(), self._ready = self._initStorage(self._config), self._ready;
                          })["catch"](resolve);
                        }
                        next();
                        /** @type {Error} */
                        var pdataCur = new Error("No available storage method found.");
                        return self._driverSet = Promise.reject(pdataCur), self._driverSet;
                      }
                      /** @type {number} */
                      var i = 0;
                      return resolve();
                    };
                  }
                  var self = this;
                  if (!isArray(requires)) {
                    /** @type {Array} */
                    requires = [requires];
                  }
                  var arrs = this._getSupportedDrivers(requires);
                  var promise = null !== this._driverSet ? this._driverSet["catch"](function() {
                    return Promise.resolve();
                  }) : Promise.resolve();
                  return this._driverSet = promise.then(function() {
                    var part = arrs[0];
                    return self._dbInfo = null, self._ready = null, self.getDriver(part).then(function(options) {
                      self._driver = options._driver;
                      next();
                      self._wrapLibraryMethodsWithReady();
                      self._initDriver = some(arrs);
                    });
                  })["catch"](function() {
                    next();
                    /** @type {Error} */
                    var pdataCur = new Error("No available storage method found.");
                    return self._driverSet = Promise.reject(pdataCur), self._driverSet;
                  }), this._driverSet.then(recurring, reject), this._driverSet;
                }, config.prototype.supports = function(method) {
                  return!!exports[method];
                }, config.prototype._extend = function(target) {
                  call(this, target);
                }, config.prototype._getSupportedDrivers = function(arr) {
                  /** @type {Array} */
                  var a_list = [];
                  /** @type {number} */
                  var i = 0;
                  var l = arr.length;
                  for (;l > i;i++) {
                    var a1 = arr[i];
                    if (this.supports(a1)) {
                      a_list.push(a1);
                    }
                  }
                  return a_list;
                }, config.prototype._wrapLibraryMethodsWithReady = function() {
                  /** @type {number} */
                  var i = 0;
                  for (;i < resultItems.length;i++) {
                    next(this, resultItems[i]);
                  }
                }, config.prototype.createInstance = function(params) {
                  return new config(params);
                }, config;
              }();
              return new p;
            }("undefined" != typeof window ? window : exports);
            __exports__["default"] = handlebars;
            $.exports = __exports__["default"];
          }, function($, __exports__) {
            /** @type {boolean} */
            __exports__.__esModule = true;
            var handlebars = function(global) {
              /**
               * @param {Array} parts
               * @param {Object} properties
               * @return {?}
               */
              function createBlob(parts, properties) {
                parts = parts || [];
                properties = properties || {};
                try {
                  return new Blob(parts, properties);
                } catch (symbol) {
                  if ("TypeError" !== symbol.name) {
                    throw symbol;
                  }
                  var BlobBuilder = global.BlobBuilder || (global.MSBlobBuilder || (global.MozBlobBuilder || global.WebKitBlobBuilder));
                  var builder = new BlobBuilder;
                  /** @type {number} */
                  var i = 0;
                  for (;i < parts.length;i += 1) {
                    builder.append(parts[i]);
                  }
                  return builder.getBlob(properties.type);
                }
              }
              /**
               * @param {string} bin
               * @return {?}
               */
              function fixBinary(bin) {
                var l = bin.length;
                /** @type {ArrayBuffer} */
                var arrayBuf = new ArrayBuffer(l);
                /** @type {Uint8Array} */
                var ia = new Uint8Array(arrayBuf);
                /** @type {number} */
                var i = 0;
                for (;l > i;i++) {
                  ia[i] = bin.charCodeAt(i);
                }
                return arrayBuf;
              }
              /**
               * @param {?} url
               * @return {?}
               */
              function template(url) {
                return new Promise(function(callback, cb) {
                  /** @type {XMLHttpRequest} */
                  var xhr = new XMLHttpRequest;
                  xhr.open("GET", url);
                  /** @type {boolean} */
                  xhr.withCredentials = true;
                  /** @type {string} */
                  xhr.responseType = "arraybuffer";
                  /**
                   * @return {?}
                   */
                  xhr.onreadystatechange = function() {
                    return 4 === xhr.readyState ? 200 === xhr.status ? callback({
                      response : xhr.response,
                      type : xhr.getResponseHeader("Content-Type")
                    }) : void cb({
                      status : xhr.status,
                      response : xhr.response
                    }) : void 0;
                  };
                  xhr.send();
                });
              }
              /**
               * @param {(IDBObjectStore|IDBTransaction)} db
               * @return {?}
               */
              function exportData(db) {
                return(new Promise(function(some, callback) {
                  var PAD0 = createBlob([""], {
                    type : "image/png"
                  });
                  var trans = db.transaction([storeName], "readwrite");
                  trans.objectStore(storeName).put(PAD0, "key");
                  /**
                   * @return {undefined}
                   */
                  trans.oncomplete = function() {
                    var trans = db.transaction([storeName], "readwrite");
                    var request = trans.objectStore(storeName).get("key");
                    /** @type {Function} */
                    request.onerror = callback;
                    /**
                     * @param {Event} event
                     * @return {undefined}
                     */
                    request.onsuccess = function(event) {
                      var videofile = event.target.result;
                      var url = URL.createObjectURL(videofile);
                      template(url).then(function(statement) {
                        some(!(!statement || "image/png" !== statement.type));
                      }, function() {
                        some(false);
                      }).then(function() {
                        URL.revokeObjectURL(url);
                      });
                    };
                  };
                  trans.onerror = trans.onabort = callback;
                }))["catch"](function() {
                  return false;
                });
              }
              /**
               * @param {(IDBObjectStore|IDBTransaction)} key
               * @return {?}
               */
              function errorHandler(key) {
                return "boolean" == typeof val ? Promise.resolve(val) : exportData(key).then(function(n) {
                  return val = n;
                });
              }
              /**
               * @param {Object} f
               * @return {?}
               */
              function Put_(f) {
                return new Promise(function(callback, errorHandler) {
                  /** @type {FileReader} */
                  var reader = new FileReader;
                  /** @type {(RegExp|string)} */
                  reader.onerror = errorHandler;
                  /**
                   * @param {Event} evt
                   * @return {undefined}
                   */
                  reader.onloadend = function(evt) {
                    var datauri = btoa(evt.target.result || "");
                    callback({
                      __local_forage_encoded_blob : true,
                      data : datauri,
                      type : f.type
                    });
                  };
                  reader.readAsBinaryString(f);
                });
              }
              /**
               * @param {Event} data
               * @return {?}
               */
              function reset(data) {
                var t = fixBinary(atob(data.data));
                return createBlob([t], {
                  type : data.type
                });
              }
              /**
               * @param {?} id
               * @return {?}
               */
              function cancelAnimationFrame(id) {
                return id && id.__local_forage_encoded_blob;
              }
              /**
               * @param {Function} reject
               * @return {?}
               */
              function run(reject) {
                var re = this;
                var promise = re._initReady().then(function() {
                  var parent = args[re._dbInfo.name];
                  return parent && parent.dbReady ? parent.dbReady : void 0;
                });
                return promise.then(reject, reject), promise;
              }
              /**
               * @param {Function} value
               * @return {undefined}
               */
              function main(value) {
                var me = args[value.name];
                var deferred = {};
                deferred.promise = new Promise(function(resolve) {
                  /** @type {Function} */
                  deferred.resolve = resolve;
                });
                me.deferredOperations.push(deferred);
                me.dbReady = me.dbReady ? me.dbReady.then(function() {
                  return deferred.promise;
                }) : deferred.promise;
              }
              /**
               * @param {Function} token
               * @return {undefined}
               */
              function handler(token) {
                var arg = args[token.name];
                var dfd = arg.deferredOperations.pop();
                if (dfd) {
                  dfd.resolve();
                }
              }
              /**
               * @param {Object} attrs
               * @return {?}
               */
              function create(attrs) {
                /**
                 * @return {?}
                 */
                function next() {
                  return Promise.resolve();
                }
                var msg = this;
                var self = {
                  db : null
                };
                if (attrs) {
                  var attr;
                  for (attr in attrs) {
                    self[attr] = attrs[attr];
                  }
                }
                if (!args) {
                  args = {};
                }
                var config = args[self.name];
                if (!config) {
                  config = {
                    forages : [],
                    db : null,
                    dbReady : null,
                    deferredOperations : []
                  };
                  args[self.name] = config;
                }
                config.forages.push(msg);
                if (!msg._initReady) {
                  msg._initReady = msg.ready;
                  /** @type {function (Function): ?} */
                  msg.ready = run;
                }
                /** @type {Array} */
                var nodeArgs = [];
                /** @type {number} */
                var i = 0;
                for (;i < config.forages.length;i++) {
                  var seg = config.forages[i];
                  if (seg !== msg) {
                    nodeArgs.push(seg._initReady()["catch"](next));
                  }
                }
                /** @type {Array.<?>} */
                var resultItems = config.forages.slice(0);
                return Promise.all(nodeArgs).then(function() {
                  return self.db = config.db, set(self);
                }).then(function(db) {
                  return self.db = db, callback(self, msg._defaultConfig.version) ? trigger(self) : db;
                }).then(function(db) {
                  self.db = config.db = db;
                  msg._dbInfo = self;
                  /** @type {number} */
                  var i = 0;
                  for (;i < resultItems.length;i++) {
                    var result = resultItems[i];
                    if (result !== msg) {
                      result._dbInfo.db = self.db;
                      result._dbInfo.version = self.version;
                    }
                  }
                });
              }
              /**
               * @param {Object} config
               * @return {?}
               */
              function set(config) {
                return req(config, false);
              }
              /**
               * @param {Object} args
               * @return {?}
               */
              function trigger(args) {
                return req(args, true);
              }
              /**
               * @param {Object} options
               * @param {boolean} recurring
               * @return {?}
               */
              function req(options, recurring) {
                return new Promise(function(callback, done) {
                  if (options.db) {
                    if (!recurring) {
                      return callback(options.db);
                    }
                    main(options);
                    options.db.close();
                  }
                  /** @type {Array} */
                  var args = [options.name];
                  if (recurring) {
                    args.push(options.version);
                  }
                  var req = output.open.apply(output, args);
                  if (recurring) {
                    /**
                     * @param {Event} event
                     * @return {undefined}
                     */
                    req.onupgradeneeded = function(event) {
                      var db = req.result;
                      try {
                        db.createObjectStore(options.storeName);
                        if (event.oldVersion <= 1) {
                          db.createObjectStore(storeName);
                        }
                      } catch (symbol) {
                        if ("ConstraintError" !== symbol.name) {
                          throw symbol;
                        }
                        global.console.warn('The database "' + options.name + '" has been upgraded from version ' + event.oldVersion + " to version " + event.newVersion + ', but the storage "' + options.storeName + '" already exists.');
                      }
                    };
                  }
                  /**
                   * @return {undefined}
                   */
                  req.onerror = function() {
                    done(req.error);
                  };
                  /**
                   * @return {undefined}
                   */
                  req.onsuccess = function() {
                    callback(req.result);
                    handler(options);
                  };
                });
              }
              /**
               * @param {Object} self
               * @param {?} x
               * @return {?}
               */
              function callback(self, x) {
                if (!self.db) {
                  return true;
                }
                /** @type {boolean} */
                var inverse = !self.db.objectStoreNames.contains(self.storeName);
                /** @type {boolean} */
                var o = self.version < self.db.version;
                /** @type {boolean} */
                var program = self.version > self.db.version;
                if (o && (self.version !== x && global.console.warn('The database "' + self.name + "\" can't be downgraded from version " + self.db.version + " to version " + self.version + "."), self.version = self.db.version), program || inverse) {
                  if (inverse) {
                    var version = self.db.version + 1;
                    if (version > self.version) {
                      self.version = version;
                    }
                  }
                  return true;
                }
                return false;
              }
              /**
               * @param {string} url
               * @param {Function} opt_obj2
               * @return {?}
               */
              function init(url, opt_obj2) {
                var elem = this;
                if ("string" != typeof url) {
                  global.console.warn(url + " used as a key, but it is not a string.");
                  /** @type {string} */
                  url = String(url);
                }
                var resolved = new Promise(function(resolve, done) {
                  elem.ready().then(function() {
                    var options = elem._dbInfo;
                    var requestCache = options.db.transaction(options.storeName, "readonly").objectStore(options.storeName);
                    var req = requestCache.get(url);
                    /**
                     * @return {undefined}
                     */
                    req.onsuccess = function() {
                      var id = req.result;
                      if (void 0 === id) {
                        /** @type {null} */
                        id = null;
                      }
                      if (cancelAnimationFrame(id)) {
                        id = reset(id);
                      }
                      resolve(id);
                    };
                    /**
                     * @return {undefined}
                     */
                    req.onerror = function() {
                      done(req.error);
                    };
                  })["catch"](done);
                });
                return then(resolved, opt_obj2), resolved;
              }
              /**
               * @param {?} callback
               * @param {Function} opt_obj2
               * @return {?}
               */
              function load(callback, opt_obj2) {
                var elem = this;
                var resolved = new Promise(function(filter, onerror) {
                  elem.ready().then(function() {
                    var options = elem._dbInfo;
                    var source = options.db.transaction(options.storeName, "readonly").objectStore(options.storeName);
                    var data = source.openCursor();
                    /** @type {number} */
                    var i = 1;
                    /**
                     * @return {undefined}
                     */
                    data.onsuccess = function() {
                      var object = data.result;
                      if (object) {
                        var id = object.value;
                        if (cancelAnimationFrame(id)) {
                          id = reset(id);
                        }
                        var current = callback(id, object.key, i++);
                        if (void 0 !== current) {
                          filter(current);
                        } else {
                          object["continue"]();
                        }
                      } else {
                        filter();
                      }
                    };
                    /**
                     * @return {undefined}
                     */
                    data.onerror = function() {
                      onerror(data.error);
                    };
                  })["catch"](onerror);
                });
                return then(resolved, opt_obj2), resolved;
              }
              /**
               * @param {string} value
               * @param {?} node
               * @param {Function} opt_obj2
               * @return {?}
               */
              function render(value, node, opt_obj2) {
                var PhoneGap = this;
                if ("string" != typeof value) {
                  global.console.warn(value + " used as a key, but it is not a string.");
                  /** @type {string} */
                  value = String(value);
                }
                var resolved = new Promise(function(complete, add) {
                  var self;
                  PhoneGap.ready().then(function() {
                    return self = PhoneGap._dbInfo, node instanceof Blob ? errorHandler(self.db).then(function(returnDom) {
                      return returnDom ? node : Put_(node);
                    }) : node;
                  }).then(function(data) {
                    var tx = self.db.transaction(self.storeName, "readwrite");
                    var buffer = tx.objectStore(self.storeName);
                    if (null === data) {
                      data = void 0;
                    }
                    /**
                     * @return {undefined}
                     */
                    tx.oncomplete = function() {
                      if (void 0 === data) {
                        /** @type {null} */
                        data = null;
                      }
                      complete(data);
                    };
                    /** @type {function (): undefined} */
                    tx.onabort = tx.onerror = function() {
                      var prefix = result.error ? result.error : result.transaction.error;
                      add(prefix);
                    };
                    var result = buffer.put(data, value);
                  })["catch"](add);
                });
                return then(resolved, opt_obj2), resolved;
              }
              /**
               * @param {string} url
               * @param {Function} opt_obj2
               * @return {?}
               */
              function start(url, opt_obj2) {
                var PhoneGap = this;
                if ("string" != typeof url) {
                  global.console.warn(url + " used as a key, but it is not a string.");
                  /** @type {string} */
                  url = String(url);
                }
                var resolved = new Promise(function(next, done) {
                  PhoneGap.ready().then(function() {
                    var _this = PhoneGap._dbInfo;
                    var transaction = _this.db.transaction(_this.storeName, "readwrite");
                    var $http = transaction.objectStore(_this.storeName);
                    var error = $http["delete"](url);
                    /**
                     * @return {undefined}
                     */
                    transaction.oncomplete = function() {
                      next();
                    };
                    /**
                     * @return {undefined}
                     */
                    transaction.onerror = function() {
                      done(error.error);
                    };
                    /**
                     * @return {undefined}
                     */
                    transaction.onabort = function() {
                      var err = error.error ? error.error : error.transaction.error;
                      done(err);
                    };
                  })["catch"](done);
                });
                return then(resolved, opt_obj2), resolved;
              }
              /**
               * @param {Function} opt_obj2
               * @return {?}
               */
              function getApp1Offset(opt_obj2) {
                var PhoneGap = this;
                var resolved = new Promise(function(done, add) {
                  PhoneGap.ready().then(function() {
                    var _this = PhoneGap._dbInfo;
                    var transaction = _this.db.transaction(_this.storeName, "readwrite");
                    var two = transaction.objectStore(_this.storeName);
                    var error = two.clear();
                    /**
                     * @return {undefined}
                     */
                    transaction.oncomplete = function() {
                      done();
                    };
                    /** @type {function (): undefined} */
                    transaction.onabort = transaction.onerror = function() {
                      var prefix = error.error ? error.error : error.transaction.error;
                      add(prefix);
                    };
                  })["catch"](add);
                });
                return then(resolved, opt_obj2), resolved;
              }
              /**
               * @param {Function} opt_obj2
               * @return {?}
               */
              function loadDocument(opt_obj2) {
                var elem = this;
                var resolved = new Promise(function(callback, fn) {
                  elem.ready().then(function() {
                    var options = elem._dbInfo;
                    var collection = options.db.transaction(options.storeName, "readonly").objectStore(options.storeName);
                    var self = collection.count();
                    /**
                     * @return {undefined}
                     */
                    self.onsuccess = function() {
                      callback(self.result);
                    };
                    /**
                     * @return {undefined}
                     */
                    self.onerror = function() {
                      fn(self.error);
                    };
                  })["catch"](fn);
                });
                return then(resolved, opt_obj2), resolved;
              }
              /**
               * @param {number} index
               * @param {Function} opt_obj2
               * @return {?}
               */
              function fetch(index, opt_obj2) {
                var elem = this;
                var resolved = new Promise(function(callback, done) {
                  return 0 > index ? void callback(null) : void elem.ready().then(function() {
                    var options = elem._dbInfo;
                    var source = options.db.transaction(options.storeName, "readonly").objectStore(options.storeName);
                    /** @type {boolean} */
                    var err = false;
                    var res = source.openCursor();
                    /**
                     * @return {?}
                     */
                    res.onsuccess = function() {
                      var data = res.result;
                      return data ? void(0 === index ? callback(data.key) : err ? callback(data.key) : (err = true, data.advance(index))) : void callback(null);
                    };
                    /**
                     * @return {undefined}
                     */
                    res.onerror = function() {
                      done(res.error);
                    };
                  })["catch"](done);
                });
                return then(resolved, opt_obj2), resolved;
              }
              /**
               * @param {Object} obj
               * @return {?}
               */
              function validate(obj) {
                var elem = this;
                var resolved = new Promise(function(forEach, fn) {
                  elem.ready().then(function() {
                    var options = elem._dbInfo;
                    var source = options.db.transaction(options.storeName, "readonly").objectStore(options.storeName);
                    var self = source.openCursor();
                    /** @type {Array} */
                    var keys = [];
                    /**
                     * @return {?}
                     */
                    self.onsuccess = function() {
                      var cursor = self.result;
                      return cursor ? (keys.push(cursor.key), void cursor["continue"]()) : void forEach(keys);
                    };
                    /**
                     * @return {undefined}
                     */
                    self.onerror = function() {
                      fn(self.error);
                    };
                  })["catch"](fn);
                });
                return then(resolved, obj), resolved;
              }
              /**
               * @param {?} resolved
               * @param {Function} f
               * @return {undefined}
               */
              function then(resolved, f) {
                if (f) {
                  resolved.then(function(wholeDoc) {
                    f(null, wholeDoc);
                  }, function(message) {
                    f(message);
                  });
                }
              }
              var output = output || (global.indexedDB || (global.webkitIndexedDB || (global.mozIndexedDB || (global.OIndexedDB || global.msIndexedDB))));
              if (output) {
                var val;
                var args;
                /** @type {string} */
                var storeName = "local-forage-detect-blob-support";
                var defaults = {
                  _driver : "asyncStorage",
                  /** @type {function (Object): ?} */
                  _initStorage : create,
                  /** @type {function (?, Function): ?} */
                  iterate : load,
                  /** @type {function (string, Function): ?} */
                  getItem : init,
                  /** @type {function (string, ?, Function): ?} */
                  setItem : render,
                  /** @type {function (string, Function): ?} */
                  removeItem : start,
                  /** @type {function (Function): ?} */
                  clear : getApp1Offset,
                  /** @type {function (Function): ?} */
                  length : loadDocument,
                  /** @type {function (number, Function): ?} */
                  key : fetch,
                  /** @type {function (Object): ?} */
                  keys : validate
                };
                return defaults;
              }
            }("undefined" != typeof window ? window : exports);
            __exports__["default"] = handlebars;
            $.exports = __exports__["default"];
          }, function($, __exports__, $timeout) {
            /** @type {boolean} */
            __exports__.__esModule = true;
            var handlebars = function(options) {
              /**
               * @param {Object} data
               * @return {?}
               */
              function onSuccess(data) {
                var args = this;
                var self = {};
                if (data) {
                  var prop;
                  for (prop in data) {
                    self[prop] = data[prop];
                  }
                }
                return self.keyPrefix = self.name + "/", self.storeName !== args._defaultConfig.storeName && (self.keyPrefix += self.storeName + "/"), args._dbInfo = self, (new Promise(function(successCB) {
                  successCB($timeout(3));
                })).then(function(serializer) {
                  return self.serializer = serializer, Promise.resolve();
                });
              }
              /**
               * @param {Function} element
               * @return {?}
               */
              function setup(element) {
                var req = this;
                var resolved = req.ready().then(function() {
                  var SPACE = req._dbInfo.keyPrefix;
                  /** @type {number} */
                  var i = self.length - 1;
                  for (;i >= 0;i--) {
                    var key = self.key(i);
                    if (0 === key.indexOf(SPACE)) {
                      self.removeItem(key);
                    }
                  }
                });
                return then(resolved, element), resolved;
              }
              /**
               * @param {string} url
               * @param {Function} expression
               * @return {?}
               */
              function initialize(url, expression) {
                var elem = this;
                if ("string" != typeof url) {
                  options.console.warn(url + " used as a key, but it is not a string.");
                  /** @type {string} */
                  url = String(url);
                }
                var resolved = elem.ready().then(function() {
                  var options = elem._dbInfo;
                  var parent = self.getItem(options.keyPrefix + url);
                  return parent && (parent = options.serializer.deserialize(parent)), parent;
                });
                return then(resolved, expression), resolved;
              }
              /**
               * @param {?} callback
               * @param {Function} context
               * @return {?}
               */
              function render(callback, context) {
                var elem = this;
                var resolved = elem.ready().then(function() {
                  var options = elem._dbInfo;
                  var prefix = options.keyPrefix;
                  var prefixLength = prefix.length;
                  var remaining = self.length;
                  /** @type {number} */
                  var i = 1;
                  /** @type {number} */
                  var name = 0;
                  for (;remaining > name;name++) {
                    var href = self.key(name);
                    if (0 === href.indexOf(prefix)) {
                      var value = self.getItem(href);
                      if (value && (value = options.serializer.deserialize(value)), value = callback(value, href.substring(prefixLength), i++), void 0 !== value) {
                        return value;
                      }
                    }
                  }
                });
                return then(resolved, context), resolved;
              }
              /**
               * @param {number} index
               * @param {Function} e
               * @return {?}
               */
              function completed(index, e) {
                var context = this;
                var resolved = context.ready().then(function() {
                  var a;
                  var j = context._dbInfo;
                  try {
                    a = self.key(index);
                  } catch (o) {
                    /** @type {null} */
                    a = null;
                  }
                  return a && (a = a.substring(j.keyPrefix.length)), a;
                });
                return then(resolved, e), resolved;
              }
              /**
               * @param {Object} obj
               * @return {?}
               */
              function next(obj) {
                var body = this;
                var resolved = body.ready().then(function() {
                  var n = body._dbInfo;
                  var len = self.length;
                  /** @type {Array} */
                  var results = [];
                  /** @type {number} */
                  var i = 0;
                  for (;len > i;i++) {
                    if (0 === self.key(i).indexOf(n.keyPrefix)) {
                      results.push(self.key(i).substring(n.keyPrefix.length));
                    }
                  }
                  return results;
                });
                return then(resolved, obj), resolved;
              }
              /**
               * @param {Function} element
               * @return {?}
               */
              function postLink(element) {
                var me = this;
                var resolved = me.keys().then(function(newlines) {
                  return newlines.length;
                });
                return then(resolved, element), resolved;
              }
              /**
               * @param {string} key
               * @param {Function} win
               * @return {?}
               */
              function init(key, win) {
                var elem = this;
                if ("string" != typeof key) {
                  options.console.warn(key + " used as a key, but it is not a string.");
                  /** @type {string} */
                  key = String(key);
                }
                var resolved = elem.ready().then(function() {
                  var options = elem._dbInfo;
                  self.removeItem(options.keyPrefix + key);
                });
                return then(resolved, win), resolved;
              }
              /**
               * @param {string} url
               * @param {Object} obj
               * @param {Function} win
               * @return {?}
               */
              function register(url, obj, win) {
                var elem = this;
                if ("string" != typeof url) {
                  options.console.warn(url + " used as a key, but it is not a string.");
                  /** @type {string} */
                  url = String(url);
                }
                var resolved = elem.ready().then(function() {
                  if (void 0 === obj) {
                    /** @type {null} */
                    obj = null;
                  }
                  /** @type {Object} */
                  var last = obj;
                  return new Promise(function(process, cb) {
                    var options = elem._dbInfo;
                    options.serializer.serialize(obj, function(value, outErr) {
                      if (outErr) {
                        cb(outErr);
                      } else {
                        try {
                          self.setItem(options.keyPrefix + url, value);
                          process(last);
                        } catch (ex) {
                          if ("QuotaExceededError" === ex.name || "NS_ERROR_DOM_QUOTA_REACHED" === ex.name) {
                            cb(ex);
                          }
                          cb(ex);
                        }
                      }
                    });
                  });
                });
                return then(resolved, win), resolved;
              }
              /**
               * @param {?} resolved
               * @param {Function} win
               * @return {undefined}
               */
              function then(resolved, win) {
                if (win) {
                  resolved.then(function(deepDataAndEvents) {
                    win(null, deepDataAndEvents);
                  }, function(b) {
                    win(b);
                  });
                }
              }
              /** @type {null} */
              var self = null;
              try {
                if (!(options.localStorage && "setItem" in options.localStorage)) {
                  return;
                }
                self = options.localStorage;
              } catch (p) {
                return;
              }
              var defaults = {
                _driver : "localStorageWrapper",
                /** @type {function (Object): ?} */
                _initStorage : onSuccess,
                /** @type {function (?, Function): ?} */
                iterate : render,
                /** @type {function (string, Function): ?} */
                getItem : initialize,
                /** @type {function (string, Object, Function): ?} */
                setItem : register,
                /** @type {function (string, Function): ?} */
                removeItem : init,
                /** @type {function (Function): ?} */
                clear : setup,
                /** @type {function (Function): ?} */
                length : postLink,
                /** @type {function (number, Function): ?} */
                key : completed,
                /** @type {function (Object): ?} */
                keys : next
              };
              return defaults;
            }("undefined" != typeof window ? window : exports);
            __exports__["default"] = handlebars;
            $.exports = __exports__["default"];
          }, function($, __exports__) {
            /** @type {boolean} */
            __exports__.__esModule = true;
            var handlebars = function(global) {
              /**
               * @param {Array} parts
               * @param {Object} properties
               * @return {?}
               */
              function createBlob(parts, properties) {
                parts = parts || [];
                properties = properties || {};
                try {
                  return new Blob(parts, properties);
                } catch (symbol) {
                  if ("TypeError" !== symbol.name) {
                    throw symbol;
                  }
                  var BlobBuilder = global.BlobBuilder || (global.MSBlobBuilder || (global.MozBlobBuilder || global.WebKitBlobBuilder));
                  var builder = new BlobBuilder;
                  /** @type {number} */
                  var i = 0;
                  for (;i < parts.length;i += 1) {
                    builder.append(parts[i]);
                  }
                  return builder.getBlob(properties.type);
                }
              }
              /**
               * @param {Object} data
               * @param {Function} callback
               * @return {undefined}
               */
              function post(data, callback) {
                /** @type {string} */
                var optsData = "";
                if (data && (optsData = data.toString()), data && ("[object ArrayBuffer]" === data.toString() || data.buffer && "[object ArrayBuffer]" === data.buffer.toString())) {
                  var arrayBuffer;
                  /** @type {string} */
                  var x = a;
                  if (data instanceof ArrayBuffer) {
                    /** @type {Object} */
                    arrayBuffer = data;
                    x += offset;
                  } else {
                    arrayBuffer = data.buffer;
                    if ("[object Int8Array]" === optsData) {
                      x += borderX;
                    } else {
                      if ("[object Uint8Array]" === optsData) {
                        x += bl;
                      } else {
                        if ("[object Uint8ClampedArray]" === optsData) {
                          x += rIncrease;
                        } else {
                          if ("[object Int16Array]" === optsData) {
                            x += yIncrease;
                          } else {
                            if ("[object Uint16Array]" === optsData) {
                              x += chunk;
                            } else {
                              if ("[object Int32Array]" === optsData) {
                                x += parentBorder;
                              } else {
                                if ("[object Uint32Array]" === optsData) {
                                  x += nodeLength;
                                } else {
                                  if ("[object Float32Array]" === optsData) {
                                    x += dx;
                                  } else {
                                    if ("[object Float64Array]" === optsData) {
                                      x += wavePixelChunk;
                                    } else {
                                      callback(new Error("Failed to get type for BinaryArray"));
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  callback(x + onSuccess(arrayBuffer));
                } else {
                  if ("[object Blob]" === optsData) {
                    /** @type {FileReader} */
                    var fileReader = new FileReader;
                    /**
                     * @return {undefined}
                     */
                    fileReader.onload = function() {
                      /** @type {string} */
                      var c = viewclient + data.type + "~" + onSuccess(this.result);
                      callback(a + b + c);
                    };
                    fileReader.readAsArrayBuffer(data);
                  } else {
                    try {
                      callback(JSON.stringify(data));
                    } catch (feed) {
                      console.error("Couldn't convert value into a JSON string: ", data);
                      callback(null, feed);
                    }
                  }
                }
              }
              /**
               * @param {string} s
               * @return {?}
               */
              function parse(s) {
                if (s.substring(0, x) !== a) {
                  return JSON.parse(s);
                }
                var eventName;
                var target = s.substring(e);
                var pos = s.substring(x, e);
                if (pos === b && pattern.test(target)) {
                  var matches = target.match(pattern);
                  eventName = matches[1];
                  target = target.substring(matches[0].length);
                }
                var length = append(target);
                switch(pos) {
                  case offset:
                    return length;
                  case b:
                    return createBlob([length], {
                      type : eventName
                    });
                  case borderX:
                    return new Int8Array(length);
                  case bl:
                    return new Uint8Array(length);
                  case rIncrease:
                    return new Uint8ClampedArray(length);
                  case yIncrease:
                    return new Int16Array(length);
                  case chunk:
                    return new Uint16Array(length);
                  case parentBorder:
                    return new Int32Array(length);
                  case nodeLength:
                    return new Uint32Array(length);
                  case dx:
                    return new Float32Array(length);
                  case wavePixelChunk:
                    return new Float64Array(length);
                  default:
                    throw new Error("Unkown type: " + pos);;
                }
              }
              /**
               * @param {Array} array
               * @return {?}
               */
              function append(array) {
                var index;
                var enc1;
                var enc2;
                var o;
                var i;
                /** @type {number} */
                var l = 0.75 * array.length;
                var currentIndex = array.length;
                /** @type {number} */
                var j = 0;
                if ("=" === array[array.length - 1]) {
                  l--;
                  if ("=" === array[array.length - 2]) {
                    l--;
                  }
                }
                /** @type {ArrayBuffer} */
                var res = new ArrayBuffer(l);
                /** @type {Uint8Array} */
                var data = new Uint8Array(res);
                /** @type {number} */
                index = 0;
                for (;currentIndex > index;index += 4) {
                  /** @type {number} */
                  enc1 = results.indexOf(array[index]);
                  /** @type {number} */
                  enc2 = results.indexOf(array[index + 1]);
                  /** @type {number} */
                  o = results.indexOf(array[index + 2]);
                  /** @type {number} */
                  i = results.indexOf(array[index + 3]);
                  /** @type {number} */
                  data[j++] = enc1 << 2 | enc2 >> 4;
                  /** @type {number} */
                  data[j++] = (15 & enc2) << 4 | o >> 2;
                  /** @type {number} */
                  data[j++] = (3 & o) << 6 | 63 & i;
                }
                return res;
              }
              /**
               * @param {string} data
               * @return {?}
               */
              function onSuccess(data) {
                var i;
                /** @type {Uint8Array} */
                var ba = new Uint8Array(data);
                /** @type {string} */
                var code = "";
                /** @type {number} */
                i = 0;
                for (;i < ba.length;i += 3) {
                  code += results[ba[i] >> 2];
                  code += results[(3 & ba[i]) << 4 | ba[i + 1] >> 4];
                  code += results[(15 & ba[i + 1]) << 2 | ba[i + 2] >> 6];
                  code += results[63 & ba[i + 2]];
                }
                return ba.length % 3 === 2 ? code = code.substring(0, code.length - 1) + "=" : ba.length % 3 === 1 && (code = code.substring(0, code.length - 2) + "=="), code;
              }
              /** @type {string} */
              var results = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
              /** @type {string} */
              var viewclient = "~~local_forage_type~";
              /** @type {RegExp} */
              var pattern = /^~~local_forage_type~([^~]+)~/;
              /** @type {string} */
              var a = "__lfsc__:";
              /** @type {number} */
              var x = a.length;
              /** @type {string} */
              var offset = "arbf";
              /** @type {string} */
              var b = "blob";
              /** @type {string} */
              var borderX = "si08";
              /** @type {string} */
              var bl = "ui08";
              /** @type {string} */
              var rIncrease = "uic8";
              /** @type {string} */
              var yIncrease = "si16";
              /** @type {string} */
              var parentBorder = "si32";
              /** @type {string} */
              var chunk = "ur16";
              /** @type {string} */
              var nodeLength = "ui32";
              /** @type {string} */
              var dx = "fl32";
              /** @type {string} */
              var wavePixelChunk = "fl64";
              /** @type {number} */
              var e = x + offset.length;
              var typeTranslation = {
                /** @type {function (Object, Function): undefined} */
                serialize : post,
                /** @type {function (string): ?} */
                deserialize : parse,
                /** @type {function (Array): ?} */
                stringToBuffer : append,
                /** @type {function (string): ?} */
                bufferToString : onSuccess
              };
              return typeTranslation;
            }("undefined" != typeof window ? window : exports);
            __exports__["default"] = handlebars;
            $.exports = __exports__["default"];
          }, function($, __exports__, assert) {
            /** @type {boolean} */
            __exports__.__esModule = true;
            var handlebars = function(options) {
              /**
               * @param {Object} set
               * @return {?}
               */
              function add(set) {
                var returnFunc = this;
                var options = {
                  db : null
                };
                if (set) {
                  var i;
                  for (i in set) {
                    options[i] = "string" != typeof set[i] ? set[i].toString() : set[i];
                  }
                }
                var p1 = new Promise(function($sanitize, cb) {
                  try {
                    options.db = callback(options.name, String(options.version), options.description, options.size);
                  } catch (er) {
                    return cb(er);
                  }
                  options.db.transaction(function(tx) {
                    tx.executeSql("CREATE TABLE IF NOT EXISTS " + options.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], function() {
                      returnFunc._dbInfo = options;
                      $sanitize();
                    }, function(dataAndEvents, outErr) {
                      cb(outErr);
                    });
                  });
                });
                return(new Promise(function(done) {
                  done(assert(3));
                })).then(function(uri) {
                  return options.serializer = uri, p1;
                });
              }
              /**
               * @param {string} url
               * @param {Function} opt_obj2
               * @return {?}
               */
              function init(url, opt_obj2) {
                var game = this;
                if ("string" != typeof url) {
                  options.console.warn(url + " used as a key, but it is not a string.");
                  /** @type {string} */
                  url = String(url);
                }
                var resolved = new Promise(function(forOwn, cb) {
                  game.ready().then(function() {
                    var self = game._dbInfo;
                    self.db.transaction(function(transaction) {
                      transaction.executeSql("SELECT * FROM " + self.storeName + " WHERE key = ? LIMIT 1", [url], function(dataAndEvents, results) {
                        var obj = results.rows.length ? results.rows.item(0).value : null;
                        if (obj) {
                          obj = self.serializer.deserialize(obj);
                        }
                        forOwn(obj);
                      }, function(dataAndEvents, outErr) {
                        cb(outErr);
                      });
                    });
                  })["catch"](cb);
                });
                return then(resolved, opt_obj2), resolved;
              }
              /**
               * @param {?} $sanitize
               * @param {Function} opt_obj2
               * @return {?}
               */
              function getApp1Offset($sanitize, opt_obj2) {
                var game = this;
                var resolved = new Promise(function(indentCode, cb) {
                  game.ready().then(function() {
                    var self = game._dbInfo;
                    self.db.transaction(function(tx) {
                      tx.executeSql("SELECT * FROM " + self.storeName, [], function(dataAndEvents, result) {
                        var rows = result.rows;
                        var l = rows.length;
                        /** @type {number} */
                        var i = 0;
                        for (;l > i;i++) {
                          var field = rows.item(i);
                          var value = field.value;
                          if (value && (value = self.serializer.deserialize(value)), value = $sanitize(value, field.key, i + 1), void 0 !== value) {
                            return void indentCode(value);
                          }
                        }
                        indentCode();
                      }, function(dataAndEvents, outErr) {
                        cb(outErr);
                      });
                    });
                  })["catch"](cb);
                });
                return then(resolved, opt_obj2), resolved;
              }
              /**
               * @param {string} v
               * @param {Object} values
               * @param {Function} opt_obj2
               * @return {?}
               */
              function render(v, values, opt_obj2) {
                var game = this;
                if ("string" != typeof v) {
                  options.console.warn(v + " used as a key, but it is not a string.");
                  /** @type {string} */
                  v = String(v);
                }
                var resolved = new Promise(function(on, cb) {
                  game.ready().then(function() {
                    if (void 0 === values) {
                      /** @type {null} */
                      values = null;
                    }
                    /** @type {Object} */
                    var failuresLink = values;
                    var self = game._dbInfo;
                    self.serializer.serialize(values, function(offset, outErr) {
                      if (outErr) {
                        cb(outErr);
                      } else {
                        self.db.transaction(function(t) {
                          t.executeSql("INSERT OR REPLACE INTO " + self.storeName + " (key, value) VALUES (?, ?)", [v, offset], function() {
                            on(failuresLink);
                          }, function(dataAndEvents, outErr) {
                            cb(outErr);
                          });
                        }, function(err) {
                          if (err.code === err.QUOTA_ERR) {
                            cb(err);
                          }
                        });
                      }
                    });
                  })["catch"](cb);
                });
                return then(resolved, opt_obj2), resolved;
              }
              /**
               * @param {string} url
               * @param {Function} opt_obj2
               * @return {?}
               */
              function start(url, opt_obj2) {
                var $ = this;
                if ("string" != typeof url) {
                  options.console.warn(url + " used as a key, but it is not a string.");
                  /** @type {string} */
                  url = String(url);
                }
                var resolved = new Promise(function($sanitize, cb) {
                  $.ready().then(function() {
                    var that = $._dbInfo;
                    that.db.transaction(function(transaction) {
                      transaction.executeSql("DELETE FROM " + that.storeName + " WHERE key = ?", [url], function() {
                        $sanitize();
                      }, function(dataAndEvents, outErr) {
                        cb(outErr);
                      });
                    });
                  })["catch"](cb);
                });
                return then(resolved, opt_obj2), resolved;
              }
              /**
               * @param {Function} opt_obj2
               * @return {?}
               */
              function fetch(opt_obj2) {
                var $ = this;
                var resolved = new Promise(function($sanitize, cb) {
                  $.ready().then(function() {
                    var that = $._dbInfo;
                    that.db.transaction(function(tx) {
                      tx.executeSql("DELETE FROM " + that.storeName, [], function() {
                        $sanitize();
                      }, function(dataAndEvents, outErr) {
                        cb(outErr);
                      });
                    });
                  })["catch"](cb);
                });
                return then(resolved, opt_obj2), resolved;
              }
              /**
               * @param {Function} opt_obj2
               * @return {?}
               */
              function load(opt_obj2) {
                var $ = this;
                var resolved = new Promise(function(on, cb) {
                  $.ready().then(function() {
                    var that = $._dbInfo;
                    that.db.transaction(function(tx) {
                      tx.executeSql("SELECT COUNT(key) as c FROM " + that.storeName, [], function(dataAndEvents, results) {
                        var failuresLink = results.rows.item(0).c;
                        on(failuresLink);
                      }, function(dataAndEvents, outErr) {
                        cb(outErr);
                      });
                    });
                  })["catch"](cb);
                });
                return then(resolved, opt_obj2), resolved;
              }
              /**
               * @param {number} index
               * @param {Function} opt_obj2
               * @return {?}
               */
              function validate(index, opt_obj2) {
                var $ = this;
                var resolved = new Promise(function(on, cb) {
                  $.ready().then(function() {
                    var that = $._dbInfo;
                    that.db.transaction(function(tx) {
                      tx.executeSql("SELECT key FROM " + that.storeName + " WHERE id = ? LIMIT 1", [index + 1], function(dataAndEvents, results) {
                        var failuresLink = results.rows.length ? results.rows.item(0).key : null;
                        on(failuresLink);
                      }, function(dataAndEvents, outErr) {
                        cb(outErr);
                      });
                    });
                  })["catch"](cb);
                });
                return then(resolved, opt_obj2), resolved;
              }
              /**
               * @param {Object} obj
               * @return {?}
               */
              function create(obj) {
                var $ = this;
                var resolved = new Promise(function(fire, cb) {
                  $.ready().then(function() {
                    var that = $._dbInfo;
                    that.db.transaction(function(tx) {
                      tx.executeSql("SELECT key FROM " + that.storeName, [], function(dataAndEvents, results) {
                        /** @type {Array} */
                        var memory = [];
                        /** @type {number} */
                        var i = 0;
                        for (;i < results.rows.length;i++) {
                          memory.push(results.rows.item(i).key);
                        }
                        fire(memory);
                      }, function(dataAndEvents, outErr) {
                        cb(outErr);
                      });
                    });
                  })["catch"](cb);
                });
                return then(resolved, obj), resolved;
              }
              /**
               * @param {?} resolved
               * @param {Function} f
               * @return {undefined}
               */
              function then(resolved, f) {
                if (f) {
                  resolved.then(function(wholeDoc) {
                    f(null, wholeDoc);
                  }, function(message) {
                    f(message);
                  });
                }
              }
              var callback = options.openDatabase;
              if (callback) {
                var defaults = {
                  _driver : "webSQLStorage",
                  /** @type {function (Object): ?} */
                  _initStorage : add,
                  /** @type {function (?, Function): ?} */
                  iterate : getApp1Offset,
                  /** @type {function (string, Function): ?} */
                  getItem : init,
                  /** @type {function (string, Object, Function): ?} */
                  setItem : render,
                  /** @type {function (string, Function): ?} */
                  removeItem : start,
                  /** @type {function (Function): ?} */
                  clear : fetch,
                  /** @type {function (Function): ?} */
                  length : load,
                  /** @type {function (number, Function): ?} */
                  key : validate,
                  /** @type {function (Object): ?} */
                  keys : create
                };
                return defaults;
              }
            }("undefined" != typeof window ? window : exports);
            __exports__["default"] = handlebars;
            $.exports = __exports__["default"];
          }]);
        });
      }).call(this, when("promise"));
    }, {
      promise : 4
    }],
    3 : [function(layout, module) {
      /**
       * @param {?} context
       * @return {undefined}
       */
      function Promise(context) {
        /**
         * @param {Object} deferred
         * @return {?}
         */
        function handle(deferred) {
          return null === state ? void deferreds.push(deferred) : void layer(function() {
            var cb = state ? deferred.onFulfilled : deferred.onRejected;
            if (null === cb) {
              return void(state ? deferred.resolve : deferred.reject)(pdataOld);
            }
            var udataCur;
            try {
              udataCur = cb(pdataOld);
            } catch (pdataCur) {
              return void deferred.reject(pdataCur);
            }
            deferred.resolve(udataCur);
          });
        }
        /**
         * @param {boolean} a
         * @return {?}
         */
        function notify(a) {
          try {
            if (a === bup) {
              throw new TypeError("A promise cannot be resolved with itself.");
            }
            if (a && ("object" == typeof a || "function" == typeof a)) {
              var l = a.then;
              if ("function" == typeof l) {
                return void fn(l.bind(a), notify, resolve);
              }
            }
            /** @type {boolean} */
            state = true;
            /** @type {boolean} */
            pdataOld = a;
            then();
          } catch (udataCur) {
            resolve(udataCur);
          }
        }
        /**
         * @param {boolean} value
         * @return {undefined}
         */
        function resolve(value) {
          /** @type {boolean} */
          state = false;
          /** @type {boolean} */
          pdataOld = value;
          then();
        }
        /**
         * @return {undefined}
         */
        function then() {
          /** @type {number} */
          var i = 0;
          var len = deferreds.length;
          for (;len > i;i++) {
            handle(deferreds[i]);
          }
          /** @type {null} */
          deferreds = null;
        }
        if ("object" != typeof this) {
          throw new TypeError("Promises must be constructed via new");
        }
        if ("function" != typeof context) {
          throw new TypeError("not a function");
        }
        /** @type {null} */
        var state = null;
        /** @type {null} */
        var pdataOld = null;
        /** @type {Array} */
        var deferreds = [];
        var bup = this;
        /**
         * @param {Function} recurring
         * @param {Function} onRejected
         * @return {?}
         */
        this.then = function(recurring, onRejected) {
          return new Promise(function(resolve, reject) {
            handle(new Handler(recurring, onRejected, resolve, reject));
          });
        };
        fn(context, notify, resolve);
      }
      /**
       * @param {number} onFulfilled
       * @param {number} onRejected
       * @param {Function} resolve
       * @param {Function} reject
       * @return {undefined}
       */
      function Handler(onFulfilled, onRejected, resolve, reject) {
        /** @type {(Function|null)} */
        this.onFulfilled = "function" == typeof onFulfilled ? onFulfilled : null;
        /** @type {(Function|null)} */
        this.onRejected = "function" == typeof onRejected ? onRejected : null;
        /** @type {Function} */
        this.resolve = resolve;
        /** @type {Function} */
        this.reject = reject;
      }
      /**
       * @param {?} item
       * @param {Function} next
       * @param {Function} cb
       * @return {undefined}
       */
      function fn(item, next, cb) {
        /** @type {boolean} */
        var r = false;
        try {
          item(function(err) {
            if (!r) {
              /** @type {boolean} */
              r = true;
              next(err);
            }
          }, function(outErr) {
            if (!r) {
              /** @type {boolean} */
              r = true;
              cb(outErr);
            }
          });
        } catch (er) {
          if (r) {
            return;
          }
          /** @type {boolean} */
          r = true;
          cb(er);
        }
      }
      var layer = layout("asap");
      /** @type {function (?): undefined} */
      module.exports = Promise;
    }, {
      asap : 5
    }],
    4 : [function(_dereq_, module) {
      /**
       * @param {?} data
       * @return {undefined}
       */
      function Line(data) {
        /**
         * @param {Function} fn
         * @return {?}
         */
        this.then = function(fn) {
          return "function" != typeof fn ? this : new Promise(function(ok, on) {
            nextTick(function() {
              try {
                ok(fn(data));
              } catch (failuresLink) {
                on(failuresLink);
              }
            });
          });
        };
      }
      var Promise = _dereq_("./core.js");
      var nextTick = _dereq_("asap");
      module.exports = Promise;
      /** @type {Object} */
      Line.prototype = Object.create(Promise.prototype);
      var path = new Line(true);
      var promise = new Line(false);
      var _file = new Line(null);
      var uris = new Line(void 0);
      var Adapter = new Line(0);
      var child = new Line("");
      /**
       * @param {Object} data
       * @return {?}
       */
      Promise.resolve = function(data) {
        if (data instanceof Promise) {
          return data;
        }
        if (null === data) {
          return _file;
        }
        if (void 0 === data) {
          return uris;
        }
        if (data === true) {
          return path;
        }
        if (data === false) {
          return promise;
        }
        if (0 === data) {
          return Adapter;
        }
        if ("" === data) {
          return child;
        }
        if ("object" == typeof data || "function" == typeof data) {
          try {
            var options = data.then;
            if ("function" == typeof options) {
              return new Promise(options.bind(data));
            }
          } catch (failuresLink) {
            return new Promise(function(dataAndEvents, on) {
              on(failuresLink);
            });
          }
        }
        return new Line(data);
      };
      /** @type {function (Object): ?} */
      Promise.from = Promise.cast = function(value) {
        /** @type {Error} */
        var ex = new Error("Promise.from and Promise.cast are deprecated, use Promise.resolve instead");
        return ex.name = "Warning", console.warn(ex.stack), Promise.resolve(value);
      };
      /**
       * @param {Function} matcherFunction
       * @param {number} chars
       * @return {?}
       */
      Promise.denodeify = function(matcherFunction, chars) {
        return chars = chars || 1 / 0, function() {
          var newArgs = this;
          /** @type {Array.<?>} */
          var msgs = Array.prototype.slice.call(arguments);
          return new Promise(function(cb, proceed) {
            for (;msgs.length && msgs.length > chars;) {
              msgs.pop();
            }
            msgs.push(function(element, outErr) {
              if (element) {
                proceed(element);
              } else {
                cb(outErr);
              }
            });
            matcherFunction.apply(newArgs, msgs);
          });
        };
      };
      /**
       * @param {Function} matcherFunction
       * @return {?}
       */
      Promise.nodeify = function(matcherFunction) {
        return function() {
          /** @type {Array.<?>} */
          var resolveValues = Array.prototype.slice.call(arguments);
          var callback = "function" == typeof resolveValues[resolveValues.length - 1] ? resolveValues.pop() : null;
          try {
            return matcherFunction.apply(this, arguments).nodeify(callback);
          } catch (STOP) {
            if (null === callback || "undefined" == typeof callback) {
              return new Promise(function(dataAndEvents, callback) {
                callback(STOP);
              });
            }
            nextTick(function() {
              callback(STOP);
            });
          }
        };
      };
      /**
       * @return {?}
       */
      Promise.all = function() {
        /** @type {boolean} */
        var isArrayLike = 1 === arguments.length && Array.isArray(arguments[0]);
        /** @type {Array.<?>} */
        var resultItems = Array.prototype.slice.call(isArrayLike ? arguments[0] : arguments);
        if (!isArrayLike) {
          /** @type {Error} */
          var ex = new Error("Promise.all should be called with a single array, calling it with multiple arguments is deprecated");
          /** @type {string} */
          ex.name = "Warning";
          console.warn(ex.stack);
        }
        return new Promise(function(resolve, b) {
          /**
           * @param {number} i
           * @param {?} obj
           * @return {?}
           */
          function res(i, obj) {
            try {
              if (obj && ("object" == typeof obj || "function" == typeof obj)) {
                var fn = obj.then;
                if ("function" == typeof fn) {
                  return void fn.call(obj, function(walkers) {
                    res(i, walkers);
                  }, b);
                }
              }
              resultItems[i] = obj;
              if (0 === --cnl) {
                resolve(resultItems);
              }
            } catch (self) {
              b(self);
            }
          }
          if (0 === resultItems.length) {
            return resolve([]);
          }
          /** @type {number} */
          var cnl = resultItems.length;
          /** @type {number} */
          var i = 0;
          for (;i < resultItems.length;i++) {
            res(i, resultItems[i]);
          }
        });
      };
      /**
       * @param {Object} value
       * @return {?}
       */
      Promise.reject = function(value) {
        return new Promise(function(dataAndEvents, no) {
          no(value);
        });
      };
      /**
       * @param {Array} entries
       * @return {?}
       */
      Promise.race = function(entries) {
        return new Promise(function(recurring, reject) {
          entries.forEach(function(value) {
            Promise.resolve(value).then(recurring, reject);
          });
        });
      };
      /**
       * @return {undefined}
       */
      Promise.prototype.done = function() {
        var promise = arguments.length ? this.then.apply(this, arguments) : this;
        promise.then(null, function(dataAndEvents) {
          nextTick(function() {
            throw dataAndEvents;
          });
        });
      };
      /**
       * @param {?} cb
       * @return {?}
       */
      Promise.prototype.nodeify = function(cb) {
        return "function" != typeof cb ? this : void this.then(function(srcFiles) {
          nextTick(function() {
            cb(null, srcFiles);
          });
        }, function(outErr) {
          nextTick(function() {
            cb(outErr);
          });
        });
      };
      /**
       * @param {Function} onRejected
       * @return {?}
       */
      Promise.prototype["catch"] = function(onRejected) {
        return this.then(null, onRejected);
      };
    }, {
      "./core.js" : 3,
      asap : 5
    }],
    5 : [function(reduce, module) {
      (function(process, fn) {
        /**
         * @return {undefined}
         */
        function flush() {
          for (;head.next;) {
            head = head.next;
            var task = head.task;
            head.task = void 0;
            var domain = head.domain;
            if (domain) {
              head.domain = void 0;
              domain.enter();
            }
            try {
              task();
            } catch (n) {
              if (isNodeJS) {
                throw domain && domain.exit(), setTimeout(flush, 0), domain && domain.enter(), n;
              }
              setTimeout(function() {
                throw n;
              }, 0);
            }
            if (domain) {
              domain.exit();
            }
          }
          /** @type {boolean} */
          s = false;
        }
        /**
         * @param {Function} task
         * @return {undefined}
         */
        function nextTick(task) {
          tail = tail.next = {
            /** @type {Function} */
            task : task,
            domain : isNodeJS && process.domain,
            next : null
          };
          if (!s) {
            /** @type {boolean} */
            s = true;
            requestTick();
          }
        }
        var head = {
          task : void 0,
          next : null
        };
        var tail = head;
        /** @type {boolean} */
        var s = false;
        var requestTick = void 0;
        /** @type {boolean} */
        var isNodeJS = false;
        if ("undefined" != typeof process && process.nextTick) {
          /** @type {boolean} */
          isNodeJS = true;
          /**
           * @return {undefined}
           */
          requestTick = function() {
            process.nextTick(flush);
          };
        } else {
          if ("function" == typeof fn) {
            /** @type {Function} */
            requestTick = "undefined" != typeof window ? fn.bind(window, flush) : function() {
              fn(flush);
            };
          } else {
            if ("undefined" != typeof MessageChannel) {
              /** @type {MessageChannel} */
              var channel = new MessageChannel;
              /** @type {function (): undefined} */
              channel.port1.onmessage = flush;
              /**
               * @return {undefined}
               */
              requestTick = function() {
                channel.port2.postMessage(0);
              };
            } else {
              /**
               * @return {undefined}
               */
              requestTick = function() {
                setTimeout(flush, 0);
              };
            }
          }
        }
        /** @type {function (Function): undefined} */
        module.exports = nextTick;
      }).call(this, reduce("qvMYcC"), reduce("timers").setImmediate);
    }, {
      qvMYcC : 6,
      timers : 11
    }],
    6 : [function(dataAndEvents, module) {
      /**
       * @return {undefined}
       */
      function tmp() {
      }
      var process = module.exports = {};
      process.nextTick = function() {
        /** @type {(boolean|function (this:Window, function (): ?): number)} */
        var e = "undefined" != typeof window && window.setImmediate;
        /** @type {(boolean|function (this:Window, string, (EventListener|function ((Event|null)): (boolean|undefined)|null), boolean): undefined)} */
        var t = "undefined" != typeof window && (window.postMessage && window.addEventListener);
        if (e) {
          return function(f) {
            return window.setImmediate(f);
          };
        }
        if (t) {
          /** @type {Array} */
          var ql = [];
          return window.addEventListener("message", function(event) {
            /** @type {(Window|null)} */
            var name = event.source;
            if ((name === window || null === name) && ("process-tick" === event.data && (event.stopPropagation(), ql.length > 0))) {
              var throttledUpdate = ql.shift();
              throttledUpdate();
            }
          }, true), function(x) {
            ql.push(x);
            window.postMessage("process-tick", "*");
          };
        }
        return function(fnc) {
          setTimeout(fnc, 0);
        };
      }();
      /** @type {string} */
      process.title = "browser";
      /** @type {boolean} */
      process.browser = true;
      process.env = {};
      /** @type {Array} */
      process.argv = [];
      /** @type {function (): undefined} */
      process.on = tmp;
      /** @type {function (): undefined} */
      process.addListener = tmp;
      /** @type {function (): undefined} */
      process.once = tmp;
      /** @type {function (): undefined} */
      process.off = tmp;
      /** @type {function (): undefined} */
      process.removeListener = tmp;
      /** @type {function (): undefined} */
      process.removeAllListeners = tmp;
      /** @type {function (): undefined} */
      process.emit = tmp;
      /**
       * @return {?}
       */
      process.binding = function() {
        throw new Error("process.binding is not supported");
      };
      /**
       * @return {?}
       */
      process.cwd = function() {
        return "/";
      };
      /**
       * @return {?}
       */
      process.chdir = function() {
        throw new Error("process.chdir is not supported");
      };
    }, {}],
    7 : [function(dataAndEvents, module, arg) {
      (function(data) {
        !function(root) {
          /**
           * @param {string} type
           * @return {?}
           */
          function error(type) {
            throw RangeError(errors[type]);
          }
          /**
           * @param {Object} array
           * @param {Function} fn
           * @return {?}
           */
          function map(array, fn) {
            var length = array.length;
            for (;length--;) {
              array[length] = fn(array[length]);
            }
            return array;
          }
          /**
           * @param {string} string
           * @param {Function} fn
           * @return {?}
           */
          function mapDomain(string, fn) {
            return map(string.split(regexSeparators), fn).join(".");
          }
          /**
           * @param {string} string
           * @return {?}
           */
          function ucs2decode(string) {
            var vvar;
            var n;
            /** @type {Array} */
            var assigns = [];
            /** @type {number} */
            var counter = 0;
            var stringLength = string.length;
            for (;stringLength > counter;) {
              vvar = string.charCodeAt(counter++);
              if (vvar >= 55296 && (56319 >= vvar && stringLength > counter)) {
                n = string.charCodeAt(counter++);
                if (56320 == (64512 & n)) {
                  assigns.push(((1023 & vvar) << 10) + (1023 & n) + 65536);
                } else {
                  assigns.push(vvar);
                  counter--;
                }
              } else {
                assigns.push(vvar);
              }
            }
            return assigns;
          }
          /**
           * @param {?} array
           * @return {?}
           */
          function ucs2encode(array) {
            return map(array, function(value) {
              /** @type {string} */
              var output = "";
              return value > 65535 && (value -= 65536, output += stringFromCharCode(value >>> 10 & 1023 | 55296), value = 56320 | 1023 & value), output += stringFromCharCode(value);
            }).join("");
          }
          /**
           * @param {number} codePoint
           * @return {?}
           */
          function basicToDigit(codePoint) {
            return 10 > codePoint - 48 ? codePoint - 22 : 26 > codePoint - 65 ? codePoint - 65 : 26 > codePoint - 97 ? codePoint - 97 : base;
          }
          /**
           * @param {number} digit
           * @param {number} recurring
           * @return {?}
           */
          function digitToBasic(digit, recurring) {
            return digit + 22 + 75 * (26 > digit) - ((0 != recurring) << 5);
          }
          /**
           * @param {number} delta
           * @param {number} numPoints
           * @param {boolean} firstTime
           * @return {?}
           */
          function adapt(delta, numPoints, firstTime) {
            /** @type {number} */
            var group = 0;
            /** @type {number} */
            delta = firstTime ? floor(delta / damp) : delta >> 1;
            delta += floor(delta / numPoints);
            for (;delta > baseMinusTMin * tMax >> 1;group += base) {
              /** @type {number} */
              delta = floor(delta / baseMinusTMin);
            }
            return floor(group + (baseMinusTMin + 1) * delta / (delta + skew));
          }
          /**
           * @param {string} input
           * @return {?}
           */
          function decode(input) {
            var out;
            var length;
            var j;
            var index;
            var oldi;
            var w;
            var k;
            var digit;
            var t;
            var baseMinusT;
            /** @type {Array} */
            var output = [];
            var inputLength = input.length;
            /** @type {number} */
            var i = 0;
            /** @type {number} */
            var n = initialN;
            /** @type {number} */
            var bias = initialBias;
            length = input.lastIndexOf(item);
            if (0 > length) {
              /** @type {number} */
              length = 0;
            }
            /** @type {number} */
            j = 0;
            for (;length > j;++j) {
              if (input.charCodeAt(j) >= 128) {
                error("not-basic");
              }
              output.push(input.charCodeAt(j));
            }
            index = length > 0 ? length + 1 : 0;
            for (;inputLength > index;) {
              /** @type {number} */
              oldi = i;
              /** @type {number} */
              w = 1;
              /** @type {number} */
              k = base;
              for (;index >= inputLength && error("invalid-input"), digit = basicToDigit(input.charCodeAt(index++)), (digit >= base || digit > floor((maxInt - i) / w)) && error("overflow"), i += digit * w, t = bias >= k ? tMin : k >= bias + tMax ? tMax : k - bias, !(t > digit);k += base) {
                /** @type {number} */
                baseMinusT = base - t;
                if (w > floor(maxInt / baseMinusT)) {
                  error("overflow");
                }
                w *= baseMinusT;
              }
              /** @type {number} */
              out = output.length + 1;
              bias = adapt(i - oldi, out, 0 == oldi);
              if (floor(i / out) > maxInt - n) {
                error("overflow");
              }
              n += floor(i / out);
              i %= out;
              output.splice(i++, 0, n);
            }
            return ucs2encode(output);
          }
          /**
           * @param {(Array|string)} input
           * @return {?}
           */
          function encode(input) {
            var n;
            var delta;
            var handledCPCount;
            var basicLength;
            var bias;
            var j;
            var m;
            var q;
            var k;
            var t;
            var currentValue;
            var _len;
            var handledCPCountPlusOne;
            var baseMinusT;
            var qMinusT;
            /** @type {Array} */
            var output = [];
            input = ucs2decode(input);
            _len = input.length;
            /** @type {number} */
            n = initialN;
            /** @type {number} */
            delta = 0;
            /** @type {number} */
            bias = initialBias;
            /** @type {number} */
            j = 0;
            for (;_len > j;++j) {
              currentValue = input[j];
              if (128 > currentValue) {
                output.push(stringFromCharCode(currentValue));
              }
            }
            /** @type {number} */
            handledCPCount = basicLength = output.length;
            if (basicLength) {
              output.push(item);
            }
            for (;_len > handledCPCount;) {
              /** @type {number} */
              m = maxInt;
              /** @type {number} */
              j = 0;
              for (;_len > j;++j) {
                currentValue = input[j];
                if (currentValue >= n) {
                  if (m > currentValue) {
                    m = currentValue;
                  }
                }
              }
              /** @type {number} */
              handledCPCountPlusOne = handledCPCount + 1;
              if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                error("overflow");
              }
              delta += (m - n) * handledCPCountPlusOne;
              n = m;
              /** @type {number} */
              j = 0;
              for (;_len > j;++j) {
                if (currentValue = input[j], n > currentValue && (++delta > maxInt && error("overflow")), currentValue == n) {
                  /** @type {number} */
                  q = delta;
                  /** @type {number} */
                  k = base;
                  for (;t = bias >= k ? tMin : k >= bias + tMax ? tMax : k - bias, !(t > q);k += base) {
                    /** @type {number} */
                    qMinusT = q - t;
                    /** @type {number} */
                    baseMinusT = base - t;
                    output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                    /** @type {number} */
                    q = floor(qMinusT / baseMinusT);
                  }
                  output.push(stringFromCharCode(digitToBasic(q, 0)));
                  bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                  /** @type {number} */
                  delta = 0;
                  ++handledCPCount;
                }
              }
              ++delta;
              ++n;
            }
            return output.join("");
          }
          /**
           * @param {string} domain
           * @return {?}
           */
          function toUnicode(domain) {
            return mapDomain(domain, function(data) {
              return rbrace.test(data) ? decode(data.slice(4).toLowerCase()) : data;
            });
          }
          /**
           * @param {string} domain
           * @return {?}
           */
          function toASCII(domain) {
            return mapDomain(domain, function(string) {
              return spaceRe.test(string) ? "xn--" + encode(string) : string;
            });
          }
          var freeExports = "object" == typeof arg && arg;
          var freeModule = "object" == typeof module && (module && (module.exports == freeExports && module));
          var freeGlobal = "object" == typeof data && data;
          if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
            root = freeGlobal;
          }
          var punycode;
          var key;
          /** @type {number} */
          var maxInt = 2147483647;
          /** @type {number} */
          var base = 36;
          /** @type {number} */
          var tMin = 1;
          /** @type {number} */
          var tMax = 26;
          /** @type {number} */
          var skew = 38;
          /** @type {number} */
          var damp = 700;
          /** @type {number} */
          var initialBias = 72;
          /** @type {number} */
          var initialN = 128;
          /** @type {string} */
          var item = "-";
          /** @type {RegExp} */
          var rbrace = /^xn--/;
          /** @type {RegExp} */
          var spaceRe = /[^ -~]/;
          /** @type {RegExp} */
          var regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g;
          var errors = {
            overflow : "Overflow: input needs wider integers to process",
            "not-basic" : "Illegal input >= 0x80 (not a basic code point)",
            "invalid-input" : "Invalid input"
          };
          /** @type {number} */
          var baseMinusTMin = base - tMin;
          /** @type {function (*): number} */
          var floor = Math.floor;
          /** @type {function (...[number]): string} */
          var stringFromCharCode = String.fromCharCode;
          if (punycode = {
              version : "1.2.4",
              ucs2 : {
                /** @type {function (string): ?} */
                decode : ucs2decode,
                /** @type {function (?): ?} */
                encode : ucs2encode
              },
              /** @type {function (string): ?} */
              decode : decode,
              /** @type {function ((Array|string)): ?} */
              encode : encode,
              /** @type {function (string): ?} */
              toASCII : toASCII,
              /** @type {function (string): ?} */
              toUnicode : toUnicode
            }, "function" == typeof define && ("object" == typeof define.amd && define.amd)) {
            define("punycode", function() {
              return punycode;
            });
          } else {
            if (freeExports && !freeExports.nodeType) {
              if (freeModule) {
                freeModule.exports = punycode;
              } else {
                for (key in punycode) {
                  if (punycode.hasOwnProperty(key)) {
                    freeExports[key] = punycode[key];
                  }
                }
              }
            } else {
              root.punycode = punycode;
            }
          }
        }(this);
      }).call(this, "undefined" != typeof exports ? exports : "undefined" != typeof window ? window : {});
    }, {}],
    8 : [function(dataAndEvents, module) {
      /**
       * @param {?} obj
       * @param {string} name
       * @return {?}
       */
      function hasOwn(obj, name) {
        return Object.prototype.hasOwnProperty.call(obj, name);
      }
      /**
       * @param {string} string
       * @param {string} start
       * @param {string} ss
       * @param {Object} options
       * @return {?}
       */
      module.exports = function(string, start, ss, options) {
        start = start || "&";
        ss = ss || "=";
        var obj = {};
        if ("string" != typeof string || 0 === string.length) {
          return obj;
        }
        /** @type {RegExp} */
        var r20 = /\+/g;
        /** @type {Array.<string>} */
        string = string.split(start);
        /** @type {number} */
        var maxKeys = 1E3;
        if (options) {
          if ("number" == typeof options.maxKeys) {
            /** @type {number} */
            maxKeys = options.maxKeys;
          }
        }
        /** @type {number} */
        var len = string.length;
        if (maxKeys > 0) {
          if (len > maxKeys) {
            /** @type {number} */
            len = maxKeys;
          }
        }
        /** @type {number} */
        var i = 0;
        for (;len > i;++i) {
          var val;
          var h;
          var key;
          var value;
          /** @type {string} */
          var s = string[i].replace(r20, "%20");
          /** @type {number} */
          var pos = s.indexOf(ss);
          if (pos >= 0) {
            /** @type {string} */
            val = s.substr(0, pos);
            /** @type {string} */
            h = s.substr(pos + 1);
          } else {
            /** @type {string} */
            val = s;
            /** @type {string} */
            h = "";
          }
          /** @type {string} */
          key = decodeURIComponent(val);
          /** @type {string} */
          value = decodeURIComponent(h);
          if (hasOwn(obj, key)) {
            if (inspect(obj[key])) {
              obj[key].push(value);
            } else {
              /** @type {Array} */
              obj[key] = [obj[key], value];
            }
          } else {
            /** @type {string} */
            obj[key] = value;
          }
        }
        return obj;
      };
      /** @type {function (*): boolean} */
      var inspect = Array.isArray || function(arr) {
          return "[object Array]" === Object.prototype.toString.call(arr);
        };
    }, {}],
    9 : [function(dataAndEvents, module) {
      /**
       * @param {Array} array
       * @param {Function} fn
       * @return {?}
       */
      function walk(array, fn) {
        if (array.map) {
          return array.map(fn);
        }
        /** @type {Array} */
        var ret = [];
        /** @type {number} */
        var i = 0;
        for (;i < array.length;i++) {
          ret.push(fn(array[i], i));
        }
        return ret;
      }
      /**
       * @param {string} value
       * @return {?}
       */
      var stringify = function(value) {
        switch(typeof value) {
          case "string":
            return value;
          case "boolean":
            return value ? "true" : "false";
          case "number":
            return isFinite(value) ? value : "";
          default:
            return "";
        }
      };
      /**
       * @param {Object} obj
       * @param {string} sep
       * @param {string} eq
       * @param {boolean} json
       * @return {?}
       */
      module.exports = function(obj, sep, eq, json) {
        return sep = sep || "&", eq = eq || "=", null === obj && (obj = void 0), "object" == typeof obj ? walk(getActual(obj), function(key) {
          var ks = encodeURIComponent(stringify(key)) + eq;
          return visit(obj[key]) ? walk(obj[key], function(v) {
            return ks + encodeURIComponent(stringify(v));
          }).join(sep) : ks + encodeURIComponent(stringify(obj[key]));
        }).join(sep) : json ? encodeURIComponent(stringify(json)) + eq + encodeURIComponent(stringify(obj)) : "";
      };
      /** @type {function (*): boolean} */
      var visit = Array.isArray || function(arr) {
          return "[object Array]" === Object.prototype.toString.call(arr);
        };
      /** @type {function (Object): Array.<string>} */
      var getActual = Object.keys || function(obj) {
          /** @type {Array} */
          var props = [];
          var prop;
          for (prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
              props.push(prop);
            }
          }
          return props;
        };
    }, {}],
    10 : [function(require, dataAndEvents, exports) {
      exports.decode = exports.parse = require("./decode");
      exports.encode = exports.stringify = require("./encode");
    }, {
      "./decode" : 8,
      "./encode" : 9
    }],
    11 : [function(require, dataAndEvents, t) {
      (function(opts) {
        /**
         * @param {string} idName
         * @param {?} err
         * @return {undefined}
         */
        function self(idName, err) {
          /** @type {string} */
          this._id = idName;
          this._clearFn = err;
        }
        var nextTick = require("process/browser.js").nextTick;
        /** @type {function (this:Function, ...[*]): *} */
        var apply = Function.prototype.apply;
        /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
        var __slice = Array.prototype.slice;
        var a = {};
        /** @type {number} */
        var c = 0;
        /**
         * @return {?}
         */
        t.setTimeout = function() {
          return new self(apply.call(setTimeout, window, arguments), clearTimeout);
        };
        /**
         * @return {?}
         */
        t.setInterval = function() {
          return new self(apply.call(setInterval, window, arguments), clearInterval);
        };
        /** @type {function (Object): undefined} */
        t.clearTimeout = t.clearInterval = function(i) {
          i.close();
        };
        /** @type {function (): undefined} */
        self.prototype.unref = self.prototype.ref = function() {
        };
        /**
         * @return {undefined}
         */
        self.prototype.close = function() {
          this._clearFn.call(window, this._id);
        };
        /**
         * @param {?} item
         * @param {number} msecs
         * @return {undefined}
         */
        t.enroll = function(item, msecs) {
          clearTimeout(item._idleTimeoutId);
          /** @type {number} */
          item._idleTimeout = msecs;
        };
        /**
         * @param {?} item
         * @return {undefined}
         */
        t.unenroll = function(item) {
          clearTimeout(item._idleTimeoutId);
          /** @type {number} */
          item._idleTimeout = -1;
        };
        /** @type {function (?): undefined} */
        t._unrefActive = t.active = function(item) {
          clearTimeout(item._idleTimeoutId);
          var msecs = item._idleTimeout;
          if (msecs >= 0) {
            /** @type {number} */
            item._idleTimeoutId = setTimeout(function() {
              if (item._onTimeout) {
                item._onTimeout();
              }
            }, msecs);
          }
        };
        /** @type {Function} */
        t.setImmediate = "function" == typeof opts ? opts : function(func) {
          /** @type {number} */
          var prefix = c++;
          /** @type {(Array.<?>|boolean)} */
          var newArguments = arguments.length < 2 ? false : __slice.call(arguments, 1);
          return a[prefix] = true, nextTick(function() {
            if (a[prefix]) {
              if (newArguments) {
                func.apply(null, newArguments);
              } else {
                func.call(null);
              }
              t.clearImmediate(prefix);
            }
          }), prefix;
        };
        /** @type {Function} */
        t.clearImmediate = "function" == typeof clearImmediate ? clearImmediate : function(prefix) {
          delete a[prefix];
        };
      }).call(this, require("timers").setImmediate);
    }, {
      "process/browser.js" : 12,
      timers : 11
    }],
    12 : [function(dataAndEvents, module) {
      /**
       * @return {undefined}
       */
      function runTest() {
        if (f) {
          if (received) {
            /** @type {boolean} */
            f = false;
            if (received.length) {
              data = received.concat(data);
            } else {
              /** @type {number} */
              index = -1;
            }
            if (data.length) {
              fn();
            }
          }
        }
      }
      /**
       * @return {undefined}
       */
      function fn() {
        if (!f) {
          var memory = setTimer(runTest);
          /** @type {boolean} */
          f = true;
          var length = data.length;
          for (;length;) {
            received = data;
            /** @type {Array} */
            data = [];
            for (;++index < length;) {
              if (received) {
                received[index].run();
              }
            }
            /** @type {number} */
            index = -1;
            /** @type {number} */
            length = data.length;
          }
          /** @type {null} */
          received = null;
          /** @type {boolean} */
          f = false;
          fire(memory);
        }
      }
      /**
       * @param {Function} options
       * @param {Object} array
       * @return {undefined}
       */
      function Animation(options, array) {
        /** @type {Function} */
        this.fun = options;
        /** @type {Object} */
        this.array = array;
      }
      /**
       * @return {undefined}
       */
      function tmp() {
      }
      var setTimer;
      var fire;
      var process = module.exports = {};
      !function() {
        try {
          /** @type {function ((Function|null|string), number): number} */
          setTimer = setTimeout;
        } catch (e) {
          /**
           * @return {?}
           */
          setTimer = function() {
            throw new Error("setTimeout is not defined");
          };
        }
        try {
          /** @type {function ((null|number|undefined)): ?} */
          fire = clearTimeout;
        } catch (e) {
          /**
           * @return {?}
           */
          fire = function() {
            throw new Error("clearTimeout is not defined");
          };
        }
      }();
      var received;
      /** @type {Array} */
      var data = [];
      /** @type {boolean} */
      var f = false;
      /** @type {number} */
      var index = -1;
      /**
       * @param {Function} callback
       * @return {undefined}
       */
      process.nextTick = function(callback) {
        /** @type {Array} */
        var x = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          /** @type {number} */
          var i = 1;
          for (;i < arguments.length;i++) {
            x[i - 1] = arguments[i];
          }
        }
        data.push(new Animation(callback, x));
        if (!(1 !== data.length)) {
          if (!f) {
            setTimer(fn, 0);
          }
        }
      };
      /**
       * @return {undefined}
       */
      Animation.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      /** @type {string} */
      process.title = "browser";
      /** @type {boolean} */
      process.browser = true;
      process.env = {};
      /** @type {Array} */
      process.argv = [];
      /** @type {string} */
      process.version = "";
      process.versions = {};
      /** @type {function (): undefined} */
      process.on = tmp;
      /** @type {function (): undefined} */
      process.addListener = tmp;
      /** @type {function (): undefined} */
      process.once = tmp;
      /** @type {function (): undefined} */
      process.off = tmp;
      /** @type {function (): undefined} */
      process.removeListener = tmp;
      /** @type {function (): undefined} */
      process.removeAllListeners = tmp;
      /** @type {function (): undefined} */
      process.emit = tmp;
      /**
       * @return {?}
       */
      process.binding = function() {
        throw new Error("process.binding is not supported");
      };
      /**
       * @return {?}
       */
      process.cwd = function() {
        return "/";
      };
      /**
       * @return {?}
       */
      process.chdir = function() {
        throw new Error("process.chdir is not supported");
      };
      /**
       * @return {?}
       */
      process.umask = function() {
        return 0;
      };
    }, {}],
    13 : [function(require, dataAndEvents, exports) {
      /**
       * @return {undefined}
       */
      function Url() {
        /** @type {null} */
        this.protocol = null;
        /** @type {null} */
        this.slashes = null;
        /** @type {null} */
        this.auth = null;
        /** @type {null} */
        this.host = null;
        /** @type {null} */
        this.port = null;
        /** @type {null} */
        this.hostname = null;
        /** @type {null} */
        this.hash = null;
        /** @type {null} */
        this.search = null;
        /** @type {null} */
        this.query = null;
        /** @type {null} */
        this.pathname = null;
        /** @type {null} */
        this.path = null;
        /** @type {null} */
        this.href = null;
      }
      /**
       * @param {?} url
       * @param {boolean} recurring
       * @param {boolean} deepDataAndEvents
       * @return {?}
       */
      function urlParse(url, recurring, deepDataAndEvents) {
        if (url && (isObject(url) && url instanceof Url)) {
          return url;
        }
        var jQuery = new Url;
        return jQuery.parse(url, recurring, deepDataAndEvents), jQuery;
      }
      /**
       * @param {?} obj
       * @return {?}
       */
      function format(obj) {
        return fn(obj) && (obj = urlParse(obj)), obj instanceof Url ? obj.format() : Url.prototype.format.call(obj);
      }
      /**
       * @param {Object} value
       * @param {Object} val
       * @return {?}
       */
      function resolve(value, val) {
        return urlParse(value, false, true).resolve(val);
      }
      /**
       * @param {?} source
       * @param {string} relative
       * @return {?}
       */
      function urlResolveObject(source, relative) {
        return source ? urlParse(source, false, true).resolveObject(relative) : relative;
      }
      /**
       * @param {?} f
       * @return {?}
       */
      function fn(f) {
        return "string" == typeof f;
      }
      /**
       * @param {Object} arg
       * @return {?}
       */
      function isObject(arg) {
        return "object" == typeof arg && null !== arg;
      }
      /**
       * @param {?} wanted
       * @return {?}
       */
      function expect(wanted) {
        return null === wanted;
      }
      /**
       * @param {number} failing_message
       * @return {?}
       */
      function report(failing_message) {
        return null == failing_message;
      }
      var punycode = require("punycode");
      /** @type {function (?, boolean, boolean): ?} */
      exports.parse = urlParse;
      /** @type {function (Object, Object): ?} */
      exports.resolve = resolve;
      /** @type {function (?, string): ?} */
      exports.resolveObject = urlResolveObject;
      /** @type {function (?): ?} */
      exports.format = format;
      /** @type {function (): undefined} */
      exports.Url = Url;
      /** @type {RegExp} */
      var rx = /^([a-z0-9.+-]+:)/i;
      /** @type {RegExp} */
      var re = /:[0-9]*$/;
      /** @type {Array} */
      var caseSensitive = ["<", ">", '"', "`", " ", "\r", "\n", "\t"];
      /** @type {Array} */
      var f = ["{", "}", "|", "\\", "^", "`"].concat(caseSensitive);
      /** @type {Array} */
      var paths = ["'"].concat(f);
      /** @type {Array} */
      var events = ["%", "/", "?", ";", "#"].concat(paths);
      /** @type {Array} */
      var tags = ["/", "?", "#"];
      /** @type {number} */
      var hostnameMaxLen = 255;
      /** @type {RegExp} */
      var typePattern = /^[a-z0-9A-Z_-]{0,63}$/;
      /** @type {RegExp} */
      var eventSplitter = /^([a-z0-9A-Z_-]{0,63})(.*)$/;
      var unsafeProtocol = {
        javascript : true,
        "javascript:" : true
      };
      var hostlessProtocol = {
        javascript : true,
        "javascript:" : true
      };
      var slashedProtocol = {
        http : true,
        https : true,
        ftp : true,
        gopher : true,
        file : true,
        "http:" : true,
        "https:" : true,
        "ftp:" : true,
        "gopher:" : true,
        "file:" : true
      };
      var querystring = require("querystring");
      /**
       * @param {string} obj
       * @param {boolean} recurring
       * @param {string} deepDataAndEvents
       * @return {?}
       */
      Url.prototype.parse = function(obj, recurring, deepDataAndEvents) {
        if (!fn(obj)) {
          throw new TypeError("Parameter 'url' must be a string, not " + typeof obj);
        }
        /** @type {string} */
        var url = obj;
        url = url.trim();
        /** @type {(Array.<string>|null)} */
        var proto = rx.exec(url);
        if (proto) {
          /** @type {string} */
          proto = proto[0];
          /** @type {string} */
          var lowerProto = proto.toLowerCase();
          /** @type {string} */
          this.protocol = lowerProto;
          url = url.substr(proto.length);
        }
        if (deepDataAndEvents || (proto || url.match(/^\/\/[^@\/]+@[^@\/]+/))) {
          /** @type {boolean} */
          var absolute = "//" === url.substr(0, 2);
          if (!!absolute) {
            if (!(proto && hostlessProtocol[proto])) {
              url = url.substr(2);
              /** @type {boolean} */
              this.slashes = true;
            }
          }
        }
        if (!hostlessProtocol[proto] && (absolute || proto && !slashedProtocol[proto])) {
          /** @type {number} */
          var distance = -1;
          /** @type {number} */
          var idx = 0;
          for (;idx < tags.length;idx++) {
            var thisDistance = url.indexOf(tags[idx]);
            if (-1 !== thisDistance) {
              if (-1 === distance || distance > thisDistance) {
                distance = thisDistance;
              }
            }
          }
          var auth;
          var search;
          search = -1 === distance ? url.lastIndexOf("@") : url.lastIndexOf("@", distance);
          if (-1 !== search) {
            auth = url.slice(0, search);
            url = url.slice(search + 1);
            /** @type {string} */
            this.auth = decodeURIComponent(auth);
          }
          /** @type {number} */
          distance = -1;
          /** @type {number} */
          idx = 0;
          for (;idx < events.length;idx++) {
            thisDistance = url.indexOf(events[idx]);
            if (-1 !== thisDistance) {
              if (-1 === distance || distance > thisDistance) {
                distance = thisDistance;
              }
            }
          }
          if (-1 === distance) {
            distance = url.length;
          }
          this.host = url.slice(0, distance);
          url = url.slice(distance);
          this.parseHost();
          this.hostname = this.hostname || "";
          /** @type {boolean} */
          var v = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
          if (!v) {
            var line = this.hostname.split(/\./);
            /** @type {number} */
            idx = 0;
            var len = line.length;
            for (;len > idx;idx++) {
              var ch = line[idx];
              if (ch && !ch.match(typePattern)) {
                /** @type {string} */
                var segment = "";
                /** @type {number} */
                var i = 0;
                var l = ch.length;
                for (;l > i;i++) {
                  segment += ch.charCodeAt(i) > 127 ? "x" : ch[i];
                }
                if (!segment.match(typePattern)) {
                  var ret = line.slice(0, idx);
                  var args = line.slice(idx + 1);
                  var names = ch.match(eventSplitter);
                  if (names) {
                    ret.push(names[1]);
                    args.unshift(names[2]);
                  }
                  if (args.length) {
                    /** @type {string} */
                    url = "/" + args.join(".") + url;
                  }
                  this.hostname = ret.join(".");
                  break;
                }
              }
            }
          }
          if (this.hostname = this.hostname.length > hostnameMaxLen ? "" : this.hostname.toLowerCase(), !v) {
            var input = this.hostname.split(".");
            /** @type {Array} */
            var newOut = [];
            /** @type {number} */
            idx = 0;
            for (;idx < input.length;++idx) {
              var s = input[idx];
              newOut.push(s.match(/[^A-Za-z0-9_-]/) ? "xn--" + punycode.encode(s) : s);
            }
            /** @type {string} */
            this.hostname = newOut.join(".");
          }
          /** @type {string} */
          var p = this.port ? ":" + this.port : "";
          var h = this.hostname || "";
          /** @type {string} */
          this.host = h + p;
          this.href += this.host;
          if (v) {
            this.hostname = this.hostname.substr(1, this.hostname.length - 2);
            if ("/" !== url[0]) {
              /** @type {string} */
              url = "/" + url;
            }
          }
        }
        if (!unsafeProtocol[lowerProto]) {
          /** @type {number} */
          idx = 0;
          /** @type {number} */
          len = paths.length;
          for (;len > idx;idx++) {
            var path = paths[idx];
            /** @type {string} */
            var key = encodeURIComponent(path);
            if (key === path) {
              /** @type {string} */
              key = escape(path);
            }
            url = url.split(path).join(key);
          }
        }
        var hashIndex = url.indexOf("#");
        if (-1 !== hashIndex) {
          this.hash = url.substr(hashIndex);
          url = url.slice(0, hashIndex);
        }
        var index = url.indexOf("?");
        if (-1 !== index ? (this.search = url.substr(index), this.query = url.substr(index + 1), recurring && (this.query = querystring.parse(this.query)), url = url.slice(0, index)) : recurring && (this.search = "", this.query = {}), url && (this.pathname = url), slashedProtocol[lowerProto] && (this.hostname && (!this.pathname && (this.pathname = "/"))), this.pathname || this.search) {
          p = this.pathname || "";
          s = this.search || "";
          this.path = p + s;
        }
        return this.href = this.format(), this;
      };
      /**
       * @return {?}
       */
      Url.prototype.format = function() {
        var auth = this.auth || "";
        if (auth) {
          /** @type {string} */
          auth = encodeURIComponent(auth);
          /** @type {string} */
          auth = auth.replace(/%3A/i, ":");
          auth += "@";
        }
        var protocol = this.protocol || "";
        var pathname = this.pathname || "";
        var hash = this.hash || "";
        /** @type {boolean} */
        var host = false;
        /** @type {string} */
        var query = "";
        if (this.host) {
          host = auth + this.host;
        } else {
          if (this.hostname) {
            host = auth + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]");
            if (this.port) {
              host += ":" + this.port;
            }
          }
        }
        if (this.query) {
          if (isObject(this.query)) {
            if (Object.keys(this.query).length) {
              query = querystring.stringify(this.query);
            }
          }
        }
        var search = this.search || (query && "?" + query || "");
        return protocol && (":" !== protocol.substr(-1) && (protocol += ":")), this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false ? (host = "//" + (host || ""), pathname && ("/" !== pathname.charAt(0) && (pathname = "/" + pathname))) : host || (host = ""), hash && ("#" !== hash.charAt(0) && (hash = "#" + hash)), search && ("?" !== search.charAt(0) && (search = "?" + search)), pathname = pathname.replace(/[?#]/g, function(sectionName) {
          return encodeURIComponent(sectionName);
        }), search = search.replace("#", "%23"), protocol + host + pathname + search + hash;
      };
      /**
       * @param {Object} value
       * @return {?}
       */
      Url.prototype.resolve = function(value) {
        return this.resolveObject(urlParse(value, false, true)).format();
      };
      /**
       * @param {Object} relative
       * @return {?}
       */
      Url.prototype.resolveObject = function(relative) {
        if (fn(relative)) {
          var rel = new Url;
          rel.parse(relative, false, true);
          relative = rel;
        }
        var result = new Url;
        if (Object.keys(this).forEach(function(header) {
            result[header] = this[header];
          }, this), result.hash = relative.hash, "" === relative.href) {
          return result.href = result.format(), result;
        }
        if (relative.slashes && !relative.protocol) {
          return Object.keys(relative).forEach(function(k) {
            if ("protocol" !== k) {
              result[k] = relative[k];
            }
          }), slashedProtocol[result.protocol] && (result.hostname && (!result.pathname && (result.path = result.pathname = "/"))), result.href = result.format(), result;
        }
        if (relative.protocol && relative.protocol !== result.protocol) {
          if (!slashedProtocol[relative.protocol]) {
            return Object.keys(relative).forEach(function(k) {
              result[k] = relative[k];
            }), result.href = result.format(), result;
          }
          if (result.protocol = relative.protocol, relative.host || hostlessProtocol[relative.protocol]) {
            result.pathname = relative.pathname;
          } else {
            var relPath = (relative.pathname || "").split("/");
            for (;relPath.length && !(relative.host = relPath.shift());) {
            }
            if (!relative.host) {
              /** @type {string} */
              relative.host = "";
            }
            if (!relative.hostname) {
              /** @type {string} */
              relative.hostname = "";
            }
            if ("" !== relPath[0]) {
              relPath.unshift("");
            }
            if (relPath.length < 2) {
              relPath.unshift("");
            }
            result.pathname = relPath.join("/");
          }
          if (result.search = relative.search, result.query = relative.query, result.host = relative.host || "", result.auth = relative.auth, result.hostname = relative.hostname || relative.host, result.port = relative.port, result.pathname || result.search) {
            var p = result.pathname || "";
            var ext = result.search || "";
            result.path = p + ext;
          }
          return result.slashes = result.slashes || relative.slashes, result.href = result.format(), result;
        }
        var s = result.pathname && "/" === result.pathname.charAt(0);
        var param = relative.host || relative.pathname && "/" === relative.pathname.charAt(0);
        var ret = param || (s || result.host && relative.pathname);
        var obj = ret;
        var srcPath = result.pathname && result.pathname.split("/") || [];
        relPath = relative.pathname && relative.pathname.split("/") || [];
        var v = result.protocol && !slashedProtocol[result.protocol];
        if (v && (result.hostname = "", result.port = null, result.host && ("" === srcPath[0] ? srcPath[0] = result.host : srcPath.unshift(result.host)), result.host = "", relative.protocol && (relative.hostname = null, relative.port = null, relative.host && ("" === relPath[0] ? relPath[0] = relative.host : relPath.unshift(relative.host)), relative.host = null), ret = ret && ("" === relPath[0] || "" === srcPath[0])), param) {
          result.host = relative.host || "" === relative.host ? relative.host : result.host;
          result.hostname = relative.hostname || "" === relative.hostname ? relative.hostname : result.hostname;
          result.search = relative.search;
          result.query = relative.query;
          srcPath = relPath;
        } else {
          if (relPath.length) {
            if (!srcPath) {
              /** @type {Array} */
              srcPath = [];
            }
            srcPath.pop();
            srcPath = srcPath.concat(relPath);
            result.search = relative.search;
            result.query = relative.query;
          } else {
            if (!report(relative.search)) {
              if (v) {
                result.hostname = result.host = srcPath.shift();
                var pathConfig = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
                if (pathConfig) {
                  result.auth = pathConfig.shift();
                  result.host = result.hostname = pathConfig.shift();
                }
              }
              return result.search = relative.search, result.query = relative.query, expect(result.pathname) && expect(result.search) || (result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "")), result.href = result.format(), result;
            }
          }
        }
        if (!srcPath.length) {
          return result.pathname = null, result.path = result.search ? "/" + result.search : null, result.href = result.format(), result;
        }
        var value = srcPath.slice(-1)[0];
        var y = (result.host || relative.host) && ("." === value || ".." === value) || "" === value;
        /** @type {number} */
        var _ = 0;
        var i = srcPath.length;
        for (;i >= 0;i--) {
          value = srcPath[i];
          if ("." == value) {
            srcPath.splice(i, 1);
          } else {
            if (".." === value) {
              srcPath.splice(i, 1);
              _++;
            } else {
              if (_) {
                srcPath.splice(i, 1);
                _--;
              }
            }
          }
        }
        if (!ret && !obj) {
          for (;_--;_) {
            srcPath.unshift("..");
          }
        }
        if (!!ret) {
          if (!("" === srcPath[0])) {
            if (!(srcPath[0] && "/" === srcPath[0].charAt(0))) {
              srcPath.unshift("");
            }
          }
        }
        if (y) {
          if ("/" !== srcPath.join("/").substr(-1)) {
            srcPath.push("");
          }
        }
        var isAbsolute = "" === srcPath[0] || srcPath[0] && "/" === srcPath[0].charAt(0);
        if (v) {
          result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
          pathConfig = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
          if (pathConfig) {
            result.auth = pathConfig.shift();
            result.host = result.hostname = pathConfig.shift();
          }
        }
        return ret = ret || result.host && srcPath.length, ret && (!isAbsolute && srcPath.unshift("")), srcPath.length ? result.pathname = srcPath.join("/") : (result.pathname = null, result.path = null), expect(result.pathname) && expect(result.search) || (result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "")), result.auth = relative.auth || result.auth, result.slashes = result.slashes || relative.slashes, result.href = result.format(), result;
      };
      /**
       * @return {undefined}
       */
      Url.prototype.parseHost = function() {
        var host = this.host;
        /** @type {(Array.<string>|null)} */
        var port = re.exec(host);
        if (port) {
          /** @type {string} */
          port = port[0];
          if (":" !== port) {
            /** @type {string} */
            this.port = port.substr(1);
          }
          host = host.substr(0, host.length - port.length);
        }
        if (host) {
          this.hostname = host;
        }
      };
    }, {
      punycode : 7,
      querystring : 10
    }],
    14 : [function($sanitize, module) {
      var JsDiff;
      var value;
      value = $sanitize("bowser");
      JsDiff = function() {
        /**
         * @param {Object} browser
         * @return {undefined}
         */
        function UserAgent(browser) {
          var userAgent;
          this._browser = (null != browser ? browser.browser : void 0) || value.browser;
          this._browser.userAgent = browser.userAgent;
          this._browser.needsSubmit = (null != browser ? browser.needsSubmit : void 0) || (null != (userAgent = this._browser.userAgent) ? userAgent.toLowerCase().indexOf("wii") : void 0) > -1;
          this._browser.compatMode = (null != browser ? browser.compatMode : void 0) || false;
        }
        return UserAgent.prototype.getBrowser = function() {
          return this._browser;
        }, UserAgent.prototype.isMobile = function() {
          return null != this._browser.mobile || null != this._browser.tablet;
        }, UserAgent.prototype.isTablet = function() {
          return null != this._browser.tablet;
        }, UserAgent.prototype.getVersion = function() {
          return this._browser.version || "Unknown";
        }, UserAgent.prototype.getTridentVersion = function() {
          var horizontalOffset;
          var userAgent;
          return horizontalOffset = null != (userAgent = this._browser.userAgent) ? userAgent.match(/Trident\/(\d+)/) : void 0, horizontalOffset ? horizontalOffset[1] : false;
        }, UserAgent.prototype.getBrowserName = function() {
          return this._browser.name || "Unknown";
        }, UserAgent.prototype.getMobileOS = function() {
          return this.isMobile() ? null != this._browser.ios ? "iOS" : null != this._browser.android ? "Android" : null != this._browser.blackberry ? "Blackberry" : null != this._browser.firefoxos ? "Firefox" : null != this._browser.webos ? "WebOS" : null != this._browser.bada ? "Bada" : null != this._browser.tizen ? "Tizen" : null != this._browser.sailfish ? "Sailfish" : null != this._browser.windowsphone ? "Windows Phone" : "Other" : false;
        }, UserAgent.prototype.getOSVersion = function() {
          return this._browser.osversion;
        }, UserAgent.prototype.isCompatMode = function() {
          return "BackCompat" === this._browser.compatMode;
        }, UserAgent.prototype.maxHeightIsSet = function() {
          var elem;
          return "undefined" != typeof(null != (elem = document.body) ? elem.style.maxHeight : void 0);
        }, UserAgent.prototype.shouldUsePositionAbsolute = function() {
          return this._browser.msie ? this.getVersion >= 10 || (this.getTridentVersion() >= 6 || (this.getVersion >= 7 || this.maxHeightIsSet()) && !this.isCompatMode()) ? false : true : false;
        }, UserAgent.prototype.needsSubmitButton = function() {
          return this._browser.needsSubmit;
        }, UserAgent;
      }();
      module.exports = JsDiff;
    }, {
      bowser : 1
    }],
    15 : [function(normalize, module) {
      (function(p, global) {
        var JsDiff;
        var max;
        var map;
        var el;
        el = normalize("url");
        /** @type {number} */
        max = 100;
        map = {
          /**
           * @param {string} source
           * @return {?}
           */
          OLARK_HOST : function(source) {
            var objId;
            return/^https?:\/\//.test(source) || (source = "http://" + source), objId = el.parse(source).host, /\.olark\.net(\:\d+)?$/.test(objId) || (objId = null), objId;
          },
          /**
           * @param {?} value
           * @return {?}
           */
          OLARK_DEBUG : function(value) {
            return "true" === value || value === true ? true : "false" === value || value === false ? false : void 0;
          }
        };
        JsDiff = function() {
          /**
           * @param {Object} options
           * @return {undefined}
           */
          function run(options) {
            if (null == options) {
              options = {};
            }
            this._localStorage = options.localStorage || global.localStorage;
            this._logger = options.logger || ("undefined" != typeof window && null !== window ? window.console : void 0);
            this._olark = options.olark || ("undefined" != typeof window && null !== window ? window.olark : void 0);
            this._processEnv = options.processEnv || {};
            this._processEnv.HOST = this._processEnv.HOST || p.env.HOST;
            if (options.document || "undefined" != typeof document && null !== document) {
              this._document = options.document || document;
            }
          }
          return run.prototype.getOlarkHost = function() {
            var bulk;
            var t;
            var host;
            var source;
            var self;
            var data;
            source = null != (self = this._olark) ? null != (data = self._) ? data.l : void 0 : void 0;
            if (null != source) {
              if (!/^https?:\/\//.test(source)) {
                /** @type {string} */
                source = "http://" + source;
              }
            }
            try {
              host = el.parse(source).host;
            } catch (fn) {
              bulk = fn;
              /** @type {null} */
              host = null;
            }
            return this.get("OLARK_HOST") || (this._processEnv.HOST || (host || "static.olark.com"));
          }, run.prototype.get = function(key) {
            var val;
            var tmp;
            return(val = map[key]) ? (tmp = this._getKeyFromQuery(key), tmp = null != tmp ? tmp : this._getKeyFromStorage(key), tmp && (tmp = val(tmp)), this._cacheOrRemoveValue(key, tmp), tmp) : void 0;
          }, run.prototype._getKeyFromQuery = function(keepData) {
            var typePattern;
            var idsAndClasses;
            var classes;
            if (this._document) {
              return classes = null, typePattern = new RegExp(keepData + "=([^&]*)"), idsAndClasses = this._document.location.search.match(typePattern), idsAndClasses && (classes = this._convertValue(idsAndClasses[1])), classes;
            }
          }, run.prototype._getKeyFromStorage = function(url) {
            var _self;
            return null != (_self = this._localStorage) ? _self.getItem(url) : void 0;
          }, run.prototype._cacheOrRemoveValue = function(key, value) {
            var $log;
            var ls;
            var localStorage;
            return null != value ? (value.length > max && (null != ($log = this._logger) && $log.warn("environment variable cannot exceed " + max + " bytes, trimming value"), value = value.toString().slice(0, max)), null != (ls = this._localStorage) ? ls.setItem(key, value) : void 0) : null != (localStorage = this._localStorage) ? localStorage.removeItem(key) : void 0;
          }, run.prototype._convertValue = function(value) {
            return/^(true|false)$/.test(value) && (value = "true" === value), /^null$/.test(value) && (value = null), value;
          }, run;
        }();
        module.exports = JsDiff;
      }).call(this, normalize("qvMYcC"), "undefined" != typeof exports ? exports : "undefined" != typeof window ? window : {});
    }, {
      qvMYcC : 6,
      url : 13
    }],
    16 : [function(dataAndEvents, module) {
      var JsDiff;
      /**
       * @param {Function} func
       * @param {?} context
       * @return {?}
       */
      var once = function(func, context) {
        return function() {
          return func.apply(context, arguments);
        };
      };
      /** @type {function (this:Object, *): boolean} */
      var has = {}.hasOwnProperty;
      JsDiff = function() {
        /**
         * @param {Object} options
         * @return {undefined}
         */
        function handler(options) {
          this._assign = once(this._assign, this);
          this._window = options.window || window;
          this._document = options.document || this._window.document;
          this._olark = options.olark || this._window.olark;
          this._data = {};
          this._data.version = this._assign(options.version, function() {
            var self;
            return(null != (self = this._olark) ? self._.chatboxBucketPostfix : void 0) || "framestore";
          });
          this._data.location = this._assign(options.location, function() {
            return this._document.location.href.toString().slice(0, 50);
          });
          this._data.referrer = this._assign(options.referrer, function() {
            return this._document.referrer.toString().slice(0, 15);
          });
          this._data.mesasage = this._assign(options.message, function() {
            return null;
          });
          this._data.stack = this._assign(options.stack, function() {
            return null;
          });
          this._data.tabname = this._assign(options.tabName, function() {
            return this._getTabName();
          });
          this._data.conversation_id = this._assign(options.conversationId, function() {
            return this._getConversationId();
          });
          this._data.visitor_id = this._assign(options.visitorId, function() {
            return this._getVisitorId();
          });
          this._data.site_id = this._assign(options.siteId, function() {
            return this._getSiteId();
          });
          this._data.bucket = this._assign(options.bucket, function() {
            return this._getBucket();
          });
          this._data.level = this._assign(options.level, function() {
            return "info";
          });
          this._data.timestamp = this._assign(options.timestamp, function() {
            return+new Date;
          });
          this._data.properties = this._assign(options.properties, function() {
            return{};
          });
          this._data.recent_logs = this._assign(options.recentLogs, function() {
            return[];
          });
        }
        return handler.prototype._assign = function(eventname2, cb) {
          switch(eventname2) {
            case null:
              return null;
            default:
              return null != eventname2 ? eventname2 : cb.bind(this)();
          }
        }, handler.prototype._getTabName = function() {
          var f;
          return(f = this._window).name || (f.name = Math.random().toString().replace("0.", "oktab")), /^oktab/.test(this._window.name) ? this._window.name : "unknown";
        }, handler.prototype._getConversationId = function() {
          var self;
          return null != (self = this._olark) ? self._.identityManager.getConversationId() : void 0;
        }, handler.prototype._getVisitorId = function() {
          var self;
          return null != (self = this._olark) ? self._.identityManager.getVisitorId() : void 0;
        }, handler.prototype._getSiteId = function() {
          var self;
          return null != (self = this._olark) ? self._.identityManager.getSiteId() : void 0;
        }, handler.prototype._getBucket = function() {
          var self;
          return null != (self = this._olark) ? self._.chatboxBucket : void 0;
        }, handler.prototype.simplify = function() {
          return{
            bucket : this._data.bucket,
            conversation_id : this._data.conversation_id,
            level : this._data.level,
            location : this._data.location,
            message : this._data.message,
            referrer : this._data.referrer,
            tabname : this._data.tabname,
            timestamp : String(new Date(this._data.timestamp)),
            version : this._data.version
          };
        }, handler.prototype.getLevel = function() {
          return this._data.level;
        }, handler.prototype.getMessage = function() {
          return this._data.message;
        }, handler.prototype.getStack = function() {
          return this._data.stack;
        }, handler.prototype.getEncodedLogEvent = function() {
          var key;
          var vvar;
          var assigns;
          var obj;
          var val;
          /** @type {Array} */
          assigns = [];
          obj = this._data;
          for (key in obj) {
            if (has.call(obj, key)) {
              if (null != this._data[key]) {
                if ("" !== this._data[key]) {
                  val = this._data[key];
                  if ("properties" === key || "recent_logs" === key) {
                    /** @type {string} */
                    val = JSON.stringify(val);
                  }
                  /** @type {string} */
                  vvar = key + "=" + encodeURIComponent(val);
                  assigns.push(vvar);
                }
              }
            }
          }
          return assigns.join("&");
        }, handler;
      }();
      module.exports = JsDiff;
    }, {}],
    17 : [function(next, module) {
      (function(exports) {
        var r;
        var type;
        var val;
        var Data;
        var types;
        var theB;
        var JsDiff;
        var _totalLogCountInBatch;
        var _totalLogCount;
        var maxScanLen;
        var otherTypeNode;
        var p;
        var result;
        var hasMembers;
        var data_user;
        var method;
        var prepXHR;
        /**
         * @param {Function} fn
         * @param {?} context
         * @return {?}
         */
        var on = function(fn, context) {
          return function() {
            return fn.apply(context, arguments);
          };
        };
        Data = next("./Env");
        theB = next("./LogMessage");
        method = next("./policies/olark-jsclient-data");
        prepXHR = next("../vendor/olark-s3-signer");
        result = next("bowser");
        /** @type {number} */
        r = 100;
        /** @type {number} */
        p = 100;
        /** @type {number} */
        _totalLogCountInBatch = 4;
        /** @type {number} */
        _totalLogCount = 10;
        /** @type {Array} */
        types = ["debug", "info", "warn", "error", "track", "count", "dump"];
        otherTypeNode = types[2];
        type = types[0];
        /** @type {number} */
        val = 0.15;
        /** @type {number} */
        maxScanLen = 10;
        data_user = new Data;
        /** @type {null} */
        hasMembers = null;
        JsDiff = function() {
          /**
           * @param {Object} options
           * @return {undefined}
           */
          function self(options) {
            this._sendCount = on(this._sendCount, this);
            this._sendTrack = on(this._sendTrack, this);
            var idx;
            var str;
            var _i;
            var i;
            var _len;
            var _len2;
            var key;
            var msg;
            var _showInConsole;
            if (this._totalLogCount = 0, this._timestampOfFirstLogCallInBatch = +new Date, this._totalLogCountInBatch = 0, this._recentLogs = [], msg = null, _showInConsole = false, ((null != options ? options.window : void 0) || "undefined" != typeof window && null !== window) && (this._window = (null != options ? options.window : void 0) || window, data_user.get("OLARK_DEBUG") && (msg = type, _showInConsole = true)), this._samplingRates = {}, "number" == typeof(null != options ? options.samplingRate :
                void 0)) {
              /** @type {number} */
              idx = 0;
              i = types.length;
              for (;i > idx;idx++) {
                key = types[idx];
                this._samplingRates[key] = options.samplingRate;
              }
            } else {
              if ("object" != typeof(null != options ? options.samplingRate : void 0) || (null != options ? options.samplingRate.length : void 0)) {
                /** @type {number} */
                _i = 0;
                _len2 = types.length;
                for (;_len2 > _i;_i++) {
                  key = types[_i];
                  this._samplingRates[key] = val;
                }
              } else {
                /** @type {number} */
                str = 0;
                _len = types.length;
                for (;_len > str;str++) {
                  key = types[str];
                  this._samplingRates[key] = null != options.samplingRate[key] ? options.samplingRate[key] : val;
                }
              }
            }
            this._logLevel = msg || ((null != options ? options.logLevel : void 0) || otherTypeNode);
            this._showInConsole = null != (null != options ? options.showInConsole : void 0) ? null != options ? options.showInConsole : void 0 : _showInConsole;
            /** @type {Array} */
            this._countKeys = [];
            /** @type {Array} */
            this._trackKeys = [];
          }
          return self.prototype.count = function(type, deepDataAndEvents) {
            if (null == type) {
              throw new Error("count requires 1 argument");
            }
            return this._deferSendCount(type, deepDataAndEvents);
          }, self.prototype.track = function(properties, deepDataAndEvents, opt_attributes) {
            if (null == properties || null == deepDataAndEvents) {
              throw new Error("track requires 2 arguments");
            }
            return this._deferSendTrack(properties, deepDataAndEvents, opt_attributes);
          }, self.prototype.debug = function(msg, message) {
            if (null == message && (message = {}), null == msg) {
              throw new Error("debug requires 1 argument");
            }
            return message.level = "debug", this.log(msg, message), message.ignoreCount ? void 0 : this.count("debug");
          }, self.prototype.info = function(message, info) {
            if (null == info && (info = {}), null == message) {
              throw new Error("info requires 1 argument");
            }
            return info.level = "info", this.log(message, info), info.ignoreCount ? void 0 : this.count("info");
          }, self.prototype.warn = function(message, msg) {
            if (null == msg && (msg = {}), null == message) {
              throw new Error("warn requires 1 argument");
            }
            return msg.level = "warn", this.log(message, msg), msg.ignoreCount ? void 0 : this.count("warn");
          }, self.prototype.error = function(event, message) {
            if (null == message && (message = {}), null == event) {
              throw new Error("error requires 1 argument");
            }
            return message.level = "error", this.log(event, message), message.ignoreCount ? void 0 : this.count("error");
          }, self.prototype.log = function(msg, message) {
            var output;
            var r;
            var options;
            var stack;
            if (null == message) {
              message = {};
            }
            try {
              if (stack = {
                  window : this._window,
                  message : msg,
                  level : message.level || "info",
                  stack : message.stack,
                  conversationId : message.conversationId
                }, options = new theB(stack), this._recentLogs.push(options.simplify()), this._recentLogs.length > maxScanLen && this._recentLogs.shift(), (message.showInConsole || this._shouldShowInConsole() && null == message.showInConsole) && this._logToConsole(options), message.forceSend || this._shouldSendMessage(options)) {
                return this._send(options);
              }
            } catch (changes) {
              if (output = changes, this._isDevelopment()) {
                return console.error(output);
              }
            }
          }, self.prototype.dump = function(array, appendToDoc) {
            var doc;
            var QUnit;
            var root;
            var _ref;
            var Wind;
            var timestamp;
            var headers;
            var global;
            return(null != appendToDoc ? appendToDoc.forceSend : void 0) || Math.random() <= this._samplingRates.dump ? (global = window === window.parent ? window : window.parent, doc = global.document, timestamp = new Date, QUnit = next("localforage/dist/localforage.nopromises"), null != global.olark && QUnit.config({
              name : "olark",
              storeName : global.olark._.identityManager.getVisitorId()
            }), headers = {
              timestamp : String(timestamp),
              visitorId : null != (root = global.olark) ? root._.identityManager.getVisitorId() : void 0,
              siteId : null != (_ref = global.olark) ? _ref._.identityManager.getSiteId() : void 0,
              conversationId : null != (Wind = global.olark) ? Wind._.identityManager.getConversationId() : void 0,
              cookieEnabled : navigator.cookieEnabled,
              olarkGlobalExists : null != global.olark,
              localStorageExists : null != global.localStorage,
              recentLogs : this._recentLogs,
              userAgent : navigator.userAgent,
              os : navigator.userAgent.match(/\(([^\)]+)\)/)[1],
              browser : result.browser.name,
              browserVersion : result.browser.version,
              viewportWidth : Math.max(doc.documentElement.clientWidth, global.innerWidth || 0),
              viewportHeight : Math.max(doc.documentElement.clientHeight, global.innerHeight || 0),
              cookies : this._parseCookies(),
              localStorage : this._parseLocalStorage(),
              errorStackTrace : this._parseStackTrace(array),
              userConfig : this._parseUserConfig(global)
            }, this._parseLocalForage(QUnit, function(dataAndEvents) {
              return function(owner) {
                var url;
                return url = headers.siteId + ":" + headers.visitorId + ":" + timestamp.getTime(), headers.localForage = owner, headers.hummingbirdEnabled = null != Object.keys(owner).join().match(/(^|,)redux/), prepXHR(method, url, headers).send(function() {
                  return dataAndEvents.count("s3-dump-success");
                }, function() {
                  return dataAndEvents.count("s3-dump-failed");
                });
              };
            }(this))) : void 0;
          }, self.prototype._parseUserConfig = function(o) {
            var originalEvent;
            var i;
            var prop;
            var len;
            var event;
            var scope;
            var domPropArr;
            originalEvent = (null != (scope = o.hbl) ? scope.config.vars : void 0) || {};
            event = {};
            /** @type {Array} */
            domPropArr = ["width", "use_theme", "template", "height", "corner_position"];
            /** @type {number} */
            i = 0;
            /** @type {number} */
            len = domPropArr.length;
            for (;len > i;i++) {
              prop = domPropArr[i];
              event[prop] = originalEvent[prop];
            }
            return event;
          }, self.prototype._parseStackTrace = function(x) {
            var mod;
            return mod = x.stack.replace(/^[^\s]+\s*/, "").split(/[\n\r]/), mod.map(function(requestUrl) {
              return requestUrl.replace(/^\s*at\s*/, "");
            });
          }, self.prototype._parseLocalStorage = function() {
            var j;
            var key;
            var len;
            var $cookies;
            var keys;
            var cache;
            if (cache = this._window.localStorage, $cookies = null, null != cache) {
              $cookies = {};
              /** @type {Array.<string>} */
              keys = Object.keys(cache);
              /** @type {number} */
              j = 0;
              /** @type {number} */
              len = keys.length;
              for (;len > j;j++) {
                /** @type {string} */
                key = keys[j];
                $cookies[key] = this._parsePossibleJSON(cache.getItem(key));
              }
            }
            return $cookies;
          }, self.prototype._parseLocalForage = function(a, $sanitize) {
            var value;
            return value = {}, a.iterate(function(dataAndEvents) {
              return function(path, name) {
                return value[name] = dataAndEvents._parsePossibleJSON(path);
              };
            }(this), function() {
              return $sanitize(value);
            });
          }, self.prototype._parseCookies = function() {
            var uHostName;
            var obj;
            return obj = {}, uHostName = this._window.document.cookie.trim(), uHostName && uHostName.split(/\;\s*/).map(function(dataAndEvents) {
              return function(pair) {
                var parts;
                return parts = pair.split("="), obj[parts[0]] = dataAndEvents._parsePossibleJSON(dataAndEvents._window.unescape(parts[1]));
              };
            }(this)), obj;
          }, self.prototype._parsePossibleJSON = function(v) {
            var bulk;
            var n;
            var label;
            try {
              /** @type {*} */
              label = JSON.parse(v);
            } catch (fn) {
              bulk = fn;
              label = v;
            }
            return label;
          }, self.prototype._isDevelopment = function() {
            return null != this._window && /olark\.net$/.test(this._window.location.hostname);
          }, self.prototype._shouldShowInConsole = function() {
            return this._isDevelopment() || this._showInConsole;
          }, self.prototype._shouldSendMessage = function(logger) {
            var p;
            var c;
            return c = Math.random() <= this._samplingRates[logger.getLevel()], p = types.indexOf(logger.getLevel()) >= types.indexOf(this._logLevel), p && c;
          }, self.prototype._deferSendCount = function(keepData, deepDataAndEvents) {
            return this._countDeferTimeout && clearTimeout(this._countDeferTimeout), this._countKeys.push({
              /** @type {Function} */
              key : keepData,
              options : deepDataAndEvents
            }), exports.nextTick(this._sendCount);
          }, self.prototype._deferSendTrack = function(key, deepDataAndEvents, opt_attributes) {
            return this._trackDeferTimeout && clearTimeout(this._trackDeferTimeout), this._trackKeys.push({
              /** @type {Function} */
              key : key,
              value : deepDataAndEvents,
              options : opt_attributes
            }), exports.nextTick(this._sendTrack);
          }, self.prototype._sendTrack = function() {
            var forceSend;
            var i;
            var item;
            var ilen;
            var s;
            var n_first;
            var items;
            var options;
            var include;
            var _ref1;
            if (this._eventDeferTimeout = null, !(this._trackKeys.length <= 0)) {
              /** @type {string} */
              s = "";
              /** @type {boolean} */
              forceSend = false;
              items = this._trackKeys;
              /** @type {number} */
              i = 0;
              ilen = items.length;
              for (;ilen > i;i++) {
                item = items[i];
                n_first = null != (options = item.options) ? null != (include = options.namespaces) ? include.join(",") : void 0 : void 0;
                s += n_first ? "#" + item.key + "." + n_first + "=" + item.value + " " : "#" + item.key + "=" + item.value + " ";
                if (!forceSend) {
                  forceSend = null != (_ref1 = item.options) ? _ref1.forceSend : void 0;
                }
              }
              return this.log(s, {
                level : "track",
                forceSend : forceSend,
                showInConsole : false
              }), this._trackKeys = [];
            }
          }, self.prototype._sendCount = function() {
            var forceSend;
            var i;
            var item;
            var _i;
            var len;
            var _len;
            var e;
            var x;
            var xs;
            var rawParams;
            var options;
            var _ref1;
            if (this._countDeferTimeout = null, !(this._countKeys.length <= 0)) {
              /** @type {string} */
              e = "";
              /** @type {boolean} */
              forceSend = false;
              rawParams = this._countKeys;
              /** @type {number} */
              i = 0;
              len = rawParams.length;
              for (;len > i;i++) {
                if (item = rawParams[i], xs = null != (options = item.options) ? options.namespaces : void 0) {
                  /** @type {number} */
                  _i = 0;
                  _len = xs.length;
                  for (;_len > _i;_i++) {
                    x = xs[_i];
                    e += "#" + item.key + "." + x + " ";
                  }
                }
                e += "#" + item.key + " ";
                if (!forceSend) {
                  forceSend = null != (_ref1 = item.options) ? _ref1.forceSend : void 0;
                }
              }
              return this.log(e, {
                level : "count",
                forceSend : forceSend,
                showInConsole : false
              }), this._countKeys = [];
            }
          }, self.prototype._send = function(destination) {
            var _timestampOfFirstLogCallInBatch;
            var image;
            var imageData;
            if (this._totalLogCountInBatch++, _timestampOfFirstLogCallInBatch = +new Date, _timestampOfFirstLogCallInBatch - this._timestampOfFirstLogCallInBatch <= 1E3) {
              if (this._totalLogCountInBatch > _totalLogCountInBatch) {
                return;
              }
              /** @type {number} */
              this._totalLogCountInBatch = 0;
              /** @type {number} */
              this._timestampOfFirstLogCallInBatch = _timestampOfFirstLogCallInBatch;
            }
            return this._totalLogCount++, this._totalLogCount > _totalLogCount ? void 0 : (imageData = destination.getEncodedLogEvent(), this._isDevelopment() ? void 0 : (image = new this._window.Image, image.src = "//log.olark.com/jslog/log.png?" + imageData, image.onload = function() {
              return image = null;
            }));
          }, self.prototype._logToConsole = function(record) {
            var bulk;
            var n;
            var command;
            var o;
            var console;
            if (null != (o = this._window) ? o.console : void 0) {
              command = record.getLevel();
              try {
                return "count" === command || "track" === command ? this._window.console.debug("[olark][" + command + "]", record.getMessage()) : record.getStack() ? this._window.console[command]("[olark][" + command + "]", record.getMessage(), record.getStack()) : this._window.console[command]("[olark][" + command + "]", record.getMessage());
              } catch (fn) {
                return bulk = fn, null != (console = this._window.console) ? console.log("[olark][" + command + "]", record.getMessage()) : void 0;
              }
            }
          }, self.getDefaultLogger = function(optionsString) {
            return hasMembers || (hasMembers = new self({
              window : optionsString,
              samplingRate : {
                debug : 0,
                info : 0,
                warn : 0.25,
                error : 0.25,
                track : 0.15,
                count : 0.15,
                dump : 0.05
              }
            })), hasMembers;
          }, self;
        }();
        module.exports = JsDiff;
      }).call(this, next("qvMYcC"));
    }, {
      "../vendor/olark-s3-signer" : 24,
      "./Env" : 15,
      "./LogMessage" : 16,
      "./policies/olark-jsclient-data" : 18,
      bowser : 1,
      "localforage/dist/localforage.nopromises" : 2,
      qvMYcC : 6
    }],
    18 : [function(dataAndEvents, module) {
      module.exports = {
        bucket : "olark-jsclient-data",
        folder : "dumps",
        accessKey : "AKIAJPBNISW4FCSJK5OQ",
        policy : {
          expiration : "2116-07-16T22:35:27.640Z",
          conditions : [{
            bucket : "olark-jsclient-data"
          }, ["starts-with", "$key", ""], ["starts-with", "$Content-Type", ""], ["content-length-range", "0", "5242880"]]
        },
        signature : "cDeMzd1tmKHk7uEfbsc6Ohg5sDI="
      };
    }, {}],
    19 : [function(require, $) {
      var Collection = require("../chatbox/Env");
      var Model = require("../chatbox/BrowserInfo");
      var helper = require("../chatbox/Logger");
      var Node = require("../sandbox/PersistentStorage");
      $.exports = function(global, d) {
        /**
         * @param {Document} element
         * @return {?}
         */
        function getWindowSize(element) {
          var original = "CSS1Compat" === element.compatMode ? element.documentElement : element.body;
          var button = original.clientHeight;
          var browserWidth = original.clientWidth;
          return[browserWidth, button];
        }
        /**
         * @param {string} line
         * @return {?}
         */
        function log(line) {
          /** @type {Array} */
          var tagNameArr = [];
          /** @type {boolean} */
          var idOrDoneIsDone = "string" == typeof line;
          if (idOrDoneIsDone) {
            line = line.split("");
          }
          var braceStack = debug(line.length, 0, line.length);
          for (;braceStack.length;) {
            var typePattern = line.splice(braceStack.pop() % line.length, 1);
            tagNameArr.push(typePattern);
          }
          return idOrDoneIsDone ? tagNameArr.join("") : tagNameArr;
        }
        /**
         * @param {string} arg
         * @return {?}
         */
        function next(arg) {
          /** @type {string} */
          var shortcutChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          var msgs = arg.replace(/[^\d]/g, "").match(/\d{1,2}/g);
          /** @type {string} */
          var rv = "";
          for (;msgs && msgs.length;) {
            rv += shortcutChars.charAt(parseInt(msgs.pop()) % shortcutChars.length);
          }
          return rv;
        }
        /**
         * @return {?}
         */
        function inspect() {
          return "undefined" != typeof global && (global.crypto && global.crypto.getRandomValues);
        }
        /**
         * @param {number} data
         * @param {number} b
         * @param {number} a
         * @return {?}
         */
        function debug(data, b, a) {
          /** @type {Array} */
          var codeSegments = [];
          if (inspect()) {
            /** @type {Uint32Array} */
            var buf = new Uint32Array(data);
            global.crypto.getRandomValues(buf);
            /** @type {Array.<?>} */
            codeSegments = Array.prototype.slice.call(buf);
            /** @type {number} */
            var i = 0;
            for (;i < codeSegments.length;i++) {
              codeSegments[i] = codeSegments[i] % (a - b + 1) + b;
            }
          } else {
            /** @type {number} */
            var s = 0;
            for (;data > s;s++) {
              codeSegments.push(Math.floor(Math.random() * (a - b + 1)) + b);
            }
          }
          return codeSegments;
        }
        /**
         * @param {number} num
         * @param {boolean} err
         * @param {Object} token
         * @return {?}
         */
        function handler(num, err, token) {
          /** @type {(Navigator|null)} */
          var navigator = global.navigator;
          var args = err ? next(err) : "";
          var name = (navigator.userLanguage || navigator.language).replace(/[^\w]/g, "");
          var type = log(next(navigator.userAgent));
          /** @type {number} */
          var i = (new Date).getTimezoneOffset() / 60 + 25;
          /** @type {string} */
          var post = chars.charAt(i % chars.length);
          var matches = getWindowSize(token);
          var base = next("" + matches[0] + matches[1]);
          /** @type {Array.<?>} */
          var eventPath = Array.prototype.slice.call(navigator.plugins.length ? navigator.plugins : []);
          /** @type {string} */
          var s = "";
          for (;eventPath.length;) {
            var self = eventPath.pop();
            if (self.name) {
              s += self.name;
            }
            if (self.description) {
              s += self.description;
            }
            if (self.version) {
              s += self.version;
            }
          }
          var state = log(next(s));
          /** @type {number} */
          var pdataCur = Math.floor(count / 3);
          /** @type {number} */
          var cpy = Math.floor(count / 4);
          if (inspect()) {
            /** @type {number} */
            pdataCur = Math.floor(count / 2);
            /** @type {number} */
            cpy = Math.floor(count / 6);
          }
          var braceStack = debug(pdataCur, 0, chars.length - 1);
          /** @type {string} */
          var ret = "";
          for (;braceStack.length;) {
            ret += chars.charAt(braceStack.pop());
          }
          /** @type {boolean} */
          var C = /googlebot/i.test(global.navigator.userAgent);
          return C ? ret = args.slice(0, cpy) + "g00g" + ret : ret += args.slice(0, cpy), ret += base + post + state + type + name, ret.slice(0, num);
        }
        /**
         * @return {undefined}
         */
        function Create() {
          /** @type {Array} */
          this.__http_requests = [];
        }
        /**
         * @param {number} opt_rightAlign
         * @param {?} clear
         * @return {undefined}
         */
        function Renderer(opt_rightAlign, clear) {
          /** @type {number} */
          this.cookieManager = opt_rightAlign;
          this.targetWindow = clear;
        }
        /**
         * @param {Object} options
         * @param {string} context
         * @return {undefined}
         */
        function init(options, context) {
          /**
           * @param {string} name
           * @param {Object} context
           * @return {undefined}
           */
          function load(name, context) {
            context = context || doc;
            var el = context.createElement("script");
            /** @type {string} */
            var ns = "https:" == options.location.protocol ? "https:" : "http:";
            name = name.replace(/^\/\//, "");
            /** @type {string} */
            el.src = ns + "//" + name;
            /** @type {boolean} */
            el.async = true;
            /** @type {boolean} */
            el.defer = true;
            el.setAttribute("data-cfasync", "false");
            (context.getElementsByTagName("head")[0] || (context.getElementsByTagName("body")[0] || context.body)).appendChild(el);
          }
          /**
           * @param {Array} params
           * @return {?}
           */
          function _init(params) {
            params.sort(function(check, value) {
              return value.length - check.length;
            });
            /** @type {number} */
            var i = 0;
            for (;i < params.length;i++) {
              var param = params[i];
              if (!/^\s*$/.test(param)) {
                var res = "." + param.replace(/^[\s\*\.]*/, "");
                if (doc.location.hostname.indexOf(res.replace(/^\./, "")) >= 0) {
                  return res;
                }
              }
            }
            return null;
          }
          /**
           * @param {string} method
           * @param {string} url
           * @return {?}
           */
          function xhr(method, url) {
            var xhr;
            var XDomainRequest = global.XDomainRequest;
            return "undefined" != typeof XMLHttpRequest && (xhr = new XMLHttpRequest), xhr && "withCredentials" in xhr ? xhr.open(method, url, true) : "undefined" != typeof XDomainRequest ? (xhr = new XDomainRequest, xhr.open(method, url)) : xhr = null, xhr;
          }
          /**
           * @param {?} headers
           * @param {?} payload
           * @param {?} number
           * @param {string} data
           * @param {boolean} b
           * @param {string} opt_noCache
           * @return {undefined}
           */
          function send(headers, payload, number, data, b, opt_noCache) {
            /** @type {Array} */
            var tagNameArr = ["c=create", "s=" + encodeURIComponent(headers), "v=" + encodeURIComponent(payload), "i=" + encodeURIComponent(number), "g=" + encodeURIComponent(data || "ALL"), "q=precache" + Math.random().toString().replace(".", ""), "j=o0", "version=loader-precache", "xhttp=1", "u=" + encodeURIComponent(doc.location.href), "r=" + encodeURIComponent(doc.referrer)];
            if (b) {
              tagNameArr.push("end_conversation=1");
              if (done._.identityManager.isNewConversation()) {
                tagNameArr.push("is_new_conversation=1");
              }
            }
            var $scope = options.olark._.nrpcPrecache = {
              response : null,
              responseCallback : null
            };
            /**
             * @param {Object} error
             * @return {undefined}
             */
            var callback = function(error) {
              /** @type {Object} */
              $scope.response = error;
              if ($scope.responseCallback) {
                $scope.responseCallback(error);
              }
            };
            /** @type {string} */
            var username = opt_noCache + "/c?" + tagNameArr.join("&");
            /** @type {string} */
            var remote = "https:" === doc.location.protocol ? "https:" : "http:";
            /** @type {string} */
            var url = remote + "//" + username;
            var request = xhr("GET", url);
            if (request) {
              /**
               * @return {undefined}
               */
              request.onload = function() {
                try {
                  /** @type {*} */
                  var lastError = global.JSON.parse(request.responseText);
                  callback(lastError);
                } catch (n) {
                  onerror();
                }
              };
              /** @type {boolean} */
              var y = false;
              /**
               * @return {undefined}
               */
              var onerror = function() {
                if (!y) {
                  /** @type {boolean} */
                  y = true;
                  callback({
                    status : 500
                  });
                }
              };
              /** @type {function (): undefined} */
              request.onerror = onerror;
              /** @type {function (): undefined} */
              request.onabort = onerror;
              /** @type {function (): undefined} */
              request.ontimeout = onerror;
              /**
               * @return {undefined}
               */
              request.onprogress = function() {
              };
              done._.internalLog.logHttpRequest(username);
              request.send();
            } else {
              $scope.response = {
                status : 500
              };
              /** @type {string} */
              var name = "_olark_callback_" + Math.random().toString().replace(".", "");
              /**
               * @param {Object} err
               * @return {undefined}
               */
              global[name] = function(err) {
                callback(err);
                global[name] = void 0;
                try {
                  delete global[name];
                } catch (n) {
                }
              };
              /** @type {string} */
              var id = username + "&cb=" + name;
              load(id, d);
            }
          }
          /**
           * @return {?}
           */
          function next() {
            return done._.cookieManager.get("_okac");
          }
          /**
           * @param {string} now
           * @return {undefined}
           */
          function create(now) {
            done._.cookieManager.set("_okac", now);
          }
          /**
           * @return {?}
           */
          function destroy() {
            return done._.cookieManager.get("_okla");
          }
          /**
           * @param {string} comment
           * @return {undefined}
           */
          function remove(comment) {
            done._.cookieManager.set("_okla", comment);
          }
          /**
           * @param {string} timeout
           * @return {undefined}
           */
          function start(timeout) {
            var extension = next() || +new Date;
            var r = destroy() || false;
            self.P("getassets");
            self.versions = {
              follow : true,
              popout : true
            };
            if (r) {
              load(self.assetHost + "/a/assets/v0/site/" + timeout + ".js?cb=" + extension, d);
            } else {
              load("static.olark.com/a/assets/v0/site/" + timeout + ".js?cb=" + extension, d);
            }
          }
          /**
           * @param {string} param
           * @param {string} id
           * @return {?}
           */
          function get(param, id) {
            /** @type {RegExp} */
            var reg = new RegExp(param + "=(([^;]+.)?(olark.(com|net)(%3A\\d+)?|battleship:\\d+)[^;]+)");
            /** @type {RegExp} */
            var pathRegExp = new RegExp(param + "=([a-zA-Z0-9]+)");
            var result = reg.test(path) ? path.match(reg)[1] : null;
            var name = pathRegExp.test(path) ? path.match(pathRegExp)[1] : null;
            return result ? /((assets|static)\.olark\.(com|net))/.test(result) ? id : unescape(result) : name ? id + "?v=" + name : id;
          }
          /**
           * @return {?}
           */
          function fn() {
            var result = path.match(/(olarkid=(0000-0000-0000-0000|1470-860-10-9245))/);
            return result && result[2] ? result[2] : null;
          }
          /**
           * @param {string} n
           * @param {string} o
           * @return {?}
           */
          function callback(n, o) {
            return("https:" == options.location.protocol ? "https:" : "http:") + "//" + n + o;
          }
          /**
           * @param {string} value
           * @return {?}
           */
          function init(value) {
            /** @type {string} */
            var expires = "/storage.html?v=1477943863080";
            /** @type {boolean} */
            var a = /^static\.olark\.com.+$/.test(value);
            /** @type {boolean} */
            var useSSL = a || "https:" == options.location.protocol;
            var ev = done._.persistentStorage.isLocalStorageAvailable();
            /** @type {(boolean|function (this:Element, string): number)} */
            var b = !(ev || global.globalStorage) && (d.documentElement && d.documentElement.addBehavior);
            return a && b ? "https://static.olark.com/jsclient" + done._.chatboxBucketPostfix + expires : (useSSL ? "https" : "http") + "://" + value + expires;
          }
          /**
           * @param {?} h
           * @param {?} value
           * @param {?} next
           * @return {undefined}
           */
          function empty(h, value, next) {
            if (!H) {
              if (!oldName) {
                /** @type {boolean} */
                H = true;
                send(h, value, next, text, oldconfig, done._.nrpcBaseUrl);
              }
            }
          }
          var console = helper.getDefaultLogger(options);
          var done = options.olark;
          var ret = new Collection({
            olark : done
          });
          done._.P("loader");
          /** @type {string} */
          done._.chatboxBucketPostfix = "";
          if (!done._.document) {
            done._.document = options.document;
          }
          if (!done._.persistentStorage) {
            done._.persistentStorage = new Node({
              namespace : "",
              localStorage : options.localStorage
            });
          }
          try {
            !function() {
              /**
               * @param {number} d
               * @return {?}
               */
              function success(d) {
                return d = parseInt(d), d > 2E4 ? 2E4 : d;
              }
              /**
               * @return {undefined}
               */
              function init() {
                if (b && done._.preventBoot !== true) {
                  /** @type {boolean} */
                  var e = false;
                  if (!h) {
                    if (f) {
                      if (properties.hasOwnProperty(prop)) {
                        if (properties.hasOwnProperty(p)) {
                          console.track("perf_getframe", properties[prop], {
                            namespaces : ["loader0"].concat(caseSensitive),
                            forceSend : true
                          });
                          console.track("perf_frame", properties[p], {
                            namespaces : ["loader0"].concat(caseSensitive),
                            forceSend : true
                          });
                          /** @type {boolean} */
                          h = true;
                        }
                      }
                    }
                  }
                  var property;
                  for (property in methods) {
                    if (methods.hasOwnProperty(property) && !methods[property]) {
                      var value = properties[property];
                      if ("number" != typeof value && (0 >= YYSTATE && (value = +new Date - properties[0])), "number" == typeof value) {
                        /** @type {string} */
                        var c = "";
                        if (done._.chatboxBucket) {
                          c = done._.chatboxBucket;
                        }
                        console.track("perf_" + property, success(value), {
                          namespaces : [context, c].concat(caseSensitive),
                          forceSend : true
                        });
                        /** @type {boolean} */
                        methods[property] = true;
                      } else {
                        /** @type {boolean} */
                        e = true;
                      }
                    }
                  }
                  YYSTATE--;
                  if (e) {
                    setTimeout(init, backoff);
                  }
                }
              }
              var properties = done._.p;
              /** @type {Array} */
              var caseSensitive = (done._.v, []);
              var k = model.getBrowserName();
              if ("Internet Explorer" == k) {
                /** @type {string} */
                k = "IE";
              }
              var delimit1 = model.getVersion().split(".").shift();
              var c = model.isMobile();
              if (c) {
                var item = model.getMobileOS();
                var arrayLike = (model.getOSVersion().split(".").shift(), model.isTablet());
                caseSensitive.push(k);
                caseSensitive.push(item);
                caseSensitive.push(arrayLike ? "tablet" : "phone");
              } else {
                caseSensitive.push("IE" == k ? 9 >= delimit1 ? "OldIE" : k + delimit1 : k);
                caseSensitive.push("desktop");
              }
              /** @type {boolean} */
              var f = false;
              var methods = {
                application : false,
                assets : false,
                box : false,
                connection : false,
                extready : false,
                getapplication : false,
                getconnection : false,
                idready : false,
                load : false,
                loader : false,
                storedownloaded : false,
                storereceived : false,
                storeparsed : false
              };
              /** @type {boolean} */
              var h = false;
              /** @type {number} */
              var prop = 1;
              /** @type {number} */
              var p = 2;
              /** @type {number} */
              var YY_START = 5;
              /** @type {number} */
              var backoff = 3E3;
              /** @type {number} */
              var TOTAL_DURATION = 2E3;
              /** @type {number} */
              var YYSTATE = YY_START;
              /** @type {boolean} */
              var b = Math.random() < 0.1 ? true : /me\.olark\.net/.test(global.location.href);
              setTimeout(init, TOTAL_DURATION);
            }();
          } catch (B) {
            done("api.boot.onIdentityReady", function() {
              console.count("performance_tracking_error");
            });
          }
          /** @type {number} */
          var maxMillisecondsConversationCanBeIdle = 12E5;
          /** @type {string} */
          var assetHost = "assets.olark.com";
          /** @type {RegExp} */
          var rparentsprev = /^\s*(omp__super_properties)\s*$/;
          var instance = function() {
            /**
             * @param {string} name
             * @param {Object} data
             * @param {number} delay
             * @param {string} text
             * @param {boolean} args
             * @param {boolean} obj
             * @param {boolean} deepDataAndEvents
             * @return {undefined}
             */
            function setup(name, data, delay, text, args, obj, deepDataAndEvents) {
              /**
               * @return {undefined}
               */
              function init() {
                var expires;
                if (delay) {
                  /** @type {Date} */
                  var date = new Date;
                  date.setTime(date.getTime() + delay);
                  /** @type {string} */
                  expires = "; expires=" + date.toGMTString();
                } else {
                  /** @type {string} */
                  expires = "";
                }
                var basis;
                /** @type {string} */
                var domain = args ? "; domain=" + args : "";
                /** @type {string} */
                var path = obj ? "; secure" : "";
                /** @type {string} */
                var port = "; path=" + text;
                /** @type {string} */
                var value = escape(data.toString());
                if (h) {
                  if (0 > delay) {
                    done._.persistentStorage.remove(prefix + name);
                  } else {
                    done._.persistentStorage.set(prefix + name, JSON.stringify({
                      value : value,
                      expires : delay ? (new Date).getTime() + delay : null
                    }));
                  }
                } else {
                  /** @type {string} */
                  doc.cookie = name + "=" + value + expires + domain + port + path;
                }
                var matches = success();
                if (0 > delay ? matches[name] && (matches[name].length > 0 && matches[name].shift()) : matches[name] ? matches[name][0] = value : matches[name] = [value], delay > 0 && (216E7 > delay && (name != method && console.warn("cookie expiration set too low for cache: " + name))), 0 > delay) {
                  if (basis = callback(function() {
                      return init(name);
                    }), "undefined" != typeof basis) {
                    throw new Error("[olark] unable to delete cookie: " + name);
                  }
                } else {
                  if (basis = callback(function() {
                      return init(name, true);
                    }), basis != data.toString()) {
                    throw new Error("[olark] unable to set cookie: " + name + ", expected " + data + " but got " + basis);
                  }
                }
              }
              /** @type {string} */
              var next = options != options.top ? "iframe_cookie" : "";
              if (data || 0 === data) {
                try {
                  init();
                } catch (v) {
                  if (deepDataAndEvents) {
                    throw v;
                  }
                  try {
                    if (h) {
                      done._.persistentStorage.remove(prefix + name);
                    } else {
                      /** @type {string} */
                      doc.cookie = name + "=;expires=Thu, 01-Jan-1970 00:00:01 GMT";
                    }
                    init();
                    console.warn("value of cookie " + name + " was fixed");
                    console.count("cookie_needed_cleanpath");
                    console.count(next);
                  } catch (v) {
                    try {
                      var namespaces = options.location.hostname.split(".");
                      for (;namespaces.length > 2;) {
                        namespaces.shift();
                        if (h) {
                          done._.persistentStorage.remove(prefix + name);
                        } else {
                          /** @type {string} */
                          doc.cookie = name + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=." + namespaces.join(".") + "; path=" + text;
                        }
                      }
                      init();
                      console.warn("value of cookie " + name + " was fixed");
                      console.count("cookie_needed_cleandomain");
                      console.count(next);
                    } catch (err) {
                      console.error(err.message);
                      console.count("cookie_storefail");
                      console.count(next);
                    }
                  }
                }
              } else {
                console.error("value of cookie " + name + " was " + data + ", prevent write");
                console.count("cookie_writenull");
                console.count(next);
              }
            }
            /**
             * @param {string} name
             * @param {string} add
             * @return {?}
             */
            function init(name, add) {
              var value = function() {
                var old = success();
                var dig = old[name] || [];
                if (1 == dig.length) {
                  return dig[0];
                }
                if (0 == dig.length) {
                  return{}.undefinedValue;
                }
                /** @type {boolean} */
                var r = rparentsprev.test(name) ? true : false;
                return r || (console.warn("got multiple values for " + name + "-" + dig.join(", ")), console.count("#cookie_orig_multivalue")), dig[0];
              }();
              var newValue = value ? unescape(value) : value;
              /** @type {string} */
              var next = add && /^\s*$/.test(doc.cookie) ? "emptycookie" : "";
              return/^\s*$/.test(newValue) ? (console.warn("value of cookie " + name + " is empty string, forcing to undefined"), console.count("cookie_emptystring"), console.count(next), newValue = {}.undefinedValue) : "null" == newValue ? (console.warn("value of cookie " + name + " is a string 'null', looks like it should have been null, forcing to null"), console.count("cookie_readnull"), console.count(next), newValue = null) : "undefined" == newValue ? (console.warn("value of cookie " + name +
                " is a string 'undefined', looks like it should have been undefined, forcing to undefined"), console.count("cookie_readundefined"), console.count(next), newValue = {}.undefinedValue) : "**erased" == newValue && (newValue = {}.undefinedValue), newValue;
            }
            /**
             * @param {string} path
             * @param {boolean} obj
             * @param {boolean} deepDataAndEvents
             * @return {undefined}
             */
            function inspect(path, obj, deepDataAndEvents) {
              setup(path, "**erased", -2592E6, later, typePattern, obj, deepDataAndEvents);
            }
            /**
             * @param {string} id
             * @return {?}
             */
            function getParams(id) {
              var breakpoint_ids;
              /** @type {Array.<string>} */
              var aHash = global.location.search.replace(/^\?/, "").split(/&/);
              /** @type {number} */
              var i = aHash.length - 1;
              for (;i >= 0;i--) {
                if (breakpoint_ids = aHash[i].split(/=/), breakpoint_ids[0] == id) {
                  return breakpoint_ids[1];
                }
              }
              return{}.undefinedValue;
            }
            /**
             * @return {?}
             */
            function success() {
              return(null === c || noaccum) && add(), c;
            }
            /**
             * @return {undefined}
             */
            function add() {
              if (c = {}, h) {
                var buf;
                for (buf in done._.persistentStorage.iterable()) {
                  if (0 === buf.indexOf(prefix)) {
                    /** @type {string} */
                    var id = buf.replace(prefix, "");
                    var content = done._.persistentStorage.get(prefix + id);
                    if (content) {
                      /** @type {*} */
                      var token = JSON.parse(content);
                      if (token.expires && token.expires < (new Date).getTime()) {
                        done._.persistentStorage.remove(prefix + id);
                      } else {
                        /** @type {Array} */
                        c[id] = [token.value];
                      }
                    }
                  }
                }
              } else {
                var codeSegments = doc.cookie.split(";");
                /** @type {number} */
                var i = 0;
                for (;i < codeSegments.length;i++) {
                  var moduleNamePlusExt = codeSegments[i];
                  var requestUrl = moduleNamePlusExt.split("=")[0];
                  var eventName = requestUrl.replace(/^\s*/, "").replace(/^\s*/, "");
                  var typePattern = moduleNamePlusExt.substring(requestUrl.length + 1, moduleNamePlusExt.length);
                  c[eventName] = c[eventName] || [];
                  c[eventName].push(typePattern);
                }
              }
            }
            /**
             * @param {Function} f
             * @return {?}
             */
            function callback(f) {
              var value;
              try {
                /** @type {boolean} */
                noaccum = true;
                value = f();
              } catch (fmt) {
                console.error(fmt);
              }
              return noaccum = false, value;
            }
            /** @type {string} */
            var later = "/";
            /** @type {null} */
            var typePattern = null;
            /** @type {boolean} */
            var suiteView = false;
            var cache = {};
            /** @type {boolean} */
            var h = /^file\:\/\//.test(options.location.href) && "persistentStorage" in options.olark._ ? true : false;
            /** @type {string} */
            var prefix = "OLARK-";
            var c = {};
            /** @type {boolean} */
            var noaccum = false;
            /** @type {string} */
            var method = "_okck";
            return{
              /**
               * @param {string} path
               * @return {undefined}
               */
              setPath : function(path) {
                /** @type {string} */
                later = path;
              },
              /**
               * @param {Object} keepData
               * @return {undefined}
               */
              setDomain : function(keepData) {
                /** @type {Object} */
                typePattern = keepData;
              },
              /**
               * @param {boolean} keepData
               * @return {undefined}
               */
              setSecure : function(keepData) {
                /** @type {boolean} */
                suiteView = keepData;
              },
              /**
               * @return {undefined}
               */
              useLocalStorage : function() {
                /** @type {boolean} */
                h = true;
                add();
              },
              /**
               * @return {?}
               */
              isAllowedToWriteCookies : function() {
                /**
                 * @return {?}
                 */
                function add() {
                  try {
                    return setup(method, pdataCur, null, later, typePattern, suiteView, true), inspect(method, suiteView, true), true;
                  } catch (dstUri) {
                    return reason = dstUri.toString(), false;
                  }
                }
                /**
                 * @return {?}
                 */
                function exports() {
                  try {
                    return setup(method, pdataCur, 5E3, later, typePattern, suiteView, true), inspect(method, suiteView, true), true;
                  } catch (dstUri) {
                    return reason = dstUri.toString(), false;
                  }
                }
                /** @type {string} */
                var pdataCur = Math.random().toString().replace("0.", "");
                /** @type {boolean} */
                var a = options != options.top ? true : false;
                /** @type {boolean} */
                var s = options.navigator.cookieEnabled ? false : true;
                /** @type {string} */
                var reason = "";
                try {
                  return s ? (console.error("cannot set any cookies"), console.count("nocookies_due_to_disabled"), false) : callback(add) ? callback(exports) ? true : (a ? (console.warn("cannot set expirable cookies " + reason), console.count("nocookies_with_expiry_due_to_p3p")) : (console.warn("cannot set expirable cookies " + reason), console.count("nocookies_with_expiry")), false) : (a ? (console.warn("cannot set session cookies " + reason), console.count("nocookies_for_session_due_to_p3p")) :
                    (console.warn("cannot set session cookies " + reason), console.count("nocookies_for_session")), false);
                } catch (ex) {
                  return console.error("unexpected issue testing cookies " + ex.message), console.count("unknown_cookie_test_error"), false;
                }
              },
              /**
               * @param {string} data
               * @param {string} value
               * @param {number} opt_attributes
               * @return {undefined}
               */
              set : function(data, value, opt_attributes) {
                if (!cache[data]) {
                  try {
                    setup(data, value, opt_attributes || null, later, typePattern, suiteView);
                  } catch (dstUri) {
                    console.error("failed to create cookie: " + dstUri.toString());
                    console.count("cookie_badset");
                  }
                }
              },
              /**
               * @param {string} id
               * @param {boolean} dataAndEvents
               * @return {?}
               */
              get : function(id, dataAndEvents) {
                try {
                  /** @type {function (string, string): ?} */
                  var request = init;
                  return dataAndEvents && (request = function(id) {
                    return callback(function() {
                      return init(id);
                    });
                  }), cache[id] ? getParams(id) : request(id);
                } catch (dstUri) {
                  return console.error("failed to read cookie: " + dstUri.toString(), "wcsid" === id ? {
                    conversationId : null
                  } : {}), console.count("cookie_badget"), null;
                }
              },
              /**
               * @param {string} data
               * @param {string} key
               * @param {string} dataAndEvents
               * @return {undefined}
               */
              setAllowingNullAndUndefinedAndEmptyString : function(data, key, dataAndEvents) {
                if (!cache[data]) {
                  if (null === key) {
                    /** @type {string} */
                    key = "**null";
                  } else {
                    if ("undefined" == typeof key) {
                      /** @type {string} */
                      key = "**undefined";
                    } else {
                      if ("" == key) {
                        /** @type {string} */
                        key = "**emptystr";
                      }
                    }
                  }
                  try {
                    setup(data, key, dataAndEvents || null, later, typePattern, suiteView);
                  } catch (dstUri) {
                    console.error("failed to create cookie: " + dstUri.toString());
                    console.count("cookie_badset");
                  }
                }
              },
              /**
               * @param {string} id
               * @return {?}
               */
              getAllowingNullAndUndefinedAndEmptyString : function(id) {
                try {
                  var expires = cache[id] ? getParams(id) : init(id);
                  return "**null" == expires ? expires = null : "**undefined" == expires ? expires = {}.undefinedValue : "**emptystr" == expires && (expires = ""), expires;
                } catch (dstUri) {
                  return console.error("failed to read cookie: " + dstUri.toString()), console.count("cookie_badget"), null;
                }
              },
              /**
               * @param {string} key
               * @return {undefined}
               */
              erase : function(key) {
                if (!cache[key]) {
                  try {
                    inspect(key);
                  } catch (dstUri) {
                    console.error("failed to erase cookie: " + dstUri.toString());
                    console.count("cookie_baderase");
                  }
                }
              },
              /**
               * @param {Array} codeSegments
               * @return {undefined}
               */
              backTheseCookiesByQueryString : function(codeSegments) {
                /** @type {number} */
                var i = 0;
                for (;i < codeSegments.length;i++) {
                  /** @type {boolean} */
                  cache[codeSegments[i]] = true;
                }
              },
              /**
               * @return {undefined}
               */
              refresh : function() {
                add();
              }
            };
          }();
          var doc = options.document;
          var path = doc.cookie;
          var a_part = global.olark = options.olark;
          var self = a_part._;
          var results = self.callstack = self.s || [];
          var text = instance.get("_okgid");
          /** @type {boolean} */
          var oldconfig = false;
          /** @type {null} */
          done._.f = null;
          done("api.boot.onIdentityReady", function(frameName) {
            if (!done._.chatboxBucket) {
              /** @type {number} */
              var thisp = 1 + parseInt(frameName.split("-")[0]) % v;
              /** @type {(number|string)} */
              thisp = thisp || "bucket1";
              /** @type {string} */
              done._.chatboxBucket = "bucket" + thisp;
              /** @type {string} */
              done._.chatboxBucketPostfix = "-bucket" + thisp;
            }
          });
          /** @type {string} */
          done._.nrpcBaseUrl = "nrpc.olark.com/nrpc";
          /** @type {number} */
          done._.maxMillisecondsConversationCanBeIdle = maxMillisecondsConversationCanBeIdle;
          done._.identityManager = new Renderer(instance, options);
          done._.internalLog = new Create;
          /** @type {boolean} */
          var H = false;
          /** @type {boolean} */
          var oldName = false;
          if (done("api.boot.onIdentityReady", empty), instance.isAllowedToWriteCookies()) {
            done._.cookieManager = instance;
            /** @type {boolean} */
            var V = false;
            setTimeout(function() {
              if (!V) {
                done("load");
              }
            }, 900);
            /** @type {function (string): undefined} */
            done._.setSiteAssetHash = create;
            /** @type {function (string): undefined} */
            done._.setLoaderUseAssets = remove;
            /** @type {string} */
            done._.assetHost = assetHost;
            done("api.boot.onIdentityReady", function(reversed, iterator, callback) {
              /**
               * @return {undefined}
               */
              function success() {
                var async = options.clicky;
                if (async && async.olark) {
                  /** @type {boolean} */
                  i = false;
                  try {
                    async.olark(reversed, iterator, callback);
                  } catch (dstUri) {
                    console.warn("unable to connect with clicky: " + dstUri.toString());
                  }
                } else {
                  if (i) {
                    setTimeout(success, 600);
                  }
                }
              }
              /** @type {boolean} */
              var i = true;
              done("api.boot.onWindowLoad", function() {
                setTimeout(function() {
                  /** @type {boolean} */
                  i = false;
                }, 2E3);
              });
              success();
            });
            /** @type {boolean} */
            done._.preventBoot = false;
            /** @type {string} */
            done._.apiHost = "https://api.olark.com";
            try {
              /** @type {boolean} */
              var K = /framed-by-olark/.test(options.location.hash);
              if (K) {
                /** @type {boolean} */
                done._.preventBoot = true;
              }
            } catch (B) {
            }
            var isCursorAtEnd = model.getBrowser().android && model.isTablet();
            var ignoreEvent = model.getBrowser().android && model.getOSVersion() < 3;
            var a = !model.isTablet() && model.isMobile();
            /** @type {boolean} */
            var b = true;
            /** @type {boolean} */
            var _ref = false;
            var in_text = !isCursorAtEnd || ignoreEvent;
            var formatting = options.olark._.persistentStorage.isLocalStorageAvailable();
            if (d !== doc) {
              /** @type {string} */
              d.body.style.cssText = "height:100%;margin:0px;padding:0px;background:transparent";
            }
            (function() {
              /**
               * @param {string} token
               * @return {?}
               */
              function handler(token) {
                var horizontalOffset = token.match(/(.+)\/javascript\/.+/);
                return horizontalOffset ? horizontalOffset[1] : "static.olark.com";
              }
              /**
               * @return {undefined}
               */
              function destroy() {
                done._.P("idready");
                var updateFunc;
                var r20 = done._.identityManager.getSiteId();
                var progressContexts = done._.identityManager.getVisitorId();
                var progressValues = done._.identityManager.getConversationId();
                if (r20 && (progressContexts && progressValues)) {
                  updateFunc = nodes.length > 0 ? nodes.shift() : void 0;
                  for (;updateFunc;) {
                    updateFunc(r20, progressContexts, progressValues);
                    updateFunc = nodes.length > 0 ? nodes.shift() : void 0;
                  }
                }
              }
              /**
               * @return {undefined}
               */
              function flush() {
                var i;
                if (w) {
                  i = args.length > 0 ? args.shift() : void 0;
                  for (;i;) {
                    i();
                    i = args.length > 0 ? args.shift() : void 0;
                  }
                }
              }
              /**
               * @param {string} e
               * @return {undefined}
               */
              function update(e) {
                /**
                 * @param {string} value
                 * @return {?}
                 */
                function callback(value) {
                  /** @type {RegExp} */
                  var rchecked = new RegExp("^[" + chars + "]+$");
                  return rchecked.test(value) ? true : false;
                }
                /**
                 * @return {undefined}
                 */
                function remove() {
                  /** @type {boolean} */
                  c = true;
                  done._.conversationId = handler(count, e, doc);
                  instance.set("wcsid", done._.conversationId);
                  instance.erase("_okbk");
                  instance.erase("_okgid");
                  /** @type {boolean} */
                  done._.isNewConversation = true;
                }
                /**
                 * @return {undefined}
                 */
                function update() {
                  if (!c) {
                    console.warn("creating new visitor ID when we already had a conversation ID");
                    console.count("visitor_changed_on_conversation");
                  }
                  done._.visitorId = handler(count, e, doc);
                  instance.set("hblid", done._.visitorId, 63072E6);
                }
                var ex = (done._.siteId = e, instance.get("hblid"));
                var err = instance.get("wcsid");
                /** @type {boolean} */
                var c = false;
                var r = instance.get("_okgid");
                if (err && done._.identityManager.isConversationIdAlive()) {
                  if (names && r !== text) {
                    remove();
                  } else {
                    if (!callback(err)) {
                      console.warn("regenerating invalid wcsid " + err);
                      console.count("invalid_wcsid_in_cookie");
                      remove();
                    }
                  }
                } else {
                  remove();
                }
                if (ex) {
                  if (!callback(ex)) {
                    console.warn("regenerating invalid hblid " + ex);
                    console.count("invalid_hblid_in_cookie");
                    update();
                  }
                } else {
                  update();
                }
                done._.visitorId = done._.visitorId || ex;
                done._.conversationId = done._.conversationId || err;
                if (instance.get("hblid") !== done._.visitorId) {
                  console.error("hblid could not be set");
                  console.count("noboot");
                  console.count("unset_hblid");
                  /** @type {boolean} */
                  done._.preventBoot = true;
                }
                if (instance.get("wcsid") !== done._.conversationId) {
                  console.error("wcsid could not be set");
                  console.count("noboot");
                  console.count("unset_wcsid");
                  /** @type {boolean} */
                  done._.preventBoot = true;
                }
                if (!(done._.visitorId && done._.conversationId)) {
                  /** @type {boolean} */
                  done._.preventBoot = true;
                  if ("https:" == options.location.protocol) {
                    console.warn("preventing boot due to missing hblid/wcsid");
                    console.count("noboot_on_ssl");
                  } else {
                    console.warn("preventing boot due to missing hblid/wcsid");
                    console.count("noboot");
                  }
                }
                done._.identityManager.keepConversationIdAlive();
                done._.identityManager.watchConversationIdForExpiration(handler(count, e, doc));
                destroy();
              }
              /**
               * @param {string} baseUrl
               * @param {string} name
               * @param {boolean} dataAndEvents
               * @return {undefined}
               */
              function init(baseUrl, name, dataAndEvents) {
                if (!dataAndEvents || !spineIndexByURL[baseUrl]) {
                  switch(spineIndexByURL[baseUrl] = true, baseUrl) {
                    case "system.version":
                      /** @type {string} */
                      done._.chatboxBucket = name;
                      /** @type {string} */
                      done._.chatboxBucketPostfix = "-" + name;
                      break;
                    case "system.asset_host":
                      /** @type {string} */
                      done._.assetHost = name;
                      break;
                    case "system.allow_mobile_boot":
                      if (name) {
                        /** @type {boolean} */
                        b = false;
                      }
                      break;
                    case "system.hb_disable_mobile":
                      if (name) {
                        /** @type {boolean} */
                        b = true;
                      }
                      break;
                    case "system.use_theme":
                      /** @type {Array} */
                      var resultItems = ["artsy_albatross", "bouncing_buzzard"];
                      /** @type {number} */
                      var i = 0;
                      for (;i < resultItems.length;i++) {
                        var result = resultItems[i];
                        if (result === name) {
                          /** @type {boolean} */
                          b = false;
                          /** @type {boolean} */
                          done._.usingReactTheme = true;
                          break;
                        }
                      }
                      break;
                    case "system.wait_for_config_before_precache":
                      /** @type {string} */
                      oldName = name;
                      break;
                    case "system.forced_rpc_server":
                      /** @type {string} */
                      done._.nrpcBaseUrl = name;
                      break;
                    case "system.allow_ipad_boot":
                      /** @type {boolean} */
                      _ref = !name;
                      break;
                    case "system.ignore_window_onload":
                      if (name) {
                        done("load");
                      }
                      break;
                    case "system.allow_end_conversation":
                      /** @type {boolean} */
                      oldconfig = true;
                      break;
                    case "system.wait_until_window_onload":
                      if (name) {
                        /** @type {boolean} */
                        V = true;
                      }
                      break;
                    case "system.minimize_cookies":
                      if (name) {
                        instance.useLocalStorage();
                      }
                      break;
                    case "system.path":
                      instance.setPath(name);
                      break;
                    case "system.domain":
                      instance.setDomain(name);
                      break;
                    case "system.require_secure_cookies":
                      instance.setSecure(name);
                      break;
                    case "system.allowed_domains":
                      if (name.length) {
                        var events = _init(name.split(/\s*,\s*/));
                        if (events) {
                          instance.setDomain(events);
                        }
                      }
                      break;
                    case "system.is_single_page_application":
                      /** @type {number} */
                      var UID = 1;
                      setInterval(function() {
                        done("api.chat.updateVisitorStatus", {
                          snippet : (UID++).toString()
                        });
                      }, 6E5);
                      break;
                    case "system.max_milliseconds_conversation_can_be_idle":
                      /** @type {string} */
                      done._.maxMillisecondsConversationCanBeIdle = name;
                      break;
                    case "system.group":
                      /** @type {string} */
                      text = name;
                      break;
                    case "system.group_change_ends_chat":
                      /** @type {boolean} */
                      names = name ? true : false;
                      break;
                    case "system.use_querystring_for_cookies":
                      instance.backTheseCookiesByQueryString(name || []);
                      break;
                    case "system.api_host":
                      /** @type {string} */
                      done._.apiHost = name;
                  }
                }
              }
              /**
               * @return {undefined}
               */
              function finish() {
                if (!(!w || (!btnIsLeft || (elIsCancel || (done._.preventBoot || (a && b || (model.getBrowser().ipad && _ref || (isCursorAtEnd && in_text || !formatting)))))))) {
                  self.P("prepapplication");
                  var cur = ret.getOlarkHost();
                  /** @type {string} */
                  value = cur + "/jsclient";
                  value += done._.chatboxBucketPostfix;
                  /** @type {string} */
                  var key = value + "/application2.js?v=1477943863080";
                  data = get("olarkap", key);
                  self.popout = callback(value, "/popout.html?v=1477943863080");
                  self.follow = callback(value, "/follow.html?v=1477943863080");
                  self.plugins = callback(value, "/plugins");
                  self.storage = init(value);
                  header = handler(data);
                  a_part.__buildinfo = {
                    olarkfile : "/javascript/olark.js",
                    jshost : header,
                    dev : /^\s*static\.olark\.com\s*$/.test(header) ? false : true,
                    strict : "1" == instance.get("olarkst") ? true : false
                  };
                  self.P("getapplication");
                  load(data);
                }
              }
              /**
               * @param {Array} obj
               * @return {?}
               */
              function done(obj) {
                try {
                  var val;
                  var type = obj[0];
                  switch(type) {
                    case "load":
                      if (!w) {
                        /** @type {boolean} */
                        w = true;
                        finish();
                        flush();
                      }
                      break;
                    case "api.chat.connect":
                      /** @type {boolean} */
                      elIsCancel = false;
                      finish();
                      break;
                    case "api.boot.onIdentityReady":
                      return nodes.push(obj[1]), destroy(), [obj[0], function() {
                      }];
                    case "api.boot.onWindowLoad":
                      return args.push(obj[1]), flush(), [obj[0], function() {
                      }];
                    case "call":
                      switch(obj[1]) {
                        case "identify":
                          val = fn() || obj[2][0];
                          if (val) {
                            val = val.replace(/[^\-\d]/g, "");
                          }
                          if (url) {
                            if (val !== url) {
                              console.warn("cannot call olark.identify with different identities");
                            }
                          } else {
                            if (val) {
                              url = val;
                              start(url);
                            } else {
                              console.warn("cannot call olark.identify with an empty identity");
                            }
                          }
                          break;
                        case "configure":
                          var baseUrl = obj[2][0];
                          var rvar = obj[2][1];
                          init(baseUrl, rvar);
                      }
                      ;
                  }
                  return obj;
                } catch (ex) {
                  return console.warn("unable to handle early deferred call: " + ex.message), console.count("early_deferred_fail"), obj;
                }
              }
              var i;
              var element;
              var url;
              var data;
              var value;
              var header;
              /** @type {boolean} */
              var w = false;
              var defaults = {};
              /** @type {boolean} */
              var elIsCancel = false;
              /** @type {boolean} */
              var btnIsLeft = false;
              /** @type {Array} */
              var nodes = [];
              /** @type {Array} */
              var args = [];
              /** @type {boolean} */
              var names = false;
              var spineIndexByURL = {};
              self.s = {
                /**
                 * @param {string} args
                 * @return {undefined}
                 */
                push : function(args) {
                  args[0];
                  results.push(args);
                  results[results.length - 1] = done(args);
                }
              };
              /**
               * @param {?} v
               * @return {?}
               */
              self.finish = function(v) {
                self.P("assets");
                /** @type {boolean} */
                btnIsLeft = true;
                if (v) {
                  if ("string" != typeof v) {
                    defaults = v;
                    self.defaults = defaults;
                  }
                }
                var t = self.defaults && (self.defaults.system && self.defaults.system.http_traffic_blocked);
                if (t) {
                  return console.warn("Olark Chat is turned off for this website, if you own this website please contact Olark via support@olark.com", {
                    showInConsole : true
                  }), false;
                }
                var af = v.system;
                if (af) {
                  var i;
                  for (i in af) {
                    if (af.hasOwnProperty(i)) {
                      init("system." + i, af[i], true);
                    }
                  }
                }
                update(url);
                finish();
                /** @type {boolean} */
                oldName = false;
                done("api.boot.onIdentityReady", empty);
              };
              self.P("callstackstart");
              /** @type {number} */
              i = 0;
              for (;i < results.length;i++) {
                element = results[i];
                results[i] = done(element);
              }
              self.P("callstackfinish");
            })();
          }
        }
        /** @type {number} */
        var v = 6;
        /** @type {number} */
        var count = 32;
        /** @type {string} */
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var model = new Model({
          userAgent : global.navigator.userAgent,
          compatMode : d.compatMode
        });
        return function(dataAndEvents) {
          /**
           * @param {string} details
           * @return {undefined}
           */
          dataAndEvents.logHttpRequest = function(details) {
            this.__http_requests.push(details);
          };
          /**
           * @return {?}
           */
          dataAndEvents.getHttpRequests = function() {
            return this.__http_requests;
          };
        }(Create.prototype), function(processedReport) {
          /**
           * @return {?}
           */
          processedReport.getConversationId = function() {
            return olark._.conversationId || this.cookieManager.get("wcsid");
          };
          /**
           * @param {string} comment
           * @return {undefined}
           */
          processedReport.setConversationId = function(comment) {
            if (global.hbl) {
              /** @type {string} */
              hbl.wcsid = comment;
              if (hbl.client) {
                /** @type {string} */
                hbl.client.sid = comment;
                /** @type {string} */
                hbl.client.wcsid = comment;
              }
            }
            /** @type {string} */
            olark._.conversationId = comment;
            this.cookieManager.set("wcsid", comment);
          };
          /**
           * @return {undefined}
           */
          processedReport.deleteConversationId = function() {
            this.setConversationId(void 0);
            this.cookieManager.erase("wcsid");
          };
          /**
           * @return {?}
           */
          processedReport.getVisitorId = function() {
            return olark._.visitorId;
          };
          /**
           * @param {string} pdataOld
           * @return {undefined}
           */
          processedReport.setVisitorId = function(pdataOld) {
            if (global.hbl) {
              /** @type {string} */
              hbl.hblid = pdataOld;
              if (hbl.client) {
                /** @type {string} */
                hbl.client.hblid = pdataOld;
              }
            }
            /** @type {string} */
            olark._.visitorId = pdataOld;
            this.cookieManager.set("hblid", pdataOld, 63072E6);
          };
          /**
           * @return {?}
           */
          processedReport.getSiteId = function() {
            return olark._.siteId || "missing-site-id";
          };
          /**
           * @param {string} dataAndEvents
           * @return {undefined}
           */
          processedReport.setSiteId = function(dataAndEvents) {
            if (global.hbl) {
              /** @type {string} */
              hbl.siteid = dataAndEvents;
              if (hbl.client) {
                /** @type {string} */
                hbl.client.siteid = dataAndEvents;
              }
            }
            /** @type {string} */
            olark._.siteId = dataAndEvents;
          };
          /**
           * @return {undefined}
           */
          processedReport.deleteIdentityFromCookies = function() {
            this.cookieManager.erase("wcsid");
            this.cookieManager.erase("hblid");
            this.cookieManager.erase("_okbk");
          };
          /**
           * @param {?} $sanitize
           * @return {undefined}
           */
          processedReport.triggerIfIdentityIsReady = function($sanitize) {
            if (olark._.siteId) {
              if (olark._.visitorId) {
                if (olark._.conversationId) {
                  $sanitize(olark._.siteId, olark._.visitorId, olark._.conversationId);
                }
              }
            }
          };
          /**
           * @return {?}
           */
          processedReport.isNewConversation = function() {
            return olark._.isNewConversation;
          };
          /**
           * @return {?}
           */
          processedReport.isConversationIdAlive = function() {
            var uHostName = this.cookieManager.get("_oklv", true);
            if (uHostName) {
              var octalLiteral = uHostName.split(",");
              /** @type {number} */
              var clientTop = parseInt(octalLiteral[0]);
              var getConversationId = octalLiteral[1] || this.getConversationId();
              /** @type {number} */
              var top = +new Date - clientTop;
              return getConversationId === this.getConversationId() && top < olark._.maxMillisecondsConversationCanBeIdle;
            }
            return false;
          };
          /**
           * @return {undefined}
           */
          processedReport.keepConversationIdAlive = function() {
            /** @type {string} */
            var pdataOld = [(+new Date).toString(), this.getConversationId()].join(",");
            this.cookieManager.set("_oklv", pdataOld);
          };
          /**
           * @param {?} dataAndEvents
           * @return {undefined}
           */
          processedReport.watchConversationIdForExpiration = function(dataAndEvents) {
            /**
             * @return {undefined}
             */
            function t() {
              if (DRT.isConversationIdAlive()) {
                DRT.keepConversationIdAlive();
              } else {
                olark("api.chat.onReady", function() {
                  DRT.targetWindow.hbl.client.eventmgr.handle("conversation_ended", {
                    next_conversation_id : dataAndEvents
                  });
                });
              }
              setTimeout(t, backoff);
            }
            var DRT = this;
            /** @type {number} */
            var backoff = olark._.maxMillisecondsConversationCanBeIdle / 20;
            t();
          };
          /**
           * @return {?}
           */
          processedReport.getOklvValueForPopout = function() {
            return[+new Date + 864E5, this.getConversationId()].join(",");
          };
        }(Renderer.prototype), {
          /** @type {function (Object, string): undefined} */
          downloadAssetsAndApplication : init
        };
      }(window, document);
    }, {
      "../chatbox/BrowserInfo" : 14,
      "../chatbox/Env" : 15,
      "../chatbox/Logger" : 17,
      "../sandbox/PersistentStorage" : 21
    }],
    20 : [function(dataAndEvents, $) {
      $.exports = function(w, doc) {
        /**
         * @param {?} onComplete
         * @return {undefined}
         */
        function finish(onComplete) {
          if (!(w.olark && w.olark._)) {
            w.olark = w.olark || {};
            w.olark._ = w.olark._ || {};
            onComplete();
          }
        }
        /**
         * @return {undefined}
         */
        function create() {
          try {
            /** @type {NodeList} */
            var heads = doc.getElementsByTagName("head");
            var head = heads[0];
            /** @type {Element} */
            var style = doc.createElement("style");
            /** @type {string} */
            style.type = "text/css";
            style.appendChild(doc.createTextNode(""));
            if ("insertRule" in style.sheet) {
              style.sheet.insertRule(".olark-key,#hbl_code,#olark-data{display: none !important;}");
            } else {
              if ("addRule" in style.sheet) {
                style.sheet.addRule(".olark-key,#hbl_code,#olark-data", "display: none !important;");
              }
            }
            head.appendChild(style);
          } catch (o) {
            /** @type {(HTMLElement|null)} */
            var testElement = doc.getElementById("hbl_code");
            /** @type {(HTMLElement|null)} */
            var aList = doc.getElementById("olark-data");
            if (testElement) {
              /** @type {string} */
              testElement.style.display = "none";
            }
            if (aList) {
              /** @type {string} */
              aList.style.display = "none";
            }
          }
        }
        /**
         * @param {?} rows
         * @param {string} state
         * @return {undefined}
         */
        function init(rows, state) {
          /** @type {function (): undefined} */
          var self = w.olark = function() {
            self._.s.push(arguments);
          };
          self._ = {
            p : {
              0 : +new Date
            },
            /**
             * @param {string} name
             * @return {undefined}
             */
            P : function(name) {
              /** @type {number} */
              self._.p[name] = new Date - self._.p[0];
            },
            s : [],
            l : w.__olarkLoaderUrlShim || null,
            i : rows,
            f : null,
            v : state || "unknown"
          };
          /**
           * @return {undefined}
           */
          self.configure = function() {
            self("call", "configure", arguments);
          };
          /**
           * @return {undefined}
           */
          self.extend = function() {
            self("call", "extend", arguments);
          };
          /**
           * @return {undefined}
           */
          self.declare = function() {
            self("call", "declare", arguments);
          };
          /**
           * @return {undefined}
           */
          self.identify = function() {
            self("call", "identify", arguments);
          };
        }
        /**
         * @return {undefined}
         */
        function fn() {
          olark._.P("load");
          olark("load");
        }
        /**
         * @return {?}
         */
        function synchronize() {
          return w.olark ? w.olark.__k : void 0;
        }
        /**
         * @return {?}
         */
        function f() {
          /**
           * @param {Element} node
           * @param {string} selector
           * @return {?}
           */
          function add(node, selector) {
            var css = node.className || "";
            return-1 != css.indexOf(selector);
          }
          /** @type {(HTMLElement|null)} */
          var elem = doc.getElementById("olark-key");
          if (elem) {
            return elem.className;
          }
          /** @type {(HTMLElement|null)} */
          var dom = doc.getElementById("olark-data");
          if (dom && dom.childNodes) {
            /** @type {number} */
            var i = dom.childNodes.length;
            for (;i--;) {
              var seg = dom.childNodes[i];
              if (add(seg, "olark-key")) {
                return seg.id;
              }
            }
          }
          /** @type {NodeList} */
          var tokenized = doc.getElementsByTagName("a");
          /** @type {number} */
          var index = tokenized.length;
          for (;index--;) {
            var arg = tokenized[index];
            if (add(arg, "olark-key")) {
              return arg.id;
            }
          }
          return void 0;
        }
        /**
         * @return {?}
         */
        function cb() {
          /** @type {(HTMLElement|null)} */
          var elem = doc.getElementById("hbl_code");
          return elem ? elem.href.split("#")[1] : void 0;
        }
        /**
         * @return {?}
         */
        function position() {
          return/.*\.?weymouthhonda.com$/.test(doc.location.hostname) ? "3097-167-10-5275" : /.*\.?sea-shield.com$/.test(doc.location.hostname) ? "7090-381-10-7745" : void 0;
        }
        /**
         * @return {?}
         */
        function run() {
          var str = synchronize() || (cb() || (cb() || (f() || position())));
          return str ? str = toString(str) : void 0;
        }
        /**
         * @param {string} val
         * @return {?}
         */
        function toString(val) {
          return val ? (val = val.replace("olark-", "").replace("site-", "").replace(/\s/g, ""), "" != val ? val : void 0) : void 0;
        }
        /**
         * @param {?} success
         * @return {undefined}
         */
        function loadScript(success) {
          /**
           * @return {undefined}
           */
          function done() {
            if (!l) {
              /** @type {boolean} */
              l = true;
              success();
              fn();
            }
          }
          var i;
          var node;
          var value;
          var isFunction;
          var u;
          /** @type {boolean} */
          var l = false;
          /** @type {NodeList} */
          var scripts = doc.getElementsByTagName("script");
          try {
            for (i in scripts) {
              node = scripts[i];
              value = node.innerHTML;
              /** @type {boolean} */
              isFunction = /(wc\.js|olark\.js)/.test(value);
              /** @type {boolean} */
              u = !/\w+\.write\(/.test(value);
              if (isFunction) {
                if (u) {
                  setTimeout(done, 50);
                }
              }
            }
          } catch (d) {
          }
          if (w.addEventListener) {
            w.addEventListener("load", done, false);
          } else {
            w.attachEvent("onload", done);
          }
        }
        return{
          /** @type {function (): undefined} */
          cleanUpSiteIdDomElements : create,
          /** @type {function (?, string): undefined} */
          createAsyncLoadHooks : init,
          /** @type {function (?): undefined} */
          trackWindowLoad : loadScript,
          /** @type {function (): undefined} */
          performWindowLoadForAsyncLoadHooks : fn,
          /** @type {function (): ?} */
          determineSiteIdFromEmbed : run,
          /** @type {function (string): ?} */
          filterSiteId : toString,
          /** @type {function (?): undefined} */
          onFirstLoadOnly : finish
        };
      }(window, document);
    }, {}],
    21 : [function(dataAndEvents, module) {
      var documents;
      var JsDiff;
      /** @type {string} */
      documents = "OLRKPERSTO_";
      JsDiff = function() {
        /**
         * @param {Object} model
         * @return {undefined}
         */
        function View(model) {
          this._namespace = documents + model.namespace;
          this._localStorage = model.localStorage;
        }
        return View.prototype.get = function(key) {
          return this._localStorage.getItem(this._namespace + key);
        }, View.prototype.set = function(key, value) {
          return this._localStorage.setItem(this._namespace + key, value);
        }, View.prototype.remove = function(key) {
          return this._localStorage.removeItem(this._namespace + key);
        }, View.prototype.iterable = function() {
          var i;
          var len;
          var href;
          var w;
          var max;
          var data;
          w = {};
          /** @type {number} */
          i = len = 0;
          max = this._localStorage.length;
          for (;max >= 0 ? max > len : len > max;i = max >= 0 ? ++len : --len) {
            href = this._localStorage.key(i);
            data = this._localStorage.getItem(href);
            if (0 === href.indexOf(this._namespace)) {
              w[href.replace(this._namespace, "")] = data;
            }
          }
          return w;
        }, View.prototype.isLocalStorageAvailable = function() {
          return "unknown" == typeof this._localStorage || ("undefined" == typeof this._localStorage || null === this._localStorage) ? false : !this._isLocalStorageInPrivateBrowsingMode();
        }, View.prototype._isLocalStorageInPrivateBrowsingMode = function() {
          var bulk;
          var t;
          try {
            this._localStorage.setItem("testKey", "testVal");
            this._localStorage.removeItem("testKey");
          } catch (fn) {
            if (bulk = fn, null != this._localStorage) {
              return true;
            }
          }
          return false;
        }, View;
      }();
      module.exports = JsDiff;
    }, {}],
    22 : [function($filter, $) {
      var fn = $filter("../../loaders/loadhelper");
      $filter("../../loaders/loadshim");
      $.exports = function(node) {
        if (!null) {
          (+new Date).toString();
        }
        return fn.downloadAssetsAndApplication(node.parent, "loader0"), olark;
      }(window, document);
    }, {
      "../../loaders/loadhelper" : 19,
      "../../loaders/loadshim" : 20
    }],
    23 : [function(dataAndEvents, module) {
      var JsDiff;
      /** @type {string} */
      var actualObject = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      /** @type {Function} */
      JsDiff = "undefined" != typeof window && window.btoa ? window.btoa : function(obj) {
        var block;
        var charCode;
        /** @type {string} */
        var str = String(obj);
        /** @type {number} */
        var i = 0;
        /** @type {string} */
        var object = actualObject;
        /** @type {string} */
        var optsData = "";
        for (;str.charAt(0 | i) || (object = "=", i % 1);optsData += object.charAt(63 & block >> 8 - i % 1 * 8)) {
          if (charCode = str.charCodeAt(i += 0.75), charCode > 255) {
            throw new Error("'b64' failed: The string to be encoded contains characters outside of the Latin1 range.");
          }
          /** @type {number} */
          block = block << 8 | charCode;
        }
      };
      /** @type {Function} */
      module.exports = JsDiff;
    }, {}],
    24 : [function(factory, module) {
      var button;
      var get;
      var ajax;
      var init;
      button = factory("./olark-b64-polyfill");
      /**
       * @param {?} data
       * @param {string} elem
       * @return {?}
       */
      get = function(data, elem) {
        var ArrayBuffer;
        var bulk;
        var o;
        ArrayBuffer = window.File || function() {
          };
        try {
          if (data instanceof ArrayBuffer) {
            return data;
          }
          if ("string" == typeof data) {
            return new Blob([data], {
              type : elem || "text/plain"
            });
          }
          if ("object" == typeof data) {
            return new Blob([JSON.stringify(data)], {
              type : elem || "application/json"
            });
          }
          throw new Error("OlarkS3Signer: Provided data is not of a recognizable type.");
        } catch (fn) {
          throw bulk = fn, new Error("OlarkS3Signer: Provided data could not be converted to a Blob.");
        }
      };
      /**
       * @param {Object} options
       * @return {?}
       */
      ajax = function(options) {
        var req;
        return "undefined" != typeof XMLHttpRequest && null !== XMLHttpRequest ? (req = new XMLHttpRequest, req.open("POST", options.url, true), req.send(options.data), req.onreadystatechange = function() {
          return 4 === req.readyState ? req.status >= 200 && req.status <= 299 ? null != options.onSuccess && options.onSuccess(req.responseText, req) : null != options.onError && options.onError(req) : void 0;
        }) : void 0;
      };
      /**
       * @param {Object} options
       * @param {string} tag
       * @param {?} data
       * @param {string} timestamp
       * @return {?}
       */
      init = function(options, tag, data, timestamp) {
        var file;
        var fd;
        return fd = new FormData, file = get(data, timestamp), fd.append("key", (options.folder || "") + "/" + tag), fd.append("Content-Type", file.type), fd.append("AWSAccessKeyId", options.accessKey), fd.append("policy", button(JSON.stringify(options.policy))), fd.append("signature", options.signature), fd.append("file", file), {
          /**
           * @param {Function} successCallback
           * @param {Function} opt_noCache
           * @return {?}
           */
          send : function(successCallback, opt_noCache) {
            return ajax({
              url : "https://" + options.bucket + ".s3.amazonaws.com",
              data : fd,
              /** @type {Function} */
              onSuccess : successCallback,
              /** @type {Function} */
              onError : opt_noCache
            });
          }
        };
      };
      /** @type {function (Object, string, ?, string): ?} */
      module.exports = init;
    }, {
      "./olark-b64-polyfill" : 23
    }]
  }, {}, [22]);
}).call(this);
