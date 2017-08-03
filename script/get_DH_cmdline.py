import sys, json, re
# from input import Input
from python_session import Psession

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
    session_obj.data['DTHyperlink'] = session_obj.DTHlink
    session_obj.data['DTHyperlink'] =  re.sub(r'[^\x00-\x7F]','',session_obj.data['DTHyperlink'].decode('ascii','ignore'))
    session_obj.data['line_no'] = int(session_obj.DTHline)
    session_obj.data['col_no'] = int(session_obj.DTHcol)
    #input_obj = Input(session_obj)
    #session_obj.response = input_obj.take_input()
    #tiledlist = [session_obj.response]
    response = {"tiledlist":[{'Script': [], 'Process': [u"Check if Customer's Phone Banking access is blocked in Finesse or Unified Desktop-Quick Actions-Channel One View"], 'Text': [], 'col_no': [14, 14], 'line_no': [73, 73], 'Step_list': [], 'Tooltip': [], 'topic': u'Cheque book request', 'current_step': '', 'type': 'DTHyperlink', 'DTHyperlink': [u'Phone Banking access is not blocked', u'Phone Banking access is blocked']}], 'session_obj_data':session_obj.__dict__}
    print(json.dumps(response))

#start process
if __name__ == '__main__':
    main()