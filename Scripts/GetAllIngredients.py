import glob


unique_categories = []

file_array = glob.glob('Recipes/*.txt')
ingredients = ""
for file_name in file_array:
    ingredients += file_name[8:len(file_name)-4] + "\n"
    file = open(file_name, "r")
    ingredient_section = False
    for line in file:
        if "Instructions:" in line:
            ingredient_section = False

        if ingredient_section == True:
            
            ingredients += line 
        
        if  "Ingredients" in line:
            ingredient_section = True
            
        

    ingredients += "\n\n"
    
    file.close()


file =  open("AllIngregients.txt", "w")
file.write(ingredients)
file.close()
