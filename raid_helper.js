function setHp(index){$('.btn-enemy-gauge[target='+ (index+1)+']').html('<span class="wg_hpshow">'+stage.pJsnData.boss.param[index].hp+'/'+stage.pJsnData.boss.param[index].hpmax)}
function setHpAll(){if(window.stage &&stage.pJsnData){for(var l=stage.pJsnData.boss.param.length;l>0;l--){setHp(l-1)}}else{setTimeout(setHpAll,500)}}
function setStyle(){$('<style>.wg_hpshow{position:absolute;color:#f2eee2;text-shadow:0 0 1px #0c320d,0 0 1px #0c320d,0 0 1px #0c320d,0 0 1px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d;font-size:0.7em;bottom:-5px;right:5px;}.wg_bzswch{position:absolute;top:279px;left:-3px;width:36px;height:16px;z-index:10;padding:0;font-size:0.75em;margin:0;border:1px solid #fff;border-radius:3px;background-color:#208820;color:#fff;font-weight:400;outline:none}.wg_bzswch.on{background-color:#ADAD94;}.wg_bzswch::before{content:"闪电中"}.wg_bzswch.on::before{content:"快充电"}.wg_lightup{position:absolute;top:0px;left:0px;z-index:1;width:44px;height:44px;background:#FFF;opacity:0.4;transition:opacity 0.5s ease-out}</style>').appendTo(document.body);}

//var m_bghf = require('lib/raid/display').mBossGaugeHpForLog;
function hpvis(){
	//try{
	if(require && require.specified('lib/raid/display')){
		require('lib/raid/display').mBossGaugeHp = function(a,b,c,d){
			a.call(function(a, b, c) {
		        require('lib/raid/display').mBossGaugeHpForLog(a, b, c);
				setHpAll();
		    },
		    [b, c, d]);
		};

		setStyle();
		setHpAll();
		console.info('血量显示已启用。');
	}else{
		setTimeout(hpvis,1000);
	}
	//}catch(ex){
	//	console.log('hpvis',ex);
	//}
}

hpvis();