module.exports = {
  // To test login functionality
  "step one: login": function(browser) {
    browser
      .url("http://localhost:3000/#/")
      .waitForElementVisible("body")
      .useXpath()
      .setValue(
        '//*[@id="root"]/div/div[2]/div/div/div[2]/form/div[1]/div/input',
        "admin"
      )
      .pause(500)
      .setValue(
        '//*[@id="root"]/div/div[2]/div/div/div[2]/form/div[2]/div/input',
        "1111"
      )
      .pause(500)
      .click('//*[@id="root"]/div/div[2]/div/div/div[2]/form/div[3]/button')
      .pause(500);
  },
  // To test search functionality
  "step two: search User": function(browser) {
    browser
      .useXpath()
      .setValue(
        '//*[@id="root"]/div/div/div[1]/div[2]/div[2]/div/input',
        "test"
      )
      .pause(500)
      .click('//*[@id="root"]/div/div/div[1]/div[2]/div[4]/button')
      .pause(25000);
  },
  "step three: logout": function(browser) {
    browser
      .useXpath()
      .pause(500)
      .click('//*[@id="root"]/div/div[1]/button');
  }
};
