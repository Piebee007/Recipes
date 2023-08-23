import json

fileName = "Recipes/AppleGalette.txt"

recipe_json = {
    "recipe": {
        "recipe_title": "",
        "category": "",
        "prep_time": "",
        "cook_time": "",
        "servings": "",
        "ingredients": [
            
        ],
        "instructions": [
            {
                "steps": []
            }
            ],
        "credit": ""
    }
}
#Write a list of units for cooking
#units = ['g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'pint', 'quart', 'gallon', 'oz', 'lb', 'mg', 'mcg', 'inch', 'cm', 'mm', 'm', 'ft', 'yd', 'clove', 'can', 'jar', 'package', 'slice', 'pinch', 'dash', 'whole', 'half', 'small', 'medium', 'large', 'extra large', 'jumbo', 'stick', 'stalk', 'sprig', 'bunch', 'head', 'bulb', 'crown', 'fillet', 'piece', 'loaf', 'round', 'container', 'recipe', 'serving', 'envelope', 'box', 'packet', 'package', 'bag', 'bottle', 'bunch', 'carton', 'container', 'crate', 'jar', 'jug', 'pint', 'quart', 'gallon', 'can', 'tube', 'dozen', 'slice', 'tray', 'pack', 'packets', 'slices']
units = ["g", "kg", 'ml', 'l', 'tsp', 'tbsp', 'cup', 'pint', 'oz', 'lb','clove',]
def make_recipe_thing(string):
    pass


instructions = False
ingredients = False
instruction_steps = 0
file = open(fileName, "r")
recipe_json["recipe"]["recipe_title"] = fileName.split("/")[1].replace(".txt", "").strip()
for line in file.readlines():
    if line.startswith("Category:"):
        recipe_json["recipe"]["category"] = line.replace("Category: ", "").strip()
    elif line.startswith("Prep Time:"):
        recipe_json["recipe"]["prep_time"] = line.replace("Prep Time: ", "").strip()
    elif line.startswith("Cook Time:"):
        recipe_json["recipe"]["cook_time"] = line.replace("Cook Time: ", "").strip()
    elif line.startswith("Serves:"):
        recipe_json["recipe"]["servings"] = line.replace("Serves: ", "").strip()
    elif ingredients == True:
        if "Instructions:" not in line:
            if (":" in line):
                
                recipe_json["recipe"]["ingredients"].append({"subheading": line.strip()})
            else:
                #Get the quantity, unit and text
                quantity = ""
                unit = ""
                text = ""
                split_line = line.split(" ")
                for char in split_line[0]:
                    if char.isdigit() or char == ".":
                        quantity += char
                    else:
                        unit += char
                if split_line[1] in units:
                    unit = split_line[1]
                else:
                    text += split_line[1]
                for word in split_line[2:]:
                    text += word + " "

                if quantity == "":
                    recipe_json["recipe"]["ingredients"].append({"name": text.strip()})
                elif unit == "":
                    recipe_json["recipe"]["ingredients"].append({"name": text.strip(), "quantity": quantity})
                else:
                    recipe_json["recipe"]["ingredients"].append({"name": text.strip(), "quantity": quantity, "unit": unit}) 

    elif line.startswith("Ingredients:"):
        ingredients = True
    if instructions == True:
        if (":" in line):
            recipe_json["recipe"]["instructions"].append({"subheading": line.strip()})
            recipe_json["recipe"]["instructions"].append({"steps": []})
            instruction_steps += 2
        else:
            recipe_json["recipe"]["instructions"][instruction_steps]["steps"].append(line.strip())
        
    elif line.startswith("Instructions:"):
        instructions = True
        ingredients = False
    elif line.startswith("Credit:"):
        recipe_json["recipe"]["credit"] = line.replace("Credit: ", "").strip()

print(json.dumps(recipe_json, indent=4))