;
(function(win) {
	var op = Object.prototype,
		ostring = op.toString,
		hasOwn = op.hasOwnProperty;

	function hasProp(obj, prop) {
		return hasOwn.call(obj, prop);
	}

	function isFunction(it) {
		return ostring.call(it) === '[object Function]';
	}

	function isArray(it) {
		return ostring.call(it) === '[object Array]';
	}

	function inArray(it, arr) {
		var flag = -1;
		for (var i = 0, len = arr.length; i < len; i++) {
			if (it === arr[i]) flag = i;
		}
		return flag;
	}

	function eachProp(obj, func) {
		var prop;
		for (prop in obj) {
			if (hasProp(obj, prop)) {
				if (func(obj[prop], prop)) {
					break;
				}
			}
		}
	}

	function mixin(target, source, force, deepStringMixin) {
		if (source) {
			eachProp(source, function(value, prop) {
				if (force || !hasProp(target, prop)) {
					if (deepStringMixin && typeof value === 'object' && value &&
						!isArray(value) && !isFunction(value) &&
						!(value instanceof RegExp)) {
						if (!target[prop]) {
							target[prop] = {};
						}
						mixin(target[prop], value, force, deepStringMixin);
					} else {
						target[prop] = value;
					}
				}
			});
		}
		return target;
	}

	function JsBridge(options) {
		var opts = mixin(defaultOpts, options || {}, true);
		this.options = opts; // 构造参数
	};

	JsBridge.prototype = {
		init: function(type, opts) {
			if (!type) return;
			this[type](opts);
		},
		// 选择图片
		image: function(opts) {
			var uri = this.options.protocol + "image#" + JSON.stringify({
				max: opts.max || 10,
				callback: opts.callback
			});
			win.location = uri;
		},
		// 是否显示积分规则弹窗
		canShowRule: function(opts) {
			opts = typeof opts === 'undefined' ? {} : opts;
			var uri = this.options.protocol + "canShowRule#" + JSON.stringify({
				rule: opts.rule || ""
			});
			win.location = uri;
		},
		// 显示picker
		showPicker: function(opts) {
			var uri = this.options.protocol + "showPicker#" + JSON.stringify({
				content: opts.content,
				callback: opts.callback
			});
			win.location = uri;
		},
		// 显示删除地址窗口
		showAddress: function(opts) {
			var uri = this.options.protocol + "showAddress#" + JSON.stringify({
				callback: opts.callback
			});
			win.location = uri;
		},
		// 新显示一个webview
		newPage: function(opts) {
			var uri = this.options.protocol + "newPage#" + JSON.stringify({
				url: opts.url, //需要跳转的url地址
				landscape: opts.landscape //1:横屏
			});
			win.location = uri;
		},
		// 页面风格
		show: function(opts) {
			var uri = this.options.protocol + "show#" + JSON.stringify({
				title: opts.title,
				flag: opts.flag, // header类型
				canShare: opts.canShare || 0, // 1：能显示分享按钮，0：不能显示分享按钮
				id: opts.id || "" // id：帖子id（资讯或圈子，根据flag区分，6是帖子，12是资讯）
			});
			win.location = uri;
		},
		// 进行登录
		login: function(opts) {
			opts = typeof opts === 'undefined' ? {} : opts;
			var uri = this.options.protocol + "login#" + JSON.stringify({
				callback: opts.callback || function() {} // 登陆后调用的javascript函数
			});
			win.location = uri;
		},
		// 返回
		back: function(opts) {
			var uri = this.options.protocol + "back#" + JSON.stringify({
				message: opts.message || "", // 返回上一级界面(消息不为空则弹出)
				module: opts.module || "", // 刷新module：需要刷新的模块。如：news 资讯首页、evaluate 健康评估首页、disease疾病评估
				refresh: opts.refresh || 0 // 是否刷新上一页
			});
			win.location = uri;
		},
		// 支付
		pay: function(opts) {
			var uri = this.options.protocol + "pay#" + encodeURIComponent(JSON.stringify({
				/*
					【支付参数 string型】
					1、支付宝时直接传递给支付宝
					2、微信时传递json字符串携带支付参数
				*/
				pay_params: opts.pay_params,
				pay_money: opts.pay_money,
				order_sn: opts.order_sn,
				/*
					succ_url、fail_url可能为空，为空时使用默认的成功、失败地址，并拼接上订单号、金额等。
					不为空的时候直接跳转到succ_url、fail_url即可。
				*/
				succ_url: opts.succ_url,
				fail_url: opts.fail_url,
				/*
					【支付类型】
					1、支付宝
					2、微信支付
					3、apple pay
				*/
				pay_type: opts.pay_type
			}));
			win.location = uri;
		},
		jump: function(opts) {
			var uri = this.options.protocol + "jump#" + JSON.stringify({
				moduleId: opts.moduleId, // 数字，模块id，必填
				// 从客户端页面返回到H5页面是否刷新。appearRefresh:1:显示刷新 0：不需要显示刷新
				appearRefresh: opts.appearRefresh,
				pageId: opts.pageId, // 数字，子模块id，选填
				params: opts.params // 跳转地址
			});
			win.location = uri;
		}
	};

	var defaultOpts = {
		protocol: "miaomore://"
	};

	win.JsBridge = JsBridge;
})(window);