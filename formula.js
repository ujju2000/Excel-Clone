for(let i =0;i<row;i++){
    for(let j =0;j<col;j++){
        let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`);
        cell.addEventListener('blur', (e) => {
            // blur -> when value likh ke hum dusre cell pe focus krte hao tb chalta hai 
            let address = addressBar.value;
            let [activeCell,cellProp] = activeCell(address);
            let enteredData = activeCell.innerText;

            cellProp.value = enteredData;
        })
    }
}

let formulaBar = document.querySelector('.formula-bar');
formulaBar.addEventListener('keydown' , (e) =>{
    let inputFormula = formulaBar.value;
    if(e.key ==  "Enter" && inputFormula) {
        let evaluatedValu = evaluateFormula(inputFormula);
    }
})

function evaluateFormula(formula){
    return eval(formula);
}
