(function init(){

	var tid = 0;

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

	function checkSecond(){
		var s = stage.pJsnData.timer%60;
		setSecond(('0'+s+'0').slice(-3,-1));
		tid = setTimeout(checkSecond,1000);
	}
	
	if(('stage' in window) && ('pJsnData' in stage)){
		tid = setTimeout(checkSecond,1000);
		registerRouteChangeDestroyer(function(callback){
			clearTimeout(tid);
			callback();
		});
		console.info('显秒！');
	}else{
		setTimeout(init,1000);
		return;
	}

})();