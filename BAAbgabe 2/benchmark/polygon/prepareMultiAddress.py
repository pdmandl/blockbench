file1 = open('secrets.txt', 'r')
Lines = file1.readlines()
pubKey = Lines[2].split("=")[1]
bls = Lines[3].split("=")[1]
print(pubKey[1:].replace("\n", "") + ":" + bls[1:].replace("\n", ""))
