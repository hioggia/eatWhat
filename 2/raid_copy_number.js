!function(){

	var moPop = new MutationObserver(popCheck);
	var btnElem;

	var doCopy = function(){
		var ret = copyTextToClipboard(stage.pJsnData.twitter.battle_id+'  \r\n'+stage.pJsnData.twitter.monster);
		if(ret){
			btnElem.innerHTML = 'copied';
		}
	};

	function popCheck(ms){
		if( document.querySelector('.pop-start-assist') ){
			btnElem.innerHTML = '[copy]';
			document.querySelector('.prt-battle-join').appendChild(btnElem);
			btnElem.addEventListener('click',doCopy);
		}else{
			btnElem.removeEventListener('click',doCopy);
		}
	}

	!function init(){
		if(document.querySelector('#pop')){
			btnElem = document.createElement('div');
			btnElem.innerHTML = '[copy]';
			btnElem.title = '点击复制房间ID';
			btnElem.style.cssText = 'position:absolute;left:90px;top:60px;width:140px;height:32px;font-size:75%;text-align:right;line-height:6;color:＃F0E0FF';
			moPop.observe(document.querySelector('#pop'),{childList:true});
			registerRouteChangeDestroyer(function(callback){
				moPop.disconnect();
				callback();
			});
		}else{
			setTimeout(init,300);
		}
	}();

}();