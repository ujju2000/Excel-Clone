let row = 100;
let col = 26;
let addressColCont = document.querySelector('.address-col-cont');
let addressRowCont = document.querySelector('.address-row-cont');
let cellCont = document.querySelector('.cells-cont');
let addressBar = document.querySelector('.address-bar');
for(let i =0;i<row;i++){
    let addressCol = document.createElement('div');
    addressCol.setAttribute('class','address-col');
    addressCol.innerText = i+1;
    addressColCont.appendChild(addressCol);
}


for(let i =0;i<col;i++){
    let addressRow = document.createElement('div');
    addressRow.setAttribute('class','address-row');
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRowCont.appendChild(addressRow);
}   

for(let i =0;i<row;i++){
    let rowCont = document.createElement('div');
    rowCont.setAttribute('class','row-cont');
    for(let j = 0;j<col ; j++){
        let cell = document.createElement('div');
        cell.setAttribute('class','cell');
        cell.setAttribute('contenteditable','true');
        cell.setAttribute('rid',i);
        cell.setAttribute('cid',j);
        cell.setAttribute('spellcheck',"false");
        addListenerForAddressBarDisplay(cell,i,j);
        rowCont.appendChild(cell);
    }
    cellCont.appendChild(rowCont);
}

function addListenerForAddressBarDisplay(cell,i,j){
    cell.addEventListener('click',(e) =>{
        let rowID = i +1;
        let colID = String.fromCharCode(65 + j);

        addressBar.value = `${colID}${rowID}`;
    })
}

// by default click on first cell 
let firstCell = document.querySelector('.cell');
firstCell.click();
 
