from context_management import Context_Management
from user_input_proc import User_Input_Proc
from response_generation import Response_Generation
from process_tree import Process_Tree
import pymysql, json
import global_variable
import sys
import re, requests, ast
import pandas as pd
from pandas.io.json import json_normalize
from xlrd import open_workbook
import datetime
from pymongo import MongoClient
# from spellchecker import get_fil_out, dictionary_of_improper_words

reload(sys)
sys.setdefaultencoding('utf8')

class Input(object):
    
    def __init__(self,session_obj):
        self.session_obj = session_obj
    
    def take_input(self):
        print("Inside take_input function")
        db = pymysql.connect(host=global_variable.db_host, user=global_variable.db_user, passwd=global_variable.db_passwd, db=global_variable.db_dbname)
        client = MongoClient(global_variable.db_host,global_variable.mongo_port)
        mongo_db = client[global_variable.db_dbname]
        cursor = db.cursor()
        nouns=[]
        verbs=[]
        match_rows=[]
        match_cols=[]
        topic=''
        sub_topic=''
        topic_destination=''
        context=''
        row_wise_frequency=[]
        existing_cache_file = pd.read_csv(global_variable.cache_file)
        print('Inside Input Function : ' + datetime.datetime.now().strftime("%H:%M:%S"))
        #Spell checking
#         if('Text' in self.session_obj.data):cmd

#             self.session_obj.data['Text'] = dictionary_of_improper_words(self.session_obj.data.get('Text',''))
#             self.session_obj.data['Text'] = get_fil_out(self.session_obj.data.get('Text',''))
        df = existing_cache_file[existing_cache_file['InputText'].str.lower().isin([self.session_obj.data.get('Text','').strip().lower()])]
        if(df.shape[0]>0):
            df = df[['InputText','id','Text','type']]
            response = json.loads(df.to_json(orient='records'))[0]
            response['Text'] = re.sub('\n\n+$','\n',re.sub('\n\n+','\n\n',re.sub('\r\n+','\n',re.sub('\r+','\r',response['Text']))))
            # print("Response from cache")
            return response
        cm_obj = Context_Management(self.session_obj)
        if(self.session_obj.response_type=="form_query"):
            #first store the session_obj.data and then replace it.
            self.session_obj.form_input_dict[self.session_obj.form_input_list[-1]] = self.session_obj.data['Text']
            #We can change the line_no and col_no to the previous one and pass through generate_response.
#             query1 = 'Select exists (Select * from cust_info where Session_Id=%s)'
#             try:
#                 cursor.execute(query1,str(self.session_obj.id_string))
#             except Exception,e:
#                 print('Error in cust_info Exists query execution: ', e)
#                 return None
#             frow = cursor.fetchone()
#             result = frow[0]
#             if(result == 1):
#                 #update
#                 str1 = 'UPDATE cust_info SET '
#                 l1 = []
#                 for i in self.session_obj.form_input_dict:
#                     s1 = "`" + i + "`='" + self.session_obj.form_input_dict[i] + "'"
#                     l1.append(s1)
#                 str2 = ",".join(l1) + " where Session_Id = '" + str(self.session_obj.id_string) + "'"
#                 print("Update Query")
#                 print(str1 + str2)
#             else:
#                 #Insert
#                 str1 = 'INSERT INTO cust_info ('
#                 str2 = "`" + "`,`".join(self.session_obj.form_input_dict.keys()) + "`) values ("
#                 str3 = "'" + "','".join(self.session_obj.form_input_dict.values()) + "') where Session_Id = '" + str(self.session_obj.id_string) + "'"
#                 
#                 print("Insert Query")
#                 print(str1 + str2 + str3) 
#             del(s1)
#             del(l1)
            self.session_obj.form_input_dict[self.session_obj.form_input_type] = self.session_obj.data['Text'] 
            self.session_obj.data['DTHyperlink'] = self.session_obj.form_category
            self.session_obj.data['line_no'] = self.session_obj.gb_dt_current_cursor_row
            self.session_obj.data['col_no'] = self.session_obj.gb_dt_current_cursor_col
        if("DTHyperlink" in self.session_obj.data):
            print("self.session_obj.data : ",self.session_obj.data)
            pt_obj = Process_Tree(self.session_obj)
            print('Inside DTHyperlink Function : ' + datetime.datetime.now().strftime("%H:%M:%S"))
            self.session_obj.response, self.session_obj.response_type = pt_obj.generate_responses(db,self.session_obj.id_string, self.session_obj.data, self.session_obj.data['line_no'], self.session_obj.data['col_no'])
            self.session_obj.response.update({'topic':self.session_obj.gb_topic})
            input_type='DTHyperlink'
            print('Done with DTHyperlink Function : ' + datetime.datetime.now().strftime("%H:%M:%S"))
        elif('Text' in self.session_obj.data):
            user_ip_proc_obj = User_Input_Proc()
            print('Before user_input_proc Function : ' + datetime.datetime.now().strftime("%H:%M:%S"))
            input_type = user_ip_proc_obj.get_input_type(self.session_obj.data['Text'])
            print('After user_input_proc Function : ' + datetime.datetime.now().strftime("%H:%M:%S"))
            print('Before nouns/verbs Function : ' + datetime.datetime.now().strftime("%H:%M:%S"))
            nouns, verbs, context = user_ip_proc_obj.separate_nouns_n_verbs(self.session_obj.data)
            print('After nouns/verbs Function : ' + datetime.datetime.now().strftime("%H:%M:%S"))
#             print nouns
            print('Before Topic determination Function : ' + datetime.datetime.now().strftime("%H:%M:%S"))
            self.session_obj.topic, self.session_obj.sub_topic, self.session_obj.topic_destination=cm_obj.topic_determination(db, nouns, verbs, self.session_obj.data, self.session_obj.response, self.session_obj.response_type)
            print("topic,sub_topic, topic_destination : ",self.session_obj.topic, self.session_obj.sub_topic, self.session_obj.topic_destination)
            print('After Topic determination Function : ' + datetime.datetime.now().strftime("%H:%M:%S"))
            self.session_obj.gb_topic = self.session_obj.topic
            print('Before Set topic Function : ' + datetime.datetime.now().strftime("%H:%M:%S"))
            cm_obj.setting_current_topic(db,self.session_obj.id_string, self.session_obj.topic, self.session_obj.sub_topic, self.session_obj.topic_destination)
            print('After Set topic Function : ' + datetime.datetime.now().strftime("%H:%M:%S"))
            if self.session_obj.topic=='' and self.session_obj.sub_topic=='' and self.session_obj.topic_destination=='':
                self.session_obj.response, self.session_obj.response_type=cm_obj.multiple_matches()
            else:
                rp_obj = Response_Generation(self.session_obj)
                print('Before Response Gen Function : ' + datetime.datetime.now().strftime("%H:%M:%S"))
                self.session_obj.response, self.session_obj.response_type, nouns, verbs, match_rows, match_cols,row_wise_frequency = rp_obj.response_generation(db,mongo_db,self.session_obj.id_string,self.session_obj.data['Text'],nouns,verbs,self.session_obj.data, self.session_obj.gb_topic, self.session_obj.sub_topic, self.session_obj.topic_destination)
                print('After Response Gen Function : ' + datetime.datetime.now().strftime("%H:%M:%S"))
            if "Process Tree" in self.session_obj.response_type:
                user_input_type="Process Tree"
        print('Before Set context Function : ' + datetime.datetime.now().strftime("%H:%M:%S"))
#         cm_obj.setting_current_context(db,self.session_obj.id_string,self.session_obj.data, input_type, nouns, verbs, topic, topic_destination, self.session_obj.response,self.session_obj.response_type,context, match_rows, match_cols,row_wise_frequency)
#         print self.session_obj.response
        print('After Set context Function : ' + datetime.datetime.now().strftime("%H:%M:%S"))
        # if(('DTHyperlink' in self.session_obj.data) | ('Image' in self.session_obj.response.get('tiledlist',[''])[0])|('data_row' in self.session_obj.response)|('Process' in self.session_obj.response)):
            # pass
        # else:
#             self.session_obj.response['InputText'] = self.session_obj.data['Text']
#             self.session_obj.response['id'] = self.session_obj.data['id']
#             temp = json_normalize(self.session_obj.response)
#             temp = temp[['InputText','id','Text','type']]
#             existing_cache_file = existing_cache_file.append(temp)
#             existing_cache_file.to_csv(global_variable.cache_file,encoding='utf-8',index=False)
            # pass
        self.session_obj.response.update({'topic':self.session_obj.gb_topic})
        return self.session_obj.response
    
    def take_SR_CRN(self,number_type):
        number = self.session_obj.data['Text']
        s1 = ''
        try:
            if(number_type == 'SR'):
                df = pd.read_excel(global_variable.framework_excel_path+'Data_SR_Creation.xlsx',sheet='Sheet1')
                df = df[df['SR Number'].isin([int(number)])]
                for i in df.columns.tolist():
                    s1 = s1 + '<strong>' +  i + '</strong> :  ' + str(df[i].iloc[0]) + '<br>'
                s1 = s1[:-4]
            elif(number_type == 'CRN'):
                df = pd.read_excel(global_variable.framework_excel_path+'Data_CRN_Topics.xlsx',sheet='Sheet1')
                df = df[df['CRN'].isin([number])]
                for i in df.columns.tolist():
                    s1 = s1 + '<strong>' +  i + '</strong> :  ' + str(df[i].iloc[0]) + '<br>'
                s1 = s1[:-4]
        except Exception,e:
            print("error message : ", e)
            s1 = 'No records found !!'
        self.session_obj.response.update({'Result':s1})
        return self.session_obj.response
    
    def create_content_index(self): 
        advanced_book = open_workbook(global_variable.framework_excel_path + 'Advanced_topic_mapping.xlsx')
        topic_sheet = advanced_book.sheet_by_name('Sheet1')
        first_column = topic_sheet.col_values(0)
        X = []
        content_nest = {}
        for i in range(len(first_column)):
            X.append(filter(None,topic_sheet.row_values(i)[:7]))
#             if('' != first_column[i]):
#                 continue
#             else:
#                 X.append(filter(None,topic_sheet.row_values(i)[:7]))
        for path in X:
            current_level = content_nest
            for part in path:
                if part not in current_level:
                    current_level[part] = {}
                current_level = current_level[part]
        return content_nest
    
    def create_tabs(self,value):
        print("Value : ",value)
        tab_mapp_book = open_workbook(global_variable.framework_excel_path + 'Tab_mapping.xlsx')
        tab_mapp_sheet = tab_mapp_book.sheet_by_name('Sheet1')
        first_column = tab_mapp_sheet.col_values(0)
        for iterator in range(len(first_column)):
            row = tab_mapp_sheet.row_values(iterator)
            if(row[0] == value):
                tab_data_dest = row[3]
                break
            else:
                tab_data_dest = ''
        tab_data_book = pd.read_excel(tab_data_dest,sheet='Sheet1',header=None)
        tab_data = {}
        tab_data['elements'] = tab_data_book[1].tolist()
        tab_data['element_values'] = tab_data_book[2].tolist()
        print(tab_data)
        return tab_data
    
    def microsoft_api(self):
        url = 'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/4d24981a-59e0-458e-b576-50c3002dfe3b/generateAnswer'
        headers = {
            "Ocp-Apim-Subscription-Key":"21cf18024dee4d128ff9fda99867eec4",
            "Content-Type":"application/json"
        }
        # Adding empty header as parameters are being sent in payload
        payload = {"question":self.session_obj.data['Text']}
        print("self.session_obj.data['Text']" , self.session_obj.data['Text'])
        r = requests.post(url, data=json.dumps(payload), headers=headers)
        print(r.content)
        microsoft_response = ast.literal_eval(r.content)['answers'][0]['answer']
        microsoft_score = ast.literal_eval(r.content)['answers'][0]['score']
        response = {}
        response['Text'] = self.replace_url_to_link(microsoft_response)
        if('No good match found in the KB' in response['Text'] or microsoft_score < 55):
            raise Exception
        response['type'] = 'text' 
        return response
    
    def replace_url_to_link(self,value):
        # Replace url to link
        urls = re.compile(r"((https?):((//)|(\\\\))+[\w\d:#@%/;$()~_?\+-=\\\.&]*)", re.MULTILINE|re.UNICODE)
        value = urls.sub(r'<a href="\1" target="_blank">\1</a>', value)
        # Replace email to mailto
        urls = re.compile(r"([\w\-\.]+@(\w[\w\-]+\.)+[\w\-]+)", re.MULTILINE|re.UNICODE)
        value = urls.sub(r'<a href="\1">\1</a>', value)
        return value
        