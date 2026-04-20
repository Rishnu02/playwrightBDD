import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, expect, Page } from '@playwright/test'
import { chromium, Expect } from '@playwright/test';

const config = {
    baseURL: "https://www.saucedemo.com",
    validUsername: "standard_user",
    validPassword: "secret_sauce"
};

setDefaultTimeout(60 * 1000); // 60 second timeout

let browser:Browser;
let page:Page;

Before(async() =>{
 browser= await chromium.launch({headless:false});
        page = await browser.newPage();
})

After(async() => {
    await browser.close();
})

Given('User is on saucedemo login page', async() => {      
        await page.goto(config.baseURL);
});

When('user hit login button after entering username and password', async() => {
    await page.fill("#user-name", config.validUsername);
    await page.fill("#password", config.validPassword);
    await page.click('#login-button');
});

Then('login should be successful and user can can page title', async() => {
    await expect(page).toHaveURL(config.baseURL + "/inventory.html");
})

When('user enters username as {string} and password as {string}', async(username: string, password: string) => {
    await page.fill("#user-name", username);
    await page.fill("#password", password);
    await page.click('#login-button');
});

Then('login should fail with error message', async() => {
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
});

