(function(){

function crazyGachaMedal(){
	if($('.btn-medal.multi').size()>0){
		$('body').off('tap',stopCrazyGacha);
		$('.btn-medal.multi').trigger('tap');
	}
}
function stopCrazyGacha(){
	localStorage['wg_crazy_gacha'] = false;
	$('body').off('tap',stopCrazyGacha);
}
function attachCrazyButton(){
	var btn = $('<button style="position:absolute;right:5px;bottom:3px;z-index:2">疯狂地抽！</button>').appendTo('.prt-gacha-infomation');
	btn.on('tap',function(){
		localStorage['wg_crazy_gacha'] = true;
		crazyGachaMedal();
	});
}

if(/result/i.test(location.hash)){
	if(localStorage['wg_crazy_gacha']=='true'){
		$('body').on('tap',stopCrazyGacha);
		crazyGachaMedal();
	}
	attachCrazyButton();
}else if(/index/i.test(location.hash)){
	localStorage['wg_crazy_gacha'] = false;
	attachCrazyButton();
}else{
	$('body').on('tap',stopCrazyGacha);
}

})();