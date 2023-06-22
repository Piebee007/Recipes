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
}

function recipe_text(file_txt){
    //Recipe Title
    createP("<h1>"+file_txt[0]+"</h1>");
    //Category
    let category = new String (file_txt[1].substr(10))
    createP("<h2>"+"Category: "+category+"</h2>");
    //Prep Time
    let prep_time = new String(file_txt[2].substr(11))
    createP("<h2>"+"Prep Time: "+prep_time+"</h2>");
    //Cook Time
    let cook_time = new String(file_txt[2].substr(11))
    createP("<h2>"+"Cook Time: "+cook_time+"</h2>");
    //Servings
    let serves = new String (file_txt[4].substr(7));
    createP("<h2>"+"Serves: "+serves+"</h2>");
    createP("<h2>Ingredients:</h2>")


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
            ingredients += "<li>"+file_txt[i] + "</li>"
        }
        
    }
    ingredients += "</ul>"
    createP(ingredients);


    createP("<h2>Instructions:</h2>")
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
    createP(instructions);

    if (credit_start != 0){
        let credit_text = file_txt[credit_start].substr(8);
        console.log(credit_text.substr(0,5))
        let credit_html = "";
        if (credit_text.substr(0,4) == "http"){
            credit_html += "<a href='" + credit_text + "'> Credit</a>"
        }else{
            credit_html += "<p class='credit'>Credit: " + credit_text + "</p>"
        }
        createP(credit_html)
    }
}

// function add_recipe(){
//     var new_txt = sessionStorage.getItem('recipe_list') + ", " + filename
//     sessionStorage.setItem('recipe_list', new_txt)
//     console.log(filename)
// }