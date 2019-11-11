import socket
import requests
import json

# UDP Socket configuration
UDP_IP = "localhost"
UDP_PORT = 4001
sock = socket.socket(socket.AF_INET, # Internet
                     socket.SOCK_DGRAM) # UDP
sock.bind((UDP_IP, UDP_PORT))

# HTTP Request configuration
url = 'http://localhost:3000/api/v1/user/addLocation'
headers = {'Content-Type': 'application/json'}

# Message Structure
# Hour:Min:Day:Month:Year:Lat:Lng:NumberOfRpm:TruckName
# Message example
# data = "14:30:5:4:2019:39.65765:-74.74267:841:Daza1"

while True:
    data, addr = sock.recvfrom(1024) # buffer size is 1024 bytes
    data = data.decode("utf-8")
    print ("Received data:" + data)
    data = data.split(sep=":")
    time = data[0] + ":" + data[1]
    date = data[2]+"-"+ data[3] + "-" + data[4]
    lat = data[5]
    lng = data[6]
    rpm = data[7]
    truckname = data[8]
    payload = {
            'time': time, 
            'date': date, 
            'lat': lat, 
            'lng': lng, 
            'rpm': rpm,
            'truckname': truckname 
            }
    print("Payload to send:")
    print(payload)
    r = requests.post(url, headers=headers, data=json.dumps(payload))