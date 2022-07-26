// storage 
let sheetDB = [];

for(let i =0;i<row;i++){
    let sheetRow = []; //isme particular row me alag alag daa rhega 
    for(let i =0;i<col;i++){
        let cellProp = {
            // these all are default value 
            bold : false,
            italic : false,
            underline : false,
            alignment :"left",
            fontFamily : "monospace",

            fontSize : "14",
            fontColor : "#000000",
            BGColor : "#000000",
            left : false,
            right : false,
            center : false,
            justify : false,
            value : ""
        };

        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}

// selectors for cell properties 
let bold = document.querySelector('.bold');
let italic = document.querySelector('.italic');
let underline = document.querySelector('.underline');

let fontSize = document.querySelector('.font-size-prop');
let fontFamily = document.querySelector('.font-family-prop');
let fontColor = document.querySelector('.font-color-prop');
let BGColor = document.querySelector('.BG-color-prop');
let alignment = document.querySelectorAll('.alignment');
 
let left = document.querySelector('.left'); 
let right = document.querySelector('.right');
let  center = document.querySelector('.center');
let justify = document.querySelector('.justify');
let activeColorProp = "#9ea3a7"
let inactiveColorProp = "#bdc3c7";

alignment.forEach((align) =>{
    align.addEventListener('click' ,(e) =>{
        let address = addressBar.value;
        let [cell,cellProp] = activeCell(address);

        let alignValue = e.target.classList[1];
        if(alignValue == "justify") {
            cell.style.display = "flex";
            cell.style.justifyContent = "center"
            cell.style.alignItems = "center";
        }
        cellProp.alignment = alignValue;
        cell.style.textAlign = cellProp.alignment;


        switch(alignValue) {
            case "left" :
                left.style.backgroundColor = activeColorProp;
                right.style.backgroundColor = inactiveColorProp;
                center.style.backgroundColor = inactiveColorProp;
                justify.style.backgroundColor = inactiveColorProp;
                break;
                case "right" : 
                left.style.backgroundColor = inactiveColorProp;
                right.style.backgroundColor = activeColorProp;
                center.style.backgroundColor = inactiveColorProp;
                justify.style.backgroundColor = inactiveColorProp;
                    break;
                case "center" :
                left.style.backgroundColor = inactiveColorProp;
                right.style.backgroundColor = inactiveColorProp;
                center.style.backgroundColor = activeColorProp;
                justify.style.backgroundColor = inactiveColorProp;
                break;
                case "justify" :
                left.style.backgroundColor = inactiveColorProp;
                right.style.backgroundColor = inactiveColorProp;
                center.style.backgroundColor = inactiveColorProp;
                justify.style.backgroundColor = activeColorProp;
                break;
        }
    })

})
fontFamily.addEventListener('change' , (e) => {
    let val = addressBar.value;
    let [cell,cellProp] = activeCell(val);

    cellProp.fontFamily = fontFamily.value; // db change 
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})

fontSize.addEventListener('change' , (e) => {
    let val = addressBar.value;
    let [cell,cellProp] = activeCell(val);

    cellProp.fontSize = fontSize.value; // db change 
    cell.style.fontSize = fontSize.value +"px";
    fontSize.value = cellProp.fontSize;
    
})

BGColor.addEventListener('change' , (e) =>{
    let val = addressBar.value;
    let [cell,cellProp] = activeCell(val);

    cellProp.BGColor = BGColor.value; // db change 
    cell.style.backgroundColor = BGColor.value;
    BGColor.value = cellProp.BGColor;  
})

fontColor.addEventListener('change' , (e) => {
    let val = addressBar.value;
    let [cell,cellProp] = activeCell(val);

    cellProp.fontColor = fontColor.value; // db change 
    cell.style.color = fontColor.value;
    fontColor.value = cellProp.fontColor;
})

underline.addEventListener('click', (e) =>{
    // access active cell -> addressPath -> decode 
    let val = addressBar.value;
    let [cell,cellProp] = activeCell(val);
    
    // toggle button 

    cellProp.underline = !cellProp.underline; // DB Change 
    // modfication 
    cell.style.textDecoration = cellProp.underline  ? "underline" : "none"; // UI change(1)
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;  // UI Change (2)
})


italic.addEventListener('click', (e) =>{
    // access active cell -> addressPath -> decode 
    let val = addressBar.value;
    let [cell,cellProp] = activeCell(val);
    
    // toggle button 

    cellProp.italic = !cellProp.italic; // DB Change 
    // modfication 
    cell.style.fontStyle = cellProp.italic  ? "italic" : "normal"; // UI change(1)
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;  // UI Change (2)
})


bold.addEventListener('click', (e) =>{
    // access active cell -> addressPath -> decode 
    let val = addressBar.value;
    let [cell,cellProp] = activeCell(val);
    
    // toggle button 

    cellProp.bold = !cellProp.bold; // DB Change 
    // modfication 
    cell.style.fontWeight = cellProp.bold  ? "bold" : "normal"; // UI change(1)
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;  // UI Change (2)
})

function activeCell(address) {
    let [rid,cid] = decodeAddress(address);
    let cell = document.querySelector(`.cell[rid = "${rid}"][cid ="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell,cellProp];
}
function decodeAddress(address) {
    let rid = Number(address.slice(1) -1);
    let cid = Number(address.charCodeAt(0)) - 65;
    return [rid,cid];
}

let allCells = document.querySelectorAll('.cell');
for(let i =0;i < allCells.length;i++){
    
    setToDefault(allCells[i]);
}   
function setToDefault(cell){
    cell.addEventListener('click' , (e) => {
        let address = addressBar.value;
        let [rid,cid] = decodeAddress(address);
        let cellProp = sheetDB[rid][cid];
        console.log(sheetDB[rid][cid]);
        cell.style.fontWeight = cellProp.bold  ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic  ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline  ? "underline" : "none";
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor === "#000000" ? "transparent" : cellProp.BGcolor;
        cell.style.fontSize = fontSize.value +"px";
        cell.style.textAlign = cellProp.alignment;
        cell.style.fontFamily = cellProp.fontFamily;


        // apply properties to ui container 
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontColor.value = cellProp.fontColor;
        BGColor.value = cellProp.BGColor; 
        fontFamily.value = cellProp.fontFamily;
        fontSize.value = cellProp.fontSize;
        switch(cellProp.alignment) {
            case "left" :
                left.style.backgroundColor = activeColorProp;
                right.style.backgroundColor = inactiveColorProp;
                center.style.backgroundColor = inactiveColorProp;
                justify.style.backgroundColor = inactiveColorProp;
                break;
                case "right" : 
                left.style.backgroundColor = inactiveColorProp;
                right.style.backgroundColor = activeColorProp;
                center.style.backgroundColor = inactiveColorProp;
                justify.style.backgroundColor = inactiveColorProp;
                    break;
                case "center" :
                left.style.backgroundColor = inactiveColorProp;
                right.style.backgroundColor = inactiveColorProp;
                center.style.backgroundColor = activeColorProp;
                justify.style.backgroundColor = inactiveColorProp;
                break;
                case "justify" :
                left.style.backgroundColor = inactiveColorProp;
                right.style.backgroundColor = inactiveColorProp;
                center.style.backgroundColor = inactiveColorProp;
                justify.style.backgroundColor = activeColorProp;
                break;
        }
    })
}