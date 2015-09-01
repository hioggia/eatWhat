var host,
	mode = 'extensions';
var inspected = false;

var defaultWGConfig = {
	version:1,
	content:{
		kPokerEnable:{title:"启用扑克助手","default":true},
		kSlotEnable:{title:"启用拉霸助手","default":true},
		kBingoEnable:{title:"启用宾果助手","default":true},
		kBloodEnable:{title:"显示怪物血量","default":true},
		kBlitzDefault:{title:"默认开启闪电","default":true},
		kKBSEnable:{title:"战斗按键支持","default":true},
		kQAREnable:{title:"援助列表刷新","default":true},
		kCoopEnable:{title:"启用共斗助手","default":true}
	}
};

delete window.onerror;
delete console.log;
delete console.warn;

if(document.getElementById('wg_script_host')){
	host = document.getElementById('wg_script_host').innerHTML;
	mode = document.getElementById('wg_script_host').dataset.mode;
}else{
	alert('please update your kajikano extensions.');
	return;
}


Game.reportError = function(msg, url, line, column, err, callback){console.log(msg, url, line, column, err, callback)};

var createAppTeller = function(url){
	var s = document.createElement('script');
	s.src = url;
	document.body.appendChild(s);
};

var createScriptLoader = function(file,readySerif){
	console.log('loading '+file+' ...');
	var s = document.createElement('script');
	if(readySerif==undefined){readySerif='别急，很快就要开始了。'}
	var t = "function mp(){\
		var s=document.createElement('script');\
		s.onerror=function(){location.reload()};\
		s.src='"+host+file+"';\
		document.body.appendChild(s)\
	};\
	function sb(){\
		if(window.$ && $('#ready').size()>0 && !$('#ready').is(':visible')){\
			setTimeout(mp,3000);\
			console.info('"+readySerif+"')\
		}else{\
			setTimeout(sb,1000)\
		}\
	}sb()";
	s.innerHTML = t;
	document.body.appendChild(s);
	inspected = true;
};

var getWGConfig = function(key){
	var values = localStorage['wg_global_config'];
	if(values){
		values = JSON.parse(values);
		if(key in values){
			return values[key];
		}
	}
	if(key in defaultWGConfig.content){
		return defaultWGConfig.content[key].default;
	}
	console.error('key',key,'is not exist in wgconfig');
	return false;
};

var setWGConfig = function(key,value){
	var values = localStorage['wg_global_config'];
	if(!values){
		values = {};
	}else{
		values = JSON.parse(values);
	}
	values[key] = value;
	localStorage['wg_global_config'] = JSON.stringify(values);
};

var tellAppMakeConfigMenu = function(settingUrl){
	//console.log(settingUrl);
	var sJson = {};
	for(var key in defaultWGConfig.content){
		console.log(key);
		sJson[key]={title:defaultWGConfig.content[key].title,value:getWGConfig(key)};
	}
	createAppTeller(settingUrl+JSON.stringify(sJson));
};

var tellAppSetConfigValue = function(key,value){
	//console.log(key,value);
	setWGConfig(key,value);
};

var inspector = function(){
	if(inspected){
		return;
	}
	
	if(/casino\/game\/slot/i.test(location.hash)){
		if(getWGConfig('kSlotEnable')){
			createScriptLoader('casino_slot.js?v=2');
		}
	}

	else if(/casino\/game\/poker/i.test(location.hash)){
		if(getWGConfig('kPokerEnable')){
			createScriptLoader('casino_poker.js?v=3');
		}
	}

	else if(/casino\/game\/bingo/i.test(location.hash)){
		if(getWGConfig('kBingoEnable')){
			createScriptLoader('casino_bingo.js?v=1','请稍后。');
		}
	}

	else if(/event\/teamraid\d+\/ranking_guild\/detail/i.test(location.hash) || /event\/teamraid\d+\/ranking\/detail/i.test(location.hash)){
		createScriptLoader('teamraid_ranker.js?v=1','请稍后。');
	}

	else if(/raid\/\d+/i.test(location.hash) || /raid_multi\/\d+/i.test(location.hash)){
		if(getWGConfig('kBloodEnable')||getWGConfig('kBlitzDefault')||getWGConfig('kKBSEnable')){
			createScriptLoader('raid_helper.js?v=4','请稍后。');
		}
	}

	else if(/coopraid\/offer/i.test(location.hash)){
		if(getWGConfig('kCoopEnable')){
			createScriptLoader('coopraid_offer.js?v=2','请稍后。');
		}
	}

	else if(/quest\/assist/i.test(location.hash)){
		if(getWGConfig('kQAREnable')){
			createScriptLoader('quest_assist.js?v=1','请稍后。');
		}
	}

	/*else if(/quest\/supporter\/705642\/0/i.test(location.hash)){
		setTimeout(act.func[1],1000);
	}

	else if(/quest\/stage/i.test(location.hash)){
		setTimeout(act.func[5],1000);
	}

	else if(/quest\/scene\/scene_evt150831_cp4_q2_s10/i.test(location.hash)){
		setTimeout(act.func[2],1000);
	}

	else if(/quest\/scene\/scene_evt150831_cp4_q2_s20/i.test(location.hash)){
		setTimeout(act.func[2],1000);
	}*/

	setTimeout(inspector,1000);
};

var act={func:{}};

function waitForTrue(condition,callback){
	if(condition()){
		callback()
	}else{
		setTimeout(function(){
			waitForTrue(condition,callback)
		},500);
	}
}

act.func[0] = function(){
	location.hash='#quest/supporter/705642/0';
};

act.func[1] = function(){
	$('.prt-supporter-attribute .btn-supporter').eq(0).trigger('tap');

	waitForTrue(function(){
		return $('.pop-deck').is(':visible')
	},function(){
		$('.btn-usual-ok').trigger('tap');
	});
};

act.func[2] = function(){
	$('.btn-skip').trigger('tap');

	waitForTrue(function(){
		return $('.pop-synopsis').is(':visible')
	},function(){
		$('.btn-usual-ok').trigger('tap');
	})
};

act.func[3] = function(){
	if($('.enemy-2 .name').html()=='Lv7 ホワイトラビット'){
		$('.enemy-2').trigger('tap');

		waitForTrue(function(){
			return $('.enemy-2').is('.lock-on')
		},function(){
			$('.btn-ability-available').eq(8).trigger('tap');

			waitForTrue(function(){
				return $('.btn-attack-start').is('.display-on')
			},function(){
				$('.btn-ability-available').eq(8).trigger('tap');

				waitForTrue(function(){
					return $('.btn-attack-start').is('.display-on')
				},function(){
					$('.btn-ability-available').eq(3).trigger('tap');

					waitForTrue(function(){
						return $('.btn-attack-start').is('.display-on')
					},function(){
						$('.btn-ability-available').eq(1).trigger('tap');

						/*waitForTrue(function(){
							return $('.btn-attack-start').is('.display-on')
						},function(){
							$('.btn-ability-available').eq(3).trigger('tap');
						})*/
					})
				})
			})
		});
	}else{
		act.func[4]();
	}
};

act.func[4] = function(){
	$('.btn-raid-menu').trigger('tap');

	waitForTrue(function(){
		return $('.pop-raid-menu').is(':visible')
	},function(){
		$('.btn-withdrow').trigger('tap');

		waitForTrue(function(){
			return $('.pop-result-withdraw').is(':visible')
		},function(){
			$('.btn-usual-ok').trigger('tap');

			waitForTrue(function(){
				return $('.btn-result').is(':visible')
			},function(){
				act.func[0]();

				setTimeout(act.func[1],2000);
			});
		});
	});
};

act.func[5] = function(){
	$('.btn-command-forward:not(.disable)').trigger('tap');
	setTimeout(act.func[5],300);
};

Object.defineProperties(act,{
	'a0':{get:act.func[0]},
	'a1':{get:act.func[1]},
	'a2':{get:act.func[2]},
	'a3':{get:act.func[3]},
	'a4':{get:act.func[4]}
});

inspector();