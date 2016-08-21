// broswer detect
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s;
(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

var loading_gif = new Image();
var scroll_space = 0;
var banner = [{"name":"top", "front_num":0, "height":"60%"},
				{"name":"fragment", "front_num":1},
				{"name":"justfall", "front_num":1},
				{"name":"fountain", "front_num":1}];

function window_update()
{
	scroll_space = getScrollSpace();
}

function scroll_update()
{
	tellSidebar_OnScroll();
}

function scroll()
{
}

function load_loading_gif()
{
	loading_gif.src = "image/loading.gif";
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
	ret += "?" + Math.random();
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
			img.src = get_image_fullname(resource_array[i]);
			img.banner = banner_obj;
			img.onload = function() {
				image_onload(this.banner);
			}
		}
	}
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
		var banner_div = makeDiv(banner_obj.id, "banner");
		banner_obj.div = banner_div;
		banner_obj.index = i;
		if (banner_obj.height) {
			$(banner_div).css("padding-bottom", banner_obj.height);
		}
		$(banner_div).css("background-color", randomColor());
		banner_obj.load = function () {load_banner_resources(this);};
		main_div.appendChild(banner_div);
	}
	for (var i = 0; i < len - 1; i++) {
			banner_array[i].onload = function() {
				tellSidebar_ItemOnload(this.id, this.name);
				banner_array[this.index + 1].load();
			};
	}
	if (len >= 1) {
		banner_array[len - 1].onload = function() {
			tellSidebar_ItemOnload(this.id, this.name);
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

	if (!Sys.firefox) {
		window.onmousewheel = function() {
			return scroll();
		};
	}

	window.onload = function() {
		//$("body").hide(0);
		$("body").css("visibility", "visible");
		load_banner(banner);
		tellSidebar_WindowOnload();
	}
}

function index_main_entry()
{
	load_loading_gif();
	register_callback_function();
}

index_main_entry()