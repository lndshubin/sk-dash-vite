import { createChart } from 'lightweight-charts'


const ROOT = 'http://localhost:8888'
const months = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек',]
let shares = {
	'kztk': 2366,
	'kmgz': 8226,
	'kap': 11056,
	'kegc': 7978,
	'kzto': 2530,
}

// const data = await fetch(`https://visionary-clafoutis-271c05.netlify.app/fetch`, {
const data = await fetch(`http://localhost:8888/fetch`, {
  method: 'GET',
  headers: { "Content-Type": "application/json" },
  }).then(r => r.json())


const newshares = {}

for (const share in data){ 
  newshares[share] = data[share].ohlcList.map(i => {
    return { time: Date.parse(i.closeTime)/1000, value: i.close }
  })
}
for (const s in newshares){ newChart(s, newshares[s]) }


function newChart(id, data) {
	
	const chart = createChart(document.getElementById(id), {
		autoSize: true,
		AutoscaleInfo: 'priceRange',
		layout: {
			background: { color: 'rgba(255, 255, 255, 0)' },
			textColor: '#A19989',
		},
		grid: {
			vertLines: { color: '#353C63' },
			horzLines: { color: '#353C63' },
		},
		timeScale: {
			barSpacing: document.getElementById(id).offsetWidth / 50,	
			timeVisible: true,
			secondsVisible: false,
			tickMarkFormatter: (time, tickMarkType, locale) => {

				const timeJS = new Date((time - 21600) * 1000)
				if (tickMarkType == 0) {return timeJS.getFullYear()}
				if (tickMarkType == 1) {return months[timeJS.getMonth()]}
				if (tickMarkType == 2) {return `${timeJS.getDate()} ${months[timeJS.getMonth()]}`}
				if (tickMarkType == 3) {return String(timeJS).split(' ')[4].slice(0, 5)}
			},
		},
		watermark: {
			visible: 	true,
			fontSize: 	32,
			horzAlign: 	'center',
			vertAlign: 	'center',
			color: 		'rgba(36, 62, 100, 0.6)',
			text: 		id.toUpperCase(),
		},
	})

	window.onresize = function () {
		chart.applyOptions({
			width: 	container.offsetWidth,
			height: container.offsetHeight,
		})
	}
	const areaSeries = chart.addAreaSeries({
		lineColor: 	'#A19989',
		topColor: 	'rgba(161, 153, 137, 0.6)',
		bottomColor:'rgba(161, 153, 137, 0)',
		lineWidth: 	2,
	})
    areaSeries.setData(data)
}


