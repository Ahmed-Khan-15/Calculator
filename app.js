// Okay good, for your next task: 

// Every time the user clicks the = button, the full equation 
// (e.g., 5 + 3 = 8) must be instantly added to a dynamic list, 
// add a history button on your screen for and list previous results 
// there. Users should also be able to delete individual history items.

// Use: document.createElement, appendChild, remove
import { Calculator_button_color } from "./constant.js";
console.log(Calculator_button_color);
let number1 = 0;
let number2 = 0;
let result = 0;
let historylist = [];
let expression = "";

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
const History_button = document.querySelector(".function-H");
const history_container = document.querySelector(".history_container");
const go_back = document.querySelector(".go_back");
const clear_all = document.querySelector(".clear_all");
const all_history_container = document.querySelector(".all_history_container");
// const material_symbols_outlined = document.querySelectorAll(".material-symbols-outlined");

// for (let i = 0; i < material_symbols_outlined.length; i++) {
//     material_symbols_outlined[i].addEventListener("click",clear_this_history);
// }
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
History_button.addEventListener("click",show_history);
go_back.addEventListener("click", dont_show_history);
clear_all.addEventListener("click",clear_history_list);

//              CLEAR HISTORY FUNCTION



function clear_history_list(){
    historylist = [];
    render_history_list()
}
function render_history_list(){

    document.querySelectorAll(".history").forEach( (item) => {
        item.remove();

    })

    historylist.forEach((item, index) => {

        const historyDiv = document.createElement("div");
        historyDiv.classList.add("history")

        const delete_this_history = document.createElement("span");
        delete_this_history.classList.add("material-symbols-outlined");
        delete_this_history.classList.add("Transparent");
        delete_this_history.textContent = "delete";

        delete_this_history.addEventListener("click",(index) =>{
            historylist.splice(index,1);
            render_history_list();
        })
        
        const equation_para = document.createElement("p");
        equation_para.classList.add("equation_para");
        
        const result_para = document.createElement("p");
        result_para.classList.add("result_para");

        equation_para.textContent = item.equation + " = ";
        result_para.textContent = item.answer;

        historyDiv.appendChild(delete_this_history);
        historyDiv.appendChild(equation_para);
        historyDiv.appendChild(result_para);
        all_history_container.appendChild(historyDiv);
    })
}

//           HISTORY FUNCTION

function dont_show_history(){
    history_container.classList.add("display_none");
    for(let i = 0 ; i < nodelistfornumbers.length; i++){
        nodelistfornumbers[i].classList.remove("display_none");
    }
    AC_button.classList.remove("display_none");
    back_button.classList.remove("display_none");
    pointbutton.classList.remove("display_none");
    History_button.classList.remove("display_none");
}
// show_history()
function show_history(){
    for(let i = 0 ; i < nodelistfornumbers.length; i++){
        nodelistfornumbers[i].classList.add("display_none");
    }
    AC_button.classList.add("display_none");
    back_button.classList.add("display_none");
    pointbutton.classList.add("display_none");
    History_button.classList.add("display_none");

    history_container.classList.remove("display_none");
    render_history_list();
    
}


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

    historylist.push({
        equation : expression ,
        answer : result
    });
    console.log(historylist);
    // console.log(`${expression} = ${result}`);
    
    expression = result;
    Update_Expression();
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