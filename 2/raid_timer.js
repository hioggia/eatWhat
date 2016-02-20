(function init(){

	function setSecond(val){
		var cont = $('.prt-clocl-value .txt-info-num');

		if($('.num-info-colon',cont).size()==1){
			$('<span class="value num-info-colon"></span>').appendTo(cont);
		}
		$('.second',cont).remove();
		for(var i=0;i<val.length;i++){
			$('<span class="second value num-info'+val[i]+'"></span>').appendTo(cont);
		}
	}

	function checkSecond(cl){
		for(var i=0;i<cl.length;i++){
			if(cl[i].name=='timer'){
				var s = cl[i].oldValue%60;
				setSecond(('0'+s+'0').slice(-3,-1));
			}
		}
	}
	
	if(('stage' in window) && ('pJsnData' in stage)){
		Object.observe(stage.pJsnData,checkSecond);
		registerRouteChangeDestroyer(function(callback){
			Object.unobserve(stage.pJsnData,checkSecond);
			callback();
		});
		console.info('显秒！');
	}else{
		setTimeout(init,1000);
		return;
	}

})();