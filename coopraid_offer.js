function _tapJoin(){$('.btn-usual-join:visible').trigger('tap');_autoTapJoin()}
function _autoTapJoin(){setTimeout(_tapJoin,50)}
_autoTapJoin();
//$('.prt-wanted-list').on('tap',autoTapJoin);
console.info('单击参加已启用。输入 autoFindRoom(\'h3-2\') 自动加入房间。')

var _keyword = /サジ|匙|ex3\-3/i;
function _findAndTapSaji(){_autoSaji();$('.prt-wanted-room').each(function(i,el){var t=$('.txt-room-comment',el).text();if(_keyword.test(t)){$(el).trigger('tap');console.log(t)}})}
function _autoSaji(){setTimeout(_findAndTapSaji,50)}
function autoFindRoom(comment){
	_keyword = new RegExp(comment,'i');
	_autoSaji();
}

function _renewList(){_autoRenew();$('.btn-refresh-list').trigger('tap')}
function _autoRenew(){setTimeout(_renewList,2000)}
_autoRenew();