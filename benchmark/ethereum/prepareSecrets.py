import socket
hostname = socket.gethostname()
IPAddr = socket.gethostbyname(hostname)

file1 = open('secrets.txt', 'r')
Lines = file1.readlines()
node_id = Lines[4].split("=")[1]
print("/ip4/" + IPAddr + "/tcp/1478/p2p/" + node_id)
