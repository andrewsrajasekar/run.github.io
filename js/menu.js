/*
Responsive Mobile Toggle Menu v1.0
Description: JS enhances CSS response time and menu caching but not required
Author: Danielle Vautier
*/

function responsiveMenu() {	
	$('.menuTitle').click(function () {
		$('.menu, .nav').slideToggle("slow");
		$('.menu, .nav').css({"max-height":"800px"});
	});
};

$(function() {
	$(".menu, .nav").css({"display":"none","transition":"none","max-height":"inherit"});
	$("#toggleMenu").remove();
	responsiveMenu();
});