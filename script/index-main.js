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
var image_loader = new Image();
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
}

function scroll()
{
}

function load_loading_gif()
{
	loading_gif.src = "image/loading.gif";
}

function load_banner_resources(banner_obj)
{
}

function load_banner(banner_array)
{
	var main_div = getItById("index-main");
	var len = banner_array.length
	banner_array.onload = function() {

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
			banner_array[i].div.onload = function() {
				banner_array[this.index + 1].load();
			};
	}
	if (len >= 1) {
		banner_array[len - 1].onload = function() {
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
	}
}

function index_main_entry()
{
	load_loading_gif();
	register_callback_function();
}

index_main_entry()