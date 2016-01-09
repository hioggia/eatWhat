(function(){

	function setHp(index){$('.btn-enemy-gauge[target='+ (index+1)+']').html('<span class="wg_hpshow">'+stage.pJsnData.boss.param[index].hp+'/'+stage.pJsnData.boss.param[index].hpmax)}
	function setHpAll(){if(window.stage &&stage.pJsnData){for(var l=stage.pJsnData.boss.param.length;l>0;l--){setHp(l-1)}}else{setTimeout(setHpAll,500)}}
	function setStyle(){$('<style>[class^="lis-character"] .txt-hp-value.hide-hp::after{display:none!important;background:none!important}.wg_hpshow{position:absolute;color:#f2eee2;text-shadow:0 0 1px #0c320d,0 0 1px #0c320d,0 0 1px #0c320d,0 0 1px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d;font-size:0.7em;bottom:-16px;right:5px;}</style>').appendTo(document.body);}

	setStyle();
	(function hpvis(){
		if(require && require.specified('lib/raid/display')){
			var display = require('lib/raid/display');

			var hookBossGaugeHp = display.mBossGaugeHp;
			display.mBossGaugeHp = function(a,b,c,d){
				var result = hookBossGaugeHp(a,b,c,d);
				setHpAll();
				return result;
			};
			var hookBossGaugeHpForLog = display.mBossGaugeHpForLog;
			display.mBossGaugeHpForLog = function(a,b,c){
				var result = hookBossGaugeHpForLog(a,b,c);
				setHpAll();
				return result;
			};

			setHpAll();
			console.info('血量显示已启用。');
		}else{
			setTimeout(hpvis,1000);
		}
	})();

})();