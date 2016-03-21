!function(){

	var btnElem;

	var startAction = function(){
		btnElem = document.createElement('div');
		btnElem.innerHTML = '[copy]';
		btnElem.title = '点击复制房间ID';
		btnElem.style.cssText = 'position:absolute;left:11px;top:45px;width:106px;height:32px;font-size:9px;text-align:right;line-height:6;color:#8A2BE2';
		document.querySelector('.prt-view-menu').appendChild(btnElem);
		btnElem.addEventListener('click',doCopy);
	};

	var doCopy = function(){
		var target = document.querySelector('.txt-room-id');
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
		textArea.value = target.innerHTML;

		document.body.appendChild(textArea);
		textArea.select();
		var ret = document.execCommand('copy');
		document.body.removeChild(textArea);
		if(ret){
			btnElem.innerHTML = 'copied';
		}
	};

	setTimeout(startAction,1000);

}();