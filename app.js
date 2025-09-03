let input = document.getElementById('input-box');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

// Handle button clicks
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        let btnValue = e.target.innerHTML;
        handleInput(btnValue);
    });
});

// Handle both button + keyboard input
function handleInput(btnValue) {
    if (btnValue == '=') {
        calculate();
    }
    else if (btnValue == 'AC') {
        string = "";
        input.value = string;
    }
    else if (btnValue == 'DEL') {
        string = string.substring(0, string.length - 1);
        input.value = string;
    }
    else {
        string += btnValue;
        input.value = string;
    }
}

// Perform calculation
function calculate() {
    try {
        let expression = string
            .replace(/π/g, "Math.PI")                   // Replace pi
            .replace(/√\(([^)]+)\)/g, "Math.sqrt($1)")  // √(9) → Math.sqrt(9)
            .replace(/√(\d+(\.\d+)?)/g, "Math.sqrt($1)")// √9 → Math.sqrt(9)
            .replace(/\^/g, "**");                      // Replace power (^ → **)

        console.log("Evaluating:", expression);

        let result = eval(expression);
        input.value = result;
        string = result.toString();
    }
    catch {
        input.value = 'Error';
        string = "";
    }
}

// Keyboard support
document.addEventListener("keydown", (e) => {
    let key = e.key;

    if (!isNaN(key) || ["+", "-", "*", "/", ".", "(", ")"].includes(key)) {
        string += key;
        input.value = string;
    }
    else if (key === "Enter") {
        calculate();
    }
    else if (key === "Backspace") {
        string = string.substring(0, string.length - 1);
        input.value = string;
    }
    else if (key.toLowerCase() === "c") { // Press C to clear
        string = "";
        input.value = "";
    }
    else if (key.toLowerCase() === "p") { // Shortcut for π
        string += "π";
        input.value = string;
    }
    else if (key.toLowerCase() === "r") { // Shortcut for √
        string += "√";
        input.value = string;
    }
});
