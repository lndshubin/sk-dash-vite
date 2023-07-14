
let shares = {
	'kztk': 2366,
	'kmgz': 8226,
	'kap': 11056,
	'kegc': 7978,
	'kzto': 2530,
}

function getdata(securityId, date){
	return fetch('http://ec2-18-196-98-221.eu-central-1.compute.amazonaws.com/getKaseStockRates', {
    method: 'POST',
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Cookie": "JSESSIONID=AD5902FC930512BBA48B3912939E211A",
      "Authorization": "Basic c3RvY2tfdXNlcjohc0pAdUM2OVB1N3o="
    },
    body: JSON.stringify({
      "securityId": securityId,
      "period": { quarter: { number: date.getMonth() / 3 + 1, year: date.getFullYear() } }
    }),
  }).then(r => r.json())
}


const data = {}
for (const company in shares){
  data[company] = await getdata(shares[company], new Date())
}

export default async () => {
  return new Response(JSON.stringify(data), {
    headers: { 
      "content-type": "application/json",
      'Access-Control-Allow-Origin': '<origin>',
    },
  })
}
// export const config = { path: "/fetch" };