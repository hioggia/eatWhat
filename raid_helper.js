function setHp(index){$('.btn-enemy-gauge[target='+ (index+1)+']').html('<span class="wg_hpshow">'+stage.pJsnData.boss.param[index].hp+'/'+stage.pJsnData.boss.param[index].hpmax)}
function setHpAll(){for(var l=stage.pJsnData.boss.param.length;l>0;l--){setHp(l-1)}}
$('<style>.wg_hpshow{position:absolute;color:white;font-size:0.7em;bottom:-5px;right:5px;}</style>').appendTo(document.body);
setInterval(setHpAll,1000);
console.info('血量显示已启用。')