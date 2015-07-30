function setHp(index){$('.btn-enemy-gauge[target='+ (index+1)+']').html('<span class="wg_hpshow">'+stage.pJsnData.boss.param[index].hp+'/'+stage.pJsnData.boss.param[index].hpmax)}
function setHpAll(){if(window.stage &&stage.pJsnData){for(var l=stage.pJsnData.boss.param.length;l>0;l--){setHp(l-1)}}else{setTimeout(setHpAll,500)}}
function setStyle(){$('<style>.wg_hpshow{position:absolute;color:#f2eee2;text-shadow:0 0 1px #0c320d,0 0 1px #0c320d,0 0 1px #0c320d,0 0 1px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d;font-size:0.7em;bottom:-5px;right:5px;}.wg_bzswch{position:absolute;top:279px;left:-3px;width:36px;height:16px;z-index:10;padding:0;font-size:0.75em;margin:0;border:1px solid #fff;border-radius:3px;background-color:#208820;color:#fff;font-weight:400;outline:none}.wg_bzswch.on{background-color:#ADAD94;}.wg_bzswch::before{content:"闪电中"}.wg_bzswch.on::before{content:"快充电"}</style>').appendTo(document.body);}

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

var rate = 3;

function blitz(playtime){
	return playtime/rate;
}

function appbz(){
	if(require && $ && require.specified('lib/raid/motion') && $('.btn-attack-start').size()>0){
		require('lib/raid/motion').mWaitAll = function(a, b) {
			b.playtime = blitz(b.playtime || 10);
            //b.playtime = 0;
            for (var c = 0; c <= a.length - 1; c++) for (var d = 0; d <= a[c].timeline.length - 1; d++) a[c].timeline[d].wait(b.playtime);
            return ! 0
        };
        var cmd = $('<button class="wg_bzswch"></button>').appendTo('#wrapper');
        cmd.on('tap',function(){
        	cmd.toggleClass('on');
        	rate = 4-rate;
			console.log('speed rate change to',rate);
        });
        console.info('闪电战术已启用。');
	}else{
		setTimeout(appbz,1000);
	}
}

hpvis();
appbz();

function commandToFight(type,cmd1,cmd2,cmd3,cmd4){
	if(type=='attack'){
		$('.btn-attack-start.display-on').trigger('tap');
		$('.btn-result:visible').trigger('tap');
	}else if(type=='ability'){
		//if($('.prt-command .prt-member .invisible').size()==0){return}
		//var chara = ~~$('.prt-command .prt-member .invisible').attr('pos')+1;
		//$('.prt-command .prt-command-chara[pos='+chara+'] .prt-ability-list div:nth-child('+cmd1+').btn-ability-available').trigger('tap');
		$('.prt-command .prt-command-chara:visible .prt-ability-list div:nth-child('+cmd1+').btn-ability-available').trigger('tap');
	}else if(type=='character'){
		$('.btn-command-back.display-on').trigger('tap');
		$('.prt-member .btn-command-character:nth-child('+cmd1+')').trigger('tap')
	}else if(type=='next'){
		$('.btn-result').trigger('tap');
	}else if(type=='ougi'){
		$('.btn-lock').trigger('tap');
	}
}

function getPressedCharCode(e){
	if(e.altKey || e.ctrlKey || e.shiftKey || e.metaKey){
		return;
	}
	var targetTag = e.target.tagName.toLowerCase();
	if(targetTag == 'textarea' || targetTag == 'input'){
		return;
	}
	var cmdChar = String.fromCharCode(e.charCode);
	switch(cmdChar){
		case 'a':
		case '工':
		case 'ち':
			commandToFight('attack',cmdChar);
			break;
		/*case '1':
		case '2':
		case '3':
		case '4':
		case '5':
			commandToFight('character',cmdChar);
			break;*/
		case 'q':
		case 'w':
		case 'e':
		case 'r':
		case '金':
		case '人':
		case '月':
		case '白':
		case 'た':
		case 'て':
		case 'い':
		case 'す':
			var cmd = {q:1,w:2,e:3,r:4,金:1,人:2,月:3,白:4,た:1,て:2,い:3,す:4};
			commandToFight('ability',cmd[cmdChar]);
			break;
		/*case 'o':
			commandToFight('ougi',cmdChar);
			break;
		case 'n':
			commandToFight('next',cmdChar);
			break;*/
	}
}

document.addEventListener('keypress',getPressedCharCode,false);