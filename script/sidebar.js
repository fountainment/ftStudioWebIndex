var items=new Array();
function tellSidebar_WindowOnload(){
	$("body").append("<div id='sidebar' class='sidebar'></div>");
	$("#sidebar").append("<div id='items' style='position:relative'></div>");
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
		$("#items").animate({top:"-=25px"},{duration: 200, queue: false,easing: 'easeOutQuart'});
	}
	$("#items").append(item);
	$("#sidebar-"+id).animate({left:"0px"},{duration: 300, queue: false,easing: 'easeOutBack'});
}
function tellSidebar_AllItemOnload(){
}
function tellSidebar_OnScroll(){
}
