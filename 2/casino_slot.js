(function(){

function tp(s){if($('#pop-captcha').children().size()==0){$(s).trigger('tap')}};
function tz(s){
	var _=$('div',s),__=_.size()-1,___=0;
	_.each(function(i,____){
		___+=~~____.className.split('_')[1]*Math.pow(10,__-i)
	});
	return ___
}
function m(p,g){
	if(new Date().getTime()>=nextStopTime){k(p,g);return}
	if(tz('.prt-medal')<=p || tz('.prt-medal')>=g){console.info('end');return}
	if(tz('.prt-bet')==0){
		var r=tz('.prt-won');
		o=0,a+=r-b,l++;
		if(r>0){c++}
		ela.html('累计：'+l+'次，命中：'+c+'次，成绩：'+a);
		localStorage['wg_slot_record']=JSON.stringify({l:l,a:a,c:c});
		tp('.prt-bet-max');
	}else if(o++>30){
		location.reload()
	}
	setTimeout(m,1000*2)
}
var l=0,a=300,o=0,b=300,c=0,ela,nextStopTime;
var cc = $('<div class="wg"><style>.wg{position:absolute;z-index:100000;top:0}.wg button{width:64px;height:22px;padding:0;margin-right:4px}</style></div>').appendTo(document.body),
	cmd1 = $('<button>重置</button>').appendTo(cc),
	et = 'ontouchstart' in window ? 'touchstart' : 'mousedown';

cmd1.on(et,function(){
	l=0,a=300,c=0;
});

function k(p,g){
	setTimeout(function(){
		nextStopTime=new Date().getTime()+1000*60*60*2;s(nextStopTime);m(p,g)
	},1000*60*30)
};
function s(t){
	if(t){
		localStorage['wg_slot_next_stop_time'] = t;
	}else{
		return ~~localStorage['wg_slot_next_stop_time'];
	}
};
function g(){
	ela=$('<div></div>').appendTo('.prt-controller').css({position:'absolute',top:'100%',left:'0',color:'white'});
	var t=localStorage['wg_slot_record'];
	if(t){
		t=JSON.parse(t);
		l=t.l,a=t.a,c=t.c;
	}
	createjs.Ticker.setFPS(300);
	nextStopTime=s();
	if(new Date().getTime()>nextStopTime){
		nextStopTime=new Date().getTime()+1000*60*60*2;
		s(nextStopTime);
		m(1000000,Infinity)
	}else{
		k(1000000,Infinity)
	}
}
setTimeout(g,1000*5);

})();