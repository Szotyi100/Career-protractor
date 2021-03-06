'use strict';

const GLOBAL_TIMEOUT = 40e3;
const os = require('os');
const path = require('path');
const requireIt = require('require-it');

exports.config = {
    specs: 'features/**/*.feature',
    capabilities: {
        browserName: 'chrome'
    },
    directConnect: true,
    cucumberOpts: {
        require: ['./step_definitions/**/*.js'],
        tags: ['~@wip'],
        format: ['pretty', 'json:cucumber.json']
    },
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    chromeDriver: path.join(requireIt.directory('protractor'), 'node_modules', 'webdriver-manager', 'selenium', 'chromedriver_2.37' + (os.platform() === 'win32' ? '.exe' : '')),
    onPrepare: function () {
        global.GLOBAL_TIMEOUT = GLOBAL_TIMEOUT;
        global.ec = protractor.ExpectedConditions;

        const chai = require('chai');
        chai.use(require('chai-as-promised'));
        global.expect = chai.expect;

        browser.waitForAngularEnabled(false);
        return browser.manage().window().maximize().catch(() => {
            return browser.manage().window().setSize(1800, 1012);
        });
    }
};