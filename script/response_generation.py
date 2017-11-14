from xlrd import open_workbook
import process_image_instructions, schedule_of_charges_finding_topic
from csv_row_matching import Csv_Row_Matching
from user_input_proc import User_Input_Proc
from process_tree import Process_Tree
# from bson.json_util import dumps
import json, datetime

class Response_Generation(object):
    
    def __init__(self,session_obj):
        self.session_obj = session_obj
        
    def response_generation(self,db, mongo_db, session_id, user_input, nouns,verbs,input_type, topic, sub_topic, topic_destination):
        cursor_context_table=db.cursor()
        cursor_current_topic_tree=db.cursor()
        cursor_context_table.execute("SELECT * FROM context_table")
        cursor_current_topic_tree.execute("SELECT * FROM current_topic_tree")
        current_topic_data=cursor_current_topic_tree.fetchall()
        context_table_data=cursor_context_table.fetchall()
        match_rows=[]
        match_cols=[]
        row_wise_frequency=[]
        
        crm_obj = Csv_Row_Matching()
        #### Taking into account details entered by the user earlier
        if topic=='' or topic==' ':
            for iterator in range (len(current_topic_data)-1,1,-1):
                if current_topic_data[len(current_topic_data)-1][0]==current_topic_data[iterator-1][0]: # To check if session_id is the same
                    if current_topic_data[iterator-1][1]!='' and current_topic_data[iterator-1][1]!=' ':# To check if highlevel category is the same
                        topic=current_topic_data[iterator-1][1]
                        break
                else:
                    break
        if sub_topic=='' or sub_topic==' ':
            for iterator in range (len(current_topic_data)-1,1,-1):
                if current_topic_data[len(current_topic_data)-1][0]==current_topic_data[iterator-1][0]: # To check if session_id is the same
                    if topic==current_topic_data[iterator-1][1]:# To check if highlevel category is the same
                        if current_topic_data[iterator-1][2]!='' and current_topic_data[iterator-1][2]!=' ':
                            sub_topic=current_topic_data[iterator-1][2]
                            break
                else:
                    break
        if topic_destination=='' or topic_destination==' ':
            for iterator in range (len(current_topic_data)-1,1,-1):
                if current_topic_data[len(current_topic_data)-1][0]==current_topic_data[iterator-1][0]: # To check if session_id is the same
                    if topic==current_topic_data[iterator-1][1]:# To check if highlevel category is the same
                        if current_topic_data[iterator-1][3]!='' and current_topic_data[iterator-1][3]!=' ':
                            topic_destination=current_topic_data[iterator-1][3]
                            break
                else:
                    break
    
        if topic_destination!='':
            print(topic, sub_topic, topic_destination)
            print('Before opening excel : ' + datetime.datetime.now().strftime("%H:%M:%S"))
            book=open_workbook(topic_destination, on_demand=True)
            print('After opening excel : ' + datetime.datetime.now().strftime("%H:%M:%S"))
            master_info_sheet = book.sheet_by_name('Sheet2')
            print('After reading master : ' + datetime.datetime.now().strftime("%H:%M:%S"))
            if "Tabular Info" in master_info_sheet.cell(0,1).value:
                data_sheet=book.sheet_by_name('Sheet1')
                response_text, response_type, match_rows, match_cols = crm_obj.response_generation_tabular(db, session_id, master_info_sheet, data_sheet, user_input, nouns, verbs,topic, topic_destination)#, match_rows)
                response={}
                response['type']='text'
                response['Text']=response_text
            elif "old format" in master_info_sheet.cell(0,1).value:
                response, response_type,match_rows,row_wise_frequency=self.old_format_processing_updated(db,session_id, user_input, nouns,verbs,input_type, topic, sub_topic, topic_destination)
            elif "Process Tree" in master_info_sheet.cell(0,1).value:
                data_sheet=book.sheet_by_name('Sheet1')
                pt_obj = Process_Tree(self.session_obj)
#                 response, response_type = pt_obj.generate_first_response_mongo(mongo_db, session_id, 'cheque_book_request', user_input, nouns, verbs, topic)
#                 response = json.loads(dumps(response))
                response, response_type = pt_obj.generate_first_response(db,session_id, topic_destination, user_input, nouns, verbs,topic)
            elif "Instruction" in  master_info_sheet.cell(0,1).value:
                response, response_type = process_image_instructions.process_sheet(topic, sub_topic, topic_destination,session_id)
            elif "List Info" in master_info_sheet.cell(0,1).value:
                data_sheet=book.sheet_by_name('Sheet1')
                response, response_type, match_rows, match_cols = crm_obj.response_generation_list(db, session_id, master_info_sheet, data_sheet, user_input, nouns, verbs,topic, topic_destination)#, match_rows)
            elif "new format" in  master_info_sheet.cell(0,1).value:
                response, response_type,match_rows,row_wise_frequency=self.new_format_processing(db,session_id, user_input, nouns,verbs,input_type, topic, sub_topic, topic_destination)
            elif "rate card" in  master_info_sheet.cell(0,1).value:
                response, response_type=self.new_rate_card_procesing(db,session_id, user_input, nouns,verbs,input_type, topic, sub_topic, topic_destination)
            elif "FAQ" in master_info_sheet.cell(0,1).value:
                response, response_type = self.new_rate_card_procesing(db,session_id, user_input, nouns,verbs,input_type, topic, sub_topic, topic_destination)
        return response, response_type, nouns, verbs, match_rows, match_cols,row_wise_frequency
    
    def new_rate_card_procesing(self,db,session_id, user_input, nouns,verbs,input_type, topic, sub_topic, topic_destination):
        response={}
        book=open_workbook(str(topic_destination), on_demand=True)
        data_sheet=book.sheet_by_name('Sheet1')
        print("self.session_obj.response_type : ",self.session_obj.response_type)
        if self.session_obj.response_type=='rc_further query':
            col_value ,row_value = user_input.split(",")
            print("col_value ,row_value : ",col_value ,row_value)
            data_col = data_sheet.col_values(0)
            data_row = data_sheet.row_values(0)
            col_index = ''
            row_index = ''
            for iterator in range(len(data_col)):
                if(col_value == data_col[iterator]):  
                    row_index = iterator
            for iterator in range(len(data_row)):
                if(row_value == data_row[iterator]):  
                    col_index = iterator
            print("row_index,col_index : ",row_index,col_index)
            response['Text'] = data_sheet.cell(row_index,col_index).value
            response['type']='text'
            response_type= 'rc_further query'
        else:
            master_sheet=book.sheet_by_name('Sheet2')
            col_name = master_sheet.cell(1,1).value
            row_name = master_sheet.cell(2,1).value
            data_col = data_sheet.col_values(0)
            data_row = data_sheet.row_values(0)
            data_col.remove('')
            data_row.remove('')
            response['type']='rate card'
            response['data_col'] = data_col
            response['data_row'] = data_row
            response['col_name'] = col_name
            response['row_name'] = row_name
            response_type = 'rc_further query'
        return response,response_type
    def rate_card_processing(self,db,session_id, user_input, nouns,verbs,input_type, topic, sub_topic, topic_destination):
        match_rows=self.session_obj.gb_matched_row_values
        match_cols=self.session_obj.gb_matched_col_values
        response={}
        book=open_workbook(str(topic_destination), on_demand=True)
        sheet=book.sheet_by_name('Sheet1')
        master_sheet=book.sheet_by_name('Sheet2')
        crm_obj = Csv_Row_Matching()
        if self.session_obj.response_type=='rc_further query':
            #topic_destination=current_topic_data[len(current_topic_data)-2][3]
            if len(match_rows)==1 and len(match_cols)==0:
                new_match_rows,row_wise_frequency, match_cols, col_wise_frequency=crm_obj.finding_rows_n_cols_with_matching_nouns_n_verbs_rate_card(sheet,nouns,verbs)
                if len(match_cols)==1:
                    response['type']='text'
                    response['Text']=sheet.cell(match_rows[0],match_cols[0]).value
                    response_type= 'details provided'
                elif len(match_cols)>1:
                    response['type']='text'
                    response['Text']='Which of the following are you looking for:\n'
                    for iterator in range(len(match_cols)):
                        col=sheet.col(match_cols[iterator])
                        if iterator==len(match_cols)-1:
                            response['Text']=response['Text']+col[0].value+'\n'
                        else:
                            response['Text']=response['Text']+col[0].value+'; or\n'
                    response_type='rc_further options'
                if len(new_match_rows)>0:
                    match_rows=new_match_rows
            elif len(match_cols)==1 and len(match_rows)==0:
                match_rows,row_wise_frequency, new_match_cols, col_wise_frequency=crm_obj.finding_rows_n_cols_with_matching_nouns_n_verbs_rate_card(sheet,nouns,verbs)
                if len(match_rows)==1:
                    response['type']='text'
                    response['Text']=sheet.cell(match_rows[0],match_cols[0]).value
                    response_type= 'details provided'
                elif len(match_rows)>1:
                    response['type']='text'
                    response['Text']='Which of the following are you looking for:\n'
                    for iterator in range(len(match_rows)):
                        row=sheet.col(match_rows[iterator])
                        if iterator==len(match_rows)-1:
                            response['Text']=response['Text']+row[0].value+'\n'
                        else:
                            response['Text']=response['Text']+row[0].value+'; or\n'
                    response_type='rc_further options'
                if len(new_match_cols)>0:
                    match_cols=new_match_cols
            elif len(match_cols)==0 and len(match_rows)==0:
                match_rows,row_wise_frequency, match_cols, col_wise_frequency=crm_obj.finding_rows_n_cols_with_matching_nouns_n_verbs_rate_card(sheet,nouns,verbs)
                if len(match_rows)==1:
                    response['type']='text'
                    response['Text']='Please enter details for the '+master_sheet.cell(1,1).value+' type'
                    response_type='rc_further query'
                elif len(match_cols)==1:
                    response['type']='text'
                    response['Text']='Please enter details for the '+master_sheet.cell(1,2).value+' type'
                    response_type='rc_further query'
                elif len(match_rows)>1:
                    response['type']='text'
                    response['Text']='Which of the following are you looking for:\n'
                    col=sheet.col(0)
                    for iterator in range(len(match_rows)):
                        if iterator == len(match_rows)-1:
                            response['Text']=response['Text']+col[match_rows[iterator]].value
                        else:
                            response['Text']=response['Text']+col[match_rows[iterator]].value+'; or\n'
                    response_type='rc_further options'
                elif len(match_cols)>1:
                    response['type']='text'
                    response['Text']='Which of the following are you looking for:\n'
                    row=sheet.row(0)
                    for iterator in range(len(match_cols)):
                        if iterator == len(match_cols)-1:
                            response['Text']=response['Text']+row[match_cols[iterator]].value
                        else:
                            response['Text']=response['Text']+row[match_cols[iterator]].value+'; or\n'
                    response_type='rc_further options'
    
        elif self.session_obj.response_type=='rc_further options':
            new_matched_row=[]
            new_matched_column=[]
            if len(match_rows)>1:#First checking for right rows
                new_match_rows,new_row_wise_frequency=crm_obj.finding_rows_with_matching_reply_rate_card(sheet,self.session_obj.response['Text'],user_input, match_rows)
                if len(new_match_rows)==1 and len(match_cols)==1:
                    match_rows=new_match_rows#means the response is proper
                    response['type']='text'
                    response['Text']=sheet.cell(match_rows[0],match_cols[0]).value
                    response_type= 'details provided'
                elif len(new_match_rows)>1:
                    response=self.session_obj.response
                    response['Text']='Did not understand your input \n' + response['Text']
                    response_type='rc_further options'
                elif len(new_match_rows)==1 and len(match_cols)>1:
                    match_rows=new_match_rows#means the response is proper
                    response['type']='text'
                    response['Text']='Which of the following are you looking for:\n'
                    row=sheet.row(0)
                    for iterator in range(len(match_cols)):
                        if iterator==len(match_cols)-1:
                            response['Text']=response['Text']+row[match_cols[iterator]].value
                        else:
                            response['Text']=response['Text']+row[match_cols[iterator]].value+'; or\n'
                    response_type='rc_further options'
                elif len(new_match_rows)==1 and len(match_cols)==0:
                    match_rows=new_match_rows#means the response is proper
                    response['type']='text'
                    response['Text']='Please enter details for the '+master_sheet.cell(2,1).value+' type'
                    response_type='rc_further query'
            if len(match_cols)>1:
                new_match_cols,new_col_wise_frequency=crm_obj.finding_cols_with_matching_reply_rate_card(sheet,self.session_obj.response['Text'],user_input, match_cols)
                if len(new_match_cols)==1 and len(match_rows)==1:
                    match_cols=new_match_cols#means the response is proper
                    response['type']='text'
                    response['Text']=sheet.cell(match_rows[0],match_cols[0]).value
                    response_type= 'details provided'
                elif len(new_match_cols)>1:
                    response=self.session_obj.response
                    response['Text']='Did not understand your input \n' + response['Text']
                    response_type='rc_further options'
                elif len(new_match_cols)==1 and len(match_rows)>1:
                    match_cols=new_match_cols#means the response is proper
                    response['type']='text'
                    response['Text']='Which of the following are you looking for:\n'
                    col=sheet.col(0)
                    for iterator in range(len(match_rows)):
                        if iterator==len(match_rows)-1:
                            response['Text']=response['Text']+col[match_rows[iterator]].value
                        else:
                            response['Text']=response['Text']+col[match_rows[iterator]].value+'; or\n'
                    response_type='rc_further options'
                elif len(new_match_cols)==1 and len(match_rows)==0:
                    match_cols=new_match_cols#means the response is proper
                    response['type']='text'
                    response['Text']='Please enter details of the '+master_sheet.cell(1,1).value+' type'
                    response_type='rc_further query'
        else:
            if topic_destination!=' ':
                match_rows,row_wise_frequency, match_cols, col_wise_frequency=crm_obj.finding_rows_n_cols_with_matching_nouns_n_verbs_rate_card(sheet,nouns,verbs)
                self.session_obj.gb_matched_row_values=match_rows
                self.session_obj.gb_matched_col_values=match_cols
                if len(match_rows)==1 and len(match_cols)==1:
                    response['type']='text'
                    response['Text']=sheet.cell(match_rows[0],match_cols[0]).value
                    response_type= 'details provided'
                elif len(match_rows)==1 and len(match_cols)==0:
                    response['type']='text'
                    response['Text']='Please enter details of the '+master_sheet.cell(2,1).value+' type'
                    response_type='rc_further query'
                elif len(match_cols)==1 and len(match_rows)==0:
                    response['type']='text'
                    response['Text']='Please enter details of the '+master_sheet.cell(1,1).value+' type'
                    response_type='rc_further query'
                elif len(match_rows)>1:#First checking for right rows
                    response['type']='text'
                    response['Text']='Which of the following are you looking for:\n'
                    col=sheet.row(0)
                    for iterator in range(len(match_rows)):
                        if iterator==len(match_rows)-1:
                            response['Text']=response['Text']+row[match_rows[iterator]].value
                        else:
                            response['Text']=response['Text']+row[match_rows[iterator]].value+'; or\n'
                    response_type='rc_further options'
                elif len(match_cols)>1:
                    response['type']='text'
                    response['Text']='Which of the following are you looking for:\n'
                    row=sheet.row(0)
                    for iterator in range(len(match_cols)):
                        if iterator==len(match_cols)-1:
                            response['Text']=response['Text']+row[match_cols[iterator]].value
                        else:
                            response['Text']=response['Text']+row[match_cols[iterator]].value+'; or\n'
                    response_type='rc_further options'
                elif len(match_cols)==0 and len(match_rows)==0:
                    response['type']='text'
                    response['Text']='Please enter details of the '+master_sheet.cell(2,1).value+' type'
                    response_type='rc_further query'
    
        if response_type=='details provided':
            self.session_obj.gb_matched_row_values=[]
            self.session_obj.gb_matched_col_values=[]
        else:
            self.session_obj.gb_matched_row_values=match_rows
            self.session_obj.gb_matched_col_values=match_cols
        if(type(response['Text'])!=str):
            response['Text'] = str(response['Text'])
        return response,response_type
    
    
    def new_format_processing(self,db,session_id, user_input, nouns,verbs,input_type, topic, sub_topic, topic_destination):
        cursor_context_table=db.cursor()
        cursor_current_topic_tree=db.cursor()
        cursor_context_table.execute("SELECT * FROM context_table")
        cursor_current_topic_tree.execute("SELECT * FROM current_topic_tree")
        current_topic_data=cursor_current_topic_tree.fetchall()
        context_table_data=cursor_context_table.fetchall()
        response_type=''
        crm_obj = Csv_Row_Matching()
        if session_id==context_table_data[len(context_table_data)-1][1] and context_table_data[len(context_table_data)-1][12]=="further query":
            #topic_destination=current_topic_data[len(current_topic_data)-2][3]
            book=open_workbook(topic_destination, on_demand=True)
            sheet = book.sheet_by_name('Sheet1')
            for iterator_match_rows in range (len(context_table_data)-1,0,-1):
                if int(context_table_data[iterator_match_rows][1])!=(current_topic_data[len(current_topic_data)-1][0]):
                    break
                if ',' in context_table_data[iterator_match_rows][14]:
                    match_rows=context_table_data[iterator_match_rows][14].split(',')
                    row_wise_frequency=context_table_data[iterator_match_rows][16].split(',')
                    earlier_response=json.loads(context_table_data[iterator_match_rows][13])['Text']
                    match_rows,row_wise_frequency=crm_obj.finding_rows_with_matching_nouns_n_verbs_new_format(sheet,earlier_response,user_input, match_rows,row_wise_frequency)
                    response, response_type = schedule_of_charges_finding_topic.new_format_finding_the_main_topic(db,sheet, match_rows, row_wise_frequency, topic, sub_topic, topic_destination)
                else:
                    match_rows=[]
                    row_wise_frequency=[]
                    match_rows.append(context_table_data[iterator_match_rows][14])
                    row_wise_frequency.append(context_table_data[iterator_match_rows][16])
                    response, response_type = schedule_of_charges_finding_topic.new_format_finding_the_main_topic(db,sheet, match_rows, row_wise_frequency, topic, sub_topic, topic_destination)
                    break
        elif session_id==context_table_data[len(context_table_data)-1][1] and context_table_data[len(context_table_data)-1][12]=="further options":
            book=open_workbook(topic_destination, on_demand=True)
            sheet = book.sheet_by_name('Sheet1')
            earlier_input=json.loads(context_table_data[len(context_table_data)-1][9])['Text']
            user_ip_proc_obj = User_Input_Proc()
            nouns, verbs, context = user_ip_proc_obj.separate_nouns_n_verbs(earlier_input)
            earlier_response=json.loads(context_table_data[len(context_table_data)-1][13])['Text']
            for iterator_match_rows in range (len(context_table_data)-1,0,-1):
                if int(context_table_data[iterator_match_rows][1])!=(current_topic_data[len(current_topic_data)-1][0]):
                    break
                if ',' in context_table_data[iterator_match_rows][14]:
                    match_rows=context_table_data[iterator_match_rows][14].split(',')
                    row_wise_frequency=context_table_data[iterator_match_rows][16].split(',')
                    earlier_response=json.loads(context_table_data[iterator_match_rows][13])['Text']
                    match_rows,row_wise_frequency=crm_obj.finding_rows_with_matching_reply(sheet,earlier_response,user_input, match_rows)
                    response, response_type = schedule_of_charges_finding_topic.new_format_finding_the_main_topic(db,sheet, match_rows, row_wise_frequency, topic, sub_topic, topic_destination)
        else:
            if topic_destination!=' ':
                book=open_workbook(str(topic_destination), on_demand=True)
                sheet=book.sheet_by_name('Sheet1')
                match_rows,row_wise_frequency=crm_obj.finding_rows_with_matching_nouns_n_verbs_old_format(sheet,nouns,verbs)
                response, response_type = schedule_of_charges_finding_topic.new_format_finding_the_main_topic(db,sheet, match_rows, row_wise_frequency,topic, sub_topic, topic_destination)
    
    
        return response,response_type,match_rows,row_wise_frequency
    
    def old_format_processing_updated(self,db,session_id, user_input, nouns,verbs,input_type, topic, sub_topic, topic_destination):
        cursor_context_table=db.cursor()
        cursor_current_topic_tree=db.cursor()
        cursor_context_table.execute("SELECT * FROM context_table")
        cursor_current_topic_tree.execute("SELECT * FROM current_topic_tree")
        current_topic_data=cursor_current_topic_tree.fetchall()
        context_table_data=cursor_context_table.fetchall()
        response_type=''
        crm_obj = Csv_Row_Matching()
        if session_id==context_table_data[len(context_table_data)-1][1] and context_table_data[len(context_table_data)-1][12]=="further query":
            #topic_destination=current_topic_data[len(current_topic_data)-2][3]
            book=open_workbook(topic_destination, on_demand=True)
            sheet = book.sheet_by_name('Sheet1')
            for iterator_match_rows in range (len(context_table_data)-1,0,-1):
                if int(context_table_data[iterator_match_rows][1])!=(current_topic_data[len(current_topic_data)-1][0]):
                    break
                if ',' in context_table_data[iterator_match_rows][14]:
                    match_rows=context_table_data[iterator_match_rows][14].split(',')
                    row_wise_frequency=context_table_data[iterator_match_rows][16].split(',')
                    earlier_response=json.loads(context_table_data[iterator_match_rows][13])['Text']
                    match_rows,row_wise_frequency=crm_obj.finding_rows_with_matching_nouns_n_verbs_old_format(sheet,earlier_response,user_input, match_rows,row_wise_frequency)
                    response, response_type = schedule_of_charges_finding_topic.finding_the_main_topic(db,sheet, user_input, nouns,match_rows, row_wise_frequency, topic, sub_topic, topic_destination)
                else:
                    match_rows=[]
                    row_wise_frequency=[]
                    match_rows.append(context_table_data[iterator_match_rows][14])
                    row_wise_frequency.append(context_table_data[iterator_match_rows][16])
                    response, response_type = schedule_of_charges_finding_topic.finding_the_main_topic(db,sheet, user_input, nouns,match_rows, row_wise_frequency, topic, sub_topic, topic_destination)
                    break
        elif session_id==context_table_data[len(context_table_data)-1][1] and context_table_data[len(context_table_data)-1][12]=="further options":
            book=open_workbook(topic_destination, on_demand=True)
            sheet = book.sheet_by_name('Sheet1')
            earlier_input=json.loads(context_table_data[len(context_table_data)-1][9])['Text']
            user_ip_proc_obj = User_Input_Proc()
            nouns, verbs, context = user_ip_proc_obj.separate_nouns_n_verbs(earlier_input)
            earlier_response=json.loads(context_table_data[len(context_table_data)-1][13])['Text']
            for iterator_match_rows in range (len(context_table_data)-1,0,-1):
                if int(context_table_data[iterator_match_rows][1])!=(current_topic_data[len(current_topic_data)-1][0]):
                    break
                if ',' in context_table_data[iterator_match_rows][14]:
                    match_rows=context_table_data[iterator_match_rows][14].split(',')
                    row_wise_frequency=context_table_data[iterator_match_rows][16].split(',')
                    earlier_response=json.loads(context_table_data[iterator_match_rows][13])['Text']
                    match_rows,row_wise_frequency=crm_obj.finding_rows_with_matching_reply(sheet,earlier_response,user_input, match_rows)
                    response, response_type = schedule_of_charges_finding_topic.finding_the_main_topic(db,sheet, user_input, nouns,match_rows, row_wise_frequency, topic, sub_topic, topic_destination)
        else:
            if topic_destination!=' ':
                book=open_workbook(str(topic_destination), on_demand=True)
                sheet=book.sheet_by_name('Sheet1')
                match_rows,row_wise_frequency=crm_obj.finding_rows_with_matching_nouns_n_verbs_old_format(sheet,nouns,verbs)
                response, response_type = schedule_of_charges_finding_topic.finding_the_main_topic(db,sheet, user_input, nouns,match_rows, row_wise_frequency,topic, sub_topic, topic_destination)
    
    
        return response,response_type,match_rows,row_wise_frequency
    
    def old_format_processing(self,db,session_id, user_input, nouns,verbs,input_type, topic, sub_topic, topic_destination):
        cursor_context_table=db.cursor()
        cursor_current_topic_tree=db.cursor()
        cursor_context_table.execute("SELECT * FROM context_table")
        cursor_current_topic_tree.execute("SELECT * FROM current_topic_tree")
        current_topic_data=cursor_current_topic_tree.fetchall()
        context_table_data=cursor_context_table.fetchall()
        response_type=''
        crm_obj = Csv_Row_Matching()
        #### Looking at different permutation combinations of earlier input vs current input vs earlier response, etc.
        if cursor_context_table.rowcount>0 and context_table_data[len(context_table_data)-1][1]==current_topic_data[len(current_topic_data)-1][0]:# to ensure we are looking at rows with same session id
            if input_type=="Info" and context_table_data[len(context_table_data)-1][8]=="Question":
                if current_topic_data[len(current_topic_data)-1][0]==current_topic_data[len(current_topic_data)-2][0] : # To check if session_id is the same
                    #if current_topic_data[len(current_topic_data)-1][1]==current_topic_data[len(current_topic_data)-2][1] and context_table_data[len(context_table_data)-1][12]=="further query":# To check if highlevel category is the same
                    if context_table_data[len(context_table_data)-1][12]=="details provided":
                        response="How can we help you with this"
                        response_type="assistance"
                    elif context_table_data[len(context_table_data)-1][12]=="further query":
                        #topic_destination=current_topic_data[len(current_topic_data)-2][3]
                        book=open_workbook(topic_destination, on_demand=True)
                        sheet = book.sheet_by_name('Sheet1')
                        for iterator_match_rows in range (len(context_table_data)-1,0,-1):
                            if int(context_table_data[iterator_match_rows][1])!=(current_topic_data[len(current_topic_data)-1][0]):
                                break
                            if ',' in context_table_data[iterator_match_rows][14]:
                                match_rows=context_table_data[iterator_match_rows][14].split(',')
                                row_wise_frequency=context_table_data[iterator_match_rows][15].split(',')
                                earlier_response=context_table_data[iterator_match_rows][13]
                                match_rows,row_wise_frequency=crm_obj.finding_rows_with_matching_reply(sheet,earlier_response,user_input, match_rows,row_wise_frequency)
                                response, response_type = schedule_of_charges_finding_topic.finding_the_main_topic(db,sheet, match_rows, row_wise_frequency, topic, sub_topic, topic_destination)
                            else:
                                match_rows=[]
                                row_wise_frequency=[]
                                match_rows.append(context_table_data[iterator_match_rows][14])
                                row_wise_frequency.append(context_table_data[iterator_match_rows][15])
                                response, response_type = schedule_of_charges_finding_topic.finding_the_main_topic(db,sheet, match_rows, row_wise_frequency, topic, sub_topic, topic_destination)
                                break
                    elif context_table_data[len(context_table_data)-1][12]=="further options":
                        book=open_workbook(topic_destination, on_demand=True)
                        sheet = book.sheet_by_name('Sheet1')
                        earlier_input=context_table_data[len(context_table_data)-1][9]
                        user_ip_proc_obj = User_Input_Proc()
                        nouns, verbs, context = user_ip_proc_obj.separate_nouns_n_verbs(earlier_input)
                        earlier_response=context_table_data[len(context_table_data)-1][13]
                        for iterator_match_rows in range (len(context_table_data)-1,0,-1):
                            if int(context_table_data[iterator_match_rows][1])!=(current_topic_data[len(current_topic_data)-1][0]):
                                break
                            if ',' in context_table_data[iterator_match_rows][14]:
                                match_rows=context_table_data[iterator_match_rows][14].split(',')
                                row_wise_frequency=context_table_data[iterator_match_rows][15].split(',')
                                earlier_response=context_table_data[iterator_match_rows][13]
                                match_rows,row_wise_frequency=crm_obj.finding_rows_with_matching_reply(sheet,earlier_response,user_input, match_rows,row_wise_frequency)
                                response, response_type = schedule_of_charges_finding_topic.finding_the_main_topic(db,sheet, match_rows, row_wise_frequency, topic, sub_topic, topic_destination)
    
                else:
                    response="How can we help you with this"
                    response_type="assistance"
    
            elif input_type=="Question" and context_table_data[len(context_table_data)-1][8]=="Question":
                book=open_workbook(topic_destination, on_demand=True)
                sheet = book.sheet_by_name('Sheet1')
                if topic_destination!=' ' and context_table_data[len(context_table_data)-1][12]!="further options":
                    sheet=book.sheet_by_name('Sheet1')
                    match_rows,row_wise_frequency=crm_obj.finding_rows_with_matching_nouns_n_verbs(sheet,nouns,verbs)
                    response, response_type = schedule_of_charges_finding_topic.finding_the_main_topic(db,sheet, match_rows, row_wise_frequency,topic, sub_topic, topic_destination)
                elif context_table_data[len(context_table_data)-1][12]=="further options":
                    match_rows=context_table_data[len(context_table_data)-1][14].split(',')
                    earlier_response=context_table_data[len(context_table_data)-1][13]
                    match_rows=crm_obj.finding_rows_with_matching_reply(sheet,earlier_response,user_input, match_rows)
                    response, response_type = schedule_of_charges_finding_topic.finding_the_main_topic(db,sheet, match_rows, row_wise_frequency, topic, sub_topic, topic_destination)
    
            elif input_type=="Question" and context_table_data[len(context_table_data)-1][8]=="Info":
                if context_table_data[len(context_table_data)-1][12]=="further query":#current_topic_data[len(current_topic_data)-1][0]==current_topic_data[len(current_topic_data)-2][0]: # To check if session_id is the same
                    if 1:#current_topic_data[len(current_topic_data)-1][1]==current_topic_data[len(current_topic_data)-2][1]:# To check if highlevel category is the same
                        book=open_workbook(topic_destination, on_demand=True)
                        sheet = book.sheet_by_name('Sheet1')
                        sub_topic=current_topic_data[len(current_topic_data)-2][2]
                        match_rows,row_wise_frequency=crm_obj.finding_rows_with_matching_nouns_n_verbs(sheet,nouns,verbs)
                        response, response_type = schedule_of_charges_finding_topic.finding_the_main_topic(db,sheet, match_rows, row_wise_frequency, topic, sub_topic, topic_destination)
                elif context_table_data[len(context_table_data)-1][12]=="details provided":
                    if (current_topic_data[len(current_topic_data)-1][1]==' ' or current_topic_data[len(current_topic_data)-1][1]=='') and (current_topic_data[len(current_topic_data)-1][2]==' ' or current_topic_data[len(current_topic_data)-1][2]==''):
                        # This implies that the user is talking with respect to earlier context
                        # Lets get the options we had given earlier*****************************
                        book=open_workbook(topic_destination, on_demand=True)
                        sheet = book.sheet_by_name('Sheet1')
                        for iterator_match_rows in range (len(context_table_data)-1,0,-1):
                            if int(context_table_data[iterator_match_rows][1])!=(current_topic_data[len(current_topic_data)-1][0]):
                                break
                            if ',' in context_table_data[iterator_match_rows][14]:
                                match_rows=context_table_data[iterator_match_rows][14].split(',')
                                row_wise_frequency=context_table_data[iterator_match_rows][15].split(',')
                                earlier_response=context_table_data[iterator_match_rows][13]
                                match_rows,row_wise_frequency=crm_obj.finding_rows_with_matching_reply(sheet,earlier_response,user_input, match_rows,row_wise_frequency)
                                response, response_type = schedule_of_charges_finding_topic.finding_the_main_topic(db,sheet, match_rows, row_wise_frequency, topic, sub_topic, topic_destination)
                    else:
                        book=open_workbook(topic_destination, on_demand=True)
                        sheet = book.sheet_by_name('Sheet1')
                        sub_topic=current_topic_data[len(current_topic_data)-2][2]
                        match_rows,row_wise_frequency=crm_obj.finding_rows_with_matching_nouns_n_verbs(sheet,nouns,verbs)
                        response, response_type = schedule_of_charges_finding_topic.finding_the_main_topic(db,sheet, match_rows, row_wise_frequency, topic, sub_topic, topic_destination)
    
                elif context_table_data[len(context_table_data)-1][12]=="assistance":
                    if (current_topic_data[len(current_topic_data)-1][1]!=' ' and current_topic_data[len(current_topic_data)-1][1]!='') and (current_topic_data[len(current_topic_data)-1][2]==' ' or current_topic_data[len(current_topic_data)-1][2]==''):
                        # This implies that the user is talking with respect to earlier context
                        # Lets get the options we had given earlier*****************************
                        book=open_workbook(topic_destination, on_demand=True)
                        sheet = book.sheet_by_name('Sheet1')
                        sub_topic=current_topic_data[len(current_topic_data)-2][2]
                        match_rows,row_wise_frequency=crm_obj.finding_rows_with_matching_nouns_n_verbs(sheet,nouns,verbs)
                        response, response_type = schedule_of_charges_finding_topic.finding_the_main_topic(db,sheet, match_rows, row_wise_frequency, topic, sub_topic, topic_destination)
    
            elif input_type=="Info" and context_table_data[len(context_table_data)-1][8]=="Info":# and context_table_data[len(context_table_data)-1][12]=="further query":
                book=open_workbook(topic_destination, on_demand=True)
                sheet = book.sheet_by_name('Sheet1')
                if context_table_data[len(context_table_data)-1][12]=="further query":
                    match_rows,row_wise_frequency=crm_obj.finding_rows_with_matching_nouns_n_verbs(sheet,nouns,verbs)
                    if ',' in context_table_data[len(context_table_data)-1][14]:
                        match_rows=context_table_data[len(context_table_data)-1][14].split(',')
                        row_wise_frequency=context_table_data[len(context_table_data)-1][15].split(',')
                    else:
                        match_rows=[]
                        match_rows.append(int(context_table_data[len(context_table_data)-1][14]))
                        row_wise_frequency=[]
                        row_wise_frequency.append(1)
                        response, response_type = schedule_of_charges_finding_topic.finding_the_main_topic(db,sheet, match_rows, row_wise_frequency, topic, sub_topic, topic_destination)
                elif context_table_data[len(context_table_data)-1][12]=="details provided":
                    found_response=0
                    for iterator_match_rows in range (len(context_table_data)-1,0,-1):
                        if int(context_table_data[iterator_match_rows][1])!=(current_topic_data[len(current_topic_data)-1][0]):
                            match_rows=[]
                            row_wise_frequency=[]
                            break
                        if ',' in context_table_data[iterator_match_rows][14]:
                            match_rows=context_table_data[iterator_match_rows][14].split(',')
                            row_wise_frequency=context_table_data[iterator_match_rows][15].split(',')
                            earlier_response=context_table_data[iterator_match_rows][13]
                            match_rows,row_wise_frequency=crm_obj.finding_rows_with_matching_reply(sheet,earlier_response,user_input, match_rows,row_wise_frequency)
                            if len(match_rows)==0:
                                break
                            response, response_type = schedule_of_charges_finding_topic.finding_the_main_topic(db,sheet, match_rows, row_wise_frequency, topic, sub_topic, topic_destination)
                            found_response=1
                            break
                    if found_response==0:
                        response="How can we help you with this"
                        response_type="assistance"
    
    
        elif input_type=="Question":
            if topic_destination!=' ':
                book=open_workbook(str(topic_destination), on_demand=True)
                sheet=book.sheet_by_name('Sheet1')
                match_rows,row_wise_frequency=crm_obj.finding_rows_with_matching_nouns_n_verbs(sheet,nouns,verbs)
                response, response_type = schedule_of_charges_finding_topic.finding_the_main_topic(db,sheet, match_rows, row_wise_frequency,topic, sub_topic, topic_destination)
    
        elif input_type=="Info":
            if response_type=='':
                response="How can we help you with this"
                response_type="assistance"
    
        return response, response_type,match_rows,row_wise_frequency