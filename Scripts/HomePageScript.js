
var recipe_names = [];
var recipesData;
var homePageData;

function preload(){
    homePageData = loadStrings('HomePageData.txt')
    
}

function setup(){
    noCanvas();
    var categories = homePageData[0].split(", ")
    console.log(categories)

    var html_code = ""
    html_code += "<div >"
    for (let i = 0; i < categories.length; i++){
        html_code += "<h2>" + categories[i] + ": </h2>"
        html_code += "<div class = 'recipe-links'>"
        for (let j=1; j < homePageData.length; j++){
            let recipe = homePageData[j].split(", ")
            if (recipe[1] == categories[i]){
                var recipe_name = ""
                for (let k = 0; k < recipe[0].length; k++){
                    if (recipe[0].charAt(k) == recipe[0].charAt(k).toUpperCase()){
                        recipe_name += " " + recipe[0].charAt(k)  
                    }else{
                        recipe_name += recipe[0].charAt(k) 
                    }
                }
                html_code += "<a class='recipe-box' onclick='select_recipe("
                html_code += '"' + recipe[0] + '"'
                html_code += ")'>"
                html_code += "<h3>" + recipe_name + "</h3>"
                html_code += "<p>Prep Time: " + convert_to_time(recipe[2]) + "</p>"
                html_code += "<p>Cook Time: " + convert_to_time(recipe[3]) + "</p></a>"

            }
        }
        html_code += "</div>"
    }
    html_code += "</div>"
    createP(html_code)

}

function select_recipe(filename){
    location.href = "recipePage.html?"+filename
}


function convert_to_time(time){
    console.log(time)
    var text = ""
    let time_split= time.split(":")
    console.log(time_split)
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