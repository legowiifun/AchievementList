export function table(imgs, width, height) {
    let t = document.getElementById("table");
    let s="";
    for (let i=0;i<width;i++) {
        s+="<tr>";
        for (let j=0;j<height;j++) {
            s+="<td>";
            s+="table: i="+i+" j="+j+".";
            s+="</td>";
        }
        s+="</tr>";
    }
    console.log(s);
    t.innerHTML=s;
}

if (typeof window!=undefined) {
    window.table=table;
}