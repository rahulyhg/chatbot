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
    #response = {'tiledlist': [{'topic': u'ATM Locator', 'Text': u'The details for your query are provided below\n<strong>Location Name : </strong>Thane \u2013 Kalyan  \n<strong>Address : </strong>Kamla Tower, Santoshi Mata Road,Ram Baug Lane No. 1,Kalyan (W), Thane 421301\n\n<strong>Location Name : </strong>Thane - Kalyan Murbad Road  \n<strong>Address : </strong>Shop No. 3, Ground floor, \u201cAshtashree Apartment\u201d, S. No. 3194-B (P) opposite Reliance Web World, Kalyan Murbad Road, Kalyan (West) - 421301, District Thane.\n\n', 'sessionId': 1896, 'type': 'text'}]}
    #response = {'tiledlist': [{'topic': u'dc limit individual', 'data_row':[u'RuPay Non-Chip/RCD', u'Classic/VD', u'Classic Chip/EVD', u'Gold/VDG', u'Gold Chip/EDG', u'Business Gold/VBG', u'Business Gold Chip/EBG', u'Platinum Chip/EDP', u'Business Platinum Chip/EBP', u'Privy Prima Platinum Chip/ECP', u'Privy Magna Platinum Chip/EPP', u'NR Privy Prima Platinum Chip/ENP', u'Business Power Platinum Chip/EAP', u'Privy Business Platinum Chip/EPB', u'Optima Signature Chip/ESD', u'NR Signature Chip/ESN', u'Insignia Signature Chip/ESI', u'Infinite Chip/EID'], 'sessionId': 1223, 'data_col': [u'K_EASY - Kotak Easy/RCD', u'K_EDGE - Kotak Edge/VD/ EVD', u'K_ONE - Kotak One/EDP', u'K_PLUS - Kotak Plus/EDP', u'K_NROTH - NRE/NRO/VD-D for NRO', u'EDN for NRE', u'K_PLO - Prima /ECP', u'K_ASC - Prima/ECP', u'ASCNR - Prima NR/ENP', u'K_PL - Magna /EPP', u'K_PNRI - Magna NR/EPP', u'KPLOP - Optima/ESD', u'K_PLB - Optima /ESD', u'OPTNR - Optima NR/ESN', u'K_PLI - Insignia/ESI', u'K_WM - Wealth MGT/EID'],'row_name': u'Debit card','col_name': u'Account','type': 'rate card'}]}
    #response={'tiledlist': [{'sub_topic_list': [u'Cheque book request', u'Request', u'', u'', u'', u'', u''], 'Script': [], 'Process': [], 'Text': u"Sure Sir, I'll help you with the same\n", 'col_no': [12, 12], 'line_no': [1, 1], 'Tooltip': [], 'topic': u'Cheque book request', 'current_sub_step': '', 'sessionId': 1898, 'sub_step_list': [], 'type': 'DTHyperlink', 'DTHyperlink': [u'IVR Validated', u'Non IVR Validated']}]}
    response = {'tiledlist': [{'topic': u'Debit Card Reports', 'imagelist':[{ 
                                        'Text': ' 1.0  Step 1: Click on the link Channels One View\xe2\x80\x9d\n', 
                                        'Image': 'http://35.161.160.7:8092/static/temp_session_files/1223/Temp/image-001.png', 
                                        'type': 'Image'
                                    }, 
                                    {
                                        'Text': ' 2.0 Step 2 Option 1: Select "Debit Card Details - IST"\n\n', 
                                        'Image': 'http://35.161.160.7:8092/static/temp_session_files/1223/Temp/image-002.png', 
                                        'type': 'Image'
                                    }, 
                                    {
                                        'Text': ' Step 2 Option 2: Enter the DC# Directly\n\n', 
                                        'Image': 'http://35.161.160.7:8092/static/temp_session_files/1223/Temp/image-003.png', 
                                        'type': 'Image'
                                    }, 
                                    {
                                        'Text': ' 3.0 How to Read the Report?\n\n', 
                                        'Image': 'http://35.161.160.7:8092/static/temp_session_files/1223/Temp/image-004.png', 
                                        'type': 'Image'
                                    }, 
                                    #{ 'Text': '', 'Image': 'http://35.161.160.7:8092/static/temp_session_files/1223/Clipboard/image-001.png', 'type': 'Image'}, 
                                        #{'Text': '', 'Image': 'http://35.161.160.7:8092/static/temp_session_files/1223/Clipboard/image-002.png', 'type': 'Image'}, 
                                        #{'Text': '', 'Image': 'http://35.161.160.7:8092/static/temp_session_files/1223/Clipboard/image-003.png', 'type': 'Image'}, 
                                        #{'Text': '', 'Image': 'http://35.161.160.7:8092/static/temp_session_files/1223/Clipboard/image-004.png', 'type': 'Image'},
                                        #{'Text': '', 'Image': 'http://35.161.160.7:8092/static/temp_session_files/1223/Clipboard/image-005.png', 'type': 'Image'}
                                ], 
                    'sessionId': 1223, 
                    'type': 'Instruction'
                }], 'session_obj_data':session_obj.__dict__
            }

    print(json.dumps(response))
#     print(json.dumps(session_obj.__dict__))

#start process
if __name__ == '__main__':
    main()
