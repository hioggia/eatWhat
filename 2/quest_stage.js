(function(){

var tatf = 0;
function atf(){
	if(!$('.prt-title').is(':visible')){
		$('.btn-command-forward:not(.disable)').trigger('tap');
	}
	tatf = setTimeout(atf,300);
}

tatf = setTimeout(atf,1000);
console.info('自动前进！');

registerRouteChangeDestroyer(function(callback){
	clearTimeout(tatf);
	callback();
});

})();