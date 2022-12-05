file1 = open('secrets.txt', 'r')
Lines = file1.readlines()

for line in Lines:
    print(line)
