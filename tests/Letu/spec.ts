import { singlePack, test } from '@actions'
import po from '@pages'
import { browser } from '@config/jest.settings'
import {defaultLoginValue} from "@const/properties/constants";

const path = 'https://www.letu.ru/';
const emails = {
  test_1: "asdas@sfdd.ru",
  test_2: "jhj143kj1@gdbd.dfg",
  test_3: "adfdsgdsfg@gfgd",
  test_4: "a123dq43wsf3as4313*/*d",
};
const cookieObject = {
  "name": "cityGuessed",
  "value": "true",
};
const messages = ['Неверный формат email', 'Введенный Вами адрес e-mail уже находится в списке рассылки новостей.'];
const subscribeSelectors = {
  inputFieldEmail: '#footer .subscribe-form input[type="email"]',
  divErrorBox: '#footer .ws-errorbox p.help-block',
  buttonSubscribe: '#footer button.btn-rd-subscribe',
};

singlePack('products', () => {
  test('letu test', async () => {
    const LetuPage = po.rest;
    await LetuPage.open(path, true, undefined)
    await LetuPage.setCookie(cookieObject);
    //  await LetuPage.reload()
    //  const result = await LetuPage.getCookies();
    // console.log(`result ${JSON.stringify(result)}`);
    await LetuPage.hover(subscribeSelectors.inputFieldEmail);
    await LetuPage.type(subscribeSelectors.inputFieldEmail, emails.test_3);
    await LetuPage.click(subscribeSelectors.buttonSubscribe);
    let result = await LetuPage.getText(subscribeSelectors.divErrorBox);
    console.log(`result : "${result}"`);
    expect(messages).toContain(result);
    await browser.close();

    //
    //
    // await LetuPage.clickWithResponse('.btn.btn-lg.btn-primary', true, 'addItemToOrder')
    // await LetuPage.clickWithResponse('a[href="cart"]', true, 'cart')
    // await LetuPage.clickWithResponse('.alert.alert-info .pseudolink', true, 'storesByCity')
    // await LetuPage.clickWithResponse('.btn-rd.btn-rd-big.btn-rd-block', true, 'updateShippingDetails')
    // await LetuPage.clickWithResponse('label[data-bind*="courier"', true, 'updateShippingDetails', 'orderDelivery')
    // await LetuPage.clickWithResponse('.products-list-table-actions-button-block', true, 'checkout', 'checkoutDelivery')
    //
    // const selector = 'select[data-bind*="deliveryDates"]'
    // await LetuPage.selectWithResponse(selector, 3, ['updateShippingDetails'])
    //
    // const delivery = await LetuPage.getText('.checkout-form-text.font-bold')
    // expect(delivery).toContain('Курьерская доставка')
    // const siteDates = await LetuPage.getText(selector)
    //
    // const parsedDate = new Date().toLocaleDateString().split('/')
    // const day = parseInt(parsedDate[1]) + 1
    // const nextDay = `${(day.toString().length === 1) ? ('0' + day) : day}.${(parsedDate[0].length === 1) ? ('0' + parsedDate[0]) : parsedDate[0]}.${parsedDate[2]}`
    //
    // expect(siteDates).toContain(nextDay)
  })
})
