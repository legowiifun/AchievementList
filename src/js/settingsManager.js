class Settings {
    /**
     * 0=mm/dd/yy
     * 1=mm/dd/yyyy hh:mm AM/PM
     * 2=mm/dd/yyyy hh:mm 24-hr time
     * 3=dd/mm/yy
     * 4=dd/mm/yyyy hh:mm AM/PM
     * 5=dd/mm/yyyy hh:mm 24-hr time
     * @type {int}
     */
    dateType;

    /**
     * @type {string}
     */
    defaultStorageLocation;

    /**
     * @type {boolean}
     */
    showDevToolsBtn;

    /**
     * @type {boolean}
     */
    printConsoleLogs;

    constructor() {
        this.dateType=0;
        this.defaultStorageLocation="saves";
        this.showDevToolsBtn=false;
        this.printConsoleLogs=false;
    }
}
/**
 * @type {Settings}
 */
export let settings=undefined;
export function saveSettings() {
    localStorage.setItem("Settings",JSON.stringify(settings));
}
export function createSettings() {
    let item = localStorage.getItem("Settings");
    try {
        json = JSON.parse(item);
        if (json==null) {
            settings=new Settings();
            saveSettings();
            return settings;
        } else {
            settings=json;
            return settings;
        }
    } catch {
        console.log("Settings Parse failure");
        settings=new Settings();
        saveSettings();
        return settings;
    }
}