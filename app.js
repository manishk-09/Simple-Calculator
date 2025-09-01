let input = document.getElementById('input-box');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click',(e) => {
        let btnValue = e.target.innerHTML;
        if(btnValue == '='){
          try {
                // Replace special symbols before evaluating
                let expression = string
                    .replace(/π/g, "Math.PI")       // Replace pi
                    .replace(/√/g, "Math.sqrt")     // Replace square root
                    .replace(/\^/g, "**");          // Replace power

                console.log("Evaluating:", expression); // 👈 Debug line    

                let result = eval(expression);  // Evaluate safely
                input.value = result;
                string = result.toString();
            }
            catch {
                input.value = 'Error';
                string = "";
            }

        }
        else if(btnValue == 'AC'){
            string="";
            input.value = string;
        }
        else if(btnValue == 'DEL'){
            string = string.substring(0,string.length-1);
            input.value = string;
        }
        else{
            string += btnValue;
            input.value = string;
        }
    })
})
