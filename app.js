    let number1 = 0
    let number2 = 0
    let result = 0
    // let add = false
    // let minus = false
    // let mul = false
    // let div = false
    let test = ""

    let is_operand = false



    //     CLEAR OPERATION DONE
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
        // add = true;
        is_operand = true;
    }
}
function minus_operation(){
    if(!is_operand){
        test = document.getElementById("function_MINUS").innerHTML;
        document.getElementById("user_input").value += test
        number1 = Number(document.getElementById("user_input").value)
        // minus = true;
        is_operand = true;
    }
}
function multiplication_operation(){
    if(!is_operand){
        test = document.getElementById("function_MULTIPLICATION").innerHTML;
        document.getElementById("user_input").value += test
        number1 = Number(document.getElementById("user_input").value)
        // mul = true;
        is_operand = true;
    }

}
function division_operation(){
    if(!is_operand){
        test = document.getElementById("function_DIVISION").innerHTML;
        document.getElementById("user_input").value += test
        number1 = Number(document.getElementById("user_input").value)
        // div = true;
        is_operand = true;
    }

}

//             PERFORM OPERATION 
console.log(5 + "."+ 55);

function perform(){

    let text = document.getElementById("user_input").value;
    
    let arr = [];
    if( text[0] == "-"){
        arr.push("-");
        text = text.slice(1);
    }
    else if(is_operand_function( text[0] ) || is_operand_function( text[text.length-1] ) ){
        alert("please enter a valid opertion to perform");
        return;
    }
    number1 = 0;
    result = 0;
    let already_operand = false;
    for( let i = 0; i < text.length ; i++){

        if ( !isNaN(text[i]) ){
            arr.push(text[i]);
            already_operand = false;
        }
        else if( text[i] == "."){
            arr.push(text[i]);
            already_operand = true;
        }
        else if ( !already_operand && is_operand_function(text[i]) ){
            arr.push(text[i]);
            already_operand = true;
        }
        else{
            alert("please enter a valid opertion to perform");
            return;
        }

    }
    arr.push("+");
    console.log(arr);
    
    
    let stack = [];
    let operator = "+";
    
    for( let i = 0; i <= arr.length ; i++){
        
        if(!isNaN(arr[i])){
            let j = i;
            while ( !isNaN(arr[j]) && j < arr.length ){
                number1 = number1 * 10 + Number(arr[j]);
                j++;
            }
            i = j - 1;
        }
        else if ( arr[i] == "."){
            let j = i+1;
            while ( !isNaN(arr[j]) && j < arr.length ){
                number2 = number2 * 10 + Number(arr[j]);
                j++;
            }
            number1 = number1 + "." + number2;
            number1 = Number(number1);
            i = j -1;
        }
        
        else{

            if( operator === "+" ){
                stack.push(number1);
                console.log(`the stack in +  at iteration: ${i+1}`);
                console.log(stack);
                console.log(`the operator in +  at iteration: ${i+1}`);
                console.log(operator);
                
                
            } 
            else if( operator === "-" ){
                stack.push(-number1);
                console.log(`the stack in - at iteration: ${i+1}`);
                console.log(stack);
                console.log(`the operator in -  at iteration: ${i+1}`);
                console.log(operator);
            }
            
            else if( operator === "×" ){
                stack.push(stack.pop() * number1);
                console.log(`the stack in * at iteration: ${i+1}`);
                console.log(stack);
                console.log(`the operator in *  at iteration: ${i+1}`);
                console.log(operator);
            }
            else if( operator === "÷" ){
                stack.push(stack.pop() / number1);
                console.log(`the stack in / at iteration: ${i+1}`);
                console.log(stack);
                console.log(`the operator in /  at iteration: ${i+1}`);
                console.log(operator);
            }
            operator = arr[i];
            
            number1 = 0;
        }
    }
    stack.push(number1);
    console.log(stack)
    for(let i = 0; i < stack.length; i++){
        result = result + stack[i];
    }
    
    document.getElementById("user_input").value = result;

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
function number_point (){
    test = document.getElementById("number_point").innerHTML;
    document.getElementById("user_input").value += test;
    is_operand = false
}
    
//          Backspace function   // done

function backspace() {
    
    let text = document.getElementById("user_input").value;
    
    text = text.slice(0, -1);
    document.getElementById("user_input").value = text;
    
    let last_char = text.slice(-1);

    if(is_operand_function( last_char )){   
        is_operand = true;
    }
}

//          is_operand_function

function is_operand_function( character ){

    if( character == "+" || character == "-" || character == "×" || character == "÷"   ){   
        return true;
    }
    return false;
}