function getItById(id)
{
	return document.getElementById(id);
}

function getWindowHeight()
{
	return $(window).height();
}

function getScrollTop()
{
	return document.documentElement.scrollTop || document.body.scrollTop;
}

function getScrollSpace()
{
	var ss = $(document).height() - getWindowHeight();
	if (ss < 0)
		ss = 0;
	return ss;
}

function getTopById(id)
{
	return $("#" + id).offset().top;
}

function getScrollOffsetById(id)
{
	return getTopById(id) - getScrollTop();
}

function getInnerHeightById(id)
{
	return $("#" + id).innerHeight();
}

/* 0 bottom on window top, 0.5 middle, 1.0 top on window bottom */
function getWindowPositionById(id)
{
	var elementHeight = getInnerHeightById(id);
	return (getScrollOffsetById(id) + elementHeight) / (getWindowHeight() + elementHeight) * 100.0;
}

function stopBodyAnimation()
{
	$("html, body").stop();
}

function scrollToAnimation(id, ms)
{
	var elementHeight = getInnerHeightById(id);
	var windowHeight = getWindowHeight();
	var topPosition = getTopById(id);
	var scrollTarget = (elementHeight - windowHeight) * 0.5 + topPosition;
	if (scrollTarget < 0) {
		scrollTarget = 0;
	}
	$("html, body").animate({scrollTop:scrollTarget}, ms);
}

function makeDiv(id_name, class_name)
{
	ret = document.createElement("div");
	if (id_name && id_name.length != 0)
		ret.setAttribute("id", id_name);
	if (class_name && class_name.length != 0)
		ret.setAttribute("class", class_name);
	return ret;
}

function randomColor()
{
	return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
}