(function(){

	function setHp(index){
		$('.wg-hp-area div[target='+ (index+1)+'] span').html(
				stage.pJsnData.boss.param[index].hp+'/'+stage.pJsnData.boss.param[index].hpmax+'<br />'
				+Math.round(stage.pJsnData.boss.param[index].hp/stage.pJsnData.boss.param[index].hpmax*10000)/100+'%'
			)
	}
	function setHpAll(){
		if(window.stage &&stage.pJsnData){
			for(var l=stage.pJsnData.boss.param.length;l>0;l--){
				setHp(l-1)
			}
		}else{
			setTimeout(setHpAll,500)
		}
	}

	$('<div class="wg-hp-area"><div class="hp-show" target="1"><span></span></div><div class="hp-show" target="2"><span></span></div><div class="hp-show" target="3"><span></span></div></div>').appendTo('.prt-targeting-area');
	$('<style>[class^="lis-character"] .txt-hp-value.hide-hp::after{display:none!important;background:none!important}\
		.prt-targeting-area .wg-hp-area{position:absolute;top:-40px;left:0px;width:320px;height:1px;pointer-events:none;}\
		.prt-targeting-area[type="s1"] .wg-hp-area div[target="1"],\
		.prt-targeting-area[type="m1"] .wg-hp-area div[target="1"],\
		.prt-targeting-area[type="l1"] .wg-hp-area div[target="1"]{position:absolute;top:42px;left:30px;width:260px;height:40px}\
		.prt-targeting-area[type="s2"] .wg-hp-area div[target="1"],\
		.prt-targeting-area[type="m2"] .wg-hp-area div[target="1"]{position:absolute;top:47px;left:33px;width:110px;height:40px}\
		.prt-targeting-area[type="s2"] .wg-hp-area div[target="2"],\
		.prt-targeting-area[type="m2"] .wg-hp-area div[target="2"]{position:absolute;top:47px;left:172px;width:110px;height:40px}\
		.prt-targeting-area[type="s3"] .wg-hp-area div[target="1"],\
		.prt-targeting-area[type="m3"] .wg-hp-area div[target="1"]{position:absolute;top:47px;left:0px;width:106px;height:50px}\
		.prt-targeting-area[type="s3"] .wg-hp-area div[target="2"],\
		.prt-targeting-area[type="m3"] .wg-hp-area div[target="2"]{position:absolute;top:47px;left:214px;width:106px;height:50px}\
		.prt-targeting-area[type="s3"] .wg-hp-area div[target="3"],\
		.prt-targeting-area[type="m3"] .wg-hp-area div[target="3"]{position:absolute;top:47px;left:109px;width:106px;height:50px}\
		.prt-targeting-area[type="l2"] .wg-hp-area div[target="1"]{position:absolute;top:47px;left:33px;width:110px;height:50px}\
		.prt-targeting-area[type="l2"] .wg-hp-area div[target="2"]{position:absolute;top:47px;left:172px;width:110px;height:50px}\
		.prt-targeting-area[type="l3"] .wg-hp-area div[target="1"]{position:absolute;top:47px;left:0px;width:106px;height:50px}\
		.prt-targeting-area[type="l3"] .wg-hp-area div[target="2"]{position:absolute;top:47px;left:214px;width:106px;height:50px}\
		.prt-targeting-area[type="l3"] .wg-hp-area div[target="3"]{position:absolute;top:47px;left:109px;width:106px;height:50px}\
		.prt-targeting-area[type="s2"] .wg-hp-area div[target="3"],\
		.prt-targeting-area[type="m2"] .wg-hp-area div[target="3"],\
		.prt-targeting-area[type="l2"] .wg-hp-area div[target="3"],\
		.prt-targeting-area[type="s1"] .wg-hp-area div[target="3"],\
		.prt-targeting-area[type="m1"] .wg-hp-area div[target="3"],\
		.prt-targeting-area[type="l1"] .wg-hp-area div[target="3"],\
		.prt-targeting-area[type="s1"] .wg-hp-area div[target="2"],\
		.prt-targeting-area[type="m1"] .wg-hp-area div[target="2"],\
		.prt-targeting-area[type="l1"] .wg-hp-area div[target="2"]{display:none}\
		.hp-show span{position:absolute;text-align:right;color:#f2eee2;text-shadow:0 0 1px #0c320d,0 0 1px #0c320d,0 0 1px #0c320d,0 0 1px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d;font-size:0.7em;bottom:-16px;right:5px;}</style>').appendTo(document.body);
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
			/*var hookBossGaugeRecast = display.mBossGaugeRecast;
			display.mBossGaugeRecast = function(a,b,c,d){
				var result = hookBossGaugeRecast(a,b,c,d);
				//console.log('mBossGaugeRecast:',a,b,c,d);
				return result;
			};
			var hookBossGaugeRecastForLog = display.mBossGaugeRecastForLog;
			display.mBossGaugeRecastForLog = function(a,b,c){
				var result = hookBossGaugeRecastForLog(a,b,c);
				//console.log('mBossGaugeRecastForLog:',a,b,c);
				return result;
			};*/

			setHpAll();
			console.info('血量显示已启用。');
		}else{
			setTimeout(hpvis,1000);
		}
	})();

})();