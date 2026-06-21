    let number1 = null
    let number2 = null
    let result = 0
    let add = false
    let minus = false
    let mul = false
    let div = false
    let test = ""

    let is_operand = false
function clear_operation(){

    document.getElementById("user_input").value = "";
    test = "";
    is_operand = true;
    
}
function add_operation(){
    if(!is_operand){
        test = document.getElementById("function_PLUS").innerHTML;
        document.getElementById("user_input").value += test
        let number1 = Number(document.getElementById("user_input").value)
        add = true;
        is_operand = true;
    }
}
function minus_operation(){
    if(!is_operand){
        test = document.getElementById("function_MINUS").innerHTML;
        document.getElementById("user_input").value += test
        number1 = Number(document.getElementById("user_input").value)
        minus = true;
        is_operand = true;
    }
}
function multiplication_operation(){
    if(!is_operand){
        test = document.getElementById("function_MULTIPLICATION").innerHTML;
        document.getElementById("user_input").value += test
        number1 = Number(document.getElementById("user_input").value)
        mul = true;
        is_operand = true;
    }

}
function division_operation(){
    if(!is_operand){
        test = document.getElementById("function_DIVISION").innerHTML;
        document.getElementById("user_input").value += test
        number1 = Number(document.getElementById("user_input").value)
        div = true;
        is_operand = true;
    }

}

function perform(){
    if(add){
        number2 = Number(document.getElementById("user_input").value);
        result = number1 + number2;
        add = false;
    }
    else if(minus){
        number2 = Number(document.getElementById("user_input").value);
        minus = false;
    }
    else if(mul){
        number2 = Number(document.getElementById("user_input").value);
        mul = false;
    }
    else if( div ){
        number2 = Number(document.getElementById("user_input").value);
        div = false;
    }
    else {
        alert("please select a valid opertion to perform");
    }
   

}

//           INPUT FUNCTIONS 

function number_1 (){
    test = document.getElementById("number_1").innerHTML;
    document.getElementById("user_input").value += test;
    is_operand = false;
}
function number_2 (){
    test = document.getElementById("number_2").innerHTML;
    document.getElementById("user_input").value += test;
    is_operand = false
}
function number_3 (){
    test = document.getElementById("number_3").innerHTML;
    document.getElementById("user_input").value += test;
    is_operand = false
}
function number_4 (){
    test = document.getElementById("number_4").innerHTML;
    document.getElementById("user_input").value += test;
    is_operand = false
}
function number_5 (){
    test = document.getElementById("number_5").innerHTML;
    document.getElementById("user_input").value += test;
    is_operand = false
}
function number_6 (){
    test = document.getElementById("number_6").innerHTML;
    document.getElementById("user_input").value += test;
    is_operand = false
}
function number_7 (){
    test = document.getElementById("number_7").innerHTML;
    document.getElementById("user_input").value += test;
    is_operand = false
}
function number_8 (){
    test = document.getElementById("number_8").innerHTML;
    document.getElementById("user_input").value += test;
    is_operand = false
}
function number_9 (){
    test = document.getElementById("number_9").innerHTML;
    document.getElementById("user_input").value += test;
    is_operand = false
}
function number_0 (){
    test = document.getElementById("number_0").innerHTML;
    document.getElementById("user_input").value += test;
    is_operand = false
}
    
//          Backspace function 

function backspace() {
    
    let text = document.getElementById("user_input").value;
    
    text = text.slice(0, -1);
    document.getElementById("user_input").value = text;
    
    let last_char = text.slice(-1);
    console.log(last_char)

    if( last_char == "+" || last_char == "-" || last_char == "×" || last_char == "÷"   ){   
        is_operand = true;
    }
}
