def common_elements(list1, list2):
  common_list = []
  for i in list1:
    if i in list2:
      common_list.append(i)
  return common_list

list1 = [1, 2, 3, 4, 5]
list2 = [3, 4, 5, 6, 7]
common_list = common_elements(list1, list2)
print(common_list)