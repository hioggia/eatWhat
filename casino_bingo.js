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

var delayTime=1000;

mainCycle();