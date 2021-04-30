import axios from "axios";

import { apiEndPoint } from "../config.json";

let netSaleUrl = apiEndPoint + "net_sales_plot/";
let dailySaleUrl = apiEndPoint + "daily_orders_plot/";
let saleChangeUrl = apiEndPoint + "sales_change_plot/";
let orderChangeUrl = apiEndPoint + "orders_change_plot/";
let fridaysUrl = apiEndPoint + "day_of_week_sales_plot/";
let laborUrl = apiEndPoint + "pay_by_sales_plot/";
let sendEmailUrl = apiEndPoint + "send_mail";

export async function getNetSale(timeFrame, numberOfMonth) {
  return await axios({
    method: "get",
    url: netSaleUrl + timeFrame + "/" + numberOfMonth,
  });
}

export async function getDailyOrder(timeFrame, numberOfMonth) {
  return await axios({
    method: "get",
    url: dailySaleUrl + timeFrame + "/" + numberOfMonth,
  });
}

export async function getSaleChange(timeFrame) {
  return await axios({
    method: "get",
    url: saleChangeUrl + timeFrame,
  });
}
export async function getOrderChange(timeFrame) {
  return await axios({
    method: "get",
    url: orderChangeUrl + timeFrame,
  });
}

export async function getWeekSale(timeFrame) {
  return await axios({
    method: "get",
    url: fridaysUrl + timeFrame,
  });
}
export async function getLabor(timeFrame) {
  return await axios({
    method: "get",
    url: laborUrl + timeFrame,
  });
}
export async function sendEmail() {
  return await axios({
    method: "get",
    url: sendEmailUrl,
  });
}
