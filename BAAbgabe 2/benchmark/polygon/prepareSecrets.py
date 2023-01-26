import sys

file1 = open('secrets.txt', 'r')
Lines = file1.readlines()
node_id = Lines[4].split("=")[1]
print("/ip4/" + sys.argv[1] + "/tcp/1478/p2p/" + node_id[1:].replace("\n", ""))
