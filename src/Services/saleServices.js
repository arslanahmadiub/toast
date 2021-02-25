import axios from "axios";

import { apiEndPoint } from "../config.json";

let netSale = apiEndPoint + "net_sales_plot/";

export async function getNetSale(timeFrame, numberOfMonth) {
  return await axios({
    method: "get",
    url: netSale + timeFrame + "/" + numberOfMonth,
  });
}
