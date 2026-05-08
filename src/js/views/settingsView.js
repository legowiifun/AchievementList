import { windowAPI } from '../APIThroughWindow.js';
import { settings, saveSettings } from '../settingsManager.js';
export class SettingsView {
    constructor() {
        let testP = document.createElement('p');
        testP.innerText="TEST";
        windowAPI.mainContent.appendChild(testP);
    }
}