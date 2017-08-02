import sys, json
#from input import Input
from python_session import Psession
#from user_input_proc import User_Input_Proc

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():
    #get our data as an array from read_in()
    node_json = read_in()
    session_obj = Psession(**node_json)
    #Generate response
# 
#     input_obj = Input(session_obj)
#     user_ip_proc_obj = User_Input_Proc()
#     input_type = user_ip_proc_obj.get_input_type(session_obj.data['Text'])
#     if(input_type == 'Question'):
#         try:
#             session_obj.response = input_obj.microsoft_api()
#         except Exception,e:
#             print("Error",e)
#             session_obj.response = input_obj.take_input()
#             session_obj.response['sessionId'] = session_obj.id_string
#     else:
#         session_obj.response = input_obj.take_input()
#         session_obj.response['sessionId'] = session_obj.id_string
#     if('tiledlist' in session_obj.response):
#         for di in session_obj.response['tiledlist']:
#             di['Image'] = di['Image'].split("kotak2")[1]
#             di['Image'] = di['Image'].replace("\\","/")
#             di['Image'] = ".."+di['Image']
#         response = {"tiledlist":session_obj.response}
#     else:
#         print(session_obj.response.keys())
#         tiledlist=''
#         tiledlist = session_obj.response
#         response = {"tiledlist":[tiledlist]}
    response = {'tiledlist': [{'topic': u'ATM Locator', 'Text': u'The details for your query are provided below\n<strong>Location Name : </strong>Thane \u2013 Kalyan  \n<strong>Address : </strong>Kamla Tower, Santoshi Mata Road,Ram Baug Lane No. 1,Kalyan (W), Thane 421301\n\n<strong>Location Name : </strong>Thane - Kalyan Murbad Road  \n<strong>Address : </strong>Shop No. 3, Ground floor, \u201cAshtashree Apartment\u201d, S. No. 3194-B (P) opposite Reliance Web World, Kalyan Murbad Road, Kalyan (West) - 421301, District Thane.\n\n', 'sessionId': 1896, 'type': 'text'}]}
    print(json.dumps(response))
#     print(json.dumps(session_obj.__dict__))

#start process
if __name__ == '__main__':
    main()
