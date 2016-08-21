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
var banner = [{"name":"top", "front_num":0, "height":"50%"},
				{"name":"b1", "front_num":1},
				{"name":"b2", "front_num":1},
				{"name":"b3", "front_num":1}];

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

function load_banner(banner_array)
{
	var main_div = getItById("index-main");
	for (var i = 0; i < banner_array.length; i++) {
		var banner = banner_array[i];
		var banner_div = makeDiv("banner" + i, "banner");
		banner_div.name = banner.name;
		if (banner.height) {
			$(banner_div).css("padding-bottom", banner.height);
		}
		main_div.appendChild(banner_div);
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
		//$("body").css("visibility", "visible");
		load_banner(banner);
	}
}

function index_main_entry()
{
	load_loading_gif();
	register_callback_function();
}

index_main_entry()