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


function load_home_page_file(){
    // Get homepage json file
    // Load the recipe data from the JSON file
    
    fetch('home_page.json')
        .then(response => response.json())
        .then(recipeData => {
            
            generate_home_page(recipeData)
            //addRecipe(recipeData)
        })
        .catch(error => console.error('Error fetching JSON:', error));

    }

function generate_home_page(homePage){
    var categories = homePage.categories
    console.log(categories)
    //loop through categories
    for (let i=0; i<categories.length; i++){
        let category = categories[i]
        console.log(category)
        //Add the category as  a <h2> element to the "container" div. Then loop throughthe homePage recipes and add the recipes that belong to the category
        //Each category will have a <div> element with the class "recipe-links" that will contain all the recipes that belong to the category
        let container = document.getElementById("container")
        let category_element = document.createElement("h2")
        category_element.innerHTML = category
        container.appendChild(category_element)
        let recipe_links = document.createElement("div")
        recipe_links.className = "recipe-links"
        container.appendChild(recipe_links)
        let recipes = homePage.recipes
        //loop through recipes
        for (let j = 0; j < recipes.length; j++) {
            let recipe = recipes[j]
            if (recipe.recipe_category == category){
                let recipe_box = create_box_element(recipe)
                console.log(recipe.recipe_title)
                recipe_links.appendChild(recipe_box)
            }
            
        }
    }
}

function create_box_element(recipe){
    console.log(recipe)
    let recipe_box = document.createElement("a")
    recipe_box.className = "recipe-box"
    recipe_url = "testingJsonRecipe.html?recipe_name="+recipe.recipe_file
    recipe_box.href = recipe_url
    let recipe_title = document.createElement("h3")
    recipe_title.innerHTML = recipe.recipe_title
    recipe_box.appendChild(recipe_title)
    let recipe_time = document.createElement("p")
    recipe_time.innerHTML = "Prep: " + convert_to_time(recipe.recipe_prep_time) + " | Cook: " + convert_to_time(recipe.recipe_cook_time)
    recipe_box.appendChild(recipe_time)
    console.log(recipe_box)
    return recipe_box
}
