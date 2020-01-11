import json
import datetime

#read the json file with json library convert it to dictionary and with key 'created' change the value and save it
#read json from a file
f = open('Murder-on-the-2nd-Floor-Raw-Data.json')
data = json.load(f)
f.close()

class list_data: 
    def __init__(self, time, device, device_id, event, guest_id): 
        self.time = time
        self.device = device
        self.device_id = device_id
        self.event = event 
        self.guest_id = guest_id
    
    #def myfunc(self):
    #   print(self.time + " " + self.device_id + " " + self.device + " " + self.event + " " + self.guest_id)

#creating list
list = [] 

#append json into a list 
for (time, v) in data.items():
    #Convert Epoch to human readable Datetime 
    readable_datetime = datetime.datetime.fromtimestamp(int(time)).strftime('%Y-%m-%d %H:%M:%S')
    list.append(list_data(readable_datetime, v["device"], v["device-id"], v["event"], v["guest-id"]))

#search through the 
for i in list:
    if i.time == "2020-01-05 09:23:30":
        print(i.time, i.device, i.device_id, i.event, i.guest_id, sep =' ')
        #print(obj.time, obj.device, sep = ' ')


    
    
    

