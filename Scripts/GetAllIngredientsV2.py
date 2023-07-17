import glob

def formatNumber(num):
    if num != "":
        if num % 1 == 0:
            return int(num)
        else:
            return round(num, 2)
    else: 
        return ""
    
units = ["g", "kg", "oz", "L", "ml", "tsp", "tbsp"]
def one_portion(line, serving_size):
    text = ""
    value = ""
    recipe_line = line.split(" ")
    if (recipe_line[0].isdigit()):
        return formatNumber(float(recipe_line[0])/serving_size), "",recipe_line[1:len(recipe_line)]
    else:
        if (recipe_line[0][len(recipe_line[0])-1] != ":"):
            for unit in units:
                if unit in recipe_line[0]:
                    temp_value = recipe_line[0][0:(len(recipe_line[0]))- len(unit)]
                    if temp_value.isdigit():
                        return formatNumber(float(temp_value)/serving_size), unit,  recipe_line[1:len(recipe_line)]
        else:
            if "Optional" in recipe_line[0]:
                return "","", [recipe_line[0] +"\n"]

    return value, "",text

unique_categories = []

file_array = glob.glob('Recipes/*.txt')
ingredients = ""
for file_name in file_array:
    ingredients += file_name[8:len(file_name)-4] + "\n"
    file = open(file_name, "r")
    ingredient_section = False
    serving_size = 1
    for line in file:
        if "Instructions:" in line:
            ingredient_section = False
        if "Serves" in line:
            serving_size = int(line[7:len(line)])

        if ingredient_section == True:
            ing_value, ing_unit, ing_text = one_portion(line, serving_size)
            print(ing_text)
            
            if ing_value != "" or ing_text != "":
                if "Optional:" in ing_text[0]:
                    ingredients += "Optional:\n"
                else:
                    ingredients += str(ing_value) + "%" + ing_unit + "%"+ " ".join(ing_text)
            #ingredients += line 
        
        if  "Ingredients" in line:
            ingredient_section = True
            
        

    ingredients += "\n"
    
    file.close()


file =  open("AllIngregientsV2.txt", "w")
file.write(ingredients)
file.close()
