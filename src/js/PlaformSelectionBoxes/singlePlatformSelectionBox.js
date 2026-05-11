import { platformList } from "./constants.js";

export class singlePlatformSelectionBox {
    /**
     * @returns {string}
     */
    getValue() {
        let platform=this.platformSelect.value;
        if (platform=="Other") {
            platform=this.platformTextInput.value;
        }
        return platform;
    }
    /**
     * @param {string} value 
     */
    setValue(value) {
        if (platformList.find((val2)=>{
            return value==val2;
        })==undefined) {
            this.platformSelect.value="Other";
            this.platformTextInput.value=value;
        } else {
            this.platformSelect.value=value;
        }
    }
    display;
    platformSelect;
    platformTextInput;
    constructor(onChangeFn=undefined) {
        this.platformSelect=document.createElement('select');
        for (let i=0;i<platformList.length;i++) {
            let optionSelect = document.createElement('option');
            optionSelect.value=platformList[i];
            optionSelect.innerText=platformList[i];
            this.platformSelect.appendChild(optionSelect);
        }

        this.platformTextInput=document.createElement('input');
        this.platformTextInput.type="text";
        this.platformTextInput.id="platformSelectTextInput";
        this.platformTextInput.hidden=true;
        let self = this;
        this.platformSelect.addEventListener('change', function(event) {
            if (self.platformSelect.value=="Other") {
                self.platformTextInput.hidden=false;
            } else {
                self.platformTextInput.hidden=true;
            }
            if (onChangeFn) {
                onChangeFn();
            }
        });
        self.platformTextInput.addEventListener('change', function(event) {
            if (onChangeFn) {
                onChangeFn();
            }
        });
        
        this.display = document.createElement('span');
        this.display.appendChild(this.platformSelect);
        this.display.appendChild(this.platformTextInput);
    }
}