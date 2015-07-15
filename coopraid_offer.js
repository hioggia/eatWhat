function tapJoin(){$('.btn-usual-join').trigger('tap')}
function autoTapJoin(){setTimeout(tapJoin,100)}
$('.prt-wanted-list').on('tap',autoTapJoin);
console.info('单击参加已启用。')