//export the APIs as internal functions

export async function getJson(name) {
    return window.resources.getJson(name);
}
export async function getCompletePath(name) {
    return window.resources.getCompletePath(name);
}
export async function editJson(name, content) {
    return window.resources.editJson(name, content);
}

/**
 * @param {Date} date 
 * @returns {string}
 */
export function convertDate(date) {
    //A universal function to create a date string in different formats
    //for now: 
    // 0=mm/dd/yy
    // 1=mm/dd/yyyy hh:mm AM/PM
    // 2=mm/dd/yyyy hh:mm 24-hr time
    // 3=dd/mm/yy
    // 4=dd/mm/yyyy hh:mm AM/PM
    // 5=dd/mm/yyyy hh:mm 24-hr time
    let format=0;

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