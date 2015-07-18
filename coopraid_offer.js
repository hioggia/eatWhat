function _tapJoin(){$('.btn-usual-join:visible').trigger('tap');$('.btn-usual-ok:visible').trigger('tap');_autoTapJoin()}
function _autoTapJoin(){setTimeout(_tapJoin,50)}
_autoTapJoin();
//$('.prt-wanted-list').on('tap',autoTapJoin);
console.info('单击参加已启用。你还可以输入 autoFindRoom(\'h8|Ｈ8|ハード8\') 自动加入房间。')

var _keyword = /サジ|匙|ex3\-3|ex3/i;
function _findAndTapSaji(){_autoSaji();$('.prt-wanted-room').each(function(i,el){
	var t=$('.txt-room-comment',el).text();
	if(_keyword.test(t) && $('.prt-member-image',el).children().size()<3){
		$(el).trigger('tap');console.log(t)
	}
})}
function _autoSaji(){setTimeout(_findAndTapSaji,50)}
function autoFindRoom(comment){
	_keyword = new RegExp(comment,'i');
	_autoSaji();
	_autoRenew();
}

var _waitSec = 3;
function _renewList(){_autoRenew();$('.btn-refresh-list').trigger('tap')}
function _autoRenew(){if($('.loading').is(':visible')){setTimeout(_autoRenew,50)}else{setTimeout(_renewList,1000*_waitSec)}}