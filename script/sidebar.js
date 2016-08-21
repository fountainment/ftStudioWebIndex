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
	var item = makeDiv("sidebar-"+id,"sidebar-item");
	item.style.backgroundImage="url(image/"+name+"-button.png)"
	items.push(item);
	if(items.length>1){
		$("#items").animate({top:(-25*items.length).toString()+"px"},{duration: 200, queue: false,easing: 'easeOutQuart'});
	}
	$("#items").append(item);
	$("#sidebar-"+id).animate({left:"0px"},{duration: 300, queue: false,easing: 'easeOutBack'});
	getItById("sidebar-"+id).onmouseover=function(){
		item.style.backgroundPositionY="-50px";
	};
	getItById("sidebar-"+id).onmouseout=function(){
		item.style.backgroundPositionY="0px";
	};
	getItById("sidebar-"+id).onmousedown=function(){
		scrollToAnimation(id,500);
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
