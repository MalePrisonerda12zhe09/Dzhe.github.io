webpackJsonp([0], [
/* 0 */
/***/ (function (module, exports, __webpack_require__) {

        module.exports = __webpack_require__(1);


        /***/
}),
/* 1 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function ($) {
            'use strict';

            __webpack_require__(5);
            __webpack_require__(10);
            __webpack_require__(30);
            __webpack_require__(38);
            __webpack_require__(87);
            __webpack_require__(88);
            __webpack_require__(89);

            var _http = __webpack_require__(53);
            var _address = __webpack_require__(102);
            var Position = __webpack_require__(103);
            var OrderBuffers = __webpack_require__(108);
            var _cartService = __webpack_require__(61);
            var _Userservice = __webpack_require__(62);
            var _productservice = __webpack_require__(123);
            var _couponService = __webpack_require__(135);

            var areaJson = [];

            var page = {
                data: {
                    flag: true
                },
                init: function () {
                    this.global();
                    this.alertBoxes();
                    this.bindEvent();
                    this.addToConsultation();
                    this.publicFunction();
                    this.maiTracker();
                },
                bindEvent: function () {
                    var _this = this;
                    _http.setCookie('coonType', '3', '30', location.hostname);
                    if (_http.getCookie('positionAddress')) {
                        $('.topPosition span').html(_http.getCookie('positionCity') + _http.getCookie('positionAddress'));
                    }

                    $('body').on('click', '.topPosition', function () {
                        _this.address();
                    });

                    $('head').append('<link rel="icon" type="image/x-icon" href="http://design.ehaoyao.com/new_site/static/images/favicon.ico">');
                    window.onresize = function () {
                        var dw = document.documentElement.clientWidth,
                            dh = document.documentElement.clientHeight,
                            w = $(".zoomIn").width(),
                            h = $(".zoomIn").height(),
                            ctop;
                        if (dh - h > 0) {
                            ctop = Math.abs((dh - h) / 2) + document.documentElement.scrollTop + document.body.scrollTop;
                        } else {
                            ctop = document.documentElement.scrollTop + document.body.scrollTop + 10;
                        }

                        $(".zoomIn").css({ "left": dw / 2 - w / 2, "top": ctop, "position": "absolute" });
                    }

                    if (window.location.href.indexOf('search') > 0) {
                        var str = window.location.href,
                            index = str.indexOf("search") + 7;
                        if (str.indexOf('?') > 0) {
                            str = str.substring(index, str.indexOf('?'));
                        } else {
                            str = str.substring(index, str.length);
                        }

                        var searchName = decodeURIComponent($.Request('searchGoodsBrief'));
                        if (searchName != "null") {
                            $('#top_search_input').val(searchName);
                        } else {
                            $('#top_search_input').val(decodeURIComponent(str));
                        }
                    }

                    //地址滚动
                    // _this.scrollImgLeft();
                    window.scrollImgLeft = _this.scrollImgLeft;

                    //优惠券领取测试
                    // $('#couponTest').on('click', 'span', function(e){
                    //        e.preventDefault();
                    //        var t = $(this),
                    //            couponId = t.attr('couponId');
                    //            getCouponById(couponId, t);
                    //    });

                    //领取优惠券
                    window.getCouponById = function (id, t) {
                        if (isLogin()) {
                            if (t.hasClass('hasGet')) {
                                alertBox('body', '您已领取过哦');
                                return false;
                            }
                            if (t.hasClass('disabled')) {
                                return false;
                            }
                            t.addClass('disabled');
                            _couponService.getCoupons({
                                couponId: id
                            }, function (res) {
                                t.removeClass('disabled');
                                if (res.status == 0) {
                                    t.addClass('hasGet');
                                    var cont = '<div class="lsuccess">' +
                                        '<h3>领取成功!感谢您的参与,祝您购物愉快~</h3>' +
                                        '<p>恭喜您获得优惠券 ,优惠劵已经发送到您的账户,请查收。</p>' +
                                        ' <div class="cart-btns">' +
                                        '    <div class="btn_gray btn_cancel" href="javascript:void(0)">立即使用</div>' +
                                        '    <div class="btn_red btn_ok" href="javascript:void(0)">查看更多优惠</div>' +
                                        '   </div>' +
                                        '</div>';
                                    new ehaoyao.tips({
                                        position: "center",
                                        id: "dialogBox_address",
                                        style: "dialogBox_address",
                                        hasTitle: true,
                                        title: "提示",
                                        content: cont,
                                        callback: function (fn) {
                                            $('.btn_cancel').on('click', function () {
                                                var type = res.use_goods_type
                                                _this.giveCoupon(type, id);
                                                fn();
                                            })

                                            $('.btn_ok').on('click', function () {
                                                fn();
                                                var url = _http.host + '/receiveCoupon.html'
                                                window.open(url);
                                            });
                                        }
                                    });
                                }
                            }, function (errMsg) {
                                t.removeClass('disabled');
                                _http.errorTips(errMsg);
                            });
                        } else {
                            _http.setCookie('jump_url', location.href);
                            showLogin('p');
                        }
                    }
                },
                giveCoupon: function (coupontype, couponid) {
                    if (coupontype == 0) {
                        window.open(_http.host);
                    } else if (coupontype == 1) {
                        var url = _http.host + '/getGoodsPmtList.html?couponId=' + couponid;
                        window.open(url);
                    }
                },
                scrollImgLeft: function () {
                    if (!$('#scroll_div').length) {
                        return false;
                    }
                    var speed = 100,
                        scroll_begin = $('#scroll_begin'),
                        scroll_div = $('#scroll_div'),
                        content_w = scroll_begin.outerWidth(),
                        scroll_w = scroll_div.outerWidth(),
                        MyMar = null;
                    if (content_w > scroll_w) {
                        $('#scroll_end').show();
                        var Marquee = function () {
                            var s = scroll_div.scrollLeft();
                            if (content_w - s <= 0)
                                s = 0;
                            else {
                                s++;
                            }
                            scroll_div.scrollLeft(s);
                        };
                        MyMar = setInterval(Marquee, speed);

                        scroll_div.hover(function () {
                            clearInterval(MyMar);
                        }, function () {
                            MyMar = setInterval(Marquee, speed);
                        });
                    } else {
                        $('#scroll_end').hide();
                        scroll_div.scrollLeft(0);
                    }
                },
                address: function () {
                    var _t = this;
                    var cont = _setDialogCont('address') || '';
                    new ehaoyao.tips({
                        position: "center",
                        id: "dialogBox_address",
                        style: "dialogBox_address",
                        hasTitle: true,
                        title: "",
                        content: cont,
                        callback: function (fn) {
                            var positon = new Position(function () {
                                // _t.scrollImgLeft();
                            });
                            $('#position_address').on('click', '.confirmbtn', function () {
                                $('#dialogBox_address').remove();
                                $('.hy-dialogShade').hide();
                                if (window.location.href.indexOf('product') > 0 || window.location.href.indexOf('search') > 0 || window.location.href.indexOf('getPharmacyById') > 0) {
                                    window.location.reload();
                                }
                            });
                            positon.adderssBox();
                        }
                    });
                },
                global: function () {
                    window._setDialogCont = function (type, result) {
                        var html = "";
                        if (type == "address") {
                            html = '<div class="ehyBody" id="position_address">' +
                                '   <p class="title">为了您能享受到好药师快速送药服务， 请输入您的<em>位置</em>。</p>' +
                                '   <div id="adderssBox"></div>' +
                                '<div class="confirmbtn">确定</div>' +
                                '</div>';
                        } else if (type == "needRegister") {

                        }
                        return html;
                    }
                },

                publicFunction: function () {
                    var _this = this;
                    //商品数量增减
                    window.operateCount = function (obj, callback) {
                        if ($(obj).find('input').val() >= 999) {
                            $(obj).find('.js-plus').addClass("disabled");
                        }
                        $(obj).find('input').on("keyup", function (e) {
                            var count = $(this).val(),
                                patt = /^[1-9]\d*$/;
                            if (e.which == "8" && count == "") {
                                return;
                            }
                            if (patt.test(count)) {
                                if (parseInt($(this).val()) === 1) {
                                    $(this).siblings('.js-minus').addClass('disabled');
                                } else {
                                    $(this).siblings('.js-minus').removeClass('disabled');
                                };
                                if (parseInt($(this).val()) >= 999) {
                                    $(this).siblings('.js-plus').addClass('disabled');
                                } else {
                                    $(this).siblings('.js-plus').removeClass('disabled');
                                };
                            } else {
                                $(this).val(1);
                                $(this).siblings('.js-minus').addClass('disabled');
                            };
                        }).on("blur", function () {
                            if (_http.isEmptyObject($(this).val())) {
                                $(this).val(1);
                                $(this).siblings('.js-minus').addClass('disabled');
                            }

                            callback && callback($(this).val(), $(this));
                        });

                        $(obj).find('.js-minus').off('click').on('click', function () {
                            var input = $(this).siblings('input'),
                                count = parseInt(input.val()),
                                check = $(this).hasClass('disabled');
                            if (check) {
                                return;
                            }
                            if (count === 999) {
                                $(this).siblings('.js-plus').removeClass('disabled');
                            }

                            if (count === 1) {
                                $(this).addClass('disabled');
                                return;
                            }
                            input.val(count - 1);
                            if (parseInt(input.val()) == 1) {
                                $(this).addClass('disabled');
                            }
                            callback && callback(input.val(), $(this));
                        });
                        $(obj).find('.js-plus').off('click').on('click', function () {
                            var input = $(this).siblings('input'),
                                count = parseInt(input.val()),
                                check = $(this).hasClass('disabled');
                            if (check) {
                                return;
                            }
                            if (count == 1) {
                                $(this).siblings('.js-minus').removeClass('disabled');
                            }
                            input.val(count + 1);
                            if (parseInt(input.val()) >= 999) {
                                $(this).addClass('disabled');
                            }
                            callback && callback(input.val(), $(this));
                        });
                    },
                        //需求登记
                        window.orderBuffers = function (productParam) {
                            var orderBuffers = new OrderBuffers();

                            var cont = orderBuffers.render();

                            new ehaoyao.tips({
                                position: "center",
                                id: "dialogBox_needRegister",
                                style: "dialogBox_needRegister",
                                hasTitle: true,
                                title: productParam.pharmacyName + " - 需求登记",
                                content: cont,
                                callback: function (fn) {
                                    orderBuffers.init(fn, productParam);
                                }
                            });

                        },
                        // 添加到购物车
                        window.addShoppingCart = function (pharmacyId, itemQuantity, itemId, isTips, fn) {
                            if (!_this.data.flag) return;
                            _this.data.flag = false;
                            var listPharmacy = [{
                                "pharmacyId": pharmacyId,
                                "listCart": [{
                                    "itemQuantity": itemQuantity,
                                    "itemId": itemId
                                }]
                            }];
                            var dataCart = {
                                "listPharmacy": listPharmacy
                            };
                            _cartService.addToCart(dataCart, function (res) {
                                _this.data.flag = true;
                                if (res.msg && res.msg.indexOf('活动') > -1) {
                                    alertBox('body', res.msg);
                                    return;
                                }
                                var cont = '<div class="addcartTip new-addtip">' +
                                    '<p class="tipcion">该商品成功加入购物车</p>' +
                                    '</div>' +
                                    '<div class="btnleft new-btnleft"><div class="to_buy">继续购物</div><a href="javascript:void(0)" class="go_buy go_pay">去结算</a></div>';

                                if (isTips == 1) {
                                    window.location.href = "shoppingCart.html";
                                } else {
                                    if (isTips == 2) {
                                        _http.setCookie('cartType', 1, '30', location.hostname);
                                        cont = '<div class="addcartTip new-addtip">' +
                                            '<p class="tipcion">该商品添加成功</p>' +
                                            '</div>' +
                                            '<div class="btnleft new-btnleft"><div class="to_buy">继续购物</div><a href="javascript:void(0)" class="go_buy go_pay">需求清单</a></div>';
                                    }
                                    new ehaoyao.tips({
                                        position: "center",
                                        id: "dialogBox_address",
                                        style: "dialogBox_address",
                                        hasTitle: true,
                                        title: "提示",
                                        content: cont,
                                        callback: function (fn) {
                                            $('.to_buy').on('click', function () {
                                                fn();
                                            });
                                            $('.go_pay').on('click', function (e) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                window.open(_http.host + '/shoppingCart.html');
                                                fn();
                                            })
                                        }
                                    });
                                }
                                ShoppingCartSum();
                                // loadShoppingCart();
                                fn && typeof fn == 'function' && fn(res);
                            }, function (errMsg) {
                                ehyTrack.track('添加商品失败', {
                                    '失败原因': errMsg
                                })
                                _this.data.flag = true;
                                if (errMsg.indexOf('最大容量') > -1) {
                                    var cont = '<div class="addcartTip err-tip">' +
                                        '<p class="tipcion">' + errMsg + '</p>' +
                                        '</div>' +
                                        '<div class="btn-center"><div class="confirm">确认</div></div>';
                                    new ehaoyao.tips({
                                        position: "center",
                                        id: "dialogBox_address",
                                        style: "dialogBox_address",
                                        hasTitle: true,
                                        title: "添加失败",
                                        content: cont,
                                        callback: function (fn) {
                                            $('.confirm').on('click', function () {
                                                fn();
                                            });
                                        }
                                    });
                                } else {
                                    alertBox('body', errMsg);

                                }

                            });
                        }
                },
                //统一提示信息框addToCart
                alertBoxes: function () {
                    window.alertBox = function (obj, cont, time) {
                        var alert_pop = new ehaoyao.tips({
                            id: "hy-dialogInfo-alert",
                            style: "hy-dialogInfo-alert",
                            target: obj,
                            hasCloseBtn: false,
                            hasMask: false,
                            destroy: true,
                            content: '<span class="text">' + cont + "</span>",
                            position: "center",
                            correction: {
                                top: -14,
                                left: -12
                            },
                            width: 200,
                            time: time,
                            disappear: true,
                            callback: function (fn) {
                                var _t = $("#hy-dialogInfo-alert");
                                _t.css("width", _t.find(".text")[0].offsetWidth + 30);
                            }
                        });
                    }
                },
                //药师咨询
                addToConsultation: function () {
                    //if(window.location.href.indexOf('login')<0 && window.location.href.indexOf('message')<0 && window.location.href.indexOf('register')<0 && window.location.href.indexOf('pay.json')<0){
                    if (typeof (ysf) != 'undefined') {
                        window.ysf_data = {};
                        //七鱼访问数据测试
                        window.ysf_addInfo = function (data) {
                            $.ajax({
                                type: "get",
                                url: "http://qiyu.qumaiyao.com/addUserinfo",
                                //url : "http://10.7.1.80:31001/addUserinfo",
                                dataType: "json",
                                data: data,
                                success: function (res) {

                                }
                            });
                        }

                        var consultation = function () {
                            var name = _http.getCookie("username");
                            var sid = _http.getCookie('accountId');
                            var mobile = _http.getCookie('autoUsername');
                            ysf.logoff();
                            var timestamp = Date.parse(new Date());
                            var random = Math.floor(Math.random() * 1000 + 1);
                            var uid = ''; //"BF_"+timestamp+random;
                            if (window.login_state = true && sid != "") {
                                uid = sid;
                            }
                            ysf_data = {
                                uid: uid,
                                name: name,
                                mobile: mobile,
                                url: _http.host
                                /*groupid:503980*/
                            };
                            ysf.config(ysf_data);
                        }
                        //七鱼参数配置
                        consultation();
                        //商品列表页
                        $(document).on('click', '.btn_car_zx', function (e) {
                            var _this = $(this);
                            ysf.product({
                                show: 0, // 1为打开， 其他参数为隐藏（包括非零元素）
                                title: _this.siblings('.black').text(),
                                desc: '',
                                picture: _this.siblings('.imgHeight').children('img').attr('src'),
                                note: _this.siblings('.price').children('.now_price').text(),
                                url: _http.host + "/product-" + _this.find('li').attr('data-productid') + ".html"
                            });

                            ysf.open();
                            // ysf_addInfo(ysf_data);
                        });
                        //商品详情页主商品咨询药师
                        $(document).on('click', '.pdInfo .addConsultation', function (e) {
                            var _this = $(this);
                            var _obj = _this.parents('.infoDetails').children('h1');
                            // 埋点
                            var price = '';
                            if ($('.details .price em').length > 0) {
                                price = $('.details .price em').text();
                            }
                            var text = $(this).attr('marketable') ? '点击咨询药师_商品详情页下架' : '点击咨询药师';
                            ehyTrack.track(text, {
                                '药品名称': $('.infoDetails h1').text(),
                                '药品品牌': $('.hnumber').data('brand') || '',
                                '药品金额': price,
                                '药品三级分类': $('.detailTitle').data('catnamethree'),
                                '药品二级分类': $('.detailTitle').data('catnametwo'),
                                '药品一级分类': $('.detailTitle').data('catnameone'),
                                '套餐ID': $('.infoDetails h1').data('groupid'),
                                '商品ID': $('.infoDetails h1').attr('id'),
                                '药品标识': $('.infoDetails h1').data('isprescribed') == 1 ? '处方' : '其他',
                                'SKU': $('.hnumber').data('bn')
                            });
                            ysf.product({
                                show: 0, // 1为打开， 其他参数为隐藏（包括非零元素）
                                title: _obj.text(),
                                desc: '',
                                picture: $('#jqzoom').attr('href'),
                                note: _obj.attr('data-price'),
                                url: _http.host + "/product-" + _obj.attr('data-groupid') + ".html?pharmacyId=" + _obj.attr('data-pharmacyid')
                            });
                            ysf.open();

                        });
                        //商品详情页本月推荐咨询药师
                        $(document).on('click', '.month_recommend .addConsultation', function (e) {
                            var actlist = $(this).parents('li');
                            var pricebox = actlist.find('span').text(),
                                ptoTitle = actlist.find('p').text(),
                                pharmacyId = actlist.attr('data-pharmacyid'),
                                productId = actlist.attr('data-productid')
                            accountId = data.accountId,
                                price = pricebox.substring(1, pricebox.length),
                                productTitle = ptoTitle.slice(0, ptoTitle.indexOf('<em>'));
                            ysf.product({
                                show: 0, // 1为打开， 其他参数为隐藏（包括非零元素）
                                title: productTitle,
                                desc: '',
                                picture: actlist.find('img').attr('href'),
                                note: price,
                                url: _http.host + "/product-" + productId + ".html?pharmacyId=" + pharmacyId
                            });
                            ysf.open();
                            // ysf_addInfo(ysf_data);
                        });

                        window.Showconsultation = function (flag) {
                            ysf.open();
                            // ysf_addInfo(ysf_data);
                        }
                    }

                },

                //埋点公共方法
                maiTracker: function () {
                    window.zhuge = window.zhuge || [];
                    window.zhuge.methods = "_init identify track getDid getSid getKey setSuperProperty setUserProperties setWxProperties setPlatform".split(" ");
                    window.zhuge.factory = function (b) {
                        return function () {
                            var a = Array.prototype.slice.call(arguments);
                            a.unshift(b);
                            window.zhuge.push(a);
                            return window.zhuge;
                        }
                    };
                    for (var i = 0; i < window.zhuge.methods.length; i++) {
                        var key = window.zhuge.methods[i];
                        window.zhuge[key] = window.zhuge.factory(key);
                    }
                    window.zhuge.load = function (b, x) {
                        if (!document.getElementById("zhuge-js")) {
                            var a = document.createElement("script");
                            var verDate = new Date();
                            var verStr = verDate.getFullYear().toString() + verDate.getMonth().toString() + verDate.getDate().toString();

                            a.type = "text/javascript";
                            a.id = "zhuge-js";
                            a.async = !0;
                            a.src = 'https://zgsdk.zhugeio.com/zhuge.min.js?v=' + verStr;
                            a.onerror = function () {
                                window.zhuge.identify = window.zhuge.track = function (ename, props, callback) {
                                    if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
                                        callback();
                                    } else if (Object.prototype.toString.call(props) === '[object Function]') {
                                        props();
                                    }
                                };
                            };
                            var c = document.getElementsByTagName("script")[0];
                            c.parentNode.insertBefore(a, c);
                            window.zhuge._init(b, x)
                        }
                    };
                    window.zhuge.load('823f347e281d47879c62f033ec3707cd', {
                        superProperty: { //全局的事件属性(选填)               
                            '站点来源': 'PC'
                        },
                        debug: true,
                        visualizer: false, //可视化埋点开关
                        adTrack: false, //广告监测开关,默认为false  
                        zgsee: false, //视屏采集开关, 默认为false
                        autoTrack: false, //启用全埋点采集（选填，默认false）            
                        singlePage: false //是否是单页面应用（SPA），启用autoTrack后生效（选填，默认false）  
                    });
                    window.ehyTrack = {
                        identify: function () {
                            if (window.zhuge && window.zhuge.identify) {
                                window.zhuge.identify.apply(window.zhuge, arguments);
                            }
                        },
                        track: function () {
                            if (window.zhuge && window.zhuge.track) {
                                window.zhuge.track.apply(window.zhuge, arguments);
                            }
                        }
                    }
                }
            }

            $(function () {
                page.init();

            })
            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

        /***/
}),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function (module, exports) {

        // removed by extract-text-webpack-plugin

        /***/
}),
/* 6 */,
/* 7 */
/***/ (function (module, exports) {

        /*
            MIT License http://www.opensource.org/licenses/mit-license.php
            Author Tobias Koppers @sokra
        */
        // css base code, injected by the css-loader
        module.exports = function (useSourceMap) {
            var list = [];

            // return the list of modules as css string
            list.toString = function toString() {
                return this.map(function (item) {
                    var content = cssWithMappingToString(item, useSourceMap);
                    if (item[2]) {
                        return "@media " + item[2] + "{" + content + "}";
                    } else {
                        return content;
                    }
                }).join("");
            };

            // import a list of modules into the list
            list.i = function (modules, mediaQuery) {
                if (typeof modules === "string")
                    modules = [[null, modules, ""]];
                var alreadyImportedModules = {};
                for (var i = 0; i < this.length; i++) {
                    var id = this[i][0];
                    if (typeof id === "number")
                        alreadyImportedModules[id] = true;
                }
                for (i = 0; i < modules.length; i++) {
                    var item = modules[i];
                    // skip already imported module
                    // this implementation is not 100% perfect for weird media query combinations
                    //  when a module is imported multiple times with different media queries.
                    //  I hope this will never occur (Hey this way we have smaller bundles)
                    if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
                        if (mediaQuery && !item[2]) {
                            item[2] = mediaQuery;
                        } else if (mediaQuery) {
                            item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
                        }
                        list.push(item);
                    }
                }
            };
            return list;
        };

        function cssWithMappingToString(item, useSourceMap) {
            var content = item[1] || '';
            var cssMapping = item[3];
            if (!cssMapping) {
                return content;
            }

            if (useSourceMap && typeof btoa === 'function') {
                var sourceMapping = toComment(cssMapping);
                var sourceURLs = cssMapping.sources.map(function (source) {
                    return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
                });

                return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
            }

            return [content].join('\n');
        }

        // Adapted from convert-source-map (MIT)
        function toComment(sourceMap) {
            // eslint-disable-next-line no-undef
            var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
            var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

            return '/*# ' + data + ' */';
        }


        /***/
}),
/* 8 */
/***/ (function (module, exports, __webpack_require__) {

        /*
            MIT License http://www.opensource.org/licenses/mit-license.php
            Author Tobias Koppers @sokra
        */
        var stylesInDom = {},
            memoize = function (fn) {
                var memo;
                return function () {
                    if (typeof memo === "undefined") memo = fn.apply(this, arguments);
                    return memo;
                };
            },
            isOldIE = memoize(function () {
                // Test for IE <= 9 as proposed by Browserhacks
                // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
                // Tests for existence of standard globals is to allow style-loader 
                // to operate correctly into non-standard environments
                // @see https://github.com/webpack-contrib/style-loader/issues/177
                return window && document && document.all && !window.atob;
            }),
            getElement = (function (fn) {
                var memo = {};
                return function (selector) {
                    if (typeof memo[selector] === "undefined") {
                        memo[selector] = fn.call(this, selector);
                    }
                    return memo[selector]
                };
            })(function (styleTarget) {
                return document.querySelector(styleTarget)
            }),
            singletonElement = null,
            singletonCounter = 0,
            styleElementsInsertedAtTop = [],
            fixUrls = __webpack_require__(9);

        module.exports = function (list, options) {
            if (false) {
                if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
            }

            options = options || {};
            options.attrs = typeof options.attrs === "object" ? options.attrs : {};

            // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
            // tags it will allow on a page
            if (typeof options.singleton === "undefined") options.singleton = isOldIE();

            // By default, add <style> tags to the <head> element
            if (typeof options.insertInto === "undefined") options.insertInto = "head";

            // By default, add <style> tags to the bottom of the target
            if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

            var styles = listToStyles(list, options);
            addStylesToDom(styles, options);

            return function update(newList) {
                var mayRemove = [];
                for (var i = 0; i < styles.length; i++) {
                    var item = styles[i];
                    var domStyle = stylesInDom[item.id];
                    domStyle.refs--;
                    mayRemove.push(domStyle);
                }
                if (newList) {
                    var newStyles = listToStyles(newList, options);
                    addStylesToDom(newStyles, options);
                }
                for (var i = 0; i < mayRemove.length; i++) {
                    var domStyle = mayRemove[i];
                    if (domStyle.refs === 0) {
                        for (var j = 0; j < domStyle.parts.length; j++)
                            domStyle.parts[j]();
                        delete stylesInDom[domStyle.id];
                    }
                }
            };
        };

        function addStylesToDom(styles, options) {
            for (var i = 0; i < styles.length; i++) {
                var item = styles[i];
                var domStyle = stylesInDom[item.id];
                if (domStyle) {
                    domStyle.refs++;
                    for (var j = 0; j < domStyle.parts.length; j++) {
                        domStyle.parts[j](item.parts[j]);
                    }
                    for (; j < item.parts.length; j++) {
                        domStyle.parts.push(addStyle(item.parts[j], options));
                    }
                } else {
                    var parts = [];
                    for (var j = 0; j < item.parts.length; j++) {
                        parts.push(addStyle(item.parts[j], options));
                    }
                    stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts };
                }
            }
        }

        function listToStyles(list, options) {
            var styles = [];
            var newStyles = {};
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                var id = options.base ? item[0] + options.base : item[0];
                var css = item[1];
                var media = item[2];
                var sourceMap = item[3];
                var part = { css: css, media: media, sourceMap: sourceMap };
                if (!newStyles[id])
                    styles.push(newStyles[id] = { id: id, parts: [part] });
                else
                    newStyles[id].parts.push(part);
            }
            return styles;
        }

        function insertStyleElement(options, styleElement) {
            var styleTarget = getElement(options.insertInto)
            if (!styleTarget) {
                throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            }
            var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
            if (options.insertAt === "top") {
                if (!lastStyleElementInsertedAtTop) {
                    styleTarget.insertBefore(styleElement, styleTarget.firstChild);
                } else if (lastStyleElementInsertedAtTop.nextSibling) {
                    styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
                } else {
                    styleTarget.appendChild(styleElement);
                }
                styleElementsInsertedAtTop.push(styleElement);
            } else if (options.insertAt === "bottom") {
                styleTarget.appendChild(styleElement);
            } else {
                throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
            }
        }

        function removeStyleElement(styleElement) {
            styleElement.parentNode.removeChild(styleElement);
            var idx = styleElementsInsertedAtTop.indexOf(styleElement);
            if (idx >= 0) {
                styleElementsInsertedAtTop.splice(idx, 1);
            }
        }

        function createStyleElement(options) {
            var styleElement = document.createElement("style");
            options.attrs.type = "text/css";

            attachTagAttrs(styleElement, options.attrs);
            insertStyleElement(options, styleElement);
            return styleElement;
        }

        function createLinkElement(options) {
            var linkElement = document.createElement("link");
            options.attrs.type = "text/css";
            options.attrs.rel = "stylesheet";

            attachTagAttrs(linkElement, options.attrs);
            insertStyleElement(options, linkElement);
            return linkElement;
        }

        function attachTagAttrs(element, attrs) {
            Object.keys(attrs).forEach(function (key) {
                element.setAttribute(key, attrs[key]);
            });
        }

        function addStyle(obj, options) {
            var styleElement, update, remove, transformResult;

            // If a transform function was defined, run it on the css
            if (options.transform && obj.css) {
                transformResult = options.transform(obj.css);

                if (transformResult) {
                    // If transform returns a value, use that instead of the original css.
                    // This allows running runtime transformations on the css.
                    obj.css = transformResult;
                } else {
                    // If the transform function returns a falsy value, don't add this css. 
                    // This allows conditional loading of css
                    return function () {
                        // noop
                    };
                }
            }

            if (options.singleton) {
                var styleIndex = singletonCounter++;
                styleElement = singletonElement || (singletonElement = createStyleElement(options));
                update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
                remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
            } else if (obj.sourceMap &&
                typeof URL === "function" &&
                typeof URL.createObjectURL === "function" &&
                typeof URL.revokeObjectURL === "function" &&
                typeof Blob === "function" &&
                typeof btoa === "function") {
                styleElement = createLinkElement(options);
                update = updateLink.bind(null, styleElement, options);
                remove = function () {
                    removeStyleElement(styleElement);
                    if (styleElement.href)
                        URL.revokeObjectURL(styleElement.href);
                };
            } else {
                styleElement = createStyleElement(options);
                update = applyToTag.bind(null, styleElement);
                remove = function () {
                    removeStyleElement(styleElement);
                };
            }

            update(obj);

            return function updateStyle(newObj) {
                if (newObj) {
                    if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
                        return;
                    update(obj = newObj);
                } else {
                    remove();
                }
            };
        }

        var replaceText = (function () {
            var textStore = [];

            return function (index, replacement) {
                textStore[index] = replacement;
                return textStore.filter(Boolean).join('\n');
            };
        })();

        function applyToSingletonTag(styleElement, index, remove, obj) {
            var css = remove ? "" : obj.css;

            if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = replaceText(index, css);
            } else {
                var cssNode = document.createTextNode(css);
                var childNodes = styleElement.childNodes;
                if (childNodes[index]) styleElement.removeChild(childNodes[index]);
                if (childNodes.length) {
                    styleElement.insertBefore(cssNode, childNodes[index]);
                } else {
                    styleElement.appendChild(cssNode);
                }
            }
        }

        function applyToTag(styleElement, obj) {
            var css = obj.css;
            var media = obj.media;

            if (media) {
                styleElement.setAttribute("media", media)
            }

            if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = css;
            } else {
                while (styleElement.firstChild) {
                    styleElement.removeChild(styleElement.firstChild);
                }
                styleElement.appendChild(document.createTextNode(css));
            }
        }

        function updateLink(linkElement, options, obj) {
            var css = obj.css;
            var sourceMap = obj.sourceMap;

            /* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
            and there is no publicPath defined then lets turn convertToAbsoluteUrls
            on by default.  Otherwise default to the convertToAbsoluteUrls option
            directly
            */
            var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

            if (options.convertToAbsoluteUrls || autoFixUrls) {
                css = fixUrls(css);
            }

            if (sourceMap) {
                // http://stackoverflow.com/a/26603875
                css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
            }

            var blob = new Blob([css], { type: "text/css" });

            var oldSrc = linkElement.href;

            linkElement.href = URL.createObjectURL(blob);

            if (oldSrc)
                URL.revokeObjectURL(oldSrc);
        }


        /***/
}),
/* 9 */
/***/ (function (module, exports) {


        /**
         * When source maps are enabled, `style-loader` uses a link element with a data-uri to
         * embed the css on the page. This breaks all relative urls because now they are relative to a
         * bundle instead of the current page.
         *
         * One solution is to only use full urls, but that may be impossible.
         *
         * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
         *
         * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
         *
         */

        module.exports = function (css) {
            // get current location
            var location = typeof window !== "undefined" && window.location;

            if (!location) {
                throw new Error("fixUrls requires window.location");
            }

            // blank or null?
            if (!css || typeof css !== "string") {
                return css;
            }

            var baseUrl = location.protocol + "//" + location.host;
            var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

            // convert each url(...)
            /*
            This regular expression is just a way to recursively match brackets within
            a string.
    
             /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
               (  = Start a capturing group
                 (?:  = Start a non-capturing group
                     [^)(]  = Match anything that isn't a parentheses
                     |  = OR
                     \(  = Match a start parentheses
                         (?:  = Start another non-capturing groups
                             [^)(]+  = Match anything that isn't a parentheses
                             |  = OR
                             \(  = Match a start parentheses
                                 [^)(]*  = Match anything that isn't a parentheses
                             \)  = Match a end parentheses
                         )  = End Group
                      *\) = Match anything and then a close parens
                  )  = Close non-capturing group
                  *  = Match anything
               )  = Close capturing group
             \)  = Match a close parens
    
             /gi  = Get all matches, not the first.  Be case insensitive.
             */
            var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
                // strip quotes (if they exist)
                var unquotedOrigUrl = origUrl
                    .trim()
                    .replace(/^"(.*)"$/, function (o, $1) { return $1; })
                    .replace(/^'(.*)'$/, function (o, $1) { return $1; });

                // already a full url? no change
                if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
                    return fullMatch;
                }

                // convert the url to a full url
                var newUrl;

                if (unquotedOrigUrl.indexOf("//") === 0) {
                    //TODO: should we add protocol?
                    newUrl = unquotedOrigUrl;
                } else if (unquotedOrigUrl.indexOf("/") === 0) {
                    // path should be relative to the base url
                    newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
                } else {
                    // path should be relative to current directory
                    newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
                }

                // send back the fixed url(...)
                return "url(" + JSON.stringify(newUrl) + ")";
            });

            // send back the fixed css
            return fixedCss;
        };


        /***/
}),
/* 10 */
/***/ (function (module, exports) {

        // removed by extract-text-webpack-plugin

        /***/
}),
/* 11 */,
/* 12 */
/***/ (function (module, exports) {

        module.exports = function escape(url) {
            if (typeof url !== 'string') {
                return url
            }
            // If url is already wrapped in quotes, remove them
            if (/^['"].*['"]$/.test(url)) {
                url = url.slice(1, -1);
            }
            // Should url be wrapped?
            // See https://drafts.csswg.org/css-values-3/#urls
            if (/["'() \t\n]/.test(url)) {
                return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
            }

            return url
        }


        /***/
}),
/* 13 */
/***/ (function (module, exports, __webpack_require__) {

        module.exports = __webpack_require__.p + "/static/images/select.jpg";

        /***/
}),
/* 14 */
/***/ (function (module, exports, __webpack_require__) {

        module.exports = __webpack_require__.p + "/static/images/select_on.jpg";

        /***/
}),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function (module, exports, __webpack_require__) {

        module.exports = __webpack_require__.p + "/static/images/icon_tips_yes.png";

        /***/
}),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function (module, exports) {

        // removed by extract-text-webpack-plugin

        /***/
}),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function ($) {
            'use strict';
            __webpack_require__(39);
            __webpack_require__(51);
            var navTopTpl = __webpack_require__(52);
            var _http = __webpack_require__(53);
            var _search = __webpack_require__(60);
            var _cart = __webpack_require__(61);
            var _user = __webpack_require__(62);
            var LoginContent = __webpack_require__(63);
            var Toolbar = __webpack_require__(75)
            var _login = __webpack_require__(62);
            var _service = __webpack_require__(86);


            // 通用页面头部
            var header = {
                init: function (fn) {
                    var _this = this;
                    //页面有pageFlag标识的，不显示咨询状态栏
                    if (!$('body').hasClass('pageFlag')) {
                        _this.toolbar();
                    }

                    _this.loadCarNum();
                    _this.loadListCar();
                    _this.onLoad();
                    if (!isLogin()) {
                        this.autoLogin(fn);
                    }
                    if (!$('#index_flag').length) {
                        _this.loadClassifyList(); //加载头版导航分类(wk)   
                    }
                    _this.bindEvent();

                },
                onLoad: function () {
                    var _this = this;
                    //判断登陆状态
                    window.isLogin = function () {
                        //本地测试环境不判断登录
                        if (location.hostname.match(/^(localhost)/g)) {
                            return true;
                        }
                        return _http.getCookie('sid') && _http.getCookie('accountId');
                    }
                    window.loadLogin = function () {
                        if (isLogin()) {
                            var username = _http.getCookie("username");
                            var name = _http.getCookie("name");
                            if (name == '' || name == null || name == 'null' ||
                                name == '未设置昵称') {
                                $(".login_name_top i").html(username);
                            } else {
                                $(".login_name_top i").html(name);
                            }

                            $('.login_name_top').show();
                            $('.n-name').hide();
                            $('.font_red').hide();
                        }
                    }
                    window.showLogin = function (flag, fn) {
                        if (flag == 'p') {
                            var loginContent = new LoginContent();
                            var cont = loginContent.render();
                            new ehaoyao.tips({
                                position: "center",
                                id: "dialogBox_login",
                                style: "dialogBox_login",
                                hasTitle: true,
                                title: '登录',
                                content: cont,
                                callback: function () {
                                    // 埋点
                                    ehyTrack.track('弹出登录框', {
                                        '所在页面': _http.getPageName(location.pathname)
                                    });
                                    loginContent.init(fn);
                                }
                            });
                        } else {
                            window.open(_http.host + '/login.html', "_blank");
                        }
                    }

                    $('.navigation a:eq(0)').removeAttr('target');

                    if (!isLogin()) {
                        $(".car_red").val(0);
                        $(".car_none").show();
                        $('.navigation li:eq(7) a').attr('href', 'javascript:void(0)').removeAttr('target');
                        if (window.location.href.indexOf('shoppingCart.html') < 0) {
                            loadShoppingCart(false);
                        }
                    } else {
                        if (window.location.href.indexOf('shoppingCart.html') < 0) {
                            loadShoppingCart(false);
                        }

                        $(".car_more").show();
                        $(".car_none").hide();

                        loadLogin();
                    };

                },
                toolbar: function () {
                    var toolbar = new Toolbar();
                    toolbar.toolbar();
                },
                bindEvent: function () {
                    var _this = this;

                    ShoppingCartSum();
                    //点击登陆
                    $("body").on('click', '.n-name', function () {
                        _http.setCookie('jump_url', document.location.href);
                        // 埋点
                        ehyTrack.track('点击注册&登录_顶部', {
                            '导航名称': '登录',
                            '所在页面': _http.getPageName(location.pathname)
                        });
                        showLogin();
                    });
                    //退出
                    $(".header").on('click', '#exit_top_btn', function () {
                        var username = {
                            username: _http.getCookie("username")
                        };
                        _user.logout(username, function (res) {
                            _http.removeCookie("sid", '.ehaoyao.com');
                            _http.removeCookie("uid", '.ehaoyao.com');
                            _http.removeCookie("accountId");
                            _http.removeCookie("username");
                            _http.removeCookie("name");
                            _http.removeCookie('autoUsername');
                            _http.removeCookie('autoPassword');
                            _http.removeCookie('uuid');
                            _http.removeCookie('mobile');
                            location.reload();
                        })

                    });

                    //搜索全局
                    $(".search-button").click(function () {
                        var comText = $("#top_search_input").val();
                        var inputtext = encodeURIComponent(comText);
                        // 埋点
                        ehyTrack.track('点击搜索_顶部', {
                            '搜索词': comText,
                            '所在页面': _http.getPageName(location.pathname)
                        });
                        // var str = '他达拉非片、Tadalafil Tablets、希爱力、Cialis、盐酸伐地那非片、Vardenafil Hydrochloride Tablets、艾力达、Levitra、伟哥、万艾可、基因育根胶囊、男根胶囊、金虫草菌丝体胶丸、健根搭档、傲博胶囊、坚硬丸、麦克森胶囊、魔根金虫草胶囊、贝诺尔康胶囊、狂插男根胶囊'
                        // if (str.indexOf(comText) > -1) {
                        //     inputtext = '-';
                        // }
                        if (!comText == "请输入商品名称、品牌" || !comText == "") {

                            location.href = _http.host + '/search/' +
                                inputtext;
                        }
                    });
                    //搜索店内药品
                    $(".search-btn-pharmacy").click(function () {
                        var comText = $("#top_search_input").val();
                        var inputtext = encodeURIComponent(comText);
                        var pharmacyid = $(this).parents('.search').attr(
                            'data-pharmacyid');
                        if (comText != "请输入商品名称、品牌" || comText != "") {
                            location.href = _http.host +
                                '/getPharmacyById?pharmacyId=' + pharmacyid +
                                '&searchGoodsBrief=' + inputtext;
                        }
                    })
                    //删除购物车
                    $(document).on("click", ".dete_car", function () {
                        var id = $(this).attr("data-id");
                        var cont = ' <div id="cart_del" class="cart_cont">' +
                            '   <h3>确定要删除商品? </h3>' +
                            '   <div class="cart-btns">' +
                            '       <div class="btn_gray btn_cancel" href="javascript:void(0)">取消</div>' +
                            '       <div class="btn_red btn_ok" href="javascript:void(0)">确定</div>' +
                            '   </div>' +
                            ' </div>';

                        new ehaoyao.tips({
                            position: "center",
                            id: "dialogBox_address",
                            style: "dialogBox_address",
                            hasTitle: true,
                            title: '提示',
                            content: cont,
                            callback: function (fn) {
                                $('.btn_cancel').on('click',
                                    function () {
                                        fn();
                                    })

                                $('.btn_ok').on('click',
                                    function () {
                                        _this.LoadDeleProduct(id);
                                        fn();
                                    });

                            }
                        });
                    });

                    $(".top_nav").on("click", '.category-nav-sup .sup-item > a', function () { //埋点
                        var name = $(this).text().trim();
                        ehyTrack.track('点击一级分类导航_顶部', {
                            '导航名称': name,
                            '所在页面': _http.getPageName(location.pathname)
                        });
                    }).on("click", '.category-nav-sup .sup-item em > a', function () {
                        var name = $(this).text().trim();
                        var cate = $(this).parent().siblings('a').text().trim();
                        ehyTrack.track('点击热门二级分类导航_顶部', {
                            '导航名称': name,
                            '所属分类': cate,
                            '所在页面': _http.getPageName(location.pathname)
                        });
                    }).on("click", '.category-nav-sup .sub-item .left dt > a', function () {
                        var name = $(this).text().replace('>', '').trim();
                        var cate = $(this).parents('li').find('.sup-item > a').text().trim();
                        ehyTrack.track('点击二级分类导航_顶部', {
                            '导航名称': name,
                            '所属分类': cate,
                            '所在页面': _http.getPageName(location.pathname)
                        });
                    }).on("click", '.category-nav-sup .sub-item .left dd > a', function () {
                        var name = $(this).text().trim();
                        var cate1 = $(this).parents('li').find('.sup-item > a').text().trim();
                        var cate2 = $(this).parents('dl').find('dt > a').text().replace('>', '').trim();
                        ehyTrack.track('点击三级分类导航_顶部', {
                            '导航名称': name,
                            '所属一级分类': cate1,
                            '所属二级分类': cate2,
                            '所在页面': _http.getPageName(location.pathname)
                        });
                    }).on("click", '.category-nav-sup .sub-item .menu-ad-logo a', function () {
                        var name = $(this).data('brand') || '';
                        var cate = $(this).parents('li').find('.sup-item > a').text().trim();
                        ehyTrack.track('点击品牌分类导航_首页', {
                            '导航名称': name,
                            '所属一级分类': cate,
                            '所在页面': _http.getPageName(location.pathname)
                        });
                    }).on("click", '.category-nav-sup .sub-item .menu-ad-img a', function () {
                        var name = $(this).data('active');
                        var cate = $(this).parents('li').find('.sup-item > a').text().trim();
                        ehyTrack.track('点击活动图分类导航_首页', {
                            '活动名称': name,
                            '所属一级分类': cate,
                            '所在页面': _http.getPageName(location.pathname)
                        });
                    }).on("click", '.navigation li > a', function () {
                        var name = $(this).text();
                        ehyTrack.track('点击顶部导航_顶部', {
                            '导航名称': name,
                            '所在页面': _http.getPageName(location.pathname)
                        });
                    }).on("click", '.navigation li.new-text .small-menu a', function () {
                        var name = $(this).text();
                        ehyTrack.track('点击旗舰店导航_顶部', {
                            '导航名称': name,
                            '所在页面': _http.getPageName(location.pathname)
                        });
                    });
                    // 埋点--end
                    //关注好药师
                    $(".attention").mouseover(function () {
                        $(".shaoma").show();
                        $(this).find("i").addClass("hover")

                    }).mouseout(function () {
                        $(".shaoma").hide();
                        $(this).find("i").removeClass("hover")
                    });
                    //二级菜单
                    $(".category").hover(function () {
                        $("#categroy-nav-comm").show();
                    }, function () {
                        $("#categroy-nav-comm").hide();
                    })

                    //购物车列表
                    $(".car_list").mouseenter(function () {
                        $(".car").addClass("car_hover");
                        $(this).find(".car_cont").show();
                        ShoppingCartSum();
                        loadShoppingCart();

                    }).mouseleave(function () {
                        $(".car").removeClass("car_hover");
                        $(this).find(".car_cont").hide();
                    });
                    //点击优惠券跳转
                    $(".top_coupon").click(function () {
                        var jump_url = _http.host + "/receiveCoupon.html";
                        _http.setCookie('jump_url', jump_url);
                        // 埋点
                        ehyTrack.track('点击领取优惠券_顶部', {
                            '所在页面': _http.getPageName(location.pathname)
                        });
                        window.open(_http.host + '/receiveCoupon.html',
                            "_blank");
                    });
                    $(".search_down a").off('click').on('click', function () {
                        // 埋点
                        var name = $(this).text();
                        ehyTrack.track('点击搜索热词_顶部', {
                            '热词名称': name,
                            '所在页面': _http.getPageName(location.pathname)
                        });
                    });
                    $(".pCenter").click(function () {
                        var accountId = _http.getCookie("accountId");
                        var jump_url = _http.host + "/userHome.html";
                        // 埋点
                        ehyTrack.track('点击顶部导航栏_顶部', {
                            '导航名称': '个人中心',
                            '所在页面': _http.getPageName(location.pathname)
                        });
                        if (accountId == "") {
                            _http.setCookie('jump_url', jump_url);
                            showLogin('p');
                            return;
                        } else {
                            window.open(_http.host + '/userHome.html', "_blank");
                        }
                    });
                    $(".btn_js").click(function () {
                        window.open(_http.host + '/shoppingCart.html',
                            "_blank");
                    });

                    $(".order").click(function (urlID) {
                        var accountId = _http.getCookie("accountId");
                        var jump_url = _http.host + "/orderList.html";
                        // 埋点
                        ehyTrack.track('点击顶部导航栏_顶部', {
                            '导航名称': '我的订单',
                            '所在页面': _http.getPageName(location.pathname)
                        });
                        if (accountId == "") {
                            _http.setCookie('jump_url', jump_url);
                            showLogin('p');
                            return;
                        } else {
                            window.open(_http.host + '/orderList.html',
                                "_blank");
                        }
                    });
                    //快捷充值
                    $('#fast_charge').click(function (urlID) {
                        var accountId = _http.getCookie("accountId");
                        var jump_url = _http.host + "/userRecharge.html";
                        if (accountId == "") {
                            _http.setCookie('jump_url', jump_url);
                            showLogin('p');
                            return;
                        } else {
                            window.open(_http.host + '/userRecharge.html',
                                "_blank");
                        }
                    });
                    $(".requirement").click(function (urlID) {
                        var accountId = _http.getCookie("accountId");
                        var jump_url = _http.host + "/myRequirement.html";
                        // 埋点
                        ehyTrack.track('点击顶部导航栏_顶部', {
                            '导航名称': '我的需求',
                            '所在页面': _http.getPageName(location.pathname)
                        });
                        if (accountId == "") {
                            _http.setCookie('jump_url', jump_url);
                            showLogin('p');
                            return;
                        } else {
                            window.open(_http.host + '/myRequirement.html',
                                "_blank");
                        }
                    });
                    $(".font_red").click(function () {
                        // 埋点
                        ehyTrack.track('点击注册&登录_顶部', {
                            '导航名称': '注册',
                            '所在页面': _http.getPageName(location.pathname)
                        });
                        window.open(_http.host + '/register.html', "_blank");

                    });
                    $(".logo").off('click').on("click", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        ehyTrack.track('点击好药师Logo_顶部', {
                            '所在页面': _http.getPageName(location.pathname)
                        });
                        window.open(_http.host + '/index.html', "_blank");
                    });
                    //点击购物车图标跳转
                    $(".car").click(function () {
                        var accountId = _http.getCookie("accountId");
                        var jump_url = _http.host + "/shoppingCart.html";
                        // 埋点
                        ehyTrack.track('点击购物车_顶部', {
                            '所在页面': _http.getPageName(location.pathname)
                        });
                        // if (accountId == "") {
                        //     _http.setCookie('jump_url', jump_url);
                        //     showLogin('p');
                        // } else {
                        window.open(_http.host + '/shoppingCart.html', "_blank");
                        // }
                    });
                    $("#couponImg").hover(function () {
                        $(this).addClass('top_coupon02');
                    }, function () {
                        $(this).removeClass('top_coupon02');
                    });
                    $('#top_search_input').bind({
                        focus: function () {
                            if (this.value == this.defaultValue) {
                                this.value = "";
                            }
                        },
                        blur: function () {
                            if (this.value == "") {
                                this.value = this.defaultValue;
                            }
                        }
                    });

                    $('.login_name_top i').on('click', function () {
                        window.open(_http.host + '/userHome.html', "_blank");
                    });

                    //网络医院
                    $('.navigation li').each(function () {
                        var txt = $(this).find('a').text();
                        if (txt == '网络医院') {
                            $(this).on('click', function () {
                                if (!isLogin()) {
                                    showLogin('p');
                                    return;
                                }
                            });
                        }
                    });


                    //键盘操作
                    var highlightindex = -1;
                    $("#top_search_input").keyup(function (event) {
                        //处理键盘操作
                        var myEvent = event || window.event;
                        var keyCode = myEvent.keyCode;
                        if (keyCode == 38 || keyCode == 40) {
                            if (keyCode == 38) { //向上
                                var autoNodes = $("#search_top_pop").children(
                                    "div");
                                if (highlightindex != -1) {
                                    autoNodes.eq(highlightindex).css({
                                        "background-color": "#fff",
                                        "color": "#181818"
                                    });
                                    highlightindex--;
                                } else {
                                    highlightindex = autoNodes.length - 1;
                                }
                                if (highlightindex == -1) {
                                    highlightindex = autoNodes.length - 1;
                                }
                                autoNodes.eq(highlightindex).css({
                                    "background-color": "#ff344d",
                                    "color": "#fff"
                                });
                            }
                            if (keyCode == 40) { //向下
                                var autoNodes = $("#search_top_pop").children(
                                    "div");
                                if (highlightindex != -1) {
                                    autoNodes.eq(highlightindex).css({
                                        "background-color": "#fff",
                                        "color": "#181818"
                                    });
                                }
                                highlightindex++;
                                if (highlightindex == autoNodes.length) {
                                    highlightindex = 0;
                                }
                                autoNodes.eq(highlightindex).css({
                                    "background-color": "#ff344d",
                                    "color": "#fff"
                                });
                            }
                        } else if (keyCode == 13) { //回车键
                            if (highlightindex != -1) {
                                var comText = $("#search_top_pop").hide().children(
                                    "div").eq(highlightindex).text();
                                location.href = _http.host + '/search/' +
                                    comText;
                                highlightindex = -1;
                                $("#top_search_input").val(comText);
                                if ($("#search_top_pop").is(":visible")) {
                                    $("#search_top_pop").css("display",
                                        "none")
                                }
                            }
                            $(".search-button").trigger("click");
                        } else {
                            if ($("#top_search_input").val() == "") {
                                $("#search_top_pop").hide();
                            } else { //有文字输入时获取提示词
                                _this.loadSearch("search_top_pop",
                                    "top_search_input");
                            }
                        }
                    });

                    //点击页面隐藏自动补全提示框
                    document.onclick = function (e) {
                        var e = e ? e : window.event;
                        var tar = e.srcElement || e.target;
                        if (tar.id != "top_search_input") {
                            if ($("#search_top_pop").is(":visible")) {
                                $("#search_top_pop").css("display", "none")
                            }
                        }
                    }
                },
                btnDelete: function (id) {
                    var _this = this;
                    _this.LoadDeleProduct(id);
                },
                //加载热门关键词
                loadSearchTip: function () {
                    _search.searchTip(function (res) {
                        var html = "";
                        var data = res.data;
                        for (var i = 0; i < data.length; i++) {
                            if (i < 6) {
                                html += '<a href="' + _http.host +
                                    '/search/' + data[i].keysValue + '">' +
                                    data[i].keysValue + '</a>'
                            }
                        }
                        $(".search_down").html(html);

                    })
                },
                //获取购物车数量
                loadCarNum: function () {
                    window.ShoppingCartSum = function () {
                        var memberId = {
                            userId: _http.getCookie("accountId")
                        };
                        if (window.location.href.indexOf('paymentsCallback') <= 0) {
                            _cart.getCartCount({
                                cartType: 0
                            }, function (res) {
                                if (res && res.data) {
                                    var sumT = res.data.itemCatalogTotal || 0;
                                    var sumO = res.data.itemCatalogOTCCart || 0;
                                    if (sumO == null || sumO == '' || sumO == 0) {
                                        $(".car_red,#toolbarSum").html(0);
                                    } else {
                                        if (sumO > 99) {
                                            $(".car_red,#toolbarSum").html('99+');
                                        } else {
                                            $("#toolbarSum").html(sumO);
                                            $(".car_red").html(sumO);
                                        }
                                    }
                                    $(".car_js").find("em").html(sumO)
                                }
                            });
                        }
                    }
                },
                //搜索
                Homesearch: function () {
                    _search.Homesearch(function (res) {
                        var data = res.data.tipsHome;
                        $('#top_search_input').val(data);
                    });
                },
                loadSearch: function (auto, search) {
                    var highlightindex = -1;
                    if ($("#" + search).val() != "") {
                        var autoNode = $("#" + auto); //缓存对象（弹出框）
                        var carlist = new Array();
                        var n = 0;
                        var mylist = [];
                        var maxTipsCounts = 20; // 最大显示条数
                        var name = $('#top_search_input').val()
                        _search.Inputsearch(name, function (res) {
                            mylist = res.data;
                            if (res.status == 0) {
                                if (mylist == null) {
                                    autoNode.hide();
                                    return;
                                }
                                autoNode.empty(); //清空上次的记录
                                for (var i in mylist) {
                                    if (i < maxTipsCounts) {
                                        var wordNode = mylist[i]; //弹出框里的每一条内容
                                        var newDivNode = $("<div>").attr(
                                            "id", i); //设置每个节点的id值
                                        newDivNode.attr("style",
                                            "font:14px/30px arial;height:30px;padding:0 8px;cursor: pointer;"
                                        );
                                        newDivNode.html(wordNode).appendTo(
                                            autoNode); //追加到弹出框
                                        //鼠标移入高亮，移开不高亮
                                        newDivNode.mouseover(function () {
                                            if (highlightindex != -
                                                1) { //原来高亮的节点要取消高亮（是-1就不需要了）
                                                autoNode.children(
                                                    "div").eq(
                                                        highlightindex
                                                    ).css({
                                                        "background-color": "#fff",
                                                        "color": "#181818"
                                                    });
                                            }
                                            //记录新的高亮节点索引
                                            highlightindex = $(this)
                                                .attr("id");
                                            $(this).css({
                                                "background-color": "#ff344d",
                                                "color": "#fff"
                                            });
                                        });
                                        newDivNode.mouseout(function () {
                                            $(this).css({
                                                "background-color": "#fff",
                                                "color": "#181818"
                                            });
                                        });
                                        //鼠标点击文字上屏
                                        newDivNode.click(function () {
                                            //取出高亮节点的文本内容
                                            var comText = autoNode.hide()
                                                .children("div").eq(
                                                    highlightindex)
                                                .text();
                                            highlightindex = -1;
                                            //文本框中的内容变成高亮节点的内容
                                            $("#" + search).val(comText);
                                            $("#search-form").submit();
                                            location.href = _http.host + '/search/' + comText;
                                        })
                                        if (mylist.length > 0) { //如果返回值有内容就显示出来
                                            autoNode.show();
                                        } else { //服务器端无内容返回 那么隐藏弹出框

                                            autoNode.hide();
                                            //弹出框隐藏的同时，高亮节点索引值也变成-1
                                            highlightindex = -1;
                                        }
                                    }
                                }
                            }
                        })
                    }
                },
                //购物车列表展示
                loadListCar: function () {
                    var _this = this;
                    window.loadShoppingCart = function (isShoppingCart, data) {
                        var cartParam = {
                            cartType: 0
                        };
                        if (isShoppingCart == true) {
                            _this.loadCartData(data);
                        } else {
                            _cart.getCartList(cartParam, function (res) {
                                _this.loadCartData(res);
                            });
                        }
                    }
                },
                loadCartData: function (res) {
                    var html = "";
                    var sumNumber = 0;
                    if (res.data) {
                        $(".car_more").show();
                        $(".car_none").hide();
                        var data = res.data.listCartClass;
                        for (var l in data) {
                            var list = data[l].listCartPharmacy;
                            for (var i in list) {
                                var item = list[i]
                                for (var j in item.listActivity) {
                                    var k = item.listActivity[j];
                                    for (var m in k.listCart) {
                                        var n = k.listCart[m];
                                        var carID = n.cartId;
                                        var productId = n.productId;
                                        var pharmacyId = item.pharmacyId;
                                        var price = n.price;
                                        var productNum = n.productNum;
                                        var pharmacySource = n.pharmacySource;
                                        var isPurchase = n.isPurchase;
                                        sumNumber = sumNumber +
                                            price * productNum;
                                        if (n.smallPic && n.smallPic != ' ') {
                                            var imagePic = (n.smallPic.indexOf('http') > -1) ? n.smallPic : _http.imagePath + n.smallPic;
                                        } else {
                                            var imagePic = _http.defaultimgPath;
                                        }
                                        if (n.group_id && n.group_id != null && (pharmacySource == 'b2cSelf' || pharmacySource == 'b2cThird')) {
                                            var productLink = '/product-' + n.group_id + '.html';
                                            if (pharmacySource == 'b2cThird') {
                                                productLink = '/product-' + n.group_id + '.html?pharmacyId=' + pharmacyId;
                                            }
                                            var htm = '<li><a href="' + productLink + '" target="_blank"><div class="imgHeight"><img src="' +
                                                imagePic + '" alt=""></div><div class="text_cont"><div class="name">' +
                                                n.name + '</div></div></a>'
                                        } else {
                                            var productLink = '/product-' + productId + '.html?pharmacyId=' + pharmacyId;
                                            var htm = '<li><a href="' + productLink + '" target="_blank"><div class="imgHeight"><img src="' +
                                                imagePic + '" alt=""></div><div class="text_cont"><div class="name">' +
                                                n.name + '</div></div></a>'
                                        }
                                        if (isPurchase == 1) {
                                            price = n.buyingPrice;
                                        }
                                        html += htm + '<div class="price"><p class="now_price">￥' +
                                            price + '<span><i>X</i>' + n.productNum + '</span></p><p class="dete_car" id="car_id" data-id="' +
                                            carID + '">删除</p></div></li>';
                                    }
                                }
                            }
                        }
                        $(".car_more ul").html(html);
                    } else {
                        $(".car_more").hide();
                        $(".car_none").show();
                    }
                },
                //删除购物车指定商品
                LoadDeleProduct: function (cartId) {
                    var _this = this
                    var cartInfo = {
                        cartType: 0,
                        cartId: cartId
                    };
                    _cart.deleteProduct(cartInfo, function () {
                        if (window.location.href.indexOf('shoppingCart.html') < 0) {
                            loadShoppingCart(false);
                            ShoppingCartSum();
                        } else {
                            window.location.reload();
                        }
                    })
                },
                //点击搜索
                loadSearchBtn: function () {
                    var name = $("#top_search_input").val();
                    _search.Inputsearch(name, function (res) {

                    })
                },
                //自动登录
                autoLogin: function (fn) {
                    if (_http.getCookie('autoUsername') && _http.getCookie('autoPassword')) {
                        _login.login({
                            username: _http.getCookie('autoUsername'),
                            password: _http.getCookie('autoPassword')
                        },
                            function (res) {
                                //请求接口
                                var sid = res.data.sid,
                                    aId = res.data.userId,
                                    username = res.data.username,
                                    name = res.data.name,
                                    mobile = res.data.mobile;
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
                                //               
                                //              if(fn){
                                //                  fn && fn();
                                //              }else{
                                //                  var loginContent = new LoginContent();
                                //                  loginContent.redirect();
                                //              }
                                // 埋点
                                ehyTrack.identify(aId, {
                                    '会员积分': points,
                                    '性别': sex == 1 ? '女' : '男',
                                    '年龄': age,
                                    '手机号': mobile,
                                    '帐号余额': balance,
                                    '优惠券数量': coupons
                                });

                                loadLogin();
                                if (location.pathname == "/shoppingCart.html") {
                                    location.reload();
                                }
                            },
                            function (errorMsg) {
                                console.log(errorMsg);
                            });
                    }
                },
                //加载头部分类数据(wk 07.26)
                loadClassifyList: function () {
                    var _this = this;
                    var classifyHtml = "";
                    _service.getHeaderClassify(function (res) {
                        res.data.imagePath = _http.imagePath;
                        res.data.defaultimgPath = _http.defaultimgPath;
                        classifyHtml = _http.renderHtml(navTopTpl, { typeList: res.data })
                        $(".category").html(classifyHtml);
                        // _this.bindEvent(); //绑定事件
                        //分类热卖专区链接禁用
                        var forbid = [511, 36808];
                        $('.category-nav-sup .sup-item').each(function (i, item) {
                            var id = $(item).children('a').attr('href').split('-')[1].split('.')[0];
                            forbid.forEach(function (cid, idx) {
                                if (cid == id) {
                                    $(item).children('a').attr('href', '#');
                                    return;
                                }
                            });
                        });
                        //导航三级分类
                        $(".new-text").hover(function () {
                            $(this).children(".small-menu").show();
                        }, function () {
                            $(this).children(".small-menu").hide();
                        })
                        $(".category-nav-sup li").hover(
                            function () {
                                $(this).addClass("hover").next("div").show();
                                $(this).siblings('li').removeClass('hover');
                            },
                            function () {
                                $(this).removeClass("hover").next("div").hide();
                            });
                    }, function (errMsg) {
                        // _this.bindEvent(); //绑定事件
                    });
                }
            }

            $(function () {
                header.init();
            })
            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

        /***/
}),
/* 39 */
/***/ (function (module, exports) {

        // removed by extract-text-webpack-plugin

        /***/
}),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */
/***/ (function (module, exports) {

        (function () {

        })();


        /***/
}),
/* 52 */
/***/ (function (module, exports) {

        module.exports = "\r\n            <p class=\"title\">全部商品分类</p>\r\n            <div class=\"category-nav-wrap lFloat\" id=\"categroy-nav-comm\">  \r\n                    <div class=\"category-nav-cover\"></div>\r\n                    <ul class=\"category-nav-sup\">\r\n                    {{each typeList as friItem idxOne}} \r\n                        <li class=\"item-{{friItem.cid}}\">\r\n                            <div class=\"sup-item\">\r\n                                <a href=\"/channel/channel-{{friItem.cid}}.htm\">\r\n                                {{friItem.name}}\r\n                                <i></i>\r\n                                </a>\r\n                                <em>\r\n                                    <a href=\"{{friItem.fristKey[1]}}\">{{friItem.fristKey[0]}}</a>\r\n                                    /\r\n                                    <a href=\"{{friItem.secondKey[1]}}\">{{friItem.secondKey[0]}}</a>\r\n                                </em>\r\n                            </div>\r\n                            <div class=\"sub-item\">\r\n                                <div class=\"left\">\r\n                                    {{each friItem.list as secItem idx2 }}\r\n                                    <dl class=\"clearflix\">\r\n                                        <dt><a href=\"/products/c{{friItem.cid}}-s{{secItem.cid}}.html\">{{secItem.name}} <i>&gt;</i></a></dt>  \r\n                                        <dd>   \r\n                                        {{each secItem.list as trdItem idx3}}    \r\n                                        <a target=\"_blank\" href=\"/products/c{{friItem.cid}}-s{{trdItem.cid}}.html\">{{trdItem.name}}</a>    \r\n                                        {{/each}}      \r\n                                        </dd>        \r\n                                    </dl>\r\n                                    {{/each}}\r\n                                </div>\r\n                                <div class=\"menu-ad\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"menu-ad-logo\">\r\n                                    {{each friItem.imageGoodss as imgItem idx4}}\r\n\t\t\t\t\t\t\t\t\t\t<a href=\"{{imgItem.linkUrl}}\">\r\n                                            <img src=\"{{imgItem.imgUrl}}\">\r\n                                        </a>\r\n                                        {{/each}} \r\n\t\t\t\t\t\t\t\t\t</div>  \r\n\t\t\t\t\t\t\t\t\t<div class=\"menu-ad-img\">\r\n                                    {{each friItem.bigImageGoodss as bigImgItem idx5}}\r\n\t\t\t\t\t\t\t\t\t\t<a href=\"{{bigImgItem.linkUrl}}\">\r\n                                            <img src=\"{{bigImgItem.imgUrl}}\">\r\n                                        </a>\r\n                                    {{/each}}\r\n\t\t\t\t\t\t\t\t\t</div>\r\n                            </div>\r\n                        </li>\r\n                    {{/each}}\r\n                    </ul>\r\n            </div>\r\n        ";

        /***/
}),
/* 53 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function (jQuery, $) {
            'use strict';
            var ArtTpl = __webpack_require__(54);
            var conf = {
                host: location.origin + '/dist/view', //http://10.2.151.60:8088/dist/view',//'http://10.2.158.122:8088/dist/view',
                serverHost: 'http://uat-console.ehaoyao.com',
                imagePath: 'http://image.qumaiyao.com/', //'http://devimage.qumaiyao.com/', 'http://preimage.qumaiyao.com/', 'http://image.qumaiyao.com/'
                hrefhost: location.hostname,
                messageServerHost: 'http://10.2.152.16:8080',
                appServerHost: 'http://prepare.qumaiyao.com',
                apiServerHost: 'https://dev-frontend.ehaoyao.com/user/v1',
                tradeServerHost: 'https://dev-order.ehaoyao.com',
                marketServerHost: 'https://dev-frontend.ehaoyao.com'
            };
            //根据不同环境切换域名
            if (conf.hrefhost.match(/^(localhost)/g)) { //本机环境
                conf.host = location.origin + '/dist/view';
                conf.serverHost = 'http://dev-console.ehaoyao.com';
                conf.imagePath = 'http://preimage.qumaiyao.com/';
                conf.messageServerHost = 'http://uat-api.ehaoyao.com';
                conf.appServerHost = 'http://admin45.qumaiyao.com';
                conf.marketServerHost = 'https://dev-frontend.ehaoyao.com';
            } else if (conf.hrefhost.match(/^(dev-www)/g)) { //测试环境
                conf.host = 'http://dev-www.ehaoyao.com';
                conf.serverHost = 'http://dev-console.ehaoyao.com';
                conf.imagePath = 'http://image.qumaiyao.com/';
                conf.appServerHost = 'http://dev-qmyconsole.ehaoyao.com';
                conf.apiServerHost = 'https://dev-frontend.ehaoyao.com/user/v1';
                conf.tradeServerHost = 'https://dev-frontend.ehaoyao.com';
                conf.marketServerHost = 'https://dev-frontend.ehaoyao.com';
            } else if (conf.hrefhost.match(/^(uat-www)/g)) { //预发布环境
                conf.host = 'http://uat-www.ehaoyao.com';
                conf.serverHost = 'http://uat-console.ehaoyao.com';
                conf.imagePath = 'http://image.qumaiyao.com/';
                conf.appServerHost = 'http://uat-qmyconsole.ehaoyao.com';
                conf.apiServerHost = 'https://uat-frontend.ehaoyao.com/user/v1';
                conf.tradeServerHost = 'https://uat-frontend.ehaoyao.com';
                conf.marketServerHost = 'https://uat-frontend.ehaoyao.com';
            } else if (conf.hrefhost.match(/^(fat-www)/g)) { //仿真环境
                conf.host = 'http://fat-www.ehaoyao.com';
                conf.serverHost = 'http://fat-console.ehaoyao.com';
                conf.imagePath = 'http://image.qumaiyao.com/';
                conf.appServerHost = 'http://fat-qmyconsole.ehaoyao.com';
                conf.apiServerHost = 'https://fat-frontend.ehaoyao.com/user/v1';
                conf.tradeServerHost = 'https://fat-frontend.ehaoyao.com';
                conf.marketServerHost = 'https://fat-frontend.ehaoyao.com';
            } else if (conf.hrefhost == 'newmall.ehaoyao.com') { //阿里云测试环境--未使用
                conf.host = 'http://newmall.ehaoyao.com';
                conf.serverHost = 'http://newadmin.ehaoyao.com';
                conf.imagePath = 'http://image.qumaiyao.com/';
                conf.appServerHost = 'http://prepare.qumaiyao.com';
            } else if (conf.hrefhost == 'wwwtest.ehaoyao.com') { //灰度发布--未使用
                conf.host = 'http://wwwtest.ehaoyao.com';
                conf.serverHost = 'http://console.ehaoyao.com';
                conf.imagePath = 'http://image.qumaiyao.com/';
                conf.appServerHost = 'http://admin.qumaiyao.com';
            } else if (conf.hrefhost == 'www.ehaoyao.com') { //线上环境
                conf.host = 'http://www.ehaoyao.com';
                conf.serverHost = 'http://console.ehaoyao.com';
                conf.imagePath = 'http://image.qumaiyao.com/';
                conf.appServerHost = 'http://admin.qumaiyao.com';
                // conf.apiServerHost = 'http://user.ehaoyao.com/hys-ucenter-api';
                conf.apiServerHost = 'https://frontend.ehaoyao.com/user/v1';
                conf.tradeServerHost = 'https://frontend.ehaoyao.com';
                conf.marketServerHost = 'https://frontend.ehaoyao.com';
            }

            var _http = {
                template: ArtTpl,
                imagePath: conf.imagePath,
                serverHost: conf.serverHost, //'10.3.5.48',
                appServerHost: conf.appServerHost,
                apiServerHost: conf.apiServerHost,
                tradeServerHost: conf.tradeServerHost,
                marketServerHost: conf.marketServerHost,
                host: conf.host,
                defaultimgPath: 'https://ehaoyao.oss-cn-hangzhou.aliyuncs.com/2017/12/27/1514342354963_37.png',
                // 网络请求
                request: function (param) {
                    var _this = this;
                    if (param.data) {
                        param.data.coonType = 3;
                        param.data.cityId = param.data.cityId || _this.getCookie('citycode') || '010';
                        param.data.memberId = _this.getCookie('accountId') || '';
                        param.data.accountId = _this.getCookie('accountId') || '';
                        param.data.uid = _this.getCookie('uid') || '';
                        param.data.sid = _this.getCookie('sid') || '';
                    }
                    jQuery.support.cors = true;
                    $.ajax({
                        type: param.method || 'get',
                        url: param.url || '',
                        dataType: param.type || 'JSON',
                        data: param.data || '',
                        cache: param.cache != undefined ? param.cache : true,
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        success: function (res) {
                            // 请求成功
                            if (0 == res.status) {
                                typeof param.success === 'function' && param.success(res, res.msg);
                            } else {
                                typeof param.error === 'function' && param.error(res.msg);
                            }
                        },
                        error: function (err) {
                            if (typeof param.error === 'function') {
                                if (err.responseJSON && err.responseJSON.msg != null) {
                                    param.error(err.responseJSON.msg);
                                } else if (err.responseText) {
                                    param.error(err.responseText);
                                }
                            }
                        }
                    });
                },
                //application/json请求
                applicationRequest: function (param) {
                    var _this = this;
                    param.contentType = param.contentType || "application/json";
                    if (param.data) {
                        param.data.coonType = param.data.coonType || 3;
                        param.data.cityId = param.data.cityId || _this.getCookie('citycode') || '010';
                        param.data.memberId = _this.getCookie('accountId') || '';
                        param.data.accountId = _this.getCookie('accountId') || '';
                        param.data.uid = _this.getCookie('uid') || '';
                        param.data.sid = _this.getCookie('sid') || '';
                        if (param.contentType == "application/json" && typeof param.data == 'object') {
                            param.data = JSON.stringify(param.data);
                        }
                    }
                    jQuery.support.cors = true;
                    $.ajax({
                        type: param.method || 'post',
                        url: param.url || '',
                        contentType: param.contentType,
                        dataType: param.type || 'JSON',
                        data: param.data || '',
                        xhrFields: {
                            withCredentials: true
                        },
                        beforeSend: function (xhr) {
                            if (param.header) {
                                for (var key in param.header) {
                                    xhr.setRequestHeader(key, param.header[key]);
                                }
                            }
                        },
                        crossDomain: true,
                        success: function (res) {
                            // 请求成功
                            if (0 == res.status) {
                                typeof param.success === 'function' && param.success(res, res.msg);
                            } else if (10 == res.status) {
                                _this.doLogin();
                            } else {
                                typeof param.error === 'function' && param.error(res.msg, res);
                            }
                        },
                        error: function (err) {
                            if (typeof param.error === 'function') {
                                if (err.responseJSON && err.responseJSON.msg != null) {
                                    param.error(err.responseJSON.msg);
                                } else if (err.responseText) {
                                    param.error(err.responseText);
                                }
                            }
                        }
                    });
                },
                // 获取服务器地址
                getServerUrl: function (path) {
                    return conf.serverHost + path;
                },
                // 获取服务器地址
                getapiServerUrl: function (path) {
                    return conf.apiServerHost + path;
                },
                // 获取服务器地址
                gettradeServerUrl: function (path) {
                    return conf.tradeServerHost + path;
                },
                // 获取服务器地址
                getmarketServerUrl: function (path) {
                    return conf.marketServerHost + path;
                },
                // 获取服务器地址
                getmessageServerUrl: function (path) {
                    return conf.messageServerHost + path;
                },
                // 获取url参数
                getUrlParam: function (name) {
                    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
                    var result = window.location.search.substr(1).match(reg);
                    return result ? decodeURIComponent(result[2]) : null;
                },
                // 渲染html模板
                renderHtml: function (htmlTemplate, data) {
                    ArtTpl.config('extname', '.html');
                    //自定义时间处理helper
                    ArtTpl.helper('dateFormat', function (date, format) {

                        if (typeof date === "string") {
                            date = parseInt(date);
                        }
                        date = new Date(date);
                        if (!date || date.toUTCString() == "Invalid Date") {
                            return "";
                        }

                        var map = {
                            "M": date.getMonth() + 1, //月份
                            "d": date.getDate(), //日
                            "h": date.getHours(), //小时
                            "m": date.getMinutes(), //分
                            "s": date.getSeconds(), //秒
                            "q": Math.floor((date.getMonth() + 3) / 3), //季度
                            "S": date.getMilliseconds() //毫秒
                        };


                        format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
                            var v = map[t];
                            if (v !== undefined) {
                                if (all.length > 1) {
                                    v = '0' + v;
                                    v = v.substr(v.length - 2);
                                }
                                return v;
                            } else if (t === 'y') {
                                return (date.getFullYear() + '').substr(4 - all.length);
                            }
                            return all;
                        });
                        return format;
                    });
                    ArtTpl.helper('formatNumber', function (value, pad, needDouble) {
                        var pad = pad ? parseInt(pad, 10) : 2; // 默认保留两位小数
                        if (/^\d$/.test(value)) { // 整数不处理
                        } else {
                            value = parseFloat(value, 10).toFixed(pad);
                        }
                        value = parseFloat(value, 10);
                        if (needDouble) {
                            value = value * 2;
                        }
                        return value;
                    });
                    var template = ArtTpl.compile(htmlTemplate), //Hogan artTpl
                        result = template(data);
                    return result;
                },
                openNewPage: function (url) {
                    var a = document.createElement("a"); //创建a对象
                    a.setAttribute("href", url);
                    a.setAttribute("target", "_blank");
                    a.setAttribute("id", "camnpr");
                    document.body.appendChild(a);
                    a.click(); //执行当前对象

                },
                // 成功提示
                successTips: function (msg) {
                    alertBox('body', msg || '操作成功！');
                },
                // 错误提示
                errorTips: function (msg) {
                    alertBox('body', msg || '哪里不对了~');
                },
                // 字段的验证，支持非空、手机、邮箱的判断
                validate: function (value, type) {
                    var value = $.trim(value);
                    // 非空验证
                    if ('require' === type) {
                        return !!value;
                    }
                    //密码6-20位验证
                    if ('pwdReg' === type) {
                        return /^[\s\S]{6,20}$/.test(value);
                        // return /^[\x21-\x7E]{6,20}$/.test(value);
                        //return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value);
                    }
                    // 手机号验证
                    if ('phone' === type) {
                        // return /^((13[0-9])|(14[0-9])|(15([0-9]))|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/.test(value);
                        return /^1\d{10}$/.test(value);
                    }
                    // 邮箱格式验证
                    if ('email' === type) {
                        return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value);
                        // return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
                    }
                    // 需求数量验证（正整数）
                    if ('reqCount' === type) {
                        return /^[1-9]\d*$/.test(value);
                    }
                },
                //金额处理，保留两位小数
                toFloat: function (num) {
                    num += '';
                    num = num.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符

                    if (/^0+/) //清除字符串开头的0
                        num = num.replace(/^0+/, '');
                    if (!/\./.test(num)) //为整数字符串在末尾添加.00
                        num += '.00';
                    if (/^\./.test(num)) //字符以.开头时,在开头添加0
                        num = '0' + num;
                    num += '00'; //在字符串末尾补零
                    num = num.match(/\d+\.\d{2}/)[0];
                    return num;
                },
                /**
                 * 非数值判断
                 */
                isNaN: function ( /*Number|String*/ v) {
                    var rt = true;
                    if (this.isNull(v) == false) {
                        if (number_format.test(v)) {
                            rt = false;
                        }
                    }
                    return rt;
                },
                isMobileNum: function ( /*String*/ v) {
                    var phoneNum = /^1\d{10}$/;
                    var rt = true;
                    if (this.isNull(v) == false) {
                        if (phoneNum.test(v)) {
                            rt = false;
                        }
                    }
                    return rt;
                },
                getCookie: function (sName) {
                    var aCookie = document.cookie.split("; ");
                    for (var i = 0; i < aCookie.length; i++) {
                        var aCrumb = aCookie[i].split("=");
                        if (sName == aCrumb[0]) {
                            aCrumb.shift();
                            return decodeURIComponent(aCrumb.join("="));
                        }
                    }
                    return '';
                },
                setCookie: function (sName, sValue, sExpires, dm, path) {
                    var sCookie = sName + "=" + encodeURIComponent(sValue),
                        dm = dm || ".ehaoyao.com",
                        sExpires = sExpires || 30,
                        path = path || "/";
                    if (sExpires != null) {
                        var today = new Date(),
                            d = new Date(today.getTime() + (sExpires * 1000 * 60 * 60 * 24));
                        sCookie += "; expires=" + d.toUTCString() + "; domain=" + dm + "; path=" +
                            path;
                    }
                    document.cookie = sCookie;
                },
                removeCookie: function (sName, dm, path) {
                    var dm = dm || location.hostname;
                    var path = path || '/';
                    document.cookie = sName +
                        "=; expires=Fri, 31 Dec 1999 23:59:59 GMT; domain=" + dm + "; path=" +
                        path;
                },
                // 统一登录处理
                doLogin: function () {
                    window.location.href = conf.host + '/login.html';
                    //window.location.href = conf.host+'/login.html?redirect=' + encodeURIComponent(window.location.href);
                },
                goHome: function () {
                    window.location.href = conf.host + '/index.html';
                },
                //对象是否为空
                isEmptyObject: function (e) {
                    for (var t in e)
                        return !1;
                    return !0
                },
                //空判断
                isNull: function ( /*String*/ v) {
                    var rt = true;
                    if (v) {
                        v = jQuery.trim(v);
                        if (v.length > 0) {
                            rt = false;
                        }
                    }
                    return rt;
                },
                getPageName: function (path) {
                    var pageName = '未记录页面';
                    var dictionary = {
                        '/': '首页',
                        '/index.html': '首页',
                        '/login.html': '登录页',
                        '/register.html': '注册页',
                        '/shoppingCart.html': '购物车',
                        '/product': '商品详情页',
                        '/search': '搜索页',
                        '/products': '分类页',
                        '/orderConfirm.html': '订单确认页',
                        '/userHome.html': '会员首页',
                        '/userInfo.html': '个人信息',
                        '/userAddress.html': '地址管理',
                        '/userSecure.html': '账户安全',
                        '/userCoupon.html': '优惠券',
                        '/userRecharge.html': '充值中心',
                        '/userExchange.html': '积分兑换',
                        '/userFavorite.html': '用户收藏',
                        '/userLog.html': '浏览记录',
                        '/orderList.html': '我的订单',
                        '/myRequirement.html': '我的需求',
                        '/receiveCoupon.html': '精选优惠券'
                    }
                    if (path.indexOf('ehaoyao') > -1) {
                        pageName = '';
                    } else if (path.indexOf('/products/') > -1) {
                        pageName = '分类页';
                    } else if (path.indexOf('/product-') > -1) {
                        pageName = '商品详情页';
                    } else if (path.indexOf('/search') > -1) {
                        pageName = '搜索页';
                    } else if (dictionary[path]) {
                        pageName = dictionary[path];
                    }
                    return pageName;
                }
            };

            module.exports = _http;
            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2), __webpack_require__(2)))

        /***/
}),
/* 54 */
/***/ (function (module, exports, __webpack_require__) {

        /*!
         * artTemplate[NodeJS]
         * https://github.com/aui/artTemplate
         * Released under the MIT, BSD, and GPL Licenses
         */

        var node = __webpack_require__(55);
        var template = __webpack_require__(59);
        module.exports = node(template);

        /***/
}),
/* 55 */
/***/ (function (module, exports, __webpack_require__) {

        var fs = __webpack_require__(56);
        var path = __webpack_require__(57);

        module.exports = function (template) {

            var cacheStore = template.cache;
            var defaults = template.defaults;
            var rExtname;

            // 提供新的配置字段
            defaults.base = '';
            defaults.extname = '.html';
            defaults.encoding = 'utf-8';

            function compileFromFS(filename) {
                // 加载模板并编译
                var source = readTemplate(filename);

                if (typeof source === 'string') {
                    return template.compile(source, {
                        filename: filename
                    });
                }
            }

            // 重写引擎编译结果获取方法
            template.get = function (filename) {

                var fn;


                if (cacheStore.hasOwnProperty(filename)) {
                    // 使用内存缓存
                    fn = cacheStore[filename];
                } else {
                    fn = compileFromFS(filename);
                }

                return fn;
            };


            function readTemplate(id) {
                id = path.join(defaults.base, id + defaults.extname);

                if (id.indexOf(defaults.base) !== 0) {
                    // 安全限制：禁止超出模板目录之外调用文件
                    throw new Error('"' + id + '" is not in the template directory');
                } else {
                    try {
                        return fs.readFileSync(id, defaults.encoding);
                    } catch (e) { }
                }
            }


            // 重写模板`include``语句实现方法，转换模板为绝对路径
            template.utils.$include = function (filename, data, from) {

                from = path.dirname(from);
                filename = path.join(from, filename);

                return template.renderFile(filename, data);
            }


            // express support
            template.__express = function (file, options, fn) {

                if (typeof options === 'function') {
                    fn = options;
                    options = {};
                }


                if (!rExtname) {
                    // 去掉 express 传入的路径
                    rExtname = new RegExp((defaults.extname + '$').replace(/\./g, '\\.'));
                }


                file = file.replace(rExtname, '');

                options.filename = file;
                fn(null, template.renderFile(file, options));
            };


            return template;
        }

        /***/
}),
/* 56 */
/***/ (function (module, exports) {



        /***/
}),
/* 57 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function (process) {// Copyright Joyent, Inc. and other Node contributors.
            //
            // Permission is hereby granted, free of charge, to any person obtaining a
            // copy of this software and associated documentation files (the
            // "Software"), to deal in the Software without restriction, including
            // without limitation the rights to use, copy, modify, merge, publish,
            // distribute, sublicense, and/or sell copies of the Software, and to permit
            // persons to whom the Software is furnished to do so, subject to the
            // following conditions:
            //
            // The above copyright notice and this permission notice shall be included
            // in all copies or substantial portions of the Software.
            //
            // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
            // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
            // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
            // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
            // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
            // USE OR OTHER DEALINGS IN THE SOFTWARE.

            // resolves . and .. elements in a path array with directory names there
            // must be no slashes, empty elements, or device names (c:\) in the array
            // (so also no leading and trailing slashes - it does not distinguish
            // relative and absolute paths)
            function normalizeArray(parts, allowAboveRoot) {
                // if the path tries to go above the root, `up` ends up > 0
                var up = 0;
                for (var i = parts.length - 1; i >= 0; i--) {
                    var last = parts[i];
                    if (last === '.') {
                        parts.splice(i, 1);
                    } else if (last === '..') {
                        parts.splice(i, 1);
                        up++;
                    } else if (up) {
                        parts.splice(i, 1);
                        up--;
                    }
                }

                // if the path is allowed to go above the root, restore leading ..s
                if (allowAboveRoot) {
                    for (; up--; up) {
                        parts.unshift('..');
                    }
                }

                return parts;
            }

            // Split a filename into [root, dir, basename, ext], unix version
            // 'root' is just a slash, or nothing.
            var splitPathRe =
                /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
            var splitPath = function (filename) {
                return splitPathRe.exec(filename).slice(1);
            };

            // path.resolve([from ...], to)
            // posix version
            exports.resolve = function () {
                var resolvedPath = '',
                    resolvedAbsolute = false;

                for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                    var path = (i >= 0) ? arguments[i] : process.cwd();

                    // Skip empty and invalid entries
                    if (typeof path !== 'string') {
                        throw new TypeError('Arguments to path.resolve must be strings');
                    } else if (!path) {
                        continue;
                    }

                    resolvedPath = path + '/' + resolvedPath;
                    resolvedAbsolute = path.charAt(0) === '/';
                }

                // At this point the path should be resolved to a full absolute path, but
                // handle relative paths to be safe (might happen when process.cwd() fails)

                // Normalize the path
                resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
                    return !!p;
                }), !resolvedAbsolute).join('/');

                return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
            };

            // path.normalize(path)
            // posix version
            exports.normalize = function (path) {
                var isAbsolute = exports.isAbsolute(path),
                    trailingSlash = substr(path, -1) === '/';

                // Normalize the path
                path = normalizeArray(filter(path.split('/'), function (p) {
                    return !!p;
                }), !isAbsolute).join('/');

                if (!path && !isAbsolute) {
                    path = '.';
                }
                if (path && trailingSlash) {
                    path += '/';
                }

                return (isAbsolute ? '/' : '') + path;
            };

            // posix version
            exports.isAbsolute = function (path) {
                return path.charAt(0) === '/';
            };

            // posix version
            exports.join = function () {
                var paths = Array.prototype.slice.call(arguments, 0);
                return exports.normalize(filter(paths, function (p, index) {
                    if (typeof p !== 'string') {
                        throw new TypeError('Arguments to path.join must be strings');
                    }
                    return p;
                }).join('/'));
            };


            // path.relative(from, to)
            // posix version
            exports.relative = function (from, to) {
                from = exports.resolve(from).substr(1);
                to = exports.resolve(to).substr(1);

                function trim(arr) {
                    var start = 0;
                    for (; start < arr.length; start++) {
                        if (arr[start] !== '') break;
                    }

                    var end = arr.length - 1;
                    for (; end >= 0; end--) {
                        if (arr[end] !== '') break;
                    }

                    if (start > end) return [];
                    return arr.slice(start, end - start + 1);
                }

                var fromParts = trim(from.split('/'));
                var toParts = trim(to.split('/'));

                var length = Math.min(fromParts.length, toParts.length);
                var samePartsLength = length;
                for (var i = 0; i < length; i++) {
                    if (fromParts[i] !== toParts[i]) {
                        samePartsLength = i;
                        break;
                    }
                }

                var outputParts = [];
                for (var i = samePartsLength; i < fromParts.length; i++) {
                    outputParts.push('..');
                }

                outputParts = outputParts.concat(toParts.slice(samePartsLength));

                return outputParts.join('/');
            };

            exports.sep = '/';
            exports.delimiter = ':';

            exports.dirname = function (path) {
                var result = splitPath(path),
                    root = result[0],
                    dir = result[1];

                if (!root && !dir) {
                    // No dirname whatsoever
                    return '.';
                }

                if (dir) {
                    // It has a dirname, strip trailing slash
                    dir = dir.substr(0, dir.length - 1);
                }

                return root + dir;
            };


            exports.basename = function (path, ext) {
                var f = splitPath(path)[2];
                // TODO: make this comparison case-insensitive on windows?
                if (ext && f.substr(-1 * ext.length) === ext) {
                    f = f.substr(0, f.length - ext.length);
                }
                return f;
            };


            exports.extname = function (path) {
                return splitPath(path)[3];
            };

            function filter(xs, f) {
                if (xs.filter) return xs.filter(f);
                var res = [];
                for (var i = 0; i < xs.length; i++) {
                    if (f(xs[i], i, xs)) res.push(xs[i]);
                }
                return res;
            }

            // String.prototype.substr - negative index don't work in IE8
            var substr = 'ab'.substr(-1) === 'b'
                ? function (str, start, len) { return str.substr(start, len) }
                : function (str, start, len) {
                    if (start < 0) start = str.length + start;
                    return str.substr(start, len);
                }
                ;

            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(58)))

        /***/
}),
/* 58 */
/***/ (function (module, exports) {

        // shim for using process in browser
        var process = module.exports = {};

        // cached from whatever global is present so that test runners that stub it
        // don't break things.  But we need to wrap it in a try catch in case it is
        // wrapped in strict mode code which doesn't define any globals.  It's inside a
        // function because try/catches deoptimize in certain engines.

        var cachedSetTimeout;
        var cachedClearTimeout;

        function defaultSetTimout() {
            throw new Error('setTimeout has not been defined');
        }
        function defaultClearTimeout() {
            throw new Error('clearTimeout has not been defined');
        }
        (function () {
            try {
                if (typeof setTimeout === 'function') {
                    cachedSetTimeout = setTimeout;
                } else {
                    cachedSetTimeout = defaultSetTimout;
                }
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                if (typeof clearTimeout === 'function') {
                    cachedClearTimeout = clearTimeout;
                } else {
                    cachedClearTimeout = defaultClearTimeout;
                }
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        }())
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) {
                //normal enviroments in sane situations
                return setTimeout(fun, 0);
            }
            // if setTimeout wasn't available but was latter defined
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                cachedSetTimeout = setTimeout;
                return setTimeout(fun, 0);
            }
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }


        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) {
                //normal enviroments in sane situations
                return clearTimeout(marker);
            }
            // if clearTimeout wasn't available but was latter defined
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                cachedClearTimeout = clearTimeout;
                return clearTimeout(marker);
            }
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                    // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                    return cachedClearTimeout.call(this, marker);
                }
            }



        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;

        function cleanUpNextTick() {
            if (!draining || !currentQueue) {
                return;
            }
            draining = false;
            if (currentQueue.length) {
                queue = currentQueue.concat(queue);
            } else {
                queueIndex = -1;
            }
            if (queue.length) {
                drainQueue();
            }
        }

        function drainQueue() {
            if (draining) {
                return;
            }
            var timeout = runTimeout(cleanUpNextTick);
            draining = true;

            var len = queue.length;
            while (len) {
                currentQueue = queue;
                queue = [];
                while (++queueIndex < len) {
                    if (currentQueue) {
                        currentQueue[queueIndex].run();
                    }
                }
                queueIndex = -1;
                len = queue.length;
            }
            currentQueue = null;
            draining = false;
            runClearTimeout(timeout);
        }

        process.nextTick = function (fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                }
            }
            queue.push(new Item(fun, args));
            if (queue.length === 1 && !draining) {
                runTimeout(drainQueue);
            }
        };

        // v8 likes predictible objects
        function Item(fun, array) {
            this.fun = fun;
            this.array = array;
        }
        Item.prototype.run = function () {
            this.fun.apply(null, this.array);
        };
        process.title = 'browser';
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = ''; // empty string to avoid regexp issues
        process.versions = {};

        function noop() { }

        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;

        process.listeners = function (name) { return [] }

        process.binding = function (name) {
            throw new Error('process.binding is not supported');
        };

        process.cwd = function () { return '/' };
        process.chdir = function (dir) {
            throw new Error('process.chdir is not supported');
        };
        process.umask = function () { return 0; };


        /***/
}),
/* 59 */
/***/ (function (module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * artTemplate - Template Engine
	 * https://github.com/aui/artTemplate
	 * Released under the MIT, BSD, and GPL Licenses
	 */

        !(function () {


            /**
             * 模板引擎
             * @name    template
             * @param   {String}            模板名
             * @param   {Object, String}    数据。如果为字符串则编译并缓存编译结果
             * @return  {String, Function}  渲染好的HTML字符串或者渲染方法
             */
            var template = function (filename, content) {
                return typeof content === 'string'
                    ? compile(content, {
                        filename: filename
                    })
                    : renderFile(filename, content);
            };


            template.version = '3.0.0';


            /**
             * 设置全局配置
             * @name    template.config
             * @param   {String}    名称
             * @param   {Any}       值
             */
            template.config = function (name, value) {
                defaults[name] = value;
            };



            var defaults = template.defaults = {
                openTag: '<%',    // 逻辑语法开始标签
                closeTag: '%>',   // 逻辑语法结束标签
                escape: true,     // 是否编码输出变量的 HTML 字符
                cache: true,      // 是否开启缓存（依赖 options 的 filename 字段）
                compress: false,  // 是否压缩输出
                parser: null      // 自定义语法格式器 @see: template-syntax.js
            };


            var cacheStore = template.cache = {};


            /**
             * 渲染模板
             * @name    template.render
             * @param   {String}    模板
             * @param   {Object}    数据
             * @return  {String}    渲染好的字符串
             */
            template.render = function (source, options) {
                return compile(source)(options);
            };


            /**
             * 渲染模板(根据模板名)
             * @name    template.render
             * @param   {String}    模板名
             * @param   {Object}    数据
             * @return  {String}    渲染好的字符串
             */
            var renderFile = template.renderFile = function (filename, data) {
                var fn = template.get(filename) || showDebugInfo({
                    filename: filename,
                    name: 'Render Error',
                    message: 'Template not found'
                });
                return data ? fn(data) : fn;
            };


            /**
             * 获取编译缓存（可由外部重写此方法）
             * @param   {String}    模板名
             * @param   {Function}  编译好的函数
             */
            template.get = function (filename) {

                var cache;

                if (cacheStore[filename]) {
                    // 使用内存缓存
                    cache = cacheStore[filename];
                } else if (typeof document === 'object') {
                    // 加载模板并编译
                    var elem = document.getElementById(filename);

                    if (elem) {
                        var source = (elem.value || elem.innerHTML)
                            .replace(/^\s*|\s*$/g, '');
                        cache = compile(source, {
                            filename: filename
                        });
                    }
                }

                return cache;
            };


            var toString = function (value, type) {

                if (typeof value !== 'string') {

                    type = typeof value;
                    if (type === 'number') {
                        value += '';
                    } else if (type === 'function') {
                        value = toString(value.call(value));
                    } else {
                        value = '';
                    }
                }

                return value;

            };


            var escapeMap = {
                "<": "&#60;",
                ">": "&#62;",
                '"': "&#34;",
                "'": "&#39;",
                "&": "&#38;"
            };


            var escapeFn = function (s) {
                return escapeMap[s];
            };

            var escapeHTML = function (content) {
                return toString(content)
                    .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
            };


            var isArray = Array.isArray || function (obj) {
                return ({}).toString.call(obj) === '[object Array]';
            };


            var each = function (data, callback) {
                var i, len;
                if (isArray(data)) {
                    for (i = 0, len = data.length; i < len; i++) {
                        callback.call(data, data[i], i, data);
                    }
                } else {
                    for (i in data) {
                        callback.call(data, data[i], i);
                    }
                }
            };


            var utils = template.utils = {

                $helpers: {},

                $include: renderFile,

                $string: toString,

                $escape: escapeHTML,

                $each: each

            };/**
	 * 添加模板辅助方法
	 * @name    template.helper
	 * @param   {String}    名称
	 * @param   {Function}  方法
	 */
            template.helper = function (name, helper) {
                helpers[name] = helper;
            };

            var helpers = template.helpers = utils.$helpers;




            /**
             * 模板错误事件（可由外部重写此方法）
             * @name    template.onerror
             * @event
             */
            template.onerror = function (e) {
                var message = 'Template Error\n\n';
                for (var name in e) {
                    message += '<' + name + '>\n' + e[name] + '\n\n';
                }

                if (typeof console === 'object') {
                    console.error(message);
                }
            };


            // 模板调试器
            var showDebugInfo = function (e) {

                template.onerror(e);

                return function () {
                    return '{Template Error}';
                };
            };


            /**
             * 编译模板
             * 2012-6-6 @TooBug: define 方法名改为 compile，与 Node Express 保持一致
             * @name    template.compile
             * @param   {String}    模板字符串
             * @param   {Object}    编译选项
             *
             *      - openTag       {String}
             *      - closeTag      {String}
             *      - filename      {String}
             *      - escape        {Boolean}
             *      - compress      {Boolean}
             *      - debug         {Boolean}
             *      - cache         {Boolean}
             *      - parser        {Function}
             *
             * @return  {Function}  渲染方法
             */
            var compile = template.compile = function (source, options) {

                // 合并默认配置
                options = options || {};
                for (var name in defaults) {
                    if (options[name] === undefined) {
                        options[name] = defaults[name];
                    }
                }


                var filename = options.filename;


                try {

                    var Render = compiler(source, options);

                } catch (e) {

                    e.filename = filename || 'anonymous';
                    e.name = 'Syntax Error';

                    return showDebugInfo(e);

                }


                // 对编译结果进行一次包装

                function render(data) {

                    try {

                        return new Render(data, filename) + '';

                    } catch (e) {

                        // 运行时出错后自动开启调试模式重新编译
                        if (!options.debug) {
                            options.debug = true;
                            return compile(source, options)(data);
                        }

                        return showDebugInfo(e)();

                    }

                }


                render.prototype = Render.prototype;
                render.toString = function () {
                    return Render.toString();
                };


                if (filename && options.cache) {
                    cacheStore[filename] = render;
                }


                return render;

            };




            // 数组迭代
            var forEach = utils.$each;


            // 静态分析模板变量
            var KEYWORDS =
                // 关键字
                'break,case,catch,continue,debugger,default,delete,do,else,false'
                + ',finally,for,function,if,in,instanceof,new,null,return,switch,this'
                + ',throw,true,try,typeof,var,void,while,with'

                // 保留字
                + ',abstract,boolean,byte,char,class,const,double,enum,export,extends'
                + ',final,float,goto,implements,import,int,interface,long,native'
                + ',package,private,protected,public,short,static,super,synchronized'
                + ',throws,transient,volatile'

                // ECMA 5 - use strict
                + ',arguments,let,yield'

                + ',undefined';

            var REMOVE_RE = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g;
            var SPLIT_RE = /[^\w$]+/g;
            var KEYWORDS_RE = new RegExp(["\\b" + KEYWORDS.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g');
            var NUMBER_RE = /^\d[^,]*|,\d[^,]*/g;
            var BOUNDARY_RE = /^,+|,+$/g;
            var SPLIT2_RE = /^$|,+/;


            // 获取变量
            function getVariable(code) {
                return code
                    .replace(REMOVE_RE, '')
                    .replace(SPLIT_RE, ',')
                    .replace(KEYWORDS_RE, '')
                    .replace(NUMBER_RE, '')
                    .replace(BOUNDARY_RE, '')
                    .split(SPLIT2_RE);
            };


            // 字符串转义
            function stringify(code) {
                return "'" + code
                    // 单引号与反斜杠转义
                    .replace(/('|\\)/g, '\\$1')
                    // 换行符转义(windows + linux)
                    .replace(/\r/g, '\\r')
                    .replace(/\n/g, '\\n') + "'";
            }


            function compiler(source, options) {

                var debug = options.debug;
                var openTag = options.openTag;
                var closeTag = options.closeTag;
                var parser = options.parser;
                var compress = options.compress;
                var escape = options.escape;



                var line = 1;
                var uniq = { $data: 1, $filename: 1, $utils: 1, $helpers: 1, $out: 1, $line: 1 };



                var isNewEngine = ''.trim;// '__proto__' in {}
                var replaces = isNewEngine
                    ? ["$out='';", "$out+=", ";", "$out"]
                    : ["$out=[];", "$out.push(", ");", "$out.join('')"];

                var concat = isNewEngine
                    ? "$out+=text;return $out;"
                    : "$out.push(text);";

                var print = "function(){"
                    + "var text=''.concat.apply('',arguments);"
                    + concat
                    + "}";

                var include = "function(filename,data){"
                    + "data=data||$data;"
                    + "var text=$utils.$include(filename,data,$filename);"
                    + concat
                    + "}";

                var headerCode = "'use strict';"
                    + "var $utils=this,$helpers=$utils.$helpers,"
                    + (debug ? "$line=0," : "");

                var mainCode = replaces[0];

                var footerCode = "return new String(" + replaces[3] + ");"

                // html与逻辑语法分离
                forEach(source.split(openTag), function (code) {
                    code = code.split(closeTag);

                    var $0 = code[0];
                    var $1 = code[1];

                    // code: [html]
                    if (code.length === 1) {

                        mainCode += html($0);

                        // code: [logic, html]
                    } else {

                        mainCode += logic($0);

                        if ($1) {
                            mainCode += html($1);
                        }
                    }


                });

                var code = headerCode + mainCode + footerCode;

                // 调试语句
                if (debug) {
                    code = "try{" + code + "}catch(e){"
                        + "throw {"
                        + "filename:$filename,"
                        + "name:'Render Error',"
                        + "message:e.message,"
                        + "line:$line,"
                        + "source:" + stringify(source)
                        + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')"
                        + "};"
                        + "}";
                }



                try {


                    var Render = new Function("$data", "$filename", code);
                    Render.prototype = utils;

                    return Render;

                } catch (e) {
                    e.temp = "function anonymous($data,$filename) {" + code + "}";
                    throw e;
                }




                // 处理 HTML 语句
                function html(code) {

                    // 记录行号
                    line += code.split(/\n/).length - 1;

                    // 压缩多余空白与注释
                    if (compress) {
                        code = code
                            .replace(/\s+/g, ' ')
                            .replace(/<!--[\w\W]*?-->/g, '');
                    }

                    if (code) {
                        code = replaces[1] + stringify(code) + replaces[2] + "\n";
                    }

                    return code;
                }


                // 处理逻辑语句
                function logic(code) {

                    var thisLine = line;

                    if (parser) {

                        // 语法转换插件钩子
                        code = parser(code, options);

                    } else if (debug) {

                        // 记录行号
                        code = code.replace(/\n/g, function () {
                            line++;
                            return "$line=" + line + ";";
                        });

                    }


                    // 输出语句. 编码: <%=value%> 不编码:<%=#value%>
                    // <%=#value%> 等同 v2.0.3 之前的 <%==value%>
                    if (code.indexOf('=') === 0) {

                        var escapeSyntax = escape && !/^=[=#]/.test(code);

                        code = code.replace(/^=[=#]?|[\s;]*$/g, '');

                        // 对内容编码
                        if (escapeSyntax) {

                            var name = code.replace(/\s*\([^\)]+\)/, '');

                            // 排除 utils.* | include | print

                            if (!utils[name] && !/^(include|print)$/.test(name)) {
                                code = "$escape(" + code + ")";
                            }

                            // 不编码
                        } else {
                            code = "$string(" + code + ")";
                        }


                        code = replaces[1] + code + replaces[2];

                    }

                    if (debug) {
                        code = "$line=" + thisLine + ";" + code;
                    }

                    // 提取模板中的变量名
                    forEach(getVariable(code), function (name) {

                        // name 值可能为空，在安卓低版本浏览器下
                        if (!name || uniq[name]) {
                            return;
                        }

                        var value;

                        // 声明模板变量
                        // 赋值优先级:
                        // [include, print] > utils > helpers > data
                        if (name === 'print') {

                            value = print;

                        } else if (name === 'include') {

                            value = include;

                        } else if (utils[name]) {

                            value = "$utils." + name;

                        } else if (helpers[name]) {

                            value = "$helpers." + name;

                        } else {

                            value = "$data." + name;
                        }

                        headerCode += name + "=" + value + ",";
                        uniq[name] = true;


                    });

                    return code + "\n";
                }


            };



            // 定义模板引擎的语法


            defaults.openTag = '{{';
            defaults.closeTag = '}}';


            var filtered = function (js, filter) {
                var parts = filter.split(':');
                var name = parts.shift();
                var args = parts.join(':') || '';

                if (args) {
                    args = ', ' + args;
                }

                return '$helpers.' + name + '(' + js + args + ')';
            }


            defaults.parser = function (code, options) {

                // var match = code.match(/([\w\$]*)(\b.*)/);
                // var key = match[1];
                // var args = match[2];
                // var split = args.split(' ');
                // split.shift();

                code = code.replace(/^\s/, '');

                var split = code.split(' ');
                var key = split.shift();
                var args = split.join(' ');



                switch (key) {

                    case 'if':

                        code = 'if(' + args + '){';
                        break;

                    case 'else':

                        if (split.shift() === 'if') {
                            split = ' if(' + split.join(' ') + ')';
                        } else {
                            split = '';
                        }

                        code = '}else' + split + '{';
                        break;

                    case '/if':

                        code = '}';
                        break;

                    case 'each':

                        var object = split[0] || '$data';
                        var as = split[1] || 'as';
                        var value = split[2] || '$value';
                        var index = split[3] || '$index';

                        var param = value + ',' + index;

                        if (as !== 'as') {
                            object = '[]';
                        }

                        code = '$each(' + object + ',function(' + param + '){';
                        break;

                    case '/each':

                        code = '});';
                        break;

                    case 'echo':

                        code = 'print(' + args + ');';
                        break;

                    case 'print':
                    case 'include':

                        code = key + '(' + split.join(',') + ');';
                        break;

                    default:

                        // 过滤器（辅助方法）
                        // {{value | filterA:'abcd' | filterB}}
                        // >>> $helpers.filterB($helpers.filterA(value, 'abcd'))
                        // TODO: {{ddd||aaa}} 不包含空格
                        if (/^\s*\|\s*[\w\$]/.test(args)) {

                            var escape = true;

                            // {{#value | link}}
                            if (code.indexOf('#') === 0) {
                                code = code.substr(1);
                                escape = false;
                            }

                            var i = 0;
                            var array = code.split('|');
                            var len = array.length;
                            var val = array[i++];

                            for (; i < len; i++) {
                                val = filtered(val, array[i]);
                            }

                            code = (escape ? '=' : '=#') + val;

                            // 即将弃用 {{helperName value}}
                        } else if (template.helpers[key]) {

                            code = '=#' + key + '(' + split.join(',') + ');';

                            // 内容直接输出 {{value}}
                        } else {

                            code = '=' + code;
                        }

                        break;
                }


                return code;
            };



            // RequireJS && SeaJS
            if (true) {
                !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                    return template;
                }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

                // NodeJS
            } else if (typeof exports !== 'undefined') {
                module.exports = template;
            } else {
                this.template = template;
            }

        })();

        /***/
}),
/* 60 */
/***/ (function (module, exports, __webpack_require__) {


        'use strict';

        var _http = __webpack_require__(53);

        var _search = {
            // 获取热门搜索关键字--未使用
            searchTip: function (resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/mobile/goodsKeys/listXSKeys.json'),
                    success: resolve,
                    error: reject
                });
            },
            //获取搜索框默认显示
            Inputsearch: function (name, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/bigdata/search.json'),
                    data: {
                        name: name
                    },
                    success: resolve,
                    error: reject
                });
            },
            //---未使用 
            Homesearch: function (resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/mds/api/app/apiv3_0/getTips.json'),
                    success: resolve,
                    error: reject
                });
            }
        }
        module.exports = _search;

        /***/
}),
/* 61 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function ($) {
            'use strict';

            var _http = __webpack_require__(53);

            var _cart = {
                // 获取购物车数量
                getCartCount: function (param, resolve, reject) {
                    _http.request({
                        url: _http.gettradeServerUrl('/trade/shopcart/v1/shopcarts/item/catalog/count'),
                        data: param,
                        success: resolve,
                        error: reject
                    });
                },
                // 添加到购物车
                addToCart: function (cartJson, resolve, reject) {
                    _http.applicationRequest({
                        url: _http.gettradeServerUrl('/trade/shopcart/v1/shopcarts'),
                        data: cartJson,
                        success: resolve,
                        error: reject
                    });
                },
                // 立即购买
                buy: function (param, resolve, reject) {
                    _http.applicationRequest({
                        url: _http.gettradeServerUrl('/trade/shopcart/v1/shopcarts/buy'),
                        data: param,
                        success: resolve,
                        error: reject
                    });
                },
                //选中或者取消选中商品
                updateCartSelected: function (cartParam, resolve, reject) {
                    _http.applicationRequest({
                        method: 'put',
                        url: _http.gettradeServerUrl('/trade/shopcart/v1/shopcarts/select'),
                        data: cartParam,
                        success: resolve,
                        error: reject
                    });
                },
                // 获取购物车列表
                getCartList: function (cartParam, resolve, reject) {
                    _http.request({
                        url: _http.gettradeServerUrl('/trade/shopcart/v1/shopcarts'),
                        data: cartParam,
                        success: resolve,
                        error: reject
                    });
                },
                // 选择购物车商品--未使用
                selectProduct: function (productId, resolve, reject) {
                    _http.request({
                        url: _http.getServerUrl('/cart/select.do'),
                        data: {
                            productId: productId
                        },
                        success: resolve,
                        error: reject
                    });
                },
                //待领取优惠券列表
                getGivingCoupons: function (shopInfo, resolve, reject) {
                    // _http.request({
                    //     url: _http.getServerUrl('/mds/api/app/apiv3_0/getGivingCoupons.json'),
                    //     data: shopInfo,
                    //     success: resolve,
                    //     error: reject
                    // });
                    _http.applicationRequest({
                        url: _http.getmarketServerUrl('/adapter/memberCoupon/givingCoupons'),
                        data: shopInfo,
                        success: resolve,
                        error: reject
                    });
                },
                // 领取优惠券
                getCoupons: function (couponId, resolve, reject) {
                    // _http.request({
                    //     url: _http.getServerUrl('/mobile/memberCoupon/getMemberCouponByCouponId.json'),
                    //     data: {
                    //         couponId: couponId,
                    //         "coonType": "3"
                    //     },
                    //     success: resolve,
                    //     error: reject
                    // });
                    _http.applicationRequest({
                        url: _http.getmarketServerUrl('/adapter/memberCoupon/memberCouponByCouponId'),
                        data: {
                            couponId: couponId
                        },
                        success: resolve,
                        error: reject
                    });
                },
                // 更新购物车商品数量
                updateProduct: function (productInfo, resolve, reject) {
                    _http.applicationRequest({
                        url: _http.gettradeServerUrl('/trade/shopcart/v1/shopcarts'),
                        method: 'put',
                        data: productInfo,
                        success: resolve,
                        error: reject
                    });
                },
                // 删除指定商品
                deleteProduct: function (cartInfo, resolve, reject) {
                    _http.applicationRequest({
                        url: _http.gettradeServerUrl('/trade/shopcart/v1/shopcarts/delete'),
                        method: 'put',
                        data: cartInfo,
                        success: resolve,
                        error: reject
                    });
                },
                // 批量删除指定商品
                batchDeleteProduct: function (cartInfo, resolve, reject) {
                    _http.applicationRequest({
                        url: _http.gettradeServerUrl('/trade/shopcart/v1/shopcarts/batch-delete'),
                        method: 'post',
                        data: cartInfo,
                        success: resolve,
                        error: reject
                    });
                },
                // 修改优惠--未使用
                updateCartActivity: function (updateCartInfo, resolve, reject) {
                    _http.request({
                        url: _http.getServerUrl('/mds/api/app/apiv3_0/updateCartActivity3_0.json'),
                        data: updateCartInfo,
                        success: resolve,
                        error: reject
                    });
                },
                //获取购物车商品可用参加的活动列表详情接口
                getActivityInfo: function (info, resolve, reject) {
                    _http.request({
                        url: _http.getmarketServerUrl('/adapter/activities'),
                        header: { isRest: 'true' },
                        data: $.extend({ coonType: '2' }, info),
                        success: resolve,
                        error: reject
                    });
                }
            }
            module.exports = _cart;
            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

        /***/
}),
/* 62 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function ($) {
            'use strict';

            var _http = __webpack_require__(53);

            var _user = {
                // 用户登录
                login: function (userInfo, resolve, reject) {
                    _http.request({
                        url: _http.getapiServerUrl('/mobile/account/login.json'),
                        method: 'post',
                        data: userInfo,
                        success: resolve,
                        error: reject
                    });
                },
                //三方快速登录--未使用
                quickLogin: function (userInfo, resolve, reject) {
                    _http.request({
                        url: _http.getapiServerUrl('/mds/api/app/apiv2_3/otherQuickLogin.json'),
                        data: userInfo,
                        success: resolve,
                        error: reject
                    });
                },
                // 用户注册
                register: function (userInfo, resolve, reject) {
                    _http.request({
                        url: _http.getapiServerUrl('/mobile/account/register.json'),
                        method: 'post',
                        data: userInfo,
                        success: resolve,
                        error: reject
                    });
                },
                // 重置密码--未使用
                resetPassword: function (userInfo, resolve, reject) {
                    _http.request({
                        url: _http.getServerUrl('/user/forget_reset_password.do'),
                        data: userInfo,
                        success: resolve,
                        error: reject
                    });
                },
                // 获取用户信息--未使用
                getUserInfo: function (resolve, reject) {
                    _http.request({
                        url: _http.getServerUrl('/user/get_information.do'),
                        success: resolve,
                        error: reject
                    });
                },
                // 更新个人信息--未使用
                updateUserInfo: function (userInfo, resolve, reject) {
                    _http.request({
                        url: _http.getServerUrl('/user/update_information.do'),
                        data: userInfo,
                        success: resolve,
                        error: reject
                    });
                },
                // 登录状态下更新密码--未使用
                updatePassword: function (userInfo, resolve, reject) {
                    _http.request({
                        url: _http.getServerUrl('/user/reset_password.do'),
                        data: userInfo,
                        success: resolve,
                        error: reject
                    });
                },
                // 登出
                logout: function (username, resolve, reject) {
                    _http.request({
                        url: _http.getapiServerUrl('/mobile/account/logout.json'),
                        method: 'post',
                        data: {},
                        success: resolve,
                        error: reject
                    });
                },
                //注销账户
                logoff: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getapiServerUrl('/mobile/account/cancellation.json'),
                        method: 'post',
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                // 获取用户浏览记录
                getMyTracks: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getServerUrl('/mobile/memberTracks/myTracks3_0_gw.json'),
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                // 提交意见反馈
                addFeed: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getServerUrl('/mobile/feed/addfeed.json'),
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                // 短信快捷登录
                mobileFastLogin: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getapiServerUrl('/mobile/account/mobileFastLogin.json'),
                        method: 'post',
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                // 获取验证码--不校验图形验证码
                getCode: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getapiServerUrl('/mobile/account/getCode.json'),
                        method: 'post',
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                // 获取用户信息
                getMemberInformationPc: function (resolve, reject) {
                    _http.request({
                        url: _http.getapiServerUrl('/stepToWin/getMemberInformation.json'),
                        data: {},
                        success: resolve,
                        error: reject
                    });
                },
                // 用户收藏药品
                getListGoods: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getServerUrl('/mobile/memberCollection/listGoods3_0.json'),
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                // 删除用户收藏药品
                deleteGoods: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getServerUrl('/mobile/memberCollection/deleteGoods.json'),
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                // 删除用户浏览记录
                deleteTracksGoods: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getServerUrl('/mobile/memberTracks/deleteGoods.json'),
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                //我的优惠券
                mylistCoupon: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getServerUrl('/mds/api/app/apiv3_0/listCoupon.json'),
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                //兑换列表
                exchangeList: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getServerUrl('/mds/api/app/apiv3_0/getExchangeableCoupon.json'),
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                //兑换优惠券 
                exchangeCoupon: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getServerUrl('/mds/api/app/apiv3_0/exchangeCoupon.json'),
                        method: 'post',
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                //获取充值卡金额
                getRechargeAmount: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getServerUrl('/recharge/getcardinfo'),
                        method: 'post',
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                //充值卡充值
                rechargeCard: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getServerUrl('/recharge/rechargeCard'),
                        method: 'post',
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                //在线充值
                onlinePay: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getServerUrl('/recharge/checkPayInfo'),
                        method: 'post',
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                //充值账单
                getRechargeList: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getapiServerUrl('/amount/list'),
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                // 修改用户密码
                updatePasswordPc: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getapiServerUrl('/mobile/account/updatePassword.json'),
                        method: 'post',
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                // 更新用户信息
                updateMemberInformation: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getapiServerUrl('/stepToWin/memberInformation.json'),
                        method: 'post',
                        data: $.extend({ userId: _http.getCookie('accountId') }, data),
                        success: resolve,
                        error: reject
                    });
                },
                // 手机解绑与新手机绑定获取验证码
                sendCode: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getapiServerUrl('/mobile/account/sendCode.json'),
                        method: 'post',
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                // 手机解绑
                unbindMobile: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getapiServerUrl('/mobile/account/unbindMobile.json'),
                        method: 'post',
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                // 与新手机绑定
                editBindMobile: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getapiServerUrl('/mobile/account/editBindMobile.json'),
                        method: 'post',
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                // 获取短信验证码并验证图形验证码
                sendWithVerifyCode: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getapiServerUrl('/mobile/account/getPicCode.json'),
                        method: 'post',
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                //找回密码-提交验证
                verifyRetrieveCode: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getapiServerUrl('/mobile/account/verifyRetrieveCode.json'),
                        method: 'post',
                        data: data,
                        success: resolve,
                        error: reject
                    });
                },
                //找回密码-修改密码
                retrievePassword: function (data, resolve, reject) {
                    _http.request({
                        url: _http.getapiServerUrl('/mobile/account/retrievePassword.json'),
                        method: 'post',
                        data: data,
                        success: resolve,
                        error: reject
                    });
                }
            }
            module.exports = _user;
            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

        /***/
}),
/* 63 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function ($) {
            'use strict';
            __webpack_require__(64);
            __webpack_require__(73);
            var tpl = __webpack_require__(74);
            var _http = __webpack_require__(53);
            var _login = __webpack_require__(62);

            var LoginContent = function () {
                var _this = this;
                this.init = function (fn) {
                    _this.flag = true;
                    _this.time = 59;
                    _this.timeStamp;
                    _this.bindEvent(fn);
                    _this.refreshCodePic();
                },
                    this.render = function () {
                        var cont = _http.renderHtml(tpl, {});
                        return cont;
                    },
                    this.bindEvent = function (fn) {
                        var _this = this;
                        var $phone = $('#telphone');
                        var $code = $('#noteCode');
                        var $codePic = $('#authCode');
                        var $lgnAccount = $('.accountBox');
                        var $lgnPhone = $('.telphoneBox');
                        var $loginName = $('#loginName');
                        var $loginPwd = $('#loginPwd');

                        $('#lgnByaccount').on('click', function () {
                            $lgnPhone.addClass('none');
                            $lgnAccount.removeClass('none');
                        });
                        $('#lgnBytelphone').on('click', function () {
                            $lgnAccount.addClass('none');
                            $lgnPhone.removeClass('none');
                        });
                        $('.authCodeBox').on('click', function () {
                            _this.refreshCodePic();
                        });
                        // 获取验证码
                        $('.noteCodeBox').on('click', function () {
                            ehyTrack.track('点击发送验证码_登录', {});
                            if (!_this.validateMobile($phone.val())) return;
                            if (!_this.validateCodePic($codePic.val())) return;
                            if (!_this.flag) return;
                            _this.flag = false;
                            _login.sendWithVerifyCode({
                                mobile: $phone.val(),
                                type: '13',
                                timestamp: _this.timeStamp,
                                verifyCode: $codePic.val()
                            },
                                function (res) {
                                    _this.countDown();
                                    //_this.refreshCodePic();
                                },
                                function (msg) {
                                    _this.flag = true;
                                    _this.refreshCodePic();
                                    alertBox('body', msg);
                                }
                            );
                        });
                        // 点击登录
                        $('#submitLogin').on('click', function () {
                            ehyTrack.track('点击登录', {});
                            if (!_this.validateMobile($phone.val()) || !_this.validateCode($code.val())) return;
                            _login.mobileFastLogin({
                                mobile: $phone.val(),
                                code: $code.val()
                            },
                                function (res) {
                                    //请求接口
                                    var sid = res.data.sid,
                                        aId = res.data.userId,
                                        username = res.data.username,
                                        name = res.data.name,
                                        mobile = res.data.mobile || '',
                                        passWord = res.data.password;
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
                                    if ($(".chkbox1").is(':checked')) {
                                        _http.setCookie('autoUsername', mobile, '7', location.hostname);
                                        _http.setCookie('autoPassword', passWord, '7', location.hostname);
                                    }
                                    // 埋点
                                    ehyTrack.identify(aId, {
                                        '会员积分': points,
                                        '性别': sex == 1 ? '女' : '男',
                                        '年龄': age,
                                        '手机号': mobile,
                                        '帐号余额': balance,
                                        '优惠券数量': coupons
                                    });
                                    ehyTrack.track('登录成功', {
                                        '登录方式': '短信快捷登录'
                                    });
                                    if (fn) {
                                        fn && fn();
                                    } else {
                                        _this.redirect();
                                    }
                                    loadLogin();
                                },
                                function (errorMsg) {
                                    ehyTrack.track('登录失败', {
                                        '失败原因': errorMsg
                                    });
                                    $('.item-tips-code').html(errorMsg);
                                }
                            );
                        });
                        // 账号密码登录
                        $('#submitLogin2').on('click', function () {
                            ehyTrack.track('点击登录', {});
                            if (!_this.validateLoginName($loginName.val()) || !_this.validateLoginPwd($loginPwd.val())) return;
                            _login.login({
                                username: $loginName.val(),
                                password: $.md5($loginPwd.val())
                            },
                                function (res) {
                                    //请求接口
                                    var sid = res.data.sid,
                                        aId = res.data.userId,
                                        username = res.data.username,
                                        name = res.data.name,
                                        mobile = res.data.mobile || '',
                                        passWord = res.data.password;
                                    var age = res.data.age,
                                        balance = res.data.balance,
                                        points = res.data.points,
                                        coupons = res.data.coupons,
                                        sex = res.data.sex;

                                    // _http.setCookie('sid', sid, '0.25');
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

                                    if ($(".chkbox2").is(':checked')) {
                                        _http.setCookie('autoUsername', $loginName.val(), '7', location.hostname);
                                        _http.setCookie('autoPassword', $.md5($loginPwd.val()), '7', location.hostname);
                                    }
                                    // 埋点
                                    ehyTrack.identify(aId, {
                                        '会员积分': points,
                                        '性别': sex == 1 ? '女' : '男',
                                        '年龄': age,
                                        '手机号': mobile,
                                        '帐号余额': balance,
                                        '优惠券数量': coupons
                                    });
                                    ehyTrack.track('登录成功', {
                                        '登录方式': '账号密码登录'
                                    });
                                    if (fn) {
                                        fn && fn();
                                    } else {
                                        _this.redirect();
                                    }
                                    loadLogin();
                                },
                                function (errorMsg) {
                                    ehyTrack.track('登录失败', {
                                        '失败原因': errorMsg
                                    });
                                    $('.item-tips-login-pwd').html(errorMsg);
                                }
                            );
                        });

                        $("body").keydown(function () {
                            if (event.keyCode == "13") {
                                if ($('.telphoneBox').hasClass('none')) {
                                    $('#submitLogin2').click();
                                } else {
                                    $('#submitLogin').click();
                                }
                            }
                        });
                        $('#telphone').on('change', function () {
                            _this.validateMobile($(this).val());
                        });
                        $('#noteCode').on('change', function () {
                            _this.validateCode($(this).val());
                        });
                        $('#loginName').on('change', function () {
                            _this.validateLoginName($(this).val());
                        });
                        $('#loginPwd').on('change', function () {
                            _this.validateLoginPwd($(this).val());
                        });

                        $('.clear-btn-tp').on('click', function () {
                            $phone.val('');
                        });
                        $('.clear-btn-ln').on('click', function () {
                            $loginName.val('');
                        });
                        $('.clear-btn-lp').on('click', function () {
                            $loginPwd.val('');
                        });

                        //注册
                        $('.btn_registNow a').on('click', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.href = _http.host + '/register.html';
                        });
                        $('.logo').off("click").on('click', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.href = _http.host;
                        });
                    },

                    this.refreshCodePic = function () {
                        this.timeStamp = new Date() * 1;
                        $('.authCodeBox img')[0].src = _http.getapiServerUrl('/mobile/account/getVerifyCode.json?timestamp=' + this.timeStamp);
                    },

                    this.redirect = function () {
                        var jump_url = _http.getCookie('jump_url');
                        if (jump_url) {
                            _http.removeCookie('jump_url');
                            window.location.href = jump_url;
                        } else {
                            _http.goHome();
                        }

                    },

                    this.formatQuery = function () {
                        var queryString = location.search.slice(1);
                        var query = {};
                        if (!queryString) return '';

                        $.each(queryString.split('&'), function (k, v) {
                            query[v.split('=')[0]] = decodeURIComponent(v.split('=')[1]);
                        });
                        return query;
                    },

                    this.validateMobile = function (mobile) {
                        var $tipsPhone = $('.item-tips-phone');
                        if (_http.validate(mobile, 'phone')) {
                            $tipsPhone.html('');
                            return true;
                        } else {
                            $tipsPhone.html('请输入正确的手机号');
                            return false;
                        }
                    },

                    this.validateCode = function (code) {
                        var $tipsCode = $('.item-tips-code');
                        if (_http.validate(code, 'require')) {
                            $tipsCode.html('');
                            return true;
                        } else {
                            $tipsCode.html('请输入验证码');
                            return false;
                        }
                    },

                    this.validateCodePic = function (code) {
                        var $tipsCode = $('.item-tips-code-pic');
                        if (_http.validate(code, 'require')) {
                            $tipsCode.html('');
                            return true;
                        } else {
                            $tipsCode.html('请输入验证码');
                            return false;
                        }
                    },

                    this.validateLoginName = function (name) {
                        var $tipsCode = $('.item-tips-login-name');
                        if (_http.validate(name, 'require')) {
                            $tipsCode.html('');
                            return true;
                        } else {
                            $tipsCode.html('请输入账号');
                            return false;
                        }
                    },

                    this.validateLoginPwd = function (pwd) {
                        var $tipsCode = $('.item-tips-login-pwd');
                        if (_http.validate(pwd, 'require')) {
                            $tipsCode.html('');
                            return true;
                        } else {
                            $tipsCode.html('请输入密码');
                            return false;
                        }
                    },

                    this.countDown = function () {
                        var _this = this;
                        var $el = $('.noteCodeBox');
                        $el.html('<span style="color:#ccc;">60s</span>');
                        var timer = setInterval(function () {
                            if (--_this.time <= 0) {
                                clearInterval(timer);
                                _this.flag = true;
                                _this.time = 59;
                                $el.html('获取验证码');
                                // _this.refreshCodePic();
                            } else {
                                $el.html('<span style="color:#ccc;">' + _this.time + 's</span>');
                            }
                        }, 1000);
                    }

            };
            module.exports = LoginContent;
            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

        /***/
}),
/* 64 */
/***/ (function (module, exports) {

        // removed by extract-text-webpack-plugin

        /***/
}),
/* 65 */,
/* 66 */
/***/ (function (module, exports, __webpack_require__) {

        module.exports = __webpack_require__.p + "/static/images/icon_warn_tip.png";

        /***/
}),
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function (jQuery) {/****** 图片轮播 ******/
            (function ($, f) {
                var Gallery = function () {
                    //  Object clone
                    var _ = this;

                    //  Set some options
                    _.opts = {
                        speed: 500,   // animation speed, false for no transition (integer or boolean)
                        delay: 3000,  // delay between slides, false for no autoplay (integer or boolean)
                        init: 0,      // init delay, false for no delay (integer or boolean)
                        pause: !f,    // pause on hover (boolean)
                        loop: !f,     // infinitely looping (boolean)
                        dots: f,      // display ••••o• pagination (boolean)
                        arrows: f,    // display prev/next arrows (boolean)
                        prev: '&lt;',    // text or html inside prev button (string)
                        next: '&gt;',    // same as for prev option
                        fluid: f,     // is it a percentage width? (boolean)
                        complete: f,  // invoke after animation (function with argument)
                        items: '>ul', // slides container selector
                        item: '>li'   // slidable items selector
                    };

                    /*
                        obj:Instance object
                        opts:Parameter Setting
                    */
                    _.init = function (obj, opts) {
                        _.opts = $.extend({}, _.opts, opts);

                        _.obj = obj;
                        _.ul = obj.find(_.opts.items);
                        _.max = [obj.outerWidth() | 0, obj.outerHeight() | 0];
                        _.li = _.ul.find(_.opts.item);
                        /*_.li = _.ul.find(_.opts.item).each(function(index) {
                            var me = $(this),
                                width = me.outerWidth(),
                                height = me.outerHeight();
        
                            //  Set the max values
                            if (width > _.max[0]){ _.max[0] = width;}
                            if (height > _.max[1]){ _.max[1] = height;}
                        });*/


                        //  Cached vars
                        var opts = _.opts,
                            ul = _.ul,
                            li = _.li,
                            len = li.length;

                        _.i = 0;


                        //obj.css({width: _.max[0], height:_.max[1], overflow: 'hidden',position:'relative'});
                        ul.css({ position: 'relative', left: 0 });//, width: (len * 100) + '%'
                        li.css({ 'float': 'left', width: '100%', height: _.max[1] });

                        //  Autoslide
                        setTimeout(function () {
                            if (opts.delay | 0) {
                                _.play();

                                if (opts.pause) {
                                    obj.on('mouseover mouseout', function (e) {
                                        _.stop();
                                        e.type == 'mouseout' && _.play();
                                    });
                                };
                            };
                        }, opts.init | 0);

                        //  Dot pagination
                        opts.dots && nav('dot');

                        //  Arrows support
                        opts.arrows && nav('arrow');

                        //  Patch for fluid-width sliders. Screw those guys.
                        if (opts.fluid) {
                            $(window).resize(function () {
                                _.r && clearTimeout(_.r);

                                _.r = setTimeout(function () {
                                    var styl = { height: li.eq(_.i).outerHeight() },
                                        width = obj.outerWidth();

                                    ul.css(styl);
                                    styl['width'] = Math.min(Math.round((width / obj.parent().width()) * 100), 100) + '%';
                                    obj.css(styl);
                                }, 50);
                            }).resize();
                        };

                        //  Swipe support
                        if ($.event.special['swipe'] || $.Event('swipe')) {
                            obj.on('swipeleft swiperight swipeLeft swipeRight', function (e) {
                                e.type.toLowerCase() == 'swipeleft' ? _.next() : _.prev();
                            });
                        };

                        return _;
                    };

                    //  Move picslider to a slide index
                    _.to = function (index, callback) {
                        var opts = _.opts,
                            obj = _.obj,
                            ul = _.ul,
                            li = _.li,
                            current = _.i,
                            target = li.eq(index);

                        //  To slide or not to slide
                        if ((!target.length || index < 0) && opts.loop == f) return;

                        //  Check if it's out of bounds
                        if (!target.length) index = 0;
                        if (index < 0) index = li.length - 1;
                        target = li.eq(index);

                        var speed = callback ? 5 : opts.speed | 0,
                            params = { height: target.outerHeight() };

                        if (!ul.queue('fx').length) {
                            //  Handle those pesky dots
                            obj.find('.dot').eq(index).addClass('active').siblings().removeClass('active');

                            target.fadeIn(speed, function (data) {
                                _.i = index;

                                $.isFunction(opts.complete) && !callback && opts.complete(obj, index);
                            }).siblings().fadeOut(speed);
                            /*obj.animate(params, speed) && ul.animate($.extend({left: '-' + index + '00%'}, params), speed, function(data) {
                                _.i = index;
        
                                $.isFunction(opts.complete) && !callback && opts.complete(obj);
                            });*/
                        };
                    };

                    //  Autoplay functionality
                    _.play = function () {
                        _.t = setInterval(function () {
                            _.to(_.i + 1);
                        }, _.opts.delay | 0);
                    };

                    //  Stop autoplay
                    _.stop = function () {
                        _.t = clearInterval(_.t);
                        return _;
                    };

                    //  Move to previous/next slide
                    _.next = function () {
                        return _.stop().to(_.i + 1);
                    };

                    _.prev = function () {
                        return _.stop().to(_.i - 1);
                    };

                    //  Create dots and arrows
                    function nav(name, html) {
                        if (name == 'dot' && !$('.gallery .pos').length) {
                            html = '<div class="pos">' +
                                '<p class="shade"> </p>' +
                                '<ol class="dots">';
                            $.each(_.li, function (index) {
                                html += '<li class="' + (index == _.i ? name + ' active' : name) + '">' + ++index + '</li>';
                            });
                            html += '</ol>';
                            html += '</div>';
                        } else {
                            html = '<div class="' + name + ' prePage">' + _.opts.prev + '</div>';
                            html = html + '<div class="' + name + ' nextPage">' + _.opts.next + '</div>';
                        };

                        _.obj.addClass('has-' + name + 's').append(html).find('.' + name).hover(function () {
                            var me = $(this);
                            me.hasClass('dot') ? _.stop().to(me.index()) : me.hasClass('prePage') ? _.prev() : _.next();
                        });
                        var ml = (_.li.length * 20 + 30) / 2;
                        $(".pos").css("margin-left", "-" + ml + "px");
                    };
                };

                $.fn.gallery = function (options) {
                    var len = this.length;
                    //  Enable multiple-slider support
                    return this.each(function (index) {
                        //  Cache a copy of $(this), so it
                        var $this = $(this),
                            key = 'gallery' + (len > 1 ? '-' + (++index) : ''),
                            instance = (new Gallery).init($this, options);

                        //  Invoke an slider instance
                        $this.data(key, instance).data('key', key);
                    });
                };
            })(jQuery, false);

            //获取地址栏参数
            (function ($) {
                $.extend({
                    Request: function (m) {
                        var sValue = location.search.match(new RegExp("[\?\&]" + m + "=([^\&]*)(\&?)", "i"));
                        return sValue ? sValue[1] : sValue;
                    },
                    UrlUpdateParams: function (url, name, value) {
                        var r = url;
                        if (r != null && r != 'undefined' && r != "") {
                            value = encodeURIComponent(value);
                            var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
                            var tmp = name + "=" + value;
                            if (url.match(reg) != null) {
                                r = url.replace(eval(reg), tmp);
                            }
                            else {
                                if (url.match("[\?]")) {
                                    r = url + "&" + tmp;
                                } else {
                                    r = url + "?" + tmp;
                                }
                            }
                        }
                        return r;
                    }

                });
            })(jQuery);
            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

        /***/
}),
/* 74 */
/***/ (function (module, exports) {

        module.exports = "<div class=\"loginWrap\">\r\n\t<div class=\"telphoneBox none\">\r\n\t\t<form class=\"wp telphoneLogin\">\r\n\t\t\t<div class=\"title cf\">\r\n\t\t\t\t<h2>短信登录</h2>\r\n\t\t\t\t<a id=\"lgnByaccount\">账号密码登录</a>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"item\">\r\n\t\t\t\t<input id=\"telphone\" class=\"inputTxt w240\" type=\"text\" name=\"telphone\" placeholder=\"请输入手机号码\" value=\"\" autocomplete=\"off\"\r\n\t\t\t\t tabindex=\"1\">\r\n\t\t\t\t<span class=\"clear-btn clear-btn-tp\"></span>\r\n\t\t\t</div>\r\n\t\t\t<p class=\"item-tips item-tips-phone\"></p>\r\n\t\t\t<div class=\"item\">\r\n\t\t\t\t<input id=\"authCode\" class=\"inputTxt w180\" type=\"text\" name=\"authCode\" placeholder=\"验证码\" value=\"\" autocomplete=\"off\" tabindex=\"2\">\r\n\t\t\t\t<span class=\"item-btn authCodeBox\"><img alt=\"\" src=\"xxxHTMLLINKxxx0.66799898684091750.2269189333038928xxx\" /></span>\r\n\t\t\t</div>\r\n\t\t\t<p class=\"item-tips item-tips-code-pic\"></p>\r\n\t\t\t<div class=\"item\">\r\n\t\t\t\t<input id=\"noteCode\" class=\"inputTxt w180\" type=\"text\" name=\"noteCode\" placeholder=\"手机动态验证码\" value=\"\" autocomplete=\"off\"\r\n\t\t\t\t tabindex=\"3\">\r\n\t\t\t\t<span class=\"item-btn noteCodeBox\">获取验证码</span>\r\n\t\t\t</div>\t\t\t\r\n\t\t\t<p id=\"loginTips\" class=\"item-tips item-tips-code\"></p>\r\n\t\t\t<div class=\"item-chk cf\">\r\n\t\t\t\t<input class=\"chkbox chkbox1 mb10\" type=\"checkbox\" name=\"autoLogin\">\r\n\t\t\t\t<label for=\"autoLogin\">7天内自动登录</label>\r\n\t\t\t\t<a href=\"/getBackPassword.html\" class=\"btn-findP\">忘记密码</a>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"item\"><button id=\"submitLogin\" class=\"btn-login btn\" type=\"button\">登&nbsp;&nbsp;&nbsp;录</button></div>\r\n\t\t\t<div class=\"item-rgt cf\">\r\n\t\t\t\t<span class=\"lFloat btn_registNow\"><a href=\"#\">立即注册<i></i></a></span>\r\n\t\t\t</div>\r\n\t\t</form>\r\n\t\t<p class=\"tip\">好药师官方客服电话<span>400-648-5566</span>，不会以其他号码致电，谨防诈骗。</p>\r\n\t</div>\r\n\r\n\t<div class=\"accountBox \">\r\n\t\t<form class=\"wp accountLogin\">\r\n\t\t\t<div class=\"title cf\">\r\n\t\t\t\t<h2>会员登录</h2>\r\n\t\t\t\t<a id=\"lgnBytelphone\">短信快捷登录</a>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"item cf\">\r\n\t\t\t\t<label class=\"item-label i-account-label\" for=\"loginName\"></label>\r\n\t\t\t\t<input id=\"loginName\" class=\"inputTxt\" type=\"text\" name=\"loginName\" placeholder=\"手机/邮箱/用户名\" value=\"\" autocomplete=\"off\" tabindex=\"1\">\r\n\t\t\t\t<span class=\"clear-btn clear-btn-ln\"></span>\r\n\t\t\t</div>\r\n\t\t\t<p class=\"item-tips item-tips-login-name\"></p>\r\n\t\t\t<div class=\"item cf\">\r\n\t\t\t\t<label class=\"item-label i-pwd-label\" for=\"loginPwd\"></label>\r\n\t\t\t\t<input id=\"loginPwd\" class=\"inputTxt\" type=\"password\" name=\"loginPwd\" placeholder=\"密码\" value=\"\" autocomplete=\"off\" tabindex=\"2\">\r\n\t\t\t\t<span class=\"clear-btn clear-btn-lp\"></span>\r\n\t\t\t</div>\r\n\t\t\t<p class=\"item-tips item-tips-login-pwd\"></p>\r\n\t\t\t<div class=\"item-chk cf\">\r\n\t\t\t\t<input class=\"chkbox chkbox2 mb10\" type=\"checkbox\" name=\"autoLogin\" tabindex=\"3\">\r\n\t\t\t\t<label for=\"autoLogin\">7天内自动登录</label>\r\n\t\t\t\t<a href=\"/getBackPassword.html\" class=\"btn-findP\">忘记密码</a>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"item\"><button id=\"submitLogin2\" class=\"btn-login btn\" type=\"button\">登&nbsp;&nbsp;&nbsp;录</button></div>\r\n\t\t\t<div class=\"item-rgt mb50 cf\">\r\n\t\t\t\t<span class=\"lFloat btn_registNow\"><a href=\"#\">立即注册<i></i></a></span>\r\n\t\t\t</div>\r\n\t\t</form>\r\n\t\t<p class=\"tip\">好药师官方客服电话<span>400-648-5566</span>，不会以其他号码致电，谨防诈骗。</p>\r\n\t</div>\r\n</div>";

        /***/
}),
/* 75 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function ($) {
            'use strict';
            __webpack_require__(76);
            var _http = __webpack_require__(53);
            var toolbarTpl = __webpack_require__(84);
            var _cart = __webpack_require__(61);
            var _server = __webpack_require__(60);
            var _data = __webpack_require__(85);

            var Toolbar = function () {
                var _this = this;
                this.toolbar = function () {
                    var $pageWrap = $('body');
                    var Tpl = _http.renderHtml(toolbarTpl, {
                        _data: _data
                    });

                    if (window.location.href.indexOf('login') > 0 || window.location.href.indexOf('paymentsCallback') > 0 || window.location.href.indexOf('register') > 0 || window.location.href.indexOf('message') > 0) {
                        $pageWrap.append("");
                    } else {
                        $pageWrap.append(Tpl);
                    }

                    _this.iscoupon();
                    _this.isHover();


                },
                    this.iscoupon = function () {
                        //详情页右边优惠券图标
                        var producthtml = location.pathname.substr(location.pathname.lastIndexOf("/") + 1);
                        if (producthtml.substring(0, 7) == 'product') {
                            $('.barCoupon').show();
                        }
                    },
                    this.isHover = function () {
                        $('.heard_img').hover(function () {
                            $(this).children('.tool-tip').show();
                        }, function () {
                            $(this).children('.tool-tip').hide();
                        })
                        $(".tip_car").hover(
                            function () {
                                $(".mbar-tip-car").show();
                            },
                            function () {
                                $(".mbar-tip-car").hide();
                            }
                        );
                        //关注ShoppingCartSum
                        $(".favirate").hover(
                            function () {
                                $(".mbar-tip").show();
                            },
                            function () {
                                $(".mbar-tip").hide();
                            }
                        ); //二维码
                        $(".gz").hover(
                            function () {
                                $(".mbar-tip-sm").show();
                            },
                            function () {
                                $(".mbar-tip-sm").hide();
                            }
                        );
                        $(".Topup ").click(function () {
                            var speed = 200;
                            // 埋点
                            ehyTrack.track('点击TOP_右边', {
                                '所在页面': _http.getPageName(location.pathname)
                            });
                            $('body,html').animate({ scrollTop: 0 }, speed);
                            return false;
                        });
                        $('.doctor-list li').on("click", function (e) {
                            // 埋点
                            var doctorName = $(this).data('doctorname');
                            var code = $(this).data('code');
                            var title = $(this).data('title');
                            ehyTrack.track('点击药师在线_右边', {
                                '药师名称': doctorName,
                                '资质编号': code,
                                '药师职称': title,
                                '所在页面': _http.getPageName(location.pathname)
                            });
                            Showconsultation(1);
                        });
                        $(".carImg").hover(function () {
                            $(this).addClass('car-hover');
                        }, function () {
                            $(this).removeClass('car-hover');
                        })
                        $(".carImg").click(function () {
                            // 埋点
                            ehyTrack.track('点击购物车_右边', {
                                '所在页面': _http.getPageName(location.pathname)
                            });
                            _http.setCookie('cartType', 0, '30', location.hostname);
                            window.open(_http.host + '/shoppingCart.html', "_blank");
                        })
                        $(".favirate").click(function () {
                            // 埋点
                            ehyTrack.track('点击关注_右边', {
                                '所在页面': _http.getPageName(location.pathname)
                            });
                            if (isLogin()) {
                                window.open(_http.host + '/userFavorite.html', "_blank");
                            } else {
                                var jump_url = _http.host + "/userFavorite.html";
                                _http.setCookie('jump_url', jump_url);
                                showLogin('p');
                            }
                        });
                    }


            };
            module.exports = Toolbar;
            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

        /***/
}),
/* 76 */
/***/ (function (module, exports) {

        // removed by extract-text-webpack-plugin

        /***/
}),
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */
/***/ (function (module, exports) {

        module.exports = "\r\n  <div class=\"toolbar\">\r\n\t\t        <div class=\"heard_img\"> \r\n\t\t       \t\t<span class=\"tool-img\"></span>\r\n\t\t       \t\t<div class=\"tool-tip\">\r\n\t\t       \t\t{{each _data.data as item }}\r\n\t\t       \t\t\t<div class=\"tool-cont\">\r\n\t\t       \t\t\t\t<h2>在线咨询药师( {{item.dataJson.servicetime}})</h2>\r\n\t\t       \t\t\t\t<ul class=\"doctor-list\">\r\n\t\t       \t\t\t\t{{each item.datas as list}}\r\n\t\t       \t\t\t\t<li data-doctorname=\"{{list.doctorName}}\" data-code=\"{{list.code}}\" data-title={{list.title}}>\r\n\t\t\t       \t\t\t\t<div class=\"tool-zx-img\">\r\n\t\t\t       \t\t\t\t\t<p><img src=\"{{list.imgPath}}\"></p>\r\n\t\t\t       \t\t\t\t\t<span>马上咨询</span>\r\n\t\t\t       \t\t\t\t</div>\r\n\t\t\t       \t\t\t\t<div class=\"tool-zx-text\">\r\n\t\t\t       \t\t\t\t\t<p><span>{{list.doctorName}}</span>{{list.title}}</p>\r\n\t\t\t       \t\t\t\t\t<p class=\"other-color\">资质编号：{{list.code}}</p>\r\n\t\t\t       \t\t\t\t\t<p>{{list.specialty}}</p>\r\n\t\t\t       \t\t\t\t</div>\r\n\t\t       \t\t\t\t</li>\r\n\t\t       \t\t\t\t{{/each}}\r\n\t\t       \t\t\t\t</ul>\r\n\t\t       \t\t\t</div>\r\n\t\t       \t\t{{/each}}\r\n\t\t       \t\t\t<div class=\"tool-cont\">\r\n\t\t       \t\t\t\t<h2>在线咨询客服（8:30-21:00）</h2>\r\n\t\t       \t\t\t\t<ul>\r\n\t\t       \t\t\t\t<li onclick=\"Showconsultation(1)\">\r\n\t\t\t       \t\t\t\t<div class=\"tool-kf-img\">\r\n\t\t\t       \t\t\t\t\t<p></p>\r\n\t\t\t       \t\t\t\t</div>\r\n\t\t\t       \t\t\t\t<div class=\"tool-zx-text\">\r\n\t\t\t       \t\t\t\t\t<h3>在线客服</h3>\r\n\t\t\t       \t\t\t\t\t<p>精心解答您的任何问题，一有问题马上点我</p>\r\n\t\t\t       \t\t\t\t</div>\r\n\t\t       \t\t\t\t</li>\r\n\t\t       \t\t\t\t</ul>\r\n\t\t       \t\t\t\t<h2>马上联系我们：400-648-5566</h2>\r\n\t\t       \t\t\t</div>\r\n\t\t       \t\t</div>\r\n\t\t        </div>\r\n\t\t        <div class=\"carImg\"> \r\n\t\t            <div class=\"tip_car\">\r\n\t\t            \t<i></i>\r\n\t\t\t\t\t\t<p>购<br>物<br>车</p>\r\n\t\t            </div>\r\n\t\t            <div class=\"toolbar-line\"><span id=\"toolbarSum\">0</span></div>\r\n\t\t        </div>\r\n\t\t        <div class=\"favirate\"> \r\n\t\t            <p><i></i></p>\r\n\t\t            <div class=\"mbar-tip\">\r\n\t\t                关注\r\n\t\t                <div class=\"mbar-tip-arr\">◆</div>\r\n\t\t            </div>\r\n\t\t        </div>\r\n\t\t        <div class=\"barCoupon\"></div>\r\n\t\t             <div class=\"gz\" style=\"display:none;\">\r\n\t\t            \t<p><i></i></p>\r\n\t\t            \t<div class=\"mbar-tip-sm\">\t\r\n\t\t\t                <p class=\"app\">客户端手机专享价</p>\t\t\t                \r\n\t\t\t                <p class=\"wechat\">微信商城扫一扫</p>\r\n\t\t\t                <div class=\"mbar-tip-arr\">◆</div>\r\n\t\t            \t</div>\r\n\t\t            </div>\r\n\t\t        <div class=\"bot_Top\">\r\n\t\t            <div class=\"Topup\"><i></i></div> \r\n\t\t        </div>\r\n\t\t    </div>";

        /***/
}),
/* 85 */
/***/ (function (module, exports) {

        module.exports = { "success": true, "code": 0, "message": "", "data": [{ "id": 8, "name": "贴心药师", "title": "贴心药师", "dataJson": { "servicetime": "8:30-23:00" }, "typeId": 4, "modelId": null, "isWeb": 1, "state": 1, "sort": null, "datas": [{ "id": 1, "doctorName": "程建芝", "imgPath": "https://ehaoyao.oss-cn-hangzhou.aliyuncs.com/2017/12/21/1513845259538_16.png", "code": "0123652", "title": "执业西药师", "specialty": "12年药师经验,丰富的临床和用药经验", "linkParam": null, "sort": 1, "state": 1 }, { "id": 3, "doctorName": "王向慧", "imgPath": "https://ehaoyao.oss-cn-hangzhou.aliyuncs.com/2017/12/21/1513845259776_5.png", "code": "ZY00235226", "title": "执业中/西药师", "specialty": "专业严谨,知识渊博,擅长西药", "linkParam": null, "sort": 1, "state": 1 }, { "id": 4, "doctorName": "李治", "imgPath": "https://ehaoyao.oss-cn-hangzhou.aliyuncs.com/2017/12/21/1513845259998_41.png", "code": "172791", "title": "执业中药师", "specialty": "6年药师经验,解答全面,擅长中药", "linkParam": null, "sort": 1, "state": 1 }, { "id": 8, "doctorName": "李响", "imgPath": "https://ehaoyao.oss-cn-hangzhou.aliyuncs.com/2018/1/30/1517304840732_8.png", "code": "ZZ00331991", "title": " ", "specialty": "药学知识丰富，解答详细，耐心负责", "linkParam": null, "sort": 1, "state": 1 }] }] }

        /***/
}),
/* 86 */
/***/ (function (module, exports, __webpack_require__) {


        'use strict';

        var _http = __webpack_require__(53);

        var _header = {
            //获取头部的导航分类(wk 07.26)
            getHeaderClassify: function (resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/mds/api/app/apiv2_4/thirdLevelCategorysyn.json'),
                    success: resolve,
                    error: reject
                });
            }
        }

        module.exports = _header;

        /***/
}),
/* 87 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function ($, jQuery) {/*
	**弹出框
	**@author cyy 2015/12/31
	**example:      
	**    id:"test",                                      //浮层ID，必填
	**    style:"test",                                   //浮层css样式 
	**    title:''										  //标题
	**    target:dom,                                     //事件源，dom节点或者jq对象都可以，必填           
	**    close_btn:false,                                //要不要关闭按钮
	**    content:'<div class="content">123</div>',       //字符串，DOM结点或者jQ对象
	**    position:"top",                                 //默认bottom位置，其它分别可选left,right,top,center,fix
	**    correction:{top:10,right:10},                   //位置偏移量
	**    width:400,                                      //浮层宽度
	**    ifShade:true,                                       //遮罩层,默认没有
	**    scroll:true,                                    //是否滚动,默认不滚动
	**    disappear:true,                                 //是否消失
	**    time:3000,                                      //多长时间消失	
	**    stay:true,                                      //不会被点击事件隐藏                                  
	**    destroy:true,                                  //是否销毁浮层,默认销毁
	**    callback:function(fn){fn()}                     //浮层DOM结构渲染完成回调函数，第一个参数可以控制关闭浮层，fn()即可关闭浮层
	**});
	*/
            if (typeof (ehaoyao) === "undefined") {
                ehaoyao = {};
            }
            if (!ehaoyao.tips) {
                ehaoyao.tips = {};
            }
            if (!ehaoyao.util) {
                ehaoyao.util = {};
            }
            (function (ns) {
                function Tips(cfg) {
                    var _ = this;
                    _.cfg = {
                        position: 'center',
                        correction: { left: 10, top: 10 },
                        width: null,
                        target: "body",
                        id: "hy-dialogInfo",
                        skinStyle: "hy-dialogBox",
                        title: "提示",
                        content: "",
                        hasTitle: false,
                        hasCloseBtn: true,
                        hasMask: true,
                        scroll: false,
                        stay: true,
                        disappear: false,
                        time: 3000,
                        destroy: true,
                        callback: function () { }
                    }

                    _.cfg = $.extend({}, _.cfg, cfg);

                    if (!_.cfg.id || !_.cfg.target) return;

                    _.addTips();
                    _.dragMove();
                    _.setPos();
                    _.bindEvent();
                    _._disappear();
                }

                Tips.global = {
                    isIe6: function () {
                        return typeof (document.body.style.maxHeight) === "undefined" ? true : false
                    }
                };

                Tips.prototype = {
                    //添加浮层
                    addTips: function () {
                        var tpl = {
                            shade: '<div class="hy-dialogShade"></div>',
                            btn: '<a class="btn-close" href="javascript:void(0)" ></a>',
                            title: '<div class="hd">$0</div>',
                            html: '$1' +
                                '<div id="$4" class="hy-dialogInfo $5 animated zoomIn">' +
                                '	$2' +//close-button
                                '	$3' + //title
                                '	<div class="bd">$6</div>' + //content
                                '</div>',
                            IFRAME: '<iframe frameborder="0" style="left:0px;width:100%;height:0px;top:0px;position:absolute;' +
                                'z-index:98;filter: Alpha(Opacity=0);" class="tips-iframe"></iframe>'
                        };
                        var _t = this,
                            selector = "#" + _t.cfg.id,
                            dom = jQuery(selector),
                            html = tpl.html;

                        if (!jQuery(selector)[0] || !!_t.cfg.destroy) {
                            try {
                                jQuery("*", dom).add([dom]).each(function () {
                                    jQuery.event.remove(this);
                                    jQuery.removeData(this);
                                });
                                dom.innerHTML = "";
                                dom.remove();

                            } catch (e) { }


                            if (_t.cfg.hasMask && !jQuery(".hy-dialogShade")[0]) {
                                html = html.replace("$1", tpl.shade);
                            } else {
                                html = html.replace("$1", "");
                            }
                            if (_t.cfg.hasCloseBtn) {
                                html = html.replace("$2", tpl.btn);
                            } else {
                                html = html.replace("$2", '');
                            }
                            if (_t.cfg.hasTitle) {
                                html = html.replace("$3", tpl.title).replace("$0", _t.cfg.title);
                            } else {
                                html = html.replace("$3", '');
                            }
                            html = html.replace("$4", _t.cfg.id).replace("$5", _t.cfg.style);

                            if (typeof (_t.cfg.content) === "string") {
                                html = html.replace("$6", _t.cfg.content);
                            } else if (typeof (_t.cfg.content.jquery) !== "undefined") {
                                html = html.replace("$6", "");
                                var clone = _t.cfg.content.clone(true);
                                jQuery(selector + " .bd").append(clone.show().removeAttr("id"));
                                clone.find("*").removeAttr("id");
                            }
                            if (_t.cfg.hasMask) {
                                jQuery(".hy-dialogShade").show();
                            }
                            jQuery("body").append(html);
                        } else {
                            dom.show();
                            if (_t.cfg.hasMask) {
                                jQuery(".hy-dialogShade").show();
                            }
                        }

                        _t.dom = dom = jQuery(selector);
                        if (_t.cfg.width)
                            _t.dom.css("width", _t.cfg.width);
                    },
                    //设置图层位置
                    setPos: function () {
                        var _t = this,
                            pos = _t.cfg.position,
                            target = jQuery(_t.cfg.target),
                            top = target.offset().top,
                            left = target.offset().left,
                            tw = target[0].offsetWidth,//事件源节点的宽度
                            th = target[0].offsetHeight,//事件源节点的高度
                            dom = _t.dom,
                            w = dom[0].offsetWidth,//浮层宽度
                            h = dom[0].offsetHeight,//浮层高度
                            dw = document.documentElement.clientWidth,//文档可见宽度
                            dh = document.documentElement.clientHeight,//文档可见高度
                            limitLeft,
                            dist = _t.cfg.correction,
                            dist_l = dist.left,
                            dist_t = dist.top,
                            ctop = 0,
                            timer;

                        if (dh - h > 0) {
                            ctop = Math.abs((dh - h) / 2) + document.documentElement.scrollTop + document.body.scrollTop + dist_t;
                        } else {
                            ctop = document.documentElement.scrollTop + document.body.scrollTop + dist_t + 10;
                        }
                        switch (pos) {
                            case "left":
                                dom.css({ "left": left - w + dist_l, "top": top + dist_t, "position": "absolute" });
                                if (left - w + dist_l < 0) {
                                    dom.css({ "left": 0 });
                                }
                                break;
                            case "right":
                                dom.css({ "left": left + tw + dist_l, "top": top + dist_t, "position": "absolute" });
                                limitLeft = dw - w;
                                if (left + tw + dist_l > limitLeft) {
                                    dom.css({ "left": limitLeft });
                                }
                                break;
                            case "top":
                                dom.css({ "left": (dw - w) / 2 + dist_l, "top": "50px", "position": "absolute" });
                                //				limitLeft=dw-w-dist_l;
                                //				if(left > limitLeft){
                                //					left=limitLeft;
                                //				}
                                //				dom.css({"left":left});
                                break;
                            case "bottom":
                                dom.css({ "top": top + th + dist_t, "position": "absolute" });
                                limitLeft = dw - w - dist_l;
                                if (left > limitLeft) {
                                    left = limitLeft;
                                }
                                dom.css({ "left": left + dist_l });
                                break;
                            case "center":
                                dom.css({ "left": (dw - w) / 2 + dist_l, "top": ctop, "position": "absolute" });
                                break
                            case "fix":
                                dom.css({ "position": "fixed", "left": (dw - w) / 2, "top": (dh - h) / 2 + dist_t });
                                if (Tips.global.isIe6()) {//if IE6
                                    dom.css({ "position": "absolute", "left": (dw - w) / 2, "top": (dh - h) / 2 + document.documentElement.scrollTop + dist_t });
                                    jQuery(window).scroll(function () {
                                        clearTimeout(timer);
                                        timer = setTimeout(function () {
                                            dom.css("top", (dh - h) / 2 + document.documentElement.scrollTop + dist_t);
                                        }, 100);
                                    });
                                }
                                break;
                            default: break;
                        }
                        //scroll
                        var _top = top - th - 20;
                        if (_t.scroll) {
                            if (_top < 0) {
                                $("html,body").animate({ scrollTop: 0 }, 500);
                            }
                            $("html,body").animate({ scrollTop: _top }, 500);
                        }
                    },
                    //绑定事件
                    bindEvent: function () {
                        var _t = this,
                            _close = _t.dom.find(".btn-close");
                        _close.on("click", function (e) {
                            _t.dom.remove();
                            if (_t.cfg.hasMask) {
                                jQuery(".hy-dialogShade").hide();
                            }
                            e.stopPropagation();
                        });
                        if (_t.cfg.hasMask) {
                            jQuery(".hy-dialogShade").click(function (e) {
                                //e.stopPropagation();
                                jQuery(this).add(_t.dom).hide();
                            });
                        }

                        if (!_t.cfg.stay) {
                            $(body).on("click", function (e) { _close.triggerHandler("click"); });
                        }
                        _t.dom.on("click", function (e) {
                            e.stopPropagation();
                        });
                        _t.exec(_close);//调回调函数
                    },
                    //浮层拖动
                    dragMove: function (selector) {
                        var _t = this;
                        _t.dom.find(".hd").mousedown(function (e) {
                            var dom = jQuery(this);
                            var oLeft = e.pageX;
                            var oTop = e.pageY;
                            var domLeft = this.getBoundingClientRect().left;
                            var domTop = this.getBoundingClientRect().top;
                            if (_t.cfg.position !== "fix") {
                                domTop = jQuery(this).offset().top;
                            }
                            if (Tips.global.isIe6()) {
                                var domLeft = dom.offset().left;
                                var domTop = dom.offset().top;
                            }
                            jQuery(document).mousemove(function (e) {
                                var leftD = e.pageX - oLeft;
                                var topD = e.pageY - oTop;
                                _t.dom.css({
                                    top: parseFloat(domTop) + parseFloat(topD) + "px",
                                    left: parseFloat(domLeft) + parseFloat(leftD) + "px"
                                });
                            }).mouseup(function () {
                                jQuery(document).unbind("mousemove");
                            });
                        }).mouseover(function () {
                            jQuery(this).css("cursor", "move");
                        }).mouseout(function () {
                            jQuery(this).css("cursor", "auto");
                        });
                    },
                    //调回调函数
                    exec: function (_close) {
                        var _t = this,
                            fn = shutDown(_close);
                        if (_t.cfg.callback) {
                            _t.cfg.callback.call(this, fn);
                        }
                    },
                    //
                    _disappear: function () {
                        var _t = this,
                            timer;
                        if (_t.cfg.disappear) {
                            clearTimeout(timer);
                            timer = setTimeout(function () {
                                _t.dom.fadeOut();
                                //$(".hy-dialogShade").fadeOut();
                            }, _t.cfg.time || 3000);
                        }
                    },
                    _hide: function () {
                        var _t = this;
                        _t.dom.fadeOut();
                    }
                }

                function shutDown(_close) {
                    return function () {
                        _close.triggerHandler("click");
                    }
                }
                ns.tips = Tips;


                /**
                 * 应用工具
                 * @singleton
                 */
                ns.util = (function () {
                    var format = /(\d{4})-(\d{2})-(\d{2}) (\d{2})\:(\d{2})\:(\d{2})/;
                    var radix = 10;
                    var int_format = /^(0|[1-9]\d*)$/;
                    var number_format = /^(0|[1-9]\d*)$|^(0|[1-9]\d*)\.(\d+)$/;
                    var number_format_2b = /^(0|[1-9]\d*)$|^(0|[1-9]\d*)\.(\d{1,2})$/;
                    var phoneNum = /^0?(13|15|18|14|17)[0-9]{9}$/;
                    var telphoneNum = /^([0-9]{3,4}-?)[0-9]{7,8}$/;
                    var postcode = /^[0-9]{6}$/;
                    //var phoneNum = /^(\d{2,4}[-_－—]?)?\d{3,8}([-_－—]?\d{3,8})?([-_－—]?\d{1,7})?$)|(^0?1[35]\d{9}$/;
                    //var telphoneNum =/^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;

                    var httpUrl = /^(http:\/\/).*/;

                    return {
                        getCookie: function (sName) {
                            var aCookie = document.cookie.split("; ");
                            for (var i = 0; i < aCookie.length; i++) {
                                var aCrumb = aCookie[i].split("=");
                                if (sName == aCrumb[0]) {
                                    aCrumb.shift();
                                    return decodeURIComponent(aCrumb.join("="));
                                }
                            }
                            return '';
                        },
                        setCookie: function (sName, sValue, sExpires, dm, path) {
                            var sCookie = sName + "=" + encodeURIComponent(sValue),
                                dm = dm || ".ehaoyao.com",
                                sExpires = sExpires || 30,
                                path = path || "/";
                            if (sExpires != null) {
                                var today = new Date(),
                                    d = new Date(today.getTime() + (sExpires * 1000 * 60 * 60 * 24));
                                sCookie += "; expires=" + d.toUTCString() + "; domain=" + dm + "; path=" + path;
                            }
                            document.cookie = sCookie;
                        },
                        removeCookie: function (sName) {
                            document.cookie = sName + "=; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
                        },

                        /**
                         * 当页面是嵌入页(iframe)时，高度变化后，调用此方法调整嵌入页高度
                         * 嵌入iframe地址为绝对地址或者相对根目录的地址
                         */
                        heightChange: function () {
                            if (top != window) {
                                try {
                                    var href = decodeURIComponent(location.href.replace("###", "")),//长地址
                                        href2 = decodeURIComponent(href.replace("http://" + location.host, "").replace("###", "")),//短地址
                                        i = 0,
                                        height,
                                        ifr = parent.jQuery("iframe[src='" + href + "'], iframe[src='" + href2 + "']");
                                    ifr.css("height", document.body.offsetHeight);
                                } catch (e) { }
                            }
                        },
                        //对象是否为空
                        isEmptyObject: function (e) {
                            for (var t in e)
                                return !1;
                            return !0
                        },
                        /**
                         * 空判断
                         */
                        isNull: function (/*String*/v) {
                            var rt = true;
                            if (v) {
                                v = jQuery.trim(v);
                                if (v.length > 0) {
                                    rt = false;
                                }
                            }
                            return rt;
                        },

                        /**
                         * 非数值判断
                         */
                        isNaN: function (/*Number|String*/v) {
                            var rt = true;
                            if (this.isNull(v) == false) {
                                if (number_format.test(v)) {
                                    rt = false;
                                }
                            }
                            return rt;
                        },

                        /**
                         * 非数值判断,2位小数
                         */
                        isNaN2b: function (/*Number|String*/v) {

                        },

                        /**
                         * 非整数判断
                         */
                        isNaI: function (/*Number|String*/v) {

                        },
                        /**
                         * 电话号码判断
                         */
                        isPhoneNum: function (/*String*/v) {
                            var rt = true;
                            if (this.isNull(v) == false) {
                                if (phoneNum.test(v) || telphoneNum.test(v)) {
                                    rt = false;
                                }
                            }
                            return rt;
                        },
                        /**
                         * 固定电话
                         */
                        istelphone: function (/*String*/v) {
                            var rt = true;
                            if (this.isNull(v) == false) {
                                if (telphoneNum.test(v)) {
                                    rt = false;
                                }
                            }
                            return rt;
                        },
                        /**
                         * 手机号码判断
                         */
                        isMobileNum: function (/*String*/v) {
                            var rt = true;
                            if (this.isNull(v) == false) {
                                if (phoneNum.test(v)) {
                                    rt = false;
                                }
                            }
                            return rt;
                        },
                        /**
                         * 邮政编码
                         */
                        isPostCode: function (/*String*/v) {
                            var rt = true;
                            if (this.isNull(v) == false) {
                                if (postcode.test(v)) {
                                    rt = false;
                                }
                            }
                            return rt;
                        },

                        /**
                         * 处理url为正确的格式
                         */
                        httpUrl: function (/*String*/url) {
                            if (!httpUrl.test(url)) {
                                url = 'http://' + url;
                            }
                            return url;
                        },

                        /**
                         * 金额处理，保留两位小数
                         */
                        toFloat: function (num) {
                            num += '';
                            num = num.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符  

                            if (/^0+/) //清除字符串开头的0  
                                num = num.replace(/^0+/, '');
                            if (!/\./.test(num)) //为整数字符串在末尾添加.00  
                                num += '.00';
                            if (/^\./.test(num)) //字符以.开头时,在开头添加0  
                                num = '0' + num;
                            num += '00';        //在字符串末尾补零  
                            num = num.match(/\d+\.\d{2}/)[0];
                            return num;
                        },
                        trim: function (val) {
                            return val.replace(/^\s+|\s+$/g, "");
                        },
                        typeOf: function (arg) {
                            return Object.prototype.toString.call(arg);
                        },
                        isMobile: function () {
                            var sUserAgent = navigator.userAgent.toLowerCase();
                            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
                            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
                            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
                            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
                            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
                            var bIsAndroid = sUserAgent.match(/android/i) == "android";
                            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
                            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
                            var mobile = !!sUserAgent.match(/applewebkit.*mobile.*/);

                            if (mobile || bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                                return true;
                            } else {
                                return false;
                            }
                        },
                        proxy: function () {
                            var tryTimes = 0;
                            try {
                                var _args = arguments, _jQuery = null, _this = this, _frameName = null;
                                if (typeof (_args[0]) == 'object') {
                                    try {
                                        _frameName = frames[_args[0]["name"]];
                                        _jQuery = _frameName
                                            && _frameName.jQuery;

                                        if (typeof _args[0]["charset"] != 'undefined') {
                                            document.charset = _args[0]["charset"];// 设置编码
                                        }
                                    } catch (e) {

                                    }
                                    //2013-7-3 kuner add：增加配置代理尝试的参数，默认为5次（5*500=2500毫秒）
                                    this.tryMaxTimes = _args[0]["times"] || 5;
                                    //alert(_frameName+"==="+_jQuery);

                                    if (_jQuery) {
                                        var Aargs = jQuery.makeArray(_args);
                                        Aargs = Aargs.slice(2);
                                        _jQuery[_args[1]].apply(_jQuery, Aargs);
                                    } else {
                                        if (!_frameName) {
                                            jQuery('body')
                                                .append('<iframe src="'
                                                    + _args[0]["path"]
                                                    + '" name="' + _args[0]["name"] + '" style="display:none"></iframe>');
                                        }
                                        if (tryTimes++ < this.tryMaxTimes) {
                                            setTimeout(function () {
                                                _args.callee.apply(_this, _args);
                                            }, 500);
                                        }
                                    }
                                }
                            } catch (e) {

                            }
                        }
                    };
                })();
            })(ehaoyao);

            Date.prototype.format = function (format) {
                var o = {
                    "M+": this.getMonth() + 1, //month 
                    "d+": this.getDate(), //day 
                    "h+": this.getHours(), //hour 
                    "m+": this.getMinutes(), //minute 
                    "s+": this.getSeconds(), //second 
                    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
                    "S": this.getMilliseconds() //millisecond 
                }

                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                }

                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                    }
                }
                return format;
            }
            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2), __webpack_require__(2)))

        /***/
}),
/* 88 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function (jQuery) {/**
	* jQuery MD5 hash algorithm function
	* 
	* <code>
	* Calculate the md5 hash of a String 
	* String $.md5 ( String str )
	* </code>
	* 
	* Calculates the MD5 hash of str using the 绂� RSA Data Security, Inc. MD5 Message-Digest Algorithm, and returns that hash. 
	* MD5 (Message-Digest algorithm 5) is a widely-used cryptographic hash function with a 128-bit hash value. MD5 has been employed in a wide variety of security applications, and is also commonly used to check the integrity of data. The generated hash is also non-reversable. Data cannot be retrieved from the message digest, the digest uniquely identifies the data.
	* MD5 was developed by Professor Ronald L. Rivest in 1994. Its 128 bit (16 byte) message digest makes it a faster implementation than SHA-1.
	* This script is used to process a variable length message into a fixed-length output of 128 bits using the MD5 algorithm. It is fully compatible with UTF-8 encoding. It is very useful when u want to transfer encrypted passwords over the internet. If you plan using UTF-8 encoding in your project don't forget to set the page encoding to UTF-8 (Content-Type meta tag). 
	* This function orginally get from the WebToolkit and rewrite for using as the jQuery plugin.
	* 
	* Example
	* Code
	* <code>
	* $.md5("I'm Persian."); 
	* </code>
	* Result
	* <code>
	* "b8c901d0f02223f9761016cfff9d68df"
	* </code>
	* 
	* @alias Muhammad Hussein Fattahizadeh < muhammad [AT] semnanweb [DOT] com >
	* @link http://www.semnanweb.com/jquery-plugin/md5.html
	* @see http://www.webtoolkit.info/
	* @license http://www.gnu.org/licenses/gpl.html [GNU General Public License]
	* @param {jQuery} {md5:function(string))
	* @return string
	*/

            (function ($) {

                var rotateLeft = function (lValue, iShiftBits) {
                    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
                }

                var addUnsigned = function (lX, lY) {
                    var lX4, lY4, lX8, lY8, lResult;
                    lX8 = (lX & 0x80000000);
                    lY8 = (lY & 0x80000000);
                    lX4 = (lX & 0x40000000);
                    lY4 = (lY & 0x40000000);
                    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
                    if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                    if (lX4 | lY4) {
                        if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                        else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                    } else {
                        return (lResult ^ lX8 ^ lY8);
                    }
                }

                var F = function (x, y, z) {
                    return (x & y) | ((~x) & z);
                }

                var G = function (x, y, z) {
                    return (x & z) | (y & (~z));
                }

                var H = function (x, y, z) {
                    return (x ^ y ^ z);
                }

                var I = function (x, y, z) {
                    return (y ^ (x | (~z)));
                }

                var FF = function (a, b, c, d, x, s, ac) {
                    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
                    return addUnsigned(rotateLeft(a, s), b);
                };

                var GG = function (a, b, c, d, x, s, ac) {
                    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
                    return addUnsigned(rotateLeft(a, s), b);
                };

                var HH = function (a, b, c, d, x, s, ac) {
                    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
                    return addUnsigned(rotateLeft(a, s), b);
                };

                var II = function (a, b, c, d, x, s, ac) {
                    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
                    return addUnsigned(rotateLeft(a, s), b);
                };

                var convertToWordArray = function (string) {
                    var lWordCount;
                    var lMessageLength = string.length;
                    var lNumberOfWordsTempOne = lMessageLength + 8;
                    var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
                    var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
                    var lWordArray = Array(lNumberOfWords - 1);
                    var lBytePosition = 0;
                    var lByteCount = 0;
                    while (lByteCount < lMessageLength) {
                        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                        lBytePosition = (lByteCount % 4) * 8;
                        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                        lByteCount++;
                    }
                    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                    lBytePosition = (lByteCount % 4) * 8;
                    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
                    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
                    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
                    return lWordArray;
                };

                var wordToHex = function (lValue) {
                    var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
                    for (lCount = 0; lCount <= 3; lCount++) {
                        lByte = (lValue >>> (lCount * 8)) & 255;
                        WordToHexValueTemp = "0" + lByte.toString(16);
                        WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
                    }
                    return WordToHexValue;
                };

                var uTF8Encode = function (string) {
                    string = string.replace(/\x0d\x0a/g, "\x0a");
                    var output = "";
                    for (var n = 0; n < string.length; n++) {
                        var c = string.charCodeAt(n);
                        if (c < 128) {
                            output += String.fromCharCode(c);
                        } else if ((c > 127) && (c < 2048)) {
                            output += String.fromCharCode((c >> 6) | 192);
                            output += String.fromCharCode((c & 63) | 128);
                        } else {
                            output += String.fromCharCode((c >> 12) | 224);
                            output += String.fromCharCode(((c >> 6) & 63) | 128);
                            output += String.fromCharCode((c & 63) | 128);
                        }
                    }
                    return output;
                };

                $.extend({
                    md5: function (string) {
                        var x = Array();
                        var k, AA, BB, CC, DD, a, b, c, d;
                        var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
                        var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
                        var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
                        var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
                        string = uTF8Encode(string);
                        x = convertToWordArray(string);
                        a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
                        for (k = 0; k < x.length; k += 16) {
                            AA = a; BB = b; CC = c; DD = d;
                            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
                            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
                            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
                            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
                            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
                            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
                            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
                            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
                            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
                            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
                            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
                            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
                            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
                            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
                            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
                            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
                            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
                            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
                            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
                            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
                            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
                            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
                            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
                            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
                            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
                            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
                            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
                            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
                            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
                            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
                            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
                            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
                            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
                            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
                            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
                            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
                            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
                            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
                            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
                            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
                            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
                            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
                            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
                            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
                            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
                            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
                            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
                            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
                            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
                            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
                            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
                            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
                            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
                            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
                            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
                            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
                            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
                            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
                            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
                            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
                            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
                            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
                            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
                            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
                            a = addUnsigned(a, AA);
                            b = addUnsigned(b, BB);
                            c = addUnsigned(c, CC);
                            d = addUnsigned(d, DD);
                        }
                        var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
                        return tempValue.toLowerCase();
                    }
                });
            })(jQuery);
            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

        /***/
}),
/* 89 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function ($) {
            'use strict';
            __webpack_require__(90);
            var _http = __webpack_require__(53);
            var _PlaceSearchRender = __webpack_require__(101);
            // 通用页面头部
            var header = {
                init: function () {
                    this.onLoad();
                    this.bindEvent();
                },
                onLoad: function () {

                },
                bindEvent: function () {
                    $('.help_one li a').on("click", function () {
                        // 埋点
                        var name = $(this).text();
                        var cate = $(this).parents('li').find('h6').text();
                        ehyTrack.track('点击底部导航_底部', {
                            '导航名称': name,
                            '所在页面': _http.getPageName(location.pathname),
                            '所属分类': cate
                        });
                    });
                }
            };

            header.init();
            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

        /***/
}),
/* 90 */
/***/ (function (module, exports) {

        // removed by extract-text-webpack-plugin

        /***/
}),
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function ($) {
            if (typeof (Lib) == "undefined") {
                Lib = {};
            }
            Lib.AMap = Lib.AMap || {};
            Lib.AMap.PlaceSearchRender = function (notShowCircle) {
                var me = this;
                me.ifShowCircle = !notShowCircle;
                //me.author="qiang.niu(http://www.siptea.cn)";
                /*
                 var placeSearchOptions={ //构造地点查询类
                 pageSize:10,
                 pageIndex:1,
                 city:"021" //城市
                 };
                 Amap.PlaceSearchRender.autoRender({
                 placeSearchOptions:placeSearchOptions,
                 methodName:"search",
                 methodArgumments:["东方明珠"],//不含回调函数
                 callback: function(){},
                 map: map,
                 panel: "result1"
                 });
                 */
                me.autoRender = function (options) { //options.map otpions.panel options.data
                    me.clear();
                    if (!options || !options.methodName || !options.methodArgumments || (!options.panel && !options.map)) {
                        return;
                    }
                    this.options = options;
                    this.callback('complete', options['data']);
                }
                me.callback = function (status, result) {
                    me.clear();
                    var options = me.options;
                    if (options.callback) {
                        options.callback(status, result);
                    }
                    if (status != "complete") {
                        return;
                    }
                    me.result = result;
                    if (options.map) {
                        me._infoWindow = new AMap.InfoWindow({ //点的信息窗体
                            size: new AMap.Size(0, 0),
                            isCustom: true,
                            offset: new AMap.Pixel(0, -30)
                        });
                        me._overlays = []; //poi
                        me._highlightOverlay = null; //高亮poi
                        if (result['cityList'] || result['keywordList'] || result.poiList) {
                            me.drawOverlays(result);
                        }
                        if (options.methodName == "searchNearBy" && me.ifShowCircle) { //如果是周边查询，画出圆的范围
                            var a = me.options.methodArgumments;
                            me.drawCircle(a[1], a[2]);
                        }
                        if (options.methodName == "searchInBounds") { //如果是框查，画出框
                            var a = me.options.methodArgumments;
                            me.drawBound(a[1]);
                        }

                    }
                    if (options.panel) {
                        if (Object.prototype.toString.call(options.panel) == '[object String]') {
                            options.panel = document.getElementById(options.panel);
                        }
                        options.panel.innerHTML = me.view.createPanel(result);
                        me.enableListeners();
                    }
                }
                me.clear = function () {
                    this.clearPanel();
                    this.clearOverlays();
                    this.clearCircle();
                    this.clearBound();
                };
                me.drawOverlays = function (result) { //绘制本页所有的点
                    me.clearOverlays();
                    var pois = result.poiList.pois;

                    me._overlays = this.addOverlays(pois);

                    me.options.map.setFitView(this._overlays, true);
                }
                me.addOverlays = function (points) {
                    var map = this.options.map;
                    var _overlays = [];
                    for (var i = 0, point; i < points.length; i++) { //绘制途经点
                        point = new AMap.Marker({
                            map: map,
                            offset: new AMap.Pixel(-9, -31),
                            size: new AMap.Pixel(19, 33),
                            topWhenClick: true,
                            position: points[i].location, //基点位置
                            content: '<div class="amap_lib_placeSearch_poi">' + (i + 1) + '</div>'
                        });
                        points[i].index = i;
                        point._data = points[i];
                        AMap.event.addListener(point, "click", this.listener.markerClick);
                        _overlays.push(point);
                    }
                    return _overlays;
                }
                me.clearPanel = function () {
                    if (this.options && this.options.panel) {
                        this.options.panel.innerHTML = '';
                    }
                }
                me.clearOverlays = function () {
                    if (this._overlays) {
                        for (var i = 0, overlay; i < this._overlays.length; i++) {
                            overlay = this._overlays[i];
                            overlay.setMap(null);
                        }
                        this._overlays = [];
                    }
                    if (this._infoWindow) {
                        this._infoWindow.close();
                    }
                }
                me.setCenter = function (index) {
                    var poi = me.result.poiList.pois[index];
                    poi.index = index;
                    me.options.map.setCenter(poi.location);
                    me._overlays[index].setTop(true);
                    me.listener.markerClick.call({
                        _data: poi,
                        getPosition: function () {
                            return poi.location;
                        }
                    });
                }
                me.util = {};
                /**
                 * 根据类名获得元素
                 * 参数说明:
                 *      1、className 类名
                 *      2、tag 元素名 默认所有元素
                 *      3、parent 父元素 默认doucment
                 */
                me.util.getElementsByClassName = function (className, tag, parent) {
                    var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
                    //var testClass = new RegExp("(\w|\s)*" + className + "(\w|\s)*");
                    var tag = tag || "*";
                    var parent = parent || document;
                    var elements = parent.getElementsByTagName(tag);
                    var returnElements = [];
                    for (var i = 0, current; i < elements.length; i++) {
                        current = elements[i];
                        if (testClass.test(current.className)) {
                            returnElements.push(current);
                        }
                    }
                    return returnElements;
                }
                me.enableListeners = function () { //注册面板条目点击事件
                    var unfocusTitles = me.util.getElementsByClassName("poibox", "*", me.options.panel);
                    for (var i = 0, unfocusTitle; i < unfocusTitles.length; i++) {
                        unfocusTitle = unfocusTitles[i];
                        AMap.event.addDomListener(unfocusTitle, "click", this.listener.unfocusTitleClick); //poi点击事件
                        //AMap.event.addDomListener(unfocusTitle,"mouseenter",this.listener.unfocusTitleMouseenter);//poi划进
                        //AMap.event.addDomListener(unfocusTitle,"mouseleave",this.listener.unfocusTitleMouseleave);//poi划出
                    }

                    var pageLinks = me.util.getElementsByClassName("pageLink", "*", me.options.panel);
                    for (var i = 0, pageLink; i < pageLinks.length; i++) {
                        pageLink = pageLinks[i];
                        AMap.event.addDomListener(pageLink, "click", me.listener.toPage); //poi点击事件
                    }
                }
                me.listener = {};
                me.listener.markerClick = function () {
                    var data = this._data;
                    me._infoWindow.setContent(me.view.createInfowindowContent(data));
                    me._infoWindow.open(me.options.map, this.getPosition());

                    me.options.map.setCenter(this.getPosition());
                }
                me.listener.unfocusTitleClick = function () { //点击poi面板条目时，负责把此poi移到地图中央，并且打开其信息窗体
                    if (me.last) {
                        me.last.className = "poibox";
                    }
                    me._currentDiv = this;
                    var index;
                    var children = this.parentNode.children;
                    for (var i = 0, child; i < children.length; i++) {
                        child = children[i];
                        if (child === this) {
                            index = i;
                            break;
                        }
                    }
                    me._currentIndex = index; //记录当前poi索引号

                    var div = me._currentDiv;
                    div.className = "poibox active";
                    me.last = div;

                    if (me.options.map) {
                        me.setCenter(me._currentIndex);
                    }

                }
                me.listener.toPage = function () {
                    var pageNo = this.getAttribute("pageNo");
                    me.toPage(pageNo);
                }
                me.toPage = function (pageNo) {
                    if (pageNo.length) {
                        pageNo = parseInt(pageNo);
                    }
                    me.options.placeSearchInstance.setPageIndex(pageNo);
                    me.options.placeSearchInstance[me.options.methodName].apply(me.options.placeSearchInstance, me.options.methodArgumments);
                }
                me.view = {}; //创建dom结构类的方法
                me.view.createInfowindowContent = function (data) { //创建点的infowindow内容
                    var content = document.createElement('div');
                    var div = document.createElement('div');
                    div.className = 'amap-content-body';
                    var c = [];
                    //		c.push('<div class="amap-lib-infowindow">');
                    //		c.push('    <div class="amap-lib-infowindow-title">' + (data.index + 1) + '.' + data.name + '&nbsp;<a href=\"http://detail.amap.com/detail/' + data.id + '?spm=0.0.0.0.sWhSmy&citycode=' + data.citycode + '\" target=\"_blank\">详情»</a></div>');
                    //		c.push('    <div class="amap-lib-infowindow-content">');
                    //		c.push('        <div class="amap-lib-infowindow-content-wrap">');
                    //		c.push('             <div>地址：' + data.address + '</div>');
                    //		if (data.tel) {
                    //			c.push('             <div>电话：' + data.tel + '</div>');
                    //		}
                    //		c.push('        </div>');
                    //		c.push('    </div>');
                    //		c.push('</div>');
                    div.innerHTML = c.join('');

                    var sharp = document.createElement('div');
                    sharp.className = 'amap-combo-sharp';
                    div.appendChild(sharp);

                    var close = document.createElement('div');
                    close.className = 'amap-combo-close';
                    div.appendChild(close);
                    close.href = 'javascript: void(0)';
                    AMap.event.addDomListener(close, 'touchend', function (e) {
                        me._infoWindow['close']();
                    }, this);
                    AMap.event.addDomListener(close, 'click', function (e) {
                        me._infoWindow['close']();
                    }, this);
                    content.appendChild(div);
                    content.appendChild(close);
                    content.appendChild(sharp);
                    return content;
                }
                me.view.createPanel = function (result) { //根据服务插件Amap.PlaceSearch的返回结果，生成panel
                    if (result.poiList && result.poiList.pois.length > 0 && result.info != "NO_DATA") {

                    } else {
                        return "<div class='amap_lib_placeSearch'>抱歉，未搜索到有效的结果。</div>";
                    }
                    var pois = result.poiList.pois;
                    var c = [];
                    c.push("<div class=\"amap_lib_placeSearch\">");
                    c.push("    <div class=\"amap_lib_placeSearch_list\">");
                    c.push("        <ul>");
                    for (var i = 0, poi; i < pois.length; i++) {
                        poi = pois[i];
                        var regExp = new RegExp($('#address').val(), 'g');
                        var addressName = poi.name.replace(regExp, "<b style='color: red;'>" + $('#address').val() + "</b>");

                        c.push("            <li class=\"poibox\"  lngLat = '" + poi.location + "' district = '" + poi.name + "' addcode = '" + poi.id + "' address = '" + poi.address + "'>");
                        c.push("                <p  data-address='" + poi.name + "'>" + addressName + "</p>");
                        c.push("                	<span class=\"poi-addr\">" + poi.address + "</span>");
                        c.push("            </li>");
                    }
                    c.push("        </ul>");
                    c.push("    </div>");
                    //c.push("    <div class=\"amap_lib_placeSearch_page\">");
                    c.push("        <div>");
                    c.push("            <p>");
                    var poiList = result.poiList,
                        count = poiList.count, //493
                        pageIndex = poiList.pageIndex, //1
                        pageSize = poiList.pageSize, //10
                        pageCount = Math.ceil(count / pageSize); //50
                    //		if (pageIndex > 3) {
                    //			c.push(me.view.createPageButton(1, "首页"));
                    //		}
                    //		if (pageIndex > 1) {
                    //			c.push(me.view.createPageButton(pageIndex - 1, "上一页"));
                    //		}
                    //		if (pageIndex - 2 >= 1) {
                    //			c.push(me.view.createPageButton(pageIndex - 2, pageIndex - 2));
                    //		}
                    //		if (pageIndex - 1 >= 1) {
                    //			c.push(me.view.createPageButton(pageIndex - 1, pageIndex - 1));
                    //		}
                    //		c.push("                <span>" + pageIndex + "</span>");
                    //		if (pageIndex + 1 <= pageCount) {
                    //			c.push(me.view.createPageButton(pageIndex + 1, pageIndex + 1));
                    //		}
                    //		if (pageIndex + 2 <= pageCount) {
                    //			c.push(me.view.createPageButton(pageIndex + 2, pageIndex + 2));
                    //		}
                    //		if (pageIndex < pageCount) {
                    //			c.push(me.view.createPageButton(pageIndex + 1, "下一页"));
                    //		}
                    c.push("            </p>");
                    c.push("        </div>");
                    c.push("    </div>");
                    c.push("</div>");
                    return c.join("");
                }

                var circleOptions = {
                    id: 'place-search-circle',
                    radius: 3000,
                    strokeColor: '#72ccff',
                    strokeOpacity: .8,
                    strokeWeight: 1,
                    fillColor: '#d0e7f8',
                    fillOpacity: .2,
                    bubble: true
                };

                me.drawCircle = function (center, radius) { //为周边查询画圆
                    me.clearCircle();

                    circleOptions.map = me.options.map;
                    circleOptions.center = center;
                    circleOptions.radius = radius;

                    me.searchCircle = new AMap.Circle(circleOptions);
                };

                me.clearCircle = function () {
                    if (me.searchCircle) {
                        me.searchCircle.setMap(null);
                        me.searchCircle = null;
                    }
                };

                var boundOptions = {
                    id: 'place-search-bound',
                    strokeColor: '#72ccff',
                    strokeOpacity: .8,
                    strokeWeight: 1,
                    fillColor: '#d0e7f8',
                    fillOpacity: .2,
                    bubble: true
                };
                me.drawBound = function (bound) { //为框查画框
                    me.clearBound();

                    var path = [];
                    if (bound.getNorthWest) {
                        path.push(bound.getNorthWest(), bound.getNorthEast(), bound.getSouthEast(), bound.getSouthWest());
                    } else {
                        path = bound.getPath();
                    }
                    boundOptions.path = path;
                    boundOptions.map = me.options.map;
                    var polygon = new AMap.Polygon(boundOptions);

                    me.searchBound = polygon;
                };

                me.clearBound = function () {
                    if (me.searchBound) {
                        me.searchBound.setMap(null);
                        me.searchBound = null;
                    }
                };

                //	me.view.createPageButton = function(pageNum, text) {
                //		//return "<span><a pageNo=" + pageNum + " class=\"pageLink\" href=\"javascript:void(0)\">" + text + "</a></span>";
                //		return "<span><a pageNo=" + pageNum + " class=\"pageLink\" >" + text + "</a></span>";
                //	}
            }
            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

        /***/
}),
/* 102 */
/***/ (function (module, exports, __webpack_require__) {

        'use strict';

        var _http = __webpack_require__(53);

        var _address = {
            //获取四级地址
            getAreaList: function (areaId, resolve, reject) {
                _http.request({
                    url: _http.getapiServerUrl('/address/getChildNode.json'),
                    data: {
                        addressId: areaId
                    },
                    success: resolve,
                    error: reject
                });
            },
            //获取默认地址--未使用
            getUserDefAddress: function (resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/mds/api/app/apiv3_0/getUserDefAddress.json'),
                    success: resolve,
                    error: reject
                });
            },
            /**
             * 会员微服务--地址列表
             * [addrList description]
             * @param  {[type]} addrInfo [description]
             * {
             *     userId   是   string      会员id,后台获取当前登录用户获取
             *     addrType    是   int     地址类型 0定位地址 1快递地址
             *     addrId  否   int     地址id
             *     pharmacyId  否   int     提供给O2O地址列表使用
             *     shippingId  否   int     提供给O2O地址列表使用    
             * }
             * @param  {[type]} resolve  [description]
             * @param  {[type]} reject   [description]
             * @return {[type]}          [description]
             */
            addrList: function (addrInfo, resolve, reject) {
                _http.request({
                    url: _http.getapiServerUrl('/address/list'),
                    data: addrInfo,
                    success: resolve,
                    error: reject
                });
            },
            /**
             * 会员微服务--地址增删改
             * [addrUpsert description]
             * @param  {[type]} addrInfo [description]
             * {
             *     userId   否   string      会员id,后台获取当前登录用户获取   是
             *     addrType    是   int     平台（0=定位地址；1=快递地址）   是   是
             *     province    是   string      省   是
             *     city    是   string      市   是
             *     district    是   string      区   是
             *     town    否   string      街道  是
             *     provinceId  是   string      省ID 是
             *     cityId  是   string      市ID 是
             *     districtId  是   string      区ID 是
             *     townId  否   string      街道ID    是
             *     address 是   string      详细地址    是
             *     receiverName    是   string      收货人姓名   是
             *     receiverMobile  是   string      收货人电话   是
             *     addrId  否   long        地址ID,为空则新增,不为空则为修改或删除!  看左侧说明   是
             *     area    否   string      否   否
             *     positionAddress 否   string      定位地址 addrType=0时不可为空!   否
             *     xcoord  否   string      经纬度 x addrType=0时不可为空!  否
             *     ycoord  否   string      经纬度 y addrType=0时不可为空!  否
             *     zipCode 否   string      邮编  否
             *     isDefault   否   string      是否默认地址（0=否；1=是） 否
             *     isDefault   否   string      状态（0=删除；1=未删除）  否
             *     remark  否   string      说明  否
             *  }
             * @param  {[type]} resolve  [description]
             * @param  {[type]} reject   [description]
             * @return {[type]}          [description]
             */
            addrUpsert: function (addrInfo, resolve, reject) {
                _http.request({
                    url: _http.getapiServerUrl('/address/upsert'),
                    method: 'post',
                    data: addrInfo,
                    success: resolve,
                    error: reject
                });
            }
        }
        module.exports = _address;

        /***/
}),
/* 103 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function ($) {
            'use strict';

            __webpack_require__(104);
            var tmpl = __webpack_require__(107);
            var _http = __webpack_require__(53);
            var _addressService = __webpack_require__(102);

            var Position = function (callBack) {
                var _this = this;


                this.data = {
                    provinceFlag: '' //记录用户选择省份
                };

                this.defaultOption = {
                    map: '',
                    container: '#adderssBox'
                };


                this.getPosition = function (onComplete, onError) {
                    var mapObj, geolocation;
                    mapObj = new AMap.Map(_this.option.map);
                    mapObj.plugin('AMap.Geolocation', function () {
                        geolocation = new AMap.Geolocation({
                            enableHighAccuracy: true, //是否使用高精度定位，默认:true
                            timeout: 10000, //超过10秒后停止定位，默认：无穷大
                            maximumAge: 0, //定位结果缓存0毫秒，默认：0
                            convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                            showButton: true, //显示定位按钮，默认：true
                            buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
                            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                            showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
                            showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
                            panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
                            zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                        });
                        mapObj.addControl(geolocation);
                        geolocation.getCurrentPosition();
                        AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
                        AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
                    });
                };

                this.getPositionBylnglat = function (lnglatXY, onComplete, onError) {
                    AMap.service('AMap.Geocoder', function () { //回调函数
                        var geocoder = new AMap.Geocoder({
                            radius: 1000,
                            extensions: "all"
                        });
                        geocoder.getAddress(lnglatXY, function (status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                onComplete(result);
                            } else {
                                onError && onError(result);
                            }
                        });
                    });
                }

                this.renderPage = function (option) {
                    var _t = this;
                    _t.option = $.extend({}, this.defaultOption, option);
                    if (_http.getCookie('positionAddress')) {
                        var data = {};
                        data.city = _http.getCookie('positionCity');
                        data.citycode = _http.getCookie('citycode');
                        var html = _http.renderHtml(tmpl, { res: data });
                        $(_t.option.container).html(html);
                        $('#positionCity').html(_http.getCookie('positionCity'));
                        _this.inputTip();
                    } else {
                        this.getPosition(function (data) {
                            var html = _http.renderHtml(tmpl, { res: data.addressComponent });
                            $(_t.option.container).html(html);

                            $('#address').val(data.addressComponent.township + data.addressComponent.street);
                            var _adc = data.addressComponent;
                            _http.setCookie('province', _adc.province, '30', location.hostname);
                            _http.setCookie('provinceId', _adc.adcode.substr(0, 2) + '0000', '30', location.hostname);
                            if (_adc.city == '') {
                                _http.setCookie('positionCity', _adc.province, '30', location.hostname);
                            } else {
                                _http.setCookie('positionCity', _adc.city, '30', location.hostname);
                            }
                            _http.setCookie('citycode', _adc.citycode, '30', location.hostname);
                            _http.setCookie('districtId', _adc.adcode, '30', location.hostname);
                            _http.setCookie('plngLat', [data.position.lng, data.position.lat], '30', location.hostname);
                            _http.setCookie('district', _adc.district, '30', location.hostname);
                            _http.setCookie('positionAddress', data.addressComponent.township + data.addressComponent.street, '30', location.hostname);
                            $('.topPosition span').html(_http.getCookie('positionCity') + _http.getCookie('positionAddress'));
                            $('#positionCity').html(_http.getCookie('positionCity'));
                            _this.inputTip();
                        }, function (data) {
                            //定位失败默认显示北京公司地址
                            var lnglat = [116.360878, 39.756668];
                            _t.getPositionBylnglat(lnglat, function (data) {
                                var res = data.regeocode.addressComponent;

                                if (res.city == '') {
                                    var city = res.province;
                                    res.city = res.province;
                                } else {
                                    var city = res.city;
                                }

                                var html = _http.renderHtml(tmpl, { res: res });
                                $(_t.option.container).html(html);

                                _http.setCookie('province', res.province, '30', location.hostname);
                                _http.setCookie('provinceId', res.adcode.substr(0, 2) + '0000', '30', location.hostname);
                                _http.setCookie('positionCity', city, '30', location.hostname);
                                _http.setCookie('citycode', res.citycode, '30', location.hostname);
                                _http.setCookie('districtId', res.adcode, '30', location.hostname);
                                _http.setCookie('district', res.district, '30', location.hostname);
                                _http.setCookie('plngLat', lnglat, '30', location.hostname);
                                _http.setCookie('positionAddress', res.township + res.street, '30', location.hostname);

                                $('.topPosition span').html(_http.getCookie('positionCity') + _http.getCookie('positionAddress'));
                                $('#address').val(res.township + res.street);

                                _this.inputTip();
                            }, function (res) {
                                alertBox('body', '定位失败,请手动选择地址');
                            });
                        });
                    }




                    if (_http.getCookie('positionAddress')) {
                        $('#address').val(_http.getCookie('positionAddress'));
                    }
                };
                this.renderPageBylnglat = function (option, res) {
                    var _t = this;
                    _t.option = $.extend({}, this.defaultOption, option);

                    var html = _http.renderHtml(tmpl, { res: res });
                    $(_t.option.container).html(html);


                    $('#positionWrapper').attr('provinceId', res.provinceId);
                    $('#positionWrapper').attr('province', res.province);
                    $('#positionWrapper').attr('cityId', res.cityId);
                    $('#positionWrapper').attr('city', res.city);
                    $('#positionWrapper').attr('district', res.district);
                    $('#positionWrapper').attr('plngLat', [res.gdXcoord, res.gdYcoord]);
                    $('#positionWrapper').attr('address', res.addr);

                    _this.inputTip();
                };

                //输入提示
                this.inputTip = function () {
                    $('#address').focus(function () {
                        $('.p_content').hide();
                    })
                    $('#address').bind('input propertychange', function () {
                        $('.detailInfo').show();
                        $('.p_content').hide();
                        var keywords = $(this).val();
                        _this.inputPrompt($('#positionCity').text(), keywords); //$('#positionCity').text()
                    })
                };
                //加载区域
                this.loadRegion = function (name, type) {
                    //$('.p_content').show();
                    var districtSearch = null;
                    AMap.service('AMap.DistrictSearch', function () { //回调函数
                        //实例化DistrictSearch        
                        //TODO: 使用districtSearch对象调用行政区查询的功能
                        districtSearch = new AMap.DistrictSearch({
                            level: 'province',
                            subdistrict: 2
                        });
                    })
                    districtSearch.search(name, function (status, result) {
                        if (status == 'complete') {
                            var data = result.districtList[0].districtList;
                            if (type == 0) {
                                _this.provinceData(data);
                            } else {
                                _this.cityData(data, name);
                            }
                        }
                    })
                };
                //获取省份列表
                this.provinceData = function (res) {
                    if ($('#province li').length < 1) {
                        var pCode = $('#positionWrapper').attr('provinceId') || _http.getCookie('provinceId'),
                            province = $('#positionWrapper').attr('province') || _http.getCookie('province') || '北京',
                            selClass = '';
                        _this.data.provinceFlag = province;

                        for (var i = 0; i < res.length; i++) {
                            if (pCode == res[i].adcode) {
                                selClass = 'class="actived"';
                            } else {
                                selClass = '';
                            }
                            var provinceList = '<li ><a href="javascript:void(0);" ' + selClass + ' data-adcode=' + res[i].adcode + '>' + res[i].name + '</a></li>';
                            $('#province').append(provinceList);
                        }

                        _this.loadRegion(province, 1);
                    } else {
                        $('#province a').removeClass('actived');
                        $.each($('#province a'), function () {
                            if ($(this).text() == _this.data.provinceFlag) {
                                $(this).addClass('actived');
                                return;
                            }
                        });

                        _this.loadRegion(_this.data.provinceFlag, 1);
                    }


                    $('#adderssBox').on('click', '#province a', function () {

                        $('#province a').removeClass('actived');
                        $(this).addClass('actived');
                        var name = $(this).text();
                        _this.loadRegion(name, 1);

                        _http.setCookie('provinceZX', name, '30', location.hostname);

                    })
                };
                //获取城市列表
                this.cityData = function (res, name) {
                    var data = res;
                    $('#city').html('');
                    if (data == null) {
                        return;
                    }
                    for (var j = 0; j < data.length; j++) {
                        var cityList = '<li><a province=' + name + ' citycode="' + data[j].citycode + '"  href="javascript:void(0);">' + data[j].name + '</a></li>';
                        $('#city').append(cityList);
                    }

                    $('#adderssBox').on('click', '#city li', function () {
                        var _cty = $(this).children('a');
                        var citycode = _cty.attr('citycode');
                        var selectcity = '';
                        _this.data.provinceFlag = _cty.attr('province');


                        $('.icon_arrow').removeClass('on');
                        $('.p_content').hide();
                        $('#address').val('');
                        $('#addressList').html('');
                        if ($(this).children('a').html() == '北京城区') {
                            selectcity = '北京市';
                        } else if ($('#city li').length == 1) {
                            selectcity = _http.getCookie('provinceZX');
                        } else {
                            selectcity = $(this).children('a').html();
                        }
                        $('.city').attr('citycode', citycode).html(selectcity);

                    })
                };
                this.adderssBox = function (res) {
                    var _t = this;
                    if (res && (typeof res == 'object')) {
                        _this.renderPageBylnglat({
                            container: '#adderssBox'
                        }, res);

                    } else {
                        _this.renderPage({
                            container: '#adderssBox'
                        });
                    }
                    if (callBack) {
                        callBack && callBack();
                    }
                    // 搜索用，用户定位地址--废弃
                    // if ($('#dialogBox_address').length > 0 && _http.getCookie('accountId')) {
                    //     _addressService.addrList({
                    //         userId: _http.getCookie('accountId'),
                    //         addrType: 0
                    //     }, function(res) {
                    //         var data = res.data;
                    //         if (data.length > 0) {
                    //             $('.niAddress').show();
                    //             $.each(data, function(index, obj) {
                    //                 if (obj.province == obj.city) {
                    //                     var procity = obj.city;
                    //                 } else {
                    //                     var procity = obj.province + obj.city;
                    //                 }
                    //                 var list = '<li data-lngLat="' + obj.xcoord + ',' + obj.ycoord + '" data-address=' + obj.positionAddress + '>' +
                    //                     '<p>' + obj.receiverName + '&nbsp;&nbsp;' + obj.receiverMobile + '</p>' +
                    //                     '<p>' + procity + obj.district + obj.positionAddress + obj.address + '</p>' +
                    //                     '</li>';
                    //                 $('.o2oAddresslist').append(list);
                    //             })

                    //             $('.o2oAddresslist').on('click', 'li', function() {
                    //                 $(this).addClass('active').siblings('li').removeClass('active');
                    //                 var plngLat = $(this).attr('data-lngLat').split(',');
                    //                 var address = $(this).attr('data-address');
                    //                 _http.setCookie('positionAddress', address, '30', location.hostname);
                    //                 _t.getPositionBylnglat(plngLat, function(data) {
                    //                     var res = data.regeocode.addressComponent;
                    //                     if (res.city == '') {
                    //                         var city = res.province;
                    //                     } else {
                    //                         var city = res.city;
                    //                     }
                    //                     _http.setCookie('province', res.province, '30', location.hostname);
                    //                     _http.setCookie('provinceId', res.adcode.substr(0, 2) + '0000', '30', location.hostname);
                    //                     _http.setCookie('positionCity', city, '30', location.hostname);
                    //                     _http.setCookie('citycode', res.citycode, '30', location.hostname);
                    //                     _http.setCookie('districtId', res.adcode, '30', location.hostname);
                    //                     _http.setCookie('district', res.district, '30', location.hostname);
                    //                     _http.setCookie('plngLat', plngLat, '30', location.hostname);
                    //                     _http.setCookie('positionAddress', address, '30', location.hostname);

                    //                     $('.topPosition span').html(_http.getCookie('positionCity') + _http.getCookie('positionAddress'));
                    //                     $('#positionCity').html(_http.getCookie('positionCity'));
                    //                     $('#address').val(_http.getCookie('positionAddress'));
                    //                     $('.address_title').text('送至:' + _http.getCookie('positionCity') + _http.getCookie('positionAddress'));

                    //                     $('.sel_address').html(_http.getCookie('positionCity') + _http.getCookie('positionAddress'));


                    //                     $('#positionWrapper').attr('provinceId', res.adcode.substr(0, 2) + '0000');
                    //                     $('#positionWrapper').attr('province', res.province);
                    //                     $('#positionWrapper').attr('cityId', res.citycode);
                    //                     $('#positionWrapper').attr('city', res.city);
                    //                     $('#positionWrapper').attr('districtId', res.adcode);
                    //                     $('#positionWrapper').attr('district', res.district);
                    //                     $('#positionWrapper').attr('plngLat', plngLat);
                    //                     $('#positionWrapper').attr('address', address);
                    //                     if (callBack) {
                    //                         callBack && callBack();
                    //                     }
                    //                 });
                    //             })

                    //         }
                    //     }, function(msg) {

                    //     });
                    // }

                    $('#adderssBox').on('click', '#selectCity', function () {
                        var icon = $(this).children('i');
                        if (icon.hasClass('on')) {
                            icon.removeClass('on');
                            $('.p_content').hide();
                        } else {
                            icon.addClass('on');
                            $('.p_content').show();
                        }
                        $('.detailInfo').hide();
                        _this.loadRegion('中国', 0);
                    })
                };

                //输入提示
                this.inputPrompt = function (city, keywords) {
                    var _t = this;
                    var placeSearchOptions = { //构造地点查询类
                        pageSize: 20,
                        pageIndex: 1,
                        city: city //城市
                    };
                    var placeSearch = new AMap.PlaceSearch(placeSearchOptions);
                    placeSearch.search(keywords, callback);
                    var placeSearchRender = new Lib.AMap.PlaceSearchRender();

                    function callback(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            placeSearchRender.autoRender({
                                placeSearchInstance: placeSearch,
                                methodName: "search",
                                methodArgumments: [keywords, callback],
                                data: result,
                                panel: "addressList"
                            });


                            $('#addressList').off('click').on('click', 'li', function (e) {
                                e.preventDefault();
                                e.stopPropagation();
                                var address = $(this).children('p').attr('data-address');

                                _http.setCookie('positionAddress', address, '30', location.hostname);

                                $('#address').val(address);
                                $('.detailInfo').hide();
                                _http.setCookie('positionDistrict', $(this).children('span').html(), '30', location.hostname);


                                var plngLat = $(this).attr('lngLat').split(',');
                                _t.getPositionBylnglat(plngLat, function (data) {
                                    var res = data.regeocode.addressComponent;

                                    if (res.city == '') {
                                        var city = res.province;

                                    } else {
                                        var city = res.city;
                                    }
                                    _http.setCookie('province', res.province, '30', location.hostname);
                                    _http.setCookie('provinceId', res.adcode.substr(0, 2) + '0000', '30', location.hostname);
                                    _http.setCookie('positionCity', city, '30', location.hostname);
                                    _http.setCookie('citycode', res.citycode, '30', location.hostname);
                                    _http.setCookie('districtId', res.adcode, '30', location.hostname);
                                    _http.setCookie('district', res.district, '30', location.hostname);
                                    _http.setCookie('plngLat', plngLat, '30', location.hostname);
                                    _http.setCookie('positionAddress', address, '30', location.hostname);

                                    $('.topPosition span').html(_http.getCookie('positionCity') + _http.getCookie('positionAddress'));
                                    $('.address_title').text('送至:' + _http.getCookie('positionCity') + _http.getCookie('positionAddress'));

                                    $('.sel_address').html(_http.getCookie('positionCity') + _http.getCookie('positionAddress'));

                                    $('#positionWrapper').attr('provinceId', res.adcode.substr(0, 2) + '0000');
                                    $('#positionWrapper').attr('province', res.province);
                                    $('#positionWrapper').attr('cityId', res.citycode);
                                    $('#positionWrapper').attr('city', res.city);
                                    $('#positionWrapper').attr('districtId', res.adcode);
                                    $('#positionWrapper').attr('district', res.district);
                                    $('#positionWrapper').attr('plngLat', plngLat);
                                    $('#positionWrapper').attr('address', address);
                                    if (callBack) {
                                        callBack && callBack();
                                    }
                                });
                            })

                        }
                    }

                };




            };


            module.exports = Position;
            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

        /***/
}),
/* 104 */
/***/ (function (module, exports) {

        // removed by extract-text-webpack-plugin

        /***/
}),
/* 105 */,
/* 106 */,
/* 107 */
/***/ (function (module, exports) {

        module.exports = "<div id=\"positionWrapper\" class=\"positionWrapper\" >\n\t<div class=\"p_title cf\">\n\t\t<div class=\"label\" id=\"selectCity\"><span id=\"positionCity\" class=\"city\" citycode = {{res.citycode}}>{{res.city}}</span><i class=\"icon_arrow\"></i></div>\n\t\t<div class=\"content\"><input id=\"address\" class=\"street inputtype\" type=\"text\" placeholder=\"请输入您所在 小区/学校/大厦 名称\" value=\"{{res.addr}}\"></div>\n\t</div>\n\t<div class=\"p_content\">\n\t\t<div class=\"areaInfo\">\n\t\t\t<ul class=\"provinceList lFloat\" id=\"province\">\n\t\t\t\t\n\t\t\t</ul>\n\t\t\t<ul class=\"cityList rFloat\" id=\"city\">\n\t\t\t\t\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n\t<div class=\"detailInfo divnone\">\n\t\t<div id=\"addressList\">\n\t\t\t\n\t\t</div>\n\t</div>\t\n</div>\n\n";

        /***/
}),
/* 108 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function ($) {
            'use strict';
            __webpack_require__(109);
            var tpl = __webpack_require__(122);
            var _http = __webpack_require__(53);
            var _productServer = __webpack_require__(123);
            var SelectAddress = __webpack_require__(124);
            var imgUpload = __webpack_require__(132);
            var numbers = /^(1\d{2}|[1-9]\d?|200)$/,
                regPhone = /^1\d{10}$/,
                reg = /^1\d{10}$|^0\d{2,3}-\d{7,8}$/,
                contactName = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
                nameReg = /^.{2,10}$/,
                age = /\d+/,
                addressDetailsReg = /^.{1,50}$/;

            var orderBuffers = function () {
                var _this = this;
                var isExceed = false;

                this.init = function (fn, productParam) {
                    _this.bindEvent(fn, productParam);
                    $('.myzt').hide(); //2019.01.16 去掉o2o需求登记功能
                };
                this.render = function () {
                    var cont = _http.renderHtml(tpl, {});
                    return cont;
                };
                this.bindEvent = function (fn, productParam) {
                    var _this = this;
                    var prescriptionPath = null;
                    var limit = 999;
                    var store = productParam.store;
                    $('#planNum').val(productParam.quantity);
                    if (productParam.limitSum && productParam.limitSum != '' && productParam.limitSum != -1) {
                        limit = Math.min(parseInt(productParam.limitSum), parseInt(store), 999);
                    } else if (store) {
                        limit = Math.min(parseInt(store), 999);
                    }
                    if (parseInt(productParam.quantity) >= limit) {
                        $('#planNum').val(limit);
                        if (limit <= 0) {
                            $('#planNum').siblings('.js-minus').addClass('disabled');
                        }
                        $('#planNum').siblings('.js-plus').addClass('disabled');
                    } else {
                        $('#planNum').siblings('.js-plus').removeClass('disabled');
                    }
                    operateCount(".count", function (val, _dom) {
                        val = parseInt(val);
                        if (val >= limit) {
                            // $('.xgSum').show();
                            $('#planNum').val(limit);
                            $('#planNum').siblings('.js-plus').addClass('disabled');
                        } else if (val <= 0) {
                            $('#planNum').siblings('.js-minus').addClass('disabled');
                        } else {
                            // $('.xgSum').hide();
                            $('#planNum').siblings('.js-plus').removeClass('disabled');
                        }
                    });

                    if (productParam.since == 1) {
                        $('.myzt').text('上门服务');
                        $('.isShow').hide();
                        $('.ziAddress').show();
                        $('.adre').text(productParam.pharmacyAddress);
                        $('#contactName').val(productParam.receiveName);
                        $('#contactAge').val(productParam.age);
                        $('#contactPhone').val(productParam.phone);
                    }
                    //初始化地址
                    var selectAddress = new SelectAddress();
                    selectAddress.init({
                        provinceId: '',
                        cityId: productParam.cityCode || '',
                        districtId: '',
                        townId: '',
                        province: productParam.provinceName || '',
                        city: productParam.cityName || '',
                        district: productParam.districtName || '',
                        town: productParam.townshipName || ''
                    }, '#dialogBox_needRegister');
                    if (productParam.sex == 0) {
                        $('#sex i:eq(0)').addClass('active').siblings().removeClass('active');
                    } else {
                        $('#sex i:eq(1)').addClass('active').siblings().removeClass('active');
                    }
                    if (productParam) {
                        $('#contactName').val(productParam.receiveName);
                        $('#contactAge').val(productParam.age);
                        $('#contactPhone').val(productParam.phone);
                        $('#addressDetail').val(productParam.addressDetail);
                    }


                    $('.xprotitle').html(productParam.productTitle);
                    if (productParam.limitSum == -1) {
                        $('.xgSum').hide();
                    } else {
                        $('.xgSum b').text(productParam.limitSum);
                    }

                    $('#sex i').on('click', function () {
                        $(this).addClass('active').siblings().removeClass('active');
                    })
                    // 上传处方笺
                    var oImgUpload = new imgUpload();
                    oImgUpload.init($('.prescription'), {
                        fileId: 'prescription', //file控件的id
                        url: _http.tradeServerHost + "/trade/shopcart/v1/shopcarts/upload", //上传图片地址
                        checkSize: true, //检查图片大小
                        success: function (res) { //上传完后,回调方法
                            var str = '';
                            if (res && res.data && res.data.originalUrl) {
                                str = '<img src="' + res.data.originalUrl + '"/><i class="del"></i><i class="btn-enlarge"></i>';
                                prescriptionPath = res.data.originalUrl;
                                $('.prescription .img-box').html(str);
                                $('.enlarge-box img').attr("src", res.data.originalUrl);
                                $(".prescription .del").off('click').on("click", function (e) {
                                    e.stopPropagation();
                                    $('.prescription .img-box').html('');
                                    $('.enlarge-box img').attr("src", '');
                                    $("#prescription").val('');
                                    prescriptionPath = null;
                                });
                                $(".prescription .img-box").off('click').on("click", function (e) {
                                    e.stopPropagation();
                                    if ($("#prescription").val() == '') {
                                        $("#prescription").trigger("click");
                                    } else {
                                        $(".enlarge-box").show();
                                        $(".prescription").hide();
                                    }
                                });
                            } else {
                                prescriptionPath = null;
                                $("#prescription").val('');
                                $('.prescription .img-box').html('');
                            }
                        },
                        error: function (err) { //上传完后,回调方法
                            alertBox('body', err);
                            $('.prescription .img-box').html('');
                            $("#prescription").val('');
                            prescriptionPath = null;
                        }
                    }, function () { //加载完控件后回调
                        $(".prescription .img-box").on("click", function (e) {
                            e.stopPropagation();
                            $("#prescription").trigger("click");
                        });
                        $(".enlarge-box .close").on("click", function () {
                            $(".enlarge-box").hide();
                            $(".prescription").show();
                        });
                    });
                    _this.isBtn(productParam);


                    $('#contactName').blur(function () {
                        var val = $(this).val().trim();
                        if (!contactName.test(val) || !nameReg.test(val)) {
                            $(this).parent().addClass('error');
                        } else {
                            $(this).parent().removeClass('error');
                        }
                    });

                    $('#contactName').bind('input propertychange', function () {
                        var val = $(this).val().trim();
                        if (!nameReg.test(val)) {
                            $(this).parent().addClass('error');
                        } else {
                            $(this).parent().removeClass('error');
                        }
                        _this.isBtn(productParam);
                    });

                    $('#contactAge').blur(function () {
                        if (!numbers.test($(this).val())) {
                            $(this).parent().addClass('error');
                        } else {
                            $(this).parent().removeClass('error');
                        }
                    });
                    $('#contactAge').bind('input propertychange', function () {
                        $(this).val($(this).val().replace(/\D/g, ''));
                        if (!numbers.test($(this).val())) {
                            $(this).parent().addClass('error');
                        } else {
                            $(this).parent().removeClass('error');
                        }
                        _this.isBtn(productParam);
                    });

                    // $('#contactPhone').blur(function(){
                    //  if(productParam.pharmacyId!=25){
                    //      var reg_Phone=regPhone.test($(this).val());
                    //  }else{
                    //      var reg_Phone=reg.test($(this).val());
                    //  }
                    //  if(!reg_Phone){
                    //      $(this).parent().addClass('error');
                    //  }else{
                    //      $(this).parent().removeClass('error');
                    //  }
                    // });
                    $('#contactPhone').bind('input propertychange', function () {
                        if (productParam.pharmacyId != 25) {
                            var reg_Phone = regPhone.test($(this).val());
                        } else {
                            var reg_Phone = reg.test($(this).val());
                        }
                        if (!reg_Phone) {
                            $(this).parent().addClass('error');
                        } else {
                            $(this).parent().removeClass('error');
                        }
                        _this.isBtn(productParam);
                    });

                    $('#addressDetail').blur(function () {
                        if (!addressDetailsReg.test($(this).val())) {
                            $(this).addClass('error');
                        } else {
                            $(this).removeClass('error');
                        }
                    });
                    $('#addressDetail').bind('input propertychange', function () {
                        $(this).val($(this).val().replace(/(^\s*)|(\s*$)/g, ''));
                        if (!addressDetailsReg.test($(this).val())) {
                            $(this).addClass('error');
                        } else {
                            $(this).removeClass('error');
                        }
                        _this.isBtn(productParam);
                    });

                    $('#address_title').bind('input propertychange', function () {
                        if (_http.isEmptyObject(selectAddress.townId)) {
                            $(this).parents('.sel_address').addClass('error');
                        } else {
                            isExceed = false;
                            $(this).parents('.sel_address').removeClass('error');
                        }
                        _this.isBtn(productParam);
                    });



                    //提交需求
                    $('#dialogBox_needRegister').on('click', '#needRgst_btn', function () {
                        var name = $('#contactName').val();
                        // 埋点
                        var sex = $('#sex i.active').attr('data-sex') == 0 ? '男' : '女';
                        ehyTrack.track('确认需求登记', {
                            '药品名称': $('.infoDetails h1').text(),
                            '药品数量': $('#planNum').val(),
                            '患者性别': sex,
                            '套餐ID': $('.infoDetails h1').data('groupid'),
                            '商品ID': $('.infoDetails h1').attr('id'),
                            '药品标识': $('.infoDetails h1').data('isprescribed') == 1 ? '处方' : '其他',
                            'SKU': $('.hnumber').data('bn'),
                            '患者年龄': $('#contactAge').val(),
                            '上传处方笺': prescriptionPath ? '是' : '否'
                        });
                        if (!contactName.test(name) || !nameReg.test(name)) {
                            $(this).addClass('disabled');
                        }
                        if ($(this).hasClass('disabled')) {
                            return;
                        }
                        if ($('#planNum').val() <= 0) {
                            alertBox('body', '数量不能为0');
                            return;
                        }
                        var addressDetail = $('#addressDetail').val()

                        $(this).addClass('disabled');

                        var params = {
                            "pharmacyId": productParam.pharmacyId,
                            "platformId": "3",
                            "addressDetail": addressDetail,
                            "phone": $('#contactPhone').val(),
                            "provinceName": selectAddress.province || productParam.provinceName,
                            "cityName": selectAddress.city || productParam.cityName,
                            "districtName": selectAddress.district || productParam.districtName,
                            "townshipName": selectAddress.town || productParam.townshipName,
                            "cityCode": selectAddress.cityId || productParam.cityCode,
                            "sex": $('#sex i.active').attr('data-sex'),
                            "age": $('#contactAge').val(),
                            "receiveName": $('#contactName').val().trim(),
                            "shippingId": productParam.shippingId,
                            "channel": _http.getCookie('source') || '',
                            "prescriptionPath": prescriptionPath,
                            'listCart': [{
                                'cartId': productParam.cartId,
                                'itemId': productParam.goodsId,
                                'itemQuantity': parseInt($('#planNum').val())
                            }]
                        }

                        _productServer.orderBuffers(params, function (res) {
                            $(this).removeClass('disabled');
                            if (res.status == 0) {
                                ehyTrack.track('提交需求登记成功', {
                                    '药品名称': $('.infoDetails h1').text(),
                                    '药品数量': $('#planNum').val(),
                                    '患者性别': sex,
                                    '套餐ID': $('.infoDetails h1').data('groupid'),
                                    '商品ID': $('.infoDetails h1').attr('id'),
                                    '药品标识': $('.infoDetails h1').data('isprescribed') == 1 ? '处方' : '其他',
                                    'SKU': $('.hnumber').data('bn'),
                                    '患者年龄': $('#contactAge').val(),
                                    '需求登记id': res.data[0]
                                });
                                fn();
                                $(".main").hide();
                                $('body').css('background', '#f5f5f5');
                                $('.demand-complete').show();
                                // var cont = '<div class="cf">' +
                                //     '<p>您需求的是处方药，为了您的用药安全，我们合作医院的医生稍后会联系您，核实病情开具处方，请保持手机畅通，如无法联系，我们将取消需求/预定，感谢理解！</p>' +
                                //     '<div class="lFloat successbtn continue">继续浏览</div><div class="rFloat successbtn myRequirement">我的需求</div>' +
                                //     '</div>';
                                // new ehaoyao.tips({
                                //     position: "center",
                                //     id: "needRegisterSuccess",
                                //     style: "needRegisterSuccess",
                                //     hasTitle: true,
                                //     title: "需求提交成功",
                                //     content: cont,
                                //     callback: function(fn) {
                                //         $('.continue,.btn-close').on('click', function() {
                                //             fn();
                                //             if (window.location.href.indexOf('myRequirement.html') > 0 || window.location.href.indexOf('userHome.html') > 0) {
                                //                 window.location.reload();
                                //             }
                                //         })
                                //         $('.myRequirement').on('click', function() {
                                //             if (isLogin()) {
                                //                 window.location.href = _http.host + '/myRequirement.html';
                                //             } else {
                                //                 $('#needRegisterSuccess').hide();
                                //                 _http.setCookie('jump_url', _http.host + '/myRequirement.html');
                                //                 showLogin('p');
                                //             }
                                //         })
                                //     }
                                // });
                            } else if (res.status == -1) {
                                alertBox('body', res.msg);
                            }
                        }, function (errMsg) {
                            fn();
                            $(this).removeClass('disabled');
                            var cont = errMsg.status == -1 ? '<div class="cf">' +
                                '<p class="error">不好意思，一不小心信息走失了，求您重新填写一遍，拜托了！</p>' +
                                '<div class="successbtn">重新填写</div>' +
                                '</div>' : '<div class="cf" ><p class="error-t">您的需求正在审核，请勿重复提交</p></div>';
                            new ehaoyao.tips({
                                position: "center",
                                id: "needRegisterError",
                                style: "needRegisterError",
                                hasTitle: true,
                                title: "提示",
                                content: cont,
                                callback: function (fn) {
                                    $('.successbtn').on('click', function () {
                                        fn();
                                    })
                                }
                            });
                        })
                    })
                };
                this.isBtn = function (productParam) {
                    var _this = this;
                    var addressDetail = $('#addressDetail').val(),
                        phone = $('#contactPhone').val(),
                        age = $('#contactAge').val(),
                        receiveName = $('#contactName').val().trim(),
                        address = $('#address_title').val(),
                        reg_Phone;
                    if (productParam.pharmacyId != 25) {
                        reg_Phone = regPhone.test(phone);
                    } else {
                        reg_Phone = reg.test(phone);
                    }
                    if (contactName.test(receiveName) && nameReg.test(receiveName) && numbers.test(age) && reg_Phone && !isExceed &&
                        !_http.isEmptyObject(address) && addressDetailsReg.test(addressDetail) && addressDetail != '如1号楼一单元101室') {
                        $('#needRgst_btn').removeClass('disabled');
                    } else {
                        $('#needRgst_btn').addClass('disabled');
                    }
                }

            };
            module.exports = orderBuffers;
            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

        /***/
}),
/* 109 */
/***/ (function (module, exports) {

        // removed by extract-text-webpack-plugin

        /***/
}),
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */
/***/ (function (module, exports, __webpack_require__) {

        module.exports = __webpack_require__.p + "/static/images/sex.png";

        /***/
}),
/* 114 */
/***/ (function (module, exports, __webpack_require__) {

        module.exports = __webpack_require__.p + "/static/images/sexActive.png";

        /***/
}),
/* 115 */
/***/ (function (module, exports, __webpack_require__) {

        module.exports = __webpack_require__.p + "/static/images/icon_prescription_add.png";

        /***/
}),
/* 116 */
/***/ (function (module, exports, __webpack_require__) {

        module.exports = __webpack_require__.p + "/static/images/icon_prescription_del.png";

        /***/
}),
/* 117 */
/***/ (function (module, exports, __webpack_require__) {

        module.exports = __webpack_require__.p + "/static/images/icon_prescription_enlarge.png";

        /***/
}),
/* 118 */
/***/ (function (module, exports, __webpack_require__) {

        module.exports = __webpack_require__.p + "/static/images/icon_prescription_close.png";

        /***/
}),
/* 119 */
/***/ (function (module, exports, __webpack_require__) {

        module.exports = __webpack_require__.p + "/static/images/needicon.png";

        /***/
}),
/* 120 */,
/* 121 */,
/* 122 */
/***/ (function (module, exports) {

        module.exports = "<form class=\"wp\">\r\n\t<p class=\"wxtip jbg\">根据国家食品药监局规定,请登记真实信息以便药师联系！</p>\r\n\t<h5 class=\"xprotitle\">阿莫西林颗粒</h5> \r\n\t<div class=\"item cf num-control\"> \r\n\t\t<span class=\"item-label\">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量</span> \r\n\t\t<div class=\"item-warp\">\r\n\t\t\t<div class=\"count\">\r\n  \t\t\t<span class=\"js-minus\">-</span>\r\n  \t\t\t<input id=\"planNum\" class=\"js-input\" autocomplete=\"off\" value=\"1\" maxlength=\"3\" type=\"text\">\r\n  \t\t\t<span class=\"js-plus add\">+</span></div>\r\n\t\t</div>\r\n\t    <div class=\"lFloat xgSum\">每人限登记<b></b>件</div>\r\n\t</div>\r\n\t<div class=\"cont-box\">\r\n\t\t<div class=\"item cf\"> \r\n\t\t\t<span class=\"item-label\">患者姓名</span> \r\n\t\t\t<div class=\"item-warp bk lFloat\"><input id=\"contactName\" class=\"inputtext\" type=\"text\" placeholder=\"请填写姓名\" ></div>\r\n\t\t</div> \r\n\t\t<div class=\"item cf\"> \r\n\t\t\t<span class=\"item-label\">患者性别</span>\r\n\t\t\t<div class=\"item-warp lFloat\" id=\"sex\"><i class=\"active\" data-sex=\"0\">男</i><i data-sex=\"1\">女</i></div>\r\n\t\t</div> \r\n\t\t<div class=\"item cf\"> \r\n\t\t\t<span class=\"item-label\">患者年龄</span> \r\n\t\t\t<div class=\"item-warp bk lFloat\"><input id=\"contactAge\" maxlength=\"3\" class=\"inputtext\" type=\"text\" placeholder=\"请填写年龄\" ></div>\r\n\t\t</div> \r\n\t\t\r\n\t\t<div class=\"item cf\"> \r\n\t\t\t<span class=\"item-label\">回拨电话</span> \r\n\t\t\t<div class=\"item-warp bk lFloat\"><input id=\"contactPhone\" name=\"telphone\" class=\"inputtext\" type=\"text\" placeholder=\"请填写手机号码或区号-电话号码\" ></div>\r\n\t\t</div> \r\n\t\t<div class=\"item cf isShow\">\r\n\t\t\t<span class=\"item-label\">收货地址</span> \r\n\t\t\t<div id=\"selectAddressBox\" class=\"lFloat selectAddress\">\r\n\t\t\t\t<div class=\"sel_address\">\r\n\t\t\t\t\t<input id=\"address_title\" class=\"address_title default\" type=\"text\" name=\"address_title\" placeHolder=\"请选择省/市/区/街道\"  readonly=\"readonly\">\r\n\t\t\t\t\t<span class=\"address_btn\"></span>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div> \r\n\t\t<div class=\"item cf isShow\"> \r\n\t\t\t<span class=\"item-label\">详细地址</span> \r\n\r\n\t\t<div class=\"item-warp address lFloat\"><textarea maxlength=\"50\" onfocus=\"if(this.value=='如1号楼一单元101室')this.value=''\"  id=\"addressDetail\" name=\"\" class=\"textarea detailadd\" >如1号楼一单元101室</textarea></div>\r\n\r\n\t\t</div> \r\n\t\t<div class=\"item cf ziAddress none\">\r\n\t\t\t<span class=\"item-label\">自提地址</span> \r\n\t\t\t<div class=\"lFloat adre\"></div>\r\n\t\t</div> \r\n\t\t<div class=\"item cf\"> \r\n\t\t\t<span class=\"item-label\">上传处方<b>(非必填)</b></span> \r\n\t\t\t<div class=\"item-warp lFloat prescription\">\r\n\t\t\t\t<div class=\"file-box\"><input type=\"file\" hidden id=\"prescription\" accept=\"image/gif,image/jpg,image/png,image/jpeg\"/></div>\r\n\t\t\t\t<div class=\"img-box\"></div>\r\n\t\t\t\t<p class=\"tip\">*为提升审核效率，请上传处方笺（仅支持jpg、png、gif格式，大小不超过5MB，仅需上传1张处方笺）</p>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"item-warp lFloat enlarge-box\">\r\n\t\t\t\t<i class=\"close\"></i>\t\r\n\t\t\t\t<img src=\"https://ehaoyao.oss-cn-hangzhou.aliyuncs.com/2017/12/27/1514342354963_37.png\"/>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<p class=\"tips\">如紧急 , 请拨打<em>400-648-5566</em>咨询</p>\r\n\t\t<div class=\"item btnpadding\"><a id=\"needRgst_btn\" class=\"btn-submit submit-btn-green disabled\">确&nbsp;&nbsp;认</a><a class=\"myzt\" >我要自提</a></div>\r\n\t</div> \r\n</form>";

        /***/
}),
/* 123 */
/***/ (function (module, exports, __webpack_require__) {

        'use strict';

        var _http = __webpack_require__(53);

        var _product = {
            // 获取商品列表--未使用
            getProductList: function (listParam, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/product/list.do'),
                    data: listParam,
                    success: resolve,
                    error: reject
                });
            },
            // 判断是否次日达--未使用
            isdelivery: function (deliveryParam, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/morrowDelivery/isdelivery.json'),
                    data: deliveryParam,
                    success: resolve,
                    error: reject
                });
            },
            // 获取商品详细信息
            getProductDetail: function (productParam, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/mds/api/app/apiv3_0/goodsBaseInfoPc.json'),
                    data: productParam,
                    success: resolve,
                    error: reject
                });
            },
            // 获取评论数据
            getProductComments: function (params, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/mds/api/app/apiv3_0/getGoodsComments.json'),
                    data: params,
                    success: resolve,
                    error: reject
                });
            },
            //获取浏览记录--未使用
            getProductTracks: function (TracksParam, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/mobile/memberTracks/myTracks3_0.json'),
                    data: TracksParam,
                    success: resolve,
                    error: reject
                });
            },
            //添加关注
            addfollow: function (followParam, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/mobile/memberCollection/addGoods.json'),
                    data: followParam,
                    success: resolve,
                    error: reject
                });
            },
            //需求登记
            orderBuffers: function (param, resolve, reject) {
                _http.applicationRequest({
                    url: _http.gettradeServerUrl('/trade/shopcart/v1/shopcarts/save-buffers'),
                    data: param,
                    success: resolve,
                    error: reject
                });
            },
            //详情页即时秒杀
            productDetailTime: function (proinfo, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/mds/api/app/apiv3_0/goodsInfoForPromotion.json'),
                    data: proinfo,
                    success: resolve,
                    error: reject
                });
            },
            //仿制药一致性评价--未使用
            submitDrugsReq: function (proinfo, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/requirements/save'),
                    data: proinfo,
                    success: resolve,
                    error: reject
                });
            },
            // 到货通知提交
            arrivalNotice: function (params, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/mds/api/app/apiv3_0/addArrivalNotice.json'),
                    data: params,
                    success: resolve,
                    error: reject
                });

            },
            // 获取内购专题页商品数据
            getThematicGoods: function (params, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/mds/api/app/apiv3_0/getThematicGoods.json'),
                    data: params,
                    success: resolve,
                    error: reject
                });
            },
            getQuestions: function (params, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/QAmanager/getQuestAnswerById.json'),
                    data: params,
                    success: resolve,
                    error: reject
                });
            }
        }
        module.exports = _product;

        /***/
}),
/* 124 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function ($) {
            'use strict';

            __webpack_require__(125);
            __webpack_require__(130);
            var _http = __webpack_require__(53);
            var addressJson = __webpack_require__(131);
            var _address = __webpack_require__(102);


            var selectAddressBox = function (obj) {
                var _this = this;

                this.provinceId = '',
                    this.cityId = '',
                    this.districtId = '',
                    this.townId = '',
                    this.province = '',
                    this.city = '',
                    this.district = '',
                    this.town = '';

                this.init = function (data, obj, fn) {

                    if (data) {
                        var addressId = '',
                            addressName = '';

                        if (data.provinceId != '' && data.townId != '') {
                            addressId = data.provinceId + '-' + data.cityId + '-' + data.districtId + '-' + data.townId;
                            _this.provinceId = data.provinceId;
                            _this.province = data.province;
                            _this.cityId = data.cityId;
                            _this.city = data.city;
                        }
                        if (data.province != '' && data.town != '') {
                            addressName = data.province + '-' + data.city + '-' + data.district + '-' + data.town;
                            _this.districtId = data.districtId;
                            _this.district = data.district;
                            _this.townId = data.townId;
                            _this.town = data.town;
                        }
                        $('#selectAddressBox').loadAddress({
                            commonArea: addressJson, //地址联动json对象
                            addressId: addressId, //默认地址Id
                            addressName: addressName, //默认地址
                            adrs_separator: ' / ',
                            callback: function (obj, idx, wrapper) {
                                var id = $(obj).attr('attr-id'),
                                    txt = $(obj).attr('title');
                                if (idx == 0) {
                                    _this.provinceId = id;
                                    _this.province = txt;
                                    _this.cityId = '';
                                    _this.city = '';
                                    _this.districtId = '';
                                    _this.district = '';
                                    _this.townId = '';
                                    _this.town = '';
                                } else if (idx == 1) {
                                    _this.cityId = id;
                                    _this.city = txt;
                                    _this.districtId = '';
                                    _this.district = '';
                                    _this.townId = '';
                                    _this.town = '';
                                } else if (idx == 2) {
                                    _this.districtId = id;
                                    _this.district = txt;
                                    _this.townId = '';
                                    _this.town = '';
                                } else if (idx == 3) {
                                    _this.townId = id;
                                    _this.town = txt;
                                }
                            },
                            getLevelData: function (areaId, fn) {
                                _address.getAreaList(areaId, function (res) {
                                    fn(res.data);
                                }, function (errMsg) {
                                    // alertBox('body',errMsg);
                                });
                            }
                        })
                    } else {
                        $('#selectAddressBox').loadAddress({
                            commonArea: addressJson, //地址联动json对象
                            adrs_separator: ' / ',
                            callback: function (obj, idx, wrapper) {
                                var id = $(obj).attr('attr-id'),
                                    txt = $(obj).attr('title');
                                if (idx == 0) {
                                    _this.provinceId = id;
                                    _this.province = txt;
                                    _this.cityId = '';
                                    _this.city = '';
                                    _this.districtId = '';
                                    _this.district = '';
                                    _this.townId = '';
                                    _this.town = '';
                                } else if (idx == 1) {
                                    _this.cityId = id;
                                    _this.city = txt;
                                    _this.districtId = '';
                                    _this.district = '';
                                    _this.townId = '';
                                    _this.town = '';
                                } else if (idx == 2) {
                                    _this.districtId = id;
                                    _this.district = txt;
                                    _this.townId = '';
                                    _this.town = '';
                                } else if (idx == 3) {
                                    _this.townId = id;
                                    _this.town = txt;
                                }
                            },
                            getLevelData: function (areaId, fn) {
                                _address.getAreaList(areaId, function (res) {
                                    fn(res.data);
                                }, function (errMsg) {
                                    // alertBox('body',errMsg);
                                });
                            }

                        })
                    }

                    $('#selectAddressBox').off('click').on('click', '.sel_address', function (e) {
                        e.preventDefault();
                        e.stopPropagation();

                        $(this).toggleClass('hover');
                        if ($(this).hasClass('hover')) {
                            $(this).next('#address_warp').show();
                        } else {
                            $(this).next('#address_warp').hide();
                        }

                    })
                    $(obj).click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        $(this).find('.sel_address').removeClass('hover');
                        $(this).find('#address_warp').hide();
                    })
                    fn && fn();
                };
            };

            module.exports = selectAddressBox;
            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

        /***/
}),
/* 125 */
/***/ (function (module, exports) {

        // removed by extract-text-webpack-plugin

        /***/
}),
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function (jQuery) {/*
	* @Author: yuanyuan
	* @Date:   2017-06-26 16:00:52
	* @Last Modified by:   yuanyuan
	* @Last Modified time: 2019-01-16 11:35:05
	*/

            'use strict';
            (function ($, f) {
                /****** 加载地址 ******/
                var LoadAddress = function () {
                    var _ = this,
                        adrIdList = new Array(),
                        adrNameList = new Array(),
                        townJson = new Array();

                    _.opts = {
                        commonArea: "",//地址联动json对象
                        addressId: '', //默认地址Id
                        addressName: '',//默认地址
                        tmpl: null,//地址框模板
                        addressTitle: 'address_title', //地址框
                        adrs_separator: "", //地址框分隔符
                        addressWrap: 'address_warp',
                        areaWrapList: ["provinceWrap", "cityWrap", "areaWrap", "townWrap"],
                        selAddress_on: 'hover',//展开地址框样式
                        activeClass: 'cur', //选中元素样式,
                        targetElement: 'a', // 点击事件元素			
                        conItems: '.tabItem', // 区域框选择器
                        level: 4, //默认几级联动
                        afterLoad: function () { }, //页面加载事件
                        callback: function () { }, //回调函数
                        getLevelData: function () { } //显示四级联动
                    };


                    _.init = function (obj, opts) {
                        _.opts = $.extend({}, _.opts, opts);
                        _.obj = obj;

                        if (_.opts.addressId == "" && _.opts.addressName == "") {
                            _.showTmpl();
                            _.getAddress("0", 0);
                        } else {

                            if (_.opts.addressId != "") {
                                adrIdList = _.opts.addressId.split("-");

                                _.showTmpl();

                                _.getAddress("0", 0, adrIdList[0]);
                                _.getAddress(adrIdList[0], 1, adrIdList[1]);
                                _.getAddress(adrIdList[1], 2, adrIdList[2]);
                                if (_.opts.level == 4) {
                                    _.getAddress(adrIdList[2], 3, adrIdList[3]);
                                }
                            }
                            if (_.opts.addressName != "") {
                                adrNameList = _.opts.addressName.split("-");

                                _.showTmpl();

                                _.getAddress("0", 0, adrNameList[0]);
                                _.getAddress(adrIdList[0], 1, adrNameList[1]);
                                _.getAddress(adrIdList[1], 2, adrNameList[2]);
                                if (_.opts.level == 4) {
                                    _.getAddress(adrIdList[2], 3, adrNameList[3]);
                                }
                            }
                            $(_.obj).find("#" + _.opts.addressTitle).removeClass('default');
                            _.showAddressTitle(_.opts.level);
                        }

                        _.bindEvent();
                        _.opts.afterLoad && _.opts.afterLoad("#" + _.opts.addressWrap);

                    };

                    _.showTmpl = function (adrNameList) {
                        var html = '';
                        // var html_title =  '<div class="sel_address">' +
                        // 			'	<input id="address_title" class="address_title default" type="text" name="address_title" placeHolder="请选择省/市/区/街道" />' +
                        // 			'	<span class="address_btn"></span>' + 
                        // 			'</div>';
                        if (_.opts.level == 3) {
                            html = '<div id="' + _.opts.addressWrap + '" class="address_warp address-tab">' +
                                '<i class="address-closeBtn"></i>' +
                                '<ul class="tabTitle">' +
                                '	<li class="cur"><span>$0</span></li>' +
                                '	<li><span>$1</span></li>' +
                                '	<li><span>$2</span></li>' +
                                '</ul>' +
                                '<div class="tabContent"> ' +
                                '	<div class="tabItem ' + _.opts.areaWrapList[0] + ' " style="display:block;"></div>' +
                                '	<div class="tabItem ' + _.opts.areaWrapList[1] + '"></div>' +
                                '	<div class="tabItem ' + _.opts.areaWrapList[2] + '"></div>' +
                                '</div>' +
                                '</div>';
                        } else {
                            html = '<div id="address_warp" class="address_warp address-tab">' +
                                '<i class="address-closeBtn"></i>' +
                                '<ul class="tabTitle cf">' +
                                '	<li class="cur"><span>$0</span></li>' +
                                '	<li><span>$1</span></li>' +
                                '	<li><span>$2</span></li>' +
                                '	<li><span>$3</span></li>' +
                                '</ul>' +
                                '<div class="tabContent cf"> ' +
                                '	<div class="tabItem ' + _.opts.areaWrapList[0] + '" style="display:block;"></div>' +
                                '	<div class="tabItem ' + _.opts.areaWrapList[1] + '"></div>' +
                                '	<div class="tabItem ' + _.opts.areaWrapList[2] + '"></div>' +
                                '	<div class="tabItem ' + _.opts.areaWrapList[3] + '"></div>' +
                                '</div>' +
                                '</div>';
                        }

                        _.opts.tmpl = _.opts.tmpl || html;
                        _.opts.tmpl = _.opts.tmpl.replace("$0", "省").replace("$1", "市").replace("$2", "区");
                        (_.opts.level == 4) && (_.opts.tmpl = _.opts.tmpl.replace("$3", "街道"));

                        if ($(_.obj).children("." + _.opts.addressWrap)) {
                            $(_.obj).children("." + _.opts.addressWrap).remove();
                        }
                        $(_.obj).append(_.opts.tmpl);
                    };

                    //清空区域数据
                    _.resetAddress = function (areaWarp, idx) {
                        $("#" + _.opts.addressWrap).find(".tabTitle li").each(function (index, el) {
                            if (index > idx) {
                                // $(el).text("请选择");
                                areaWarp.eq(index).html("");
                            }
                        });
                    };

                    /*
                        areaId:父类ID
                        flag:类型标识 p:省份 c:城市 a:区县
                        areaWarp:区域(省、市、县)对应的容器
                        curAreaCode:当前选中区域编码或名字
                    */
                    _.getAddress = function (areaId, idx, curAreaCode) {
                        if (idx == 0 && curAreaCode == "" && ($("#" + _.opts.addressTitle).val() != "请选择省/市/区/街道")) {
                            return;
                        }

                        var html = "",
                            content = "",
                            selArea = "",
                            warehouseStr = "";

                        _.townJson = "";

                        if (idx == 3) {
                            _.opts.getLevelData(areaId, function (data) {
                                _.townJson = data;

                                $.each(_.townJson, function (code, val) {
                                    selArea = "";
                                    if (val.areaCode == curAreaCode || val.areaName == curAreaCode) {
                                        selArea = 'class = "cur" ';
                                        adrIdList[idx] = val.areaCode;
                                        adrNameList[idx] = val.areaName;
                                    }
                                    (val["warehouse_code"] != null) && (warehouseStr = 'warehouse-id = "' + val.warehouse_code + '" ');
                                    content += '<li ' + selArea + ' ><a href="javascript:void(0);"  ' + warehouseStr + ' attr-id="' + val.areaCode + '" title="' + val.areaName + '">' + val.areaName + '</a></li>';
                                });

                                html = '<ul class="cf">' + content + '</ul>';
                                $("." + _.opts.areaWrapList[idx]).html(html);
                            });
                        } else {
                            $.each(_.opts.commonArea, function (code, val) {
                                if (val.parentId == areaId) {
                                    selArea = "";
                                    if (val.areaCode == curAreaCode || val.areaName == curAreaCode) {
                                        selArea = 'class = "cur" ';
                                        adrIdList[idx] = val.areaCode;
                                        adrNameList[idx] = val.areaName;
                                    }
                                    content += '<li ' + selArea + ' ><a href="javascript:void(0);"  attr-id="' + val.areaCode + '" title="' + val.areaName + '">' + val.areaName + '</a></li>';
                                }
                            });

                            html = '<ul class="cf">' + content + '</ul>';
                            $("." + _.opts.areaWrapList[idx]).html(html);
                        }
                        $("#" + _.opts.addressWrap).find('.tabContent').scrollTop(0);
                    };

                    //绑定事件
                    _.bindEvent = function () {
                        var targetE = $("#" + _.opts.addressWrap).find(_.opts.conItems),
                            tabTitle = $("#" + _.opts.addressWrap).find('.tabTitle');
                        $("#" + _.opts.addressWrap).on('click', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                        })

                        targetE.off("click").on("click", _.opts.targetElement, function (e) {
                            e.preventDefault();
                            e.stopPropagation();

                            var txt = $(this).text(),
                                areaId = $(this).attr("attr-id"),
                                idx = $(this).parents(_.opts.conItems).index(),
                                cont = "";

                            if (idx < targetE.length - 1) {
                                if (idx == 0) {
                                    targetE.find(_.opts.targetElement).parent().removeClass(_.opts.activeClass);
                                    $(this).parent().addClass(_.opts.activeClass);

                                    _.resetAddress(targetE, idx);
                                    _.getAddress(areaId, idx + 1);

                                } else {
                                    $(this).parent().addClass(_.opts.activeClass).siblings().removeClass(_.opts.activeClass);
                                    _.getAddress(areaId, idx + 1);
                                }
                            }
                            adrIdList[idx] = areaId;
                            adrNameList[idx] = txt;

                            _.opts.callback && _.opts.callback(this, idx, "#" + _.opts.addressWrap);

                            //将选中的内容复制给地址框
                            _.showAddressTitle(idx);

                            var _addressTitle = $(_.obj).find("#" + _.opts.addressTitle),
                                _addressWrap = $(_.obj).find("#" + _.opts.addressWrap);
                            //如果是最后一级，隐藏地址框
                            if (idx == targetE.length - 1) {
                                $(this).parent().addClass(_.opts.activeClass).siblings().removeClass(_.opts.activeClass);
                                _addressTitle.parent().removeClass(_.opts.selAddress_on);
                                _addressWrap.hide();
                            } else {
                                if (idx == 0) {
                                    _addressTitle.removeClass('default');
                                }

                                //下一级是直辖市/县的直接跳过
                                var cityList = targetE.eq(idx + 1).find("a");
                                if (cityList.size() == 1) {
                                    cityList.trigger("click");
                                } else {
                                    _addressWrap.find(".tabTitle li").eq(idx + 1).trigger("click");
                                }
                            }

                        });

                        tabTitle.off("click").on("click", 'li', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            var idx = $(this).index();
                            if (idx > adrIdList.length) {
                                return false;
                            }
                            $(this).addClass('cur').siblings().removeClass('cur');
                            targetE.eq(idx).show().siblings().hide();
                        })


                        //关闭按钮
                        $(_.obj).find(".address-closeBtn").on("click", function (e) {
                            e.stopPropagation();

                            $("#" + _.opts.addressTitle).parent().removeClass(_.opts.selAddress_on);
                            $("#" + _.opts.addressWrap).hide();
                        });
                    };

                    //绑定事件
                    _.showAddressTitle = function (idx) {
                        adrNameList = adrNameList.filter(function (item, i) {
                            if (i <= idx) {
                                return item;
                            }
                        })
                        var _addressTitle = $(_.obj).find("#" + _.opts.addressTitle);
                        var cont = adrNameList.join(_.opts.adrs_separator);

                        _addressTitle.val(cont);
                        if (idx == _.opts.level - 1) {
                            _addressTitle.trigger("input");
                        }
                    }
                }

                $.fn.loadAddress = function (options) {
                    var len = this.length;
                    //  Enable multiple-slider support
                    return this.each(function (index) {
                        var $this = $(this),
                            key = 'loadAddress' + (len > 1 ? '-' + (++index) : ''),
                            instance = (new LoadAddress).init($this, options);

                        $this.data(key, instance).data('key', key);
                    });
                };
            })(jQuery, false);
            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

        /***/
}),
/* 131 */
/***/ (function (module, exports) {

        module.exports = [{ "areaCode": "1", "areaName": "北京", "areaPinYin": "bei jing", "parentId": "0" }, { "areaCode": "2", "areaName": "上海", "areaPinYin": "shang hai", "parentId": "0" }, { "areaCode": "3", "areaName": "天津", "areaPinYin": "tian jin", "parentId": "0" }, { "areaCode": "4", "areaName": "重庆", "areaPinYin": "zhong qing", "parentId": "0" }, { "areaCode": "5", "areaName": "河北", "areaPinYin": "he bei", "parentId": "0" }, { "areaCode": "6", "areaName": "山西", "areaPinYin": "shan xi", "parentId": "0" }, { "areaCode": "7", "areaName": "河南", "areaPinYin": "he nan", "parentId": "0" }, { "areaCode": "8", "areaName": "辽宁", "areaPinYin": "liao ning", "parentId": "0" }, { "areaCode": "9", "areaName": "吉林", "areaPinYin": "ji lin", "parentId": "0" }, { "areaCode": "10", "areaName": "黑龙江", "areaPinYin": "hei long jiang", "parentId": "0" }, { "areaCode": "11", "areaName": "内蒙古", "areaPinYin": "nei meng gu", "parentId": "0" }, { "areaCode": "12", "areaName": "江苏", "areaPinYin": "jiang su", "parentId": "0" }, { "areaCode": "13", "areaName": "山东", "areaPinYin": "shan dong", "parentId": "0" }, { "areaCode": "14", "areaName": "安徽", "areaPinYin": "an hui", "parentId": "0" }, { "areaCode": "15", "areaName": "浙江", "areaPinYin": "zhe jiang", "parentId": "0" }, { "areaCode": "16", "areaName": "福建", "areaPinYin": "fu jian", "parentId": "0" }, { "areaCode": "17", "areaName": "湖北", "areaPinYin": "hu bei", "parentId": "0" }, { "areaCode": "18", "areaName": "湖南", "areaPinYin": "hu nan", "parentId": "0" }, { "areaCode": "20", "areaName": "广西", "areaPinYin": "guang xi", "parentId": "0" }, { "areaCode": "21", "areaName": "江西", "areaPinYin": "jiang xi", "parentId": "0" }, { "areaCode": "22", "areaName": "四川", "areaPinYin": "si chuan", "parentId": "0" }, { "areaCode": "24", "areaName": "贵州", "areaPinYin": "gui zhou", "parentId": "0" }, { "areaCode": "25", "areaName": "云南", "areaPinYin": "yun nan", "parentId": "0" }, { "areaCode": "26", "areaName": "西藏", "areaPinYin": "xi cang", "parentId": "0" }, { "areaCode": "27", "areaName": "陕西", "areaPinYin": "shan xi", "parentId": "0" }, { "areaCode": "28", "areaName": "甘肃", "areaPinYin": "gan su", "parentId": "0" }, { "areaCode": "29", "areaName": "青海", "areaPinYin": "qing hai", "parentId": "0" }, { "areaCode": "30", "areaName": "宁夏", "areaPinYin": "ning xia", "parentId": "0" }, { "areaCode": "31", "areaName": "新疆", "areaPinYin": "xin jiang", "parentId": "0" }, { "areaCode": "32", "areaName": "北京", "areaPinYin": "", "parentId": "1" }, { "areaCode": "33", "areaName": "上海", "areaPinYin": "", "parentId": "2" }, { "areaCode": "34", "areaName": "天津", "areaPinYin": "", "parentId": "3" }, { "areaCode": "35", "areaName": "重庆", "areaPinYin": "", "parentId": "4" }, { "areaCode": "36", "areaName": "临沧市", "areaPinYin": "", "parentId": "25" }, { "areaCode": "37", "areaName": "丽江市", "areaPinYin": "", "parentId": "25" }, { "areaCode": "38", "areaName": "保山市", "areaPinYin": "", "parentId": "25" }, { "areaCode": "39", "areaName": "大理州", "areaPinYin": "", "parentId": "25" }, { "areaCode": "40", "areaName": "德宏州", "areaPinYin": "", "parentId": "25" }, { "areaCode": "41", "areaName": "怒江州", "areaPinYin": "", "parentId": "25" }, { "areaCode": "42", "areaName": "文山州", "areaPinYin": "", "parentId": "25" }, { "areaCode": "43", "areaName": "昆明市", "areaPinYin": "", "parentId": "25" }, { "areaCode": "44", "areaName": "昭通市", "areaPinYin": "", "parentId": "25" }, { "areaCode": "45", "areaName": "普洱市", "areaPinYin": "", "parentId": "25" }, { "areaCode": "46", "areaName": "曲靖市", "areaPinYin": "", "parentId": "25" }, { "areaCode": "47", "areaName": "楚雄州", "areaPinYin": "", "parentId": "25" }, { "areaCode": "48", "areaName": "玉溪市", "areaPinYin": "", "parentId": "25" }, { "areaCode": "49", "areaName": "红河州", "areaPinYin": "", "parentId": "25" }, { "areaCode": "50", "areaName": "西双版纳州", "areaPinYin": "", "parentId": "25" }, { "areaCode": "51", "areaName": "迪庆州", "areaPinYin": "", "parentId": "25" }, { "areaCode": "52", "areaName": "乌兰察布市", "areaPinYin": "", "parentId": "11" }, { "areaCode": "53", "areaName": "乌海市", "areaPinYin": "", "parentId": "11" }, { "areaCode": "54", "areaName": "兴安盟", "areaPinYin": "", "parentId": "11" }, { "areaCode": "55", "areaName": "包头市", "areaPinYin": "", "parentId": "11" }, { "areaCode": "56", "areaName": "呼伦贝尔市", "areaPinYin": "", "parentId": "11" }, { "areaCode": "57", "areaName": "呼和浩特市", "areaPinYin": "", "parentId": "11" }, { "areaCode": "58", "areaName": "巴彦淖尔市", "areaPinYin": "", "parentId": "11" }, { "areaCode": "59", "areaName": "赤峰市", "areaPinYin": "", "parentId": "11" }, { "areaCode": "60", "areaName": "通辽市", "areaPinYin": "", "parentId": "11" }, { "areaCode": "61", "areaName": "鄂尔多斯市", "areaPinYin": "", "parentId": "11" }, { "areaCode": "62", "areaName": "锡林郭勒盟", "areaPinYin": "", "parentId": "11" }, { "areaCode": "63", "areaName": "阿拉善盟", "areaPinYin": "", "parentId": "11" }, { "areaCode": "64", "areaName": "吉林市", "areaPinYin": "", "parentId": "9" }, { "areaCode": "65", "areaName": "四平市", "areaPinYin": "", "parentId": "9" }, { "areaCode": "66", "areaName": "延边州", "areaPinYin": "", "parentId": "9" }, { "areaCode": "67", "areaName": "松原市", "areaPinYin": "", "parentId": "9" }, { "areaCode": "68", "areaName": "白城市", "areaPinYin": "", "parentId": "9" }, { "areaCode": "69", "areaName": "白山市", "areaPinYin": "", "parentId": "9" }, { "areaCode": "70", "areaName": "辽源市", "areaPinYin": "", "parentId": "9" }, { "areaCode": "71", "areaName": "通化市", "areaPinYin": "", "parentId": "9" }, { "areaCode": "72", "areaName": "长春市", "areaPinYin": "", "parentId": "9" }, { "areaCode": "73", "areaName": "乐山市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "74", "areaName": "内江市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "75", "areaName": "凉山州", "areaPinYin": "", "parentId": "22" }, { "areaCode": "76", "areaName": "南充市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "77", "areaName": "宜宾市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "78", "areaName": "巴中市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "79", "areaName": "广元市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "80", "areaName": "广安市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "81", "areaName": "德阳市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "82", "areaName": "成都市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "83", "areaName": "攀枝花市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "84", "areaName": "泸州市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "85", "areaName": "甘孜州", "areaPinYin": "", "parentId": "22" }, { "areaCode": "86", "areaName": "眉山市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "87", "areaName": "绵阳市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "88", "areaName": "自贡市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "89", "areaName": "资阳市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "90", "areaName": "达州市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "91", "areaName": "遂宁市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "92", "areaName": "阿坝州", "areaPinYin": "", "parentId": "22" }, { "areaCode": "93", "areaName": "雅安市", "areaPinYin": "", "parentId": "22" }, { "areaCode": "94", "areaName": "中卫市", "areaPinYin": "", "parentId": "30" }, { "areaCode": "95", "areaName": "吴忠市", "areaPinYin": "", "parentId": "30" }, { "areaCode": "96", "areaName": "固原市", "areaPinYin": "", "parentId": "30" }, { "areaCode": "97", "areaName": "石嘴山市", "areaPinYin": "", "parentId": "30" }, { "areaCode": "98", "areaName": "银川市", "areaPinYin": "", "parentId": "30" }, { "areaCode": "99", "areaName": "亳州市", "areaPinYin": "", "parentId": "14" }, { "areaCode": "100", "areaName": "六安市", "areaPinYin": "", "parentId": "14" }, { "areaCode": "101", "areaName": "合肥市", "areaPinYin": "", "parentId": "14" }, { "areaCode": "102", "areaName": "安庆市", "areaPinYin": "", "parentId": "14" }, { "areaCode": "103", "areaName": "宣城市", "areaPinYin": "", "parentId": "14" }, { "areaCode": "104", "areaName": "宿州市", "areaPinYin": "", "parentId": "14" }, { "areaCode": "105", "areaName": "池州市", "areaPinYin": "", "parentId": "14" }, { "areaCode": "106", "areaName": "淮北市", "areaPinYin": "", "parentId": "14" }, { "areaCode": "107", "areaName": "淮南市", "areaPinYin": "", "parentId": "14" }, { "areaCode": "108", "areaName": "滁州市", "areaPinYin": "", "parentId": "14" }, { "areaCode": "109", "areaName": "芜湖市", "areaPinYin": "", "parentId": "14" }, { "areaCode": "110", "areaName": "蚌埠市", "areaPinYin": "", "parentId": "14" }, { "areaCode": "111", "areaName": "铜陵市", "areaPinYin": "", "parentId": "14" }, { "areaCode": "112", "areaName": "阜阳市", "areaPinYin": "", "parentId": "14" }, { "areaCode": "113", "areaName": "马鞍山市", "areaPinYin": "", "parentId": "14" }, { "areaCode": "114", "areaName": "黄山市", "areaPinYin": "", "parentId": "14" }, { "areaCode": "115", "areaName": "东营市", "areaPinYin": "", "parentId": "13" }, { "areaCode": "116", "areaName": "临沂市", "areaPinYin": "", "parentId": "13" }, { "areaCode": "117", "areaName": "威海市", "areaPinYin": "", "parentId": "13" }, { "areaCode": "118", "areaName": "德州市", "areaPinYin": "", "parentId": "13" }, { "areaCode": "119", "areaName": "日照市", "areaPinYin": "", "parentId": "13" }, { "areaCode": "120", "areaName": "枣庄市", "areaPinYin": "", "parentId": "13" }, { "areaCode": "121", "areaName": "泰安市", "areaPinYin": "", "parentId": "13" }, { "areaCode": "122", "areaName": "济南市", "areaPinYin": "", "parentId": "13" }, { "areaCode": "123", "areaName": "济宁市", "areaPinYin": "", "parentId": "13" }, { "areaCode": "124", "areaName": "淄博市", "areaPinYin": "", "parentId": "13" }, { "areaCode": "125", "areaName": "滨州市", "areaPinYin": "", "parentId": "13" }, { "areaCode": "126", "areaName": "潍坊市", "areaPinYin": "", "parentId": "13" }, { "areaCode": "127", "areaName": "烟台市", "areaPinYin": "", "parentId": "13" }, { "areaCode": "128", "areaName": "聊城市", "areaPinYin": "", "parentId": "13" }, { "areaCode": "129", "areaName": "莱芜市", "areaPinYin": "", "parentId": "13" }, { "areaCode": "130", "areaName": "菏泽市", "areaPinYin": "", "parentId": "13" }, { "areaCode": "131", "areaName": "青岛市", "areaPinYin": "", "parentId": "13" }, { "areaCode": "132", "areaName": "临汾市", "areaPinYin": "", "parentId": "6" }, { "areaCode": "133", "areaName": "吕梁市", "areaPinYin": "", "parentId": "6" }, { "areaCode": "134", "areaName": "大同市", "areaPinYin": "", "parentId": "6" }, { "areaCode": "135", "areaName": "太原市", "areaPinYin": "", "parentId": "6" }, { "areaCode": "136", "areaName": "忻州市", "areaPinYin": "", "parentId": "6" }, { "areaCode": "137", "areaName": "晋中市", "areaPinYin": "", "parentId": "6" }, { "areaCode": "138", "areaName": "晋城市", "areaPinYin": "", "parentId": "6" }, { "areaCode": "139", "areaName": "朔州市", "areaPinYin": "", "parentId": "6" }, { "areaCode": "140", "areaName": "运城市", "areaPinYin": "", "parentId": "6" }, { "areaCode": "141", "areaName": "长治市", "areaPinYin": "", "parentId": "6" }, { "areaCode": "142", "areaName": "阳泉市", "areaPinYin": "", "parentId": "6" }, { "areaCode": "164", "areaName": "北海市", "areaPinYin": "", "parentId": "20" }, { "areaCode": "165", "areaName": "南宁市", "areaPinYin": "", "parentId": "20" }, { "areaCode": "166", "areaName": "崇左市", "areaPinYin": "", "parentId": "20" }, { "areaCode": "167", "areaName": "来宾市", "areaPinYin": "", "parentId": "20" }, { "areaCode": "168", "areaName": "柳州市", "areaPinYin": "", "parentId": "20" }, { "areaCode": "169", "areaName": "桂林市", "areaPinYin": "", "parentId": "20" }, { "areaCode": "170", "areaName": "梧州市", "areaPinYin": "", "parentId": "20" }, { "areaCode": "171", "areaName": "河池市", "areaPinYin": "", "parentId": "20" }, { "areaCode": "172", "areaName": "玉林市", "areaPinYin": "", "parentId": "20" }, { "areaCode": "173", "areaName": "百色市", "areaPinYin": "", "parentId": "20" }, { "areaCode": "174", "areaName": "贵港市", "areaPinYin": "", "parentId": "20" }, { "areaCode": "175", "areaName": "贺州市", "areaPinYin": "", "parentId": "20" }, { "areaCode": "176", "areaName": "钦州市", "areaPinYin": "", "parentId": "20" }, { "areaCode": "177", "areaName": "防城港市", "areaPinYin": "", "parentId": "20" }, { "areaCode": "178", "areaName": "乌鲁木齐市", "areaPinYin": "", "parentId": "31" }, { "areaCode": "179", "areaName": "五家渠市", "areaPinYin": "", "parentId": "31" }, { "areaCode": "180", "areaName": "伊犁州", "areaPinYin": "", "parentId": "31" }, { "areaCode": "181", "areaName": "克孜勒苏州", "areaPinYin": "", "parentId": "31" }, { "areaCode": "182", "areaName": "克拉玛依市", "areaPinYin": "", "parentId": "31" }, { "areaCode": "183", "areaName": "博尔塔拉州", "areaPinYin": "", "parentId": "31" }, { "areaCode": "184", "areaName": "吐鲁番地区", "areaPinYin": "", "parentId": "31" }, { "areaCode": "185", "areaName": "和田地区", "areaPinYin": "", "parentId": "31" }, { "areaCode": "186", "areaName": "哈密地区", "areaPinYin": "", "parentId": "31" }, { "areaCode": "187", "areaName": "喀什地区", "areaPinYin": "", "parentId": "31" }, { "areaCode": "188", "areaName": "图木舒克市", "areaPinYin": "", "parentId": "31" }, { "areaCode": "189", "areaName": "塔城地区", "areaPinYin": "", "parentId": "31" }, { "areaCode": "190", "areaName": "巴音郭楞州", "areaPinYin": "", "parentId": "31" }, { "areaCode": "191", "areaName": "昌吉州", "areaPinYin": "", "parentId": "31" }, { "areaCode": "192", "areaName": "石河子市", "areaPinYin": "", "parentId": "31" }, { "areaCode": "193", "areaName": "阿克苏地区", "areaPinYin": "", "parentId": "31" }, { "areaCode": "194", "areaName": "阿勒泰地区", "areaPinYin": "", "parentId": "31" }, { "areaCode": "195", "areaName": "阿拉尔市", "areaPinYin": "", "parentId": "31" }, { "areaCode": "196", "areaName": "南京市", "areaPinYin": "", "parentId": "12" }, { "areaCode": "197", "areaName": "南通市", "areaPinYin": "", "parentId": "12" }, { "areaCode": "198", "areaName": "宿迁市", "areaPinYin": "", "parentId": "12" }, { "areaCode": "199", "areaName": "常州市", "areaPinYin": "", "parentId": "12" }, { "areaCode": "200", "areaName": "徐州市", "areaPinYin": "", "parentId": "12" }, { "areaCode": "201", "areaName": "扬州市", "areaPinYin": "", "parentId": "12" }, { "areaCode": "202", "areaName": "无锡市", "areaPinYin": "", "parentId": "12" }, { "areaCode": "203", "areaName": "泰州市", "areaPinYin": "", "parentId": "12" }, { "areaCode": "204", "areaName": "淮安市", "areaPinYin": "", "parentId": "12" }, { "areaCode": "205", "areaName": "盐城市", "areaPinYin": "", "parentId": "12" }, { "areaCode": "206", "areaName": "苏州市", "areaPinYin": "", "parentId": "12" }, { "areaCode": "207", "areaName": "连云港市", "areaPinYin": "", "parentId": "12" }, { "areaCode": "208", "areaName": "镇江市", "areaPinYin": "", "parentId": "12" }, { "areaCode": "209", "areaName": "上饶市", "areaPinYin": "", "parentId": "21" }, { "areaCode": "210", "areaName": "九江市", "areaPinYin": "", "parentId": "21" }, { "areaCode": "211", "areaName": "南昌市", "areaPinYin": "", "parentId": "21" }, { "areaCode": "212", "areaName": "吉安市", "areaPinYin": "", "parentId": "21" }, { "areaCode": "213", "areaName": "宜春市", "areaPinYin": "", "parentId": "21" }, { "areaCode": "214", "areaName": "抚州市", "areaPinYin": "", "parentId": "21" }, { "areaCode": "215", "areaName": "新余市", "areaPinYin": "", "parentId": "21" }, { "areaCode": "216", "areaName": "景德镇市", "areaPinYin": "", "parentId": "21" }, { "areaCode": "217", "areaName": "萍乡市", "areaPinYin": "", "parentId": "21" }, { "areaCode": "218", "areaName": "赣州市", "areaPinYin": "", "parentId": "21" }, { "areaCode": "219", "areaName": "鹰潭市", "areaPinYin": "", "parentId": "21" }, { "areaCode": "220", "areaName": "保定市", "areaPinYin": "", "parentId": "5" }, { "areaCode": "221", "areaName": "唐山市", "areaPinYin": "", "parentId": "5" }, { "areaCode": "222", "areaName": "廊坊市", "areaPinYin": "", "parentId": "5" }, { "areaCode": "223", "areaName": "张家口市", "areaPinYin": "", "parentId": "5" }, { "areaCode": "224", "areaName": "承德市", "areaPinYin": "", "parentId": "5" }, { "areaCode": "225", "areaName": "沧州市", "areaPinYin": "", "parentId": "5" }, { "areaCode": "226", "areaName": "石家庄市", "areaPinYin": "", "parentId": "5" }, { "areaCode": "227", "areaName": "秦皇岛市", "areaPinYin": "", "parentId": "5" }, { "areaCode": "228", "areaName": "衡水市", "areaPinYin": "", "parentId": "5" }, { "areaCode": "229", "areaName": "邢台市", "areaPinYin": "", "parentId": "5" }, { "areaCode": "230", "areaName": "邯郸市", "areaPinYin": "", "parentId": "5" }, { "areaCode": "231", "areaName": "三门峡市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "232", "areaName": "信阳市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "233", "areaName": "南阳市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "234", "areaName": "周口市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "235", "areaName": "商丘市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "236", "areaName": "安阳市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "237", "areaName": "平顶山市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "238", "areaName": "开封市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "239", "areaName": "新乡市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "240", "areaName": "洛阳市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "241", "areaName": "济源市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "242", "areaName": "漯河市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "243", "areaName": "濮阳市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "244", "areaName": "焦作市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "245", "areaName": "许昌市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "246", "areaName": "郑州市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "247", "areaName": "驻马店市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "248", "areaName": "鹤壁市", "areaPinYin": "", "parentId": "7" }, { "areaCode": "249", "areaName": "丽水市", "areaPinYin": "", "parentId": "15" }, { "areaCode": "250", "areaName": "台州市", "areaPinYin": "", "parentId": "15" }, { "areaCode": "251", "areaName": "嘉兴市", "areaPinYin": "", "parentId": "15" }, { "areaCode": "252", "areaName": "宁波市", "areaPinYin": "", "parentId": "15" }, { "areaCode": "253", "areaName": "杭州市", "areaPinYin": "", "parentId": "15" }, { "areaCode": "254", "areaName": "温州市", "areaPinYin": "", "parentId": "15" }, { "areaCode": "255", "areaName": "湖州市", "areaPinYin": "", "parentId": "15" }, { "areaCode": "256", "areaName": "绍兴市", "areaPinYin": "", "parentId": "15" }, { "areaCode": "257", "areaName": "舟山市", "areaPinYin": "", "parentId": "15" }, { "areaCode": "258", "areaName": "衢州市", "areaPinYin": "", "parentId": "15" }, { "areaCode": "259", "areaName": "金华市", "areaPinYin": "", "parentId": "15" }, { "areaCode": "279", "areaName": "仙桃市", "areaPinYin": "", "parentId": "17" }, { "areaCode": "280", "areaName": "十堰市", "areaPinYin": "", "parentId": "17" }, { "areaCode": "281", "areaName": "咸宁市", "areaPinYin": "", "parentId": "17" }, { "areaCode": "282", "areaName": "天门市", "areaPinYin": "", "parentId": "17" }, { "areaCode": "283", "areaName": "孝感市", "areaPinYin": "", "parentId": "17" }, { "areaCode": "284", "areaName": "宜昌市", "areaPinYin": "", "parentId": "17" }, { "areaCode": "285", "areaName": "恩施州", "areaPinYin": "", "parentId": "17" }, { "areaCode": "286", "areaName": "武汉市", "areaPinYin": "", "parentId": "17" }, { "areaCode": "287", "areaName": "潜江市", "areaPinYin": "", "parentId": "17" }, { "areaCode": "288", "areaName": "神农架林区", "areaPinYin": "", "parentId": "17" }, { "areaCode": "289", "areaName": "荆州市", "areaPinYin": "", "parentId": "17" }, { "areaCode": "290", "areaName": "荆门市", "areaPinYin": "", "parentId": "17" }, { "areaCode": "291", "areaName": "襄阳市", "areaPinYin": "", "parentId": "17" }, { "areaCode": "292", "areaName": "鄂州市", "areaPinYin": "", "parentId": "17" }, { "areaCode": "293", "areaName": "随州市", "areaPinYin": "", "parentId": "17" }, { "areaCode": "294", "areaName": "黄冈市", "areaPinYin": "", "parentId": "17" }, { "areaCode": "295", "areaName": "黄石市", "areaPinYin": "", "parentId": "17" }, { "areaCode": "296", "areaName": "娄底市", "areaPinYin": "", "parentId": "18" }, { "areaCode": "297", "areaName": "岳阳市", "areaPinYin": "", "parentId": "18" }, { "areaCode": "298", "areaName": "常德市", "areaPinYin": "", "parentId": "18" }, { "areaCode": "299", "areaName": "张家界市", "areaPinYin": "", "parentId": "18" }, { "areaCode": "300", "areaName": "怀化市", "areaPinYin": "", "parentId": "18" }, { "areaCode": "301", "areaName": "株洲市", "areaPinYin": "", "parentId": "18" }, { "areaCode": "302", "areaName": "永州市", "areaPinYin": "", "parentId": "18" }, { "areaCode": "303", "areaName": "湘潭市", "areaPinYin": "", "parentId": "18" }, { "areaCode": "304", "areaName": "湘西州", "areaPinYin": "", "parentId": "18" }, { "areaCode": "305", "areaName": "益阳市", "areaPinYin": "", "parentId": "18" }, { "areaCode": "306", "areaName": "衡阳市", "areaPinYin": "", "parentId": "18" }, { "areaCode": "307", "areaName": "邵阳市", "areaPinYin": "", "parentId": "18" }, { "areaCode": "308", "areaName": "郴州市", "areaPinYin": "", "parentId": "18" }, { "areaCode": "309", "areaName": "长沙市", "areaPinYin": "", "parentId": "18" }, { "areaCode": "310", "areaName": "韶山市", "areaPinYin": "", "parentId": "18" }, { "areaCode": "311", "areaName": "临夏州", "areaPinYin": "", "parentId": "28" }, { "areaCode": "312", "areaName": "兰州市", "areaPinYin": "", "parentId": "28" }, { "areaCode": "313", "areaName": "嘉峪关市", "areaPinYin": "", "parentId": "28" }, { "areaCode": "314", "areaName": "天水市", "areaPinYin": "", "parentId": "28" }, { "areaCode": "315", "areaName": "定西市", "areaPinYin": "", "parentId": "28" }, { "areaCode": "316", "areaName": "平凉市", "areaPinYin": "", "parentId": "28" }, { "areaCode": "317", "areaName": "庆阳市", "areaPinYin": "", "parentId": "28" }, { "areaCode": "318", "areaName": "张掖市", "areaPinYin": "", "parentId": "28" }, { "areaCode": "319", "areaName": "武威市", "areaPinYin": "", "parentId": "28" }, { "areaCode": "320", "areaName": "甘南州", "areaPinYin": "", "parentId": "28" }, { "areaCode": "321", "areaName": "白银市", "areaPinYin": "", "parentId": "28" }, { "areaCode": "322", "areaName": "酒泉市", "areaPinYin": "", "parentId": "28" }, { "areaCode": "323", "areaName": "金昌市", "areaPinYin": "", "parentId": "28" }, { "areaCode": "324", "areaName": "陇南市", "areaPinYin": "", "parentId": "28" }, { "areaCode": "325", "areaName": "三明市", "areaPinYin": "", "parentId": "16" }, { "areaCode": "326", "areaName": "南平市", "areaPinYin": "", "parentId": "16" }, { "areaCode": "327", "areaName": "厦门市", "areaPinYin": "", "parentId": "16" }, { "areaCode": "328", "areaName": "宁德市", "areaPinYin": "", "parentId": "16" }, { "areaCode": "329", "areaName": "泉州市", "areaPinYin": "", "parentId": "16" }, { "areaCode": "330", "areaName": "漳州市", "areaPinYin": "", "parentId": "16" }, { "areaCode": "331", "areaName": "福州市", "areaPinYin": "", "parentId": "16" }, { "areaCode": "332", "areaName": "莆田市", "areaPinYin": "", "parentId": "16" }, { "areaCode": "333", "areaName": "龙岩市", "areaPinYin": "", "parentId": "16" }, { "areaCode": "334", "areaName": "山南地区", "areaPinYin": "", "parentId": "26" }, { "areaCode": "335", "areaName": "拉萨市", "areaPinYin": "", "parentId": "26" }, { "areaCode": "336", "areaName": "日喀则地区", "areaPinYin": "", "parentId": "26" }, { "areaCode": "337", "areaName": "昌都地区", "areaPinYin": "", "parentId": "26" }, { "areaCode": "338", "areaName": "林芝地区", "areaPinYin": "", "parentId": "26" }, { "areaCode": "339", "areaName": "那曲地区", "areaPinYin": "", "parentId": "26" }, { "areaCode": "340", "areaName": "阿里地区", "areaPinYin": "", "parentId": "26" }, { "areaCode": "341", "areaName": "六盘水市", "areaPinYin": "", "parentId": "24" }, { "areaCode": "342", "areaName": "安顺市", "areaPinYin": "", "parentId": "24" }, { "areaCode": "343", "areaName": "毕节市", "areaPinYin": "", "parentId": "24" }, { "areaCode": "344", "areaName": "贵阳市", "areaPinYin": "", "parentId": "24" }, { "areaCode": "345", "areaName": "遵义市", "areaPinYin": "", "parentId": "24" }, { "areaCode": "346", "areaName": "铜仁市", "areaPinYin": "", "parentId": "24" }, { "areaCode": "347", "areaName": "黔东南州", "areaPinYin": "", "parentId": "24" }, { "areaCode": "348", "areaName": "黔南州", "areaPinYin": "", "parentId": "24" }, { "areaCode": "349", "areaName": "黔西南州", "areaPinYin": "", "parentId": "24" }, { "areaCode": "350", "areaName": "丹东市", "areaPinYin": "", "parentId": "8" }, { "areaCode": "351", "areaName": "大连市", "areaPinYin": "", "parentId": "8" }, { "areaCode": "352", "areaName": "抚顺市", "areaPinYin": "", "parentId": "8" }, { "areaCode": "353", "areaName": "朝阳市", "areaPinYin": "", "parentId": "8" }, { "areaCode": "354", "areaName": "本溪市", "areaPinYin": "", "parentId": "8" }, { "areaCode": "355", "areaName": "沈阳市", "areaPinYin": "", "parentId": "8" }, { "areaCode": "356", "areaName": "盘锦市", "areaPinYin": "", "parentId": "8" }, { "areaCode": "357", "areaName": "营口市", "areaPinYin": "", "parentId": "8" }, { "areaCode": "358", "areaName": "葫芦岛市", "areaPinYin": "", "parentId": "8" }, { "areaCode": "359", "areaName": "辽阳市", "areaPinYin": "", "parentId": "8" }, { "areaCode": "360", "areaName": "铁岭市", "areaPinYin": "", "parentId": "8" }, { "areaCode": "361", "areaName": "锦州市", "areaPinYin": "", "parentId": "8" }, { "areaCode": "362", "areaName": "阜新市", "areaPinYin": "", "parentId": "8" }, { "areaCode": "363", "areaName": "鞍山市", "areaPinYin": "", "parentId": "8" }, { "areaCode": "364", "areaName": "咸阳市", "areaPinYin": "", "parentId": "27" }, { "areaCode": "365", "areaName": "商洛市", "areaPinYin": "", "parentId": "27" }, { "areaCode": "366", "areaName": "安康市", "areaPinYin": "", "parentId": "27" }, { "areaCode": "367", "areaName": "宝鸡市", "areaPinYin": "", "parentId": "27" }, { "areaCode": "368", "areaName": "延安市", "areaPinYin": "", "parentId": "27" }, { "areaCode": "369", "areaName": "榆林市", "areaPinYin": "", "parentId": "27" }, { "areaCode": "370", "areaName": "汉中市", "areaPinYin": "", "parentId": "27" }, { "areaCode": "371", "areaName": "渭南市", "areaPinYin": "", "parentId": "27" }, { "areaCode": "372", "areaName": "西安市", "areaPinYin": "", "parentId": "27" }, { "areaCode": "373", "areaName": "铜川市", "areaPinYin": "", "parentId": "27" }, { "areaCode": "374", "areaName": "果洛州", "areaPinYin": "", "parentId": "29" }, { "areaCode": "375", "areaName": "海东地区", "areaPinYin": "", "parentId": "29" }, { "areaCode": "376", "areaName": "海北州", "areaPinYin": "", "parentId": "29" }, { "areaCode": "377", "areaName": "海南州", "areaPinYin": "", "parentId": "29" }, { "areaCode": "378", "areaName": "海西州", "areaPinYin": "", "parentId": "29" }, { "areaCode": "379", "areaName": "玉树州", "areaPinYin": "", "parentId": "29" }, { "areaCode": "380", "areaName": "西宁市", "areaPinYin": "", "parentId": "29" }, { "areaCode": "381", "areaName": "黄南州", "areaPinYin": "", "parentId": "29" }, { "areaCode": "382", "areaName": "七台河市", "areaPinYin": "", "parentId": "10" }, { "areaCode": "383", "areaName": "伊春市", "areaPinYin": "", "parentId": "10" }, { "areaCode": "384", "areaName": "佳木斯市", "areaPinYin": "", "parentId": "10" }, { "areaCode": "385", "areaName": "双鸭山市", "areaPinYin": "", "parentId": "10" }, { "areaCode": "386", "areaName": "哈尔滨市", "areaPinYin": "", "parentId": "10" }, { "areaCode": "387", "areaName": "大兴安岭地区", "areaPinYin": "", "parentId": "10" }, { "areaCode": "388", "areaName": "大庆市", "areaPinYin": "", "parentId": "10" }, { "areaCode": "389", "areaName": "牡丹江市", "areaPinYin": "", "parentId": "10" }, { "areaCode": "390", "areaName": "绥化市", "areaPinYin": "", "parentId": "10" }, { "areaCode": "391", "areaName": "鸡西市", "areaPinYin": "", "parentId": "10" }, { "areaCode": "392", "areaName": "鹤岗市", "areaPinYin": "", "parentId": "10" }, { "areaCode": "393", "areaName": "黑河市", "areaPinYin": "", "parentId": "10" }, { "areaCode": "394", "areaName": "齐齐哈尔市", "areaPinYin": "", "parentId": "10" }, { "areaCode": "395", "areaName": "临翔区", "areaPinYin": "", "parentId": "36" }, { "areaCode": "396", "areaName": "云县", "areaPinYin": "", "parentId": "36" }, { "areaCode": "397", "areaName": "凤庆县", "areaPinYin": "", "parentId": "36" }, { "areaCode": "398", "areaName": "双江县", "areaPinYin": "", "parentId": "36" }, { "areaCode": "399", "areaName": "永德县", "areaPinYin": "", "parentId": "36" }, { "areaCode": "400", "areaName": "沧源县", "areaPinYin": "", "parentId": "36" }, { "areaCode": "401", "areaName": "耿马县", "areaPinYin": "", "parentId": "36" }, { "areaCode": "402", "areaName": "镇康县", "areaPinYin": "", "parentId": "36" }, { "areaCode": "403", "areaName": "华坪县", "areaPinYin": "", "parentId": "37" }, { "areaCode": "404", "areaName": "古城区", "areaPinYin": "", "parentId": "37" }, { "areaCode": "405", "areaName": "宁蒗县", "areaPinYin": "", "parentId": "37" }, { "areaCode": "406", "areaName": "永胜县", "areaPinYin": "", "parentId": "37" }, { "areaCode": "407", "areaName": "玉龙县", "areaPinYin": "", "parentId": "37" }, { "areaCode": "408", "areaName": "施甸县", "areaPinYin": "", "parentId": "38" }, { "areaCode": "409", "areaName": "昌宁县", "areaPinYin": "", "parentId": "38" }, { "areaCode": "410", "areaName": "腾冲县", "areaPinYin": "", "parentId": "38" }, { "areaCode": "411", "areaName": "隆阳区", "areaPinYin": "", "parentId": "38" }, { "areaCode": "412", "areaName": "龙陵县", "areaPinYin": "", "parentId": "38" }, { "areaCode": "413", "areaName": "云龙县", "areaPinYin": "", "parentId": "39" }, { "areaCode": "414", "areaName": "剑川县", "areaPinYin": "", "parentId": "39" }, { "areaCode": "415", "areaName": "南涧县", "areaPinYin": "", "parentId": "39" }, { "areaCode": "416", "areaName": "大理市", "areaPinYin": "", "parentId": "39" }, { "areaCode": "417", "areaName": "宾川县", "areaPinYin": "", "parentId": "39" }, { "areaCode": "418", "areaName": "巍山县", "areaPinYin": "", "parentId": "39" }, { "areaCode": "419", "areaName": "弥渡县", "areaPinYin": "", "parentId": "39" }, { "areaCode": "420", "areaName": "永平县", "areaPinYin": "", "parentId": "39" }, { "areaCode": "421", "areaName": "洱源县", "areaPinYin": "", "parentId": "39" }, { "areaCode": "422", "areaName": "漾濞县", "areaPinYin": "", "parentId": "39" }, { "areaCode": "423", "areaName": "祥云县", "areaPinYin": "", "parentId": "39" }, { "areaCode": "424", "areaName": "鹤庆县", "areaPinYin": "", "parentId": "39" }, { "areaCode": "425", "areaName": "梁河县", "areaPinYin": "", "parentId": "40" }, { "areaCode": "426", "areaName": "瑞丽市", "areaPinYin": "", "parentId": "40" }, { "areaCode": "427", "areaName": "盈江县", "areaPinYin": "", "parentId": "40" }, { "areaCode": "428", "areaName": "芒市", "areaPinYin": "", "parentId": "40" }, { "areaCode": "429", "areaName": "陇川县", "areaPinYin": "", "parentId": "40" }, { "areaCode": "430", "areaName": "兰坪县", "areaPinYin": "", "parentId": "41" }, { "areaCode": "431", "areaName": "泸水县", "areaPinYin": "", "parentId": "41" }, { "areaCode": "432", "areaName": "福贡县", "areaPinYin": "", "parentId": "41" }, { "areaCode": "433", "areaName": "贡山县", "areaPinYin": "", "parentId": "41" }, { "areaCode": "434", "areaName": "丘北县", "areaPinYin": "", "parentId": "42" }, { "areaCode": "435", "areaName": "富宁县", "areaPinYin": "", "parentId": "42" }, { "areaCode": "436", "areaName": "广南县", "areaPinYin": "", "parentId": "42" }, { "areaCode": "437", "areaName": "文山市", "areaPinYin": "", "parentId": "42" }, { "areaCode": "438", "areaName": "砚山县", "areaPinYin": "", "parentId": "42" }, { "areaCode": "439", "areaName": "西畴县", "areaPinYin": "", "parentId": "42" }, { "areaCode": "440", "areaName": "马关县", "areaPinYin": "", "parentId": "42" }, { "areaCode": "441", "areaName": "麻栗坡县", "areaPinYin": "", "parentId": "42" }, { "areaCode": "442", "areaName": "东川区", "areaPinYin": "", "parentId": "43" }, { "areaCode": "443", "areaName": "五华区", "areaPinYin": "", "parentId": "43" }, { "areaCode": "444", "areaName": "呈贡区", "areaPinYin": "", "parentId": "43" }, { "areaCode": "445", "areaName": "安宁市", "areaPinYin": "", "parentId": "43" }, { "areaCode": "446", "areaName": "官渡区", "areaPinYin": "", "parentId": "43" }, { "areaCode": "447", "areaName": "宜良县", "areaPinYin": "", "parentId": "43" }, { "areaCode": "448", "areaName": "富民县", "areaPinYin": "", "parentId": "43" }, { "areaCode": "449", "areaName": "寻甸县", "areaPinYin": "", "parentId": "43" }, { "areaCode": "450", "areaName": "嵩明县", "areaPinYin": "", "parentId": "43" }, { "areaCode": "451", "areaName": "晋宁县", "areaPinYin": "", "parentId": "43" }, { "areaCode": "452", "areaName": "盘龙区", "areaPinYin": "", "parentId": "43" }, { "areaCode": "453", "areaName": "石林县", "areaPinYin": "", "parentId": "43" }, { "areaCode": "454", "areaName": "禄劝县", "areaPinYin": "", "parentId": "43" }, { "areaCode": "455", "areaName": "西山区", "areaPinYin": "", "parentId": "43" }, { "areaCode": "456", "areaName": "大关县", "areaPinYin": "", "parentId": "44" }, { "areaCode": "457", "areaName": "威信县", "areaPinYin": "", "parentId": "44" }, { "areaCode": "458", "areaName": "巧家县", "areaPinYin": "", "parentId": "44" }, { "areaCode": "459", "areaName": "彝良县", "areaPinYin": "", "parentId": "44" }, { "areaCode": "460", "areaName": "昭阳区", "areaPinYin": "", "parentId": "44" }, { "areaCode": "461", "areaName": "水富县", "areaPinYin": "", "parentId": "44" }, { "areaCode": "462", "areaName": "永善县", "areaPinYin": "", "parentId": "44" }, { "areaCode": "463", "areaName": "盐津县", "areaPinYin": "", "parentId": "44" }, { "areaCode": "464", "areaName": "绥江县", "areaPinYin": "", "parentId": "44" }, { "areaCode": "465", "areaName": "镇雄县", "areaPinYin": "", "parentId": "44" }, { "areaCode": "466", "areaName": "鲁甸县", "areaPinYin": "", "parentId": "44" }, { "areaCode": "467", "areaName": "墨江县", "areaPinYin": "", "parentId": "45" }, { "areaCode": "468", "areaName": "孟连县", "areaPinYin": "", "parentId": "45" }, { "areaCode": "469", "areaName": "宁洱县", "areaPinYin": "", "parentId": "45" }, { "areaCode": "470", "areaName": "思茅区", "areaPinYin": "", "parentId": "45" }, { "areaCode": "471", "areaName": "景东县", "areaPinYin": "", "parentId": "45" }, { "areaCode": "472", "areaName": "景谷县", "areaPinYin": "", "parentId": "45" }, { "areaCode": "473", "areaName": "江城县", "areaPinYin": "", "parentId": "45" }, { "areaCode": "474", "areaName": "澜沧县", "areaPinYin": "", "parentId": "45" }, { "areaCode": "475", "areaName": "西盟县", "areaPinYin": "", "parentId": "45" }, { "areaCode": "476", "areaName": "镇沅县", "areaPinYin": "", "parentId": "45" }, { "areaCode": "477", "areaName": "会泽县", "areaPinYin": "", "parentId": "46" }, { "areaCode": "478", "areaName": "宣威市", "areaPinYin": "", "parentId": "46" }, { "areaCode": "479", "areaName": "富源县", "areaPinYin": "", "parentId": "46" }, { "areaCode": "480", "areaName": "师宗县", "areaPinYin": "", "parentId": "46" }, { "areaCode": "481", "areaName": "沾益县", "areaPinYin": "", "parentId": "46" }, { "areaCode": "482", "areaName": "罗平县", "areaPinYin": "", "parentId": "46" }, { "areaCode": "483", "areaName": "陆良县", "areaPinYin": "", "parentId": "46" }, { "areaCode": "484", "areaName": "马龙县", "areaPinYin": "", "parentId": "46" }, { "areaCode": "485", "areaName": "麒麟区", "areaPinYin": "", "parentId": "46" }, { "areaCode": "486", "areaName": "元谋县", "areaPinYin": "", "parentId": "47" }, { "areaCode": "487", "areaName": "南华县", "areaPinYin": "", "parentId": "47" }, { "areaCode": "488", "areaName": "双柏县", "areaPinYin": "", "parentId": "47" }, { "areaCode": "489", "areaName": "大姚县", "areaPinYin": "", "parentId": "47" }, { "areaCode": "490", "areaName": "姚安县", "areaPinYin": "", "parentId": "47" }, { "areaCode": "491", "areaName": "楚雄市", "areaPinYin": "", "parentId": "47" }, { "areaCode": "492", "areaName": "武定县", "areaPinYin": "", "parentId": "47" }, { "areaCode": "493", "areaName": "永仁县", "areaPinYin": "", "parentId": "47" }, { "areaCode": "494", "areaName": "牟定县", "areaPinYin": "", "parentId": "47" }, { "areaCode": "495", "areaName": "禄丰县", "areaPinYin": "", "parentId": "47" }, { "areaCode": "496", "areaName": "元江县", "areaPinYin": "", "parentId": "48" }, { "areaCode": "497", "areaName": "华宁县", "areaPinYin": "", "parentId": "48" }, { "areaCode": "498", "areaName": "峨山县", "areaPinYin": "", "parentId": "48" }, { "areaCode": "499", "areaName": "新平县", "areaPinYin": "", "parentId": "48" }, { "areaCode": "500", "areaName": "易门县", "areaPinYin": "", "parentId": "48" }, { "areaCode": "501", "areaName": "江川县", "areaPinYin": "", "parentId": "48" }, { "areaCode": "502", "areaName": "澄江县", "areaPinYin": "", "parentId": "48" }, { "areaCode": "503", "areaName": "红塔区", "areaPinYin": "", "parentId": "48" }, { "areaCode": "504", "areaName": "通海县", "areaPinYin": "", "parentId": "48" }, { "areaCode": "505", "areaName": "个旧市", "areaPinYin": "", "parentId": "49" }, { "areaCode": "506", "areaName": "元阳县", "areaPinYin": "", "parentId": "49" }, { "areaCode": "507", "areaName": "屏边县", "areaPinYin": "", "parentId": "49" }, { "areaCode": "508", "areaName": "建水县", "areaPinYin": "", "parentId": "49" }, { "areaCode": "509", "areaName": "开远市", "areaPinYin": "", "parentId": "49" }, { "areaCode": "510", "areaName": "弥勒县", "areaPinYin": "", "parentId": "49" }, { "areaCode": "511", "areaName": "河口县", "areaPinYin": "", "parentId": "49" }, { "areaCode": "512", "areaName": "泸西县", "areaPinYin": "", "parentId": "49" }, { "areaCode": "513", "areaName": "石屏县", "areaPinYin": "", "parentId": "49" }, { "areaCode": "514", "areaName": "红河县", "areaPinYin": "", "parentId": "49" }, { "areaCode": "515", "areaName": "绿春县", "areaPinYin": "", "parentId": "49" }, { "areaCode": "516", "areaName": "蒙自市", "areaPinYin": "", "parentId": "49" }, { "areaCode": "517", "areaName": "金平县", "areaPinYin": "", "parentId": "49" }, { "areaCode": "518", "areaName": "勐海县", "areaPinYin": "", "parentId": "50" }, { "areaCode": "519", "areaName": "勐腊县", "areaPinYin": "", "parentId": "50" }, { "areaCode": "520", "areaName": "景洪市", "areaPinYin": "", "parentId": "50" }, { "areaCode": "521", "areaName": "德钦县", "areaPinYin": "", "parentId": "51" }, { "areaCode": "522", "areaName": "维西县", "areaPinYin": "", "parentId": "51" }, { "areaCode": "523", "areaName": "香格里拉县", "areaPinYin": "", "parentId": "51" }, { "areaCode": "524", "areaName": "丰镇市", "areaPinYin": "", "parentId": "52" }, { "areaCode": "525", "areaName": "兴和县", "areaPinYin": "", "parentId": "52" }, { "areaCode": "526", "areaName": "凉城县", "areaPinYin": "", "parentId": "52" }, { "areaCode": "527", "areaName": "化德县", "areaPinYin": "", "parentId": "52" }, { "areaCode": "528", "areaName": "卓资县", "areaPinYin": "", "parentId": "52" }, { "areaCode": "529", "areaName": "商都县", "areaPinYin": "", "parentId": "52" }, { "areaCode": "530", "areaName": "四子王旗", "areaPinYin": "", "parentId": "52" }, { "areaCode": "531", "areaName": "察哈尔右翼中旗", "areaPinYin": "", "parentId": "52" }, { "areaCode": "532", "areaName": "察哈尔右翼前旗", "areaPinYin": "", "parentId": "52" }, { "areaCode": "533", "areaName": "察哈尔右翼后旗", "areaPinYin": "", "parentId": "52" }, { "areaCode": "534", "areaName": "集宁区", "areaPinYin": "", "parentId": "52" }, { "areaCode": "535", "areaName": "乌达区", "areaPinYin": "", "parentId": "53" }, { "areaCode": "536", "areaName": "海勃湾区", "areaPinYin": "", "parentId": "53" }, { "areaCode": "537", "areaName": "海南区", "areaPinYin": "", "parentId": "53" }, { "areaCode": "538", "areaName": "乌兰浩特市", "areaPinYin": "", "parentId": "54" }, { "areaCode": "539", "areaName": "扎赉特旗", "areaPinYin": "", "parentId": "54" }, { "areaCode": "540", "areaName": "科尔沁右翼中旗", "areaPinYin": "", "parentId": "54" }, { "areaCode": "541", "areaName": "科尔沁右翼前旗", "areaPinYin": "", "parentId": "54" }, { "areaCode": "542", "areaName": "突泉县", "areaPinYin": "", "parentId": "54" }, { "areaCode": "543", "areaName": "阿尔山市", "areaPinYin": "", "parentId": "54" }, { "areaCode": "544", "areaName": "东河区", "areaPinYin": "", "parentId": "55" }, { "areaCode": "545", "areaName": "九原区", "areaPinYin": "", "parentId": "55" }, { "areaCode": "546", "areaName": "固阳县", "areaPinYin": "", "parentId": "55" }, { "areaCode": "547", "areaName": "土默特右旗", "areaPinYin": "", "parentId": "55" }, { "areaCode": "548", "areaName": "昆都仑区", "areaPinYin": "", "parentId": "55" }, { "areaCode": "549", "areaName": "白云矿区", "areaPinYin": "", "parentId": "55" }, { "areaCode": "550", "areaName": "石拐区", "areaPinYin": "", "parentId": "55" }, { "areaCode": "551", "areaName": "达茂联合旗", "areaPinYin": "", "parentId": "55" }, { "areaCode": "552", "areaName": "青山区", "areaPinYin": "", "parentId": "55" }, { "areaCode": "553", "areaName": "扎兰屯市", "areaPinYin": "", "parentId": "56" }, { "areaCode": "554", "areaName": "新巴尔虎右旗", "areaPinYin": "", "parentId": "56" }, { "areaCode": "555", "areaName": "新巴尔虎左旗", "areaPinYin": "", "parentId": "56" }, { "areaCode": "556", "areaName": "根河市", "areaPinYin": "", "parentId": "56" }, { "areaCode": "557", "areaName": "海拉尔区", "areaPinYin": "", "parentId": "56" }, { "areaCode": "558", "areaName": "满洲里市", "areaPinYin": "", "parentId": "56" }, { "areaCode": "559", "areaName": "牙克石市", "areaPinYin": "", "parentId": "56" }, { "areaCode": "560", "areaName": "莫力达瓦旗", "areaPinYin": "", "parentId": "56" }, { "areaCode": "561", "areaName": "鄂伦春旗", "areaPinYin": "", "parentId": "56" }, { "areaCode": "562", "areaName": "鄂温克族旗", "areaPinYin": "", "parentId": "56" }, { "areaCode": "563", "areaName": "阿荣旗", "areaPinYin": "", "parentId": "56" }, { "areaCode": "564", "areaName": "陈巴尔虎旗", "areaPinYin": "", "parentId": "56" }, { "areaCode": "565", "areaName": "额尔古纳市", "areaPinYin": "", "parentId": "56" }, { "areaCode": "566", "areaName": "和林格尔县", "areaPinYin": "", "parentId": "57" }, { "areaCode": "567", "areaName": "回民区", "areaPinYin": "", "parentId": "57" }, { "areaCode": "568", "areaName": "土默特左旗", "areaPinYin": "", "parentId": "57" }, { "areaCode": "569", "areaName": "托克托县", "areaPinYin": "", "parentId": "57" }, { "areaCode": "570", "areaName": "新城区", "areaPinYin": "", "parentId": "57" }, { "areaCode": "571", "areaName": "武川县", "areaPinYin": "", "parentId": "57" }, { "areaCode": "572", "areaName": "清水河县", "areaPinYin": "", "parentId": "57" }, { "areaCode": "573", "areaName": "玉泉区", "areaPinYin": "", "parentId": "57" }, { "areaCode": "574", "areaName": "赛罕区", "areaPinYin": "", "parentId": "57" }, { "areaCode": "575", "areaName": "临河区", "areaPinYin": "", "parentId": "58" }, { "areaCode": "576", "areaName": "乌拉特中旗", "areaPinYin": "", "parentId": "58" }, { "areaCode": "577", "areaName": "乌拉特前旗", "areaPinYin": "", "parentId": "58" }, { "areaCode": "578", "areaName": "乌拉特后旗", "areaPinYin": "", "parentId": "58" }, { "areaCode": "579", "areaName": "五原县", "areaPinYin": "", "parentId": "58" }, { "areaCode": "580", "areaName": "杭锦后旗", "areaPinYin": "", "parentId": "58" }, { "areaCode": "581", "areaName": "磴口县", "areaPinYin": "", "parentId": "58" }, { "areaCode": "582", "areaName": "元宝山区", "areaPinYin": "", "parentId": "59" }, { "areaCode": "583", "areaName": "克什克腾旗", "areaPinYin": "", "parentId": "59" }, { "areaCode": "584", "areaName": "喀喇沁旗", "areaPinYin": "", "parentId": "59" }, { "areaCode": "585", "areaName": "宁城县", "areaPinYin": "", "parentId": "59" }, { "areaCode": "586", "areaName": "巴林右旗", "areaPinYin": "", "parentId": "59" }, { "areaCode": "587", "areaName": "巴林左旗", "areaPinYin": "", "parentId": "59" }, { "areaCode": "588", "areaName": "敖汉旗", "areaPinYin": "", "parentId": "59" }, { "areaCode": "589", "areaName": "松山区", "areaPinYin": "", "parentId": "59" }, { "areaCode": "590", "areaName": "林西县", "areaPinYin": "", "parentId": "59" }, { "areaCode": "591", "areaName": "红山区", "areaPinYin": "", "parentId": "59" }, { "areaCode": "592", "areaName": "翁牛特旗", "areaPinYin": "", "parentId": "59" }, { "areaCode": "593", "areaName": "阿鲁科尔沁旗", "areaPinYin": "", "parentId": "59" }, { "areaCode": "594", "areaName": "奈曼旗", "areaPinYin": "", "parentId": "60" }, { "areaCode": "595", "areaName": "库伦旗", "areaPinYin": "", "parentId": "60" }, { "areaCode": "596", "areaName": "开鲁县", "areaPinYin": "", "parentId": "60" }, { "areaCode": "597", "areaName": "扎鲁特旗", "areaPinYin": "", "parentId": "60" }, { "areaCode": "598", "areaName": "科尔沁区", "areaPinYin": "", "parentId": "60" }, { "areaCode": "599", "areaName": "科尔沁左翼中旗", "areaPinYin": "", "parentId": "60" }, { "areaCode": "600", "areaName": "科尔沁左翼后旗", "areaPinYin": "", "parentId": "60" }, { "areaCode": "601", "areaName": "霍林郭勒市", "areaPinYin": "", "parentId": "60" }, { "areaCode": "602", "areaName": "东胜区", "areaPinYin": "", "parentId": "61" }, { "areaCode": "603", "areaName": "乌审旗", "areaPinYin": "", "parentId": "61" }, { "areaCode": "604", "areaName": "伊金霍洛旗", "areaPinYin": "", "parentId": "61" }, { "areaCode": "605", "areaName": "准格尔旗", "areaPinYin": "", "parentId": "61" }, { "areaCode": "606", "areaName": "康巴什新区", "areaPinYin": "", "parentId": "61" }, { "areaCode": "607", "areaName": "杭锦旗", "areaPinYin": "", "parentId": "61" }, { "areaCode": "608", "areaName": "达拉特旗", "areaPinYin": "", "parentId": "61" }, { "areaCode": "609", "areaName": "鄂托克前旗", "areaPinYin": "", "parentId": "61" }, { "areaCode": "610", "areaName": "鄂托克旗", "areaPinYin": "", "parentId": "61" }, { "areaCode": "611", "areaName": "东乌珠穆沁旗", "areaPinYin": "", "parentId": "62" }, { "areaCode": "612", "areaName": "二连浩特市", "areaPinYin": "", "parentId": "62" }, { "areaCode": "613", "areaName": "多伦县", "areaPinYin": "", "parentId": "62" }, { "areaCode": "614", "areaName": "太仆寺旗", "areaPinYin": "", "parentId": "62" }, { "areaCode": "615", "areaName": "正蓝旗", "areaPinYin": "", "parentId": "62" }, { "areaCode": "616", "areaName": "正镶白旗", "areaPinYin": "", "parentId": "62" }, { "areaCode": "617", "areaName": "苏尼特右旗", "areaPinYin": "", "parentId": "62" }, { "areaCode": "618", "areaName": "苏尼特左旗", "areaPinYin": "", "parentId": "62" }, { "areaCode": "619", "areaName": "西乌珠穆沁旗", "areaPinYin": "", "parentId": "62" }, { "areaCode": "620", "areaName": "锡林浩特市", "areaPinYin": "", "parentId": "62" }, { "areaCode": "621", "areaName": "镶黄旗", "areaPinYin": "", "parentId": "62" }, { "areaCode": "622", "areaName": "阿巴嘎旗", "areaPinYin": "", "parentId": "62" }, { "areaCode": "623", "areaName": "阿拉善右旗", "areaPinYin": "", "parentId": "63" }, { "areaCode": "624", "areaName": "阿拉善左旗", "areaPinYin": "", "parentId": "63" }, { "areaCode": "625", "areaName": "额济纳旗", "areaPinYin": "", "parentId": "63" }, { "areaCode": "626", "areaName": "丰满区", "areaPinYin": "", "parentId": "64" }, { "areaCode": "627", "areaName": "昌邑区", "areaPinYin": "", "parentId": "64" }, { "areaCode": "628", "areaName": "桦甸市", "areaPinYin": "", "parentId": "64" }, { "areaCode": "629", "areaName": "永吉县", "areaPinYin": "", "parentId": "64" }, { "areaCode": "630", "areaName": "磐石市", "areaPinYin": "", "parentId": "64" }, { "areaCode": "631", "areaName": "舒兰市", "areaPinYin": "", "parentId": "64" }, { "areaCode": "632", "areaName": "船营区", "areaPinYin": "", "parentId": "64" }, { "areaCode": "633", "areaName": "蛟河市", "areaPinYin": "", "parentId": "64" }, { "areaCode": "634", "areaName": "龙潭区", "areaPinYin": "", "parentId": "64" }, { "areaCode": "635", "areaName": "伊通县", "areaPinYin": "", "parentId": "65" }, { "areaCode": "636", "areaName": "公主岭市", "areaPinYin": "", "parentId": "65" }, { "areaCode": "637", "areaName": "双辽市", "areaPinYin": "", "parentId": "65" }, { "areaCode": "638", "areaName": "梨树县", "areaPinYin": "", "parentId": "65" }, { "areaCode": "639", "areaName": "铁东区", "areaPinYin": "", "parentId": "65" }, { "areaCode": "640", "areaName": "铁西区", "areaPinYin": "", "parentId": "65" }, { "areaCode": "641", "areaName": "和龙市", "areaPinYin": "", "parentId": "66" }, { "areaCode": "642", "areaName": "图们市", "areaPinYin": "", "parentId": "66" }, { "areaCode": "643", "areaName": "安图县", "areaPinYin": "", "parentId": "66" }, { "areaCode": "644", "areaName": "延吉市", "areaPinYin": "", "parentId": "66" }, { "areaCode": "645", "areaName": "敦化市", "areaPinYin": "", "parentId": "66" }, { "areaCode": "646", "areaName": "汪清县", "areaPinYin": "", "parentId": "66" }, { "areaCode": "647", "areaName": "珲春市", "areaPinYin": "", "parentId": "66" }, { "areaCode": "648", "areaName": "龙井市", "areaPinYin": "", "parentId": "66" }, { "areaCode": "649", "areaName": "乾安县", "areaPinYin": "", "parentId": "67" }, { "areaCode": "650", "areaName": "前郭县", "areaPinYin": "", "parentId": "67" }, { "areaCode": "651", "areaName": "宁江区", "areaPinYin": "", "parentId": "67" }, { "areaCode": "652", "areaName": "扶余县", "areaPinYin": "", "parentId": "67" }, { "areaCode": "653", "areaName": "长岭县", "areaPinYin": "", "parentId": "67" }, { "areaCode": "654", "areaName": "大安市", "areaPinYin": "", "parentId": "68" }, { "areaCode": "655", "areaName": "洮北区", "areaPinYin": "", "parentId": "68" }, { "areaCode": "656", "areaName": "洮南市", "areaPinYin": "", "parentId": "68" }, { "areaCode": "657", "areaName": "通榆县", "areaPinYin": "", "parentId": "68" }, { "areaCode": "658", "areaName": "镇赉县", "areaPinYin": "", "parentId": "68" }, { "areaCode": "659", "areaName": "临江市", "areaPinYin": "", "parentId": "69" }, { "areaCode": "660", "areaName": "抚松县", "areaPinYin": "", "parentId": "69" }, { "areaCode": "661", "areaName": "江源区", "areaPinYin": "", "parentId": "69" }, { "areaCode": "662", "areaName": "浑江区", "areaPinYin": "", "parentId": "69" }, { "areaCode": "663", "areaName": "长白县", "areaPinYin": "", "parentId": "69" }, { "areaCode": "664", "areaName": "靖宇县", "areaPinYin": "", "parentId": "69" }, { "areaCode": "665", "areaName": "东丰县", "areaPinYin": "", "parentId": "70" }, { "areaCode": "666", "areaName": "东辽县", "areaPinYin": "", "parentId": "70" }, { "areaCode": "667", "areaName": "西安区", "areaPinYin": "", "parentId": "70" }, { "areaCode": "668", "areaName": "龙山区", "areaPinYin": "", "parentId": "70" }, { "areaCode": "669", "areaName": "东昌区", "areaPinYin": "", "parentId": "71" }, { "areaCode": "670", "areaName": "二道江区", "areaPinYin": "", "parentId": "71" }, { "areaCode": "671", "areaName": "柳河县", "areaPinYin": "", "parentId": "71" }, { "areaCode": "672", "areaName": "梅河口市", "areaPinYin": "", "parentId": "71" }, { "areaCode": "673", "areaName": "辉南县", "areaPinYin": "", "parentId": "71" }, { "areaCode": "674", "areaName": "通化县", "areaPinYin": "", "parentId": "71" }, { "areaCode": "675", "areaName": "集安市", "areaPinYin": "", "parentId": "71" }, { "areaCode": "676", "areaName": "九台市", "areaPinYin": "", "parentId": "72" }, { "areaCode": "677", "areaName": "二道区", "areaPinYin": "", "parentId": "72" }, { "areaCode": "678", "areaName": "农安县", "areaPinYin": "", "parentId": "72" }, { "areaCode": "679", "areaName": "净月区", "areaPinYin": "", "parentId": "72" }, { "areaCode": "680", "areaName": "南关区", "areaPinYin": "", "parentId": "72" }, { "areaCode": "681", "areaName": "双阳区", "areaPinYin": "", "parentId": "72" }, { "areaCode": "682", "areaName": "宽城区", "areaPinYin": "", "parentId": "72" }, { "areaCode": "683", "areaName": "德惠市", "areaPinYin": "", "parentId": "72" }, { "areaCode": "684", "areaName": "朝阳区", "areaPinYin": "", "parentId": "72" }, { "areaCode": "685", "areaName": "榆树市", "areaPinYin": "", "parentId": "72" }, { "areaCode": "686", "areaName": "汽车产业开发区", "areaPinYin": "", "parentId": "72" }, { "areaCode": "687", "areaName": "经济技术开发区", "areaPinYin": "", "parentId": "72" }, { "areaCode": "688", "areaName": "绿园区", "areaPinYin": "", "parentId": "72" }, { "areaCode": "689", "areaName": "高新技术开发区", "areaPinYin": "", "parentId": "72" }, { "areaCode": "690", "areaName": "五通桥区", "areaPinYin": "", "parentId": "73" }, { "areaCode": "691", "areaName": "井研县", "areaPinYin": "", "parentId": "73" }, { "areaCode": "692", "areaName": "夹江县", "areaPinYin": "", "parentId": "73" }, { "areaCode": "693", "areaName": "峨眉山市", "areaPinYin": "", "parentId": "73" }, { "areaCode": "694", "areaName": "峨边县", "areaPinYin": "", "parentId": "73" }, { "areaCode": "695", "areaName": "市中区", "areaPinYin": "", "parentId": "73" }, { "areaCode": "696", "areaName": "沐川县", "areaPinYin": "", "parentId": "73" }, { "areaCode": "697", "areaName": "沙湾区", "areaPinYin": "", "parentId": "73" }, { "areaCode": "698", "areaName": "犍为县", "areaPinYin": "", "parentId": "73" }, { "areaCode": "699", "areaName": "金口河区", "areaPinYin": "", "parentId": "73" }, { "areaCode": "700", "areaName": "马边县", "areaPinYin": "", "parentId": "73" }, { "areaCode": "701", "areaName": "东兴区", "areaPinYin": "", "parentId": "74" }, { "areaCode": "702", "areaName": "威远县", "areaPinYin": "", "parentId": "74" }, { "areaCode": "703", "areaName": "市中区", "areaPinYin": "", "parentId": "74" }, { "areaCode": "704", "areaName": "资中县", "areaPinYin": "", "parentId": "74" }, { "areaCode": "705", "areaName": "隆昌县", "areaPinYin": "", "parentId": "74" }, { "areaCode": "706", "areaName": "会东县", "areaPinYin": "", "parentId": "75" }, { "areaCode": "707", "areaName": "会理县", "areaPinYin": "", "parentId": "75" }, { "areaCode": "708", "areaName": "冕宁县", "areaPinYin": "", "parentId": "75" }, { "areaCode": "709", "areaName": "喜德县", "areaPinYin": "", "parentId": "75" }, { "areaCode": "710", "areaName": "宁南县", "areaPinYin": "", "parentId": "75" }, { "areaCode": "711", "areaName": "布拖县", "areaPinYin": "", "parentId": "75" }, { "areaCode": "712", "areaName": "德昌县", "areaPinYin": "", "parentId": "75" }, { "areaCode": "713", "areaName": "昭觉县", "areaPinYin": "", "parentId": "75" }, { "areaCode": "714", "areaName": "普格县", "areaPinYin": "", "parentId": "75" }, { "areaCode": "715", "areaName": "木里县", "areaPinYin": "", "parentId": "75" }, { "areaCode": "716", "areaName": "甘洛县", "areaPinYin": "", "parentId": "75" }, { "areaCode": "717", "areaName": "盐源县", "areaPinYin": "", "parentId": "75" }, { "areaCode": "718", "areaName": "美姑县", "areaPinYin": "", "parentId": "75" }, { "areaCode": "719", "areaName": "西昌市", "areaPinYin": "", "parentId": "75" }, { "areaCode": "720", "areaName": "越西县", "areaPinYin": "", "parentId": "75" }, { "areaCode": "721", "areaName": "金阳县", "areaPinYin": "", "parentId": "75" }, { "areaCode": "722", "areaName": "雷波县", "areaPinYin": "", "parentId": "75" }, { "areaCode": "723", "areaName": "仪陇县", "areaPinYin": "", "parentId": "76" }, { "areaCode": "724", "areaName": "南部县", "areaPinYin": "", "parentId": "76" }, { "areaCode": "725", "areaName": "嘉陵区", "areaPinYin": "", "parentId": "76" }, { "areaCode": "726", "areaName": "营山县", "areaPinYin": "", "parentId": "76" }, { "areaCode": "727", "areaName": "蓬安县", "areaPinYin": "", "parentId": "76" }, { "areaCode": "728", "areaName": "西充县", "areaPinYin": "", "parentId": "76" }, { "areaCode": "729", "areaName": "阆中市", "areaPinYin": "", "parentId": "76" }, { "areaCode": "730", "areaName": "顺庆区", "areaPinYin": "", "parentId": "76" }, { "areaCode": "731", "areaName": "高坪区", "areaPinYin": "", "parentId": "76" }, { "areaCode": "732", "areaName": "兴文县", "areaPinYin": "", "parentId": "77" }, { "areaCode": "733", "areaName": "南溪区", "areaPinYin": "", "parentId": "77" }, { "areaCode": "734", "areaName": "宜宾县", "areaPinYin": "", "parentId": "77" }, { "areaCode": "735", "areaName": "屏山县", "areaPinYin": "", "parentId": "77" }, { "areaCode": "736", "areaName": "江安县", "areaPinYin": "", "parentId": "77" }, { "areaCode": "737", "areaName": "珙县", "areaPinYin": "", "parentId": "77" }, { "areaCode": "738", "areaName": "筠连县", "areaPinYin": "", "parentId": "77" }, { "areaCode": "739", "areaName": "翠屏区", "areaPinYin": "", "parentId": "77" }, { "areaCode": "740", "areaName": "长宁县", "areaPinYin": "", "parentId": "77" }, { "areaCode": "741", "areaName": "高县", "areaPinYin": "", "parentId": "77" }, { "areaCode": "742", "areaName": "南江县", "areaPinYin": "", "parentId": "78" }, { "areaCode": "743", "areaName": "巴州区", "areaPinYin": "", "parentId": "78" }, { "areaCode": "744", "areaName": "平昌县", "areaPinYin": "", "parentId": "78" }, { "areaCode": "745", "areaName": "恩阳区", "areaPinYin": "", "parentId": "78" }, { "areaCode": "746", "areaName": "通江县", "areaPinYin": "", "parentId": "78" }, { "areaCode": "747", "areaName": "元坝区", "areaPinYin": "", "parentId": "79" }, { "areaCode": "748", "areaName": "利州区", "areaPinYin": "", "parentId": "79" }, { "areaCode": "749", "areaName": "剑阁县", "areaPinYin": "", "parentId": "79" }, { "areaCode": "750", "areaName": "旺苍县", "areaPinYin": "", "parentId": "79" }, { "areaCode": "751", "areaName": "朝天区", "areaPinYin": "", "parentId": "79" }, { "areaCode": "752", "areaName": "苍溪县", "areaPinYin": "", "parentId": "79" }, { "areaCode": "753", "areaName": "青川县", "areaPinYin": "", "parentId": "79" }, { "areaCode": "754", "areaName": "前锋区", "areaPinYin": "", "parentId": "80" }, { "areaCode": "755", "areaName": "华蓥市", "areaPinYin": "", "parentId": "80" }, { "areaCode": "756", "areaName": "岳池县", "areaPinYin": "", "parentId": "80" }, { "areaCode": "757", "areaName": "广安区", "areaPinYin": "", "parentId": "80" }, { "areaCode": "758", "areaName": "武胜县", "areaPinYin": "", "parentId": "80" }, { "areaCode": "759", "areaName": "邻水县", "areaPinYin": "", "parentId": "80" }, { "areaCode": "760", "areaName": "中江县", "areaPinYin": "", "parentId": "81" }, { "areaCode": "761", "areaName": "什邡市", "areaPinYin": "", "parentId": "81" }, { "areaCode": "762", "areaName": "广汉市", "areaPinYin": "", "parentId": "81" }, { "areaCode": "763", "areaName": "旌阳区", "areaPinYin": "", "parentId": "81" }, { "areaCode": "764", "areaName": "绵竹市", "areaPinYin": "", "parentId": "81" }, { "areaCode": "765", "areaName": "罗江县", "areaPinYin": "", "parentId": "81" }, { "areaCode": "766", "areaName": "双流县", "areaPinYin": "", "parentId": "82" }, { "areaCode": "767", "areaName": "大邑县", "areaPinYin": "", "parentId": "82" }, { "areaCode": "768", "areaName": "崇州市", "areaPinYin": "", "parentId": "82" }, { "areaCode": "769", "areaName": "彭州市", "areaPinYin": "", "parentId": "82" }, { "areaCode": "770", "areaName": "成华区", "areaPinYin": "", "parentId": "82" }, { "areaCode": "771", "areaName": "新津县", "areaPinYin": "", "parentId": "82" }, { "areaCode": "772", "areaName": "新都区", "areaPinYin": "", "parentId": "82" }, { "areaCode": "773", "areaName": "武侯区", "areaPinYin": "", "parentId": "82" }, { "areaCode": "774", "areaName": "温江区", "areaPinYin": "", "parentId": "82" }, { "areaCode": "775", "areaName": "蒲江县", "areaPinYin": "", "parentId": "82" }, { "areaCode": "776", "areaName": "邛崃市", "areaPinYin": "", "parentId": "82" }, { "areaCode": "777", "areaName": "郫县", "areaPinYin": "", "parentId": "82" }, { "areaCode": "778", "areaName": "都江堰市", "areaPinYin": "", "parentId": "82" }, { "areaCode": "779", "areaName": "金堂县", "areaPinYin": "", "parentId": "82" }, { "areaCode": "780", "areaName": "金牛区", "areaPinYin": "", "parentId": "82" }, { "areaCode": "781", "areaName": "锦江区", "areaPinYin": "", "parentId": "82" }, { "areaCode": "782", "areaName": "青白江区", "areaPinYin": "", "parentId": "82" }, { "areaCode": "783", "areaName": "青羊区", "areaPinYin": "", "parentId": "82" }, { "areaCode": "784", "areaName": "高新区", "areaPinYin": "", "parentId": "82" }, { "areaCode": "785", "areaName": "高新西区", "areaPinYin": "", "parentId": "82" }, { "areaCode": "786", "areaName": "龙泉驿区", "areaPinYin": "", "parentId": "82" }, { "areaCode": "787", "areaName": "东区", "areaPinYin": "", "parentId": "83" }, { "areaCode": "788", "areaName": "仁和区", "areaPinYin": "", "parentId": "83" }, { "areaCode": "789", "areaName": "盐边县", "areaPinYin": "", "parentId": "83" }, { "areaCode": "790", "areaName": "米易县", "areaPinYin": "", "parentId": "83" }, { "areaCode": "791", "areaName": "西区", "areaPinYin": "", "parentId": "83" }, { "areaCode": "792", "areaName": "叙永县", "areaPinYin": "", "parentId": "84" }, { "areaCode": "793", "areaName": "古蔺县", "areaPinYin": "", "parentId": "84" }, { "areaCode": "794", "areaName": "合江县", "areaPinYin": "", "parentId": "84" }, { "areaCode": "795", "areaName": "江阳区", "areaPinYin": "", "parentId": "84" }, { "areaCode": "796", "areaName": "泸县", "areaPinYin": "", "parentId": "84" }, { "areaCode": "797", "areaName": "纳溪区", "areaPinYin": "", "parentId": "84" }, { "areaCode": "798", "areaName": "龙马潭区", "areaPinYin": "", "parentId": "84" }, { "areaCode": "799", "areaName": "丹巴县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "800", "areaName": "九龙县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "801", "areaName": "乡城县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "802", "areaName": "巴塘县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "803", "areaName": "康定县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "804", "areaName": "得荣县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "805", "areaName": "德格县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "806", "areaName": "新龙县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "807", "areaName": "泸定县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "808", "areaName": "炉霍县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "809", "areaName": "理塘县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "810", "areaName": "甘孜县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "811", "areaName": "白玉县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "812", "areaName": "石渠县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "813", "areaName": "稻城县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "814", "areaName": "色达县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "815", "areaName": "道孚县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "816", "areaName": "雅江县", "areaPinYin": "", "parentId": "85" }, { "areaCode": "817", "areaName": "东坡区", "areaPinYin": "", "parentId": "86" }, { "areaCode": "818", "areaName": "丹棱县", "areaPinYin": "", "parentId": "86" }, { "areaCode": "819", "areaName": "仁寿县", "areaPinYin": "", "parentId": "86" }, { "areaCode": "820", "areaName": "彭山县", "areaPinYin": "", "parentId": "86" }, { "areaCode": "821", "areaName": "洪雅县", "areaPinYin": "", "parentId": "86" }, { "areaCode": "822", "areaName": "青神县", "areaPinYin": "", "parentId": "86" }, { "areaCode": "823", "areaName": "三台县", "areaPinYin": "", "parentId": "87" }, { "areaCode": "824", "areaName": "北川县", "areaPinYin": "", "parentId": "87" }, { "areaCode": "825", "areaName": "安县", "areaPinYin": "", "parentId": "87" }, { "areaCode": "826", "areaName": "平武县", "areaPinYin": "", "parentId": "87" }, { "areaCode": "827", "areaName": "梓潼县", "areaPinYin": "", "parentId": "87" }, { "areaCode": "828", "areaName": "江油市", "areaPinYin": "", "parentId": "87" }, { "areaCode": "829", "areaName": "涪城区", "areaPinYin": "", "parentId": "87" }, { "areaCode": "830", "areaName": "游仙区", "areaPinYin": "", "parentId": "87" }, { "areaCode": "831", "areaName": "盐亭县", "areaPinYin": "", "parentId": "87" }, { "areaCode": "832", "areaName": "经开区", "areaPinYin": "", "parentId": "87" }, { "areaCode": "833", "areaName": "高新区", "areaPinYin": "", "parentId": "87" }, { "areaCode": "834", "areaName": "大安区", "areaPinYin": "", "parentId": "88" }, { "areaCode": "835", "areaName": "富顺县", "areaPinYin": "", "parentId": "88" }, { "areaCode": "836", "areaName": "沿滩区", "areaPinYin": "", "parentId": "88" }, { "areaCode": "837", "areaName": "自流井区", "areaPinYin": "", "parentId": "88" }, { "areaCode": "838", "areaName": "荣县", "areaPinYin": "", "parentId": "88" }, { "areaCode": "839", "areaName": "贡井区", "areaPinYin": "", "parentId": "88" }, { "areaCode": "840", "areaName": "乐至县", "areaPinYin": "", "parentId": "89" }, { "areaCode": "841", "areaName": "安岳县", "areaPinYin": "", "parentId": "89" }, { "areaCode": "842", "areaName": "简阳市", "areaPinYin": "", "parentId": "89" }, { "areaCode": "843", "areaName": "雁江区", "areaPinYin": "", "parentId": "89" }, { "areaCode": "844", "areaName": "万源市", "areaPinYin": "", "parentId": "90" }, { "areaCode": "845", "areaName": "大竹县", "areaPinYin": "", "parentId": "90" }, { "areaCode": "846", "areaName": "宣汉县", "areaPinYin": "", "parentId": "90" }, { "areaCode": "847", "areaName": "开江县", "areaPinYin": "", "parentId": "90" }, { "areaCode": "848", "areaName": "渠县", "areaPinYin": "", "parentId": "90" }, { "areaCode": "849", "areaName": "达县", "areaPinYin": "", "parentId": "90" }, { "areaCode": "850", "areaName": "通川区", "areaPinYin": "", "parentId": "90" }, { "areaCode": "851", "areaName": "大英县", "areaPinYin": "", "parentId": "91" }, { "areaCode": "852", "areaName": "安居区", "areaPinYin": "", "parentId": "91" }, { "areaCode": "853", "areaName": "射洪县", "areaPinYin": "", "parentId": "91" }, { "areaCode": "854", "areaName": "船山区", "areaPinYin": "", "parentId": "91" }, { "areaCode": "855", "areaName": "蓬溪县", "areaPinYin": "", "parentId": "91" }, { "areaCode": "856", "areaName": "九寨沟县", "areaPinYin": "", "parentId": "92" }, { "areaCode": "857", "areaName": "壤塘县", "areaPinYin": "", "parentId": "92" }, { "areaCode": "858", "areaName": "小金县", "areaPinYin": "", "parentId": "92" }, { "areaCode": "859", "areaName": "松潘县", "areaPinYin": "", "parentId": "92" }, { "areaCode": "860", "areaName": "汶川县", "areaPinYin": "", "parentId": "92" }, { "areaCode": "861", "areaName": "理县", "areaPinYin": "", "parentId": "92" }, { "areaCode": "862", "areaName": "红原县", "areaPinYin": "", "parentId": "92" }, { "areaCode": "863", "areaName": "若尔盖县", "areaPinYin": "", "parentId": "92" }, { "areaCode": "864", "areaName": "茂县", "areaPinYin": "", "parentId": "92" }, { "areaCode": "865", "areaName": "金川县", "areaPinYin": "", "parentId": "92" }, { "areaCode": "866", "areaName": "阿坝县", "areaPinYin": "", "parentId": "92" }, { "areaCode": "867", "areaName": "马尔康县", "areaPinYin": "", "parentId": "92" }, { "areaCode": "868", "areaName": "黑水县", "areaPinYin": "", "parentId": "92" }, { "areaCode": "869", "areaName": "名山区", "areaPinYin": "", "parentId": "93" }, { "areaCode": "870", "areaName": "天全县", "areaPinYin": "", "parentId": "93" }, { "areaCode": "871", "areaName": "宝兴县", "areaPinYin": "", "parentId": "93" }, { "areaCode": "872", "areaName": "汉源县", "areaPinYin": "", "parentId": "93" }, { "areaCode": "873", "areaName": "石棉县", "areaPinYin": "", "parentId": "93" }, { "areaCode": "874", "areaName": "芦山县", "areaPinYin": "", "parentId": "93" }, { "areaCode": "875", "areaName": "荥经县", "areaPinYin": "", "parentId": "93" }, { "areaCode": "876", "areaName": "雨城区", "areaPinYin": "", "parentId": "93" }, { "areaCode": "877", "areaName": "中宁县", "areaPinYin": "", "parentId": "94" }, { "areaCode": "878", "areaName": "沙坡头区", "areaPinYin": "", "parentId": "94" }, { "areaCode": "879", "areaName": "海原县", "areaPinYin": "", "parentId": "94" }, { "areaCode": "880", "areaName": "利通区", "areaPinYin": "", "parentId": "95" }, { "areaCode": "881", "areaName": "同心县", "areaPinYin": "", "parentId": "95" }, { "areaCode": "882", "areaName": "盐池县", "areaPinYin": "", "parentId": "95" }, { "areaCode": "883", "areaName": "红寺堡开发区", "areaPinYin": "", "parentId": "95" }, { "areaCode": "884", "areaName": "青铜峡市", "areaPinYin": "", "parentId": "95" }, { "areaCode": "885", "areaName": "原州区", "areaPinYin": "", "parentId": "96" }, { "areaCode": "886", "areaName": "彭阳县", "areaPinYin": "", "parentId": "96" }, { "areaCode": "887", "areaName": "泾源县", "areaPinYin": "", "parentId": "96" }, { "areaCode": "888", "areaName": "西吉县", "areaPinYin": "", "parentId": "96" }, { "areaCode": "889", "areaName": "隆德县", "areaPinYin": "", "parentId": "96" }, { "areaCode": "890", "areaName": "大武口区", "areaPinYin": "", "parentId": "97" }, { "areaCode": "891", "areaName": "平罗县", "areaPinYin": "", "parentId": "97" }, { "areaCode": "892", "areaName": "惠农区", "areaPinYin": "", "parentId": "97" }, { "areaCode": "893", "areaName": "兴庆区", "areaPinYin": "", "parentId": "98" }, { "areaCode": "894", "areaName": "永宁县", "areaPinYin": "", "parentId": "98" }, { "areaCode": "895", "areaName": "灵武市", "areaPinYin": "", "parentId": "98" }, { "areaCode": "896", "areaName": "西夏区", "areaPinYin": "", "parentId": "98" }, { "areaCode": "897", "areaName": "贺兰县", "areaPinYin": "", "parentId": "98" }, { "areaCode": "898", "areaName": "金凤区", "areaPinYin": "", "parentId": "98" }, { "areaCode": "899", "areaName": "利辛县", "areaPinYin": "", "parentId": "99" }, { "areaCode": "900", "areaName": "涡阳县", "areaPinYin": "", "parentId": "99" }, { "areaCode": "901", "areaName": "蒙城县", "areaPinYin": "", "parentId": "99" }, { "areaCode": "902", "areaName": "谯城区", "areaPinYin": "", "parentId": "99" }, { "areaCode": "903", "areaName": "寿县", "areaPinYin": "", "parentId": "100" }, { "areaCode": "904", "areaName": "舒城县", "areaPinYin": "", "parentId": "100" }, { "areaCode": "905", "areaName": "裕安区", "areaPinYin": "", "parentId": "100" }, { "areaCode": "906", "areaName": "金安区", "areaPinYin": "", "parentId": "100" }, { "areaCode": "907", "areaName": "金寨县", "areaPinYin": "", "parentId": "100" }, { "areaCode": "908", "areaName": "霍山县", "areaPinYin": "", "parentId": "100" }, { "areaCode": "909", "areaName": "霍邱县", "areaPinYin": "", "parentId": "100" }, { "areaCode": "910", "areaName": "包河区", "areaPinYin": "", "parentId": "101" }, { "areaCode": "911", "areaName": "北城新区", "areaPinYin": "", "parentId": "101" }, { "areaCode": "912", "areaName": "巢湖市", "areaPinYin": "", "parentId": "101" }, { "areaCode": "913", "areaName": "庐江县", "areaPinYin": "", "parentId": "101" }, { "areaCode": "914", "areaName": "庐阳区", "areaPinYin": "", "parentId": "101" }, { "areaCode": "915", "areaName": "政务文化新区", "areaPinYin": "", "parentId": "101" }, { "areaCode": "916", "areaName": "新站综合开发试验区", "areaPinYin": "", "parentId": "101" }, { "areaCode": "917", "areaName": "滨湖新区", "areaPinYin": "", "parentId": "101" }, { "areaCode": "918", "areaName": "瑶海区", "areaPinYin": "", "parentId": "101" }, { "areaCode": "919", "areaName": "经济技术开发区", "areaPinYin": "", "parentId": "101" }, { "areaCode": "920", "areaName": "肥东县", "areaPinYin": "", "parentId": "101" }, { "areaCode": "921", "areaName": "肥西县", "areaPinYin": "", "parentId": "101" }, { "areaCode": "922", "areaName": "蜀山区", "areaPinYin": "", "parentId": "101" }, { "areaCode": "923", "areaName": "长丰县", "areaPinYin": "", "parentId": "101" }, { "areaCode": "924", "areaName": "高新技术开发区", "areaPinYin": "", "parentId": "101" }, { "areaCode": "925", "areaName": "大观区", "areaPinYin": "", "parentId": "102" }, { "areaCode": "926", "areaName": "太湖县", "areaPinYin": "", "parentId": "102" }, { "areaCode": "927", "areaName": "宜秀区", "areaPinYin": "", "parentId": "102" }, { "areaCode": "928", "areaName": "宿松县", "areaPinYin": "", "parentId": "102" }, { "areaCode": "929", "areaName": "岳西县", "areaPinYin": "", "parentId": "102" }, { "areaCode": "930", "areaName": "开发区", "areaPinYin": "", "parentId": "102" }, { "areaCode": "931", "areaName": "怀宁县", "areaPinYin": "", "parentId": "102" }, { "areaCode": "932", "areaName": "望江县", "areaPinYin": "", "parentId": "102" }, { "areaCode": "933", "areaName": "枞阳县", "areaPinYin": "", "parentId": "102" }, { "areaCode": "934", "areaName": "桐城市", "areaPinYin": "", "parentId": "102" }, { "areaCode": "935", "areaName": "潜山县", "areaPinYin": "", "parentId": "102" }, { "areaCode": "936", "areaName": "迎江区", "areaPinYin": "", "parentId": "102" }, { "areaCode": "937", "areaName": "宁国市", "areaPinYin": "", "parentId": "103" }, { "areaCode": "938", "areaName": "宣州区", "areaPinYin": "", "parentId": "103" }, { "areaCode": "939", "areaName": "广德县", "areaPinYin": "", "parentId": "103" }, { "areaCode": "940", "areaName": "旌德县", "areaPinYin": "", "parentId": "103" }, { "areaCode": "941", "areaName": "泾县", "areaPinYin": "", "parentId": "103" }, { "areaCode": "942", "areaName": "绩溪县", "areaPinYin": "", "parentId": "103" }, { "areaCode": "943", "areaName": "郎溪县", "areaPinYin": "", "parentId": "103" }, { "areaCode": "944", "areaName": "埇桥区", "areaPinYin": "", "parentId": "104" }, { "areaCode": "945", "areaName": "泗县", "areaPinYin": "", "parentId": "104" }, { "areaCode": "946", "areaName": "灵璧县", "areaPinYin": "", "parentId": "104" }, { "areaCode": "947", "areaName": "砀山县", "areaPinYin": "", "parentId": "104" }, { "areaCode": "948", "areaName": "经济开发区", "areaPinYin": "", "parentId": "104" }, { "areaCode": "949", "areaName": "萧县", "areaPinYin": "", "parentId": "104" }, { "areaCode": "950", "areaName": "东至县", "areaPinYin": "", "parentId": "105" }, { "areaCode": "951", "areaName": "石台县", "areaPinYin": "", "parentId": "105" }, { "areaCode": "952", "areaName": "贵池区", "areaPinYin": "", "parentId": "105" }, { "areaCode": "953", "areaName": "青阳县", "areaPinYin": "", "parentId": "105" }, { "areaCode": "954", "areaName": "杜集区", "areaPinYin": "", "parentId": "106" }, { "areaCode": "955", "areaName": "濉溪县", "areaPinYin": "", "parentId": "106" }, { "areaCode": "956", "areaName": "烈山区", "areaPinYin": "", "parentId": "106" }, { "areaCode": "957", "areaName": "相山区", "areaPinYin": "", "parentId": "106" }, { "areaCode": "958", "areaName": "八公山区", "areaPinYin": "", "parentId": "107" }, { "areaCode": "959", "areaName": "凤台县", "areaPinYin": "", "parentId": "107" }, { "areaCode": "960", "areaName": "大通区", "areaPinYin": "", "parentId": "107" }, { "areaCode": "961", "areaName": "淮南高新技术开发区", "areaPinYin": "", "parentId": "107" }, { "areaCode": "962", "areaName": "潘集区", "areaPinYin": "", "parentId": "107" }, { "areaCode": "963", "areaName": "田家庵区", "areaPinYin": "", "parentId": "107" }, { "areaCode": "964", "areaName": "谢家集区", "areaPinYin": "", "parentId": "107" }, { "areaCode": "965", "areaName": "全椒县", "areaPinYin": "", "parentId": "108" }, { "areaCode": "966", "areaName": "凤阳县", "areaPinYin": "", "parentId": "108" }, { "areaCode": "967", "areaName": "南谯区", "areaPinYin": "", "parentId": "108" }, { "areaCode": "968", "areaName": "天长市", "areaPinYin": "", "parentId": "108" }, { "areaCode": "969", "areaName": "定远县", "areaPinYin": "", "parentId": "108" }, { "areaCode": "970", "areaName": "明光市", "areaPinYin": "", "parentId": "108" }, { "areaCode": "971", "areaName": "来安县", "areaPinYin": "", "parentId": "108" }, { "areaCode": "972", "areaName": "琅琊区", "areaPinYin": "", "parentId": "108" }, { "areaCode": "973", "areaName": "三山区", "areaPinYin": "", "parentId": "109" }, { "areaCode": "974", "areaName": "南陵县", "areaPinYin": "", "parentId": "109" }, { "areaCode": "975", "areaName": "弋江区", "areaPinYin": "", "parentId": "109" }, { "areaCode": "976", "areaName": "无为县", "areaPinYin": "", "parentId": "109" }, { "areaCode": "977", "areaName": "繁昌县", "areaPinYin": "", "parentId": "109" }, { "areaCode": "978", "areaName": "芜湖县", "areaPinYin": "", "parentId": "109" }, { "areaCode": "979", "areaName": "镜湖区", "areaPinYin": "", "parentId": "109" }, { "areaCode": "980", "areaName": "鸠江区", "areaPinYin": "", "parentId": "109" }, { "areaCode": "981", "areaName": "五河县", "areaPinYin": "", "parentId": "110" }, { "areaCode": "982", "areaName": "固镇县", "areaPinYin": "", "parentId": "110" }, { "areaCode": "983", "areaName": "怀远县", "areaPinYin": "", "parentId": "110" }, { "areaCode": "984", "areaName": "淮上区", "areaPinYin": "", "parentId": "110" }, { "areaCode": "985", "areaName": "禹会区", "areaPinYin": "", "parentId": "110" }, { "areaCode": "986", "areaName": "蚌山区", "areaPinYin": "", "parentId": "110" }, { "areaCode": "987", "areaName": "龙子湖区", "areaPinYin": "", "parentId": "110" }, { "areaCode": "988", "areaName": "狮子山区", "areaPinYin": "", "parentId": "111" }, { "areaCode": "989", "areaName": "郊区", "areaPinYin": "", "parentId": "111" }, { "areaCode": "990", "areaName": "铜官山区", "areaPinYin": "", "parentId": "111" }, { "areaCode": "991", "areaName": "铜陵县", "areaPinYin": "", "parentId": "111" }, { "areaCode": "48196", "areaName": "义安区", "areaPinYin": "", "parentId": "111" }, { "areaCode": "992", "areaName": "临泉县", "areaPinYin": "", "parentId": "112" }, { "areaCode": "993", "areaName": "太和县", "areaPinYin": "", "parentId": "112" }, { "areaCode": "994", "areaName": "界首市", "areaPinYin": "", "parentId": "112" }, { "areaCode": "995", "areaName": "经济开发区", "areaPinYin": "", "parentId": "112" }, { "areaCode": "996", "areaName": "阜南县", "areaPinYin": "", "parentId": "112" }, { "areaCode": "997", "areaName": "颍上县", "areaPinYin": "", "parentId": "112" }, { "areaCode": "998", "areaName": "颍东区", "areaPinYin": "", "parentId": "112" }, { "areaCode": "999", "areaName": "颍州区", "areaPinYin": "", "parentId": "112" }, { "areaCode": "1000", "areaName": "颍泉区", "areaPinYin": "", "parentId": "112" }, { "areaCode": "1001", "areaName": "博望区", "areaPinYin": "", "parentId": "113" }, { "areaCode": "1002", "areaName": "含山县", "areaPinYin": "", "parentId": "113" }, { "areaCode": "1003", "areaName": "和县", "areaPinYin": "", "parentId": "113" }, { "areaCode": "1004", "areaName": "当涂县", "areaPinYin": "", "parentId": "113" }, { "areaCode": "1005", "areaName": "花山区", "areaPinYin": "", "parentId": "113" }, { "areaCode": "1006", "areaName": "雨山区", "areaPinYin": "", "parentId": "113" }, { "areaCode": "1007", "areaName": "休宁县", "areaPinYin": "", "parentId": "114" }, { "areaCode": "1008", "areaName": "屯溪区", "areaPinYin": "", "parentId": "114" }, { "areaCode": "1009", "areaName": "徽州区", "areaPinYin": "", "parentId": "114" }, { "areaCode": "1010", "areaName": "歙县", "areaPinYin": "", "parentId": "114" }, { "areaCode": "1011", "areaName": "祁门县", "areaPinYin": "", "parentId": "114" }, { "areaCode": "1012", "areaName": "黄山区", "areaPinYin": "", "parentId": "114" }, { "areaCode": "1013", "areaName": "黟县", "areaPinYin": "", "parentId": "114" }, { "areaCode": "1014", "areaName": "东营区", "areaPinYin": "", "parentId": "115" }, { "areaCode": "1015", "areaName": "利津县", "areaPinYin": "", "parentId": "115" }, { "areaCode": "1016", "areaName": "垦利县", "areaPinYin": "", "parentId": "115" }, { "areaCode": "1017", "areaName": "广饶县", "areaPinYin": "", "parentId": "115" }, { "areaCode": "1018", "areaName": "河口区", "areaPinYin": "", "parentId": "115" }, { "areaCode": "1019", "areaName": "临沭县", "areaPinYin": "", "parentId": "116" }, { "areaCode": "1020", "areaName": "兰山区", "areaPinYin": "", "parentId": "116" }, { "areaCode": "1021", "areaName": "兰陵县", "areaPinYin": "", "parentId": "116" }, { "areaCode": "1022", "areaName": "平邑县", "areaPinYin": "", "parentId": "116" }, { "areaCode": "1023", "areaName": "沂南县", "areaPinYin": "", "parentId": "116" }, { "areaCode": "1024", "areaName": "沂水县", "areaPinYin": "", "parentId": "116" }, { "areaCode": "1025", "areaName": "河东区", "areaPinYin": "", "parentId": "116" }, { "areaCode": "1026", "areaName": "罗庄区", "areaPinYin": "", "parentId": "116" }, { "areaCode": "1027", "areaName": "莒南县", "areaPinYin": "", "parentId": "116" }, { "areaCode": "1028", "areaName": "蒙阴县", "areaPinYin": "", "parentId": "116" }, { "areaCode": "1029", "areaName": "费县", "areaPinYin": "", "parentId": "116" }, { "areaCode": "1030", "areaName": "郯城县", "areaPinYin": "", "parentId": "116" }, { "areaCode": "1031", "areaName": "乳山市", "areaPinYin": "", "parentId": "117" }, { "areaCode": "1032", "areaName": "文登市", "areaPinYin": "", "parentId": "117" }, { "areaCode": "1033", "areaName": "环翠区", "areaPinYin": "", "parentId": "117" }, { "areaCode": "1034", "areaName": "荣成市", "areaPinYin": "", "parentId": "117" }, { "areaCode": "1035", "areaName": "临邑县", "areaPinYin": "", "parentId": "118" }, { "areaCode": "1036", "areaName": "乐陵市", "areaPinYin": "", "parentId": "118" }, { "areaCode": "1037", "areaName": "夏津县", "areaPinYin": "", "parentId": "118" }, { "areaCode": "1038", "areaName": "宁津县", "areaPinYin": "", "parentId": "118" }, { "areaCode": "1039", "areaName": "平原县", "areaPinYin": "", "parentId": "118" }, { "areaCode": "1040", "areaName": "庆云县", "areaPinYin": "", "parentId": "118" }, { "areaCode": "1041", "areaName": "德城区", "areaPinYin": "", "parentId": "118" }, { "areaCode": "1042", "areaName": "武城县", "areaPinYin": "", "parentId": "118" }, { "areaCode": "1043", "areaName": "禹城市", "areaPinYin": "", "parentId": "118" }, { "areaCode": "1044", "areaName": "陵县", "areaPinYin": "", "parentId": "118" }, { "areaCode": "1045", "areaName": "齐河县", "areaPinYin": "", "parentId": "118" }, { "areaCode": "1046", "areaName": "东港区", "areaPinYin": "", "parentId": "119" }, { "areaCode": "1047", "areaName": "五莲县", "areaPinYin": "", "parentId": "119" }, { "areaCode": "1048", "areaName": "岚山区", "areaPinYin": "", "parentId": "119" }, { "areaCode": "1049", "areaName": "新市区", "areaPinYin": "", "parentId": "119" }, { "areaCode": "1050", "areaName": "莒县", "areaPinYin": "", "parentId": "119" }, { "areaCode": "1051", "areaName": "台儿庄区", "areaPinYin": "", "parentId": "120" }, { "areaCode": "1052", "areaName": "山亭区", "areaPinYin": "", "parentId": "120" }, { "areaCode": "1053", "areaName": "峄城区", "areaPinYin": "", "parentId": "120" }, { "areaCode": "1054", "areaName": "市中区", "areaPinYin": "", "parentId": "120" }, { "areaCode": "1055", "areaName": "滕州市", "areaPinYin": "", "parentId": "120" }, { "areaCode": "1056", "areaName": "薛城区", "areaPinYin": "", "parentId": "120" }, { "areaCode": "1057", "areaName": "东平县", "areaPinYin": "", "parentId": "121" }, { "areaCode": "1058", "areaName": "宁阳县", "areaPinYin": "", "parentId": "121" }, { "areaCode": "1059", "areaName": "岱岳区", "areaPinYin": "", "parentId": "121" }, { "areaCode": "1060", "areaName": "新泰市", "areaPinYin": "", "parentId": "121" }, { "areaCode": "1061", "areaName": "泰山区", "areaPinYin": "", "parentId": "121" }, { "areaCode": "1062", "areaName": "肥城市", "areaPinYin": "", "parentId": "121" }, { "areaCode": "1063", "areaName": "历下区", "areaPinYin": "", "parentId": "122" }, { "areaCode": "1064", "areaName": "历城区", "areaPinYin": "", "parentId": "122" }, { "areaCode": "1065", "areaName": "商河县", "areaPinYin": "", "parentId": "122" }, { "areaCode": "1066", "areaName": "天桥区", "areaPinYin": "", "parentId": "122" }, { "areaCode": "1067", "areaName": "市中区", "areaPinYin": "", "parentId": "122" }, { "areaCode": "1068", "areaName": "平阴县", "areaPinYin": "", "parentId": "122" }, { "areaCode": "1069", "areaName": "槐荫区", "areaPinYin": "", "parentId": "122" }, { "areaCode": "1070", "areaName": "济阳县", "areaPinYin": "", "parentId": "122" }, { "areaCode": "1071", "areaName": "章丘市", "areaPinYin": "", "parentId": "122" }, { "areaCode": "1072", "areaName": "长清区", "areaPinYin": "", "parentId": "122" }, { "areaCode": "1073", "areaName": "高新区", "areaPinYin": "", "parentId": "122" }, { "areaCode": "1074", "areaName": "任城区", "areaPinYin": "", "parentId": "123" }, { "areaCode": "1075", "areaName": "兖州市", "areaPinYin": "", "parentId": "123" }, { "areaCode": "1076", "areaName": "嘉祥县", "areaPinYin": "", "parentId": "123" }, { "areaCode": "1077", "areaName": "市中区", "areaPinYin": "", "parentId": "123" }, { "areaCode": "1078", "areaName": "微山县", "areaPinYin": "", "parentId": "123" }, { "areaCode": "1079", "areaName": "曲阜市", "areaPinYin": "", "parentId": "123" }, { "areaCode": "1080", "areaName": "梁山县", "areaPinYin": "", "parentId": "123" }, { "areaCode": "1081", "areaName": "汶上县", "areaPinYin": "", "parentId": "123" }, { "areaCode": "1082", "areaName": "泗水县", "areaPinYin": "", "parentId": "123" }, { "areaCode": "1083", "areaName": "邹城市", "areaPinYin": "", "parentId": "123" }, { "areaCode": "1084", "areaName": "金乡县", "areaPinYin": "", "parentId": "123" }, { "areaCode": "1085", "areaName": "高新区", "areaPinYin": "", "parentId": "123" }, { "areaCode": "1086", "areaName": "鱼台县", "areaPinYin": "", "parentId": "123" }, { "areaCode": "1087", "areaName": "临淄区", "areaPinYin": "", "parentId": "124" }, { "areaCode": "1088", "areaName": "博山区", "areaPinYin": "", "parentId": "124" }, { "areaCode": "1089", "areaName": "周村区", "areaPinYin": "", "parentId": "124" }, { "areaCode": "1090", "areaName": "张店区", "areaPinYin": "", "parentId": "124" }, { "areaCode": "1091", "areaName": "桓台县", "areaPinYin": "", "parentId": "124" }, { "areaCode": "1092", "areaName": "沂源县", "areaPinYin": "", "parentId": "124" }, { "areaCode": "1093", "areaName": "淄川区", "areaPinYin": "", "parentId": "124" }, { "areaCode": "1094", "areaName": "高青县", "areaPinYin": "", "parentId": "124" }, { "areaCode": "1095", "areaName": "北海新区", "areaPinYin": "", "parentId": "125" }, { "areaCode": "1096", "areaName": "博兴县", "areaPinYin": "", "parentId": "125" }, { "areaCode": "1097", "areaName": "惠民县", "areaPinYin": "", "parentId": "125" }, { "areaCode": "1098", "areaName": "无棣县", "areaPinYin": "", "parentId": "125" }, { "areaCode": "1099", "areaName": "沾化县", "areaPinYin": "", "parentId": "125" }, { "areaCode": "1100", "areaName": "滨城区", "areaPinYin": "", "parentId": "125" }, { "areaCode": "1101", "areaName": "邹平县", "areaPinYin": "", "parentId": "125" }, { "areaCode": "1102", "areaName": "阳信县", "areaPinYin": "", "parentId": "125" }, { "areaCode": "1103", "areaName": "临朐县", "areaPinYin": "", "parentId": "126" }, { "areaCode": "1104", "areaName": "坊子区", "areaPinYin": "", "parentId": "126" }, { "areaCode": "1105", "areaName": "奎文区", "areaPinYin": "", "parentId": "126" }, { "areaCode": "1106", "areaName": "安丘市", "areaPinYin": "", "parentId": "126" }, { "areaCode": "1107", "areaName": "寒亭区", "areaPinYin": "", "parentId": "126" }, { "areaCode": "1108", "areaName": "寿光市", "areaPinYin": "", "parentId": "126" }, { "areaCode": "1109", "areaName": "昌乐县", "areaPinYin": "", "parentId": "126" }, { "areaCode": "1110", "areaName": "昌邑市", "areaPinYin": "", "parentId": "126" }, { "areaCode": "1111", "areaName": "潍城区", "areaPinYin": "", "parentId": "126" }, { "areaCode": "1112", "areaName": "诸城市", "areaPinYin": "", "parentId": "126" }, { "areaCode": "1113", "areaName": "青州市", "areaPinYin": "", "parentId": "126" }, { "areaCode": "1114", "areaName": "高密市", "areaPinYin": "", "parentId": "126" }, { "areaCode": "1115", "areaName": "高新区", "areaPinYin": "", "parentId": "126" }, { "areaCode": "1116", "areaName": "开发区", "areaPinYin": "", "parentId": "127" }, { "areaCode": "1117", "areaName": "招远市", "areaPinYin": "", "parentId": "127" }, { "areaCode": "1118", "areaName": "栖霞市", "areaPinYin": "", "parentId": "127" }, { "areaCode": "1119", "areaName": "海阳市", "areaPinYin": "", "parentId": "127" }, { "areaCode": "1120", "areaName": "牟平区", "areaPinYin": "", "parentId": "127" }, { "areaCode": "1121", "areaName": "福山区", "areaPinYin": "", "parentId": "127" }, { "areaCode": "1122", "areaName": "芝罘区", "areaPinYin": "", "parentId": "127" }, { "areaCode": "1123", "areaName": "莱山区", "areaPinYin": "", "parentId": "127" }, { "areaCode": "1124", "areaName": "莱州市", "areaPinYin": "", "parentId": "127" }, { "areaCode": "1125", "areaName": "莱阳市", "areaPinYin": "", "parentId": "127" }, { "areaCode": "1126", "areaName": "蓬莱市", "areaPinYin": "", "parentId": "127" }, { "areaCode": "1127", "areaName": "长岛县", "areaPinYin": "", "parentId": "127" }, { "areaCode": "1128", "areaName": "龙口市", "areaPinYin": "", "parentId": "127" }, { "areaCode": "1129", "areaName": "东昌府区", "areaPinYin": "", "parentId": "128" }, { "areaCode": "1130", "areaName": "东阿县", "areaPinYin": "", "parentId": "128" }, { "areaCode": "1131", "areaName": "临清市", "areaPinYin": "", "parentId": "128" }, { "areaCode": "1132", "areaName": "冠县", "areaPinYin": "", "parentId": "128" }, { "areaCode": "1133", "areaName": "茌平县", "areaPinYin": "", "parentId": "128" }, { "areaCode": "1134", "areaName": "莘县", "areaPinYin": "", "parentId": "128" }, { "areaCode": "1135", "areaName": "阳谷县", "areaPinYin": "", "parentId": "128" }, { "areaCode": "1136", "areaName": "高唐县", "areaPinYin": "", "parentId": "128" }, { "areaCode": "1137", "areaName": "莱城区", "areaPinYin": "", "parentId": "129" }, { "areaCode": "1138", "areaName": "钢城区", "areaPinYin": "", "parentId": "129" }, { "areaCode": "1139", "areaName": "东明县", "areaPinYin": "", "parentId": "130" }, { "areaCode": "1140", "areaName": "单县", "areaPinYin": "", "parentId": "130" }, { "areaCode": "1141", "areaName": "定陶县", "areaPinYin": "", "parentId": "130" }, { "areaCode": "1142", "areaName": "巨野县", "areaPinYin": "", "parentId": "130" }, { "areaCode": "1143", "areaName": "成武县", "areaPinYin": "", "parentId": "130" }, { "areaCode": "1144", "areaName": "曹县", "areaPinYin": "", "parentId": "130" }, { "areaCode": "1145", "areaName": "牡丹区", "areaPinYin": "", "parentId": "130" }, { "areaCode": "1146", "areaName": "郓城县", "areaPinYin": "", "parentId": "130" }, { "areaCode": "1147", "areaName": "鄄城县", "areaPinYin": "", "parentId": "130" }, { "areaCode": "1148", "areaName": "即墨市", "areaPinYin": "", "parentId": "131" }, { "areaCode": "1149", "areaName": "四方区", "areaPinYin": "", "parentId": "131" }, { "areaCode": "1150", "areaName": "城阳区", "areaPinYin": "", "parentId": "131" }, { "areaCode": "1151", "areaName": "崂山区", "areaPinYin": "", "parentId": "131" }, { "areaCode": "1152", "areaName": "市北区", "areaPinYin": "", "parentId": "131" }, { "areaCode": "1153", "areaName": "市南区", "areaPinYin": "", "parentId": "131" }, { "areaCode": "1154", "areaName": "平度市", "areaPinYin": "", "parentId": "131" }, { "areaCode": "1155", "areaName": "李沧区", "areaPinYin": "", "parentId": "131" }, { "areaCode": "1156", "areaName": "胶州市", "areaPinYin": "", "parentId": "131" }, { "areaCode": "1157", "areaName": "莱西市", "areaPinYin": "", "parentId": "131" }, { "areaCode": "1158", "areaName": "黄岛区", "areaPinYin": "", "parentId": "131" }, { "areaCode": "1159", "areaName": "乡宁县", "areaPinYin": "", "parentId": "132" }, { "areaCode": "1160", "areaName": "侯马市", "areaPinYin": "", "parentId": "132" }, { "areaCode": "1161", "areaName": "古县", "areaPinYin": "", "parentId": "132" }, { "areaCode": "1162", "areaName": "吉县", "areaPinYin": "", "parentId": "132" }, { "areaCode": "1163", "areaName": "大宁县", "areaPinYin": "", "parentId": "132" }, { "areaCode": "1164", "areaName": "安泽县", "areaPinYin": "", "parentId": "132" }, { "areaCode": "1165", "areaName": "尧都区", "areaPinYin": "", "parentId": "132" }, { "areaCode": "1166", "areaName": "曲沃县", "areaPinYin": "", "parentId": "132" }, { "areaCode": "1167", "areaName": "永和县", "areaPinYin": "", "parentId": "132" }, { "areaCode": "1168", "areaName": "汾西县", "areaPinYin": "", "parentId": "132" }, { "areaCode": "1169", "areaName": "洪洞县", "areaPinYin": "", "parentId": "132" }, { "areaCode": "1170", "areaName": "浮山县", "areaPinYin": "", "parentId": "132" }, { "areaCode": "1171", "areaName": "翼城县", "areaPinYin": "", "parentId": "132" }, { "areaCode": "1172", "areaName": "蒲县", "areaPinYin": "", "parentId": "132" }, { "areaCode": "1173", "areaName": "襄汾县", "areaPinYin": "", "parentId": "132" }, { "areaCode": "1174", "areaName": "隰县", "areaPinYin": "", "parentId": "132" }, { "areaCode": "1175", "areaName": "霍州市", "areaPinYin": "", "parentId": "132" }, { "areaCode": "1176", "areaName": "中阳县", "areaPinYin": "", "parentId": "133" }, { "areaCode": "1177", "areaName": "临县", "areaPinYin": "", "parentId": "133" }, { "areaCode": "1178", "areaName": "交口县", "areaPinYin": "", "parentId": "133" }, { "areaCode": "1179", "areaName": "交城县", "areaPinYin": "", "parentId": "133" }, { "areaCode": "1180", "areaName": "兴县", "areaPinYin": "", "parentId": "133" }, { "areaCode": "1181", "areaName": "孝义市", "areaPinYin": "", "parentId": "133" }, { "areaCode": "1182", "areaName": "岚县", "areaPinYin": "", "parentId": "133" }, { "areaCode": "1183", "areaName": "文水县", "areaPinYin": "", "parentId": "133" }, { "areaCode": "1184", "areaName": "方山县", "areaPinYin": "", "parentId": "133" }, { "areaCode": "1185", "areaName": "柳林县", "areaPinYin": "", "parentId": "133" }, { "areaCode": "1186", "areaName": "汾阳市", "areaPinYin": "", "parentId": "133" }, { "areaCode": "1187", "areaName": "石楼县", "areaPinYin": "", "parentId": "133" }, { "areaCode": "1188", "areaName": "离石区", "areaPinYin": "", "parentId": "133" }, { "areaCode": "1189", "areaName": "南郊区", "areaPinYin": "", "parentId": "134" }, { "areaCode": "1190", "areaName": "城区", "areaPinYin": "", "parentId": "134" }, { "areaCode": "1191", "areaName": "大同县", "areaPinYin": "", "parentId": "134" }, { "areaCode": "1192", "areaName": "天镇县", "areaPinYin": "", "parentId": "134" }, { "areaCode": "1193", "areaName": "左云县", "areaPinYin": "", "parentId": "134" }, { "areaCode": "1194", "areaName": "广灵县", "areaPinYin": "", "parentId": "134" }, { "areaCode": "1195", "areaName": "新荣区", "areaPinYin": "", "parentId": "134" }, { "areaCode": "1196", "areaName": "浑源县", "areaPinYin": "", "parentId": "134" }, { "areaCode": "1197", "areaName": "灵丘县", "areaPinYin": "", "parentId": "134" }, { "areaCode": "1198", "areaName": "矿区", "areaPinYin": "", "parentId": "134" }, { "areaCode": "1199", "areaName": "阳高县", "areaPinYin": "", "parentId": "134" }, { "areaCode": "1200", "areaName": "万柏林区", "areaPinYin": "", "parentId": "135" }, { "areaCode": "1201", "areaName": "古交市", "areaPinYin": "", "parentId": "135" }, { "areaCode": "1202", "areaName": "娄烦县", "areaPinYin": "", "parentId": "135" }, { "areaCode": "1203", "areaName": "小店区", "areaPinYin": "", "parentId": "135" }, { "areaCode": "1204", "areaName": "尖草坪区", "areaPinYin": "", "parentId": "135" }, { "areaCode": "1205", "areaName": "晋源区", "areaPinYin": "", "parentId": "135" }, { "areaCode": "1206", "areaName": "杏花岭区", "areaPinYin": "", "parentId": "135" }, { "areaCode": "1207", "areaName": "清徐县", "areaPinYin": "", "parentId": "135" }, { "areaCode": "1208", "areaName": "迎泽区", "areaPinYin": "", "parentId": "135" }, { "areaCode": "1209", "areaName": "阳曲县", "areaPinYin": "", "parentId": "135" }, { "areaCode": "1210", "areaName": "五台县", "areaPinYin": "", "parentId": "136" }, { "areaCode": "1211", "areaName": "五寨县", "areaPinYin": "", "parentId": "136" }, { "areaCode": "1212", "areaName": "代县", "areaPinYin": "", "parentId": "136" }, { "areaCode": "1213", "areaName": "保德县", "areaPinYin": "", "parentId": "136" }, { "areaCode": "1214", "areaName": "偏关县", "areaPinYin": "", "parentId": "136" }, { "areaCode": "1215", "areaName": "原平市", "areaPinYin": "", "parentId": "136" }, { "areaCode": "1216", "areaName": "宁武县", "areaPinYin": "", "parentId": "136" }, { "areaCode": "1217", "areaName": "定襄县", "areaPinYin": "", "parentId": "136" }, { "areaCode": "1218", "areaName": "岢岚县", "areaPinYin": "", "parentId": "136" }, { "areaCode": "1219", "areaName": "忻府区", "areaPinYin": "", "parentId": "136" }, { "areaCode": "1220", "areaName": "河曲县", "areaPinYin": "", "parentId": "136" }, { "areaCode": "1221", "areaName": "神池县", "areaPinYin": "", "parentId": "136" }, { "areaCode": "1222", "areaName": "繁峙县", "areaPinYin": "", "parentId": "136" }, { "areaCode": "1223", "areaName": "静乐县", "areaPinYin": "", "parentId": "136" }, { "areaCode": "1224", "areaName": "介休市", "areaPinYin": "", "parentId": "137" }, { "areaCode": "1225", "areaName": "和顺县", "areaPinYin": "", "parentId": "137" }, { "areaCode": "1226", "areaName": "太谷县", "areaPinYin": "", "parentId": "137" }, { "areaCode": "1227", "areaName": "寿阳县", "areaPinYin": "", "parentId": "137" }, { "areaCode": "1228", "areaName": "左权县", "areaPinYin": "", "parentId": "137" }, { "areaCode": "1229", "areaName": "平遥县", "areaPinYin": "", "parentId": "137" }, { "areaCode": "1230", "areaName": "昔阳县", "areaPinYin": "", "parentId": "137" }, { "areaCode": "1231", "areaName": "榆次区", "areaPinYin": "", "parentId": "137" }, { "areaCode": "1232", "areaName": "榆社县", "areaPinYin": "", "parentId": "137" }, { "areaCode": "1233", "areaName": "灵石县", "areaPinYin": "", "parentId": "137" }, { "areaCode": "1234", "areaName": "祁县", "areaPinYin": "", "parentId": "137" }, { "areaCode": "1235", "areaName": "城区", "areaPinYin": "", "parentId": "138" }, { "areaCode": "1236", "areaName": "沁水县", "areaPinYin": "", "parentId": "138" }, { "areaCode": "1237", "areaName": "泽州县", "areaPinYin": "", "parentId": "138" }, { "areaCode": "1238", "areaName": "阳城县", "areaPinYin": "", "parentId": "138" }, { "areaCode": "1239", "areaName": "陵川县", "areaPinYin": "", "parentId": "138" }, { "areaCode": "1240", "areaName": "高平市", "areaPinYin": "", "parentId": "138" }, { "areaCode": "1241", "areaName": "右玉县", "areaPinYin": "", "parentId": "139" }, { "areaCode": "1242", "areaName": "山阴县", "areaPinYin": "", "parentId": "139" }, { "areaCode": "1243", "areaName": "平鲁区", "areaPinYin": "", "parentId": "139" }, { "areaCode": "1244", "areaName": "应县", "areaPinYin": "", "parentId": "139" }, { "areaCode": "1245", "areaName": "怀仁县", "areaPinYin": "", "parentId": "139" }, { "areaCode": "1246", "areaName": "朔城区", "areaPinYin": "", "parentId": "139" }, { "areaCode": "1247", "areaName": "万荣县", "areaPinYin": "", "parentId": "140" }, { "areaCode": "1248", "areaName": "临猗县", "areaPinYin": "", "parentId": "140" }, { "areaCode": "1249", "areaName": "垣曲县", "areaPinYin": "", "parentId": "140" }, { "areaCode": "1250", "areaName": "夏县", "areaPinYin": "", "parentId": "140" }, { "areaCode": "1251", "areaName": "平陆县", "areaPinYin": "", "parentId": "140" }, { "areaCode": "1252", "areaName": "新绛县", "areaPinYin": "", "parentId": "140" }, { "areaCode": "1253", "areaName": "永济市", "areaPinYin": "", "parentId": "140" }, { "areaCode": "1254", "areaName": "河津市", "areaPinYin": "", "parentId": "140" }, { "areaCode": "1255", "areaName": "盐湖区", "areaPinYin": "", "parentId": "140" }, { "areaCode": "1256", "areaName": "稷山县", "areaPinYin": "", "parentId": "140" }, { "areaCode": "1257", "areaName": "绛县", "areaPinYin": "", "parentId": "140" }, { "areaCode": "1258", "areaName": "芮城县", "areaPinYin": "", "parentId": "140" }, { "areaCode": "1259", "areaName": "闻喜县", "areaPinYin": "", "parentId": "140" }, { "areaCode": "1260", "areaName": "城区", "areaPinYin": "", "parentId": "141" }, { "areaCode": "1261", "areaName": "壶关县", "areaPinYin": "", "parentId": "141" }, { "areaCode": "1262", "areaName": "屯留县", "areaPinYin": "", "parentId": "141" }, { "areaCode": "1263", "areaName": "平顺县", "areaPinYin": "", "parentId": "141" }, { "areaCode": "1264", "areaName": "武乡县", "areaPinYin": "", "parentId": "141" }, { "areaCode": "1265", "areaName": "沁县", "areaPinYin": "", "parentId": "141" }, { "areaCode": "1266", "areaName": "沁源县", "areaPinYin": "", "parentId": "141" }, { "areaCode": "1267", "areaName": "潞城市", "areaPinYin": "", "parentId": "141" }, { "areaCode": "1268", "areaName": "襄垣县", "areaPinYin": "", "parentId": "141" }, { "areaCode": "1269", "areaName": "郊区", "areaPinYin": "", "parentId": "141" }, { "areaCode": "1270", "areaName": "长子县", "areaPinYin": "", "parentId": "141" }, { "areaCode": "1271", "areaName": "长治县", "areaPinYin": "", "parentId": "141" }, { "areaCode": "1272", "areaName": "黎城县", "areaPinYin": "", "parentId": "141" }, { "areaCode": "1273", "areaName": "城区", "areaPinYin": "", "parentId": "142" }, { "areaCode": "1274", "areaName": "平定县", "areaPinYin": "", "parentId": "142" }, { "areaCode": "1275", "areaName": "盂县", "areaPinYin": "", "parentId": "142" }, { "areaCode": "1276", "areaName": "矿区", "areaPinYin": "", "parentId": "142" }, { "areaCode": "1277", "areaName": "郊区", "areaPinYin": "", "parentId": "142" }, { "areaCode": "1463", "areaName": "合浦县", "areaPinYin": "", "parentId": "164" }, { "areaCode": "1464", "areaName": "海城区", "areaPinYin": "", "parentId": "164" }, { "areaCode": "1465", "areaName": "铁山港区", "areaPinYin": "", "parentId": "164" }, { "areaCode": "1466", "areaName": "银海区", "areaPinYin": "", "parentId": "164" }, { "areaCode": "1467", "areaName": "上林县", "areaPinYin": "", "parentId": "165" }, { "areaCode": "1468", "areaName": "兴宁区", "areaPinYin": "", "parentId": "165" }, { "areaCode": "1469", "areaName": "宾阳县", "areaPinYin": "", "parentId": "165" }, { "areaCode": "1470", "areaName": "横县", "areaPinYin": "", "parentId": "165" }, { "areaCode": "1471", "areaName": "武鸣县", "areaPinYin": "", "parentId": "165" }, { "areaCode": "1472", "areaName": "江南区", "areaPinYin": "", "parentId": "165" }, { "areaCode": "1473", "areaName": "良庆区", "areaPinYin": "", "parentId": "165" }, { "areaCode": "1474", "areaName": "西乡塘区", "areaPinYin": "", "parentId": "165" }, { "areaCode": "1475", "areaName": "邕宁区", "areaPinYin": "", "parentId": "165" }, { "areaCode": "1476", "areaName": "隆安县", "areaPinYin": "", "parentId": "165" }, { "areaCode": "1477", "areaName": "青秀区", "areaPinYin": "", "parentId": "165" }, { "areaCode": "1478", "areaName": "马山县", "areaPinYin": "", "parentId": "165" }, { "areaCode": "1479", "areaName": "凭祥市", "areaPinYin": "", "parentId": "166" }, { "areaCode": "1480", "areaName": "大新县", "areaPinYin": "", "parentId": "166" }, { "areaCode": "1481", "areaName": "天等县", "areaPinYin": "", "parentId": "166" }, { "areaCode": "1482", "areaName": "宁明县", "areaPinYin": "", "parentId": "166" }, { "areaCode": "1483", "areaName": "扶绥县", "areaPinYin": "", "parentId": "166" }, { "areaCode": "1484", "areaName": "江州区", "areaPinYin": "", "parentId": "166" }, { "areaCode": "1485", "areaName": "龙州县", "areaPinYin": "", "parentId": "166" }, { "areaCode": "1486", "areaName": "兴宾区", "areaPinYin": "", "parentId": "167" }, { "areaCode": "1487", "areaName": "合山市", "areaPinYin": "", "parentId": "167" }, { "areaCode": "1488", "areaName": "忻城县", "areaPinYin": "", "parentId": "167" }, { "areaCode": "1489", "areaName": "武宣县", "areaPinYin": "", "parentId": "167" }, { "areaCode": "1490", "areaName": "象州县", "areaPinYin": "", "parentId": "167" }, { "areaCode": "1491", "areaName": "金秀县", "areaPinYin": "", "parentId": "167" }, { "areaCode": "1492", "areaName": "三江县", "areaPinYin": "", "parentId": "168" }, { "areaCode": "1493", "areaName": "城中区", "areaPinYin": "", "parentId": "168" }, { "areaCode": "1494", "areaName": "柳北区", "areaPinYin": "", "parentId": "168" }, { "areaCode": "1495", "areaName": "柳南区", "areaPinYin": "", "parentId": "168" }, { "areaCode": "1496", "areaName": "柳城县", "areaPinYin": "", "parentId": "168" }, { "areaCode": "1497", "areaName": "柳江县", "areaPinYin": "", "parentId": "168" }, { "areaCode": "1498", "areaName": "融安县", "areaPinYin": "", "parentId": "168" }, { "areaCode": "1499", "areaName": "融水县", "areaPinYin": "", "parentId": "168" }, { "areaCode": "1500", "areaName": "鱼峰区", "areaPinYin": "", "parentId": "168" }, { "areaCode": "1501", "areaName": "鹿寨县", "areaPinYin": "", "parentId": "168" }, { "areaCode": "1502", "areaName": "七星区", "areaPinYin": "", "parentId": "169" }, { "areaCode": "1503", "areaName": "临桂县", "areaPinYin": "", "parentId": "169" }, { "areaCode": "1504", "areaName": "全州县", "areaPinYin": "", "parentId": "169" }, { "areaCode": "1505", "areaName": "兴安县", "areaPinYin": "", "parentId": "169" }, { "areaCode": "1506", "areaName": "叠彩区", "areaPinYin": "", "parentId": "169" }, { "areaCode": "1507", "areaName": "平乐县", "areaPinYin": "", "parentId": "169" }, { "areaCode": "1508", "areaName": "恭城县", "areaPinYin": "", "parentId": "169" }, { "areaCode": "1509", "areaName": "永福县", "areaPinYin": "", "parentId": "169" }, { "areaCode": "1510", "areaName": "灌阳县", "areaPinYin": "", "parentId": "169" }, { "areaCode": "1511", "areaName": "灵川县", "areaPinYin": "", "parentId": "169" }, { "areaCode": "1512", "areaName": "秀峰区", "areaPinYin": "", "parentId": "169" }, { "areaCode": "1513", "areaName": "荔浦县", "areaPinYin": "", "parentId": "169" }, { "areaCode": "1514", "areaName": "象山区", "areaPinYin": "", "parentId": "169" }, { "areaCode": "1515", "areaName": "资源县", "areaPinYin": "", "parentId": "169" }, { "areaCode": "1516", "areaName": "阳朔县", "areaPinYin": "", "parentId": "169" }, { "areaCode": "1517", "areaName": "雁山区", "areaPinYin": "", "parentId": "169" }, { "areaCode": "1518", "areaName": "龙胜县", "areaPinYin": "", "parentId": "169" }, { "areaCode": "1519", "areaName": "万秀区", "areaPinYin": "", "parentId": "170" }, { "areaCode": "1520", "areaName": "岑溪市", "areaPinYin": "", "parentId": "170" }, { "areaCode": "1521", "areaName": "苍梧县", "areaPinYin": "", "parentId": "170" }, { "areaCode": "1522", "areaName": "蒙山县", "areaPinYin": "", "parentId": "170" }, { "areaCode": "1523", "areaName": "藤县", "areaPinYin": "", "parentId": "170" }, { "areaCode": "1524", "areaName": "蝶山区", "areaPinYin": "", "parentId": "170" }, { "areaCode": "1525", "areaName": "长洲区", "areaPinYin": "", "parentId": "170" }, { "areaCode": "1526", "areaName": "东兰县", "areaPinYin": "", "parentId": "171" }, { "areaCode": "1527", "areaName": "凤山县", "areaPinYin": "", "parentId": "171" }, { "areaCode": "1528", "areaName": "南丹县", "areaPinYin": "", "parentId": "171" }, { "areaCode": "1529", "areaName": "大化县", "areaPinYin": "", "parentId": "171" }, { "areaCode": "1530", "areaName": "天峨县", "areaPinYin": "", "parentId": "171" }, { "areaCode": "1531", "areaName": "宜州市", "areaPinYin": "", "parentId": "171" }, { "areaCode": "1532", "areaName": "巴马县", "areaPinYin": "", "parentId": "171" }, { "areaCode": "1533", "areaName": "环江县", "areaPinYin": "", "parentId": "171" }, { "areaCode": "1534", "areaName": "罗城县", "areaPinYin": "", "parentId": "171" }, { "areaCode": "1535", "areaName": "都安县", "areaPinYin": "", "parentId": "171" }, { "areaCode": "1536", "areaName": "金城江区", "areaPinYin": "", "parentId": "171" }, { "areaCode": "1537", "areaName": "兴业县", "areaPinYin": "", "parentId": "172" }, { "areaCode": "1538", "areaName": "北流市", "areaPinYin": "", "parentId": "172" }, { "areaCode": "1539", "areaName": "博白县", "areaPinYin": "", "parentId": "172" }, { "areaCode": "1540", "areaName": "容县", "areaPinYin": "", "parentId": "172" }, { "areaCode": "1541", "areaName": "玉州区", "areaPinYin": "", "parentId": "172" }, { "areaCode": "1542", "areaName": "陆川县", "areaPinYin": "", "parentId": "172" }, { "areaCode": "1543", "areaName": "乐业县", "areaPinYin": "", "parentId": "173" }, { "areaCode": "1544", "areaName": "凌云县", "areaPinYin": "", "parentId": "173" }, { "areaCode": "1545", "areaName": "右江区", "areaPinYin": "", "parentId": "173" }, { "areaCode": "1546", "areaName": "平果县", "areaPinYin": "", "parentId": "173" }, { "areaCode": "1547", "areaName": "德保县", "areaPinYin": "", "parentId": "173" }, { "areaCode": "1548", "areaName": "田东县", "areaPinYin": "", "parentId": "173" }, { "areaCode": "1549", "areaName": "田林县", "areaPinYin": "", "parentId": "173" }, { "areaCode": "1550", "areaName": "田阳县", "areaPinYin": "", "parentId": "173" }, { "areaCode": "1551", "areaName": "西林县", "areaPinYin": "", "parentId": "173" }, { "areaCode": "1552", "areaName": "那坡县", "areaPinYin": "", "parentId": "173" }, { "areaCode": "1553", "areaName": "隆林县", "areaPinYin": "", "parentId": "173" }, { "areaCode": "1554", "areaName": "靖西县", "areaPinYin": "", "parentId": "173" }, { "areaCode": "1555", "areaName": "平南县", "areaPinYin": "", "parentId": "174" }, { "areaCode": "1556", "areaName": "桂平市", "areaPinYin": "", "parentId": "174" }, { "areaCode": "1557", "areaName": "港北区", "areaPinYin": "", "parentId": "174" }, { "areaCode": "1558", "areaName": "港南区", "areaPinYin": "", "parentId": "174" }, { "areaCode": "1559", "areaName": "覃塘区", "areaPinYin": "", "parentId": "174" }, { "areaCode": "1560", "areaName": "八步区", "areaPinYin": "", "parentId": "175" }, { "areaCode": "1561", "areaName": "富川县", "areaPinYin": "", "parentId": "175" }, { "areaCode": "1562", "areaName": "平桂管理区", "areaPinYin": "", "parentId": "175" }, { "areaCode": "1563", "areaName": "昭平县", "areaPinYin": "", "parentId": "175" }, { "areaCode": "1564", "areaName": "钟山县", "areaPinYin": "", "parentId": "175" }, { "areaCode": "1565", "areaName": "浦北县", "areaPinYin": "", "parentId": "176" }, { "areaCode": "1566", "areaName": "灵山县", "areaPinYin": "", "parentId": "176" }, { "areaCode": "1567", "areaName": "钦北区", "areaPinYin": "", "parentId": "176" }, { "areaCode": "1568", "areaName": "钦南区", "areaPinYin": "", "parentId": "176" }, { "areaCode": "1569", "areaName": "上思县", "areaPinYin": "", "parentId": "177" }, { "areaCode": "1570", "areaName": "东兴市", "areaPinYin": "", "parentId": "177" }, { "areaCode": "1571", "areaName": "港口区", "areaPinYin": "", "parentId": "177" }, { "areaCode": "1572", "areaName": "防城区", "areaPinYin": "", "parentId": "177" }, { "areaCode": "1573", "areaName": "乌鲁木齐县", "areaPinYin": "", "parentId": "178" }, { "areaCode": "1574", "areaName": "天山区", "areaPinYin": "", "parentId": "178" }, { "areaCode": "1575", "areaName": "头屯河区", "areaPinYin": "", "parentId": "178" }, { "areaCode": "1576", "areaName": "新市区", "areaPinYin": "", "parentId": "178" }, { "areaCode": "1577", "areaName": "水磨沟区", "areaPinYin": "", "parentId": "178" }, { "areaCode": "1578", "areaName": "沙依巴克区", "areaPinYin": "", "parentId": "178" }, { "areaCode": "1579", "areaName": "米东区", "areaPinYin": "", "parentId": "178" }, { "areaCode": "1580", "areaName": "达坂城区", "areaPinYin": "", "parentId": "178" }, { "areaCode": "1581", "areaName": "五家渠市", "areaPinYin": "", "parentId": "179" }, { "areaCode": "1582", "areaName": "伊宁县", "areaPinYin": "", "parentId": "180" }, { "areaCode": "1583", "areaName": "伊宁市", "areaPinYin": "", "parentId": "180" }, { "areaCode": "1584", "areaName": "奎屯市", "areaPinYin": "", "parentId": "180" }, { "areaCode": "1585", "areaName": "察布查尔县", "areaPinYin": "", "parentId": "180" }, { "areaCode": "1586", "areaName": "尼勒克县", "areaPinYin": "", "parentId": "180" }, { "areaCode": "1587", "areaName": "巩留县", "areaPinYin": "", "parentId": "180" }, { "areaCode": "1588", "areaName": "新源县", "areaPinYin": "", "parentId": "180" }, { "areaCode": "1589", "areaName": "昭苏县", "areaPinYin": "", "parentId": "180" }, { "areaCode": "1590", "areaName": "特克斯县", "areaPinYin": "", "parentId": "180" }, { "areaCode": "1591", "areaName": "霍城县", "areaPinYin": "", "parentId": "180" }, { "areaCode": "1592", "areaName": "乌恰县", "areaPinYin": "", "parentId": "181" }, { "areaCode": "1593", "areaName": "阿克陶县", "areaPinYin": "", "parentId": "181" }, { "areaCode": "1594", "areaName": "阿合奇县", "areaPinYin": "", "parentId": "181" }, { "areaCode": "1595", "areaName": "阿图什市", "areaPinYin": "", "parentId": "181" }, { "areaCode": "1596", "areaName": "乌尔禾区", "areaPinYin": "", "parentId": "182" }, { "areaCode": "1597", "areaName": "克拉玛依区", "areaPinYin": "", "parentId": "182" }, { "areaCode": "1598", "areaName": "独山子区", "areaPinYin": "", "parentId": "182" }, { "areaCode": "1599", "areaName": "白碱滩区", "areaPinYin": "", "parentId": "182" }, { "areaCode": "1600", "areaName": "博乐市", "areaPinYin": "", "parentId": "183" }, { "areaCode": "1601", "areaName": "温泉县", "areaPinYin": "", "parentId": "183" }, { "areaCode": "1602", "areaName": "精河县", "areaPinYin": "", "parentId": "183" }, { "areaCode": "1603", "areaName": "阿拉山口市", "areaPinYin": "", "parentId": "183" }, { "areaCode": "1604", "areaName": "吐鲁番市", "areaPinYin": "", "parentId": "184" }, { "areaCode": "1605", "areaName": "托克逊县", "areaPinYin": "", "parentId": "184" }, { "areaCode": "1606", "areaName": "鄯善县", "areaPinYin": "", "parentId": "184" }, { "areaCode": "1607", "areaName": "于田县", "areaPinYin": "", "parentId": "185" }, { "areaCode": "1608", "areaName": "和田县", "areaPinYin": "", "parentId": "185" }, { "areaCode": "1609", "areaName": "和田市", "areaPinYin": "", "parentId": "185" }, { "areaCode": "1610", "areaName": "墨玉县", "areaPinYin": "", "parentId": "185" }, { "areaCode": "1611", "areaName": "民丰县", "areaPinYin": "", "parentId": "185" }, { "areaCode": "1612", "areaName": "洛浦县", "areaPinYin": "", "parentId": "185" }, { "areaCode": "1613", "areaName": "皮山县", "areaPinYin": "", "parentId": "185" }, { "areaCode": "1614", "areaName": "策勒县", "areaPinYin": "", "parentId": "185" }, { "areaCode": "1615", "areaName": "伊吾县", "areaPinYin": "", "parentId": "186" }, { "areaCode": "1616", "areaName": "哈密市", "areaPinYin": "", "parentId": "186" }, { "areaCode": "1617", "areaName": "巴里坤县", "areaPinYin": "", "parentId": "186" }, { "areaCode": "1618", "areaName": "伽师县", "areaPinYin": "", "parentId": "187" }, { "areaCode": "1619", "areaName": "叶城县", "areaPinYin": "", "parentId": "187" }, { "areaCode": "1620", "areaName": "喀什市", "areaPinYin": "", "parentId": "187" }, { "areaCode": "1621", "areaName": "塔什库尔干县", "areaPinYin": "", "parentId": "187" }, { "areaCode": "1622", "areaName": "岳普湖县", "areaPinYin": "", "parentId": "187" }, { "areaCode": "1623", "areaName": "巴楚县", "areaPinYin": "", "parentId": "187" }, { "areaCode": "1624", "areaName": "泽普县", "areaPinYin": "", "parentId": "187" }, { "areaCode": "1625", "areaName": "疏勒县", "areaPinYin": "", "parentId": "187" }, { "areaCode": "1626", "areaName": "疏附县", "areaPinYin": "", "parentId": "187" }, { "areaCode": "1627", "areaName": "英吉沙县", "areaPinYin": "", "parentId": "187" }, { "areaCode": "1628", "areaName": "莎车县", "areaPinYin": "", "parentId": "187" }, { "areaCode": "1629", "areaName": "麦盖提县", "areaPinYin": "", "parentId": "187" }, { "areaCode": "1630", "areaName": "图木舒克市", "areaPinYin": "", "parentId": "188" }, { "areaCode": "1631", "areaName": "乌苏市", "areaPinYin": "", "parentId": "189" }, { "areaCode": "1632", "areaName": "和布克赛尔县", "areaPinYin": "", "parentId": "189" }, { "areaCode": "1633", "areaName": "塔城市", "areaPinYin": "", "parentId": "189" }, { "areaCode": "1634", "areaName": "托里县", "areaPinYin": "", "parentId": "189" }, { "areaCode": "1635", "areaName": "沙湾县", "areaPinYin": "", "parentId": "189" }, { "areaCode": "1636", "areaName": "裕民县", "areaPinYin": "", "parentId": "189" }, { "areaCode": "1637", "areaName": "额敏县", "areaPinYin": "", "parentId": "189" }, { "areaCode": "1638", "areaName": "且末县", "areaPinYin": "", "parentId": "190" }, { "areaCode": "1639", "areaName": "博湖县", "areaPinYin": "", "parentId": "190" }, { "areaCode": "1640", "areaName": "和硕县", "areaPinYin": "", "parentId": "190" }, { "areaCode": "1641", "areaName": "和静县", "areaPinYin": "", "parentId": "190" }, { "areaCode": "1642", "areaName": "尉犁县", "areaPinYin": "", "parentId": "190" }, { "areaCode": "1643", "areaName": "库尔勒市", "areaPinYin": "", "parentId": "190" }, { "areaCode": "1644", "areaName": "焉耆县", "areaPinYin": "", "parentId": "190" }, { "areaCode": "1645", "areaName": "若羌县", "areaPinYin": "", "parentId": "190" }, { "areaCode": "1646", "areaName": "轮台县", "areaPinYin": "", "parentId": "190" }, { "areaCode": "1647", "areaName": "吉木萨尔县", "areaPinYin": "", "parentId": "191" }, { "areaCode": "1648", "areaName": "呼图壁县", "areaPinYin": "", "parentId": "191" }, { "areaCode": "1649", "areaName": "奇台县", "areaPinYin": "", "parentId": "191" }, { "areaCode": "1650", "areaName": "昌吉市", "areaPinYin": "", "parentId": "191" }, { "areaCode": "1651", "areaName": "木垒县", "areaPinYin": "", "parentId": "191" }, { "areaCode": "1652", "areaName": "玛纳斯县", "areaPinYin": "", "parentId": "191" }, { "areaCode": "1653", "areaName": "阜康市", "areaPinYin": "", "parentId": "191" }, { "areaCode": "1654", "areaName": "石河子市", "areaPinYin": "", "parentId": "192" }, { "areaCode": "1655", "areaName": "乌什县", "areaPinYin": "", "parentId": "193" }, { "areaCode": "1656", "areaName": "库车县", "areaPinYin": "", "parentId": "193" }, { "areaCode": "1657", "areaName": "拜城县", "areaPinYin": "", "parentId": "193" }, { "areaCode": "1658", "areaName": "新和县", "areaPinYin": "", "parentId": "193" }, { "areaCode": "1659", "areaName": "柯坪县", "areaPinYin": "", "parentId": "193" }, { "areaCode": "1660", "areaName": "沙雅县", "areaPinYin": "", "parentId": "193" }, { "areaCode": "1661", "areaName": "温宿县", "areaPinYin": "", "parentId": "193" }, { "areaCode": "1662", "areaName": "阿克苏市", "areaPinYin": "", "parentId": "193" }, { "areaCode": "1663", "areaName": "阿瓦提县", "areaPinYin": "", "parentId": "193" }, { "areaCode": "1664", "areaName": "北屯市", "areaPinYin": "", "parentId": "194" }, { "areaCode": "1665", "areaName": "吉木乃县", "areaPinYin": "", "parentId": "194" }, { "areaCode": "1666", "areaName": "哈巴河县", "areaPinYin": "", "parentId": "194" }, { "areaCode": "1667", "areaName": "富蕴县", "areaPinYin": "", "parentId": "194" }, { "areaCode": "1668", "areaName": "布尔津县", "areaPinYin": "", "parentId": "194" }, { "areaCode": "1669", "areaName": "福海县", "areaPinYin": "", "parentId": "194" }, { "areaCode": "1670", "areaName": "阿勒泰市", "areaPinYin": "", "parentId": "194" }, { "areaCode": "1671", "areaName": "青河县", "areaPinYin": "", "parentId": "194" }, { "areaCode": "1672", "areaName": "阿拉尔市", "areaPinYin": "", "parentId": "195" }, { "areaCode": "1673", "areaName": "六合区", "areaPinYin": "", "parentId": "196" }, { "areaCode": "1674", "areaName": "建邺区", "areaPinYin": "", "parentId": "196" }, { "areaCode": "1675", "areaName": "栖霞区", "areaPinYin": "", "parentId": "196" }, { "areaCode": "1676", "areaName": "江宁区", "areaPinYin": "", "parentId": "196" }, { "areaCode": "1677", "areaName": "浦口区", "areaPinYin": "", "parentId": "196" }, { "areaCode": "1678", "areaName": "溧水区", "areaPinYin": "", "parentId": "196" }, { "areaCode": "1679", "areaName": "玄武区", "areaPinYin": "", "parentId": "196" }, { "areaCode": "1680", "areaName": "秦淮区", "areaPinYin": "", "parentId": "196" }, { "areaCode": "1681", "areaName": "雨花台区", "areaPinYin": "", "parentId": "196" }, { "areaCode": "1682", "areaName": "高淳区", "areaPinYin": "", "parentId": "196" }, { "areaCode": "1683", "areaName": "鼓楼区", "areaPinYin": "", "parentId": "196" }, { "areaCode": "1684", "areaName": "南通经济技术开发区", "areaPinYin": "", "parentId": "197" }, { "areaCode": "1685", "areaName": "启东市", "areaPinYin": "", "parentId": "197" }, { "areaCode": "1686", "areaName": "如东县", "areaPinYin": "", "parentId": "197" }, { "areaCode": "1687", "areaName": "如皋市", "areaPinYin": "", "parentId": "197" }, { "areaCode": "1688", "areaName": "崇川区", "areaPinYin": "", "parentId": "197" }, { "areaCode": "1689", "areaName": "海安县", "areaPinYin": "", "parentId": "197" }, { "areaCode": "1690", "areaName": "海门市", "areaPinYin": "", "parentId": "197" }, { "areaCode": "1691", "areaName": "港闸区", "areaPinYin": "", "parentId": "197" }, { "areaCode": "1692", "areaName": "通州区", "areaPinYin": "", "parentId": "197" }, { "areaCode": "1693", "areaName": "宿城区", "areaPinYin": "", "parentId": "198" }, { "areaCode": "1694", "areaName": "宿豫区", "areaPinYin": "", "parentId": "198" }, { "areaCode": "1695", "areaName": "宿迁经济开发区", "areaPinYin": "", "parentId": "198" }, { "areaCode": "1696", "areaName": "沭阳县", "areaPinYin": "", "parentId": "198" }, { "areaCode": "1697", "areaName": "泗洪县", "areaPinYin": "", "parentId": "198" }, { "areaCode": "1698", "areaName": "泗阳县", "areaPinYin": "", "parentId": "198" }, { "areaCode": "1699", "areaName": "天宁区", "areaPinYin": "", "parentId": "199" }, { "areaCode": "1700", "areaName": "戚墅堰区", "areaPinYin": "", "parentId": "199" }, { "areaCode": "1701", "areaName": "新北区", "areaPinYin": "", "parentId": "199" }, { "areaCode": "1702", "areaName": "武进区", "areaPinYin": "", "parentId": "199" }, { "areaCode": "1703", "areaName": "溧阳市", "areaPinYin": "", "parentId": "199" }, { "areaCode": "1704", "areaName": "金坛市", "areaPinYin": "", "parentId": "199" }, { "areaCode": "1705", "areaName": "钟楼区", "areaPinYin": "", "parentId": "199" }, { "areaCode": "1706", "areaName": "丰县", "areaPinYin": "", "parentId": "200" }, { "areaCode": "1707", "areaName": "云龙区", "areaPinYin": "", "parentId": "200" }, { "areaCode": "1708", "areaName": "八段工业园区", "areaPinYin": "", "parentId": "200" }, { "areaCode": "1709", "areaName": "新沂市", "areaPinYin": "", "parentId": "200" }, { "areaCode": "1710", "areaName": "沛县", "areaPinYin": "", "parentId": "200" }, { "areaCode": "1711", "areaName": "泉山区", "areaPinYin": "", "parentId": "200" }, { "areaCode": "1712", "areaName": "睢宁县", "areaPinYin": "", "parentId": "200" }, { "areaCode": "1713", "areaName": "贾汪区", "areaPinYin": "", "parentId": "200" }, { "areaCode": "1714", "areaName": "邳州市", "areaPinYin": "", "parentId": "200" }, { "areaCode": "1715", "areaName": "金山桥开发区", "areaPinYin": "", "parentId": "200" }, { "areaCode": "1716", "areaName": "铜山区", "areaPinYin": "", "parentId": "200" }, { "areaCode": "1717", "areaName": "铜山经济技术开发区", "areaPinYin": "", "parentId": "200" }, { "areaCode": "1718", "areaName": "鼓楼区", "areaPinYin": "", "parentId": "200" }, { "areaCode": "1719", "areaName": "仪征市", "areaPinYin": "", "parentId": "201" }, { "areaCode": "1720", "areaName": "宝应县", "areaPinYin": "", "parentId": "201" }, { "areaCode": "1721", "areaName": "广陵区", "areaPinYin": "", "parentId": "201" }, { "areaCode": "1722", "areaName": "江都区", "areaPinYin": "", "parentId": "201" }, { "areaCode": "1723", "areaName": "邗江区", "areaPinYin": "", "parentId": "201" }, { "areaCode": "1724", "areaName": "高邮市", "areaPinYin": "", "parentId": "201" }, { "areaCode": "1725", "areaName": "北塘区", "areaPinYin": "", "parentId": "202" }, { "areaCode": "1726", "areaName": "南长区", "areaPinYin": "", "parentId": "202" }, { "areaCode": "1727", "areaName": "宜兴市", "areaPinYin": "", "parentId": "202" }, { "areaCode": "1728", "areaName": "崇安区", "areaPinYin": "", "parentId": "202" }, { "areaCode": "1729", "areaName": "惠山区", "areaPinYin": "", "parentId": "202" }, { "areaCode": "1730", "areaName": "新区", "areaPinYin": "", "parentId": "202" }, { "areaCode": "1731", "areaName": "江阴市", "areaPinYin": "", "parentId": "202" }, { "areaCode": "1732", "areaName": "滨湖区", "areaPinYin": "", "parentId": "202" }, { "areaCode": "1733", "areaName": "锡山区", "areaPinYin": "", "parentId": "202" }, { "areaCode": "1734", "areaName": "兴化市", "areaPinYin": "", "parentId": "203" }, { "areaCode": "1735", "areaName": "姜堰市", "areaPinYin": "", "parentId": "203" }, { "areaCode": "1736", "areaName": "泰兴市", "areaPinYin": "", "parentId": "203" }, { "areaCode": "1737", "areaName": "海陵区", "areaPinYin": "", "parentId": "203" }, { "areaCode": "1738", "areaName": "靖江市", "areaPinYin": "", "parentId": "203" }, { "areaCode": "1739", "areaName": "高港区", "areaPinYin": "", "parentId": "203" }, { "areaCode": "1740", "areaName": "楚州区", "areaPinYin": "", "parentId": "204" }, { "areaCode": "1741", "areaName": "洪泽县", "areaPinYin": "", "parentId": "204" }, { "areaCode": "1742", "areaName": "涟水县", "areaPinYin": "", "parentId": "204" }, { "areaCode": "1743", "areaName": "淮阴区", "areaPinYin": "", "parentId": "204" }, { "areaCode": "1744", "areaName": "清河区", "areaPinYin": "", "parentId": "204" }, { "areaCode": "1745", "areaName": "清浦区", "areaPinYin": "", "parentId": "204" }, { "areaCode": "1746", "areaName": "盱眙县", "areaPinYin": "", "parentId": "204" }, { "areaCode": "1747", "areaName": "经济开发区", "areaPinYin": "", "parentId": "204" }, { "areaCode": "1748", "areaName": "金湖县", "areaPinYin": "", "parentId": "204" }, { "areaCode": "1749", "areaName": "东台市", "areaPinYin": "", "parentId": "205" }, { "areaCode": "1750", "areaName": "亭湖区", "areaPinYin": "", "parentId": "205" }, { "areaCode": "1751", "areaName": "响水县", "areaPinYin": "", "parentId": "205" }, { "areaCode": "1752", "areaName": "大丰市", "areaPinYin": "", "parentId": "205" }, { "areaCode": "1753", "areaName": "射阳县", "areaPinYin": "", "parentId": "205" }, { "areaCode": "1754", "areaName": "建湖县", "areaPinYin": "", "parentId": "205" }, { "areaCode": "1755", "areaName": "滨海县", "areaPinYin": "", "parentId": "205" }, { "areaCode": "1756", "areaName": "盐都区", "areaPinYin": "", "parentId": "205" }, { "areaCode": "1757", "areaName": "阜宁县", "areaPinYin": "", "parentId": "205" }, { "areaCode": "1758", "areaName": "吴中区", "areaPinYin": "", "parentId": "206" }, { "areaCode": "1759", "areaName": "吴江区", "areaPinYin": "", "parentId": "206" }, { "areaCode": "1760", "areaName": "太仓市", "areaPinYin": "", "parentId": "206" }, { "areaCode": "1761", "areaName": "工业园区", "areaPinYin": "", "parentId": "206" }, { "areaCode": "1762", "areaName": "常熟市", "areaPinYin": "", "parentId": "206" }, { "areaCode": "1763", "areaName": "平江区", "areaPinYin": "", "parentId": "206" }, { "areaCode": "1764", "areaName": "张家港市", "areaPinYin": "", "parentId": "206" }, { "areaCode": "1765", "areaName": "昆山市", "areaPinYin": "", "parentId": "206" }, { "areaCode": "1766", "areaName": "沧浪区", "areaPinYin": "", "parentId": "206" }, { "areaCode": "1767", "areaName": "相城区", "areaPinYin": "", "parentId": "206" }, { "areaCode": "1768", "areaName": "虎丘区", "areaPinYin": "", "parentId": "206" }, { "areaCode": "1769", "areaName": "金阊区", "areaPinYin": "", "parentId": "206" }, { "areaCode": "1770", "areaName": "高新区", "areaPinYin": "", "parentId": "206" }, { "areaCode": "1771", "areaName": "东海县", "areaPinYin": "", "parentId": "207" }, { "areaCode": "1772", "areaName": "新浦区", "areaPinYin": "", "parentId": "207" }, { "areaCode": "1773", "areaName": "海州区", "areaPinYin": "", "parentId": "207" }, { "areaCode": "1774", "areaName": "灌云县", "areaPinYin": "", "parentId": "207" }, { "areaCode": "1775", "areaName": "灌南县", "areaPinYin": "", "parentId": "207" }, { "areaCode": "1776", "areaName": "赣榆县", "areaPinYin": "", "parentId": "207" }, { "areaCode": "1777", "areaName": "连云区", "areaPinYin": "", "parentId": "207" }, { "areaCode": "1778", "areaName": "丹徒区", "areaPinYin": "", "parentId": "208" }, { "areaCode": "1779", "areaName": "丹徒新区", "areaPinYin": "", "parentId": "208" }, { "areaCode": "1780", "areaName": "丹阳市", "areaPinYin": "", "parentId": "208" }, { "areaCode": "1781", "areaName": "京口区", "areaPinYin": "", "parentId": "208" }, { "areaCode": "1782", "areaName": "句容市", "areaPinYin": "", "parentId": "208" }, { "areaCode": "1783", "areaName": "扬中市", "areaPinYin": "", "parentId": "208" }, { "areaCode": "1784", "areaName": "润州区", "areaPinYin": "", "parentId": "208" }, { "areaCode": "1785", "areaName": "镇江新区", "areaPinYin": "", "parentId": "208" }, { "areaCode": "1786", "areaName": "万年县", "areaPinYin": "", "parentId": "209" }, { "areaCode": "1787", "areaName": "上饶县", "areaPinYin": "", "parentId": "209" }, { "areaCode": "1788", "areaName": "余干县", "areaPinYin": "", "parentId": "209" }, { "areaCode": "1789", "areaName": "信州区", "areaPinYin": "", "parentId": "209" }, { "areaCode": "1790", "areaName": "婺源县", "areaPinYin": "", "parentId": "209" }, { "areaCode": "1791", "areaName": "广丰县", "areaPinYin": "", "parentId": "209" }, { "areaCode": "1792", "areaName": "弋阳县", "areaPinYin": "", "parentId": "209" }, { "areaCode": "1793", "areaName": "德兴市", "areaPinYin": "", "parentId": "209" }, { "areaCode": "1794", "areaName": "横峰县", "areaPinYin": "", "parentId": "209" }, { "areaCode": "1795", "areaName": "玉山县", "areaPinYin": "", "parentId": "209" }, { "areaCode": "1796", "areaName": "鄱阳县", "areaPinYin": "", "parentId": "209" }, { "areaCode": "1797", "areaName": "铅山县", "areaPinYin": "", "parentId": "209" }, { "areaCode": "1798", "areaName": "九江县", "areaPinYin": "", "parentId": "210" }, { "areaCode": "1799", "areaName": "修水县", "areaPinYin": "", "parentId": "210" }, { "areaCode": "1800", "areaName": "八里湖新区", "areaPinYin": "", "parentId": "210" }, { "areaCode": "1801", "areaName": "共青城市", "areaPinYin": "", "parentId": "210" }, { "areaCode": "1802", "areaName": "庐山区", "areaPinYin": "", "parentId": "210" }, { "areaCode": "1803", "areaName": "庐山风景名胜区", "areaPinYin": "", "parentId": "210" }, { "areaCode": "1804", "areaName": "彭泽县", "areaPinYin": "", "parentId": "210" }, { "areaCode": "1805", "areaName": "德安县", "areaPinYin": "", "parentId": "210" }, { "areaCode": "1806", "areaName": "星子县", "areaPinYin": "", "parentId": "210" }, { "areaCode": "1807", "areaName": "武宁县", "areaPinYin": "", "parentId": "210" }, { "areaCode": "1808", "areaName": "永修县", "areaPinYin": "", "parentId": "210" }, { "areaCode": "1809", "areaName": "浔阳区", "areaPinYin": "", "parentId": "210" }, { "areaCode": "1810", "areaName": "湖口县", "areaPinYin": "", "parentId": "210" }, { "areaCode": "1811", "areaName": "瑞昌市", "areaPinYin": "", "parentId": "210" }, { "areaCode": "1812", "areaName": "经济技术开发区", "areaPinYin": "", "parentId": "210" }, { "areaCode": "1813", "areaName": "都昌县", "areaPinYin": "", "parentId": "210" }, { "areaCode": "1814", "areaName": "东湖区", "areaPinYin": "", "parentId": "211" }, { "areaCode": "1815", "areaName": "南昌县", "areaPinYin": "", "parentId": "211" }, { "areaCode": "1816", "areaName": "安义县", "areaPinYin": "", "parentId": "211" }, { "areaCode": "1817", "areaName": "新建县", "areaPinYin": "", "parentId": "211" }, { "areaCode": "1818", "areaName": "昌北区", "areaPinYin": "", "parentId": "211" }, { "areaCode": "1819", "areaName": "湾里区", "areaPinYin": "", "parentId": "211" }, { "areaCode": "1820", "areaName": "红谷滩新区", "areaPinYin": "", "parentId": "211" }, { "areaCode": "1821", "areaName": "西湖区", "areaPinYin": "", "parentId": "211" }, { "areaCode": "1822", "areaName": "进贤县", "areaPinYin": "", "parentId": "211" }, { "areaCode": "1823", "areaName": "青云谱区", "areaPinYin": "", "parentId": "211" }, { "areaCode": "1824", "areaName": "青山湖区", "areaPinYin": "", "parentId": "211" }, { "areaCode": "1825", "areaName": "高新区", "areaPinYin": "", "parentId": "211" }, { "areaCode": "1826", "areaName": "万安县", "areaPinYin": "", "parentId": "212" }, { "areaCode": "1827", "areaName": "井冈山市", "areaPinYin": "", "parentId": "212" }, { "areaCode": "1828", "areaName": "吉安县", "areaPinYin": "", "parentId": "212" }, { "areaCode": "1829", "areaName": "吉州区", "areaPinYin": "", "parentId": "212" }, { "areaCode": "1830", "areaName": "吉水县", "areaPinYin": "", "parentId": "212" }, { "areaCode": "1831", "areaName": "安福县", "areaPinYin": "", "parentId": "212" }, { "areaCode": "1832", "areaName": "峡江县", "areaPinYin": "", "parentId": "212" }, { "areaCode": "1833", "areaName": "新干县", "areaPinYin": "", "parentId": "212" }, { "areaCode": "1834", "areaName": "永丰县", "areaPinYin": "", "parentId": "212" }, { "areaCode": "1835", "areaName": "永新县", "areaPinYin": "", "parentId": "212" }, { "areaCode": "1836", "areaName": "泰和县", "areaPinYin": "", "parentId": "212" }, { "areaCode": "1837", "areaName": "遂川县", "areaPinYin": "", "parentId": "212" }, { "areaCode": "1838", "areaName": "青原区", "areaPinYin": "", "parentId": "212" }, { "areaCode": "1839", "areaName": "万载县", "areaPinYin": "", "parentId": "213" }, { "areaCode": "1840", "areaName": "上高县", "areaPinYin": "", "parentId": "213" }, { "areaCode": "1841", "areaName": "丰城市", "areaPinYin": "", "parentId": "213" }, { "areaCode": "1842", "areaName": "奉新县", "areaPinYin": "", "parentId": "213" }, { "areaCode": "1843", "areaName": "宜丰县", "areaPinYin": "", "parentId": "213" }, { "areaCode": "1844", "areaName": "樟树市", "areaPinYin": "", "parentId": "213" }, { "areaCode": "1845", "areaName": "袁州区", "areaPinYin": "", "parentId": "213" }, { "areaCode": "1846", "areaName": "铜鼓县", "areaPinYin": "", "parentId": "213" }, { "areaCode": "1847", "areaName": "靖安县", "areaPinYin": "", "parentId": "213" }, { "areaCode": "1848", "areaName": "高安市", "areaPinYin": "", "parentId": "213" }, { "areaCode": "1849", "areaName": "东乡县", "areaPinYin": "", "parentId": "214" }, { "areaCode": "1850", "areaName": "临川区", "areaPinYin": "", "parentId": "214" }, { "areaCode": "1851", "areaName": "乐安县", "areaPinYin": "", "parentId": "214" }, { "areaCode": "1852", "areaName": "南丰县", "areaPinYin": "", "parentId": "214" }, { "areaCode": "1853", "areaName": "南城县", "areaPinYin": "", "parentId": "214" }, { "areaCode": "1854", "areaName": "宜黄县", "areaPinYin": "", "parentId": "214" }, { "areaCode": "1855", "areaName": "崇仁县", "areaPinYin": "", "parentId": "214" }, { "areaCode": "1856", "areaName": "广昌县", "areaPinYin": "", "parentId": "214" }, { "areaCode": "1857", "areaName": "资溪县", "areaPinYin": "", "parentId": "214" }, { "areaCode": "1858", "areaName": "金溪县", "areaPinYin": "", "parentId": "214" }, { "areaCode": "1859", "areaName": "黎川县", "areaPinYin": "", "parentId": "214" }, { "areaCode": "1860", "areaName": "分宜县", "areaPinYin": "", "parentId": "215" }, { "areaCode": "1861", "areaName": "渝水区", "areaPinYin": "", "parentId": "215" }, { "areaCode": "1862", "areaName": "乐平市", "areaPinYin": "", "parentId": "216" }, { "areaCode": "1863", "areaName": "昌江区", "areaPinYin": "", "parentId": "216" }, { "areaCode": "1864", "areaName": "浮梁县", "areaPinYin": "", "parentId": "216" }, { "areaCode": "1865", "areaName": "珠山区", "areaPinYin": "", "parentId": "216" }, { "areaCode": "1866", "areaName": "上栗县", "areaPinYin": "", "parentId": "217" }, { "areaCode": "1867", "areaName": "安源区", "areaPinYin": "", "parentId": "217" }, { "areaCode": "1868", "areaName": "湘东区", "areaPinYin": "", "parentId": "217" }, { "areaCode": "1869", "areaName": "芦溪县", "areaPinYin": "", "parentId": "217" }, { "areaCode": "1870", "areaName": "莲花县", "areaPinYin": "", "parentId": "217" }, { "areaCode": "1871", "areaName": "上犹县", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1872", "areaName": "于都县", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1873", "areaName": "会昌县", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1874", "areaName": "信丰县", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1875", "areaName": "全南县", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1876", "areaName": "兴国县", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1877", "areaName": "南康市", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1878", "areaName": "大余县", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1879", "areaName": "宁都县", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1880", "areaName": "安远县", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1881", "areaName": "定南县", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1882", "areaName": "寻乌县", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1883", "areaName": "崇义县", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1884", "areaName": "瑞金市", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1885", "areaName": "石城县", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1886", "areaName": "章贡区", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1887", "areaName": "赣县", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1888", "areaName": "龙南县", "areaPinYin": "", "parentId": "218" }, { "areaCode": "1889", "areaName": "余江县", "areaPinYin": "", "parentId": "219" }, { "areaCode": "1890", "areaName": "月湖区", "areaPinYin": "", "parentId": "219" }, { "areaCode": "1891", "areaName": "贵溪市", "areaPinYin": "", "parentId": "219" }, { "areaCode": "1892", "areaName": "龙虎山风景旅游区", "areaPinYin": "", "parentId": "219" }, { "areaCode": "1893", "areaName": "北市区", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1894", "areaName": "南市区", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1895", "areaName": "博野县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1896", "areaName": "唐县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1897", "areaName": "安国市", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1898", "areaName": "安新县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1899", "areaName": "定兴县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1900", "areaName": "定州市", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1901", "areaName": "容城县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1902", "areaName": "徐水县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1903", "areaName": "新市区", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1904", "areaName": "易县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1905", "areaName": "曲阳县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1906", "areaName": "望都县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1907", "areaName": "涞水县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1908", "areaName": "涞源县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1909", "areaName": "涿州市", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1910", "areaName": "清苑县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1911", "areaName": "满城县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1912", "areaName": "蠡县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1913", "areaName": "阜平县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1914", "areaName": "雄县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1915", "areaName": "顺平县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1916", "areaName": "高碑店市", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1917", "areaName": "高阳县", "areaPinYin": "", "parentId": "220" }, { "areaCode": "1918", "areaName": "丰南区", "areaPinYin": "", "parentId": "221" }, { "areaCode": "1919", "areaName": "丰润区", "areaPinYin": "", "parentId": "221" }, { "areaCode": "1920", "areaName": "乐亭县", "areaPinYin": "", "parentId": "221" }, { "areaCode": "1921", "areaName": "古冶区", "areaPinYin": "", "parentId": "221" }, { "areaCode": "1922", "areaName": "开平区", "areaPinYin": "", "parentId": "221" }, { "areaCode": "1923", "areaName": "曹妃甸区", "areaPinYin": "", "parentId": "221" }, { "areaCode": "1924", "areaName": "滦南县", "areaPinYin": "", "parentId": "221" }, { "areaCode": "1925", "areaName": "滦县", "areaPinYin": "", "parentId": "221" }, { "areaCode": "1926", "areaName": "玉田县", "areaPinYin": "", "parentId": "221" }, { "areaCode": "1927", "areaName": "路北区", "areaPinYin": "", "parentId": "221" }, { "areaCode": "1928", "areaName": "路南区", "areaPinYin": "", "parentId": "221" }, { "areaCode": "1929", "areaName": "迁安市", "areaPinYin": "", "parentId": "221" }, { "areaCode": "1930", "areaName": "迁西县", "areaPinYin": "", "parentId": "221" }, { "areaCode": "1931", "areaName": "遵化市", "areaPinYin": "", "parentId": "221" }, { "areaCode": "1932", "areaName": "三河市", "areaPinYin": "", "parentId": "222" }, { "areaCode": "1933", "areaName": "固安县", "areaPinYin": "", "parentId": "222" }, { "areaCode": "1934", "areaName": "大厂县", "areaPinYin": "", "parentId": "222" }, { "areaCode": "1935", "areaName": "大城县", "areaPinYin": "", "parentId": "222" }, { "areaCode": "1936", "areaName": "安次区", "areaPinYin": "", "parentId": "222" }, { "areaCode": "1937", "areaName": "广阳区", "areaPinYin": "", "parentId": "222" }, { "areaCode": "1938", "areaName": "开发区", "areaPinYin": "", "parentId": "222" }, { "areaCode": "1939", "areaName": "文安县", "areaPinYin": "", "parentId": "222" }, { "areaCode": "1940", "areaName": "永清县", "areaPinYin": "", "parentId": "222" }, { "areaCode": "1941", "areaName": "霸州市", "areaPinYin": "", "parentId": "222" }, { "areaCode": "1942", "areaName": "香河县", "areaPinYin": "", "parentId": "222" }, { "areaCode": "1943", "areaName": "万全县", "areaPinYin": "", "parentId": "223" }, { "areaCode": "1944", "areaName": "下花园区", "areaPinYin": "", "parentId": "223" }, { "areaCode": "1945", "areaName": "宣化区", "areaPinYin": "", "parentId": "223" }, { "areaCode": "1946", "areaName": "宣化县", "areaPinYin": "", "parentId": "223" }, { "areaCode": "1947", "areaName": "尚义县", "areaPinYin": "", "parentId": "223" }, { "areaCode": "1948", "areaName": "崇礼县", "areaPinYin": "", "parentId": "223" }, { "areaCode": "1949", "areaName": "康保县", "areaPinYin": "", "parentId": "223" }, { "areaCode": "1950", "areaName": "张北县", "areaPinYin": "", "parentId": "223" }, { "areaCode": "1951", "areaName": "怀安县", "areaPinYin": "", "parentId": "223" }, { "areaCode": "1952", "areaName": "怀来县", "areaPinYin": "", "parentId": "223" }, { "areaCode": "1953", "areaName": "桥东区", "areaPinYin": "", "parentId": "223" }, { "areaCode": "1954", "areaName": "桥西区", "areaPinYin": "", "parentId": "223" }, { "areaCode": "1955", "areaName": "沽源县", "areaPinYin": "", "parentId": "223" }, { "areaCode": "1956", "areaName": "涿鹿县", "areaPinYin": "", "parentId": "223" }, { "areaCode": "1957", "areaName": "蔚县", "areaPinYin": "", "parentId": "223" }, { "areaCode": "1958", "areaName": "赤城县", "areaPinYin": "", "parentId": "223" }, { "areaCode": "1959", "areaName": "阳原县", "areaPinYin": "", "parentId": "223" }, { "areaCode": "1960", "areaName": "丰宁县", "areaPinYin": "", "parentId": "224" }, { "areaCode": "1961", "areaName": "兴隆县", "areaPinYin": "", "parentId": "224" }, { "areaCode": "1962", "areaName": "双桥区", "areaPinYin": "", "parentId": "224" }, { "areaCode": "1963", "areaName": "双滦区", "areaPinYin": "", "parentId": "224" }, { "areaCode": "1964", "areaName": "围场县", "areaPinYin": "", "parentId": "224" }, { "areaCode": "1965", "areaName": "宽城县", "areaPinYin": "", "parentId": "224" }, { "areaCode": "1966", "areaName": "平泉县", "areaPinYin": "", "parentId": "224" }, { "areaCode": "1967", "areaName": "承德县", "areaPinYin": "", "parentId": "224" }, { "areaCode": "1968", "areaName": "滦平县", "areaPinYin": "", "parentId": "224" }, { "areaCode": "1969", "areaName": "隆化县", "areaPinYin": "", "parentId": "224" }, { "areaCode": "1970", "areaName": "鹰手营子矿区", "areaPinYin": "", "parentId": "224" }, { "areaCode": "1971", "areaName": "东光县", "areaPinYin": "", "parentId": "225" }, { "areaCode": "1972", "areaName": "任丘市", "areaPinYin": "", "parentId": "225" }, { "areaCode": "1973", "areaName": "南皮县", "areaPinYin": "", "parentId": "225" }, { "areaCode": "1974", "areaName": "吴桥县", "areaPinYin": "", "parentId": "225" }, { "areaCode": "1975", "areaName": "孟村县", "areaPinYin": "", "parentId": "225" }, { "areaCode": "1976", "areaName": "新华区", "areaPinYin": "", "parentId": "225" }, { "areaCode": "1977", "areaName": "沧县", "areaPinYin": "", "parentId": "225" }, { "areaCode": "1978", "areaName": "河间市", "areaPinYin": "", "parentId": "225" }, { "areaCode": "1979", "areaName": "泊头市", "areaPinYin": "", "parentId": "225" }, { "areaCode": "1980", "areaName": "海兴县", "areaPinYin": "", "parentId": "225" }, { "areaCode": "1981", "areaName": "献县", "areaPinYin": "", "parentId": "225" }, { "areaCode": "1982", "areaName": "盐山县", "areaPinYin": "", "parentId": "225" }, { "areaCode": "1983", "areaName": "肃宁县", "areaPinYin": "", "parentId": "225" }, { "areaCode": "1984", "areaName": "运河区", "areaPinYin": "", "parentId": "225" }, { "areaCode": "1985", "areaName": "青县", "areaPinYin": "", "parentId": "225" }, { "areaCode": "1986", "areaName": "黄骅市", "areaPinYin": "", "parentId": "225" }, { "areaCode": "1987", "areaName": "井陉县", "areaPinYin": "", "parentId": "226" }, { "areaCode": "1988", "areaName": "井陉矿区", "areaPinYin": "", "parentId": "226" }, { "areaCode": "1989", "areaName": "元氏县", "areaPinYin": "", "parentId": "226" }, { "areaCode": "1990", "areaName": "平山县", "areaPinYin": "", "parentId": "226" }, { "areaCode": "1991", "areaName": "新乐市", "areaPinYin": "", "parentId": "226" }, { "areaCode": "1992", "areaName": "新华区", "areaPinYin": "", "parentId": "226" }, { "areaCode": "1993", "areaName": "无极县", "areaPinYin": "", "parentId": "226" }, { "areaCode": "1994", "areaName": "晋州市", "areaPinYin": "", "parentId": "226" }, { "areaCode": "1995", "areaName": "栾城县", "areaPinYin": "", "parentId": "226" }, { "areaCode": "1996", "areaName": "桥东区", "areaPinYin": "", "parentId": "226" }, { "areaCode": "1997", "areaName": "桥西区", "areaPinYin": "", "parentId": "226" }, { "areaCode": "1998", "areaName": "正定县", "areaPinYin": "", "parentId": "226" }, { "areaCode": "1999", "areaName": "深泽县", "areaPinYin": "", "parentId": "226" }, { "areaCode": "2000", "areaName": "灵寿县", "areaPinYin": "", "parentId": "226" }, { "areaCode": "2001", "areaName": "藁城市", "areaPinYin": "", "parentId": "226" }, { "areaCode": "2002", "areaName": "行唐县", "areaPinYin": "", "parentId": "226" }, { "areaCode": "2003", "areaName": "裕华区", "areaPinYin": "", "parentId": "226" }, { "areaCode": "2004", "areaName": "赞皇县", "areaPinYin": "", "parentId": "226" }, { "areaCode": "2005", "areaName": "赵县", "areaPinYin": "", "parentId": "226" }, { "areaCode": "2006", "areaName": "辛集市", "areaPinYin": "", "parentId": "226" }, { "areaCode": "2007", "areaName": "长安区", "areaPinYin": "", "parentId": "226" }, { "areaCode": "2008", "areaName": "高邑县", "areaPinYin": "", "parentId": "226" }, { "areaCode": "2009", "areaName": "鹿泉市", "areaPinYin": "", "parentId": "226" }, { "areaCode": "2010", "areaName": "北戴河区", "areaPinYin": "", "parentId": "227" }, { "areaCode": "2011", "areaName": "卢龙县", "areaPinYin": "", "parentId": "227" }, { "areaCode": "2012", "areaName": "山海关区", "areaPinYin": "", "parentId": "227" }, { "areaCode": "2013", "areaName": "抚宁县", "areaPinYin": "", "parentId": "227" }, { "areaCode": "2014", "areaName": "昌黎县", "areaPinYin": "", "parentId": "227" }, { "areaCode": "2015", "areaName": "海港区", "areaPinYin": "", "parentId": "227" }, { "areaCode": "2016", "areaName": "青龙县", "areaPinYin": "", "parentId": "227" }, { "areaCode": "2017", "areaName": "冀州市", "areaPinYin": "", "parentId": "228" }, { "areaCode": "2018", "areaName": "安平县", "areaPinYin": "", "parentId": "228" }, { "areaCode": "2019", "areaName": "故城县", "areaPinYin": "", "parentId": "228" }, { "areaCode": "2020", "areaName": "景县", "areaPinYin": "", "parentId": "228" }, { "areaCode": "2021", "areaName": "枣强县", "areaPinYin": "", "parentId": "228" }, { "areaCode": "2022", "areaName": "桃城区", "areaPinYin": "", "parentId": "228" }, { "areaCode": "2023", "areaName": "武强县", "areaPinYin": "", "parentId": "228" }, { "areaCode": "2024", "areaName": "武邑县", "areaPinYin": "", "parentId": "228" }, { "areaCode": "2025", "areaName": "深州市", "areaPinYin": "", "parentId": "228" }, { "areaCode": "2026", "areaName": "阜城县", "areaPinYin": "", "parentId": "228" }, { "areaCode": "2027", "areaName": "饶阳县", "areaPinYin": "", "parentId": "228" }, { "areaCode": "2028", "areaName": "临城县", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2029", "areaName": "临西县", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2030", "areaName": "任县", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2031", "areaName": "内丘县", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2032", "areaName": "南和县", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2033", "areaName": "南宫市", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2034", "areaName": "威县", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2035", "areaName": "宁晋县", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2036", "areaName": "巨鹿县", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2037", "areaName": "平乡县", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2038", "areaName": "广宗县", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2039", "areaName": "新河县", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2040", "areaName": "柏乡县", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2041", "areaName": "桥东区", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2042", "areaName": "桥西区", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2043", "areaName": "沙河市", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2044", "areaName": "清河县", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2045", "areaName": "邢台县", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2046", "areaName": "隆尧县", "areaPinYin": "", "parentId": "229" }, { "areaCode": "2047", "areaName": "丛台区", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2048", "areaName": "临漳县", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2049", "areaName": "复兴区", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2050", "areaName": "大名县", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2051", "areaName": "峰峰矿区", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2052", "areaName": "广平县", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2053", "areaName": "成安县", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2054", "areaName": "曲周县", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2055", "areaName": "武安市", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2056", "areaName": "永年县", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2057", "areaName": "涉县", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2058", "areaName": "磁县", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2059", "areaName": "肥乡县", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2060", "areaName": "邯山区", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2061", "areaName": "邯郸县", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2062", "areaName": "邱县", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2063", "areaName": "馆陶县", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2064", "areaName": "魏县", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2065", "areaName": "鸡泽县", "areaPinYin": "", "parentId": "230" }, { "areaCode": "2066", "areaName": "义马市", "areaPinYin": "", "parentId": "231" }, { "areaCode": "2067", "areaName": "卢氏县", "areaPinYin": "", "parentId": "231" }, { "areaCode": "2068", "areaName": "渑池县", "areaPinYin": "", "parentId": "231" }, { "areaCode": "2069", "areaName": "湖滨区", "areaPinYin": "", "parentId": "231" }, { "areaCode": "2070", "areaName": "灵宝市", "areaPinYin": "", "parentId": "231" }, { "areaCode": "2071", "areaName": "陕县", "areaPinYin": "", "parentId": "231" }, { "areaCode": "2072", "areaName": "光山县", "areaPinYin": "", "parentId": "232" }, { "areaCode": "2073", "areaName": "商城县", "areaPinYin": "", "parentId": "232" }, { "areaCode": "2074", "areaName": "固始县", "areaPinYin": "", "parentId": "232" }, { "areaCode": "2075", "areaName": "平桥区", "areaPinYin": "", "parentId": "232" }, { "areaCode": "2076", "areaName": "息县", "areaPinYin": "", "parentId": "232" }, { "areaCode": "2077", "areaName": "新县", "areaPinYin": "", "parentId": "232" }, { "areaCode": "2078", "areaName": "浉河区", "areaPinYin": "", "parentId": "232" }, { "areaCode": "2079", "areaName": "淮滨县", "areaPinYin": "", "parentId": "232" }, { "areaCode": "2080", "areaName": "潢川县", "areaPinYin": "", "parentId": "232" }, { "areaCode": "2081", "areaName": "罗山县", "areaPinYin": "", "parentId": "232" }, { "areaCode": "2082", "areaName": "内乡县", "areaPinYin": "", "parentId": "233" }, { "areaCode": "2083", "areaName": "南召县", "areaPinYin": "", "parentId": "233" }, { "areaCode": "2084", "areaName": "卧龙区", "areaPinYin": "", "parentId": "233" }, { "areaCode": "2085", "areaName": "唐河县", "areaPinYin": "", "parentId": "233" }, { "areaCode": "2086", "areaName": "宛城区", "areaPinYin": "", "parentId": "233" }, { "areaCode": "2087", "areaName": "新野县", "areaPinYin": "", "parentId": "233" }, { "areaCode": "2088", "areaName": "方城县", "areaPinYin": "", "parentId": "233" }, { "areaCode": "2089", "areaName": "桐柏县", "areaPinYin": "", "parentId": "233" }, { "areaCode": "2090", "areaName": "淅川县", "areaPinYin": "", "parentId": "233" }, { "areaCode": "2091", "areaName": "社旗县", "areaPinYin": "", "parentId": "233" }, { "areaCode": "2092", "areaName": "西峡县", "areaPinYin": "", "parentId": "233" }, { "areaCode": "2093", "areaName": "邓州市", "areaPinYin": "", "parentId": "233" }, { "areaCode": "2094", "areaName": "镇平县", "areaPinYin": "", "parentId": "233" }, { "areaCode": "2095", "areaName": "东新区", "areaPinYin": "", "parentId": "234" }, { "areaCode": "2096", "areaName": "商水县", "areaPinYin": "", "parentId": "234" }, { "areaCode": "2097", "areaName": "太康县", "areaPinYin": "", "parentId": "234" }, { "areaCode": "2098", "areaName": "川汇区", "areaPinYin": "", "parentId": "234" }, { "areaCode": "2099", "areaName": "扶沟县", "areaPinYin": "", "parentId": "234" }, { "areaCode": "2100", "areaName": "沈丘县", "areaPinYin": "", "parentId": "234" }, { "areaCode": "2101", "areaName": "淮阳县", "areaPinYin": "", "parentId": "234" }, { "areaCode": "2102", "areaName": "经济开发区", "areaPinYin": "", "parentId": "234" }, { "areaCode": "2103", "areaName": "西华县", "areaPinYin": "", "parentId": "234" }, { "areaCode": "2104", "areaName": "郸城县", "areaPinYin": "", "parentId": "234" }, { "areaCode": "2105", "areaName": "项城市", "areaPinYin": "", "parentId": "234" }, { "areaCode": "2106", "areaName": "鹿邑县", "areaPinYin": "", "parentId": "234" }, { "areaCode": "2107", "areaName": "夏邑县", "areaPinYin": "", "parentId": "235" }, { "areaCode": "2108", "areaName": "宁陵县", "areaPinYin": "", "parentId": "235" }, { "areaCode": "2109", "areaName": "柘城县", "areaPinYin": "", "parentId": "235" }, { "areaCode": "2110", "areaName": "梁园区", "areaPinYin": "", "parentId": "235" }, { "areaCode": "2111", "areaName": "民权县", "areaPinYin": "", "parentId": "235" }, { "areaCode": "2112", "areaName": "永城市", "areaPinYin": "", "parentId": "235" }, { "areaCode": "2113", "areaName": "睢县", "areaPinYin": "", "parentId": "235" }, { "areaCode": "2114", "areaName": "睢阳区", "areaPinYin": "", "parentId": "235" }, { "areaCode": "2115", "areaName": "虞城县", "areaPinYin": "", "parentId": "235" }, { "areaCode": "2116", "areaName": "内黄县", "areaPinYin": "", "parentId": "236" }, { "areaCode": "2117", "areaName": "北关区", "areaPinYin": "", "parentId": "236" }, { "areaCode": "2118", "areaName": "安阳县", "areaPinYin": "", "parentId": "236" }, { "areaCode": "2119", "areaName": "开发区", "areaPinYin": "", "parentId": "236" }, { "areaCode": "2120", "areaName": "文峰区", "areaPinYin": "", "parentId": "236" }, { "areaCode": "2121", "areaName": "林州市", "areaPinYin": "", "parentId": "236" }, { "areaCode": "2122", "areaName": "殷都区", "areaPinYin": "", "parentId": "236" }, { "areaCode": "2123", "areaName": "汤阴县", "areaPinYin": "", "parentId": "236" }, { "areaCode": "2124", "areaName": "滑县", "areaPinYin": "", "parentId": "236" }, { "areaCode": "2125", "areaName": "龙安区", "areaPinYin": "", "parentId": "236" }, { "areaCode": "2126", "areaName": "卫东区", "areaPinYin": "", "parentId": "237" }, { "areaCode": "2127", "areaName": "叶县", "areaPinYin": "", "parentId": "237" }, { "areaCode": "2128", "areaName": "宝丰县", "areaPinYin": "", "parentId": "237" }, { "areaCode": "2129", "areaName": "新华区", "areaPinYin": "", "parentId": "237" }, { "areaCode": "2130", "areaName": "汝州市", "areaPinYin": "", "parentId": "237" }, { "areaCode": "2131", "areaName": "湛河区", "areaPinYin": "", "parentId": "237" }, { "areaCode": "2132", "areaName": "石龙区", "areaPinYin": "", "parentId": "237" }, { "areaCode": "2133", "areaName": "舞钢市", "areaPinYin": "", "parentId": "237" }, { "areaCode": "2134", "areaName": "郏县", "areaPinYin": "", "parentId": "237" }, { "areaCode": "2135", "areaName": "鲁山县", "areaPinYin": "", "parentId": "237" }, { "areaCode": "2136", "areaName": "兰考县", "areaPinYin": "", "parentId": "238" }, { "areaCode": "2137", "areaName": "尉氏县", "areaPinYin": "", "parentId": "238" }, { "areaCode": "2138", "areaName": "开封县", "areaPinYin": "", "parentId": "238" }, { "areaCode": "2139", "areaName": "杞县", "areaPinYin": "", "parentId": "238" }, { "areaCode": "2140", "areaName": "禹王台区", "areaPinYin": "", "parentId": "238" }, { "areaCode": "2141", "areaName": "通许县", "areaPinYin": "", "parentId": "238" }, { "areaCode": "2142", "areaName": "金明区", "areaPinYin": "", "parentId": "238" }, { "areaCode": "2143", "areaName": "顺河区", "areaPinYin": "", "parentId": "238" }, { "areaCode": "2144", "areaName": "鼓楼区", "areaPinYin": "", "parentId": "238" }, { "areaCode": "2145", "areaName": "龙亭区", "areaPinYin": "", "parentId": "238" }, { "areaCode": "2146", "areaName": "凤泉区", "areaPinYin": "", "parentId": "239" }, { "areaCode": "2147", "areaName": "卫滨区", "areaPinYin": "", "parentId": "239" }, { "areaCode": "2148", "areaName": "卫辉市", "areaPinYin": "", "parentId": "239" }, { "areaCode": "2149", "areaName": "原阳县", "areaPinYin": "", "parentId": "239" }, { "areaCode": "2150", "areaName": "封丘县", "areaPinYin": "", "parentId": "239" }, { "areaCode": "2151", "areaName": "延津县", "areaPinYin": "", "parentId": "239" }, { "areaCode": "2152", "areaName": "新乡县", "areaPinYin": "", "parentId": "239" }, { "areaCode": "2153", "areaName": "牧野区", "areaPinYin": "", "parentId": "239" }, { "areaCode": "2154", "areaName": "红旗区", "areaPinYin": "", "parentId": "239" }, { "areaCode": "2155", "areaName": "获嘉县", "areaPinYin": "", "parentId": "239" }, { "areaCode": "2156", "areaName": "辉县市", "areaPinYin": "", "parentId": "239" }, { "areaCode": "2157", "areaName": "长垣县", "areaPinYin": "", "parentId": "239" }, { "areaCode": "2158", "areaName": "伊川县", "areaPinYin": "", "parentId": "240" }, { "areaCode": "2159", "areaName": "伊滨区", "areaPinYin": "", "parentId": "240" }, { "areaCode": "2160", "areaName": "偃师市", "areaPinYin": "", "parentId": "240" }, { "areaCode": "2161", "areaName": "吉利区", "areaPinYin": "", "parentId": "240" }, { "areaCode": "2162", "areaName": "孟津县", "areaPinYin": "", "parentId": "240" }, { "areaCode": "2163", "areaName": "宜阳县", "areaPinYin": "", "parentId": "240" }, { "areaCode": "2164", "areaName": "嵩县", "areaPinYin": "", "parentId": "240" }, { "areaCode": "2165", "areaName": "新安县", "areaPinYin": "", "parentId": "240" }, { "areaCode": "2166", "areaName": "栾川县", "areaPinYin": "", "parentId": "240" }, { "areaCode": "2167", "areaName": "汝阳县", "areaPinYin": "", "parentId": "240" }, { "areaCode": "2168", "areaName": "洛宁县", "areaPinYin": "", "parentId": "240" }, { "areaCode": "2169", "areaName": "洛龙区", "areaPinYin": "", "parentId": "240" }, { "areaCode": "2170", "areaName": "涧西区", "areaPinYin": "", "parentId": "240" }, { "areaCode": "2171", "areaName": "瀍河区", "areaPinYin": "", "parentId": "240" }, { "areaCode": "2172", "areaName": "老城区", "areaPinYin": "", "parentId": "240" }, { "areaCode": "2173", "areaName": "西工区", "areaPinYin": "", "parentId": "240" }, { "areaCode": "2186", "areaName": "临颍县", "areaPinYin": "", "parentId": "242" }, { "areaCode": "2187", "areaName": "召陵区", "areaPinYin": "", "parentId": "242" }, { "areaCode": "2188", "areaName": "源汇区", "areaPinYin": "", "parentId": "242" }, { "areaCode": "2189", "areaName": "舞阳县", "areaPinYin": "", "parentId": "242" }, { "areaCode": "2190", "areaName": "郾城区", "areaPinYin": "", "parentId": "242" }, { "areaCode": "2191", "areaName": "华龙区", "areaPinYin": "", "parentId": "243" }, { "areaCode": "2192", "areaName": "南乐县", "areaPinYin": "", "parentId": "243" }, { "areaCode": "2193", "areaName": "台前县", "areaPinYin": "", "parentId": "243" }, { "areaCode": "2194", "areaName": "清丰县", "areaPinYin": "", "parentId": "243" }, { "areaCode": "2195", "areaName": "濮阳县", "areaPinYin": "", "parentId": "243" }, { "areaCode": "2196", "areaName": "范县", "areaPinYin": "", "parentId": "243" }, { "areaCode": "2197", "areaName": "中站区", "areaPinYin": "", "parentId": "244" }, { "areaCode": "2198", "areaName": "修武县", "areaPinYin": "", "parentId": "244" }, { "areaCode": "2199", "areaName": "博爱县", "areaPinYin": "", "parentId": "244" }, { "areaCode": "2200", "areaName": "孟州市", "areaPinYin": "", "parentId": "244" }, { "areaCode": "2201", "areaName": "山阳区", "areaPinYin": "", "parentId": "244" }, { "areaCode": "2202", "areaName": "武陟县", "areaPinYin": "", "parentId": "244" }, { "areaCode": "2203", "areaName": "沁阳市", "areaPinYin": "", "parentId": "244" }, { "areaCode": "2204", "areaName": "温县", "areaPinYin": "", "parentId": "244" }, { "areaCode": "2205", "areaName": "解放区", "areaPinYin": "", "parentId": "244" }, { "areaCode": "2206", "areaName": "马村区", "areaPinYin": "", "parentId": "244" }, { "areaCode": "2207", "areaName": "禹州市", "areaPinYin": "", "parentId": "245" }, { "areaCode": "2208", "areaName": "襄城县", "areaPinYin": "", "parentId": "245" }, { "areaCode": "2209", "areaName": "许昌县", "areaPinYin": "", "parentId": "245" }, { "areaCode": "2210", "areaName": "鄢陵县", "areaPinYin": "", "parentId": "245" }, { "areaCode": "2211", "areaName": "长葛市", "areaPinYin": "", "parentId": "245" }, { "areaCode": "2212", "areaName": "魏都区", "areaPinYin": "", "parentId": "245" }, { "areaCode": "2213", "areaName": "上街区", "areaPinYin": "", "parentId": "246" }, { "areaCode": "2214", "areaName": "中原区", "areaPinYin": "", "parentId": "246" }, { "areaCode": "2215", "areaName": "中牟县", "areaPinYin": "", "parentId": "246" }, { "areaCode": "2216", "areaName": "二七区", "areaPinYin": "", "parentId": "246" }, { "areaCode": "2217", "areaName": "巩义市", "areaPinYin": "", "parentId": "246" }, { "areaCode": "2218", "areaName": "惠济区", "areaPinYin": "", "parentId": "246" }, { "areaCode": "2219", "areaName": "新密市", "areaPinYin": "", "parentId": "246" }, { "areaCode": "2220", "areaName": "新郑市", "areaPinYin": "", "parentId": "246" }, { "areaCode": "2221", "areaName": "登封市", "areaPinYin": "", "parentId": "246" }, { "areaCode": "2222", "areaName": "管城区", "areaPinYin": "", "parentId": "246" }, { "areaCode": "2223", "areaName": "经济开发区", "areaPinYin": "", "parentId": "246" }, { "areaCode": "2224", "areaName": "荥阳市", "areaPinYin": "", "parentId": "246" }, { "areaCode": "2225", "areaName": "郑东新区", "areaPinYin": "", "parentId": "246" }, { "areaCode": "2226", "areaName": "金水区", "areaPinYin": "", "parentId": "246" }, { "areaCode": "2227", "areaName": "高新技术开发区", "areaPinYin": "", "parentId": "246" }, { "areaCode": "2228", "areaName": "上蔡县", "areaPinYin": "", "parentId": "247" }, { "areaCode": "2229", "areaName": "平舆县", "areaPinYin": "", "parentId": "247" }, { "areaCode": "2230", "areaName": "新蔡县", "areaPinYin": "", "parentId": "247" }, { "areaCode": "2231", "areaName": "正阳县", "areaPinYin": "", "parentId": "247" }, { "areaCode": "2232", "areaName": "汝南县", "areaPinYin": "", "parentId": "247" }, { "areaCode": "2233", "areaName": "泌阳县", "areaPinYin": "", "parentId": "247" }, { "areaCode": "2234", "areaName": "确山县", "areaPinYin": "", "parentId": "247" }, { "areaCode": "2235", "areaName": "西平县", "areaPinYin": "", "parentId": "247" }, { "areaCode": "2236", "areaName": "遂平县", "areaPinYin": "", "parentId": "247" }, { "areaCode": "2237", "areaName": "驿城区", "areaPinYin": "", "parentId": "247" }, { "areaCode": "2238", "areaName": "山城区", "areaPinYin": "", "parentId": "248" }, { "areaCode": "2239", "areaName": "浚县", "areaPinYin": "", "parentId": "248" }, { "areaCode": "2240", "areaName": "淇县", "areaPinYin": "", "parentId": "248" }, { "areaCode": "2241", "areaName": "淇滨区", "areaPinYin": "", "parentId": "248" }, { "areaCode": "2242", "areaName": "鹤山区", "areaPinYin": "", "parentId": "248" }, { "areaCode": "2243", "areaName": "云和县", "areaPinYin": "", "parentId": "249" }, { "areaCode": "2244", "areaName": "庆元县", "areaPinYin": "", "parentId": "249" }, { "areaCode": "2245", "areaName": "景宁县", "areaPinYin": "", "parentId": "249" }, { "areaCode": "2246", "areaName": "松阳县", "areaPinYin": "", "parentId": "249" }, { "areaCode": "2247", "areaName": "缙云县", "areaPinYin": "", "parentId": "249" }, { "areaCode": "2248", "areaName": "莲都区", "areaPinYin": "", "parentId": "249" }, { "areaCode": "2249", "areaName": "遂昌县", "areaPinYin": "", "parentId": "249" }, { "areaCode": "2250", "areaName": "青田县", "areaPinYin": "", "parentId": "249" }, { "areaCode": "2251", "areaName": "龙泉市", "areaPinYin": "", "parentId": "249" }, { "areaCode": "2252", "areaName": "三门县", "areaPinYin": "", "parentId": "250" }, { "areaCode": "2253", "areaName": "临海市", "areaPinYin": "", "parentId": "250" }, { "areaCode": "2254", "areaName": "仙居县", "areaPinYin": "", "parentId": "250" }, { "areaCode": "2255", "areaName": "天台县", "areaPinYin": "", "parentId": "250" }, { "areaCode": "2256", "areaName": "椒江区", "areaPinYin": "", "parentId": "250" }, { "areaCode": "2257", "areaName": "温岭市", "areaPinYin": "", "parentId": "250" }, { "areaCode": "2258", "areaName": "玉环县", "areaPinYin": "", "parentId": "250" }, { "areaCode": "2259", "areaName": "路桥区", "areaPinYin": "", "parentId": "250" }, { "areaCode": "2260", "areaName": "黄岩区", "areaPinYin": "", "parentId": "250" }, { "areaCode": "2261", "areaName": "南湖区", "areaPinYin": "", "parentId": "251" }, { "areaCode": "2262", "areaName": "嘉善县", "areaPinYin": "", "parentId": "251" }, { "areaCode": "2263", "areaName": "平湖市", "areaPinYin": "", "parentId": "251" }, { "areaCode": "2264", "areaName": "桐乡市", "areaPinYin": "", "parentId": "251" }, { "areaCode": "2265", "areaName": "海宁市", "areaPinYin": "", "parentId": "251" }, { "areaCode": "2266", "areaName": "海盐县", "areaPinYin": "", "parentId": "251" }, { "areaCode": "2267", "areaName": "秀洲区", "areaPinYin": "", "parentId": "251" }, { "areaCode": "2268", "areaName": "余姚市", "areaPinYin": "", "parentId": "252" }, { "areaCode": "2269", "areaName": "北仑区", "areaPinYin": "", "parentId": "252" }, { "areaCode": "2270", "areaName": "奉化市", "areaPinYin": "", "parentId": "252" }, { "areaCode": "2271", "areaName": "宁海县", "areaPinYin": "", "parentId": "252" }, { "areaCode": "2272", "areaName": "慈溪市", "areaPinYin": "", "parentId": "252" }, { "areaCode": "2273", "areaName": "江东区", "areaPinYin": "", "parentId": "252" }, { "areaCode": "2274", "areaName": "江北区", "areaPinYin": "", "parentId": "252" }, { "areaCode": "2275", "areaName": "海曙区", "areaPinYin": "", "parentId": "252" }, { "areaCode": "2276", "areaName": "象山县", "areaPinYin": "", "parentId": "252" }, { "areaCode": "2277", "areaName": "鄞州区", "areaPinYin": "", "parentId": "252" }, { "areaCode": "2278", "areaName": "镇海区", "areaPinYin": "", "parentId": "252" }, { "areaCode": "2279", "areaName": "高新科技开发区", "areaPinYin": "", "parentId": "252" }, { "areaCode": "2280", "areaName": "上城区", "areaPinYin": "", "parentId": "253" }, { "areaCode": "2281", "areaName": "下城区", "areaPinYin": "", "parentId": "253" }, { "areaCode": "2282", "areaName": "下沙区", "areaPinYin": "", "parentId": "253" }, { "areaCode": "2283", "areaName": "临安市", "areaPinYin": "", "parentId": "253" }, { "areaCode": "2284", "areaName": "余杭区", "areaPinYin": "", "parentId": "253" }, { "areaCode": "2285", "areaName": "富阳市", "areaPinYin": "", "parentId": "253" }, { "areaCode": "2286", "areaName": "建德市", "areaPinYin": "", "parentId": "253" }, { "areaCode": "2287", "areaName": "拱墅区", "areaPinYin": "", "parentId": "253" }, { "areaCode": "2288", "areaName": "桐庐县", "areaPinYin": "", "parentId": "253" }, { "areaCode": "2289", "areaName": "江干区", "areaPinYin": "", "parentId": "253" }, { "areaCode": "2290", "areaName": "淳安县", "areaPinYin": "", "parentId": "253" }, { "areaCode": "2291", "areaName": "滨江区", "areaPinYin": "", "parentId": "253" }, { "areaCode": "2292", "areaName": "萧山区", "areaPinYin": "", "parentId": "253" }, { "areaCode": "2293", "areaName": "西湖区", "areaPinYin": "", "parentId": "253" }, { "areaCode": "2294", "areaName": "乐清市", "areaPinYin": "", "parentId": "254" }, { "areaCode": "2295", "areaName": "平阳县", "areaPinYin": "", "parentId": "254" }, { "areaCode": "2296", "areaName": "文成县", "areaPinYin": "", "parentId": "254" }, { "areaCode": "2297", "areaName": "永嘉县", "areaPinYin": "", "parentId": "254" }, { "areaCode": "2298", "areaName": "泰顺县", "areaPinYin": "", "parentId": "254" }, { "areaCode": "2299", "areaName": "洞头县", "areaPinYin": "", "parentId": "254" }, { "areaCode": "2300", "areaName": "瑞安市", "areaPinYin": "", "parentId": "254" }, { "areaCode": "2301", "areaName": "瓯海区", "areaPinYin": "", "parentId": "254" }, { "areaCode": "2302", "areaName": "苍南县", "areaPinYin": "", "parentId": "254" }, { "areaCode": "2303", "areaName": "茶山高教园区", "areaPinYin": "", "parentId": "254" }, { "areaCode": "2304", "areaName": "鹿城区", "areaPinYin": "", "parentId": "254" }, { "areaCode": "2305", "areaName": "龙湾区", "areaPinYin": "", "parentId": "254" }, { "areaCode": "2306", "areaName": "南浔区", "areaPinYin": "", "parentId": "255" }, { "areaCode": "2307", "areaName": "吴兴区", "areaPinYin": "", "parentId": "255" }, { "areaCode": "2308", "areaName": "安吉县", "areaPinYin": "", "parentId": "255" }, { "areaCode": "2309", "areaName": "德清县", "areaPinYin": "", "parentId": "255" }, { "areaCode": "2310", "areaName": "长兴县", "areaPinYin": "", "parentId": "255" }, { "areaCode": "2311", "areaName": "上虞区", "areaPinYin": "", "parentId": "256" }, { "areaCode": "2312", "areaName": "嵊州市", "areaPinYin": "", "parentId": "256" }, { "areaCode": "2313", "areaName": "新昌县", "areaPinYin": "", "parentId": "256" }, { "areaCode": "2314", "areaName": "柯桥区", "areaPinYin": "", "parentId": "256" }, { "areaCode": "2315", "areaName": "诸暨市", "areaPinYin": "", "parentId": "256" }, { "areaCode": "2316", "areaName": "越城区", "areaPinYin": "", "parentId": "256" }, { "areaCode": "2317", "areaName": "定海区", "areaPinYin": "", "parentId": "257" }, { "areaCode": "2318", "areaName": "岱山县", "areaPinYin": "", "parentId": "257" }, { "areaCode": "2319", "areaName": "嵊泗县", "areaPinYin": "", "parentId": "257" }, { "areaCode": "2320", "areaName": "普陀区", "areaPinYin": "", "parentId": "257" }, { "areaCode": "2321", "areaName": "常山县", "areaPinYin": "", "parentId": "258" }, { "areaCode": "2322", "areaName": "开化县", "areaPinYin": "", "parentId": "258" }, { "areaCode": "2323", "areaName": "柯城区", "areaPinYin": "", "parentId": "258" }, { "areaCode": "2324", "areaName": "江山市", "areaPinYin": "", "parentId": "258" }, { "areaCode": "2325", "areaName": "衢江区", "areaPinYin": "", "parentId": "258" }, { "areaCode": "2326", "areaName": "龙游县", "areaPinYin": "", "parentId": "258" }, { "areaCode": "2327", "areaName": "东阳市", "areaPinYin": "", "parentId": "259" }, { "areaCode": "2328", "areaName": "义乌市", "areaPinYin": "", "parentId": "259" }, { "areaCode": "2329", "areaName": "兰溪市", "areaPinYin": "", "parentId": "259" }, { "areaCode": "2330", "areaName": "婺城区", "areaPinYin": "", "parentId": "259" }, { "areaCode": "2331", "areaName": "武义县", "areaPinYin": "", "parentId": "259" }, { "areaCode": "2332", "areaName": "永康市", "areaPinYin": "", "parentId": "259" }, { "areaCode": "2333", "areaName": "浦江县", "areaPinYin": "", "parentId": "259" }, { "areaCode": "2334", "areaName": "磐安县", "areaPinYin": "", "parentId": "259" }, { "areaCode": "2335", "areaName": "金东区", "areaPinYin": "", "parentId": "259" }, { "areaCode": "2635", "areaName": "丹江口市", "areaPinYin": "", "parentId": "280" }, { "areaCode": "2636", "areaName": "张湾区", "areaPinYin": "", "parentId": "280" }, { "areaCode": "2637", "areaName": "房县", "areaPinYin": "", "parentId": "280" }, { "areaCode": "2638", "areaName": "竹山县", "areaPinYin": "", "parentId": "280" }, { "areaCode": "2639", "areaName": "竹溪县", "areaPinYin": "", "parentId": "280" }, { "areaCode": "2640", "areaName": "茅箭区", "areaPinYin": "", "parentId": "280" }, { "areaCode": "2641", "areaName": "郧县", "areaPinYin": "", "parentId": "280" }, { "areaCode": "2642", "areaName": "郧西县", "areaPinYin": "", "parentId": "280" }, { "areaCode": "2643", "areaName": "咸安区", "areaPinYin": "", "parentId": "281" }, { "areaCode": "2644", "areaName": "嘉鱼县", "areaPinYin": "", "parentId": "281" }, { "areaCode": "2645", "areaName": "崇阳县", "areaPinYin": "", "parentId": "281" }, { "areaCode": "2646", "areaName": "赤壁市", "areaPinYin": "", "parentId": "281" }, { "areaCode": "2647", "areaName": "通城县", "areaPinYin": "", "parentId": "281" }, { "areaCode": "2648", "areaName": "通山县", "areaPinYin": "", "parentId": "281" }, { "areaCode": "2677", "areaName": "云梦县", "areaPinYin": "", "parentId": "283" }, { "areaCode": "2678", "areaName": "大悟县", "areaPinYin": "", "parentId": "283" }, { "areaCode": "2679", "areaName": "孝南区", "areaPinYin": "", "parentId": "283" }, { "areaCode": "2680", "areaName": "孝昌县", "areaPinYin": "", "parentId": "283" }, { "areaCode": "2681", "areaName": "安陆市", "areaPinYin": "", "parentId": "283" }, { "areaCode": "2682", "areaName": "应城市", "areaPinYin": "", "parentId": "283" }, { "areaCode": "2683", "areaName": "汉川市", "areaPinYin": "", "parentId": "283" }, { "areaCode": "2684", "areaName": "五峰土家族自治县", "areaPinYin": "", "parentId": "284" }, { "areaCode": "2685", "areaName": "伍家岗区", "areaPinYin": "", "parentId": "284" }, { "areaCode": "2686", "areaName": "兴山县", "areaPinYin": "", "parentId": "284" }, { "areaCode": "2687", "areaName": "夷陵区", "areaPinYin": "", "parentId": "284" }, { "areaCode": "2688", "areaName": "宜都市", "areaPinYin": "", "parentId": "284" }, { "areaCode": "2689", "areaName": "当阳市", "areaPinYin": "", "parentId": "284" }, { "areaCode": "2690", "areaName": "枝江市", "areaPinYin": "", "parentId": "284" }, { "areaCode": "2691", "areaName": "点军区", "areaPinYin": "", "parentId": "284" }, { "areaCode": "2692", "areaName": "猇亭区", "areaPinYin": "", "parentId": "284" }, { "areaCode": "2693", "areaName": "秭归县", "areaPinYin": "", "parentId": "284" }, { "areaCode": "2694", "areaName": "西陵区", "areaPinYin": "", "parentId": "284" }, { "areaCode": "2695", "areaName": "远安县", "areaPinYin": "", "parentId": "284" }, { "areaCode": "2696", "areaName": "长阳土家族自治县", "areaPinYin": "", "parentId": "284" }, { "areaCode": "2697", "areaName": "利川市", "areaPinYin": "", "parentId": "285" }, { "areaCode": "2698", "areaName": "咸丰县", "areaPinYin": "", "parentId": "285" }, { "areaCode": "2699", "areaName": "宣恩县", "areaPinYin": "", "parentId": "285" }, { "areaCode": "2700", "areaName": "巴东县", "areaPinYin": "", "parentId": "285" }, { "areaCode": "2701", "areaName": "建始县", "areaPinYin": "", "parentId": "285" }, { "areaCode": "2702", "areaName": "恩施市", "areaPinYin": "", "parentId": "285" }, { "areaCode": "2703", "areaName": "来凤县", "areaPinYin": "", "parentId": "285" }, { "areaCode": "2704", "areaName": "鹤峰县", "areaPinYin": "", "parentId": "285" }, { "areaCode": "2705", "areaName": "东西湖区", "areaPinYin": "", "parentId": "286" }, { "areaCode": "2706", "areaName": "新洲区", "areaPinYin": "", "parentId": "286" }, { "areaCode": "2707", "areaName": "武昌区", "areaPinYin": "", "parentId": "286" }, { "areaCode": "2708", "areaName": "武汉经济技术开发区", "areaPinYin": "", "parentId": "286" }, { "areaCode": "2709", "areaName": "汉南区", "areaPinYin": "", "parentId": "286" }, { "areaCode": "2710", "areaName": "汉阳区", "areaPinYin": "", "parentId": "286" }, { "areaCode": "2711", "areaName": "江夏区", "areaPinYin": "", "parentId": "286" }, { "areaCode": "2712", "areaName": "江岸区", "areaPinYin": "", "parentId": "286" }, { "areaCode": "2713", "areaName": "江汉区", "areaPinYin": "", "parentId": "286" }, { "areaCode": "2714", "areaName": "洪山区", "areaPinYin": "", "parentId": "286" }, { "areaCode": "2715", "areaName": "硚口区", "areaPinYin": "", "parentId": "286" }, { "areaCode": "2716", "areaName": "蔡甸区", "areaPinYin": "", "parentId": "286" }, { "areaCode": "2717", "areaName": "青山区", "areaPinYin": "", "parentId": "286" }, { "areaCode": "2718", "areaName": "黄陂区", "areaPinYin": "", "parentId": "286" }, { "areaCode": "2752", "areaName": "公安县", "areaPinYin": "", "parentId": "289" }, { "areaCode": "2753", "areaName": "松滋市", "areaPinYin": "", "parentId": "289" }, { "areaCode": "2754", "areaName": "江陵县", "areaPinYin": "", "parentId": "289" }, { "areaCode": "2755", "areaName": "沙市区", "areaPinYin": "", "parentId": "289" }, { "areaCode": "2756", "areaName": "洪湖市", "areaPinYin": "", "parentId": "289" }, { "areaCode": "2757", "areaName": "监利县", "areaPinYin": "", "parentId": "289" }, { "areaCode": "2758", "areaName": "石首市", "areaPinYin": "", "parentId": "289" }, { "areaCode": "2759", "areaName": "荆州区", "areaPinYin": "", "parentId": "289" }, { "areaCode": "2760", "areaName": "东宝区", "areaPinYin": "", "parentId": "290" }, { "areaCode": "2761", "areaName": "京山县", "areaPinYin": "", "parentId": "290" }, { "areaCode": "2762", "areaName": "掇刀区", "areaPinYin": "", "parentId": "290" }, { "areaCode": "2763", "areaName": "沙洋县", "areaPinYin": "", "parentId": "290" }, { "areaCode": "2764", "areaName": "钟祥市", "areaPinYin": "", "parentId": "290" }, { "areaCode": "2765", "areaName": "保康县", "areaPinYin": "", "parentId": "291" }, { "areaCode": "2766", "areaName": "南漳县", "areaPinYin": "", "parentId": "291" }, { "areaCode": "2767", "areaName": "宜城市", "areaPinYin": "", "parentId": "291" }, { "areaCode": "2768", "areaName": "枣阳市", "areaPinYin": "", "parentId": "291" }, { "areaCode": "2769", "areaName": "樊城区", "areaPinYin": "", "parentId": "291" }, { "areaCode": "2770", "areaName": "老河口市", "areaPinYin": "", "parentId": "291" }, { "areaCode": "2771", "areaName": "襄城区", "areaPinYin": "", "parentId": "291" }, { "areaCode": "2772", "areaName": "襄州区", "areaPinYin": "", "parentId": "291" }, { "areaCode": "2773", "areaName": "谷城县", "areaPinYin": "", "parentId": "291" }, { "areaCode": "2774", "areaName": "华容区", "areaPinYin": "", "parentId": "292" }, { "areaCode": "2775", "areaName": "梁子湖区", "areaPinYin": "", "parentId": "292" }, { "areaCode": "2776", "areaName": "鄂城区", "areaPinYin": "", "parentId": "292" }, { "areaCode": "2777", "areaName": "广水市", "areaPinYin": "", "parentId": "293" }, { "areaCode": "2778", "areaName": "曾都区", "areaPinYin": "", "parentId": "293" }, { "areaCode": "2779", "areaName": "随县", "areaPinYin": "", "parentId": "293" }, { "areaCode": "2780", "areaName": "团风县", "areaPinYin": "", "parentId": "294" }, { "areaCode": "2781", "areaName": "武穴市", "areaPinYin": "", "parentId": "294" }, { "areaCode": "2782", "areaName": "浠水县", "areaPinYin": "", "parentId": "294" }, { "areaCode": "2783", "areaName": "红安县", "areaPinYin": "", "parentId": "294" }, { "areaCode": "2784", "areaName": "罗田县", "areaPinYin": "", "parentId": "294" }, { "areaCode": "2785", "areaName": "英山县", "areaPinYin": "", "parentId": "294" }, { "areaCode": "2786", "areaName": "蕲春县", "areaPinYin": "", "parentId": "294" }, { "areaCode": "2787", "areaName": "麻城市", "areaPinYin": "", "parentId": "294" }, { "areaCode": "2788", "areaName": "黄州区", "areaPinYin": "", "parentId": "294" }, { "areaCode": "2789", "areaName": "黄梅县", "areaPinYin": "", "parentId": "294" }, { "areaCode": "2790", "areaName": "下陆区", "areaPinYin": "", "parentId": "295" }, { "areaCode": "2791", "areaName": "大冶市", "areaPinYin": "", "parentId": "295" }, { "areaCode": "2792", "areaName": "经济技术开发区", "areaPinYin": "", "parentId": "295" }, { "areaCode": "2793", "areaName": "西塞山区", "areaPinYin": "", "parentId": "295" }, { "areaCode": "2794", "areaName": "铁山区", "areaPinYin": "", "parentId": "295" }, { "areaCode": "2795", "areaName": "阳新县", "areaPinYin": "", "parentId": "295" }, { "areaCode": "2796", "areaName": "黄石港区", "areaPinYin": "", "parentId": "295" }, { "areaCode": "2797", "areaName": "冷水江市", "areaPinYin": "", "parentId": "296" }, { "areaCode": "2798", "areaName": "双峰县", "areaPinYin": "", "parentId": "296" }, { "areaCode": "2799", "areaName": "娄星区", "areaPinYin": "", "parentId": "296" }, { "areaCode": "2800", "areaName": "新化县", "areaPinYin": "", "parentId": "296" }, { "areaCode": "2801", "areaName": "涟源市", "areaPinYin": "", "parentId": "296" }, { "areaCode": "2802", "areaName": "临湘市", "areaPinYin": "", "parentId": "297" }, { "areaCode": "2803", "areaName": "云溪区", "areaPinYin": "", "parentId": "297" }, { "areaCode": "2804", "areaName": "华容县", "areaPinYin": "", "parentId": "297" }, { "areaCode": "2805", "areaName": "君山区", "areaPinYin": "", "parentId": "297" }, { "areaCode": "2806", "areaName": "岳阳县", "areaPinYin": "", "parentId": "297" }, { "areaCode": "2807", "areaName": "岳阳楼区", "areaPinYin": "", "parentId": "297" }, { "areaCode": "2808", "areaName": "平江县", "areaPinYin": "", "parentId": "297" }, { "areaCode": "2809", "areaName": "汨罗市", "areaPinYin": "", "parentId": "297" }, { "areaCode": "2810", "areaName": "湘阴县", "areaPinYin": "", "parentId": "297" }, { "areaCode": "2811", "areaName": "临澧县", "areaPinYin": "", "parentId": "298" }, { "areaCode": "2812", "areaName": "安乡县", "areaPinYin": "", "parentId": "298" }, { "areaCode": "2813", "areaName": "桃源县", "areaPinYin": "", "parentId": "298" }, { "areaCode": "2814", "areaName": "武陵区", "areaPinYin": "", "parentId": "298" }, { "areaCode": "2815", "areaName": "汉寿县", "areaPinYin": "", "parentId": "298" }, { "areaCode": "2816", "areaName": "津市市", "areaPinYin": "", "parentId": "298" }, { "areaCode": "2817", "areaName": "澧县", "areaPinYin": "", "parentId": "298" }, { "areaCode": "2818", "areaName": "石门县", "areaPinYin": "", "parentId": "298" }, { "areaCode": "2819", "areaName": "鼎城区", "areaPinYin": "", "parentId": "298" }, { "areaCode": "2820", "areaName": "慈利县", "areaPinYin": "", "parentId": "299" }, { "areaCode": "2821", "areaName": "桑植县", "areaPinYin": "", "parentId": "299" }, { "areaCode": "2822", "areaName": "武陵源区", "areaPinYin": "", "parentId": "299" }, { "areaCode": "2823", "areaName": "永定区", "areaPinYin": "", "parentId": "299" }, { "areaCode": "2824", "areaName": "中方县", "areaPinYin": "", "parentId": "300" }, { "areaCode": "2825", "areaName": "会同县", "areaPinYin": "", "parentId": "300" }, { "areaCode": "2826", "areaName": "新晃县", "areaPinYin": "", "parentId": "300" }, { "areaCode": "2827", "areaName": "沅陵县", "areaPinYin": "", "parentId": "300" }, { "areaCode": "2828", "areaName": "洪江市", "areaPinYin": "", "parentId": "300" }, { "areaCode": "2829", "areaName": "溆浦县", "areaPinYin": "", "parentId": "300" }, { "areaCode": "2830", "areaName": "芷江县", "areaPinYin": "", "parentId": "300" }, { "areaCode": "2831", "areaName": "辰溪县", "areaPinYin": "", "parentId": "300" }, { "areaCode": "2832", "areaName": "通道县", "areaPinYin": "", "parentId": "300" }, { "areaCode": "2833", "areaName": "靖州县", "areaPinYin": "", "parentId": "300" }, { "areaCode": "2834", "areaName": "鹤城区", "areaPinYin": "", "parentId": "300" }, { "areaCode": "2835", "areaName": "麻阳县", "areaPinYin": "", "parentId": "300" }, { "areaCode": "2836", "areaName": "天元区", "areaPinYin": "", "parentId": "301" }, { "areaCode": "2837", "areaName": "攸县", "areaPinYin": "", "parentId": "301" }, { "areaCode": "2838", "areaName": "株洲县", "areaPinYin": "", "parentId": "301" }, { "areaCode": "2839", "areaName": "炎陵县", "areaPinYin": "", "parentId": "301" }, { "areaCode": "2840", "areaName": "石峰区", "areaPinYin": "", "parentId": "301" }, { "areaCode": "2841", "areaName": "芦淞区", "areaPinYin": "", "parentId": "301" }, { "areaCode": "2842", "areaName": "茶陵县", "areaPinYin": "", "parentId": "301" }, { "areaCode": "2843", "areaName": "荷塘区", "areaPinYin": "", "parentId": "301" }, { "areaCode": "2844", "areaName": "醴陵市", "areaPinYin": "", "parentId": "301" }, { "areaCode": "2845", "areaName": "东安县", "areaPinYin": "", "parentId": "302" }, { "areaCode": "2846", "areaName": "冷水滩区", "areaPinYin": "", "parentId": "302" }, { "areaCode": "2847", "areaName": "双牌县", "areaPinYin": "", "parentId": "302" }, { "areaCode": "2848", "areaName": "宁远县", "areaPinYin": "", "parentId": "302" }, { "areaCode": "2849", "areaName": "新田县", "areaPinYin": "", "parentId": "302" }, { "areaCode": "2850", "areaName": "江华县", "areaPinYin": "", "parentId": "302" }, { "areaCode": "2851", "areaName": "江永县", "areaPinYin": "", "parentId": "302" }, { "areaCode": "2852", "areaName": "祁阳县", "areaPinYin": "", "parentId": "302" }, { "areaCode": "2853", "areaName": "蓝山县", "areaPinYin": "", "parentId": "302" }, { "areaCode": "2854", "areaName": "道县", "areaPinYin": "", "parentId": "302" }, { "areaCode": "2855", "areaName": "零陵区", "areaPinYin": "", "parentId": "302" }, { "areaCode": "2856", "areaName": "岳塘区", "areaPinYin": "", "parentId": "303" }, { "areaCode": "2857", "areaName": "湘乡市", "areaPinYin": "", "parentId": "303" }, { "areaCode": "2858", "areaName": "湘潭县", "areaPinYin": "", "parentId": "303" }, { "areaCode": "2859", "areaName": "雨湖区", "areaPinYin": "", "parentId": "303" }, { "areaCode": "2860", "areaName": "韶山市", "areaPinYin": "", "parentId": "303" }, { "areaCode": "2861", "areaName": "保靖县", "areaPinYin": "", "parentId": "304" }, { "areaCode": "2862", "areaName": "凤凰县", "areaPinYin": "", "parentId": "304" }, { "areaCode": "2863", "areaName": "古丈县", "areaPinYin": "", "parentId": "304" }, { "areaCode": "2864", "areaName": "吉首市", "areaPinYin": "", "parentId": "304" }, { "areaCode": "2865", "areaName": "永顺县", "areaPinYin": "", "parentId": "304" }, { "areaCode": "2866", "areaName": "泸溪县", "areaPinYin": "", "parentId": "304" }, { "areaCode": "2867", "areaName": "花垣县", "areaPinYin": "", "parentId": "304" }, { "areaCode": "2868", "areaName": "龙山县", "areaPinYin": "", "parentId": "304" }, { "areaCode": "2869", "areaName": "南县", "areaPinYin": "", "parentId": "305" }, { "areaCode": "2870", "areaName": "安化县", "areaPinYin": "", "parentId": "305" }, { "areaCode": "2871", "areaName": "桃江县", "areaPinYin": "", "parentId": "305" }, { "areaCode": "2872", "areaName": "沅江市", "areaPinYin": "", "parentId": "305" }, { "areaCode": "2873", "areaName": "资阳区", "areaPinYin": "", "parentId": "305" }, { "areaCode": "2874", "areaName": "赫山区", "areaPinYin": "", "parentId": "305" }, { "areaCode": "2875", "areaName": "南岳区", "areaPinYin": "", "parentId": "306" }, { "areaCode": "2876", "areaName": "常宁市", "areaPinYin": "", "parentId": "306" }, { "areaCode": "2877", "areaName": "珠晖区", "areaPinYin": "", "parentId": "306" }, { "areaCode": "2878", "areaName": "石鼓区", "areaPinYin": "", "parentId": "306" }, { "areaCode": "2879", "areaName": "祁东县", "areaPinYin": "", "parentId": "306" }, { "areaCode": "2880", "areaName": "耒阳市", "areaPinYin": "", "parentId": "306" }, { "areaCode": "2881", "areaName": "蒸湘区", "areaPinYin": "", "parentId": "306" }, { "areaCode": "2882", "areaName": "衡东县", "areaPinYin": "", "parentId": "306" }, { "areaCode": "2883", "areaName": "衡南县", "areaPinYin": "", "parentId": "306" }, { "areaCode": "2884", "areaName": "衡山县", "areaPinYin": "", "parentId": "306" }, { "areaCode": "2885", "areaName": "衡阳县", "areaPinYin": "", "parentId": "306" }, { "areaCode": "2886", "areaName": "雁峰区", "areaPinYin": "", "parentId": "306" }, { "areaCode": "2887", "areaName": "北塔区", "areaPinYin": "", "parentId": "307" }, { "areaCode": "2888", "areaName": "双清区", "areaPinYin": "", "parentId": "307" }, { "areaCode": "2889", "areaName": "城步县", "areaPinYin": "", "parentId": "307" }, { "areaCode": "2890", "areaName": "大祥区", "areaPinYin": "", "parentId": "307" }, { "areaCode": "2891", "areaName": "新宁县", "areaPinYin": "", "parentId": "307" }, { "areaCode": "2892", "areaName": "新邵县", "areaPinYin": "", "parentId": "307" }, { "areaCode": "2893", "areaName": "武冈市", "areaPinYin": "", "parentId": "307" }, { "areaCode": "2894", "areaName": "洞口县", "areaPinYin": "", "parentId": "307" }, { "areaCode": "2895", "areaName": "绥宁县", "areaPinYin": "", "parentId": "307" }, { "areaCode": "2896", "areaName": "邵东县", "areaPinYin": "", "parentId": "307" }, { "areaCode": "2897", "areaName": "邵阳县", "areaPinYin": "", "parentId": "307" }, { "areaCode": "2898", "areaName": "隆回县", "areaPinYin": "", "parentId": "307" }, { "areaCode": "2899", "areaName": "临武县", "areaPinYin": "", "parentId": "308" }, { "areaCode": "2900", "areaName": "北湖区", "areaPinYin": "", "parentId": "308" }, { "areaCode": "2901", "areaName": "嘉禾县", "areaPinYin": "", "parentId": "308" }, { "areaCode": "2902", "areaName": "安仁县", "areaPinYin": "", "parentId": "308" }, { "areaCode": "2903", "areaName": "宜章县", "areaPinYin": "", "parentId": "308" }, { "areaCode": "2904", "areaName": "桂东县", "areaPinYin": "", "parentId": "308" }, { "areaCode": "2905", "areaName": "桂阳县", "areaPinYin": "", "parentId": "308" }, { "areaCode": "2906", "areaName": "永兴县", "areaPinYin": "", "parentId": "308" }, { "areaCode": "2907", "areaName": "汝城县", "areaPinYin": "", "parentId": "308" }, { "areaCode": "2908", "areaName": "苏仙区", "areaPinYin": "", "parentId": "308" }, { "areaCode": "2909", "areaName": "资兴市", "areaPinYin": "", "parentId": "308" }, { "areaCode": "2910", "areaName": "天心区", "areaPinYin": "", "parentId": "309" }, { "areaCode": "2911", "areaName": "宁乡县", "areaPinYin": "", "parentId": "309" }, { "areaCode": "2912", "areaName": "岳麓区", "areaPinYin": "", "parentId": "309" }, { "areaCode": "2913", "areaName": "开福区", "areaPinYin": "", "parentId": "309" }, { "areaCode": "2914", "areaName": "望城区", "areaPinYin": "", "parentId": "309" }, { "areaCode": "2915", "areaName": "浏阳市", "areaPinYin": "", "parentId": "309" }, { "areaCode": "2916", "areaName": "芙蓉区", "areaPinYin": "", "parentId": "309" }, { "areaCode": "2917", "areaName": "长沙县", "areaPinYin": "", "parentId": "309" }, { "areaCode": "2918", "areaName": "雨花区", "areaPinYin": "", "parentId": "309" }, { "areaCode": "2919", "areaName": "韶山市区内", "areaPinYin": "", "parentId": "310" }, { "areaCode": "2920", "areaName": "东乡族自治县", "areaPinYin": "", "parentId": "311" }, { "areaCode": "2921", "areaName": "临夏县", "areaPinYin": "", "parentId": "311" }, { "areaCode": "2922", "areaName": "临夏市", "areaPinYin": "", "parentId": "311" }, { "areaCode": "2923", "areaName": "和政县", "areaPinYin": "", "parentId": "311" }, { "areaCode": "2924", "areaName": "广河县", "areaPinYin": "", "parentId": "311" }, { "areaCode": "2925", "areaName": "康乐县", "areaPinYin": "", "parentId": "311" }, { "areaCode": "2926", "areaName": "永靖县", "areaPinYin": "", "parentId": "311" }, { "areaCode": "2927", "areaName": "积石山县", "areaPinYin": "", "parentId": "311" }, { "areaCode": "2928", "areaName": "七里河区", "areaPinYin": "", "parentId": "312" }, { "areaCode": "2929", "areaName": "城关区", "areaPinYin": "", "parentId": "312" }, { "areaCode": "2930", "areaName": "安宁区", "areaPinYin": "", "parentId": "312" }, { "areaCode": "2931", "areaName": "榆中县", "areaPinYin": "", "parentId": "312" }, { "areaCode": "2932", "areaName": "永登县", "areaPinYin": "", "parentId": "312" }, { "areaCode": "2933", "areaName": "皋兰县", "areaPinYin": "", "parentId": "312" }, { "areaCode": "2934", "areaName": "红古区", "areaPinYin": "", "parentId": "312" }, { "areaCode": "2935", "areaName": "西固区", "areaPinYin": "", "parentId": "312" }, { "areaCode": "2936", "areaName": "镜铁区", "areaPinYin": "", "parentId": "313" }, { "areaCode": "2937", "areaName": "长城区", "areaPinYin": "", "parentId": "313" }, { "areaCode": "2938", "areaName": "雄关区", "areaPinYin": "", "parentId": "313" }, { "areaCode": "2939", "areaName": "张家川县", "areaPinYin": "", "parentId": "314" }, { "areaCode": "2940", "areaName": "武山县", "areaPinYin": "", "parentId": "314" }, { "areaCode": "2941", "areaName": "清水县", "areaPinYin": "", "parentId": "314" }, { "areaCode": "2942", "areaName": "甘谷县", "areaPinYin": "", "parentId": "314" }, { "areaCode": "2943", "areaName": "秦安县", "areaPinYin": "", "parentId": "314" }, { "areaCode": "2944", "areaName": "秦州区", "areaPinYin": "", "parentId": "314" }, { "areaCode": "2945", "areaName": "麦积区", "areaPinYin": "", "parentId": "314" }, { "areaCode": "2946", "areaName": "临洮县", "areaPinYin": "", "parentId": "315" }, { "areaCode": "2947", "areaName": "安定区", "areaPinYin": "", "parentId": "315" }, { "areaCode": "2948", "areaName": "岷县", "areaPinYin": "", "parentId": "315" }, { "areaCode": "2949", "areaName": "渭源县", "areaPinYin": "", "parentId": "315" }, { "areaCode": "2950", "areaName": "漳县", "areaPinYin": "", "parentId": "315" }, { "areaCode": "2951", "areaName": "通渭县", "areaPinYin": "", "parentId": "315" }, { "areaCode": "2952", "areaName": "陇西县", "areaPinYin": "", "parentId": "315" }, { "areaCode": "2953", "areaName": "华亭县", "areaPinYin": "", "parentId": "316" }, { "areaCode": "2954", "areaName": "崆峒区", "areaPinYin": "", "parentId": "316" }, { "areaCode": "2955", "areaName": "崇信县", "areaPinYin": "", "parentId": "316" }, { "areaCode": "2956", "areaName": "庄浪县", "areaPinYin": "", "parentId": "316" }, { "areaCode": "2957", "areaName": "泾川县", "areaPinYin": "", "parentId": "316" }, { "areaCode": "2958", "areaName": "灵台县", "areaPinYin": "", "parentId": "316" }, { "areaCode": "2959", "areaName": "静宁县", "areaPinYin": "", "parentId": "316" }, { "areaCode": "2960", "areaName": "华池县", "areaPinYin": "", "parentId": "317" }, { "areaCode": "2961", "areaName": "合水县", "areaPinYin": "", "parentId": "317" }, { "areaCode": "2962", "areaName": "宁县", "areaPinYin": "", "parentId": "317" }, { "areaCode": "2963", "areaName": "庆城县", "areaPinYin": "", "parentId": "317" }, { "areaCode": "2964", "areaName": "正宁县", "areaPinYin": "", "parentId": "317" }, { "areaCode": "2965", "areaName": "环县", "areaPinYin": "", "parentId": "317" }, { "areaCode": "2966", "areaName": "西峰区", "areaPinYin": "", "parentId": "317" }, { "areaCode": "2967", "areaName": "镇原县", "areaPinYin": "", "parentId": "317" }, { "areaCode": "2968", "areaName": "临泽县", "areaPinYin": "", "parentId": "318" }, { "areaCode": "2969", "areaName": "山丹县", "areaPinYin": "", "parentId": "318" }, { "areaCode": "2970", "areaName": "民乐县", "areaPinYin": "", "parentId": "318" }, { "areaCode": "2971", "areaName": "甘州区", "areaPinYin": "", "parentId": "318" }, { "areaCode": "2972", "areaName": "肃南县", "areaPinYin": "", "parentId": "318" }, { "areaCode": "2973", "areaName": "高台县", "areaPinYin": "", "parentId": "318" }, { "areaCode": "2974", "areaName": "凉州区", "areaPinYin": "", "parentId": "319" }, { "areaCode": "2975", "areaName": "古浪县", "areaPinYin": "", "parentId": "319" }, { "areaCode": "2976", "areaName": "天祝县", "areaPinYin": "", "parentId": "319" }, { "areaCode": "2977", "areaName": "民勤县", "areaPinYin": "", "parentId": "319" }, { "areaCode": "2978", "areaName": "临潭县", "areaPinYin": "", "parentId": "320" }, { "areaCode": "2979", "areaName": "卓尼县", "areaPinYin": "", "parentId": "320" }, { "areaCode": "2980", "areaName": "合作市", "areaPinYin": "", "parentId": "320" }, { "areaCode": "2981", "areaName": "夏河县", "areaPinYin": "", "parentId": "320" }, { "areaCode": "2982", "areaName": "玛曲县", "areaPinYin": "", "parentId": "320" }, { "areaCode": "2983", "areaName": "碌曲县", "areaPinYin": "", "parentId": "320" }, { "areaCode": "2984", "areaName": "舟曲县", "areaPinYin": "", "parentId": "320" }, { "areaCode": "2985", "areaName": "迭部县", "areaPinYin": "", "parentId": "320" }, { "areaCode": "2986", "areaName": "会宁县", "areaPinYin": "", "parentId": "321" }, { "areaCode": "2987", "areaName": "平川区", "areaPinYin": "", "parentId": "321" }, { "areaCode": "2988", "areaName": "景泰县", "areaPinYin": "", "parentId": "321" }, { "areaCode": "2989", "areaName": "白银区", "areaPinYin": "", "parentId": "321" }, { "areaCode": "2990", "areaName": "靖远县", "areaPinYin": "", "parentId": "321" }, { "areaCode": "2991", "areaName": "敦煌市", "areaPinYin": "", "parentId": "322" }, { "areaCode": "2992", "areaName": "玉门市", "areaPinYin": "", "parentId": "322" }, { "areaCode": "2993", "areaName": "瓜州县", "areaPinYin": "", "parentId": "322" }, { "areaCode": "2994", "areaName": "肃北县", "areaPinYin": "", "parentId": "322" }, { "areaCode": "2995", "areaName": "肃州区", "areaPinYin": "", "parentId": "322" }, { "areaCode": "2996", "areaName": "金塔县", "areaPinYin": "", "parentId": "322" }, { "areaCode": "2997", "areaName": "阿克塞县", "areaPinYin": "", "parentId": "322" }, { "areaCode": "2998", "areaName": "永昌县", "areaPinYin": "", "parentId": "323" }, { "areaCode": "2999", "areaName": "金川区", "areaPinYin": "", "parentId": "323" }, { "areaCode": "3000", "areaName": "两当县", "areaPinYin": "", "parentId": "324" }, { "areaCode": "3001", "areaName": "宕昌县", "areaPinYin": "", "parentId": "324" }, { "areaCode": "3002", "areaName": "康县", "areaPinYin": "", "parentId": "324" }, { "areaCode": "3003", "areaName": "徽县", "areaPinYin": "", "parentId": "324" }, { "areaCode": "3004", "areaName": "成县", "areaPinYin": "", "parentId": "324" }, { "areaCode": "3005", "areaName": "文县", "areaPinYin": "", "parentId": "324" }, { "areaCode": "3006", "areaName": "武都区", "areaPinYin": "", "parentId": "324" }, { "areaCode": "3007", "areaName": "礼县", "areaPinYin": "", "parentId": "324" }, { "areaCode": "3008", "areaName": "西和县", "areaPinYin": "", "parentId": "324" }, { "areaCode": "3009", "areaName": "三元区", "areaPinYin": "", "parentId": "325" }, { "areaCode": "3010", "areaName": "大田县", "areaPinYin": "", "parentId": "325" }, { "areaCode": "3011", "areaName": "宁化县", "areaPinYin": "", "parentId": "325" }, { "areaCode": "3012", "areaName": "将乐县", "areaPinYin": "", "parentId": "325" }, { "areaCode": "3013", "areaName": "尤溪县", "areaPinYin": "", "parentId": "325" }, { "areaCode": "3014", "areaName": "建宁县", "areaPinYin": "", "parentId": "325" }, { "areaCode": "3015", "areaName": "明溪县", "areaPinYin": "", "parentId": "325" }, { "areaCode": "3016", "areaName": "梅列区", "areaPinYin": "", "parentId": "325" }, { "areaCode": "3017", "areaName": "永安市", "areaPinYin": "", "parentId": "325" }, { "areaCode": "3018", "areaName": "沙县", "areaPinYin": "", "parentId": "325" }, { "areaCode": "3019", "areaName": "泰宁县", "areaPinYin": "", "parentId": "325" }, { "areaCode": "3020", "areaName": "清流县", "areaPinYin": "", "parentId": "325" }, { "areaCode": "3021", "areaName": "光泽县", "areaPinYin": "", "parentId": "326" }, { "areaCode": "3022", "areaName": "延平区", "areaPinYin": "", "parentId": "326" }, { "areaCode": "3023", "areaName": "建瓯市", "areaPinYin": "", "parentId": "326" }, { "areaCode": "3024", "areaName": "建阳市", "areaPinYin": "", "parentId": "326" }, { "areaCode": "3025", "areaName": "政和县", "areaPinYin": "", "parentId": "326" }, { "areaCode": "3026", "areaName": "松溪县", "areaPinYin": "", "parentId": "326" }, { "areaCode": "3027", "areaName": "武夷山市", "areaPinYin": "", "parentId": "326" }, { "areaCode": "3028", "areaName": "浦城县", "areaPinYin": "", "parentId": "326" }, { "areaCode": "3029", "areaName": "邵武市", "areaPinYin": "", "parentId": "326" }, { "areaCode": "3030", "areaName": "顺昌县", "areaPinYin": "", "parentId": "326" }, { "areaCode": "3031", "areaName": "同安区", "areaPinYin": "", "parentId": "327" }, { "areaCode": "3032", "areaName": "思明区", "areaPinYin": "", "parentId": "327" }, { "areaCode": "3033", "areaName": "海沧区", "areaPinYin": "", "parentId": "327" }, { "areaCode": "3034", "areaName": "湖里区", "areaPinYin": "", "parentId": "327" }, { "areaCode": "3035", "areaName": "翔安区", "areaPinYin": "", "parentId": "327" }, { "areaCode": "3036", "areaName": "集美区", "areaPinYin": "", "parentId": "327" }, { "areaCode": "3037", "areaName": "东侨开发区", "areaPinYin": "", "parentId": "328" }, { "areaCode": "3038", "areaName": "古田县", "areaPinYin": "", "parentId": "328" }, { "areaCode": "3039", "areaName": "周宁县", "areaPinYin": "", "parentId": "328" }, { "areaCode": "3040", "areaName": "寿宁县", "areaPinYin": "", "parentId": "328" }, { "areaCode": "3041", "areaName": "屏南县", "areaPinYin": "", "parentId": "328" }, { "areaCode": "3042", "areaName": "柘荣县", "areaPinYin": "", "parentId": "328" }, { "areaCode": "3043", "areaName": "福安市", "areaPinYin": "", "parentId": "328" }, { "areaCode": "3044", "areaName": "福鼎市", "areaPinYin": "", "parentId": "328" }, { "areaCode": "3045", "areaName": "蕉城区", "areaPinYin": "", "parentId": "328" }, { "areaCode": "3046", "areaName": "霞浦县", "areaPinYin": "", "parentId": "328" }, { "areaCode": "3047", "areaName": "丰泽区", "areaPinYin": "", "parentId": "329" }, { "areaCode": "3048", "areaName": "南安市", "areaPinYin": "", "parentId": "329" }, { "areaCode": "3049", "areaName": "安溪县", "areaPinYin": "", "parentId": "329" }, { "areaCode": "3050", "areaName": "德化县", "areaPinYin": "", "parentId": "329" }, { "areaCode": "3051", "areaName": "惠安县", "areaPinYin": "", "parentId": "329" }, { "areaCode": "3052", "areaName": "晋江市", "areaPinYin": "", "parentId": "329" }, { "areaCode": "3053", "areaName": "永春县", "areaPinYin": "", "parentId": "329" }, { "areaCode": "3054", "areaName": "泉港区", "areaPinYin": "", "parentId": "329" }, { "areaCode": "3055", "areaName": "洛江区", "areaPinYin": "", "parentId": "329" }, { "areaCode": "3056", "areaName": "石狮市", "areaPinYin": "", "parentId": "329" }, { "areaCode": "3057", "areaName": "金门县", "areaPinYin": "", "parentId": "329" }, { "areaCode": "3058", "areaName": "鲤城区", "areaPinYin": "", "parentId": "329" }, { "areaCode": "3059", "areaName": "东山县", "areaPinYin": "", "parentId": "330" }, { "areaCode": "3060", "areaName": "云霄县", "areaPinYin": "", "parentId": "330" }, { "areaCode": "3061", "areaName": "华安县", "areaPinYin": "", "parentId": "330" }, { "areaCode": "3062", "areaName": "南靖县", "areaPinYin": "", "parentId": "330" }, { "areaCode": "3063", "areaName": "平和县", "areaPinYin": "", "parentId": "330" }, { "areaCode": "3064", "areaName": "漳浦县", "areaPinYin": "", "parentId": "330" }, { "areaCode": "3065", "areaName": "芗城区", "areaPinYin": "", "parentId": "330" }, { "areaCode": "3066", "areaName": "诏安县", "areaPinYin": "", "parentId": "330" }, { "areaCode": "3067", "areaName": "长泰县", "areaPinYin": "", "parentId": "330" }, { "areaCode": "3068", "areaName": "龙文区", "areaPinYin": "", "parentId": "330" }, { "areaCode": "3069", "areaName": "龙海市", "areaPinYin": "", "parentId": "330" }, { "areaCode": "3070", "areaName": "仓山区", "areaPinYin": "", "parentId": "331" }, { "areaCode": "3071", "areaName": "台江区", "areaPinYin": "", "parentId": "331" }, { "areaCode": "3072", "areaName": "平潭县", "areaPinYin": "", "parentId": "331" }, { "areaCode": "3073", "areaName": "晋安区", "areaPinYin": "", "parentId": "331" }, { "areaCode": "3074", "areaName": "永泰县", "areaPinYin": "", "parentId": "331" }, { "areaCode": "3075", "areaName": "福清市", "areaPinYin": "", "parentId": "331" }, { "areaCode": "3076", "areaName": "罗源县", "areaPinYin": "", "parentId": "331" }, { "areaCode": "3077", "areaName": "连江县", "areaPinYin": "", "parentId": "331" }, { "areaCode": "3078", "areaName": "长乐市", "areaPinYin": "", "parentId": "331" }, { "areaCode": "3079", "areaName": "闽侯县", "areaPinYin": "", "parentId": "331" }, { "areaCode": "3080", "areaName": "闽清县", "areaPinYin": "", "parentId": "331" }, { "areaCode": "3081", "areaName": "马尾区", "areaPinYin": "", "parentId": "331" }, { "areaCode": "3082", "areaName": "鼓楼区", "areaPinYin": "", "parentId": "331" }, { "areaCode": "3083", "areaName": "仙游县", "areaPinYin": "", "parentId": "332" }, { "areaCode": "3084", "areaName": "城厢区", "areaPinYin": "", "parentId": "332" }, { "areaCode": "3085", "areaName": "涵江区", "areaPinYin": "", "parentId": "332" }, { "areaCode": "3086", "areaName": "秀屿区", "areaPinYin": "", "parentId": "332" }, { "areaCode": "3087", "areaName": "荔城区", "areaPinYin": "", "parentId": "332" }, { "areaCode": "3088", "areaName": "上杭县", "areaPinYin": "", "parentId": "333" }, { "areaCode": "3089", "areaName": "新罗区", "areaPinYin": "", "parentId": "333" }, { "areaCode": "3090", "areaName": "武平县", "areaPinYin": "", "parentId": "333" }, { "areaCode": "3091", "areaName": "永定县", "areaPinYin": "", "parentId": "333" }, { "areaCode": "3092", "areaName": "漳平市", "areaPinYin": "", "parentId": "333" }, { "areaCode": "3093", "areaName": "连城县", "areaPinYin": "", "parentId": "333" }, { "areaCode": "3094", "areaName": "长汀县", "areaPinYin": "", "parentId": "333" }, { "areaCode": "3095", "areaName": "乃东县", "areaPinYin": "", "parentId": "334" }, { "areaCode": "3096", "areaName": "加查县", "areaPinYin": "", "parentId": "334" }, { "areaCode": "3097", "areaName": "扎囊县", "areaPinYin": "", "parentId": "334" }, { "areaCode": "3098", "areaName": "措美县", "areaPinYin": "", "parentId": "334" }, { "areaCode": "3099", "areaName": "曲松县", "areaPinYin": "", "parentId": "334" }, { "areaCode": "3100", "areaName": "桑日县", "areaPinYin": "", "parentId": "334" }, { "areaCode": "3101", "areaName": "洛扎县", "areaPinYin": "", "parentId": "334" }, { "areaCode": "3102", "areaName": "浪卡子县", "areaPinYin": "", "parentId": "334" }, { "areaCode": "3103", "areaName": "琼结县", "areaPinYin": "", "parentId": "334" }, { "areaCode": "3104", "areaName": "贡嘎县", "areaPinYin": "", "parentId": "334" }, { "areaCode": "3105", "areaName": "错那县", "areaPinYin": "", "parentId": "334" }, { "areaCode": "3106", "areaName": "隆子县", "areaPinYin": "", "parentId": "334" }, { "areaCode": "3107", "areaName": "城关区", "areaPinYin": "", "parentId": "335" }, { "areaCode": "3108", "areaName": "堆龙德庆县", "areaPinYin": "", "parentId": "335" }, { "areaCode": "3109", "areaName": "墨竹工卡县", "areaPinYin": "", "parentId": "335" }, { "areaCode": "3110", "areaName": "尼木县", "areaPinYin": "", "parentId": "335" }, { "areaCode": "3111", "areaName": "当雄县", "areaPinYin": "", "parentId": "335" }, { "areaCode": "3112", "areaName": "曲水县", "areaPinYin": "", "parentId": "335" }, { "areaCode": "3113", "areaName": "林周县", "areaPinYin": "", "parentId": "335" }, { "areaCode": "3114", "areaName": "达孜县", "areaPinYin": "", "parentId": "335" }, { "areaCode": "3115", "areaName": "亚东县", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3116", "areaName": "仁布县", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3117", "areaName": "仲巴县", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3118", "areaName": "南木林县", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3119", "areaName": "吉隆县", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3120", "areaName": "定日县", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3121", "areaName": "定结县", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3122", "areaName": "岗巴县", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3123", "areaName": "康马县", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3124", "areaName": "拉孜县", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3125", "areaName": "日喀则市", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3126", "areaName": "昂仁县", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3127", "areaName": "江孜县", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3128", "areaName": "白朗县", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3129", "areaName": "聂拉木县", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3130", "areaName": "萨嘎县", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3131", "areaName": "萨迦县　", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3132", "areaName": "谢通门县", "areaPinYin": "", "parentId": "336" }, { "areaCode": "3133", "areaName": "丁青县", "areaPinYin": "", "parentId": "337" }, { "areaCode": "3134", "areaName": "八宿县", "areaPinYin": "", "parentId": "337" }, { "areaCode": "3135", "areaName": "察雅县", "areaPinYin": "", "parentId": "337" }, { "areaCode": "3136", "areaName": "左贡县", "areaPinYin": "", "parentId": "337" }, { "areaCode": "3137", "areaName": "昌都县", "areaPinYin": "", "parentId": "337" }, { "areaCode": "3138", "areaName": "江达县", "areaPinYin": "", "parentId": "337" }, { "areaCode": "3139", "areaName": "洛隆县", "areaPinYin": "", "parentId": "337" }, { "areaCode": "3140", "areaName": "类乌齐县", "areaPinYin": "", "parentId": "337" }, { "areaCode": "3141", "areaName": "芒康县", "areaPinYin": "", "parentId": "337" }, { "areaCode": "3142", "areaName": "贡觉县", "areaPinYin": "", "parentId": "337" }, { "areaCode": "3143", "areaName": "边坝县", "areaPinYin": "", "parentId": "337" }, { "areaCode": "3144", "areaName": "墨脱县", "areaPinYin": "", "parentId": "338" }, { "areaCode": "3145", "areaName": "察隅县", "areaPinYin": "", "parentId": "338" }, { "areaCode": "3146", "areaName": "工布江达县", "areaPinYin": "", "parentId": "338" }, { "areaCode": "3147", "areaName": "朗县", "areaPinYin": "", "parentId": "338" }, { "areaCode": "3148", "areaName": "林芝县", "areaPinYin": "", "parentId": "338" }, { "areaCode": "3149", "areaName": "波密县", "areaPinYin": "", "parentId": "338" }, { "areaCode": "3150", "areaName": "米林县", "areaPinYin": "", "parentId": "338" }, { "areaCode": "3151", "areaName": "嘉黎县", "areaPinYin": "", "parentId": "339" }, { "areaCode": "3152", "areaName": "安多县", "areaPinYin": "", "parentId": "339" }, { "areaCode": "3153", "areaName": "尼玛县", "areaPinYin": "", "parentId": "339" }, { "areaCode": "3154", "areaName": "巴青县", "areaPinYin": "", "parentId": "339" }, { "areaCode": "3155", "areaName": "比如县", "areaPinYin": "", "parentId": "339" }, { "areaCode": "3156", "areaName": "班戈县", "areaPinYin": "", "parentId": "339" }, { "areaCode": "3157", "areaName": "申扎县", "areaPinYin": "", "parentId": "339" }, { "areaCode": "3158", "areaName": "索县", "areaPinYin": "", "parentId": "339" }, { "areaCode": "3159", "areaName": "聂荣县", "areaPinYin": "", "parentId": "339" }, { "areaCode": "3160", "areaName": "那曲县", "areaPinYin": "", "parentId": "339" }, { "areaCode": "3161", "areaName": "噶尔县", "areaPinYin": "", "parentId": "340" }, { "areaCode": "3162", "areaName": "措勤县", "areaPinYin": "", "parentId": "340" }, { "areaCode": "3163", "areaName": "改则县", "areaPinYin": "", "parentId": "340" }, { "areaCode": "3164", "areaName": "日土县", "areaPinYin": "", "parentId": "340" }, { "areaCode": "3165", "areaName": "普兰县", "areaPinYin": "", "parentId": "340" }, { "areaCode": "3166", "areaName": "札达县　", "areaPinYin": "", "parentId": "340" }, { "areaCode": "3167", "areaName": "革吉县", "areaPinYin": "", "parentId": "340" }, { "areaCode": "3168", "areaName": "六枝特区", "areaPinYin": "", "parentId": "341" }, { "areaCode": "3169", "areaName": "水城县", "areaPinYin": "", "parentId": "341" }, { "areaCode": "3170", "areaName": "盘县", "areaPinYin": "", "parentId": "341" }, { "areaCode": "3171", "areaName": "钟山区", "areaPinYin": "", "parentId": "341" }, { "areaCode": "3172", "areaName": "关岭布依族苗族自治县", "areaPinYin": "", "parentId": "342" }, { "areaCode": "3173", "areaName": "平坝县", "areaPinYin": "", "parentId": "342" }, { "areaCode": "3174", "areaName": "普定县", "areaPinYin": "", "parentId": "342" }, { "areaCode": "3175", "areaName": "紫云苗族布依族自治县", "areaPinYin": "", "parentId": "342" }, { "areaCode": "3176", "areaName": "西秀区", "areaPinYin": "", "parentId": "342" }, { "areaCode": "3177", "areaName": "镇宁布依族苗族自治县", "areaPinYin": "", "parentId": "342" }, { "areaCode": "3178", "areaName": "七星关区", "areaPinYin": "", "parentId": "343" }, { "areaCode": "3179", "areaName": "大方县", "areaPinYin": "", "parentId": "343" }, { "areaCode": "3180", "areaName": "威宁彝族回族苗族自治县", "areaPinYin": "", "parentId": "343" }, { "areaCode": "3181", "areaName": "纳雍县", "areaPinYin": "", "parentId": "343" }, { "areaCode": "3182", "areaName": "织金县", "areaPinYin": "", "parentId": "343" }, { "areaCode": "3183", "areaName": "赫章县", "areaPinYin": "", "parentId": "343" }, { "areaCode": "3184", "areaName": "金沙县", "areaPinYin": "", "parentId": "343" }, { "areaCode": "3185", "areaName": "黔西县", "areaPinYin": "", "parentId": "343" }, { "areaCode": "3186", "areaName": "乌当区", "areaPinYin": "", "parentId": "344" }, { "areaCode": "3187", "areaName": "云岩区", "areaPinYin": "", "parentId": "344" }, { "areaCode": "3188", "areaName": "修文县", "areaPinYin": "", "parentId": "344" }, { "areaCode": "3189", "areaName": "南明区", "areaPinYin": "", "parentId": "344" }, { "areaCode": "3190", "areaName": "小河区", "areaPinYin": "", "parentId": "344" }, { "areaCode": "3191", "areaName": "开阳县", "areaPinYin": "", "parentId": "344" }, { "areaCode": "3192", "areaName": "息烽县", "areaPinYin": "", "parentId": "344" }, { "areaCode": "3193", "areaName": "清镇市", "areaPinYin": "", "parentId": "344" }, { "areaCode": "3194", "areaName": "白云区", "areaPinYin": "", "parentId": "344" }, { "areaCode": "3195", "areaName": "花溪区", "areaPinYin": "", "parentId": "344" }, { "areaCode": "3196", "areaName": "观山湖区", "areaPinYin": "", "parentId": "344" }, { "areaCode": "3197", "areaName": "习水县", "areaPinYin": "", "parentId": "345" }, { "areaCode": "3198", "areaName": "仁怀市", "areaPinYin": "", "parentId": "345" }, { "areaCode": "3199", "areaName": "余庆县", "areaPinYin": "", "parentId": "345" }, { "areaCode": "3200", "areaName": "凤冈县", "areaPinYin": "", "parentId": "345" }, { "areaCode": "3201", "areaName": "务川县", "areaPinYin": "", "parentId": "345" }, { "areaCode": "3202", "areaName": "桐梓县", "areaPinYin": "", "parentId": "345" }, { "areaCode": "3203", "areaName": "正安县", "areaPinYin": "", "parentId": "345" }, { "areaCode": "3204", "areaName": "汇川区", "areaPinYin": "", "parentId": "345" }, { "areaCode": "3205", "areaName": "湄潭县", "areaPinYin": "", "parentId": "345" }, { "areaCode": "3206", "areaName": "红花岗区", "areaPinYin": "", "parentId": "345" }, { "areaCode": "3207", "areaName": "绥阳县", "areaPinYin": "", "parentId": "345" }, { "areaCode": "3208", "areaName": "赤水市", "areaPinYin": "", "parentId": "345" }, { "areaCode": "3209", "areaName": "道真县", "areaPinYin": "", "parentId": "345" }, { "areaCode": "3210", "areaName": "遵义县", "areaPinYin": "", "parentId": "345" }, { "areaCode": "3211", "areaName": "万山区", "areaPinYin": "", "parentId": "346" }, { "areaCode": "3212", "areaName": "印江土家族苗族自治县", "areaPinYin": "", "parentId": "346" }, { "areaCode": "3213", "areaName": "德江县", "areaPinYin": "", "parentId": "346" }, { "areaCode": "3214", "areaName": "思南县", "areaPinYin": "", "parentId": "346" }, { "areaCode": "3215", "areaName": "松桃苗族自治县", "areaPinYin": "", "parentId": "346" }, { "areaCode": "3216", "areaName": "江口县", "areaPinYin": "", "parentId": "346" }, { "areaCode": "3217", "areaName": "沿河土家族自治县", "areaPinYin": "", "parentId": "346" }, { "areaCode": "3218", "areaName": "玉屏侗族自治县", "areaPinYin": "", "parentId": "346" }, { "areaCode": "3219", "areaName": "石阡县", "areaPinYin": "", "parentId": "346" }, { "areaCode": "3220", "areaName": "碧江区", "areaPinYin": "", "parentId": "346" }, { "areaCode": "3221", "areaName": "三穗县", "areaPinYin": "", "parentId": "347" }, { "areaCode": "3222", "areaName": "丹寨县", "areaPinYin": "", "parentId": "347" }, { "areaCode": "3223", "areaName": "从江县", "areaPinYin": "", "parentId": "347" }, { "areaCode": "3224", "areaName": "凯里市", "areaPinYin": "", "parentId": "347" }, { "areaCode": "3225", "areaName": "剑河县", "areaPinYin": "", "parentId": "347" }, { "areaCode": "3226", "areaName": "台江县", "areaPinYin": "", "parentId": "347" }, { "areaCode": "3227", "areaName": "天柱县", "areaPinYin": "", "parentId": "347" }, { "areaCode": "3228", "areaName": "岑巩县", "areaPinYin": "", "parentId": "347" }, { "areaCode": "3229", "areaName": "施秉市", "areaPinYin": "", "parentId": "347" }, { "areaCode": "3230", "areaName": "榕江县", "areaPinYin": "", "parentId": "347" }, { "areaCode": "3231", "areaName": "锦屏县", "areaPinYin": "", "parentId": "347" }, { "areaCode": "3232", "areaName": "镇远县", "areaPinYin": "", "parentId": "347" }, { "areaCode": "3233", "areaName": "雷山县", "areaPinYin": "", "parentId": "347" }, { "areaCode": "3234", "areaName": "麻江县", "areaPinYin": "", "parentId": "347" }, { "areaCode": "3235", "areaName": "黄平县", "areaPinYin": "", "parentId": "347" }, { "areaCode": "3236", "areaName": "黎平县", "areaPinYin": "", "parentId": "347" }, { "areaCode": "3237", "areaName": "三都县", "areaPinYin": "", "parentId": "348" }, { "areaCode": "3238", "areaName": "平塘县", "areaPinYin": "", "parentId": "348" }, { "areaCode": "3239", "areaName": "惠水县", "areaPinYin": "", "parentId": "348" }, { "areaCode": "3240", "areaName": "独山县", "areaPinYin": "", "parentId": "348" }, { "areaCode": "3241", "areaName": "瓮安县", "areaPinYin": "", "parentId": "348" }, { "areaCode": "3242", "areaName": "福泉市", "areaPinYin": "", "parentId": "348" }, { "areaCode": "3243", "areaName": "罗甸县", "areaPinYin": "", "parentId": "348" }, { "areaCode": "3244", "areaName": "荔波县", "areaPinYin": "", "parentId": "348" }, { "areaCode": "3245", "areaName": "贵定县", "areaPinYin": "", "parentId": "348" }, { "areaCode": "3246", "areaName": "都匀市", "areaPinYin": "", "parentId": "348" }, { "areaCode": "3247", "areaName": "长顺县", "areaPinYin": "", "parentId": "348" }, { "areaCode": "3248", "areaName": "龙里县", "areaPinYin": "", "parentId": "348" }, { "areaCode": "3249", "areaName": "兴义市", "areaPinYin": "", "parentId": "349" }, { "areaCode": "3250", "areaName": "兴仁县", "areaPinYin": "", "parentId": "349" }, { "areaCode": "3251", "areaName": "册亨县", "areaPinYin": "", "parentId": "349" }, { "areaCode": "3252", "areaName": "安龙县", "areaPinYin": "", "parentId": "349" }, { "areaCode": "3253", "areaName": "普安县", "areaPinYin": "", "parentId": "349" }, { "areaCode": "3254", "areaName": "晴隆县", "areaPinYin": "", "parentId": "349" }, { "areaCode": "3255", "areaName": "望谟县", "areaPinYin": "", "parentId": "349" }, { "areaCode": "3256", "areaName": "贞丰县", "areaPinYin": "", "parentId": "349" }, { "areaCode": "3257", "areaName": "东港市", "areaPinYin": "", "parentId": "350" }, { "areaCode": "3258", "areaName": "元宝区", "areaPinYin": "", "parentId": "350" }, { "areaCode": "3259", "areaName": "凤城市", "areaPinYin": "", "parentId": "350" }, { "areaCode": "3260", "areaName": "宽甸县", "areaPinYin": "", "parentId": "350" }, { "areaCode": "3261", "areaName": "振兴区", "areaPinYin": "", "parentId": "350" }, { "areaCode": "3262", "areaName": "振安区", "areaPinYin": "", "parentId": "350" }, { "areaCode": "3263", "areaName": "中山区", "areaPinYin": "", "parentId": "351" }, { "areaCode": "3264", "areaName": "大连开发区", "areaPinYin": "", "parentId": "351" }, { "areaCode": "3265", "areaName": "庄河市", "areaPinYin": "", "parentId": "351" }, { "areaCode": "3266", "areaName": "旅顺口区", "areaPinYin": "", "parentId": "351" }, { "areaCode": "3267", "areaName": "普兰店市", "areaPinYin": "", "parentId": "351" }, { "areaCode": "3268", "areaName": "沙河口区", "areaPinYin": "", "parentId": "351" }, { "areaCode": "3269", "areaName": "瓦房店市", "areaPinYin": "", "parentId": "351" }, { "areaCode": "3270", "areaName": "甘井子区", "areaPinYin": "", "parentId": "351" }, { "areaCode": "3271", "areaName": "西岗区", "areaPinYin": "", "parentId": "351" }, { "areaCode": "3272", "areaName": "金州区", "areaPinYin": "", "parentId": "351" }, { "areaCode": "3273", "areaName": "长海县", "areaPinYin": "", "parentId": "351" }, { "areaCode": "3274", "areaName": "高新园区", "areaPinYin": "", "parentId": "351" }, { "areaCode": "3275", "areaName": "东洲区", "areaPinYin": "", "parentId": "352" }, { "areaCode": "3276", "areaName": "抚顺县", "areaPinYin": "", "parentId": "352" }, { "areaCode": "3277", "areaName": "新宾县", "areaPinYin": "", "parentId": "352" }, { "areaCode": "3278", "areaName": "新抚区", "areaPinYin": "", "parentId": "352" }, { "areaCode": "3279", "areaName": "望花区", "areaPinYin": "", "parentId": "352" }, { "areaCode": "3280", "areaName": "清原县", "areaPinYin": "", "parentId": "352" }, { "areaCode": "3281", "areaName": "顺城区", "areaPinYin": "", "parentId": "352" }, { "areaCode": "3282", "areaName": "凌源市", "areaPinYin": "", "parentId": "353" }, { "areaCode": "3283", "areaName": "北票市", "areaPinYin": "", "parentId": "353" }, { "areaCode": "3284", "areaName": "双塔区", "areaPinYin": "", "parentId": "353" }, { "areaCode": "3285", "areaName": "喀喇沁左翼县", "areaPinYin": "", "parentId": "353" }, { "areaCode": "3286", "areaName": "建平县", "areaPinYin": "", "parentId": "353" }, { "areaCode": "3287", "areaName": "朝阳县", "areaPinYin": "", "parentId": "353" }, { "areaCode": "3288", "areaName": "龙城区", "areaPinYin": "", "parentId": "353" }, { "areaCode": "3289", "areaName": "南芬区", "areaPinYin": "", "parentId": "354" }, { "areaCode": "3290", "areaName": "平山区", "areaPinYin": "", "parentId": "354" }, { "areaCode": "3291", "areaName": "明山区", "areaPinYin": "", "parentId": "354" }, { "areaCode": "3292", "areaName": "本溪县", "areaPinYin": "", "parentId": "354" }, { "areaCode": "3293", "areaName": "桓仁县", "areaPinYin": "", "parentId": "354" }, { "areaCode": "3294", "areaName": "溪湖区", "areaPinYin": "", "parentId": "354" }, { "areaCode": "3295", "areaName": "东陵区", "areaPinYin": "", "parentId": "355" }, { "areaCode": "3296", "areaName": "于洪区", "areaPinYin": "", "parentId": "355" }, { "areaCode": "3297", "areaName": "和平区", "areaPinYin": "", "parentId": "355" }, { "areaCode": "3298", "areaName": "大东区", "areaPinYin": "", "parentId": "355" }, { "areaCode": "3299", "areaName": "康平县", "areaPinYin": "", "parentId": "355" }, { "areaCode": "3300", "areaName": "新民市", "areaPinYin": "", "parentId": "355" }, { "areaCode": "3301", "areaName": "沈北新区", "areaPinYin": "", "parentId": "355" }, { "areaCode": "3302", "areaName": "沈河区", "areaPinYin": "", "parentId": "355" }, { "areaCode": "3303", "areaName": "法库县", "areaPinYin": "", "parentId": "355" }, { "areaCode": "3304", "areaName": "浑南新区", "areaPinYin": "", "parentId": "355" }, { "areaCode": "3305", "areaName": "皇姑区", "areaPinYin": "", "parentId": "355" }, { "areaCode": "3306", "areaName": "苏家屯区", "areaPinYin": "", "parentId": "355" }, { "areaCode": "3307", "areaName": "辽中县", "areaPinYin": "", "parentId": "355" }, { "areaCode": "3308", "areaName": "铁西区", "areaPinYin": "", "parentId": "355" }, { "areaCode": "3309", "areaName": "兴隆台区", "areaPinYin": "", "parentId": "356" }, { "areaCode": "3310", "areaName": "双台子区", "areaPinYin": "", "parentId": "356" }, { "areaCode": "3311", "areaName": "大洼县", "areaPinYin": "", "parentId": "356" }, { "areaCode": "3312", "areaName": "盘山县", "areaPinYin": "", "parentId": "356" }, { "areaCode": "3313", "areaName": "大石桥市", "areaPinYin": "", "parentId": "357" }, { "areaCode": "3314", "areaName": "盖州市", "areaPinYin": "", "parentId": "357" }, { "areaCode": "3315", "areaName": "站前区", "areaPinYin": "", "parentId": "357" }, { "areaCode": "3316", "areaName": "老边区", "areaPinYin": "", "parentId": "357" }, { "areaCode": "3317", "areaName": "西市区", "areaPinYin": "", "parentId": "357" }, { "areaCode": "3318", "areaName": "鲅鱼圈区", "areaPinYin": "", "parentId": "357" }, { "areaCode": "3319", "areaName": "兴城市", "areaPinYin": "", "parentId": "358" }, { "areaCode": "3320", "areaName": "南票区", "areaPinYin": "", "parentId": "358" }, { "areaCode": "3321", "areaName": "建昌县", "areaPinYin": "", "parentId": "358" }, { "areaCode": "3322", "areaName": "绥中县", "areaPinYin": "", "parentId": "358" }, { "areaCode": "3323", "areaName": "连山区", "areaPinYin": "", "parentId": "358" }, { "areaCode": "3324", "areaName": "龙港区", "areaPinYin": "", "parentId": "358" }, { "areaCode": "3325", "areaName": "太子河区", "areaPinYin": "", "parentId": "359" }, { "areaCode": "3326", "areaName": "宏伟区", "areaPinYin": "", "parentId": "359" }, { "areaCode": "3327", "areaName": "弓长岭区", "areaPinYin": "", "parentId": "359" }, { "areaCode": "3328", "areaName": "文圣区", "areaPinYin": "", "parentId": "359" }, { "areaCode": "3329", "areaName": "灯塔市", "areaPinYin": "", "parentId": "359" }, { "areaCode": "3330", "areaName": "白塔区", "areaPinYin": "", "parentId": "359" }, { "areaCode": "3331", "areaName": "辽阳县", "areaPinYin": "", "parentId": "359" }, { "areaCode": "3332", "areaName": "开原市", "areaPinYin": "", "parentId": "360" }, { "areaCode": "3333", "areaName": "昌图县", "areaPinYin": "", "parentId": "360" }, { "areaCode": "3334", "areaName": "清河区", "areaPinYin": "", "parentId": "360" }, { "areaCode": "3335", "areaName": "西丰县", "areaPinYin": "", "parentId": "360" }, { "areaCode": "3336", "areaName": "调兵山市", "areaPinYin": "", "parentId": "360" }, { "areaCode": "3337", "areaName": "铁岭县", "areaPinYin": "", "parentId": "360" }, { "areaCode": "3338", "areaName": "银州区", "areaPinYin": "", "parentId": "360" }, { "areaCode": "3339", "areaName": "义县", "areaPinYin": "", "parentId": "361" }, { "areaCode": "3340", "areaName": "凌河区", "areaPinYin": "", "parentId": "361" }, { "areaCode": "3341", "areaName": "凌海市", "areaPinYin": "", "parentId": "361" }, { "areaCode": "3342", "areaName": "北镇市", "areaPinYin": "", "parentId": "361" }, { "areaCode": "3343", "areaName": "古塔区", "areaPinYin": "", "parentId": "361" }, { "areaCode": "3344", "areaName": "太和区", "areaPinYin": "", "parentId": "361" }, { "areaCode": "3345", "areaName": "经济技术开发区", "areaPinYin": "", "parentId": "361" }, { "areaCode": "3346", "areaName": "黑山县", "areaPinYin": "", "parentId": "361" }, { "areaCode": "3347", "areaName": "太平区", "areaPinYin": "", "parentId": "362" }, { "areaCode": "3348", "areaName": "彰武县", "areaPinYin": "", "parentId": "362" }, { "areaCode": "3349", "areaName": "新邱区", "areaPinYin": "", "parentId": "362" }, { "areaCode": "3350", "areaName": "海州区", "areaPinYin": "", "parentId": "362" }, { "areaCode": "3351", "areaName": "清河门区", "areaPinYin": "", "parentId": "362" }, { "areaCode": "3352", "areaName": "细河区", "areaPinYin": "", "parentId": "362" }, { "areaCode": "3353", "areaName": "阜新县", "areaPinYin": "", "parentId": "362" }, { "areaCode": "3354", "areaName": "千山区", "areaPinYin": "", "parentId": "363" }, { "areaCode": "3355", "areaName": "台安县", "areaPinYin": "", "parentId": "363" }, { "areaCode": "3356", "areaName": "岫岩县", "areaPinYin": "", "parentId": "363" }, { "areaCode": "3357", "areaName": "海城市", "areaPinYin": "", "parentId": "363" }, { "areaCode": "3358", "areaName": "立山区", "areaPinYin": "", "parentId": "363" }, { "areaCode": "3359", "areaName": "铁东区", "areaPinYin": "", "parentId": "363" }, { "areaCode": "3360", "areaName": "铁西区", "areaPinYin": "", "parentId": "363" }, { "areaCode": "3361", "areaName": "三原县", "areaPinYin": "", "parentId": "364" }, { "areaCode": "3362", "areaName": "乾县", "areaPinYin": "", "parentId": "364" }, { "areaCode": "3363", "areaName": "兴平市", "areaPinYin": "", "parentId": "364" }, { "areaCode": "3364", "areaName": "彬县", "areaPinYin": "", "parentId": "364" }, { "areaCode": "3365", "areaName": "旬邑县", "areaPinYin": "", "parentId": "364" }, { "areaCode": "3366", "areaName": "武功县", "areaPinYin": "", "parentId": "364" }, { "areaCode": "3367", "areaName": "永寿县", "areaPinYin": "", "parentId": "364" }, { "areaCode": "3368", "areaName": "泾阳县", "areaPinYin": "", "parentId": "364" }, { "areaCode": "3369", "areaName": "淳化县", "areaPinYin": "", "parentId": "364" }, { "areaCode": "3370", "areaName": "渭城区", "areaPinYin": "", "parentId": "364" }, { "areaCode": "3371", "areaName": "礼泉县", "areaPinYin": "", "parentId": "364" }, { "areaCode": "3372", "areaName": "秦都区", "areaPinYin": "", "parentId": "364" }, { "areaCode": "3373", "areaName": "长武县", "areaPinYin": "", "parentId": "364" }, { "areaCode": "3374", "areaName": "丹凤县", "areaPinYin": "", "parentId": "365" }, { "areaCode": "3375", "areaName": "商南县", "areaPinYin": "", "parentId": "365" }, { "areaCode": "3376", "areaName": "商州区", "areaPinYin": "", "parentId": "365" }, { "areaCode": "3377", "areaName": "山阳县", "areaPinYin": "", "parentId": "365" }, { "areaCode": "3378", "areaName": "柞水县", "areaPinYin": "", "parentId": "365" }, { "areaCode": "3379", "areaName": "洛南县", "areaPinYin": "", "parentId": "365" }, { "areaCode": "3380", "areaName": "镇安县", "areaPinYin": "", "parentId": "365" }, { "areaCode": "3381", "areaName": "宁陕县", "areaPinYin": "", "parentId": "366" }, { "areaCode": "3382", "areaName": "岚皋县", "areaPinYin": "", "parentId": "366" }, { "areaCode": "3383", "areaName": "平利县", "areaPinYin": "", "parentId": "366" }, { "areaCode": "3384", "areaName": "旬阳县", "areaPinYin": "", "parentId": "366" }, { "areaCode": "3385", "areaName": "汉滨区", "areaPinYin": "", "parentId": "366" }, { "areaCode": "3386", "areaName": "汉阴县", "areaPinYin": "", "parentId": "366" }, { "areaCode": "3387", "areaName": "白河县", "areaPinYin": "", "parentId": "366" }, { "areaCode": "3388", "areaName": "石泉县", "areaPinYin": "", "parentId": "366" }, { "areaCode": "3389", "areaName": "紫阳县", "areaPinYin": "", "parentId": "366" }, { "areaCode": "3390", "areaName": "镇坪县", "areaPinYin": "", "parentId": "366" }, { "areaCode": "3391", "areaName": "凤县", "areaPinYin": "", "parentId": "367" }, { "areaCode": "3392", "areaName": "凤翔县", "areaPinYin": "", "parentId": "367" }, { "areaCode": "3393", "areaName": "千阳县", "areaPinYin": "", "parentId": "367" }, { "areaCode": "3394", "areaName": "太白县", "areaPinYin": "", "parentId": "367" }, { "areaCode": "3395", "areaName": "岐山县", "areaPinYin": "", "parentId": "367" }, { "areaCode": "3396", "areaName": "扶风县", "areaPinYin": "", "parentId": "367" }, { "areaCode": "3397", "areaName": "渭滨区", "areaPinYin": "", "parentId": "367" }, { "areaCode": "3398", "areaName": "眉县", "areaPinYin": "", "parentId": "367" }, { "areaCode": "3399", "areaName": "金台区", "areaPinYin": "", "parentId": "367" }, { "areaCode": "3400", "areaName": "陇县", "areaPinYin": "", "parentId": "367" }, { "areaCode": "3401", "areaName": "陈仓区", "areaPinYin": "", "parentId": "367" }, { "areaCode": "3402", "areaName": "麟游县", "areaPinYin": "", "parentId": "367" }, { "areaCode": "3403", "areaName": "吴起县", "areaPinYin": "", "parentId": "368" }, { "areaCode": "3404", "areaName": "子长县", "areaPinYin": "", "parentId": "368" }, { "areaCode": "3405", "areaName": "安塞县", "areaPinYin": "", "parentId": "368" }, { "areaCode": "3406", "areaName": "宜川县", "areaPinYin": "", "parentId": "368" }, { "areaCode": "3407", "areaName": "宝塔区", "areaPinYin": "", "parentId": "368" }, { "areaCode": "3408", "areaName": "富县", "areaPinYin": "", "parentId": "368" }, { "areaCode": "3409", "areaName": "延川县", "areaPinYin": "", "parentId": "368" }, { "areaCode": "3410", "areaName": "延长县", "areaPinYin": "", "parentId": "368" }, { "areaCode": "3411", "areaName": "志丹县", "areaPinYin": "", "parentId": "368" }, { "areaCode": "3412", "areaName": "洛川县", "areaPinYin": "", "parentId": "368" }, { "areaCode": "3413", "areaName": "甘泉县", "areaPinYin": "", "parentId": "368" }, { "areaCode": "3414", "areaName": "黄陵县", "areaPinYin": "", "parentId": "368" }, { "areaCode": "3415", "areaName": "黄龙县", "areaPinYin": "", "parentId": "368" }, { "areaCode": "3416", "areaName": "佳县", "areaPinYin": "", "parentId": "369" }, { "areaCode": "3417", "areaName": "吴堡县", "areaPinYin": "", "parentId": "369" }, { "areaCode": "3418", "areaName": "子洲县", "areaPinYin": "", "parentId": "369" }, { "areaCode": "3419", "areaName": "定边县", "areaPinYin": "", "parentId": "369" }, { "areaCode": "3420", "areaName": "府谷县", "areaPinYin": "", "parentId": "369" }, { "areaCode": "3421", "areaName": "榆阳区", "areaPinYin": "", "parentId": "369" }, { "areaCode": "3422", "areaName": "横山县", "areaPinYin": "", "parentId": "369" }, { "areaCode": "3423", "areaName": "清涧县", "areaPinYin": "", "parentId": "369" }, { "areaCode": "3424", "areaName": "神木县", "areaPinYin": "", "parentId": "369" }, { "areaCode": "3425", "areaName": "米脂县", "areaPinYin": "", "parentId": "369" }, { "areaCode": "3426", "areaName": "绥德县", "areaPinYin": "", "parentId": "369" }, { "areaCode": "3427", "areaName": "靖边县", "areaPinYin": "", "parentId": "369" }, { "areaCode": "3428", "areaName": "佛坪县", "areaPinYin": "", "parentId": "370" }, { "areaCode": "3429", "areaName": "勉县", "areaPinYin": "", "parentId": "370" }, { "areaCode": "3430", "areaName": "南郑县", "areaPinYin": "", "parentId": "370" }, { "areaCode": "3431", "areaName": "城固县", "areaPinYin": "", "parentId": "370" }, { "areaCode": "3432", "areaName": "宁强县", "areaPinYin": "", "parentId": "370" }, { "areaCode": "3433", "areaName": "汉台区", "areaPinYin": "", "parentId": "370" }, { "areaCode": "3434", "areaName": "洋县", "areaPinYin": "", "parentId": "370" }, { "areaCode": "3435", "areaName": "留坝县", "areaPinYin": "", "parentId": "370" }, { "areaCode": "3436", "areaName": "略阳县", "areaPinYin": "", "parentId": "370" }, { "areaCode": "3437", "areaName": "西乡县", "areaPinYin": "", "parentId": "370" }, { "areaCode": "3438", "areaName": "镇巴县", "areaPinYin": "", "parentId": "370" }, { "areaCode": "3439", "areaName": "临渭区", "areaPinYin": "", "parentId": "371" }, { "areaCode": "3440", "areaName": "华县", "areaPinYin": "", "parentId": "371" }, { "areaCode": "3441", "areaName": "华阴市", "areaPinYin": "", "parentId": "371" }, { "areaCode": "3442", "areaName": "合阳县", "areaPinYin": "", "parentId": "371" }, { "areaCode": "3443", "areaName": "大荔县", "areaPinYin": "", "parentId": "371" }, { "areaCode": "3444", "areaName": "富平县", "areaPinYin": "", "parentId": "371" }, { "areaCode": "3445", "areaName": "潼关县", "areaPinYin": "", "parentId": "371" }, { "areaCode": "3446", "areaName": "澄城县", "areaPinYin": "", "parentId": "371" }, { "areaCode": "3447", "areaName": "白水县", "areaPinYin": "", "parentId": "371" }, { "areaCode": "3448", "areaName": "蒲城县", "areaPinYin": "", "parentId": "371" }, { "areaCode": "3449", "areaName": "韩城市", "areaPinYin": "", "parentId": "371" }, { "areaCode": "3450", "areaName": "临潼区", "areaPinYin": "", "parentId": "372" }, { "areaCode": "3451", "areaName": "周至县", "areaPinYin": "", "parentId": "372" }, { "areaCode": "3452", "areaName": "户县", "areaPinYin": "", "parentId": "372" }, { "areaCode": "3453", "areaName": "新城区", "areaPinYin": "", "parentId": "372" }, { "areaCode": "3454", "areaName": "未央区", "areaPinYin": "", "parentId": "372" }, { "areaCode": "3455", "areaName": "杨凌农业示范区", "areaPinYin": "", "parentId": "372" }, { "areaCode": "3456", "areaName": "灞桥区", "areaPinYin": "", "parentId": "372" }, { "areaCode": "3457", "areaName": "碑林区", "areaPinYin": "", "parentId": "372" }, { "areaCode": "3458", "areaName": "莲湖区", "areaPinYin": "", "parentId": "372" }, { "areaCode": "3459", "areaName": "蓝田县", "areaPinYin": "", "parentId": "372" }, { "areaCode": "3460", "areaName": "西安武警工程学院", "areaPinYin": "", "parentId": "372" }, { "areaCode": "3461", "areaName": "长安区", "areaPinYin": "", "parentId": "372" }, { "areaCode": "3462", "areaName": "阎良区", "areaPinYin": "", "parentId": "372" }, { "areaCode": "3463", "areaName": "雁塔区", "areaPinYin": "", "parentId": "372" }, { "areaCode": "3464", "areaName": "高陵县", "areaPinYin": "", "parentId": "372" }, { "areaCode": "3465", "areaName": "印台区", "areaPinYin": "", "parentId": "373" }, { "areaCode": "3466", "areaName": "宜君县", "areaPinYin": "", "parentId": "373" }, { "areaCode": "3467", "areaName": "王益区", "areaPinYin": "", "parentId": "373" }, { "areaCode": "3468", "areaName": "耀州区", "areaPinYin": "", "parentId": "373" }, { "areaCode": "3469", "areaName": "久治县", "areaPinYin": "", "parentId": "374" }, { "areaCode": "3470", "areaName": "玛多县", "areaPinYin": "", "parentId": "374" }, { "areaCode": "3471", "areaName": "玛沁县", "areaPinYin": "", "parentId": "374" }, { "areaCode": "3472", "areaName": "班玛县", "areaPinYin": "", "parentId": "374" }, { "areaCode": "3473", "areaName": "甘德县", "areaPinYin": "", "parentId": "374" }, { "areaCode": "3474", "areaName": "达日县", "areaPinYin": "", "parentId": "374" }, { "areaCode": "3475", "areaName": "乐都县", "areaPinYin": "", "parentId": "375" }, { "areaCode": "3476", "areaName": "互助县", "areaPinYin": "", "parentId": "375" }, { "areaCode": "3477", "areaName": "化隆县", "areaPinYin": "", "parentId": "375" }, { "areaCode": "3478", "areaName": "平安县", "areaPinYin": "", "parentId": "375" }, { "areaCode": "3479", "areaName": "循化县", "areaPinYin": "", "parentId": "375" }, { "areaCode": "3480", "areaName": "民和县", "areaPinYin": "", "parentId": "375" }, { "areaCode": "3481", "areaName": "刚察县", "areaPinYin": "", "parentId": "376" }, { "areaCode": "3482", "areaName": "海晏县", "areaPinYin": "", "parentId": "376" }, { "areaCode": "3483", "areaName": "祁连县", "areaPinYin": "", "parentId": "376" }, { "areaCode": "3484", "areaName": "门源县", "areaPinYin": "", "parentId": "376" }, { "areaCode": "3485", "areaName": "共和县", "areaPinYin": "", "parentId": "377" }, { "areaCode": "3486", "areaName": "兴海县", "areaPinYin": "", "parentId": "377" }, { "areaCode": "3487", "areaName": "同德县", "areaPinYin": "", "parentId": "377" }, { "areaCode": "3488", "areaName": "贵南县", "areaPinYin": "", "parentId": "377" }, { "areaCode": "3489", "areaName": "贵德县", "areaPinYin": "", "parentId": "377" }, { "areaCode": "3490", "areaName": "乌兰县", "areaPinYin": "", "parentId": "378" }, { "areaCode": "3491", "areaName": "冷湖行委", "areaPinYin": "", "parentId": "378" }, { "areaCode": "3492", "areaName": "大柴旦行委", "areaPinYin": "", "parentId": "378" }, { "areaCode": "3493", "areaName": "天峻县", "areaPinYin": "", "parentId": "378" }, { "areaCode": "3494", "areaName": "德令哈市", "areaPinYin": "", "parentId": "378" }, { "areaCode": "3495", "areaName": "格尔木市", "areaPinYin": "", "parentId": "378" }, { "areaCode": "3496", "areaName": "茫崖行委", "areaPinYin": "", "parentId": "378" }, { "areaCode": "3497", "areaName": "都兰县", "areaPinYin": "", "parentId": "378" }, { "areaCode": "3498", "areaName": "囊谦县", "areaPinYin": "", "parentId": "379" }, { "areaCode": "3499", "areaName": "曲麻莱县", "areaPinYin": "", "parentId": "379" }, { "areaCode": "3500", "areaName": "杂多县", "areaPinYin": "", "parentId": "379" }, { "areaCode": "3501", "areaName": "治多县", "areaPinYin": "", "parentId": "379" }, { "areaCode": "3502", "areaName": "玉树县", "areaPinYin": "", "parentId": "379" }, { "areaCode": "3503", "areaName": "称多县", "areaPinYin": "", "parentId": "379" }, { "areaCode": "3504", "areaName": "城东区", "areaPinYin": "", "parentId": "380" }, { "areaCode": "3505", "areaName": "城中区", "areaPinYin": "", "parentId": "380" }, { "areaCode": "3506", "areaName": "城北区", "areaPinYin": "", "parentId": "380" }, { "areaCode": "3507", "areaName": "城西区", "areaPinYin": "", "parentId": "380" }, { "areaCode": "3508", "areaName": "大通县", "areaPinYin": "", "parentId": "380" }, { "areaCode": "3509", "areaName": "湟中县", "areaPinYin": "", "parentId": "380" }, { "areaCode": "3510", "areaName": "湟源县", "areaPinYin": "", "parentId": "380" }, { "areaCode": "3511", "areaName": "同仁县", "areaPinYin": "", "parentId": "381" }, { "areaCode": "3512", "areaName": "尖扎县", "areaPinYin": "", "parentId": "381" }, { "areaCode": "3513", "areaName": "河南县", "areaPinYin": "", "parentId": "381" }, { "areaCode": "3514", "areaName": "泽库县", "areaPinYin": "", "parentId": "381" }, { "areaCode": "3515", "areaName": "勃利县", "areaPinYin": "", "parentId": "382" }, { "areaCode": "3516", "areaName": "新兴区", "areaPinYin": "", "parentId": "382" }, { "areaCode": "3517", "areaName": "桃山区", "areaPinYin": "", "parentId": "382" }, { "areaCode": "3518", "areaName": "茄子河区", "areaPinYin": "", "parentId": "382" }, { "areaCode": "3519", "areaName": "上甘岭区", "areaPinYin": "", "parentId": "383" }, { "areaCode": "3520", "areaName": "乌伊岭区", "areaPinYin": "", "parentId": "383" }, { "areaCode": "3521", "areaName": "乌马河区", "areaPinYin": "", "parentId": "383" }, { "areaCode": "3522", "areaName": "五营区", "areaPinYin": "", "parentId": "383" }, { "areaCode": "3523", "areaName": "伊春区", "areaPinYin": "", "parentId": "383" }, { "areaCode": "3524", "areaName": "南岔区", "areaPinYin": "", "parentId": "383" }, { "areaCode": "3525", "areaName": "友好区", "areaPinYin": "", "parentId": "383" }, { "areaCode": "3526", "areaName": "嘉荫县", "areaPinYin": "", "parentId": "383" }, { "areaCode": "3527", "areaName": "带岭区", "areaPinYin": "", "parentId": "383" }, { "areaCode": "3528", "areaName": "新青区", "areaPinYin": "", "parentId": "383" }, { "areaCode": "3529", "areaName": "汤旺河区", "areaPinYin": "", "parentId": "383" }, { "areaCode": "3530", "areaName": "红星区", "areaPinYin": "", "parentId": "383" }, { "areaCode": "3531", "areaName": "美溪区", "areaPinYin": "", "parentId": "383" }, { "areaCode": "3532", "areaName": "翠峦区", "areaPinYin": "", "parentId": "383" }, { "areaCode": "3533", "areaName": "西林区", "areaPinYin": "", "parentId": "383" }, { "areaCode": "3534", "areaName": "金山屯区", "areaPinYin": "", "parentId": "383" }, { "areaCode": "3535", "areaName": "铁力市", "areaPinYin": "", "parentId": "383" }, { "areaCode": "3536", "areaName": "东风区", "areaPinYin": "", "parentId": "384" }, { "areaCode": "3537", "areaName": "前进区", "areaPinYin": "", "parentId": "384" }, { "areaCode": "3538", "areaName": "同江市", "areaPinYin": "", "parentId": "384" }, { "areaCode": "3539", "areaName": "向阳区", "areaPinYin": "", "parentId": "384" }, { "areaCode": "3540", "areaName": "富锦市", "areaPinYin": "", "parentId": "384" }, { "areaCode": "3541", "areaName": "抚远县", "areaPinYin": "", "parentId": "384" }, { "areaCode": "3542", "areaName": "桦南县", "areaPinYin": "", "parentId": "384" }, { "areaCode": "3543", "areaName": "桦川县", "areaPinYin": "", "parentId": "384" }, { "areaCode": "3544", "areaName": "汤原县", "areaPinYin": "", "parentId": "384" }, { "areaCode": "3545", "areaName": "郊区", "areaPinYin": "", "parentId": "384" }, { "areaCode": "3546", "areaName": "友谊县", "areaPinYin": "", "parentId": "385" }, { "areaCode": "3547", "areaName": "四方台区", "areaPinYin": "", "parentId": "385" }, { "areaCode": "3548", "areaName": "宝山区", "areaPinYin": "", "parentId": "385" }, { "areaCode": "3549", "areaName": "宝清县", "areaPinYin": "", "parentId": "385" }, { "areaCode": "3550", "areaName": "尖山区", "areaPinYin": "", "parentId": "385" }, { "areaCode": "3551", "areaName": "岭东区", "areaPinYin": "", "parentId": "385" }, { "areaCode": "3552", "areaName": "集贤县", "areaPinYin": "", "parentId": "385" }, { "areaCode": "3553", "areaName": "饶河县", "areaPinYin": "", "parentId": "385" }, { "areaCode": "3554", "areaName": "五常市", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3555", "areaName": "依兰县", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3556", "areaName": "南岗区", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3557", "areaName": "双城市", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3558", "areaName": "呼兰区", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3559", "areaName": "宾县", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3560", "areaName": "尚志市", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3561", "areaName": "巴彦县", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3562", "areaName": "平房区", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3563", "areaName": "延寿县", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3564", "areaName": "方正县", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3565", "areaName": "木兰县", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3566", "areaName": "松北区", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3567", "areaName": "通河县", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3568", "areaName": "道外区", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3569", "areaName": "道里区", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3570", "areaName": "阿城区", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3571", "areaName": "香坊区", "areaPinYin": "", "parentId": "386" }, { "areaCode": "3572", "areaName": "加格达奇区", "areaPinYin": "", "parentId": "387" }, { "areaCode": "3573", "areaName": "呼中区", "areaPinYin": "", "parentId": "387" }, { "areaCode": "3574", "areaName": "呼玛县", "areaPinYin": "", "parentId": "387" }, { "areaCode": "3575", "areaName": "塔河县", "areaPinYin": "", "parentId": "387" }, { "areaCode": "3576", "areaName": "新林区", "areaPinYin": "", "parentId": "387" }, { "areaCode": "3577", "areaName": "松岭区", "areaPinYin": "", "parentId": "387" }, { "areaCode": "3578", "areaName": "漠河县", "areaPinYin": "", "parentId": "387" }, { "areaCode": "3579", "areaName": "大同区", "areaPinYin": "", "parentId": "388" }, { "areaCode": "3580", "areaName": "杜尔伯特县", "areaPinYin": "", "parentId": "388" }, { "areaCode": "3581", "areaName": "林甸县", "areaPinYin": "", "parentId": "388" }, { "areaCode": "3582", "areaName": "红岗区", "areaPinYin": "", "parentId": "388" }, { "areaCode": "3583", "areaName": "肇州县", "areaPinYin": "", "parentId": "388" }, { "areaCode": "3584", "areaName": "肇源县", "areaPinYin": "", "parentId": "388" }, { "areaCode": "3585", "areaName": "萨尔图区", "areaPinYin": "", "parentId": "388" }, { "areaCode": "3586", "areaName": "让胡路区", "areaPinYin": "", "parentId": "388" }, { "areaCode": "3587", "areaName": "龙凤区", "areaPinYin": "", "parentId": "388" }, { "areaCode": "3588", "areaName": "东宁县", "areaPinYin": "", "parentId": "389" }, { "areaCode": "3589", "areaName": "东安区", "areaPinYin": "", "parentId": "389" }, { "areaCode": "3590", "areaName": "宁安市", "areaPinYin": "", "parentId": "389" }, { "areaCode": "3591", "areaName": "林口县", "areaPinYin": "", "parentId": "389" }, { "areaCode": "3592", "areaName": "海林市", "areaPinYin": "", "parentId": "389" }, { "areaCode": "3593", "areaName": "爱民区", "areaPinYin": "", "parentId": "389" }, { "areaCode": "3594", "areaName": "穆棱市", "areaPinYin": "", "parentId": "389" }, { "areaCode": "3595", "areaName": "绥芬河市", "areaPinYin": "", "parentId": "389" }, { "areaCode": "3596", "areaName": "西安区", "areaPinYin": "", "parentId": "389" }, { "areaCode": "3597", "areaName": "阳明区", "areaPinYin": "", "parentId": "389" }, { "areaCode": "3598", "areaName": "兰西县", "areaPinYin": "", "parentId": "390" }, { "areaCode": "3599", "areaName": "北林区", "areaPinYin": "", "parentId": "390" }, { "areaCode": "3600", "areaName": "安达市", "areaPinYin": "", "parentId": "390" }, { "areaCode": "3601", "areaName": "庆安县", "areaPinYin": "", "parentId": "390" }, { "areaCode": "3602", "areaName": "明水县", "areaPinYin": "", "parentId": "390" }, { "areaCode": "3603", "areaName": "望奎县", "areaPinYin": "", "parentId": "390" }, { "areaCode": "3604", "areaName": "海伦市", "areaPinYin": "", "parentId": "390" }, { "areaCode": "3605", "areaName": "绥棱县", "areaPinYin": "", "parentId": "390" }, { "areaCode": "3606", "areaName": "肇东市", "areaPinYin": "", "parentId": "390" }, { "areaCode": "3607", "areaName": "青冈县", "areaPinYin": "", "parentId": "390" }, { "areaCode": "3608", "areaName": "城子河区", "areaPinYin": "", "parentId": "391" }, { "areaCode": "3609", "areaName": "密山市", "areaPinYin": "", "parentId": "391" }, { "areaCode": "3610", "areaName": "恒山区", "areaPinYin": "", "parentId": "391" }, { "areaCode": "3611", "areaName": "梨树区", "areaPinYin": "", "parentId": "391" }, { "areaCode": "3612", "areaName": "滴道区", "areaPinYin": "", "parentId": "391" }, { "areaCode": "3613", "areaName": "虎林市", "areaPinYin": "", "parentId": "391" }, { "areaCode": "3614", "areaName": "鸡东县", "areaPinYin": "", "parentId": "391" }, { "areaCode": "3615", "areaName": "鸡冠区", "areaPinYin": "", "parentId": "391" }, { "areaCode": "3616", "areaName": "麻山区", "areaPinYin": "", "parentId": "391" }, { "areaCode": "3617", "areaName": "东山区", "areaPinYin": "", "parentId": "392" }, { "areaCode": "3618", "areaName": "兴安区", "areaPinYin": "", "parentId": "392" }, { "areaCode": "3619", "areaName": "兴山区", "areaPinYin": "", "parentId": "392" }, { "areaCode": "3620", "areaName": "南山区", "areaPinYin": "", "parentId": "392" }, { "areaCode": "3621", "areaName": "向阳区", "areaPinYin": "", "parentId": "392" }, { "areaCode": "3622", "areaName": "工农区", "areaPinYin": "", "parentId": "392" }, { "areaCode": "3623", "areaName": "绥滨县", "areaPinYin": "", "parentId": "392" }, { "areaCode": "3624", "areaName": "萝北县", "areaPinYin": "", "parentId": "392" }, { "areaCode": "3625", "areaName": "五大连池市", "areaPinYin": "", "parentId": "393" }, { "areaCode": "3626", "areaName": "北安市", "areaPinYin": "", "parentId": "393" }, { "areaCode": "3627", "areaName": "嫩江县", "areaPinYin": "", "parentId": "393" }, { "areaCode": "3628", "areaName": "孙吴县", "areaPinYin": "", "parentId": "393" }, { "areaCode": "3629", "areaName": "爱辉区", "areaPinYin": "", "parentId": "393" }, { "areaCode": "3630", "areaName": "逊克县", "areaPinYin": "", "parentId": "393" }, { "areaCode": "3631", "areaName": "依安县", "areaPinYin": "", "parentId": "394" }, { "areaCode": "3632", "areaName": "克东县", "areaPinYin": "", "parentId": "394" }, { "areaCode": "3633", "areaName": "克山县", "areaPinYin": "", "parentId": "394" }, { "areaCode": "3634", "areaName": "富拉尔基区", "areaPinYin": "", "parentId": "394" }, { "areaCode": "3635", "areaName": "富裕县", "areaPinYin": "", "parentId": "394" }, { "areaCode": "3636", "areaName": "建华区", "areaPinYin": "", "parentId": "394" }, { "areaCode": "3637", "areaName": "拜泉县", "areaPinYin": "", "parentId": "394" }, { "areaCode": "3638", "areaName": "昂昂溪区", "areaPinYin": "", "parentId": "394" }, { "areaCode": "3639", "areaName": "梅里斯区", "areaPinYin": "", "parentId": "394" }, { "areaCode": "3640", "areaName": "泰来县", "areaPinYin": "", "parentId": "394" }, { "areaCode": "3641", "areaName": "甘南县", "areaPinYin": "", "parentId": "394" }, { "areaCode": "3642", "areaName": "碾子山区", "areaPinYin": "", "parentId": "394" }, { "areaCode": "3643", "areaName": "讷河市", "areaPinYin": "", "parentId": "394" }, { "areaCode": "3644", "areaName": "铁锋区", "areaPinYin": "", "parentId": "394" }, { "areaCode": "3645", "areaName": "龙江县", "areaPinYin": "", "parentId": "394" }, { "areaCode": "3646", "areaName": "龙沙区", "areaPinYin": "", "parentId": "394" }, { "areaCode": "3647", "areaName": "东城区", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3648", "areaName": "丰台区", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3649", "areaName": "大兴区", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3650", "areaName": "宣武区", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3651", "areaName": "密云区", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3652", "areaName": "崇文区", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3653", "areaName": "平谷区", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3654", "areaName": "延庆县", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3655", "areaName": "怀柔区", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3656", "areaName": "房山区", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3657", "areaName": "昌平区", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3658", "areaName": "朝阳区", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3659", "areaName": "海淀区", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3660", "areaName": "石景山区", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3661", "areaName": "西城区", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3662", "areaName": "通州区", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3663", "areaName": "门头沟", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3664", "areaName": "顺义区", "areaPinYin": "", "parentId": "32" }, { "areaCode": "3665", "areaName": "东丽区", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3666", "areaName": "北辰区", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3667", "areaName": "南开区", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3668", "areaName": "和平区", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3669", "areaName": "塘沽区", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3670", "areaName": "大港区", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3671", "areaName": "宁河县", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3672", "areaName": "宝坻区", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3673", "areaName": "武清区", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3674", "areaName": "汉沽区", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3675", "areaName": "河东区", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3676", "areaName": "河北区", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3677", "areaName": "河西区", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3678", "areaName": "津南区", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3679", "areaName": "红桥区", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3680", "areaName": "蓟县", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3681", "areaName": "西青区", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3682", "areaName": "静海县", "areaPinYin": "", "parentId": "34" }, { "areaCode": "3683", "areaName": "万州区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3684", "areaName": "丰都县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3685", "areaName": "九龙坡区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3686", "areaName": "云阳县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3687", "areaName": "北碚区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3688", "areaName": "北部新区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3689", "areaName": "南岸区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3690", "areaName": "南川区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3691", "areaName": "合川区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3692", "areaName": "垫江县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3693", "areaName": "城口县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3694", "areaName": "大渡口区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3695", "areaName": "大足区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3696", "areaName": "奉节县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3697", "areaName": "巫山县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3698", "areaName": "巫溪县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3699", "areaName": "巴南区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3700", "areaName": "开县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3701", "areaName": "彭水县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3702", "areaName": "忠县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3703", "areaName": "梁平县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3704", "areaName": "武隆县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3705", "areaName": "永川区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3706", "areaName": "江北区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3707", "areaName": "江津区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3708", "areaName": "沙坪坝区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3709", "areaName": "涪陵区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3710", "areaName": "渝中区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3711", "areaName": "渝北区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3712", "areaName": "潼南县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3713", "areaName": "璧山县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3714", "areaName": "石柱县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3715", "areaName": "秀山县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3716", "areaName": "綦江区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3717", "areaName": "荣昌县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3718", "areaName": "酉阳县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3719", "areaName": "铜梁县", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3720", "areaName": "长寿区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3721", "areaName": "高新区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3722", "areaName": "黔江区", "areaPinYin": "", "parentId": "35" }, { "areaCode": "3723", "areaName": "嘉定区", "areaPinYin": "", "parentId": "33" }, { "areaCode": "3724", "areaName": "奉贤区", "areaPinYin": "", "parentId": "33" }, { "areaCode": "3725", "areaName": "宝山区", "areaPinYin": "", "parentId": "33" }, { "areaCode": "3726", "areaName": "崇明县", "areaPinYin": "", "parentId": "33" }, { "areaCode": "3727", "areaName": "徐汇区", "areaPinYin": "", "parentId": "33" }, { "areaCode": "3728", "areaName": "普陀区", "areaPinYin": "", "parentId": "33" }, { "areaCode": "3729", "areaName": "杨浦区", "areaPinYin": "", "parentId": "33" }, { "areaCode": "3730", "areaName": "松江区", "areaPinYin": "", "parentId": "33" }, { "areaCode": "3731", "areaName": "浦东新区", "areaPinYin": "", "parentId": "33" }, { "areaCode": "3732", "areaName": "虹口区", "areaPinYin": "", "parentId": "33" }, { "areaCode": "3733", "areaName": "金山区", "areaPinYin": "", "parentId": "33" }, { "areaCode": "3734", "areaName": "长宁区", "areaPinYin": "", "parentId": "33" }, { "areaCode": "3735", "areaName": "闵行区", "areaPinYin": "", "parentId": "33" }, { "areaCode": "3736", "areaName": "闸北区", "areaPinYin": "", "parentId": "33" }, { "areaCode": "3737", "areaName": "青浦区", "areaPinYin": "", "parentId": "33" }, { "areaCode": "3738", "areaName": "静安区", "areaPinYin": "", "parentId": "33" }, { "areaCode": "3739", "areaName": "黄浦区", "areaPinYin": "", "parentId": "33" }, { "areaCode": "43609", "areaName": "海南", "areaPinYin": "hai nan", "parentId": "0" }, { "areaCode": "43610", "areaName": "海口市", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43611", "areaName": "儋州市", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43612", "areaName": "琼海市", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43613", "areaName": "万宁市", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43614", "areaName": "东方市", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43615", "areaName": "三亚市", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43616", "areaName": "文昌市", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43617", "areaName": "五指山市", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43618", "areaName": "临高县", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43619", "areaName": "澄迈县", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43620", "areaName": "定安县", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43621", "areaName": "屯昌县", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43622", "areaName": "昌江县", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43623", "areaName": "白沙县", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43624", "areaName": "琼中县", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43625", "areaName": "陵水县", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43626", "areaName": "保亭县", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43627", "areaName": "乐东县", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43628", "areaName": "三沙市", "areaPinYin": "", "parentId": "43609" }, { "areaCode": "43650", "areaName": "秀英区", "areaPinYin": "", "parentId": "43610" }, { "areaCode": "43651", "areaName": "龙华区", "areaPinYin": "", "parentId": "43610" }, { "areaCode": "43652", "areaName": "琼山区", "areaPinYin": "", "parentId": "43610" }, { "areaCode": "43653", "areaName": "美兰区", "areaPinYin": "", "parentId": "43610" }, { "areaCode": "43654", "areaName": "辖区", "areaPinYin": "", "parentId": "43611" }, { "areaCode": "43655", "areaName": "辖区", "areaPinYin": "", "parentId": "43612" }, { "areaCode": "43656", "areaName": "辖区", "areaPinYin": "", "parentId": "43613" }, { "areaCode": "43657", "areaName": "辖区", "areaPinYin": "", "parentId": "43614" }, { "areaCode": "43658", "areaName": "辖区", "areaPinYin": "", "parentId": "43615" }, { "areaCode": "43659", "areaName": "河西区", "areaPinYin": "", "parentId": "43615" }, { "areaCode": "43660", "areaName": "河东区", "areaPinYin": "", "parentId": "43615" }, { "areaCode": "43661", "areaName": "辖区", "areaPinYin": "", "parentId": "43615" }, { "areaCode": "43662", "areaName": "辖区", "areaPinYin": "", "parentId": "43616" }, { "areaCode": "43663", "areaName": "辖区", "areaPinYin": "", "parentId": "43617" }, { "areaCode": "43664", "areaName": "辖区", "areaPinYin": "", "parentId": "43618" }, { "areaCode": "43665", "areaName": "辖区", "areaPinYin": "", "parentId": "43619" }, { "areaCode": "43666", "areaName": "辖区", "areaPinYin": "", "parentId": "43620" }, { "areaCode": "43667", "areaName": "辖区", "areaPinYin": "", "parentId": "43621" }, { "areaCode": "43668", "areaName": "辖区", "areaPinYin": "", "parentId": "43622" }, { "areaCode": "43669", "areaName": "辖区", "areaPinYin": "", "parentId": "43623" }, { "areaCode": "43670", "areaName": "辖区", "areaPinYin": "", "parentId": "43624" }, { "areaCode": "43671", "areaName": "辖区", "areaPinYin": "", "parentId": "43625" }, { "areaCode": "43672", "areaName": "辖区", "areaPinYin": "", "parentId": "43626" }, { "areaCode": "43673", "areaName": "辖区", "areaPinYin": "", "parentId": "43627" }, { "areaCode": "43674", "areaName": "西沙群岛", "areaPinYin": "", "parentId": "43628" }, { "areaCode": "43675", "areaName": "南沙群岛", "areaPinYin": "", "parentId": "43628" }, { "areaCode": "43676", "areaName": "中沙群岛", "areaPinYin": "", "parentId": "43628" }, { "areaCode": "45637", "areaName": "广东", "areaPinYin": "guang dong", "parentId": "0" }, { "areaCode": "45638", "areaName": "广州市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45639", "areaName": "深圳市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45640", "areaName": "珠海市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45641", "areaName": "汕头市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45642", "areaName": "韶关市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45643", "areaName": "河源市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45644", "areaName": "梅州市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45645", "areaName": "惠州市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45646", "areaName": "汕尾市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45647", "areaName": "东莞市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45648", "areaName": "中山市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45649", "areaName": "江门市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45650", "areaName": "佛山市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45651", "areaName": "阳江市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45652", "areaName": "湛江市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45653", "areaName": "茂名市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45654", "areaName": "肇庆市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45655", "areaName": "云浮市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45656", "areaName": "清远市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45657", "areaName": "潮州市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45658", "areaName": "揭阳市", "areaPinYin": "", "parentId": "45637" }, { "areaCode": "45659", "areaName": "番禺区", "areaPinYin": "", "parentId": "45638" }, { "areaCode": "45660", "areaName": "花都区", "areaPinYin": "", "parentId": "45638" }, { "areaCode": "45661", "areaName": "萝岗区", "areaPinYin": "", "parentId": "45638" }, { "areaCode": "45662", "areaName": "白云区", "areaPinYin": "", "parentId": "45638" }, { "areaCode": "45663", "areaName": "南沙区", "areaPinYin": "", "parentId": "45638" }, { "areaCode": "45664", "areaName": "黄埔区", "areaPinYin": "", "parentId": "45638" }, { "areaCode": "45665", "areaName": "增城市", "areaPinYin": "", "parentId": "45638" }, { "areaCode": "45666", "areaName": "从化区", "areaPinYin": "", "parentId": "45638" }, { "areaCode": "45667", "areaName": "辖区", "areaPinYin": "", "parentId": "45638" }, { "areaCode": "45668", "areaName": "辖区", "areaPinYin": "", "parentId": "45639" }, { "areaCode": "45669", "areaName": "龙岗区", "areaPinYin": "", "parentId": "45639" }, { "areaCode": "45670", "areaName": "斗门区", "areaPinYin": "", "parentId": "45640" }, { "areaCode": "45671", "areaName": "金湾区", "areaPinYin": "", "parentId": "45640" }, { "areaCode": "45672", "areaName": "香洲区", "areaPinYin": "", "parentId": "45640" }, { "areaCode": "45673", "areaName": "南澳县", "areaPinYin": "", "parentId": "45641" }, { "areaCode": "45674", "areaName": "龙湖区", "areaPinYin": "", "parentId": "45641" }, { "areaCode": "45675", "areaName": "辖区", "areaPinYin": "", "parentId": "45641" }, { "areaCode": "45676", "areaName": "潮阳区", "areaPinYin": "", "parentId": "45641" }, { "areaCode": "45677", "areaName": "南雄市", "areaPinYin": "", "parentId": "45642" }, { "areaCode": "45678", "areaName": "乐昌市", "areaPinYin": "", "parentId": "45642" }, { "areaCode": "45679", "areaName": "仁化县", "areaPinYin": "", "parentId": "45642" }, { "areaCode": "45680", "areaName": "始兴县", "areaPinYin": "", "parentId": "45642" }, { "areaCode": "45681", "areaName": "翁源县", "areaPinYin": "", "parentId": "45642" }, { "areaCode": "45682", "areaName": "新丰县", "areaPinYin": "", "parentId": "45642" }, { "areaCode": "45683", "areaName": "乳源瑶族自治县", "areaPinYin": "", "parentId": "45642" }, { "areaCode": "45684", "areaName": "曲江区", "areaPinYin": "", "parentId": "45642" }, { "areaCode": "45685", "areaName": "武江区", "areaPinYin": "", "parentId": "45642" }, { "areaCode": "45686", "areaName": "浈江区", "areaPinYin": "", "parentId": "45642" }, { "areaCode": "45687", "areaName": "和平县", "areaPinYin": "", "parentId": "45643" }, { "areaCode": "45688", "areaName": "龙川县", "areaPinYin": "", "parentId": "45643" }, { "areaCode": "45689", "areaName": "紫金县", "areaPinYin": "", "parentId": "45643" }, { "areaCode": "45690", "areaName": "连平县", "areaPinYin": "", "parentId": "45643" }, { "areaCode": "45691", "areaName": "源城区", "areaPinYin": "", "parentId": "45643" }, { "areaCode": "45692", "areaName": "东源县", "areaPinYin": "", "parentId": "45643" }, { "areaCode": "45693", "areaName": "兴宁市", "areaPinYin": "", "parentId": "45644" }, { "areaCode": "45694", "areaName": "梅县", "areaPinYin": "", "parentId": "45644" }, { "areaCode": "45695", "areaName": "蕉岭县", "areaPinYin": "", "parentId": "45644" }, { "areaCode": "45696", "areaName": "大埔县", "areaPinYin": "", "parentId": "45644" }, { "areaCode": "45697", "areaName": "丰顺县", "areaPinYin": "", "parentId": "45644" }, { "areaCode": "45698", "areaName": "五华县", "areaPinYin": "", "parentId": "45644" }, { "areaCode": "45699", "areaName": "平远县", "areaPinYin": "", "parentId": "45644" }, { "areaCode": "45700", "areaName": "梅江区", "areaPinYin": "", "parentId": "45644" }, { "areaCode": "45701", "areaName": "龙门县", "areaPinYin": "", "parentId": "45645" }, { "areaCode": "45702", "areaName": "惠阳区", "areaPinYin": "", "parentId": "45645" }, { "areaCode": "45703", "areaName": "辖区", "areaPinYin": "", "parentId": "45645" }, { "areaCode": "45704", "areaName": "惠城区", "areaPinYin": "", "parentId": "45645" }, { "areaCode": "45705", "areaName": "惠东县", "areaPinYin": "", "parentId": "45645" }, { "areaCode": "45706", "areaName": "博罗县", "areaPinYin": "", "parentId": "45645" }, { "areaCode": "45707", "areaName": "陆河县", "areaPinYin": "", "parentId": "45646" }, { "areaCode": "45708", "areaName": "海丰县", "areaPinYin": "", "parentId": "45646" }, { "areaCode": "45709", "areaName": "城区", "areaPinYin": "", "parentId": "45646" }, { "areaCode": "45710", "areaName": "陆丰市", "areaPinYin": "", "parentId": "45646" }, { "areaCode": "45711", "areaName": "辖区", "areaPinYin": "", "parentId": "45647" }, { "areaCode": "45712", "areaName": "辖区", "areaPinYin": "", "parentId": "45648" }, { "areaCode": "45713", "areaName": "台山市", "areaPinYin": "", "parentId": "45649" }, { "areaCode": "45714", "areaName": "新会区", "areaPinYin": "", "parentId": "45649" }, { "areaCode": "45715", "areaName": "鹤山市", "areaPinYin": "", "parentId": "45649" }, { "areaCode": "45716", "areaName": "江海区", "areaPinYin": "", "parentId": "45649" }, { "areaCode": "45717", "areaName": "蓬江区", "areaPinYin": "", "parentId": "45649" }, { "areaCode": "45718", "areaName": "开平市", "areaPinYin": "", "parentId": "45649" }, { "areaCode": "45719", "areaName": "恩平市", "areaPinYin": "", "parentId": "45649" }, { "areaCode": "45720", "areaName": "顺德区", "areaPinYin": "", "parentId": "45650" }, { "areaCode": "45721", "areaName": "禅城区", "areaPinYin": "", "parentId": "45650" }, { "areaCode": "45722", "areaName": "高明区", "areaPinYin": "", "parentId": "45650" }, { "areaCode": "45723", "areaName": "三水区", "areaPinYin": "", "parentId": "45650" }, { "areaCode": "45724", "areaName": "南海区", "areaPinYin": "", "parentId": "45650" }, { "areaCode": "45725", "areaName": "阳春市", "areaPinYin": "", "parentId": "45651" }, { "areaCode": "45726", "areaName": "阳西县", "areaPinYin": "", "parentId": "45651" }, { "areaCode": "45727", "areaName": "江城区", "areaPinYin": "", "parentId": "45651" }, { "areaCode": "45728", "areaName": "阳东县", "areaPinYin": "", "parentId": "45651" }, { "areaCode": "45729", "areaName": "雷州市", "areaPinYin": "", "parentId": "45652" }, { "areaCode": "45730", "areaName": "吴川市", "areaPinYin": "", "parentId": "45652" }, { "areaCode": "45731", "areaName": "徐闻县", "areaPinYin": "", "parentId": "45652" }, { "areaCode": "45732", "areaName": "坡头区", "areaPinYin": "", "parentId": "45652" }, { "areaCode": "45733", "areaName": "辖区", "areaPinYin": "", "parentId": "45652" }, { "areaCode": "45734", "areaName": "经济技术开发区", "areaPinYin": "", "parentId": "45652" }, { "areaCode": "45735", "areaName": "麻章区", "areaPinYin": "", "parentId": "45652" }, { "areaCode": "45736", "areaName": "遂溪县", "areaPinYin": "", "parentId": "45652" }, { "areaCode": "45737", "areaName": "廉江市", "areaPinYin": "", "parentId": "45652" }, { "areaCode": "45738", "areaName": "信宜市", "areaPinYin": "", "parentId": "45653" }, { "areaCode": "45739", "areaName": "茂南区", "areaPinYin": "", "parentId": "45653" }, { "areaCode": "45740", "areaName": "电白县", "areaPinYin": "", "parentId": "45653" }, { "areaCode": "45741", "areaName": "高州市", "areaPinYin": "", "parentId": "45653" }, { "areaCode": "45742", "areaName": "化州市", "areaPinYin": "", "parentId": "45653" }, { "areaCode": "45743", "areaName": "茂港区", "areaPinYin": "", "parentId": "45653" }, { "areaCode": "45744", "areaName": "广宁县", "areaPinYin": "", "parentId": "45654" }, { "areaCode": "45745", "areaName": "德庆县", "areaPinYin": "", "parentId": "45654" }, { "areaCode": "45746", "areaName": "怀集县", "areaPinYin": "", "parentId": "45654" }, { "areaCode": "45747", "areaName": "封开县", "areaPinYin": "", "parentId": "45654" }, { "areaCode": "45748", "areaName": "鼎湖区", "areaPinYin": "", "parentId": "45654" }, { "areaCode": "45749", "areaName": "端州区", "areaPinYin": "", "parentId": "45654" }, { "areaCode": "45750", "areaName": "四会市", "areaPinYin": "", "parentId": "45654" }, { "areaCode": "45751", "areaName": "高要市", "areaPinYin": "", "parentId": "45654" }, { "areaCode": "45752", "areaName": "云安县", "areaPinYin": "", "parentId": "45655" }, { "areaCode": "45753", "areaName": "新兴县", "areaPinYin": "", "parentId": "45655" }, { "areaCode": "45754", "areaName": "郁南县", "areaPinYin": "", "parentId": "45655" }, { "areaCode": "45755", "areaName": "云城区", "areaPinYin": "", "parentId": "45655" }, { "areaCode": "45756", "areaName": "罗定市", "areaPinYin": "", "parentId": "45655" }, { "areaCode": "45757", "areaName": "连州市", "areaPinYin": "", "parentId": "45656" }, { "areaCode": "45758", "areaName": "佛冈县", "areaPinYin": "", "parentId": "45656" }, { "areaCode": "45759", "areaName": "阳山县", "areaPinYin": "", "parentId": "45656" }, { "areaCode": "45760", "areaName": "清新县", "areaPinYin": "", "parentId": "45656" }, { "areaCode": "45761", "areaName": "连山县", "areaPinYin": "", "parentId": "45656" }, { "areaCode": "45762", "areaName": "连南县", "areaPinYin": "", "parentId": "45656" }, { "areaCode": "45763", "areaName": "清城区", "areaPinYin": "", "parentId": "45656" }, { "areaCode": "45764", "areaName": "英德市", "areaPinYin": "", "parentId": "45656" }, { "areaCode": "45765", "areaName": "饶平县", "areaPinYin": "", "parentId": "45657" }, { "areaCode": "45766", "areaName": "辖区", "areaPinYin": "", "parentId": "45657" }, { "areaCode": "45767", "areaName": "湘桥区", "areaPinYin": "", "parentId": "45657" }, { "areaCode": "45768", "areaName": "潮安县", "areaPinYin": "", "parentId": "45657" }, { "areaCode": "45769", "areaName": "揭西县", "areaPinYin": "", "parentId": "45658" }, { "areaCode": "45770", "areaName": "惠来县", "areaPinYin": "", "parentId": "45658" }, { "areaCode": "45771", "areaName": "辖区", "areaPinYin": "", "parentId": "45658" }, { "areaCode": "45772", "areaName": "榕城区", "areaPinYin": "", "parentId": "45658" }, { "areaCode": "45773", "areaName": "揭东县", "areaPinYin": "", "parentId": "45658" }, { "areaCode": "47288", "areaName": "澄海区", "areaPinYin": "", "parentId": "45641" }, { "areaCode": "47289", "areaName": "潮南区", "areaPinYin": "", "parentId": "45641" }, { "areaCode": "47290", "areaName": "普宁市", "areaPinYin": "", "parentId": "45658" }, { "areaCode": "47291", "areaName": "辖区", "areaPinYin": "", "parentId": "241" }, { "areaCode": "47292", "areaName": "辖区", "areaPinYin": "", "parentId": "287" }, { "areaCode": "47293", "areaName": "辖区", "areaPinYin": "", "parentId": "282" }, { "areaCode": "47294", "areaName": "辖区", "areaPinYin": "", "parentId": "279" }, { "areaCode": "47295", "areaName": "辖区", "areaPinYin": "", "parentId": "288" }]

        /***/
}),
/* 132 */
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function ($) {
            'use strict';
            __webpack_require__(133);
            var _http = __webpack_require__(53);



            var imgUpload = function () {
                var _this = this;
                this.init = function (wrap, param, fn) {
                    if (_http.isNull(wrap) || typeof $(wrap) !== 'object') {
                        return;
                    }
                    _this.wrap = $(wrap);
                    _this.param = {
                        fileId: param.fileId || 'prescription', //file控件的id，必传
                        url: param.url, //上传图片地址
                        success: param.success, //上传完后,回调方法
                        error: param.error, //上传完后,回调方法
                        checkSize: param.checkSize || true, //是否检查图片大小
                        maxFileSize: param.maxFileSize || 5 //文件最大上传大小（M），默认5MB
                    }
                    _this.bindEvent(fn);
                }
                this.bindEvent = function (fn) {
                    var fileInput = $('#' + _this.param.fileId);
                    fileInput.on("change", function () {
                        // 上传图片
                        var formData = new FormData();
                        var file = fileInput[0].files[0];
                        if (file != '' && !_this.param.checkSize || _this.param.checkSize && _this.checkSize(fileInput[0])) {
                            formData.append("file", file);
                        } else {
                            fileInput.val('');
                            return;
                        }
                        $.ajax({
                            url: _this.param.url,
                            type: "POST",
                            data: formData,
                            dataType: 'json',
                            processData: false,
                            contentType: false,
                            crossDomain: true,
                            success: _this.param.success,
                            error: _this.param.error
                        });
                    });
                    _this.wrap.find(".file-box").on("click", function (e) {
                        e.stopPropagation();
                    });
                    fn && typeof fn == 'function' && fn.apply(this, arguments);
                }
                this.checkSize = function (input) {
                    var Sys = {};
                    var flag;
                    var filesize = 0;
                    //判断浏览器种类
                    if (navigator.userAgent.indexOf("MSIE") > 0) {
                        Sys.ie = true;
                    }
                    //获取文件大小
                    if (Sys.ie) {
                        var fileobject = new ActiveXObject("Scripting.FileSystemObject"); //获取上传文件的对象
                        var file = fileobject.GetFile(input.value); //获取上传的文件
                        filesize = file.Size; //文件大小
                    } else {
                        filesize = input.files[0].size;
                    }
                    //判断是否符合要求
                    if (filesize / (1024 * 1024) <= _this.param.maxFileSize) {
                        flag = true;
                    } else {
                        alertBox('body', "图片过大，大小不能超过" + _this.param.maxFileSize + "MB！");
                        flag = false;
                    }
                    return flag;
                }
            }
            module.exports = imgUpload;
            /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

        /***/
}),
/* 133 */
/***/ (function (module, exports) {

        // removed by extract-text-webpack-plugin

        /***/
}),
/* 134 */,
/* 135 */
/***/ (function (module, exports, __webpack_require__) {


        'use strict';

        var _http = __webpack_require__(53);

        var _coupon = {
            // 获取优惠券列表--未使用
            getCouponList: function (couponCondition, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/mds/api/app/apiv3_0/listCoupon.json'),
                    data: couponCondition,
                    success: resolve,
                    error: reject
                });
            },
            // 待领取优惠券列表
            getUnclaimedCoupon: function (conditionInfo, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/mds/api/app/apiv3_0/getGivingCoupons.json'),
                    data: conditionInfo,
                    success: resolve,
                    error: reject
                });
            },
            // 优惠券可用商品列表
            getCouponProductList: function (conditionInfo, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/mds/api/app/apiv3_0/getCouponGoods.json'),
                    data: conditionInfo,
                    success: resolve,
                    error: reject
                });
            },
            // 领取优惠券
            getCoupons: function (coupondata, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/mobile/memberCoupon/getMemberCouponByCouponId.json'),
                    data: coupondata,
                    success: resolve,
                    error: reject
                });
            },
            // 领取多张优惠券--未使用
            getMoreCoupon: function (activityIds, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/mobile/memberCoupon/getMemberCouponByActivityIds.json'),
                    data: {
                        activityIds: activityIds
                    },
                    success: resolve,
                    error: reject
                });
            },
            //激活优惠券
            activeCoupons: function (memcCode, resolve, reject) {
                _http.applicationRequest({
                    url: _http.getmarketServerUrl('/adapter/memberCoupon/activateMemberCoupon'),
                    data: {
                        memcCode: memcCode
                    },
                    success: resolve,
                    error: reject
                });
            },
            //爽购
            staffCoupons: function (params, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/coupon/getAbleCoolPurchas.json'),
                    data: params,
                    success: resolve,
                    error: reject
                });
            },
            //积分接口 --未使用
            getMemberScore: function (memberId, resolve, reject) {
                _http.request({
                    url: _http.getServerUrl('/mds/api/app/apiv3_0/getMemberInformationPc.json'),
                    data: {
                        memberId: memberId
                    },
                    success: resolve,
                    error: reject
                });
            }

        }
        module.exports = _coupon;

        /***/
})
]);