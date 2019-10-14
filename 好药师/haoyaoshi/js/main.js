webpackJsonp([5], {

/***/ 0:
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function ($) {
                'use strict';

                __webpack_require__(170);
                __webpack_require__(184);
                __webpack_require__(185);
                __webpack_require__(73);
                __webpack_require__(87);
                __webpack_require__(186);
                __webpack_require__(187);
                var _http = __webpack_require__(53);
                var _login = __webpack_require__(62);
                var Position = __webpack_require__(103);
                var LoginContent = __webpack_require__(63);

                var Index = {
                    init: function (fn) {
                        // if (!isLogin()) {
                        // 	this.autoLogin(fn);
                        // }
                        this.bindEvent();
                        if (!_http.getCookie('positionAddress')) {
                            // $('.topPosition').trigger('click');

                            var positon = new Position(function () {
                                // window.scrollImgLeft();
                            });
                            positon.adderssBox();
                        }
                        // 埋点
                        ehyTrack.track('进入好药师首页', {});
                        if (_http.getCookie('accountId') && _http.getCookie('accountId') != '') {
                            ehyTrack.identify(_http.getCookie('accountId'), {
                                '会员积分': _http.getCookie('points'),
                                '性别': _http.getCookie('sex') == 0 ? '女' : '男',
                                '年龄': _http.getCookie('age'),
                                '手机号': _http.getCookie('mobile'),
                                '帐号余额': _http.getCookie('balance'),
                                '优惠券数量': _http.getCookie('coupons')
                            });
                        }
                    },
                    bindEvent: function () {
                        var _this = this;
                        //顶部广告图		
                        if (!_http.getCookie('topimg')) {
                            document.cookie = "topimg=" + encodeURIComponent('true');
                            $(".topimg").animate({ height: "150px" }, 500);
                            $(".close").animate({ height: "20px" }, 300);
                        } else {
                            if (_http.getCookie('topimg') == 'true') {
                                $(".topimg").animate({ height: "150px" }, 500);
                                $(".close").animate({ height: "20px" }, 300);
                            }
                        }
                        $(".close").on('click', function () {
                            document.cookie = "topimg=" + encodeURIComponent('false');
                            $(".topimg").animate({ height: "0" }, 300);
                            $(".close").animate({ height: "0" }, 300);
                        })

                        if (_http.getCookie('positionAddress')) {
                            $('.topPosition span').html(_http.getCookie('positionCity') + _http.getCookie('positionAddress'));
                        } else {
                            var positon = new Position();
                            positon.adderssBox();

                        }
                        $('.topPosition').on('click', function () {
                            _this.address();
                        });
                        //首页分类
                        $(".category-nav-sup li").hover(
                            function () {
                                $(this).addClass("hover").next("div").show();
                                $(this).siblings('li').removeClass('hover');
                            },
                            function () {
                                $(this).removeClass("hover").next("div").hide();
                            }
                        );

                        //楼层
                        $(function () {
                            $(".ac_tab  li:last-child").find('i').hide();
                            $("#elevator ul li").hover(function () {
                                var index = $(this).index();
                                $(this).addClass("hover" + index);
                            }, function () {
                                var index = $(this).index();
                                $(this).removeClass("hover" + index);
                            });
                            var dw = $(document.body).width(),
                                l = (dw - 1200) / 2 - 40;
                            if (dw < 1200) {
                                $("#elevator").hide();
                            } else {
                                $("#elevator").css({ "left": l });
                            }
                            //左侧楼层定位
                            window.onresize = function () {
                                var dw1 = document.documentElement.clientWidth,
                                    l = (dw1 - 1200) / 2 - 40;
                                if (dw1 > 1200) {
                                    $("#elevator").css({ "left": l }).show();
                                } else {
                                    $("#elevator").hide();
                                }
                            }

                            function changeFloor() {
                                var floorObj = $(".floor_list"),
                                    elevator = $("#elevator");
                                if (floorObj.length < 1) {
                                    return;
                                }
                                var scrollTop = $(document).scrollTop(); //滚动高度  
                                var topH = floorObj.offset().top;
                                var dw1 = document.documentElement.clientWidth,
                                    l = (dw1 - 1200) / 2 - 40;
                                if (topH - scrollTop < 300 && dw1 > 1200) {
                                    elevator.show();
                                    elevator.css({ "left": l });
                                } else {
                                    elevator.hide();
                                }

                                $(".floor_list").each(function (idx, e) {
                                    var ypos = $(this).offset().top - 200;
                                    var h = $(this).height();
                                    if (scrollTop > ypos && scrollTop < ypos + h) {
                                        elevator.find("li").eq(idx).addClass("cur" + idx).siblings().removeAttr('class');
                                    }
                                });
                            }
                            //滚动	
                            var flag = true;
                            $(window).scroll(function () {
                                if (flag) {
                                    setTimeout(changeFloor, 800);
                                    flag = false;
                                } else {
                                    flag = true;
                                }
                            });
                            //2.获取每个楼梯的offset().top,点击楼梯让对应的内容模块移动到对应的位置  offset().left

                            var $loutili = $('#elevator li').not('.rTop');
                            $loutili.on('click', function () {
                                $loutili.eq($(this).index()).addClass("cur" + $(this).index()).siblings().removeAttr('class');
                                var $loutitop = $('.floor_list').eq($(this).index()).offset().top;
                                //获取每个楼梯的offsetTop值
                                $('html,body').animate({
                                    scrollTop: $loutitop
                                })
                            });
                            //3.回到顶部
                            $('.rTop').on('click', function () {
                                $('html,body').animate({
                                    scrollTop: 0
                                })
                            });
                        })


                        //首页轮播图
                        $('.gallery').gallery({
                            dots: true,
                            complete: function (obj, idx) {
                                //var color = "#"+ (bgArr[idx] ? bgArr[idx] : "fdeec2");
                                var color = obj.find('li>a').eq(idx).attr("data-color") || "#fdeec2";
                                $(".categoryBox").css("background-color", color);
                            }
                        });
                        // 埋点
                        $(".gallery li a").on('click', function () {
                            var tit = $(this).attr("title");
                            ehyTrack.track('点击banner_首页', {
                                'banner名称': tit
                            });
                        });
                        $(".notice .n_ad a").on("click", function () {
                            var tit = $(this).attr("title");
                            ehyTrack.track('点击热点推荐位广告位_首页', {
                                '广告名称': tit
                            });
                        });
                        $(".notice .n_cont .n_tab li").on("click", function () {
                            var tit = $(this).text().replace('|', '');
                            ehyTrack.track('点击热点推荐位顶部导航_首页', {
                                '导航名称': tit
                            });
                        });
                        $(".notice .n_cont .n_tabCon li").on("click", function () {
                            var tit = $(this).text();
                            var cate = $(this).parents('n_cont').find('.n_tab li.active').text().replace('|', '');
                            ehyTrack.track('点击热点推荐位消息_首页', {
                                '消息名称': tit,
                                '所属分类': cate
                            });
                        });
                        $(".good-service li").on("click", function () {
                            var tit = $(this).text();
                            ehyTrack.track('点击热点推荐位导航_首页', {
                                '导航名称': tit
                            });
                        });
                        $(".in_pharmacist .turnPicBox li").on("click", function () {
                            var name = $(this).find('.in_name').text();
                            var label = $(this).find('.icon-title').text();
                            var brand = $(this).data('brand') || '';
                            var bprice = $(this).data('bprice');
                            var price = $(this).data('price');
                            ehyTrack.track('点击限时秒杀药品_首页', {
                                '药品名称': name,
                                '药品品牌': brand,
                                '药品原金额': price,
                                '药品秒杀金额': bprice,
                                '药品标签': label
                            });
                        });
                        $(".activiy_tab .ac_cont li a").on("click", function () {
                            var cate = $('.activiy_tab .ac_tab li.active').text().replace('|', '');
                            var name = $(this).attr("title");
                            ehyTrack.track('点击活动推荐&品牌专题_首页', {
                                '活动&品牌名称': name,
                                '所属分类': cate
                            });
                        });
                        $(".floor_left .tab-title a").on("click", function () {
                            var name = $(this).text();
                            var cate = $(this).parents('.floor_left').find('.hot-title h2').text();
                            ehyTrack.track('点击楼层导航_首页', {
                                '导航名称': name,
                                '所属分类': cate
                            });
                        });
                        $(".floor_left .down-img a").on("click", function () {
                            var name = $(this).text();
                            var cate = $(this).parents('.floor_left').find('.hot-title h2').text();
                            ehyTrack.track('点击楼层海报导航_首页', {
                                '导航名称': name,
                                '所属分类': cate
                            });
                        });
                        $(".floor_left .con_down li,.floor_list .cont-prduct li").on("click", function () {
                            var name = $(this).find('.name').text();
                            var brand = $(this).find('.des').text();
                            var price = $(this).find('.price').text().replace('￥', '');
                            var cate = $(this).parents('.floor_left').find('.hot-title h2').text();
                            ehyTrack.track('点击楼层药品导航_首页', {
                                '药品名称': name,
                                '药品品牌': brand,
                                '药品金额': price,
                                '所属分类': cate
                            });
                        });
                        $(".floor_left .brand_icon a").on("click", function () {
                            var brand = $(this).attr('title');
                            var cate = $(this).parents('.floor_left').find('.hot-title h2').text();
                            ehyTrack.track('点击楼层品牌导航_首页', {
                                '品牌名称': brand,
                                '所属分类': cate
                            });
                        });
                        $(".other-product li a").on("click", function (e) {
                            e.preventDefault();
                            var name = $(this).parents('li').find(".name").text();
                            var brand = $(this).parents('li').data('brand') || '';
                            var price = $(this).parents('li').find(".now_price").text().replace('￥', '');
                            ehyTrack.track('点击逛了再逛药品_首页', {
                                '药品名称': name,
                                '药品品牌': brand,
                                '药品金额': price
                            });
                            location.href = $(this).attr('href');
                        });
                        $('.topimg').on("click", function () {
                            var name = $(this).attr("title");
                            ehyTrack.track('点击广告位_首页', {
                                '广告名称': name,
                                '所在位置': '顶部'
                            });
                        });
                        $('.midimg a').on("click", function () {
                            var name = $(this).attr("title");
                            ehyTrack.track('点击广告位_首页', {
                                '广告名称': name,
                                '所在位置': '中部'
                            });
                        });
                        $('.bottomimg a').on("click", function () {
                            var name = $(this).attr("title");
                            ehyTrack.track('点击广告位_首页', {
                                '广告名称': name,
                                '所在位置': '底部'
                            });
                        });
                        // 埋点end
                        //贴心药师
                        $('.turnPicBox').turnpicpage({
                            pageCount: 6,
                            subPicBox: '.cont',
                            spaceBetween: 0,
                            turnType: 'c',
                            btnStatus: 'on',
                            callback: function (obj) {
                                obj.find("img").trigger('appear');
                            }
                        });
                        //优质服务
                        $(".n_tab li").click(function () {
                            var index = $(this).index();
                            $(this).addClass('active').siblings().removeClass('active');
                            $('.nitem').eq(index).show().siblings().hide();
                        });
                        //活动推荐
                        $(".ac_tab li").click(function () {
                            var index = $(this).index();
                            $(this).addClass('active').siblings().removeClass('active');
                            $('.ac_item').eq(index).show().siblings().hide();
                        });
                        //公告滚动
                        $('#scrolltop_div').vTicker({
                            speed: 500,
                            pause: 2000,
                            animation: 'fade',
                            mousePause: false,
                            showItems: 3
                        });
                        //秒杀
                        var nowTime = $('.seckill').attr('date-now');
                        var starTime = $('.seckill').attr('date-start');
                        var endTime = $('.seckill').attr('date-end');
                        $('.seckill').activityTime({
                            nowdate: nowTime,
                            startTime: starTime,
                            endTime: endTime
                        });
                        //618访问官网弹出领取优惠券窗口
                        //_this.PopoutCouponDialog();
                    },
                    PopoutCouponDialog: function () {
                        new ehaoyao.tips({
                            position: "center",
                            id: "dialogBox_coupon",
                            style: "hy-dialogBox",
                            hasTitle: false,
                            content: '<div id="btn_jump_coupon" class="btn_ok"></div>',
                            callback: function (fn) {
                                $('#btn_jump_coupon').on('click', function () {
                                    window.location.href = _http.host + '/receiveCoupon.html';
                                });
                            }
                        });
                    },
                    address: function () {
                        var cont = _setDialogCont('address') || '';
                        new ehaoyao.tips({
                            position: "center",
                            id: "dialogBox_address",
                            style: "dialogBox_address",
                            hasTitle: true,
                            title: "",
                            content: cont,
                            callback: function (fn) {

                            }
                        });
                    },
                    //网易云
                    showCount: function () {
                        ysf.open();
                    },
                    //自动登录--使用头部的，暂时没用
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
                                        name = res.data.name;

                                    // _http.setCookie('sid', sid, '0.25', location.hostname);
                                    _http.setCookie('accountId', aId, '0.25', location.hostname);
                                    _http.setCookie('uid', aId, '0.25');
                                    _http.setCookie('username', username, '0.25', location.hostname);
                                    _http.setCookie('name', name, '0.25', location.hostname);

                                    //               
                                    //              if(fn){
                                    //                  fn && fn();
                                    //              }else{
                                    //              	var loginContent = new LoginContent();
                                    //                  loginContent.redirect();
                                    //              }
                                    loadLogin();
                                },
                                function (errorMsg) {
                                    $('.item-tips-login-pwd').html(errorMsg);
                                });
                        }

                    }
                };

                $(function () {
                    Index.init();
                });
                /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

            /***/
}),

/***/ 170:
/***/ (function (module, exports) {

            // removed by extract-text-webpack-plugin

            /***/
}),

/***/ 184:
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function (jQuery) {
                (function ($) {
                    var Switab = function () {
                        var _ = this;

                        _.opts = {
                            tabTitleName: '.tabTitle', //选项卡页签框class
                            tabConName: '.tabContent', //选项框内容框class
                            activeClass: 'active', //当前显示选项卡class,
                            titleItems: 'li', // 页签框选择器
                            notTitleItems: '',//排除选择器
                            conItems: '.tabItem', // 内容框选择器
                            optEvent: 'mouseover',//选项卡切换事件 mouseover/click
                            callback: null //回调函数
                        };


                        _.init = function (obj, opts) {
                            var opts = $.extend({}, _.opts, opts);

                            var tabTitle,
                                tabContex;

                            tabTitle = obj.find(opts.tabTitleName); //头部页签框对象
                            tabContex = obj.find(opts.tabConName); //内容框对象

                            tabTitle.find(opts.titleItems).not(opts.notTitleItems).off(opts.optEvent).on(opts.optEvent, function (e) {
                                e.stopPropagation();
                                var idx = $(this).index();
                                $(this).addClass(opts.activeClass).siblings().removeClass(opts.activeClass);

                                tabContex.find(opts.conItems).eq(idx).show().siblings().hide();

                                var subCon = tabContex.find(opts.conItems).eq(idx);
                                opts.callback && opts.callback(idx, subCon);
                            });
                        };
                    }
                    $.fn.switab = function (options) {
                        var len = this.length;
                        //  Enable multiple-slider support
                        return this.each(function (index) {
                            var $this = $(this),
                                key = 'switab' + (len > 1 ? '-' + (++index) : ''),
                                instance = (new Switab).init($this, options);

                            $this.data(key, instance).data('key', key);
                        });
                    };
                })(jQuery);

                /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

            /***/
}),

/***/ 185:
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function (jQuery) {
                (function ($, f) {
                    /****** 图片轮播 ******/
                    var TurnPicPage = function () {
                        var _ = this;

                        // Set default options
                        _.opts = {
                            subPicBox: '>div', //轮播框对象
                            showTurnbtn: f,
                            spaceBetween: 0,
                            turnBtnName: 'btn-turnPage',
                            direction: 'H',//轮播方向，水平方向( horizontal)、竖直方向(vertical)
                            turnType: 'p',//page :一屏移动、count:一项移动 
                            pageCount: 4, //轮播框内页显示几项内容
                            speed: 300,
                            items: '>ul',   // 轮播框内容框选择器
                            item: '>li',   // 轮播框内容列表项选择器
                            prev: '&lt;', //上一页
                            next: '&gt;',  //下一页
                            btnStatus: 'off',//按钮置灰状态控制 on:启动 off:关闭
                            disableBtn: "disabled",//按钮变灰
                            callback: null
                        };


                        _.init = function (obj, opts) {
                            _.opts = $.extend({}, _.opts, opts);
                            _.obj = obj;
                            _.subBox = obj.find(_.opts.subPicBox);
                            _.ul = _.subBox.find(_.opts.items);
                            _.li = _.ul.find(_.opts.item);
                            _.max = [_.subBox.outerWidth() | 0, _.subBox.outerHeight() | 0];
                            var len = _.li.length;
                            _.totalPage = Math.ceil(len / _.opts.pageCount);

                            if (_.opts.turnType == 'p') {
                                _.moveWidth = (_.li.outerWidth(true) * _.opts.pageCount);
                                _.moveHeight = (_.li.outerHeight(true) * _.opts.pageCount);
                                _.total = _.totalPage
                            } else {
                                _.moveWidth = _.li.outerWidth(true);
                                _.moveHeight = _.li.outerHeight(true);
                                _.total = len - _.opts.pageCount + 1;
                            }





                            var subBox = _.subBox,
                                ul = _.ul;

                            _.page = 1;

                            if (_.opts.direction == 'H') {
                                //obj.css({overflow: 'hidden',position:'relative'});
                                //subBox.css({width: _.max[0], height:_.max[1],margin:'0 auto', overflow: 'hidden',position:'relative'});
                                ul.css({ position: 'absolute', left: 0, top: 0, width: ((_.li.outerWidth(true) * _.opts.pageCount) * _.totalPage) });
                            } else if (_.opts.direction == 'V') {
                                //subBox.css({width: _.max[0],margin:'0 auto', overflow: 'hidden',position:'relative'});
                                ul.css({ position: 'absolute', left: 0, top: 0, height: ((_.li.outerHeight(true) * _.opts.pageCount) * _.totalPage) });
                            }

                            //添加翻页按钮
                            addTurnBtn();

                            //_.obj.find('.prePage').addClass(_.opts.disableBtn);

                            if (_.totalPage <= 1) {
                                _.obj.find('.prePage').css("display", "none");
                                _.obj.find('.nextPage').css("display", "none");
                            }
                        }

                        _.move = function (direct) {
                            var content_list = _.ul,
                                current = _.page;

                            if (!content_list.is(":animated")) {    //判断“内容展示区域”是否正在处于动画
                                if (direct == 'pre') {
                                    if (current != 1) {
                                        if (_.opts.direction == 'H') {
                                            content_list.animate({ left: '+=' + _.moveWidth }, _.opts.speed);
                                        } else {
                                            content_list.animate({ top: '+=' + _.moveHeight }, _.opts.speed);
                                        }
                                        current--;
                                    }
                                } else {

                                    if (current != _.total) {
                                        if (_.opts.direction == 'H') {
                                            content_list.animate({ left: '-=' + _.moveWidth }, _.opts.speed);  //通过改变left值，达到每次换一个版面
                                        } else {
                                            content_list.animate({ top: '-=' + _.moveHeight }, _.opts.speed);  //通过改变left值，达到每次换一个版面
                                        }
                                        current++;
                                    }
                                }

                                if (current == 1) {
                                    _.obj.find('.prePage').addClass(_.opts.disableBtn);
                                } else {
                                    _.obj.find('.prePage').removeClass(_.opts.disableBtn);
                                }
                                if (current == _.total) {
                                    _.obj.find('.nextPage').addClass(_.opts.disableBtn);
                                } else {
                                    _.obj.find('.nextPage').removeClass(_.opts.disableBtn);
                                }

                                _.page = current;
                                _.opts.callback && _.opts.callback(content_list);
                            }
                        };

                        //  Move to previous/next slide
                        _.next = function () {
                            return _.move('next');
                        };

                        _.prev = function () {
                            return _.move('pre');
                        };

                        function addTurnBtn() {
                            if (_.opts.showTurnbtn) {
                                var html = '<div class="' + _.opts.turnBtnName + ' prePage disabled">' + _.opts.prev + '</div>';
                                html = html + '<div class="' + _.opts.turnBtnName + ' nextPage">' + _.opts.next + '</div>';
                                _.obj.append(html);
                            }
                            _.obj.find('.' + _.opts.turnBtnName).click(function (event) {
                                var me = $(this);
                                me.hasClass('prePage') ? _.prev() : _.next();
                                //event.stopPropagation();    //  阻止事件冒泡
                            });
                        }

                    }
                    $.fn.turnpicpage = function (options) {
                        var len = this.length;
                        //multiple support
                        return this.each(function (index) {
                            var $this = $(this),
                                key = 'turnpic' + (len > 1 ? '-' + (++index) : ''),
                                instance = (new TurnPicPage).init($this, options);

                            $this.data(key, instance).data('key', key);
                        });
                    };
                })(jQuery, false);

                (function (a) {
                    a.fn.vTicker = function (b) {
                        var c = {
                            speed: 700,
                            pause: 4000,
                            showItems: 3,
                            animation: "",
                            mousePause: true,
                            isPaused: false,
                            direction: "up",
                            height: 0
                        };
                        var b = a.extend(c, b);
                        moveUp = function (g, d, e) {
                            if (e.isPaused) {
                                return
                            }
                            var f = g.children("ul");
                            var h = f.children("li:first").clone(true);
                            if (e.height > 0) {
                                d = f.children("li:first").height()
                            }
                            f.animate({
                                top: "-=" + d + "px"
                            },
                                e.speed,
                                function () {
                                    a(this).children("li:first").remove();
                                    a(this).css("top", "0px")
                                });
                            if (e.animation == "fade") {
                                f.children("li:first").fadeOut(e.speed);
                                if (e.height == 0) {
                                    f.children("li:eq(" + e.showItems + ")").hide().fadeIn(e.speed)
                                }
                            }
                            h.appendTo(f)
                        };
                        moveDown = function (g, d, e) {
                            if (e.isPaused) {
                                return
                            }
                            var f = g.children("ul");
                            var h = f.children("li:last").clone(true);
                            if (e.height > 0) {
                                d = f.children("li:first").height()
                            }
                            f.css("top", "-" + d + "px").prepend(h);
                            f.animate({
                                top: 0
                            },
                                e.speed,
                                function () {
                                    a(this).children("li:last").remove()
                                });
                            if (e.animation == "fade") {
                                if (e.height == 0) {
                                    f.children("li:eq(" + e.showItems + ")").fadeOut(e.speed)
                                }
                                f.children("li:first").hide().fadeIn(e.speed)
                            }
                        };
                        return this.each(function () {
                            var f = a(this);
                            var e = 0;
                            f.css({
                                overflow: "hidden",
                                position: "relative"
                            }).children("ul").css({
                                position: "absolute",
                                margin: 0,
                                padding: 0
                            }).children("li").css({
                            });
                            if (b.height == 0) {
                                f.children("ul").children("li").each(function () {
                                    if (a(this).height() > e) {
                                        e = a(this).height()
                                    }
                                });
                                f.children("ul").children("li").each(function () {
                                    a(this).height(e)
                                });
                                f.height(e * b.showItems)
                            } else {
                                f.height(b.height)
                            }
                            var d = setInterval(function () {
                                if (b.direction == "up") {
                                    moveUp(f, e, b)
                                } else {
                                    moveDown(f, e, b)
                                }
                            },
                                b.pause);
                            if (b.mousePause) {
                                f.bind("mouseenter",
                                    function () {
                                        b.isPaused = true
                                    }).bind("mouseleave",
                                        function () {
                                            b.isPaused = false
                                        })
                            }
                        })
                    }
                })(jQuery);
                /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

            /***/
}),

/***/ 186:
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function (jQuery) {/**
	 * jQuery.ScrollTo
	 * Copyright (c) 2007-2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
	 * Dual licensed under MIT and GPL.
	 * Date: 9/11/2008
	 *
	 * @projectDescription Easy element scrolling using jQuery.
	 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
	 * Tested with jQuery 1.2.6. On FF 2/3, IE 6/7, Opera 9.2/5 and Safari 3. on Windows.
	 *
	 * @author Ariel Flesler
	 * @version 1.4
	 *
	 * @id jQuery.scrollTo
	 * @id jQuery.fn.scrollTo
	 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
	 *	  The different options for target are:
	 *		- A number position (will be applied to all axes).
	 *		- A string position ('44', '100px', '+=90', etc ) will be applied to all axes
	 *		- A jQuery/DOM element ( logically, child of the element to scroll )
	 *		- A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
	 *		- A hash { top:x, left:y }, x and y can be any kind of number/string like above.
	 * @param {Number} duration The OVERALL length of the animation, this argument can be the settings object instead.
	 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
	 *	 @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
	 *	 @option {Number} duration The OVERALL length of the animation.
	 *	 @option {String} easing The easing method for the animation.
	 *	 @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
	 *	 @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
	 *	 @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
	 *	 @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
	 *	 @option {Function} onAfter Function to be called after the scrolling ends. 
	 *	 @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
	 * @return {jQuery} Returns the same jQuery object, for chaining.
	 *
	 * @desc Scroll to a fixed position
	 * @example $('div').scrollTo( 340 );
	 *
	 * @desc Scroll relatively to the actual position
	 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
	 *
	 * @dec Scroll using a selector (relative to the scrolled element)
	 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
	 *
	 * @ Scroll to a DOM element (same for jQuery object)
	 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
	 *			$('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
	 *				alert('scrolled!!');																   
	 *			}});
	 *
	 * @desc Scroll on both axes, to different values
	 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
	 */
                ; (function ($) {

                    var $scrollTo = $.scrollTo = function (target, duration, settings) {
                        $(window).scrollTo(target, duration, settings);
                    };

                    $scrollTo.defaults = {
                        axis: 'y',
                        duration: 1
                    };

                    // Returns the element that needs to be animated to scroll the window.
                    // Kept for backwards compatibility (specially for localScroll & serialScroll)
                    $scrollTo.window = function (scope) {
                        return $(window).scrollable();
                    };

                    // Hack, hack, hack... stay away!
                    // Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
                    jQuery.browser = {}; (function () { jQuery.browser.msie = false; jQuery.browser.version = 0; if (navigator.userAgent.match(/MSIE ([0-9]+)./)) { jQuery.browser.msie = true; jQuery.browser.version = RegExp.$1; } })();
                    $.fn.scrollable = function () {
                        return this.map(function () {
                            // Just store it, we might need it
                            var win = this.parentWindow || this.defaultView,
                                // If it's a document, get its iframe or the window if it's THE document
                                elem = this.nodeName == '#document' ? win.frameElement || win : this,
                                // Get the corresponding document
                                doc = elem.contentDocument || (elem.contentWindow || elem).document,
                                isWin = elem.setInterval;

                            return elem.nodeName == 'IFRAME' || isWin && $.browser.safari ? doc.body
                                : isWin ? doc.documentElement
                                    : this;
                        });
                    };

                    $.fn.scrollTo = function (target, duration, settings) {
                        if (typeof duration == 'object') {
                            settings = duration;
                            duration = 0;
                        }
                        if (typeof settings == 'function')
                            settings = { onAfter: settings };

                        settings = $.extend({}, $scrollTo.defaults, settings);
                        // Speed is still recognized for backwards compatibility
                        duration = duration || settings.speed || settings.duration;
                        // Make sure the settings are given right
                        settings.queue = settings.queue && settings.axis.length > 1;

                        if (settings.queue)
                            // Let's keep the overall duration
                            duration /= 2;
                        settings.offset = both(settings.offset);
                        settings.over = both(settings.over);

                        return this.scrollable().each(function () {
                            var elem = this,
                                $elem = $(elem),
                                targ = target, toff, attr = {},
                                win = $elem.is('html,body');

                            switch (typeof targ) {
                                // A number will pass the regex
                                case 'number':
                                case 'string':
                                    if (/^([+-]=)?\d+(px)?$/.test(targ)) {
                                        targ = both(targ);
                                        // We are done
                                        break;
                                    }
                                    // Relative selector, no break!
                                    targ = $(targ, this);
                                case 'object':
                                    // DOMElement / jQuery
                                    if (targ.is || targ.style)
                                        // Get the real position of the target 
                                        toff = (targ = $(targ)).offset();
                            }
                            $.each(settings.axis.split(''), function (i, axis) {
                                var Pos = axis == 'x' ? 'Left' : 'Top',
                                    pos = Pos.toLowerCase(),
                                    key = 'scroll' + Pos,
                                    old = elem[key],
                                    Dim = axis == 'x' ? 'Width' : 'Height',
                                    dim = Dim.toLowerCase();

                                if (toff) {// jQuery / DOMElement
                                    attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);

                                    // If it's a dom element, reduce the margin
                                    if (settings.margin) {
                                        attr[key] -= parseInt(targ.css('margin' + Pos)) || 0;
                                        attr[key] -= parseInt(targ.css('border' + Pos + 'Width')) || 0;
                                    }

                                    attr[key] += settings.offset[pos] || 0;

                                    if (settings.over[pos])
                                        // Scroll to a fraction of its width/height
                                        attr[key] += targ[dim]() * settings.over[pos];
                                } else
                                    attr[key] = targ[pos];

                                // Number or 'number'
                                if (/^\d+$/.test(attr[key]))
                                    // Check the limits
                                    attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max(Dim));

                                // Queueing axes
                                if (!i && settings.queue) {
                                    // Don't waste time animating, if there's no need.
                                    if (old != attr[key])
                                        // Intermediate animation
                                        animate(settings.onAfterFirst);
                                    // Don't animate this axis again in the next iteration.
                                    delete attr[key];
                                }
                            });
                            animate(settings.onAfter);

                            function animate(callback) {
                                $elem.animate(attr, duration, settings.easing, callback && function () {
                                    callback.call(this, target, settings);
                                });
                            };
                            function max(Dim) {
                                var attr = 'scroll' + Dim,
                                    doc = elem.ownerDocument;

                                return win
                                    ? Math.max(doc.documentElement[attr], doc.body[attr])
                                    : elem[attr];
                            };
                        }).end();
                    };

                    function both(val) {
                        return typeof val == 'object' ? val : { top: val, left: val };
                    };

                })(jQuery);
                /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

            /***/
}),

/***/ 187:
/***/ (function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function (jQuery) {
                (function ($) {
                    var ActivityTimeFunc = function (obj, params) {
                        var defaults = {
                            nowdate: "",
                            startTime: "",
                            endTime: ""
                        }
                        params = $.extend({}, defaults, params);
                        var _this = this,
                            counter,//计时器
                            countOverTime,//活动开始倒计时时间
                            countdownTime,//活动未开始倒计时时间
                            nowTime = new Date(params.nowdate.replace(/-/g, '/')).getTime(), //服务器时间
                            startTime = new Date(params.startTime.replace(/-/g, '/')).getTime(),//活动开始时间
                            endTime = new Date(params.endTime.replace(/-/g, '/')).getTime();  //活动结束时间
                        if (obj.hasClass('js_active')) {
                            return
                        }
                        if (nowTime > endTime) {
                            obj.find('.seckill_go').hide();
                            obj.find('.seckill_num').hide();
                            obj.find('.cont_text').html("活动已结束");
                            return;
                        } else if (nowTime >= startTime && nowTime < endTime) {
                            obj.find('.seckill_go').show();
                            obj.find('.seckill_num').show();
                            countOverTime = parseInt((endTime - nowTime) / 1000);
                            counter = setInterval(function () {
                                _this.seckill();
                            }, 1000);
                        } else if (nowTime < startTime) {
                            obj.find('.seckill_go').show();
                            obj.find('.seckill_num').show();
                            countdownTime = parseInt((startTime - nowTime) / 1000);
                            counter = setInterval(function () {
                                _this.seckill();
                            }, 1000);
                        } else {
                            obj.find('.seckill_go').hide();
                            obj.find('.seckill_num').hide();
                            obj.find('.cont_text').html("即将开始 , 敬请期待");
                        }
                        obj.addClass("js_active");

                        _this.seckill = function () {
                            if (countOverTime > 0) {
                                _this.showCounterTime(countOverTime, '后结束抢购');
                                countOverTime--;
                                if (countOverTime == 0) {
                                    window.location.href = window.location.href;
                                }
                                return;
                            }
                            if (countdownTime > 0) {
                                _this.showCounterTime(countdownTime, '后开始抢购');
                                countdownTime--;
                                if (countdownTime == 0) {
                                    window.location.href = window.location.href;
                                }
                                return;
                            }
                            clearInterval(counter);
                        };
                        _this.showCounterTime = function (t, msg) {
                            var d = _this.changeTime(parseInt(t / 60 / 60 / 24));
                            var h = _this.changeTime(parseInt(t / 60 / 60 % 24));
                            var m = _this.changeTime(parseInt(t / 60 % 60));
                            var s = _this.changeTime(parseInt(t % 60));
                            obj.find("#seckill_d").text(d);
                            obj.find("#seckill_h").text(h);
                            obj.find("#seckill_m").text(m);
                            obj.find("#seckill_s").text(s);
                            if (obj.find("#seckill_d").text() > 0) {
                                obj.find('.seck_d').show();
                                obj.find('.seck_s').hide();
                            } else {
                                obj.find('.seck_d').hide();
                                obj.find('.seck_s').show();
                            }
                            msg && obj.find(".contText").text(msg);
                        };
                        _this.changeTime = function (i) {
                            return (i < 10) ? ('0' + i) : i;
                        }
                        return _this;
                    }
                    $.fn.activityTime = function (options) {

                        return this.each(function (index) {
                            var $this = $(this),
                                instance = new ActivityTimeFunc($this, options);
                        });
                    }
                })(jQuery);

                /* WEBPACK VAR INJECTION */
}.call(exports, __webpack_require__(2)))

            /***/
})

});