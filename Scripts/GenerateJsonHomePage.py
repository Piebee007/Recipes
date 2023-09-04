import glob
import json

def total_time(prep_time, cook_time):
    total_time = 0
    prep_time = prep_time.split(":")
    total_time += int(prep_time[0]) *60 + int(prep_time[1])
    cook_time = cook_time.split(":")
    total_time += int(cook_time[0]) *60 + int(cook_time[1])
    
    return str(total_time)

home_page_json = {
    "categories": [],
    "recipes": [],
    "deserts": [],
}

#Categories
#File name%Title%Category%Prep Time%Cook Time%Total Time
unique_categories = []
file_text = ""
file_array = glob.glob('RecipesJson/*.json')
for file_name in file_array:
    #open the json file
    file = open(file_name, "r")
    #get recipe title
    recipe_json = json.load(file)
    recipe_category = recipe_json["recipe"]["category"]
    print(file_name.strip("RecipesJson\\").split(".")[0])
    recipe_json_section = {
        "recipe_file": file_name.strip("RecipesJson\\").split(".")[0],
        "recipe_title": recipe_json["recipe"]["recipe_title"],
        "recipe_category": recipe_json["recipe"]["category"],
        "recipe_prep_time": recipe_json["recipe"]["prep_time"],
        "recipe_cook_time": recipe_json["recipe"]["cook_time"],
        "recipe_total_time": total_time(recipe_json["recipe"]["prep_time"], recipe_json["recipe"]["cook_time"])
    }
    if recipe_category == "Dessert":
        home_page_json["deserts"].append(recipe_json_section)
    else:
        home_page_json["recipes"].append(recipe_json_section)
    if recipe_category not in home_page_json["categories"] and recipe_category != "Dessert":
        home_page_json["categories"].append(recipe_category)

    


#Write the json file
home_page_json["categories"].sort()

file = open("home_page.json", "w")
file.write(json.dumps(home_page_json, indent=4))
