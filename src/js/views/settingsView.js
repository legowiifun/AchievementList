import { windowAPI } from '../APIThroughWindow.js';
import { settings, saveSettings, setReloadFlag } from '../settingsManager.js';
import { getFilePath, getPathFromResources } from '../utils.js';

export class SettingsView {
    constructor() {
        //date type
        let dateType = document.createElement('select');
        let types=["mm/dd/yy","mm/dd/yyyy hh:mm AM/PM","mm/dd/yyyy hh:mm 24-hr time","dd/mm/yy","dd/mm/yyyy hh:mm AM/PM","dd/mm/yyyy hh:mm 24-hr time"];
        for (let i=0;i<types.length;i++) {
            let opt = document.createElement('option');
            opt.value=i;
            opt.innerText=types[i];
            dateType.appendChild(opt);
        }
        dateType.value=settings.dateType;
        dateType.addEventListener('change',()=> {
            settings.dateType=Number(dateType.value);
            saveSettings();
        });
        windowAPI.mainContent.appendChild(dateType);

        //default storage location
        let storageLocationParagraph=document.createElement('p');
        storageLocationParagraph.innerText="Default storage location (when using the add games button): ";
        let storageLocationInput = document.createElement('input');
        storageLocationInput.value=settings.defaultStorageLocation;
        storageLocationInput.addEventListener('change',()=> {
            settings.defaultStorageLocation=storageLocationInput.value;
            saveSettings();
        });
        storageLocationParagraph.appendChild(storageLocationInput);
        windowAPI.mainContent.appendChild(storageLocationParagraph);

        //print console logs
        //before devTools, as I need a reference to it to hide it
        let printConsoleLogsParagraph = document.createElement('p');
        printConsoleLogsParagraph.innerText="Do you want console logs to be printed to the command line. There are a lot of these, but they are useful for debugging.";
        let printConsoleLogsInput = document.createElement('input');
        printConsoleLogsInput.type='checkbox';
        printConsoleLogsInput.checked=settings.printConsoleLogs;
        printConsoleLogsInput.addEventListener('change',()=> {
            settings.printConsoleLogs=printConsoleLogsInput.checked;
            saveSettings();
        });
        printConsoleLogsParagraph.appendChild(printConsoleLogsInput);
        printConsoleLogsParagraph.hidden=!settings.showDevToolsBtn;

        //show dev tools
        let showDevToolsParagraph = document.createElement('p');
        showDevToolsParagraph.innerText="Do you want a button to show the developer toolbar? (This provides a lot of advanced functionality. Do not do this unless you know JavaScript. Bugs caused by messing with this will not be fixed.)";
        let showDevToolsInput = document.createElement('input');
        showDevToolsInput.type='checkbox';
        showDevToolsInput.checked=settings.showDevToolsBtn;
        showDevToolsInput.addEventListener('change',()=> {
            settings.showDevToolsBtn=showDevToolsInput.checked;
            saveSettings();
            let devBtn=document.getElementById("developerBtn");
            devBtn.hidden=!showDevToolsInput.checked;
            printConsoleLogsParagraph.hidden=!showDevToolsInput.checked;
        });
        showDevToolsParagraph.appendChild(showDevToolsInput);
        windowAPI.mainContent.appendChild(showDevToolsParagraph);
        windowAPI.mainContent.appendChild(printConsoleLogsParagraph);

        //set games.json storage location
        let gamesJSONStorageParagraph = document.createElement('p');
        gamesJSONStorageParagraph.innerText = "Where do you want to store your games? (currently "+settings.gamesJSONFile+").";
        let gamesJSONStorageInput=document.createElement('input');
        gamesJSONStorageInput.name="gamesJSON";
        gamesJSONStorageInput.type="file";
        gamesJSONStorageInput.accept=".json";
        gamesJSONStorageInput.id="gamesJSONStorageInput";
        gamesJSONStorageInput.addEventListener('change', function(event) {
            let file=event.target.files[0];
            if (file!=undefined) {
                //get the file down to just the contents
                settings.gamesJSONFile=getPathFromResources(getFilePath(file));
                console.log(settings.gamesJSONFile);
                saveSettings();
            } else {
                settings.gamesJSONFile=undefined;
            }
            setReloadFlag(true);
        });
        gamesJSONStorageParagraph.appendChild(gamesJSONStorageInput);
        windowAPI.mainContent.appendChild(gamesJSONStorageParagraph);
    }
}