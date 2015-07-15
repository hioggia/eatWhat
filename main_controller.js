var host = 'http://hioggia.github.io/eatWhat/';
//host = 'http://localhost:8011/';

var createScriptLoader = function(file,readySerif){
	var s = document.createElement('script');
	if(readySerif==undefined){readySerif='别急，很快就要开始了。'}
	var t = "function mp(){var s=document.createElement('script');s.onerror=function(){location.reload()};s.src='"+host+file+"';document.body.appendChild(s)};function sb(){if(window.$ && !$('#ready').is(':visible')){setTimeout(mp,3000);console.info('"+readySerif+"')}else{setTimeout(function(){sb()},1000)}}sb()";
	s.innerHTML = t;
	document.body.appendChild(s);
};

if(/casino\/game\/slot/i.test(location.hash)){
	createScriptLoader('casino_slot.js?v=1');
}

else if(/casino\/game\/poker/i.test(location.hash)){
	createScriptLoader('casino_poker.js?v=1');
}

else if(/casino\/game\/bingo/i.test(location.hash)){
	createScriptLoader('casino_bingo.js?v=1','请稍后。');
}

else if(/event\/teamraid\d+\/ranking_guild\/detail/i.test(location.hash) || /event\/teamraid\d+\/ranking\/detail/i.test(location.hash)){
	createScriptLoader('teamraid_ranker.js?v=1','请稍后。');
}

else if(/raid\/\d+/i.test(location.hash) || /raid_multi\/\d+/i.test(location.hash)){
	createScriptLoader('raid_helper.js?v=1','请稍后。');
}

else if(/coopraid\/offer/i.test(location.hash)){
	createScriptLoader('coopraid_offer.js?v=1','请稍后。');
}