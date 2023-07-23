
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
                html_code += "<p>Prep: " + convert_to_time(recipe[2]) + " | "   +   "Cook: " + convert_to_time(recipe[3]) + "</p></a>"

                // html_code += "<p>Prep Time: " + convert_to_time(recipe[2]) + "</p>"
                // html_code += "<p>Cook Time: " + convert_to_time(recipe[3]) + "</p></a>"

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

function searchRecipes() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const recipeCategories = document.getElementsByTagName('h2');
    let noResults = true;
    if (searchValue == "") {
        noResults = false;
    }
    
  
    for (const category of recipeCategories) {
      const recipeLinksDiv = category.nextElementSibling;
      const recipeLinks = recipeLinksDiv.getElementsByClassName('recipe-box');
      let anyMatch = false;
      let allRecipeBoxesHidden = true;
  
      // Search in the category header (h2 element)
      const categoryTitle = category.innerText.toLowerCase();
      if (categoryTitle.includes(searchValue)) {
        anyMatch = true;
  
        // Show all recipe-links in the category if the category header matches the search
        for (const recipeLink of recipeLinks) {
          recipeLink.style.display = '';
          allRecipeBoxesHidden = false;
        }
      } else {
        for (const recipeLink of recipeLinks) {
          const recipeTitle = recipeLink.getElementsByTagName('h3')[0].innerText.toLowerCase();
  
          if (recipeTitle.includes(searchValue)) {
            recipeLink.style.display = '';
            anyMatch = true;
            allRecipeBoxesHidden = false;
          } else {
            recipeLink.style.display = 'none';
          }
        }
      }
  
      // Show/hide the parent h2 based on anyMatch value
      category.style.display = anyMatch ? '' : 'none';
  
      // Show/hide the parent recipe-links div based on the visibility of recipe-box elements
      recipeLinksDiv.style.display = allRecipeBoxesHidden ? 'none' : '';

      if (anyMatch) {
        noResults = false;
      }
    }
    // Show/hide the noResultsMessage based on the noResults value
    const noResultsMessage = document.getElementById('noResultsMessage');
    noResultsMessage.style.display = noResults ? 'block' : 'none';
  }
  

  // function toggleMenu() {
  //   const navLinks = document.querySelector('.nav-links');
  //   navLinks.classList.toggle('active');
  // }
  