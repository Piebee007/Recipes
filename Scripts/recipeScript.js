var x;
var file_txt;
var filename;
function preload(){
    //filename = sessionStorage.getItem('file')
    let url = window.location.href
    var recipe_param = ""
    let found_recipe = false
    for (var i = 0; i < url.length; i++){
        if (found_recipe == true){
            recipe_param += url.charAt(i);
        }else{
            if (url.charAt(i) == '?'){
                found_recipe = true;
            }
        }
    }
    file_txt = loadStrings('./Recipes/' + recipe_param + '.txt')
}


function setup(){
    noCanvas();
    recipe_text(file_txt);
    base_value()
}


function recipe_text(file_txt){
    var html_text = ""
    //Recipe Title
    html_text += "<h1>"+file_txt[0]+"</h1>"
    //Category
    let category = new String (file_txt[1].substr(10))
    html_text += "<h2>"+"Category: "+category+"</h2>"
    //Prep Time
    let prep_time = new String(file_txt[2].substr(11))
    html_text += "<h2>"+"Prep Time: "+convert_to_time(prep_time)+"</h2>"
    //Cook Time
    let cook_time = new String(file_txt[3].substr(11))
    html_text += "<h2>"+"Cook Time: "+convert_to_time(cook_time)+"</h2>"
    //Servings
    let serves = new String (file_txt[4].substr(7));
    let serving_text = "<div class='serving-section'>" + "<h2 id ='serving' data-value = "+ serves+">"+"Serves: "+serves+"</h2>"
    serving_text += "<div class='buttons'><button onclick='decrement_serving()'> - </button><button onclick='increment_serving()'> + </button>"
    serving_text += "</div></div>"
    html_text += serving_text

    html_text +=  "<button id='ShoppingListButton' onclick='add_recipe_to_shopping_list()'>Add to Shopping List</button>"

    html_text += "<h2>Ingredients:</h2>"
    // Add the ingredients list
    var ingredients = "<ul class='ingredients'>";
    var instruction_start;
    for (let i=6; i<file_txt.length; i++){
        if (file_txt[i] == "Instructions:"){
            instruction_start = i;
            break;
        }
        if (file_txt[i].substr(file_txt[i].length-1) == ":"){
            ingredients += "</ul>"
            ingredients += "<h3>" + file_txt[i] + "</h3>"
            ingredients += "<ul class='ingredients'>"
        }else{
            ingredients += "<li class = 'ingredient' data-value = "+ null+">"+file_txt[i] + "</li>"
        }
        
    }
    ingredients += "</ul>"
    html_text += ingredients


    html_text += "<h2>Instructions:</h2>"
    var instructions = "<ol class='instructions'>";
    let credit_start = 0;
    for (let i=instruction_start+1; i<file_txt.length; i++){
        if (file_txt[i].substr(0,6) == "Credit"){
            credit_start = i;
            break;
        }
        if (file_txt[i].substr(file_txt[i].length-1) == ":"){
            instructions += "</ol>"
            instructions += "<h3>" + file_txt[i] + "</h3>"
            instructions += "<ol class='instructions'>"
        }else{
            instructions += "<li>"+file_txt[i] + "</li>"
        }
    }
    instructions += "</ol>"
    html_text += instructions

    if (credit_start != 0){
        let credit_text = file_txt[credit_start].substr(8);
        console.log(credit_text.substr(0,5))
        let credit_html = "";
        if (credit_text.substr(0,4) == "http"){
            credit_html += "<a href='" + credit_text + "'> Credit</a>"
        }else{
            credit_html += "<p class='credit'>Credit: " + credit_text + "</p>"
        }
        html_text += credit_html

        createP(html_text)
    }
}


function convert_to_time(time){
    var text = ""
    let time_split= time.split(":")
    if (time_split[0] =="1"){
        text += time_split[0] + " hour "
    }else if (time_split[0] != "0"){
        text += time_split[0] + " hours "
    }

    if (time_split[1] != "00"){
        if (time_split[1][0] == "0"){
            text += time_split[1][1] + " minutes"
        }else{
            text += time_split[1] + " minutes"
        }
        
    }
    return text
}

function base_value(){
    var ingredient_lists = document.getElementsByClassName("ingredient")
    for (let i = 0; i < ingredient_lists.length; i++){
        var ingredient_text = ingredient_lists[i].innerHTML
        ingredient_lists[i].dataset.value = calculate_base_value(ingredient_text,parseInt(document.getElementById("serving").dataset.value))
    }
    
}


const units = ["g", "kg", "oz", "lbs", "l", "ml", "tsp", "tbsp"]

function calculate_base_value(str, serving){
    var str_split = str.split(" ")
    if (isdigit(str_split[0])){
        return formatNumber(parseFloat(str_split[0])/serving).toString() + ","
    }else{
        for (let i =0; i < units.length; i++){
            if (str_split[0].includes(units[i])){
                let value = str_split[0].substr(0, (str_split[0].length - units[i].length))
                if (isdigit(value)){
                    return formatNumber(parseFloat(value)/serving).toString() + ","+units[i]
                }
            }
        }
    }
    return null
}
function isdigit(str) {
    return /^[0-9]+$/.test(str);
}

function formatNumber(num){
    if (num != ""){
        if (num % 1 == 0){
            return Math.floor(num)
        }else{
            return num.toFixed(2)
        }
    }
    
    return "null"  
}

function update_ingredient_amounts(){
    var ingredient_lists = document.getElementsByClassName("ingredient")
    for (let i = 0; i < ingredient_lists.length; i++){
        var ingredient_text = ingredient_lists[i].innerHTML
        var ingredient_text_split = ingredient_text.split(" ")
        var ingredient_value = ingredient_lists[i].dataset.value
        var updated_text = ""
        var ingredient_start = 1
        if (ingredient_value == "null"){
            ingredient_start = 0
        }else{
            ingredient_value = ingredient_value.split(",")
            console.log(ingredient_value)
            var serving = document.getElementById("serving").dataset.value
            var updated_ingredient_value = formatNumber(parseFloat(ingredient_value[0]) * serving)
            
            updated_text = updated_ingredient_value + ingredient_value[1] + " "   
        }
        
        
        for (let j = ingredient_start; j < ingredient_text_split.length; j++){
            updated_text += ingredient_text_split[j] + " "
        }

        ingredient_lists[i].innerHTML = updated_text
    }
}
    

function increment_serving(){
    var servingElement = document.getElementById("serving")
    var servingValue = parseInt(servingElement.dataset.value) + 1
    servingElement.innerHTML = "Serves: " + servingValue
    servingElement.dataset.value = servingValue
    update_ingredient_amounts()
}

function decrement_serving(){
    
    var servingElement = document.getElementById("serving")
    var servingValue = parseInt(servingElement.dataset.value) - 1
    if (servingValue < 1){
        servingValue = 1
    }
    servingElement.innerHTML = "Serves: " + servingValue
    servingElement.dataset.value = servingValue
    update_ingredient_amounts()
}
// function add_recipe(){
//     var new_txt = sessionStorage.getItem('recipe_list') + ", " + filename
//     sessionStorage.setItem('recipe_list', new_txt)
//     console.log(filename)
// }

function add_recipe_to_shopping_list(){
    const getURLParams = new URLSearchParams(window.location.search)
    const firstParameter = getURLParams.entries().next().value[0]

    // Get the serving value from the HTML element
    const servingElement = document.getElementById('serving');
    const servingValue = servingElement.getAttribute('data-value');

    localStorage.setItem(firstParameter, servingValue);
}