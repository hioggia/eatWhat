(function(){
	
function getShowedApRemainingTime(){
	var a = $('.txt-stamina-remaining').text().replace('分','').split('時間').map(function(v,i){return ~~v});
	if(a.length==1){
		a.unshift(0);
	}
	return a;
}

function getShowedBpRemainingTime(){
	var a = $('.txt-bp-remaining').text().replace('分','').split('時間').map(function(v,i){return ~~v});
	if(a.length==1){
		a.unshift(0);
	}
	return a;
}

function getShowedApRemainingPoint(){
	return $('.txt-stamina-value').attr('title').split('/').map(function(v,i){return ~~v});
}

function getShowedBpRemainingPoint(){
	return [~~$('.prt-user-bp-value').attr('title'),5];
}

function setStamina(staminaType,nowStamina){
	if(staminaType=='ap'){
		var cont = $('.txt-stamina-value').attr('title',nowStamina[0]+'/'+nowStamina[1]).empty();
		for(var i=0,s=nowStamina[0]+'';i<s.length;i++){
			$('<span class="num-stamina'+s[i]+'"></span>').appendTo(cont);
		}
		$('<span class="num-stamina-slash"></span>').appendTo(cont);
		for(var i=0,s=nowStamina[1]+'';i<s.length;i++){
			$('<span class="num-stamina'+s[i]+'"></span>').appendTo(cont);
		}
		$('.prt-stamina-gauge-inner').css('width',Math.min(100,nowStamina[0]/nowStamina[1]*100)+'%');
	}else{
		var cont = $('.prt-user-bp-value').attr('title',nowStamina[0]).empty();
		for(var i=0;i<nowStamina[0] && i<=5;i++){
			$('<span class="ico-bp"></span>').appendTo(cont);
		}
	}
}

function setRemaining(staminaType, elapseTime){
	var str = '', el = '';
	if(staminaType=='ap'){
		el = '.txt-stamina-remaining';
	}else{
		el = '.txt-bp-remaining';
	}
	if(elapseTime[0]!=0 || elapseTime[1]!=0){
		if(elapseTime[0]>0){
			str += elapseTime[0]+'時間';
		}
		str += elapseTime[1]+'分';
		$(el).text(str);
	}else{
		$(el).empty().hide();
	}
}

function checkRemainingStaminaIsShowed(callback){
	(function checker(){
		if($('.prt-user-bp-value').attr('title')==undefined){
			setTimeout(checker,1000);
		}else{
			callback();
		}
	})();
}

var recoveryPreApPointMinutes = 5,
	recoveryPreBpPointMinutes = 20,
	tCounterID = {ap:0,bp:0};

function countDown(s,r,n,t){
	if(t[0]==0 && t[1]==0){
		if(n[0]<n[1]){
			n[0]=n[1];
		}
		setStamina(s,n);
		return;
	}
	tCounterID[s] = setTimeout(function(){
		//console.log(s,t,n);
		t[1]--;
		if(t[1]<0 && t[0]>0){
			t[0]--,t[1]=59;
		}
		setRemaining(s,t);
		if((t[1]+1)%r==0){
			n[0]++;
			setStamina(s,n);
		}
		countDown(s,r,n,t);
	},1000*60);
}

checkRemainingStaminaIsShowed(function(){
	countDown('ap',recoveryPreApPointMinutes,getShowedApRemainingPoint(),getShowedApRemainingTime());
	countDown('bp',recoveryPreBpPointMinutes,getShowedBpRemainingPoint(),getShowedBpRemainingTime());
	console.info('体力回复倒计时已经会动了哦');
});

registerRouteChangeDestroyer(function(callback){
	clearTimeout(tCounterID.ap);
	clearTimeout(tCounterID.bp);
	callback();
});

})();