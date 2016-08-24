var items = new Array();
var itemFocus = "sidebar-banner0";
var itemOver = "none";

function tellSidebar_WindowOnload() {
	$("body").append("<div id='sidebar' class='sidebar'></div>");
	$("#sidebar").append("<div id='items' style='position:relative'></div>");
	$("#items").append("<div id='item-loading' class='sidebar-loading'</div>");
	getItById("sidebar").style.paddingTop = (getWindowHeight() * 0.5).toString() + "px";
	getItById("sidebar").onmouseover = function () {
		$("#sidebar").stop();
		$("#sidebar").animate({
			right: "0px"
		}, {
			duration: 300
			, queue: false
			, easing: 'easeOutQuint'
		});
	};
	getItById("sidebar").onmouseout = function () {
		$("#sidebar").stop();
		$("#sidebar").animate({
			right: "-200px"
		}, {
			duration: 300
			, queue: false
			, easing: 'easeOutQuint'
		});
	};
}

function tellSidebar_ItemOnload(id, name) {
	var item = makeDiv("sidebar-" + id, "sidebar-item");
	var bgimg = new Image();
	bgimg.src = "image/" + name + "-button.png";
	//bgimg.reload();
	item.style.backgroundImage = "url(" + bgimg.src + ")";
	items.push(item);
	if (items.length > 1) {
		$("#items").animate({
			top: (-25 * items.length).toString() + "px"
		}, {
			duration: 200
			, queue: false
			, easing: 'easeOutQuart'
		});
	}
	$("#items").append(item);
	$(item).animate({
		left: "0px"
	}, {
		duration: 300
		, queue: false
		, easing: 'easeOutBack'
	});
	item.onmouseover = function () {
		itemOver=this.id;
		$(this).css("background-position", "0px -50px");
	};
	item.onmouseout = function () {
		itemOver="none";
		if (this.id == itemFocus) {
			$(this).css("background-position", "0px -100px");
		}
		else {
			$(this).css("background-position", "0px 0px");
		}
	};
	item.onmousedown = function () {
		if (this.id == "sidebar-banner0") {
			//stopBodyAnimation();
			$("html, body").animate({scrollTop: 0}, {duration: 800, queue: false,easing: 'easeOutQuart'});
		}
		else {
			scrollToAnimation(id, 800);
		}
	};
}

function tellSidebar_AllItemOnload() {
	$("#item-loading").delay(500).animate({
		left: "250px"
	}, {
		duration: 600
		, queue: true
		, easing: 'easeOutQuint'
	});;
}

function tellSidebar_OnScroll() {
	var winH = getWindowHeight();
	var totalH = 0;
	var itemOffset= 0;
	for (x in items) {
		if (x == 0) {
			totalH = 0;
		}
		else {
			totalH = winH * 0.5;
		}
		itemOffset = getScrollOffsetById("banner" + items[x].id.slice(-1));
		if (Math.abs(itemOffset - (winH * 0.5)<50) ) {
			itemFocus = items[x].id;
		}
	}
	for (x in items) {
		if (items[x].id == itemOver) {
			$(items[x]).css("background-position", "0px -50px");
		}else if (items[x].id == itemFocus) {
			$(items[x]).css("background-position", "0px -100px");
		}
		else{
			$(items[x]).css("background-position", "0px 0px");
		}
	}
}

function tellSidebar_OnResize() {
	var winH = getWindowHeight();
	var totalH = 0;
	var itemOffset= 0;
	for (x in items) {
		if (x == 0) {
			totalH = 0;
		}
		else {
			totalH = winH * 0.5;
		}
		itemOffset = getScrollOffsetById("banner" + items[x].id.slice(-1));
		if (Math.abs(itemOffset - (winH * 0.5)<50) ) {
			itemFocus = items[x].id;
		}
	}
	for (x in items) {
		if (items[x].id == itemFocus) {
			$(items[x]).css("background-position", "0px -100px");
		}
		else {
			$(items[x]).css("background-position", "0px 0px");
		}
	}
	getItById("sidebar").style.paddingTop = (getWindowHeight() * 0.5).toString() + "px";
}