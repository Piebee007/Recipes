import glob

def total_time(prep_time, cook_time):
    total_time = 0
    prep_time = prep_time.split(":")
    total_time += int(prep_time[0]) *60 + int(prep_time[1])
    cook_time = cook_time.split(":")
    total_time += int(cook_time[0]) *60 + int(cook_time[1])
    
    return str(total_time)

unique_categories = []

file_text = ""
file_array = glob.glob('Recipes/*.txt')
for file_name in file_array:
    recipe_data = ""
    #The name of the recipe
    recipe_data += file_name[8:len(file_name)-4] + ", "
    file = open(file_name, "r")
    for line in file:
        if line[0:10] == "Category: ":
            category = line[10:len(line)-1]
            if category != "/n":
                recipe_data += category + ", "
            else:
                recipe_data += "ERROR" + ", "
            if category not in unique_categories:
                if category != "/n":
                    unique_categories.append(category)
                else:
                    unique_categories.append("Error")
        if line[0:11] == "Prep Time: ":
            if line[11:len(line)] != "/n":
                prep_time = line[11:len(line)-1]
                recipe_data += prep_time + ", "
            else:
                recipe_data += "ERROR" + ", "
        if line[0:11] == "Cook Time: ":
            if line[11:len(line)] != "/n":
                cook_time = line[11:len(line)-1]
                recipe_data += cook_time + ", "
            else:
                recipe_data += "ERROR, " 

            recipe_data += total_time(prep_time,cook_time)
        
        
    file_text += recipe_data + "\n"
    file.close()


print(unique_categories)
sorted_unique_categories = sorted(unique_categories)
unique_tags_text = ""
for tag in sorted_unique_categories:
    unique_tags_text += ", " +tag 
unique_tags_text = unique_tags_text[2:len(unique_tags_text)]
unique_tags_text += "\n"

print(file_text)
file = open("HomePageData.txt", "w")
file.write(unique_tags_text)
file.write(file_text)
file.close()


