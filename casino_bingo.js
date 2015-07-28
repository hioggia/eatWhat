function checkNumber(){
	var el = $('.prt-hit-box .number');
	if(el.size()>0){
		for(var a=el.get(0).className.split(' ');a.length>0;a.shift()){
			if(/prt-hit-number-\d+/.test(a[0])){
				var ret = a[0].split('-');
				return ret[ret.length-1]
			}
		}
	}
	return null
}

function tapNumber(n){
	var el = $('.prt-sheet-box .btn-number-close-'+n);
	if(el.size()>0){
		console.info('tap on '+n);
		el.trigger('tap');
	}
}

function mainCycle(){
	var n = checkNumber();
	if(n!=null){
		tapNumber(n);
	}
	setTimeout(mainCycle,delayTime);
}

function playNext(){
	$('.btn-usual-ok').trigger('tap');
	$('.pop-bingo-result .btn-play-again').trigger('tap');
	$('.pop-bet .btn-play-ok').trigger('tap');
}

function _autoNext(){
	if($('#pop').children().size()>0){
		playNext();
	}
	_autoNextID = setTimeout(_autoNext,delayTime);
	return '输入 stopAutoNext 来停止自动开始的命令。'
}

function _stopAutoNext(){
	clearTimeout(_autoNextID);
	return 'Good Luck :)';
}

Object.defineProperties(window,{
	autoNext:{get:_autoNext},
	stopAutoNext:{get:_stopAutoNext}
});

var delayTime=1000, _autoNextID=0;

mainCycle();

var cc = $('<div class="wg"><style>.wg{position:absolute;z-index:20;top:0}.wg button{width:76px;height:22px;margin-right:4px}</style></div>').appendTo(document.body),
	cmd1 = $('<button>自动下一局</button>').appendTo(cc),
	et = 'ontouchstart' in window ? 'touchstart' : 'mousedown';

cmd1.on(et,function(){
	if(cmd1.text()=='停止'){
		cmd1.text('自动下一局');
		_stopAutoNext();
	}else{
		cmd1.text('停止');
		_autoNext();
	}
});

console.info('自动点击已启用。');
