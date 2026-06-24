import { Calculator_button_color } from "./constant.js";
console.log(Calculator_button_color);
let number1 = 0
let number2 = 0
let result = 0

let expression = ""

let is_operand = false;
let is_point = false;

const nodelist = document.querySelectorAll(".btns");
const nodelist2 = document.querySelectorAll(".pink-buttons");
const nodelistfornumbers = document.querySelectorAll(".number_buttons");
const pointbutton = document.querySelector(".point_button");
const mathbuttons = document.querySelectorAll(".maths-buttons");

const AC_button = document.querySelector(".function-AC");
const back_button = document.querySelector(".function-back");
const Equal_button = document.querySelector(".function-equal");

for (let i = 0; i < nodelist.length; i++) {
    nodelist[i].style.backgroundImage = Calculator_button_color.normal_buttons;
}

for (let i = 0; i < nodelist2.length; i++) {
    nodelist2[i].style.backgroundImage = Calculator_button_color.pink_buttons;
}

for (let i = 0; i < nodelistfornumbers.length; i++) {
    nodelistfornumbers[i].addEventListener("click",get_number);
}
for (let i = 0; i < mathbuttons.length; i++) {
    mathbuttons[i].addEventListener("click",math_operation);
}
 console.log(nodelistfornumbers);

pointbutton.addEventListener("click",number_point);

AC_button.addEventListener("click",clear_operation);
back_button.addEventListener("click",backspace);
Equal_button.addEventListener("click",perform);

//           INPUT FUNCTIONS 

function get_number(event_element) {
    expression = expression + event_element.target.innerHTML;
    Update_Expression();
    is_operand = false;
}

function number_point(point_button_element) {
    if (!is_operand) {
        expression = expression + point_button_element.target.innerHTML;
        Update_Expression();
        is_operand = true;
    }
}

function math_operation(maths_button) {
    if (!is_operand) {
        expression = expression + maths_button.target.innerHTML;
        Update_Expression();
        number1 = Number(document.getElementById("user_input").value)

        is_operand = true;
    }
}


//         Update Operation

function Update_Expression() {
    document.getElementById("user_input").value = expression;
}
//     CLEAR OPERATION DONE
function clear_operation() {
    expression = "";
    is_operand = true;
    Update_Expression();
}


//             PERFORM OPERATION 



function perform() {


    let arr = [];
    if (expression[0] == "-") {
        arr.push("-");
        expression = expression.slice(1);
    }
    else if (is_operand_function(expression[0]) || is_operand_function(expression[expression.length - 1])) {
        alert("please enter a valid opertion to perform");
        return;
    }
    number1 = 0;
    result = 0;
    let already_operand = false;
    for (let i = 0; i < expression.length; i++) {

        if (!isNaN(expression[i])) {
            arr.push(expression[i]);
            already_operand = false;
        }
        else if (expression[i] == ".") {
            arr.push(expression[i]);
            already_operand = true;
        }
        else if (!already_operand && is_operand_function(expression[i])) {
            arr.push(expression[i]);
            already_operand = true;
        }
        else {
            alert("please enter a valid opertion to perform");
            return;
        }

    }
    arr.push("+");
    console.log(arr);


    let stack = [];
    let operator = "+";

    for (let i = 0; i <= arr.length; i++) {

        if (!isNaN(arr[i])) {
            let j = i;
            while (!isNaN(arr[j]) && j < arr.length) {
                number1 = number1 * 10 + Number(arr[j]);
                j++;
            }
            i = j - 1;
        }
        else if (arr[i] == ".") {
            let j = i + 1;
            while (!isNaN(arr[j]) && j < arr.length) {
                number2 = number2 * 10 + Number(arr[j]);
                j++;
            }
            number1 = number1 + "." + number2;
            number1 = Number(number1);
            i = j - 1;
        }

        else {

            if (operator === "+") {
                stack.push(number1);
                // console.log(`the stack in +  at iteration: ${i+1}`);
                // console.log(stack);
                // console.log(`the operator in +  at iteration: ${i+1}`);
                // console.log(operator);


            }
            else if (operator === "-") {
                stack.push(-number1);

            }

            else if (operator === "×") {
                stack.push(stack.pop() * number1);

            }
            else if (operator === "÷") {
                stack.push(stack.pop() / number1);

            }
            operator = arr[i];

            number1 = 0;
        }
    }
    stack.push(number1);
    console.log(stack)
    for (let i = 0; i < stack.length; i++) {
        result = result + stack[i];
    }

    document.getElementById("user_input").value = result;

}


//          Backspace function   // done

function backspace() {

    expression = expression.slice(0, -1);
    Update_Expression();

    let last_char = expression.slice(-1);

    if (is_operand_function(last_char)) {
        is_operand = true;
    }
}

//          CHECCK OPERAND FUNCTION

function is_operand_function(character) {

    if (character == "+" || character == "-" || character == "×" || character == "÷") {
        return true;
    }
    return false;
}


