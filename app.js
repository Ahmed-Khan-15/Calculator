import { Calculator_button_color } from "./constant.js";
// console.log(.2+.2);
// console.log(.2*.2);
// console.log(2.*.2);
// console.log(9.8*2.0);
// console.log(9.8+2.5);
// console.log(1.*.0);
// console.log(1.*.0);

let floating_point_number = false;
let number1 = 0;
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
//  console.log(nodelistfornumbers);

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

        delete_this_history.addEventListener("click",() =>{
            console.log(index);
            
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
// show_history();
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
    if (!floating_point_number) {
        expression = expression + point_button_element.target.innerHTML;
        Update_Expression();
        floating_point_number = true;
    }
}

function math_operation(maths_button) {
    if (!is_operand) {
        expression = expression + maths_button.target.innerHTML;
        Update_Expression();
        number1 = Number(document.getElementById("user_input").value)

        is_operand = true;
        floating_point_number = false;
    }
}


//         Update Operation

function Update_Expression() {
    document.getElementById("user_input").value = expression;
}
//     CLEAR OPERATION DONE
function clear_operation() {
    expression = "";
    is_operand = false;
    floating_point_number = false;
    Update_Expression();
}

//              TOKENIZER FUNCTION

function tokenize(){

let array1 = [];
    // if (expression[0] == "-") {
    //     array1.push("-");
    //     expression = expression.slice(1);
    // }
    if (expression[0] == "×" || expression[0] == "÷" || is_operand_function(expression[expression.length - 1])) {
        alert("please enter a valid opertion to perform");
        return;
    }
    number1 = 0;
    result = 0;
    let previous_was_operand = false;
    for (let i = 0; i < expression.length; i++) {

        if (!isNaN(expression[i])) {
            array1.push(expression[i]);
            previous_was_operand = false;
        }
        else if (expression[i] == ".") {
            array1.push(expression[i]);
            previous_was_operand = true;
        }
        else if (!previous_was_operand && is_operand_function(expression[i])) {
            array1.push(expression[i]);
            previous_was_operand = true;
        }
        else {
            alert("please enter a valid opertion to perform");
            return;
        }

    }
    array1.push("+");
    
    return array1;

}

//             PERFORM OPERATION 



function perform() {
    let arr = tokenize();
    
    floating_point_number = false;
    console.log(arr);


    let stack = [];
    let operator = "+";

    for (let i = 0; i < arr.length; i++) {
        console.log("i =", i, "arr[i] =", arr[i]);
        if (!isNaN(arr[i])) {
            let j = i;
            while (j < arr.length && !isNaN(arr[j])) {
                number1 = number1 * 10 + Number(arr[j]);
                j++;
                console.log(number1);
                console.log(j);
                
            }
            // console.log("Setting i =", j - 1);
            i = j - 1;
        }
        else if (arr[i] == "." && !floating_point_number) {
            // console.log("Entered decimal branch");
            floating_point_number = true;
            let j = i + 1;
            let number2 = 0;
            while (!isNaN(arr[j]) && j < arr.length) {
                number2 = number2 * 10 + Number(arr[j]);
                j++;
            }
            while( number2 > 1){
                number2 = number2 / 10;
            }
            // console.log("this is number2 in perform",number2);
            number1 = number1 + number2;
            // console.log("this is number1 in perform",number1);
            // console.log("In Decimal branch Setting i =", j - 1);
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
            floating_point_number = false;
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
    
    expression = String(result);
    Update_Expression();
}


//          Backspace function   // done

function backspace() {
    if(expression){
        if (expression[ expression.length - 1 ] == "."){
            floating_point_number = false;
        }
        expression = expression.slice(0, -1);
        Update_Expression();
        if(expression){

            let last_char = expression.slice(-1);
        
            if (is_operand_function(last_char)) {
                is_operand = true;
            }
            else{
                is_operand = false;
            }
            
        }
        else {
        is_operand = false;
        floating_point_number = false;
    }
    }
    else {
        is_operand = false;
        floating_point_number = false;
    }
}

//          CHECCK OPERAND FUNCTION

function is_operand_function(character) {

    if (character == "+" || character == "-" || character == "×" || character == "÷") {
        return true;
    }
    return false;
}