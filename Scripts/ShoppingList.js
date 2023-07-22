
var all_ingredients;

function preload(){
    all_ingredients = loadStrings("AllIngregientsV2.txt")
}

var ingredients = []
var meal_servings = []
function setup(){
    if (localStorage.length == 1){
        const url = new URL(window.location.href)
        const params = new URLSearchParams(url.search)
        params.forEach((value, name)=>{
            console.log(`${name}: ${value}`)
        })
        console.log(params)
    }
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        //var recipe_to_find = localStorage.getItem( localStorage.key( i ) )
        
        var recipe_to_find = localStorage.key(i)
        for (let j = 0; j < all_ingredients.length; j++){
            let recipe_found = false
            if (recipe_to_find == all_ingredients[j]){
                let tempory_j = j
                recipe_found = true
                console.log(recipe_found)
                var text = []
                while (recipe_found == true){
                    if (all_ingredients[tempory_j] == ""){
                        meal_servings.push(localStorage.getItem(localStorage.key(i)))
                        console.log(localStorage.getItem(localStorage.key(i)))
                        recipe_found = false
                        ingredients.push(text)
                    }else{
                        text.push( all_ingredients[tempory_j])
                    }
                    
                    
                    tempory_j += 1;
                }
            }
        }
    }

    for (let i = 0; i < ingredients.length; i++){
        var optional = false
        var html_text = ""
        var checkbox_num = 0
        html_text += "<div id='" + ingredients[i][0] + " container' class='recipe-container' data-value='" + ingredients[i][0] + "'>"
        html_text += "<div class='title-container'>"
        html_text += "<h2>" + ingredients[i][0] + "</h2>"
        html_text += "<button class='close-button' onclick='remove_recipe(" +'"' + ingredients[i][0] + '"'+ ")'>Remove From Shopping List</button>"
        html_text += "</div>"
        html_text += "<div class='serving-section'>"
        html_text += "<h3 class='serving' id='"+ingredients[i][0] + " serving"+"' data-value='" + meal_servings[i] + "'> Serves: " + meal_servings[i] + "</h3>"
        
        html_text += "<div class='buttons'><button onclick='decrement_serving("
        html_text +='"' + ingredients[i][0] + ' container"' + ")'"
        html_text += "> - </button><button onclick='increment_serving(" 
        html_text += '"' + ingredients[i][0] +  ' container"' + ")'" + "> + " +"</button></div>"
        html_text += "</div>"
        html_text += "<ul class='ingredients'>"
        for (let j=1; j < ingredients[i].length; j++){
            var split = ingredients[i][j].split("%")
            console.log(split)
            if (split.length == 3){
                var split_ingredient = split[2].split(", ")[0]
                if (optional == true){
                    if (split[0] == ""){
                        html_text += "<input type='checkbox' id='checkbox" + checkbox_num+ "'>" 
                        html_text += "<label class='ingredient' data-value='null' for='checkbox" + checkbox_num + "'>" + split_ingredient + "</label><br>"
                        checkbox_num +=1
                    }else{
                        html_text += "<input type='checkbox' id='checkbox" + checkbox_num+ "'>" 
                        html_text += "<label class='ingredient' data-value='" + split[0] + "," + split[1] + "' for='checkbox" + checkbox_num + "'>"+ formatNumber(split[0] * parseInt(meal_servings[i])) + split[1] + " " + split_ingredient + "</label><br>"
                        checkbox_num +=1
                    }
                    
                }else{
                    if (split[0] == ""){
                        html_text += "<li class='ingredient' data-value='null'>"+ split_ingredient + "</li>"
                    }else{
                        html_text += "<li class='ingredient' data-value='" + split[0] + "," + split[1] + "'>" + formatNumber(split[0] * parseInt(meal_servings[i])) + split[1] + " " + split_ingredient + "</li>"
                    }
                    
                }
                
            }else if (split[0] == "Optional:"){
                optional = true
                html_text += "</ul>"
                html_text += "<h3>Optional:</h3>"
                html_text += "<div class='checkbox-list'>"
            }
            else{
                if (optional == true){
                    html_text += "</div>"
                }
                optional = false
                html_text += "</ul>"
                html_text += "<h3>" + split[0] + "</h3>"
            }
            
        }
        if (optional == true){
            html_text += "</div></div>"
        }else{
            html_text += "</ul></div>"
        }
        console.log(html_text)
        createP(html_text)
    }

    
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

function update_ingredient_amounts(recipe){
    var recipe_container = document.getElementById(recipe)
    var ingredient_lists = recipe_container.getElementsByClassName("ingredient")
    for (let i = 0; i < ingredient_lists.length; i++){
        var ingredient_text = ingredient_lists[i].innerHTML
        var ingredient_text_split = ingredient_text.split(" ")
        var ingredient_value = ingredient_lists[i].dataset.value
        var updated_text = ""
        var ingredient_start = 1
        if (ingredient_value == "null" || ingredient_value[0] == ""){
            ingredient_start = 0
        }else{
            ingredient_value = ingredient_value.split(",")
            if (ingredient_value[0] != ""){
                var serving = recipe_container.getElementsByClassName("serving")[0].dataset.value
                var updated_ingredient_value = formatNumber(parseFloat(ingredient_value[0]) * serving)
            
                updated_text = updated_ingredient_value + ingredient_value[1] + " "   
            }
            
        }
        if (ingredient_value[0] == ""){
            console.log(ingredient_value)
            console.log(ingredient_text_split)
        }
        
        for (let j = ingredient_start; j < ingredient_text_split.length; j++){
            updated_text += ingredient_text_split[j] + " "
        }

        ingredient_lists[i].innerHTML = updated_text
    }
}
    

function increment_serving(recipe){
    var recipe_container = document.getElementById(recipe)
    var servingElement = recipe_container.getElementsByClassName("serving")[0]
    var servingValue = parseInt(servingElement.dataset.value) + 1
    servingElement.innerHTML = "Serves: " + servingValue
    servingElement.dataset.value = servingValue
    update_ingredient_amounts(recipe)
}

function decrement_serving(recipe){
    
    var recipe_container = document.getElementById(recipe)
    var servingElement = recipe_container.getElementsByClassName("serving")[0]
    var servingValue = parseInt(servingElement.dataset.value) - 1
    if (servingValue < 1){
        servingValue = 1
    }
    servingElement.innerHTML = "Serves: " + servingValue
    servingElement.dataset.value = servingValue
    update_ingredient_amounts(recipe)
}

function set_serving(recipe, serving_size){
    
    var recipe_container = document.getElementById(recipe)
    var servingElement = recipe_container.getElementsByClassName("serving")[0]
    var servingValue = parseInt(serving_size)
    
    servingElement.innerHTML = "Serves: " + servingValue
    servingElement.dataset.value = servingValue
    update_ingredient_amounts(recipe)
}

function get_all_ingredients(){
    var ingredients = []
    var recipes = document.getElementsByClassName("recipe-container")
    for (var i = 0; i < recipes.length; i++) {
        var recipe = recipes[i]
        // var ingredientsDiv = recipe.querySelector('.ingredients');
        // var checkboxes = ingredientsDiv.querySelectorAll('input[type="checkbox"]');
        var liIngredients = recipe.querySelectorAll('.ingredients li')
    
        liIngredients.forEach(li => {
            ingredients.push(li.textContent.trim())
        });
        
        var checkboxes = recipe.querySelectorAll('input[type="checkbox"]:checked + label.ingredient')
        
        checkboxes.forEach(label => {
            ingredients.push(label.textContent.trim())
        });
    }
    return ingredients
}

function remove_recipe(recipe){
    localStorage.removeItem(recipe)
    location.reload()
}