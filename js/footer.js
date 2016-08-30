var footerTotop = new Image();
var footerWeibo = new Image();
var footerMail = new Image();
footerTotop.src = "img/" + "footer-totop.png";
footerWeibo.src = "img/" + "footer-weibo.png";
footerMail.src = "img/" + "footer-mail.png";
getItById("footer-logo").onmouseover=function(){
    $("#footer-logo").css("background-image","url("+footerTotop.src+")");
};
getItById("footer-logo").onmouseout=function(){
    $("#footer-logo").css("background-image","url(img/footer-logo.png)");
};
getItById("footer-logo").onclick=function(){
    $("html, body").animate({scrollTop: 0}, {duration: 600, queue:false,easing:'easeInOutQuad'});
};
getItById("weibo").onmouseover=function(){
    $("#footer-logo").css("background-image","url("+footerWeibo.src+")");
};
getItById("weibo").onmouseout=function(){
    $("#footer-logo").css("background-image","url(img/footer-logo.png)");
};
getItById("weibo").onmousedown=function(){
    
};
getItById("mail").onmouseover=function(){
    $("#footer-logo").css("background-image","url("+footerMail.src+")");
};
getItById("mail").onmouseout=function(){
    $("#footer-logo").css("background-image","url(img/footer-logo.png)");
};
getItById("mail").onmousedown=function(){
    
};