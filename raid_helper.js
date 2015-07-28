function setHp(index){$('.btn-enemy-gauge[target='+ (index+1)+']').html('<span class="wg_hpshow">'+stage.pJsnData.boss.param[index].hp+'/'+stage.pJsnData.boss.param[index].hpmax)}
function setHpAll(){for(var l=stage.pJsnData.boss.param.length;l>0;l--){setHp(l-1)}}
function renewHpAll(){setHpAll();setTimeout(renewHpAll,1000);}
$('<style>.wg_hpshow{position:absolute;color:#f2eee2;text-shadow:0 0 1px #0c320d,0 0 1px #0c320d,0 0 1px #0c320d,0 0 1px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d;font-size:0.7em;bottom:-5px;right:5px;}</style>').appendTo(document.body);

//var m_bghf = require('lib/raid/display').mBossGaugeHpForLog;
function hpvis(){
	if(require && require.specified('lib/raid/display')){
		require('lib/raid/display').mBossGaugeHp = function(a,b,c,d){
			a.call(function(a, b, c) {
		        require('lib/raid/display').mBossGaugeHpForLog(a, b, c);
				setHpAll();
		    },
		    [b, c, d]);
		};

		setHpAll();
		console.info('血量显示已启用。');
	}else{
		setTimeout(hpvis,1000);
	}
}

function blitz(){
	if(require && require.specified('lib/raid/motion')){
		require('lib/raid/motion').mWaitAll = function(a, b) {
            b.playtime = 0;
            for (var c = 0; c <= a.length - 1; c++) for (var d = 0; d <= a[c].timeline.length - 1; d++) a[c].timeline[d].wait(b.playtime);
            return ! 0
        };
        console.info('闪电战术已启用。');
	}else{
		setTimeout(blitz,1000);
	}
}

function appendBtn(){
	if($ && $('.btn-attack-start').size()>0){
		var cmd = $('<button style="position:absolute;right:10px;bottom:5px;z-index:5;">Blitz!</button>').appendTo('.btn-attack-start');
		cmd.on('tap',function(){
			cmd.off('tap');
			cmd.remove();
			blitz();
			//$('.btn-attack-start').trigger('tap');
		});
	}else{
		setTimeout(appendBtn,500);
	}
}

hpvis();
appendBtn();