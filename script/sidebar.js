var items=new Array();
function tellSidebar_WindowOnload(){
	$("body").append("<div id='sidebar' class='sidebar'></div>");
	$("#sidebar").append("<div id='items' style='position:relative'></div>");
	$("#items").append("<div id='item-loading' class='sidebar-loading'</div>");
	getItById("sidebar").style.paddingTop=(getWindowHeight()*0.5).toString()+"px";
	getItById("sidebar").onmouseover=function(){
		$("#sidebar").stop();
		$("#sidebar").animate({right:"0px"},{duration: 300, queue: false,easing: 'easeOutQuint'});
	};
	getItById("sidebar").onmouseout=function(){
		$("#sidebar").stop();
		$("#sidebar").animate({right:"-200px"},{duration: 300, queue: false,easing: 'easeOutQuint'});
	};
	
}
function tellSidebar_ItemOnload(id, name){
	var item = makeDiv("sidebar-" + id, "sidebar-item");
	item.style.backgroundImage = "url(image/" + name + "-button.png)";
	items.push(item);
	if (items.length > 1) {
		$("#items").animate({top:(-25*items.length).toString()+"px"},{duration: 200, queue: false,easing: 'easeOutQuart'});
	}
	$("#items").append(item);
	$(item).animate({left:"0px"},{duration: 300, queue: false,easing: 'easeOutBack'});
	item.onmouseover = function() {
		$(this).css("background-position", "0px -50px");
	};
	item.onmouseout = function() {
		$(this).css("background-position", "0px 0px");
	};
	item.onmousedown=function(){
		if(this.id=="sidebar-banner0"){
			$("html, body").animate({scrollTop:0}, 500);
		}else{
			scrollToAnimation(id,800);
		}
	};
}
function tellSidebar_AllItemOnload(){
	$("#item-loading").delay(500).animate({left:"250px"},{duration: 600, queue: true,easing: 'easeOutQuint'});;
}
function tellSidebar_OnScroll(){
	
}

function tellSidebar_OnResize(){
	getItById("sidebar").style.paddingTop=(getWindowHeight()*0.5).toString()+"px";
}
