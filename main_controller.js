var host = 'http://hioggia.github.io/eatWhat/',
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
	//alert('please update your kajikano extensions.');
	//return;
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
	
	else if(/casino\/game\/slot/i.test(location.hash)){
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

	else if(/quest\/stage/i.test(location.hash)){
		createScriptLoader('quest_stage.js?v=1','请稍后。');
	}

	setTimeout(inspector,1000);
};

inspector();
