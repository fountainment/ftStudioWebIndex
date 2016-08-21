// broswer detect
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s;
(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

function window_update()
{
}

function scroll_update()
{
}

function scroll()
{
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
	load_banner(0);
	register_callback_function();
}

index_main_entry()