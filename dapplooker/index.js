const DLAnalytics = require("@dapp-sdk/analytics")

const getChartData = async () => {
	let chartUUID = "dc9b69d8-7ca1-45d4-8ad0-a17f915f3f0";
	let apiKey = "qzusb5p3q246ip246ab6g0p8ppzb7u";
	let outputFormat = 'json'
	let baseConfig = {
		apiKey: apiKey,
		env: "dev"
	}
	let dappLookerSDK = new DLAnalytics.default(baseConfig);
	let response = await dappLookerSDK.getChartData(chartUUID, outputFormat);
	console.log("Chart API Data: ", JSON.stringify(response));
};

getChartData();
