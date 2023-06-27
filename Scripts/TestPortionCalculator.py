def formatNumber(num):
    if num != "":
        if num % 1 == 0:
            return int(num)
        else:
            return round(num, 2)
    else: 
        return ""
serves = 4

text = """Ingredients:
350g Risotto Rice
8 rashers of Bacon
2 garlic cloves
20g Parsley
600g Diced butternut squash
1500ml chicken stock
2 Onions
50g Grated Italian Style Cheese
Optional:
200g Chicken Scraps"""

units = ["g", "kg", "oz", "l", "ml"]
text_array = text.split("\n")


quantities = []
for line in text_array:
    recipe_line = line.split(" ")

    if (recipe_line[0].isdigit()):
        value = int(recipe_line[0])
        quantities.append([[value, ""], recipe_line[1:len(recipe_line)]])
        
    else:
        if (recipe_line[0][len(recipe_line[0])-1] != ":"):
            for unit in units:
                if unit in recipe_line[0]:
                    value = recipe_line[0][0:(len(recipe_line[0]))- len(unit)]
                    if value.isdigit():
                        quantities.append([[int(value),unit],recipe_line[1:len(recipe_line)]])
        else:
            pass
print(quantities)

desired_serving = 2

new_string = ""
for item in quantities:
    quantity = formatNumber((item[0][0]/serves) * desired_serving)
    print(quantity)
    new_string += quantity
    for i in range (1, len(item)-1):
        pass


