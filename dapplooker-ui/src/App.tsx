import { useEffect, useState } from 'react'
import './App.css'

import DLAnalytics from "@dapp-sdk/analytics";
import { DLTableReactElement } from "@dapp-sdk/analytics-ui";

function App() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
         getAPIData().then(() => console.log("Done"))
    }, [])

    const getAPIData = async () => {
        try {
            let chartUUID = "f4d56b7a-534a-4a11-bf54-7535f26d16a4";
            let apiKey = "";
            let outputFormat = 'json'
            let baseConfig = {
                apiKey: apiKey,
                env: "dev"
            }
            console.log("yaha hu")
            let dappLookerSDK = new DLAnalytics(baseConfig);
            let response = await dappLookerSDK.getChartData(chartUUID, outputFormat);
            console.log("Chart API Data: ", JSON.stringify(response));
            setChartData(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div>
                <h1>Hello World</h1>
                <DLTableReactElement className='my-wrapper' data={chartData}></DLTableReactElement>
            </div>
        </>
    )
}

export default App
