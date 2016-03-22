!function(){

	var moPop = new MutationObserver(popCheck);
	var btnElem;

	var doCopy = function(){
		var target = document.querySelector('.prt-battle-id');
		var textArea = document.createElement("textarea");
	
		textArea.style.position = "fixed";
		textArea.style.top = 0;
		textArea.style.left = 0;
		textArea.style.width = "2em";
		textArea.style.height = "2em";
		textArea.style.padding = 0;
		textArea.style.border = "none";
		textArea.style.outline = "none";
		textArea.style.boxShadow = "none";
		textArea.style.background = "transparent";
		textArea.value = stage.pJsnData.boss.param[0].name+'\r\n参戦ID：'+target.innerHTML;

		document.body.appendChild(textArea);
		textArea.select();
		var ret = document.execCommand('copy');
		document.body.removeChild(textArea);
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
			btnElem.style.cssText = 'position:absolute;left:90px;top:60px;width:140px;height:32px;font-size:9px;text-align:right;line-height:6;color:＃F0E0FF';
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