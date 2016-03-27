!function(){

	var btnElem;

	var startAction = function(){
		if($('#cnt-fv-close').is(':visible')){
			console.log('yes!');
			btnElem = document.createElement('div');
			btnElem.innerHTML = '[copy]';
			btnElem.title = '点击复制房间ID';
			btnElem.style.cssText = 'position:absolute;left:0;top:0;z-index:10;width:193px;height:66px;font-size:80%;text-align:right;line-height:12;color:#F5EAFF';
			document.querySelector('.prt-fv-period').appendChild(btnElem);
			btnElem.addEventListener('click',doCopy);
		}
	};

	var doCopy = function(){
		var target = document.querySelector('.txt-schedule-status');
		var ret = copyTextToClipboard(target.innerHTML.replace(/\s*次回 vs /,'').replace(/\s*$/,''));
		if(ret){
			btnElem.innerHTML = 'copied';
		}
	};

	setTimeout(startAction,1000);

}();