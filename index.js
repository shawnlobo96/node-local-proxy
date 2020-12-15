const { Builder, By, Key, until } = require('selenium-webdriver');
var browserstack = require('browserstack-local');

var capabilities = {
    "os": "OS X",
    "os_version": "Catalina",
    "browserName": "Safari",
    "browserstack.local": "true",
    "browser_version": "13.1",
    "browserstack.selenium_version": "3.14.0",
    "browserstack.user": "username",
    "browserstack.key": "access_key"
};



//creates an instance of Local
var bs_local = new browserstack.Local();

// replace <browserstack-accesskey> with your key. You can also set an environment variable - "BROWSERSTACK_ACCESS_KEY".
var bs_local_args = { 'key': capabilities["browserstack.key"], 'proxyHost': '127.0.0.1', 'proxyPort': '8080', 'forceLocal': true, 'verbose': '3' };

// starts the Local instance with the required arguments



(async function test() {

    await bs_local.start(bs_local_args, function () {
        console.log("Started BrowserStackLocal");
    });

    // check if BrowserStack local instance is running
    await bs_local.isRunning()

    var driver = new Builder().usingServer('http://hub-cloud.browserstack.com/wd/hub').usingWebDriverProxy("http://localhost:8080").withCapabilities(capabilities).build();

    try {

        await driver.get("https://google.com")
        await driver.takeScreenshot()
    }
    catch (e) {
        console.log(e)
    }

    finally {
        await driver.quit();
        bs_local.stop(function () {
            console.log("Stopped BrowserStackLocal");
        });
    }
})();