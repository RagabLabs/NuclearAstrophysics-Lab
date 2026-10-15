import {defineConfig,devices,chromium} from '@playwright/test';
import {existsSync} from 'node:fs';
const available=existsSync(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||chromium.executablePath());
export default defineConfig({
 testDir:'./tests/browser',timeout:30000,fullyParallel:false,
 reporter:[['list'],['json',{outputFile:'reports/playwright.json'}]],
 use:{baseURL:'http://127.0.0.1:4173/NuclearAstrophysics-Lab/',headless:true,launchOptions:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{}},
 projects:[{name:'desktop',use:{...devices['Desktop Chrome']}},{name:'mobile',use:{...devices['Pixel 7'],defaultBrowserType:'chromium'}}],
 webServer:available?{command:'npm run preview -- --port 4173',url:'http://127.0.0.1:4173/NuclearAstrophysics-Lab/',reuseExistingServer:!process.env.CI}:undefined,
});
