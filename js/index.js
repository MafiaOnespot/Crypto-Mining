const NAME_STORAGE = 'click18';
	//CHECK PRESTIGE
	if (localStorage.getItem('prestige') == null) {
		localStorage.setItem('prestige', 0);
	}
//Made By Abhay Mourya
const prestige = Number(localStorage.getItem('prestige'))
//Made By Abhay Mourya
var app = new Vue({
	el: '#app',
	data: {
		coins: 0,
		power: 0,
		auto_coins: 0,
		prestige_count: prestige,
		coins_offline: 0,
		sell_coins: 0,
		amount_select: 1,
		amount: [
			{value: 1},
			{value: 10},
			{value: 25},
			{value: 50},
			{value: 100}
		],
		levels: [
			{
				id: 0,
				text: 'Video card',
				count: 0,
				price: 0.001,
				auto_coins: 0.0001
			},
			{
				id: 1,
				text: 'Mining farm',
				count: 0,
				price: 0.1,
				auto_coins: 0.001
			},
            {
                id: 2,
                text: 'Xeon Server',
                count: 0,
                price: 2.25,
                auto_coins: 0.0025
            },
            {
                id: 3,
                text: 'Video Server',
                count: 0,
                price: 10.0,
                auto_coins: 0.005
            },
            {
                id: 4,
                text: 'Server Cluster',
                count: 0,
                price: 50.0,
                auto_coins: 0.0075
            },
            {
                id: 5,
                text: 'Video Cluster',
                count: 0,
                price: 100.0,
                auto_coins: 0.01
            },
			{
				id: 6,
				text: 'Data center',
				count: 0,
				price: 750.0,
				auto_coins: 0.1
			},
			{
				id: 7,
				text: 'Space Station',
				count: 0,
				price: 2000.0,
				auto_coins: 1.0
			},
			{
				id: 8,
				text: 'Moon base',
				count: 0,
				price: 5000.0,
				auto_coins: 3.0
			},
            {
                id: 9,
                text: 'Mars Orbit',
                count: 0,
                price: 15000.0,
                auto_coins: 5.0
            },
            {
                id: 10,
                text: 'Mars Base',
                count: 0,
                price: 370000.0,
                auto_coins: 10.0
            },
            {
                id: 11,
                text: 'Titan Orbit',
                count: 0,
                price: 100000.0,
                auto_coins: 50.0
            },
            {
                id: 12,
                text: 'Titan Base',
                count: 0,
                price: 10000000.0,
                auto_coins: 275.0
            },
            {
                id: 13,
                text: 'Neptune Orbit',
                count: 0,
                price: 1000000000.0,
                auto_coins: 1500.0
            },
            {
                id: 14,
                text: 'Neptune Base',
                count: 0,
                price: 100000000000.0,
                auto_coins: 5000.0
            },
            {
                id: 15,
                text: 'Black Hole',
                count: 0,
                price: 10000000000000.0,
                auto_coins: 500000.0
            }
		],
		course: {
			rub: 0,
			rub_24h_change: 0
		},
		lang: {
				name: 'Crypto Mining Clicker',
				shop: 'Shop',
				money: 'Coins',
				per_sec: 'sec.',
				message: 'Message',
				info: 'Info',
				click: 'Click',
				power: '$', //power
				price: 'Price',
				clear: 'Clear all data',
				admin: 'Admin',
				ok: 'OK',
				prestige: 'Invest',
				setting: 'Setting'
			}
	},
	methods: {
		click: (e) => {
			console.log(e);

			app.$data.coins += 0.0001;
			save();
//Made By Abhay Mourya
		},
		sell: () => {
				if (app.$data.sell_coins >= 0 && app.$data.coins >= app.$data.sell_coins) {
					
					app.$data.power += app.$data.sell_coins * app.$data.course.rub;
					app.$data.coins -= app.$data.sell_coins;

				} else {
					//dialog_default.showModal();
				}
		//Made By Abhay Mourya
		},
		auto: (e) => {
			let id = e.target.dataset.id
			if (app.$data.coins >= (app.$data.levels[id].price * app.$data.amount_select)) {

				app.$data.coins -= app.$data.levels[id].price * app.$data.amount_select;
				app.$data.levels[id].price = (app.$data.levels[id].price * app.$data.amount_select) + (app.$data.levels[id].price / 100 * 30);
				app.$data.auto_coins += app.$data.levels[id].auto_coins * app.$data.amount_select;
				app.$data.levels[id].count += 1 * app.$data.amount_select;

				save();
			} else {
				//dialog_default.showModal();
			}
		},
		restart: () => {
			restart(true);
		},
		prestige: () => {

			localStorage.setItem('prestige', (app.$data.power * 0.1) + prestige);
//Made By Abhay Mourya
			restart(false);
		},
		reduce_num: (number, s = 1) => {
		    if (number > 1000) {
			    let count = ["", "thou", "mill", "bill", "tril", "quad", "quin", "sext", "sept", "octi", "quin", "deci", "ande", "duod", "tred", "quat", "quin", "seks", "sept", "octo", "newm", "vigi", "anvi", "dovi", "trev", "quat", "quin", "sexv", "sept", "octo", "newm", "trig", "antr", ];
			    let i = 0;
			    while (Math.abs(number) >= 1000) {
			        number = number/ 1000;
			        i++;
			    }
		    	return `${Math.round(number, s)}${count[i]}`;		
		    } else {
		    	return number;
		    }
//Made By Abhay Mourya
		}
	}
});

fetch('https://api.coingecko.com/api/v3/simple/price?ids=4new&vs_currencies=rub&include_24hr_change=true')
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        app.$data.course = json['4new'];
    });

var dialog_default = document.querySelector('#dialog-default');
var dialog_offline = document.querySelector('#dialog-offline');

window.onload = () => {
	document.querySelector('#coins').blur()
	
	if (localStorage.getItem(NAME_STORAGE) != null) {
		let storage = JSON.parse(window.atob(localStorage.getItem(NAME_STORAGE)));
		app.$data.levels = storage.levels;
		app.$data.shop = storage.shop;
		app.$data.coins = storage.coins
		app.$data.auto_coins = storage.auto_coins
		app.$data.power = storage.power

		let offline = ((Date.parse(new Date) - Date.parse(localStorage.getItem('date'))) / 1000) * app.$data.auto_coins
		app.$data.coins += offline;
		app.$data.coins_offline = offline;
		
		console.warn(((Date.parse(new Date) - Date.parse(localStorage.getItem('date'))) / 1000) * app.$data.auto_coins)
		
		if (app.$data.coins_offline > 0.0002) {
			dialog_offline.showModal();
		}
		
		save();
	} else {
		save();
	}
}

//Made By Abhay Mourya

if (prestige > 0) { 
	app.$data.levels.forEach( function(item, i, arr) {
		app.$data.levels[i].auto_coins = app.$data.levels[i].auto_coins * prestige;
	});
}

document.addEventListener('keyup', (event) => {
	if(event.keyCode == 67){
		app.click()
	}
});

setInterval(() => {
	app.$data.coins += app.$data.auto_coins;
	localStorage.setItem('date', new Date);

	save();
}, 1000);