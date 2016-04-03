!function(){

	var btnElem;

	var startAction = function(){
		if(document.querySelector('.prt-view-menu')){
			btnElem = document.createElement('div');
			btnElem.innerHTML = '[copy]';
			btnElem.title = '点击复制房间ID';
			btnElem.style.cssText = 'position:absolute;left:11px;top:45px;width:106px;height:32px;font-size:75%;text-align:right;line-height:6;color:#8A2BE2';
			document.querySelector('.prt-view-menu').appendChild(btnElem);
			btnElem.addEventListener('click',doCopy);
			registerRouteChangeDestroyer(function(callback){
				btnElem.removeEventListener('click',doCopy);
				callback();
			});
		}
	};

	var doCopy = function(){
		var target = document.querySelector('.txt-room-id');
		var ret = copyTextToClipboard(target.innerHTML);
		if(ret){
			btnElem.innerHTML = 'copied';
		}
	};

	setTimeout(startAction,1000);

}();