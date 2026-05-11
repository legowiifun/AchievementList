import { platformList } from "./constants.js";

export class multiplePlatformSelectionBox {
    /**
     * @returns {string[]}
     */
    getValue() {
        let platforms=Array.from(this.platformSelect.selectedOptions).map((option)=> {
            if (option!="Other") {
                return option.innerText;
            }
        }).filter((option)=> {
            return option!="Other";
        });
        for (let i=0;i<this.platformTextInputCount.valueAsNumber;i++) {
            platforms[platforms.length]=this.platformList.childNodes[i].value;
        }
        return platforms
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
    /**
     * 
     * @param {function() onChangeFn }
     */
    constructor(onChangeFn=undefined) {
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
        let self = this;
        this.platformSelect.addEventListener('change', (event)=> {
            let flag=false;
            for (let i=0;i<self.platformSelect.selectedOptions.length&&!flag;i++) {
                if (self.platformSelect.selectedOptions.item(i).innerText=="Other") {
                    self.platformTextInputCount.hidden=false;
                    self.platformList.hidden=false;
                    flag=true;
                }
            }
            if (!flag) {
                self.platformTextInputCount.hidden=true;
                self.platformList.hidden=true;
            }
            if (onChangeFn) {
                onChangeFn();
            }
        });
        this.platformTextInputCount.addEventListener('change',function(event) {
            self.platformList.innerHTML="";
            for (let i=0;i<self.platformTextInputCount.value;i++) {
                let platformTextInput=document.createElement('input');
                platformTextInput.type="text";
                platformTextInput.id="addGameTextInput";
                platformTextInput.addEventListener('change', function() {
                    if (onChangeFn) {
                        onChangeFn();
                    }
                });
                self.platformList.appendChild(document.createElement('li').appendChild(platformTextInput));
            }
        });

        this.display = document.createElement('span');
        this.display.appendChild(this.platformSelect);
        this.display.appendChild(this.platformTextInputCount);
        this.display.appendChild(this.platformList);
    }
}