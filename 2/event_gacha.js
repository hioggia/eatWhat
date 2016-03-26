(function(){

	function crazyGachaMedal(){
		console.log('crazyGachaMedal',$('.btn-medal.multi').get(0));
		$('body').off('tap',stopCrazyGacha);
		if($('.btn-medal.multi').size()>0 && $('.btn-medal.multi').attr('disable')!='true'){
			$('.btn-medal.multi').trigger('tap');
		}else{
			setTimeout(crazyGachaMedal,1000);
		}
	}
	function stopCrazyGacha(){
		console.log('stopCrazyGacha');
		localStorage['wg_crazy_gacha'] = false;
		$('body').off('tap',stopCrazyGacha);
	}
	function attachCrazyButton(){
		if($('#crazyButton').size()>0){
			return;
		}
		console.log('attachCrazyButton');
		var btn = $('<button id="crazyButton" style="position:absolute;right:5px;bottom:3px;z-index:2">疯狂地抽！</button>').appendTo('.prt-gacha-infomation');
		btn.on('tap',function(){
			localStorage['wg_crazy_gacha'] = true;
			crazyGachaMedal();
		});
	}

	if(/result/i.test(location.hash)){
		console.log('wg_crazy_gacha',localStorage['wg_crazy_gacha'])
		if(localStorage['wg_crazy_gacha']=='true'){
			$('body').on('tap',stopCrazyGacha);
			crazyGachaMedal();
		}
		attachCrazyButton();
	}else if(/index/i.test(location.hash)){
		console.log('index');
		localStorage['wg_crazy_gacha'] = false;
		attachCrazyButton();
	}else{
		console.log('other');
		$('body').on('tap',stopCrazyGacha);
	}

})();