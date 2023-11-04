def even_numbers(list1):
  even_list = []
  for i in list1:
    if i % 2 == 0:
      even_list.append(i)
  return even_list
  
print(even_numbers([1, 2, 3, 4, 5, 6]))