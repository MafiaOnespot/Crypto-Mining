var restart = (mode) => {
	if (mode == false) {
		localStorage.removeItem(NAME_STORAGE);
		//localStorage.removeItem('prestige');
		document.location.reload(true);
	}
//Made By Abhay Mourya
	if (mode == true) {
		localStorage.removeItem(NAME_STORAGE);
		localStorage.removeItem('prestige');
		localStorage.removeItem('date');
		document.location.reload(true);
	}
}
//Made By Abhay Mourya
var save = () => {

	localStorage.setItem(NAME_STORAGE, window.btoa(JSON.stringify(
		{
			levels: app.$data.levels,
			shop: app.$data.shop,
			coins: app.$data.coins,
			auto_coins: app.$data.auto_coins,
			power: app.$data.power
		}
	)));
//Made By Abhay Mourya
}