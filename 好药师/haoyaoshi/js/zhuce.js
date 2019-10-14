webpackJsonp([22], {

/***/ 0:
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function ($) {
                'use strict';

                __webpack_require__(362);
                var _http = __webpack_require__(53);
                var _login = __webpack_require__(62);

                var Index = {
                    init: function (fn) {
                        this.flag = true;
                        this.time = 59;
                        this.timeStamp;
                        this.bindEvent(fn);
                        this.refreshCodePic();
                        ehyTrack.track('进入注册页', {});
                    },

                    bindEvent: function (fn) {
                        var _this = this;
                        var $phone = $('#telphone');
                        var $code = $('#noteCode');
                        var $codePic = $('#authCode');
                        var $password = $('#password');
                        var $passwordc = $('#passwordconfirm');
                        var $agree = $('#agreeInfo');
                        var $btn = $('.btn-register');

                        $('.authCodeBox').on('click', function () {
                            _this.refreshCodePic();
                        });
                        //清空手机号
                        $('.clear-btn').on('click', function () {
                            $('#telphone').val('');
                        });
                        // 显示/隐藏密码
                        $('.btn-eye').on('click', function () {
                            if ($(this).hasClass('off')) {
                                $(this).removeClass('off');
                                $(this).siblings('input').attr("type", 'password');
                            } else {
                                $(this).addClass('off');
                                $(this).siblings('input').attr("type", 'text');
                            }
                        });
                        // 获取验证码
                        $('.noteCodeBox').on('click', function () {
                            ehyTrack.track('点击发送验证码_注册', {});
                            if (!_this.validateMobile($phone.val())) return;
                            if (!_this.validateCodePic($codePic.val())) return;
                            if (!_this.flag) return;
                            _this.flag = false;
                            _login.sendWithVerifyCode({
                                mobile: $phone.val(),
                                type: '1',
                                timestamp: _this.timeStamp,
                                verifyCode: $codePic.val()
                            },
                                function (res) {
                                    _this.countDown();
                                },
                                function (msg) {
                                    _this.flag = true;
                                    _this.refreshCodePic();
                                    alertBox('body', msg);
                                }
                            );
                        });
                        $btn.on('click', function () {
                            ehyTrack.track('点击注册', {});
                            if (!_this.validateMobile($phone.val()) || !_this.validateCode($code.val()) || !_this.validateAgree($agree.is(':checked')) || !_this.validatePassword($password.val()) || !_this.validatePasswordconfirm($password.val(), $passwordc.val())) return;
                            _login.register({
                                mobile: $phone.val(),
                                mobileCode: $code.val(),
                                password: $password.val()
                            },
                                function (res) {
                                    if (res && res.data) {
                                        ehyTrack.track('注册成功', {});
                                        var sid = res.data.sid,
                                            aId = res.data.userId,
                                            username = res.data.username,
                                            mobile = res.data.mobile,
                                            name = res.data.name;

                                        var age = res.data.age,
                                            balance = res.data.balance,
                                            points = res.data.points,
                                            coupons = res.data.coupons,
                                            sex = res.data.sex;
                                        // _http.setCookie('sid', sid, '0.25', location.hostname);
                                        _http.setCookie('accountId', aId, '0.25', location.hostname);
                                        _http.setCookie('uid', aId, '0.25');
                                        _http.setCookie('username', username, '0.25', location.hostname);
                                        _http.setCookie('name', name, '0.25', location.hostname);
                                        _http.setCookie('mobile', mobile, '0.25', location.hostname);
                                        // 埋点用数据
                                        _http.setCookie('age', age, '0.25', location.hostname);
                                        _http.setCookie('balance', balance, '0.25', location.hostname);
                                        _http.setCookie('points', points, '0.25', location.hostname);
                                        _http.setCookie('coupons', coupons, '0.25', location.hostname);
                                        _http.setCookie('sex', sex, '0.25', location.hostname);
                                        // 埋点
                                        ehyTrack.identify(aId, {
                                            '会员积分': points,
                                            '性别': sex == 1 ? '女' : '男',
                                            '年龄': age,
                                            '手机号': mobile,
                                            '帐号余额': balance,
                                            '优惠券数量': coupons
                                        });
                                        if (fn) {
                                            fn && fn();
                                        } else {
                                            _this.redirect();
                                        }
                                        loadLogin();
                                    }

                                },
                                function (errorMsg) {
                                    // 埋点
                                    ehyTrack.track('注册失败', {
                                        '失败原因': errorMsg
                                    });
                                    $('.item-tips-code').html(errorMsg);
                                }
                            );
                        });

                        $('#telphone').on('change', function () {
                            _this.validateMobile($(this).val());
                        });
                        $('#noteCode').on('change', function () {
                            _this.validateCode($(this).val());
                        });

                        //登录
                        $('.btn_login').on('click', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.href = _http.host + '/login.html';
                        });
                        $('.logo').off("click").on('click', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.href = _http.host;
                        });
                    },

                    refreshCodePic: function () {
                        this.timeStamp = new Date() * 1;
                        $('.authCodeBox img')[0].src = _http.getapiServerUrl('/mobile/account/getVerifyCode.json?timestamp=' + this.timeStamp);
                    },

                    validateMobile: function (mobile) {
                        var $tipsPhone = $('.item-tips-phone');
                        if (_http.validate(mobile, 'phone')) {
                            $tipsPhone.html('');
                            return true;
                        } else {
                            $tipsPhone.html('请输入正确的手机号');
                            return false;
                        }
                    },

                    validateCode: function (code) {
                        var $tipsCode = $('.item-tips-code');
                        if (_http.validate(code, 'require')) {
                            $tipsCode.html('');
                            return true;
                        } else {
                            $tipsCode.html('请输入验证码');
                            return false;
                        }
                    },

                    validateCodePic: function (code) {
                        var $tipsCode = $('.item-tips-code-pic');
                        if (_http.validate(code, 'require')) {
                            $tipsCode.html('');
                            return true;
                        } else {
                            $tipsCode.html('请输入验证码');
                            return false;
                        }
                    },

                    validateAgree: function (chk) {
                        var $tipsAgree = $('.item-tips-agree');
                        if (chk) {
                            $tipsAgree.html('');
                            return true;
                        } else {
                            $tipsAgree.html('您未同意注册协议');
                            return false;
                        }
                    },
                    validatePassword: function (password) {
                        var $tipsCode = $('.item-tips-password');
                        if (password == '') {
                            $tipsCode.html('请设置密码');
                            return false;
                        } else if (password.length < 6 || password.length > 20) {
                            $tipsCode.html('密码位数请限制在6~20位');
                            return false;
                        } else if (_http.validate(password, 'pwdReg')) {
                            $tipsCode.html('');
                            return true;
                        } else {
                            $tipsCode.html('密码中含特殊字符，请重新输入');
                            return false;
                        }
                    },
                    validatePasswordconfirm: function (password, passwordc) {
                        var $tipsCode = $('.item-tips-password');
                        if (password == passwordc) {
                            $tipsCode.html('');
                            return true;
                        } else {
                            $tipsCode.html('两次密码不一致，请重新输入');
                            return false;
                        }
                    },
                    formatQuery: function () {
                        var queryString = location.search.slice(1);
                        var query = {};
                        if (!queryString) return '';

                        $.each(queryString.split('&'), function (k, v) {
                            query[v.split('=')[0]] = decodeURIComponent(v.split('=')[1]);
                        });
                        return query;
                    },
                    redirect: function () {
                        var query = this.formatQuery();
                        if (query.redirect) {
                            window.location.href = query.redirect;
                        } else {
                            _http.goHome();
                        }
                    },
                    countDown: function () {
                        var _this = this;
                        var $el = $('.noteCodeBox');
                        var timer = setInterval(function () {
                            if (--_this.time <= 0) {
                                clearInterval(timer);
                                _this.flag = true;
                                _this.time = 59;
                                $el.html('获取验证码');
                                _this.refreshCodePic();
                            } else {
                                $el.html('<span style="color:#ccc;">' + _this.time + 's</span>');
                            }
                        }, 1000);
                    }
                };

                $(function () {
                    Index.init();
                });
                /* WEBPACK VAR INJECTION */
            }.call(exports, __webpack_require__(2)))

            /***/
        }),

/***/ 362:
/***/ (function (module, exports) {

            // removed by extract-text-webpack-plugin

            /***/
        })

});