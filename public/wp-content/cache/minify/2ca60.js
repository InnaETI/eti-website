jQuery(function($){"use strict";if($("#commentform").length>0){$("#commentform").submit(function(){var $cmtFlag=true;$("#email, #comment ,#author").removeClass('business-required');if($('#email').length>0){var $emailRgx=/^([a-zA-Z.0-9])+@([a-zA_Z0-9])+\.([a-zA-Z])/;var $cmauthor=$("#author").val();var $cmemail=$("#email").val();if($cmauthor==""){$("#author").addClass('business-required');$cmtFlag=false;}
if($cmemail==""||!$emailRgx.test($cmemail)){$("#email").addClass('business-required');$cmtFlag=false;}}
var $cmmsg=$("#comment").val();if($cmmsg==""){$("#comment").addClass('business-required');$cmtFlag=false;}
return $cmtFlag;});}
if($("form.search-box").length>0){$("form.search-box").submit(function(){var $serchFlag=true;$("form.search-box input[name=s]").removeClass('business-required');var $serchmsg=$("form.search-box input[name=s]").val();if($serchmsg==""){$("form.search-box input[name=s]").addClass('business-required');$serchFlag=false;}
return $serchFlag;});}
$('.menu-item-has-children > a').click(function(e){if($(window).width()<768){e.preventDefault();$('.sub-menu').stop().slideUp();$(this).next('.sub-menu').stop().slideToggle();}})
$(window).resize(function(){if($(window).width()>=768){$('.sub-menu').attr('style','');}});var $headerThreeHeight=$('.header-three').height();$('.header-three + *').css('top',(0-$headerThreeHeight));$('.header-three + *').css('position','relative');if($('.widget_archive li a').length){$('.widget_archive li a').each(function(){$(this).prepend('<i class="fa fa-caret-right"> </i>');});}
if($('.widget_categories li a').length){$('.widget_categories li a').each(function(){$(this).prepend('<i class="fa fa-caret-right"> </i>');});}
if($('.widget_pages li a').length){$('.widget_pages li a').each(function(){$(this).prepend('<i class="fa fa-caret-right"> </i>');});}
if($('.widget_meta li a').length){$('.widget_meta li a').each(function(){$(this).prepend('<i class="fa fa-caret-right"> </i>');});}
if($('.widget_recent_comments li').length){$('.widget_recent_comments li').each(function(){$(this).prepend('<i class="fa fa-caret-right"> </i>');});}
if($('.widget_recent_entries li a').length){$('.widget_recent_entries li a').each(function(){$(this).prepend('<i class="fa fa-caret-right"> </i>');});}
if($('.widget_nav_menu li a').length){$('.widget_nav_menu li a').each(function(){$(this).prepend('<i class="fa fa-caret-right"> </i>');});}
if($('.widget_rss li a:first-child').length){$('.widget_rss li a:first-child').each(function(){$(this).prepend('<i class="fa fa-caret-right"> </i>');});}
if($('#footer .foot-nav li a').length){$('#footer .foot-nav li a').each(function(){$(this).prepend('<i class="fa fa-caret-right"> </i>');});}
if($('audio.audio').length){$('audio.audio').each(function(){$(this).audioPlayer();});}
if($('.woocommerce.widget_product_categories').length){$('.woocommerce.widget_product_categories > ul.product-categories').addClass('blog-list-sidebar add-arrow');}
if($('.woocommerce.widget_product_tag_cloud').length){$('.woocommerce.widget_product_tag_cloud').addClass('widget_tag_cloud');}
if($('.blog-list-sidebar.add-arrow li a').length){$('.blog-list-sidebar.add-arrow li a').each(function(){$(this).prepend('<i class="fa fa-caret-right"> </i>');});}
if($('#owl-slider').length){$("#owl-slider").owlCarousel({autoPlay:10000,items:1,singleItem:true,stopOnHover:true,autoHeight:true});}
if($('#owl-slider-clients').length){$("#owl-slider-clients").owlCarousel({autoPlay:3000,items:6,itemsDesktop:[1199,6],itemsDesktopSmall:[979,6],itemsTablet:[768,3]});}
if($('#owl-slider1').length){$("#owl-slider1").owlCarousel({autoPlay:3000,items:3,itemsDesktop:[1199,3],itemsDesktopSmall:[979,3]});}
if($('#owl-slider2').length){$("#owl-slider2").owlCarousel({autoPlay:3000,items:6,itemsDesktop:[1199,6],itemsDesktopSmall:[979,6],itemsTablet:[768,3]});}
$('.nav ,.blog-paging-list,.blog-sidebar-paging-list').find('li').on('click',function(){$(this).siblings('li').removeClass('active');$(this).addClass('active');});if($(window).width()<768){$('.navbar-nav li').on('click',function(){$('.dropdown').slideUp();$(this).children('.dropdown').slideDown();});};jQuery('img.svg').each(function(){var $img=jQuery(this);var imgID=$img.attr('id');var imgClass=$img.attr('class');var imgURL=$img.attr('src');jQuery.get(imgURL,function(data){var $svg=jQuery(data).find('svg');if(typeof imgID!=='undefined'){$svg=$svg.attr('id',imgID);}
if(typeof imgClass!=='undefined'){$svg=$svg.attr('class',imgClass+' replaced-svg');}
$svg=$svg.removeAttr('xmlns:a');$img.replaceWith($svg);},'xml');});if(jQuery('#custom_map').length){var initialize=function(){var pos=new google.maps.LatLng(BUSINESSPLUS_SITE_OPTION.lat,BUSINESSPLUS_SITE_OPTION.lng);var mapProp={center:pos,zoom:16,scrollwheel:false,mapTypeId:google.maps.MapTypeId.ROADMAP};var marker=new google.maps.Marker({position:pos,map:map,draggable:false});var map=new google.maps.Map(document.getElementById("custom_map"),mapProp);marker.setMap(map);};google.maps.event.addDomListener(window,'load',initialize);}
$(window).load(function(){$('.loader').delay(50).fadeOut();});function mergeURI(parameterName,parameterValue){var urlParts=window.location.href.split("?");var newQueryString='';var replaceDuplicates=true;if(urlParts.length>1){var parameters=urlParts[1].split("&");for(var i=0;(i<parameters.length);i++){var parameterParts=parameters[i].split("=");if(!(replaceDuplicates&&parameterParts[0]===parameterName)){if(newQueryString===''){newQueryString="?";}else{newQueryString+="&";}
newQueryString+=parameterParts[0]+"="+(parameterParts[1]?parameterParts[1]:'');}}}
if(newQueryString===''){newQueryString="?";}
if(newQueryString!==""&&newQueryString!=='?'){newQueryString+="&";}
newQueryString+=parameterName+"="+(parameterValue?parameterValue:'');return urlParts[0]+newQueryString;}
$('*[data-tag]').each(function(){var $element=$(this);$element.click(function(event){event.preventDefault();event.stopPropagation();var uri=$element.attr('href');var paramName=uri.split('=')[0].substring(1);var paramValue=uri.split('=')[1];window.location.href=mergeURI(paramName,paramValue);});});});