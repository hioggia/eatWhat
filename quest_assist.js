/*function attachRefreshBtn(){
	$('<div class="btn-refresh-list"></div>\
	<style>.btn-refresh-list{\
	display: block;\
	position: absolute;\
	top: 175px;\
	z-index: 5;\
	left: 260px;\
	background: url(\'http://gbf.game-a.mbga.jp/assets/img_light/sp/coopraid/offer/parts-sf891725f19.png\') no-repeat 0 -491px;\
	-webkit-background-size: 320px 644px;\
	background-size: 320px 644px;\
	width: 31px;\
	height: 34px;\
	-webkit-box-sizing: border-box;\
	box-sizing: border-box;\
	margin-left: 10px;\
	}</style>').insertBefore('.contents');
}

attachRefreshBtn();

$('.btn-refresh-list').on('tap',function(){
	console.log('refresh');
	Game.view.initialize(require('backbone'));
});*/

$('.contents').on('tap','#tab-multi',function(){
	$('#loading').show();
	$('.img-load').show();
	console.log('refresh');
	Game.view.initialize(require('backbone'));
});