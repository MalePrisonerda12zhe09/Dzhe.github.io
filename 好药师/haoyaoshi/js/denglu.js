webpackJsonp([9], {

/***/ 0:
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function ($) {
                'use strict';

                __webpack_require__(231);
                var _http = __webpack_require__(53);
                var _login = __webpack_require__(62);
                var _loginContent = __webpack_require__(63);
                var _loginhtml = __webpack_require__(74);
                var Index = {
                    init: function () {
                        var Tpl = _http.renderHtml(_loginhtml);
                        this.loginContent();
                        ehyTrack.track('�����¼ҳ', {});
                    },
                    loginContent: function () {
                        var loginContent = new _loginContent();
                        var html = loginContent.render();

                        $("#loginContent").append(html);

                        loginContent.init();
                    }
                };

                $(function () {
                    Index.init();
                });
                /* WEBPACK VAR INJECTION */
            }.call(exports, __webpack_require__(2)))

            /***/
        }),

/***/ 231:
/***/ (function (module, exports) {

            // removed by extract-text-webpack-plugin

            /***/
        })

});