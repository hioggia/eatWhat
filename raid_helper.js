function setHp(index){$('.btn-enemy-gauge[target='+ (index+1)+']').html('<span class="wg_hpshow">'+stage.pJsnData.boss.param[index].hp+'/'+stage.pJsnData.boss.param[index].hpmax)}
function setHpAll(){for(var l=stage.pJsnData.boss.param.length;l>0;l--){setHp(l-1)}}
function renewHpAll(){setHpAll();setTimeout(renewHpAll,1000);}
$('<style>.wg_hpshow{position:absolute;color:#f2eee2;text-shadow:0 0 1px #0c320d,0 0 1px #0c320d,0 0 1px #0c320d,0 0 1px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d,0 0 2px #0c320d;font-size:0.7em;bottom:-5px;right:5px;}</style>').appendTo(document.body);
setTimeout(renewHpAll,3000);
console.info('血量显示已启用。')