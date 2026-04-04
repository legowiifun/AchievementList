import { windowAPI } from "./APIThroughWindow.js";
import { gamesJSON, gamesJSONObj } from "./JSONObjects/gamesJSON.js";
import {gameJSON} from "./JSONObjects/gameJSON.js"
import {saveJSON, saveObject} from "./JSONObjects/saveJSON.js"
//export the APIs as internal functions
export function openDevTools() {
    window.electron.openDevTools();
}
/**
 * @returns {Promise<{canceled: boolean, filePath: string, bookmark: string}>}
 */
export async function fileSelection() {
    return window.resources.fileSelection();
}
/**
 * @param {string} name 
 * @returns {Promise<string>}
 */
export async function getJson(name) {
    return window.resources.getJson(name);
}
/**
 * @param {string} name 
 * @returns {Promise<string>}
 */
export async function getCompletePath(name) {
    return window.resources.getCompletePath(name);
}
/**
 * @param {string} name 
 * @param {string} content 
 * @returns {Promise<void>}
 */
export async function editJson(name, content) {
    return window.resources.editJson(name, content);
}
/**
 * @type {Promise}
 */
export let getPath = window.resources.getPath;
/**
 * 
 * @param {File} file 
 * @returns {string}
 */
export function getFilePath(file) {
    return window.resources.getFilePath(file);
}
/**
 * @param {string | gamesJSONObj[]} file
 * @return {boolean}
 */
export function validateGamesJSON(file) {
    let newFile = new gamesJSON();
    if (typeof file=='string') {
        try {
            newFile.file=JSON.parse(file);
        } catch (err) {
            return false;
        }
    } else {
        newFile.file=file;
    }
    //validate the JSON file
    if (!Array.isArray(newFile.file)) {
        return false;
    }
    for (let i=0;i<newFile.file.length;i++) {
        //check that each parameter is not undefined
        if (newFile.file[i].jsonName==undefined) {
            return false;
        }
        if (newFile.file[i].platform==undefined) {
            return false;
        }
        if (newFile.file[i].save==undefined) {
            return false;
        }
    }
    return true;
}
/**
 * @param {string | gameJSON} file
 * @return {boolean}
 */
export function validateGameJSON(file) {
    let newFile = new gameJSON();
    if (typeof file=='string') {
        try {
            newFile=JSON.parse(file);
        } catch (err) {
            return false;
        }
    } else {
        newFile=file;
    }
    //validate the JSON file
    if (newFile.platImg==undefined) {
        return false;
    }
    if (newFile.img==undefined) {
        return false;
    }
    if (newFile.name==undefined) {
        return false;
    }
    if (newFile.achievements==undefined) {
        return false;
    }
    if (!Array.isArray(newFile.achievements)) {
        return false;
    }
    for (let i=0;i<newFile.achievements.length;i++) {
        if (newFile.achievements[i].name==undefined) {
            return false;
        }
        if (newFile.achievements[i].image==undefined) {
            return false;
        }
        if (newFile.achievements[i].achievements==undefined) {
            return false;
        }
        if (!Array.isArray(newFile.achievements[i].achievements)) {
            return false;
        }
        for (let j=0;j<newFile.achievements[i].achievements.length;j++) {
            if (newFile.achievements[i].achievements[j].description==undefined) {
                return false;
            }
            if (newFile.achievements[i].achievements[j].img==undefined) {
                return false;
            }
            if (newFile.achievements[i].achievements[j].name==undefined) {
                return false;
            }
        }
    }
    return true;
}
/**
 * @param {string | saveObject[][]} file
 * @return {boolean}
 */
export function validateSaveJSON(file) {
    let newFile = new saveJSON();
    if (typeof file=='string') {
        try {
            newFile.file=JSON.parse(file);
        } catch (err) {
            return false;
        }
    } else {
        newFile.file=file;
    }
    if (!Array.isArray(newFile.file)) {
        return false;
    }
    for (let i=0;i<newFile.file.length;i++) {
        if (newFile.file[i]==undefined) {
            return false;
        }
        if (!Array.isArray(newFile.file[i])) {
            return false;
        }
        for (let j=0;j<newFile.file[i].length;j++) {
            if (newFile.file[i][j].obtained==undefined) {
                return false;
            }
            if (newFile.file[i][j].obtainedDate==undefined) {
                return false;
            }
        }
    }
    return true;
}
/**
 * 
 * @param {string} file 
 * @returns {string}
 */
export function getPathFromResources(file) {
    let path = file;
    let idx=path.lastIndexOf("\\resources\\")+11;
    if (idx!=-1) {
        path=path.substring(idx);
        if (windowAPI.viewConsoleLogs) {
            console.log(path);
        }
    }
    return path;
}

/**
 * @param {Date} date 
 * @returns {string}
 */
export function convertDate(date, format=0) {
    //A universal function to create a date string in different formats
    //for now: 
    // 0=mm/dd/yy
    // 1=mm/dd/yyyy hh:mm AM/PM
    // 2=mm/dd/yyyy hh:mm 24-hr time
    // 3=dd/mm/yy
    // 4=dd/mm/yyyy hh:mm AM/PM
    // 5=dd/mm/yyyy hh:mm 24-hr time

    switch (format) {
        case 0:{
            //mm/dd/yy
            let dateStr="";
            let mon=date.getMonth();
            mon+=1;
            if (mon<10) {
                dateStr+="0";
            }
            dateStr+=mon;
            dateStr+="/";
            let day=date.getDate();
            if (day<10) {
                dateStr+="0";
            }
            dateStr+=day;
            dateStr+="/";
            let year=date.getFullYear();
            year=year.toString().slice(-2);
            dateStr+=year;
            return dateStr;
            break;
        }
        case 1:{
            //mm/dd/yyyy hh:mm AM/PM
            let dateStr="";
            let mon=date.getMonth();
            mon+=1;
            if (mon<10) {
                dateStr+="0";
            }
            dateStr+=mon;
            dateStr+="/";
            let day=date.getDate();
            if (day<10) {
                dateStr+="0";
            }
            dateStr+=day;
            dateStr+="/";
            let year=date.getFullYear();
            dateStr+=year;
            dateStr+=" ";
            let hrs=date.getHours();
            let hrs2=hrs;
            //AM/PM conversion
            if (hrs>12) {
                hrs2=hrs-12;
            }
            if (hrs2<10){
                dateStr+="0";
            }
            dateStr+=hrs2;
            dateStr+=":";
            let min=date.getMinutes();
            if (min<10) {
                dateStr+="0";
            }
            dateStr+=min;
            dateStr+=" ";
            //AM/PM
            //PM
            if (hrs>=12&&hrs!=24) {
                dateStr+="PM";
            } else {
                dateStr+="AM";
            }
            return dateStr;
            break;
        }
        case 2:{
            //mm/dd/yyyy hh:mm 24-hr time
            let dateStr="";
            let mon=date.getMonth();
            mon+=1;
            if (mon<10) {
                dateStr+="0";
            }
            dateStr+=mon;
            dateStr+="/";
            let day=date.getDate();
            if (day<10) {
                dateStr+="0";
            }
            dateStr+=day;
            dateStr+="/";
            let year=date.getFullYear();
            dateStr+=year;
            dateStr+=" ";
            let hrs=dateStr.getHours();
            if (hrs<10) {
                dateStr+="0";
            }
            dateStr+=hrs;
            dateStr+=":";
            let min=date.getMinutes();
            if (min<10) {
                dateStr+="0";
            }
            dateStr+=min;
            return dateStr;
            break;
        }
        case 3:{
            //dd/mm/yy
            let dateStr="";
            let day=date.getDate();
            if (day<10) {
                dateStr+="0";
            }
            dateStr+=day;
            dateStr+="/";
            let mon=date.getMonth();
            mon+=1;
            if (mon<10) {
                dateStr+="0";
            }
            dateStr+=mon;
            dateStr+="/";
            let year=date.getFullYear();
            year=year.toString().slice(-2);
            dateStr+=year;
            return dateStr;
            break;
        }
        case 4:{
            //dd/mm/yyyy hh:mm AM/PM
            let dateStr="";
            let day=date.getDate();
            if (day<10) {
                dateStr+="0";
            }
            dateStr+=day;
            dateStr+="/";
            let mon=date.getMonth();
            mon+=1;
            if (mon<10) {
                dateStr+="0";
            }
            dateStr+=mon;
            dateStr+="/";
            let year=date.getFullYear();
            dateStr+=year;
            dateStr+=" ";
            let hrs=date.getHours();
            let hrs2=hrs;
            //AM/PM conversion
            if (hrs>12) {
                hrs2=hrs-12;
            }
            if (hrs2<10){
                dateStr+="0";
            }
            dateStr+=hrs2;
            dateStr+=":";
            let min=date.getMinutes();
            if (min<10) {
                dateStr+="0";
            }
            dateStr+=min;
            dateStr+=" ";
            //AM/PM
            //PM
            if (hrs>=12&&hrs!=24) {
                dateStr+="PM";
            } else {
                dateStr+="AM";
            }
            return dateStr;
            break;
        }
        case 5:{
            //dd/mm/yyyy hh:mm 24-hr time
            let dateStr="";
            let day=date.getDate();
            if (day<10) {
                dateStr+="0";
            }
            dateStr+=day;
            dateStr+="/";
            let mon=date.getMonth();
            mon+=1;
            if (mon<10) {
                dateStr+="0";
            }
            dateStr+=mon;
            dateStr+="/";
            let year=date.getFullYear();
            dateStr+=year;
            dateStr+=" ";
            let hrs=dateStr.getHours();
            if (hrs<10) {
                dateStr+="0";
            }
            dateStr+=hrs;
            dateStr+=":";
            let min=date.getMinutes();
            if (min<10) {
                dateStr+="0";
            }
            dateStr+=min;
            return dateStr;
            break;
        }
    }
}