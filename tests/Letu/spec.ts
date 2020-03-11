import { singlePack, test } from '@actions'
import po from '@pages'
import faker from 'faker'
import { browser } from '@config/jest.settings'

const path = 'https://www.letu.ru/';
const LetuPage = po.rest;
async function openHomePage() {
  await LetuPage.setCookie( { name: "cityGuessed", value: "true", url: path } );
  await LetuPage.setUserAgent('AutoTest');
  await LetuPage.open(path, true, undefined);
}

singlePack('Set cookie and useragent', async () => {
  test(`Set  and expected cookie and user agent from page: "${path}"`, async () => {
    await openHomePage();
    expect( JSON.stringify(await LetuPage.getCookies()).search(/{([^{}]*)"name":"cityGuessed"([^{}]*)"value":"true"([^{}]*)}/g)).not.toEqual(-1);
  });
});

// --- * FIRST TASK * ---
singlePack('[First Task] Error Message Test',  () => {

  const subscribeSelectors = {
    inputFieldEmail: '#footer .subscribe-form input[type="email"]',
    divErrorBox: '#footer .ws-errorbox p.help-block',
    successfulSubscribe: '.subscribed-message',
    buttonSubscribe: '#footer button.btn-rd-subscribe',
  };

  const expectedMessage = {
    "successfulSubscribe": {text: "Вы успешно подписались, спасибо!", location: subscribeSelectors.successfulSubscribe},
    "alreadySubscribed": {text: "Введенный Вами адрес e-mail уже находится в списке рассылки новостей.", location: subscribeSelectors.divErrorBox},
    "invalidEmail": {text: "Неверный формат email", location: subscribeSelectors.divErrorBox},
  };

  const oneRandomEmail = faker.internet.email();

  const emailsTest = [{
    email: oneRandomEmail,
    result : expectedMessage.successfulSubscribe,
  },
    {
      email: oneRandomEmail,
      result : expectedMessage.alreadySubscribed,
    },
    {
      email: "asdas@sfdd.ru",
      result : expectedMessage.alreadySubscribed,
    },
    {
      email: "a123dq43wsf3as4313*/*d",
      result : expectedMessage.invalidEmail,
    },
    {
      email: "jhj143kj1@gdbd.dfg",
      result : expectedMessage.invalidEmail,
    }];


  emailsTest.forEach (async (obj) => {
    test(`Checked email: "${obj.email}" expected: "${obj.result.text}"`, async () => {
      await openHomePage();
      await LetuPage.hover(subscribeSelectors.inputFieldEmail);
      // await LetuPage.type(subscribeSelectors.inputFieldEmail, "");
      // await LetuPage.clickPuppeteer(subscribeSelectors.buttonSubscribe);
      // await LetuPage.waitToBeInvisible(subscribeSelectors.divErrorBox);
      await LetuPage.type(subscribeSelectors.inputFieldEmail, obj.email);
      await LetuPage.clickPuppeteer(subscribeSelectors.buttonSubscribe);
      let result = await LetuPage.getText(obj.result.location);
      expect(obj.result.text).toEqual(result);
    });
  });
});
// --- * FIRST TASK * ---


singlePack('[Second Task] Promotion Product Name Test', () => {
  const selector = {
    allActionsButton: '.header-bottom li a[href*="/promos"]',
    actionsItems:".promo-list-item",
    resultListForPromo: '.LETUR-PromoResultsList .products-list__item-container',
    pdpItemHeader: 'h1',
  };

  test('Second Task', async () => {
    await openHomePage();
    await LetuPage.clickPuppeteer(selector.allActionsButton);
    await LetuPage.clickPuppeteer(selector.actionsItems);
    await LetuPage.clickElementFromList(selector.resultListForPromo);
    let result = LetuPage.getText(selector.pdpItemHeader);
    console.log(`My name this is: ${result}`);




    console.log("Run test Second ....")
  });
});

// singlePack('[Third Task] Edik Un-login Test', () => {
//   test('Third Task', async () => {
//     console.log("Run test Third ....")
//   });
// });
//
// singlePack('[Fourth Task] Pickup Store Selection Test', () => {
//   test('Fourth Task', async () => {
//     console.log("Run test Fourth ....")
//   });
// });
//
// singlePack('[Fifth Task] NDK change Test', () => {
//   test('Fifth Task', async () => {
//     console.log("Run test Fifth ....")
//
//   });
// });

singlePack('Example single Pack tests for Letu.ru', () => {
  test('Close Browser', async () => {

//     const LetuPage = po.rest
//     const path = 'https://www.letu.ru/product/unicorns-approve-podarochnyi-paket-l-etoile-selection-unicorns-approve/67300070/sku/81700180'
//     await LetuPage.open(path, true, undefined)
//
//
//     await LetuPage.clickWithResponse('.btn.btn-lg.btn-primary', true, 'addItemToOrder')
//     await LetuPage.clickWithResponse('a[href="cart"]', true, 'cart')
//     await LetuPage.clickWithResponse('.alert.alert-info .pseudolink', true, 'storesByCity')
//     await LetuPage.clickWithResponse('.btn-rd.btn-rd-big.btn-rd-block', true, 'updateShippingDetails')
//     await LetuPage.clickWithResponse('label[data-bind*="courier"', true, 'updateShippingDetails', 'orderDelivery')
//     await LetuPage.clickWithResponse('.products-list-table-actions-button-block', true, 'checkout', 'checkoutDelivery')
//
//     const selector = 'select[data-bind*="deliveryDates"]'
//     await LetuPage.selectWithResponse(selector, 3, ['updateShippingDetails'])
//
//     const delivery = await LetuPage.getText('.checkout-form-text.font-bold')
//     expect(delivery).toContain('Курьерская доставка')
//     const siteDates = await LetuPage.getText(selector)
//
//     const parsedDate = new Date().toLocaleDateString().split('/')
//     const day = parseInt(parsedDate[1]) + 1
//     const nextDay = `${(day.toString().length === 1) ? ('0' + day) : day}.${(parsedDate[0].length === 1) ? ('0' + parsedDate[0]) : parsedDate[0]}.${parsedDate[2]}`
//
//     expect(siteDates).toContain(nextDay)

    await browser.close()
  })
});