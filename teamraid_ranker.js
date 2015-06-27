var waiting = 2000;

/*function findGuild(dn){
	var found = false;
	$('.prt-ranking-item .lis-ranking').each(function(i,el){
		var n = $('.prt-ranking-name .txt-name',el).text();
		if(dn==n){
			console.info('found on index',i);
			found = true;
			return;
		}
	});
	if(!found && $('.btn-forward').attr('disable')=='false'){
		$('.btn-forward').trigger('tap');
		setTimeout(function(){
			findGuild(dn);
		},waiting);
		return 'Searching...';
	}else if(!found){
		console.info('not found!');
	}
}*/

function findRanker(rn){
	var found = false;
	$('.prt-ranking-item .lis-ranking').each(function(i,el){
		var n = $('.prt-ranking-name .txt-name',el).text();
		if(rn==n){
			var p = location.hash.split('/');
			p = ~~p[p.length-1];
			console.info('Found on pos:',(p-1)*10+i+1);
			found = true;
			return;
		}
	});
	if(!found && $('.btn-forward').attr('disable')=='false'){
		$('.btn-forward').trigger('tap');
		setTimeout(function(){
			findRanker(rn);
		},waiting);
		return 'Searching...';
	}else if(!found){
		console.info('not found!');
	}
}

console.info('输入findRanker开始搜索对手吧。');