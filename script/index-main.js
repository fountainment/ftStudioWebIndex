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
var banner = [{"id":"banner0", "name":"top", "front_num":0},
				{"id":"banner1", "name":"b1", "front_num":1},
				{"id":"banner2", "name":"b2", "front_num":1},
				{"id":"banner3", "name":"b3", "front_num":1}];

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

function load_banner(banner_index)
{
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

	window.onscroll = function () {
		scroll_update();
	}

	if (!Sys.firefox) {
		window.onmousewheel = function() {
			return scroll();
		};
	}
}

function index_main_entry()
{
	load_loading_gif();
	load_banner(0);
	register_callback_function();
}

index_main_entry()