// broswer detect
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s;
(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

var banner = [{"name":"top", "front_num":0, "height":"55%"},
				{"name":"fragment", "front_num":1},
				{"name":"justfall", "front_num":1},
				{"name":"fountain", "front_num":1}];

var session_id = Math.random();
var mspf = 25;
var scroll_speed_delta = 20;
var scroll_speed_max = 40;
var pf_speed_delta = 5;
var scroll_speed = 0;

function window_update()
{
}

function scroll_update()
{
	var len = banner.length;
	for (var i = 0; i < len; i++) {
		var pos = getWindowPositionById(banner[i].id);
		if (pos < 0.0 || pos > 100.0) continue;
		if (i == 0) {
			var scrollTop = getScrollTop();
			$(banner[i].div.content_div.back_div).css("background-position", "0px " + (scrollTop * 0.6) + "px");
		} else {
			$(banner[i].div.content_div.back_div).css("background-position", "100% " + pos + "%");
			$(banner[i].div.content_div.front_div).css("background-position", "100% " + (120.0 - pos * 1.2) + "%");
		}
	}
	tellSidebar_OnScroll();
}

function real_scroll(){
	if (scroll_speed > 0 || getScrollTop() > 0) {
		$(document).scrollTop(getScrollTop() + scroll_speed);
	}
	if (scroll_speed > 0)
		scroll_speed -= pf_speed_delta;
	if (scroll_speed < 0)
		scroll_speed += pf_speed_delta;
}

function scroll()
{
	stopBodyAnimation();
	var scroll_top = getScrollTop();
	if (event.wheelDelta > 0) {
		if (scroll_top > 0) {
			if (scroll_speed > -scroll_speed_max)
				scroll_speed -= scroll_speed_delta;
		}
	} else {
		if (scroll_top < getScrollSpace()) {
			if (scroll_speed < scroll_speed_max)
				scroll_speed += scroll_speed_delta;
		} else {
			scroll_speed = 0;
		}
	}
	return false;
}

function image_onload(banner_obj)
{
	banner_obj.image_toload_num -= 1;
	if (banner_obj.image_toload_num == 0) {
		banner_obj.onload();
	}
}

function get_image_fullname(image_name)
{
	var ret = image_name;
	ret = "image/" + ret;
	ret += "?" + session_id;
	return ret;
}

function load_banner_resources(banner_obj)
{
	var resource_array = banner_obj.resources;
	if (resource_array) {
		var len = resource_array.length;
		banner_obj.image_toload_num = len;
		loading_resource = banner_obj;
		for (var i = 0; i < len; i++) {
			var img = new Image;
			img.src = resource_array[i];
			img.banner = banner_obj;
			img.onload = function() {
				image_onload(this.banner);
			}
		}
	}
}

function finish_banner(banner_obj)
{
	banner_obj.loading_div.style.display = "none";
	var len = banner_obj.id_list.length;
	for (var i = 0; i < len; i++) {
		$("#" + banner_obj.id_list[i]).css("background", 'url(' + banner_obj.resources[i] + ') no-repeat');
		$("#" + banner_obj.id_list[i]).css("background-size", '100% auto');
	}
	$(banner_obj.content_div).fadeIn(1000);
	if (banner_obj.index == 0) {
		$("body").fadeIn(1000, function() {
			if (!Sys.firefox) {
				window.onmousewheel = function() {
					return scroll();
				};
			}
		});
	}
	tellSidebar_ItemOnload(banner_obj.id, banner_obj.name);
}

function load_banner(banner_array)
{
	var main_div = getItById("index-main");
	var len = banner_array.length
	banner_array.onload = function() {
		tellSidebar_AllItemOnload();
	}
	for (var i = 0; i < len; i++) {
		var banner_obj = banner_array[i];
		banner_obj.id = "banner" + i;
		var banner_div = makeDiv(banner_obj.id, "banner " + banner_obj.name + "-banner");
		banner_obj.div = banner_div;
		banner_obj.index = i;
		banner_obj.id_list = new Array();
		banner_obj.resources = new Array();
		if (banner_obj.height) {
			$(banner_div).css("padding-bottom", banner_obj.height);
		}
		banner_obj.load = function () {
			var loading_div = makeDiv("", "loading");
			if (this.index == 0) {
				loading_div.style.display = "none";
			}
			this.loading_div = loading_div;
			this.div.appendChild(loading_div);
			load_banner_resources(this);
		};
		var content_div = makeDiv(banner_obj.id + "-content", "banner-child");
		banner_obj.div.content_div = content_div;
		content_div.style.display = "none";
		var back_div = makeDiv(banner_obj.id + "-back", "banner-child banner-back");
		var title_div = makeDiv(banner_obj.id + "-title", "banner-child banner-title");
		content_div.back_div = back_div;
		content_div.title_div = title_div;
		content_div.appendChild(back_div);
		content_div.appendChild(title_div);
		banner_obj.id_list.push(banner_obj.id + "-back");
		banner_obj.id_list.push(banner_obj.id + "-title");
		banner_obj.resources.push(get_image_fullname(banner_obj.name + "-back.jpg"));
		banner_obj.resources.push(get_image_fullname(banner_obj.name + "-title.png"));
		content_div.front_div = new Array();
		var front_num = banner_obj.front_num;
		if (front_num) {
			for (var j = 0; j < front_num; j++) {
				var front_div = makeDiv(banner_obj.id + "-front" + j, "banner-child banner-front");
				content_div.front_div.push(front_div);
				content_div.appendChild(front_div);
				banner_obj.id_list.push(banner_obj.id + "-front" + j);
				banner_obj.resources.push(get_image_fullname(banner_obj.name + "-front" + j + ".png"));
			}
		}
		var control_div = makeDiv(banner_obj.id + "-control", "banner-child banner-control");
		content_div.appendChild(control_div);
		banner_obj.content_div = content_div;
		banner_div.appendChild(content_div);
		main_div.appendChild(banner_div);
	}
	for (var i = 0; i < len - 1; i++) {
			banner_array[i].onload = function() {
				finish_banner(this);
				banner_array[this.index + 1].load();
			};
	}
	if (len >= 1) {
		banner_array[len - 1].onload = function() {
			finish_banner(this);
			banner_array.onload();
		};
		banner_array[0].load();
	}
}

function register_callback_function()
{
	window.onchange = function() {
		window_update();
		scroll_update();
	}

	window.onresize = function() {
		window_update();
		tellSidebar_OnResize();
		scroll_update();
	}

	window.onscroll = function() {
		scroll_update();
	}

	window.onload = function() {
		$("body").hide(0);
		$("body").css("visibility", "visible");
		if (!Sys.firefox) {
			var r_scroll=setInterval("real_scroll()", mspf);
			document.body.style.overflowY = "hidden";
		}
		load_banner(banner);
		scroll_update();
		tellSidebar_WindowOnload();
	}
}

function index_main_entry()
{
	register_callback_function();
}

index_main_entry()