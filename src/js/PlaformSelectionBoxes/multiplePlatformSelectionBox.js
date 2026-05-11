import { platformList } from "./constants.js";

class multiplePlatformSelectionBox {
    /**
     * @returns {string[]}
     */
    getValue() {
        let platforms=Array.from(this.platformSelect.selectedOptions).map((option)=> {
            if (option!="Other") {
                return option.innerText;
            }
        });
        for (let i=0;i<this.platformTextInputCount.valueAsNumber;i++) {
            platforms[platforms.length]=this.platformList.childNodes[i].value;
        }
    }
    /**
     * @param {string[]} value 
     */
    setValue(value) {
        let platformsArr=[];
        for (let i=0;i<value.length;i++) {
            //if the value is in the platform list
            if (platformList.find((value2)=> {
                return value2==value[i];
            })) {
                for (let j=0;j<this.platformSelect.children.length;j++) {
                    if (this.platformSelect.children.item(j).value==value[i]) {
                        this.platformSelect.children.item(j).selected=true;
                    }
                }
            } else {
                platformsArr.push(value[i]);
            }
        }
        
        //if there are other platforms
        if (platformsArr.length!=0) {
            this.platformSelect.lastChild.selected=true;
            this.platformSelect.dispatchEvent(new Event('change'));
            this.platformTextInputCount=platformsArr.length;
            this.platformTextInputCount.dispatchEvent(new Event('change'));
            for (let i=0;i<platformsArr.length;i++) {
                this.platformList.children[i].children[0].value=platformsArr[i];
            }
        }
    }
    display;
    platformSelect;
    platformTextInputCount;
    platformList;
    constructor() {
        this.platformSelect=document.createElement('select');
        this.platformSelect.multiple=true;
        for (let i=0;i<platformList.length;i++) {
            let optionSelect = document.createElement('option');
            optionSelect.value=platformList[i];
            optionSelect.innerText=platformList[i];
            this.platformSelect.appendChild(optionSelect);
        }
        this.platformSelect.size=1;

        this.platformList = document.createElement('span');
        this.platformList.hidden=true;
        this.platformTextInputCount = document.createElement('input');
        this.platformTextInputCount.type="number";
        this.platformTextInputCount.id="platformCountTextInput";
        this.platformTextInputCount.hidden=true;
        this.platformSelect.addEventListener('change', function(event) {
            let flag=false;
            for (let i=0;i<this.platformSelect.selectedOptions.length&&!flag;i++) {
                if (this.platformSelect.selectedOptions.item(i).innerText=="Other") {
                    this.platformTextInputCount.hidden=false;
                    this.platformList.hidden=false;
                    flag=true;
                }
            }
            if (!flag) {
                this.platformTextInputCount.hidden=true;
                this.platformList.hidden=true;
            }
            self.platforms=Array.from(this.platformSelect.selectedOptions).map((option)=> {
                if (option!="Other") {
                    return option.innerText;
                }
            });
        });
        platformTextInputCount.addEventListener('change',function(event) {
            platformList.innerHTML="";
            for (let i=0;i<platformTextInputCount.value;i++) {
                let platformTextInput=document.createElement('input');
                platformTextInput.type="text";
                platformTextInput.id="addGameTextInput";
                platformTextInput.addEventListener('change', function() {
                    self.platforms[i+this.platformSelect.selectedOptions.length]=platformTextInput.value;
                });
                platformList.appendChild(document.createElement('li').appendChild(platformTextInput));
            }
        });

        this.display = document.createElement('span');
        this.display.appendChild(this.platformSelect);
        this.display.appendChild(this.platformTextInputCount);
        this.display.appendChild(this.platformList);
    }
}