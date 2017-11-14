from xlrd import open_workbook
from orderedset import OrderedSet

class Process_Tree(object):
    
    def __init__(self, session_obj):
        self.session_obj = session_obj
         
    def generate_first_response(self, db, session_id, topic_destination, user_input, nouns, verbs, topic):
        book = open_workbook(topic_destination, on_demand=True)
        master_info_sheet = book.sheet_by_name('Sheet2')
        data_sheet = book.sheet_by_name('Sheet1')
        first_column = data_sheet.col(0)
        self.session_obj.gb_dt_file_name = topic_destination
        self.session_obj.gb_dt_start_row = -1
        self.session_obj.gb_dt_end_row = -1
        self.session_obj.gb_dt_current_cursor_row = -1
        self.session_obj.gb_dt_current_cursor_col = -1
        found_topic = False
        self.session_obj.gb_sub_topic_list = []
        for iterator in range (len(first_column)):
            if topic.lower() in first_column[iterator].value.lower():
                self.session_obj.gb_dt_start_row = iterator
                found_topic = True
                continue
            if first_column[iterator].value != '' and found_topic:
                self.session_obj.gb_dt_end_row = iterator - 1
                break
                
            if iterator == len(first_column) - 1:
                self.session_obj.gb_dt_end_row = iterator
        response = {}
        response_type = ''
        response.update({'Text':data_sheet.row(self.session_obj.gb_dt_start_row)[10].value})
        first_row = data_sheet.row(self.session_obj.gb_dt_start_row + 1)
        iterator = self.session_obj.gb_dt_start_row + 1
        response.update({'type':'DTHyperlink'})
        response['Tooltip'] = []
        response['Steps'] = []
        if 'Script' in first_row[9].value:
            Scripts = []
            for iterator_row in range (self.session_obj.gb_dt_start_row + 2, self.session_obj.gb_dt_end_row):
                process_rows = data_sheet.row(iterator_row)
                if 'Script' in process_rows[9].value:
                    Scripts.append(process_rows[12].value)
#                     if(first_row[8].value != ''):
#                         response['Tooltip'].append(first_row[8].value)
#                     else:
#                         response['Tooltip'].append('')
#                     if(first_row[7].value != ''):
#                         response['Steps'].append(first_row[7].value)
#                     else:
#                         response['Steps'].append('')
                else:
                    response.update({'Script':Scripts})
                    self.session_obj.gb_dt_current_cursor_row = iterator_row
                    self.session_obj.gb_dt_current_cursor_col = 2
                    break
                if iterator_row == len(first_column) - 1:
                    self.session_obj.gb_dt_current_cursor_col = 2
                    self.session_obj.gb_dt_current_cursor_row = iterator_row
            iterator = iterator_row + 1
            
        if 'Process' in first_row[9].value:
            Processes = []
            for iterator_row in range (self.session_obj.gb_dt_start_row + 2, self.session_obj.gb_dt_end_row):
                process_rows = data_sheet.row(iterator_row)
                if 'Process' in process_rows[9].value:
                    Processes.append(process_rows[12].value)
                    if(first_row[8].value != ''):
                        response['Tooltip'].append(first_row[8].value)
                    else:
                        response['Tooltip'].append('')
                    if(first_row[7].value != ''):
                        response['Steps'].append(first_row[7].value)
                    else:
                        response['Steps'].append('')
                else:
                    response.update({'Process':Processes})
                    self.session_obj.gb_dt_current_cursor_row = iterator_row
                    self.session_obj.gb_dt_current_cursor_col = 2
                    break
                if iterator_row == len(first_column) - 1:
                    self.session_obj.gb_dt_current_cursor_col = 2
                    self.session_obj.gb_dt_current_cursor_row = iterator_row
            iterator = iterator_row + 1
        first_row = data_sheet.row(iterator)
        line_nos = []
        col_nos = []
        if 'Decision Tree' in first_row[9].value:
            Options = []
            if(first_row[10].value != ''):
                self.session_obj.gb_current_step = first_row[10].value
            for iterator_options in range (12, len(first_row)):
                if first_row[iterator_options].value != '':
                    Options.append(first_row[iterator_options].value)
                    line_nos.append(self.session_obj.gb_dt_start_row + 1)
            response['Text'] = response['Text'] + '\n' + first_row[11].value
#             if(first_row[8].value != ''):
#                 response['Tooltip'].append(first_row[8].value)
#             else:
#                 response['Tooltip'].append('')
#             if(first_row[7].value != ''):
#                 response['Steps'].append(first_row[7].value)
#             else:
#                 response['Steps'].append('')
            response.update({'DTHyperlink':Options})
            response['line_no'] = line_nos
            self.session_obj.gb_sub_topic_list =  data_sheet.row_values(iterator)[1:7]
            response_type = 'Process Tree Options'
            self.session_obj.gb_dt_current_cursor_row = self.session_obj.gb_dt_start_row + 1
            self.session_obj.gb_dt_current_cursor_col = 12
        response_type = 'Process Tree Processes'
        col_nos = [self.session_obj.gb_dt_current_cursor_col for x in line_nos]
        response['col_no'] = col_nos
        s1 = OrderedSet()
        for row in range(self.session_obj.gb_dt_start_row+1,self.session_obj.gb_dt_end_row+1):
            first_row = data_sheet.row(row)
            if(first_row[10].value!=''):
                s1.add(str(first_row[10].value))
#                 self.session_obj.gb_step_list.append(str(first_row[2].value))
#         self.session_obj.gb_step_list = []
#         self.session_obj.gb_current_step = ''
        self.session_obj.gb_step_list = list(s1)
        if 'Process' not in response:
            response['Process'] = []
        if 'Script' not in response:
            response['Script'] = []
        
        self.session_obj.gb_sub_topic_list.insert(0,self.session_obj.gb_topic)
        response.update({'topic': self.session_obj.gb_topic})
        response.update({'sub_step_list':self.session_obj.gb_step_list})
        response.update({'current_sub_step':str(self.session_obj.gb_current_step)})
        response.update({'sub_topic_list':self.session_obj.gb_sub_topic_list})
        print("topic : ",self.session_obj.gb_topic)
        print("Start row : ", self.session_obj.gb_dt_start_row)
        print("End row : ", self.session_obj.gb_dt_end_row)
        print("Step List : ",self.session_obj.gb_step_list)
        print("Current step : ",self.session_obj.gb_current_step)
        print("Sub Topic List : ",self.session_obj.gb_sub_topic_list)
        return response, response_type
    
    
    def generate_responses(self, db, session_id, user_input, row_no, col_no):
        book = open_workbook(self.session_obj.gb_dt_file_name, on_demand=True)
        master_info_sheet = book.sheet_by_name('Sheet2')
        data_sheet = book.sheet_by_name('Sheet1')
        response = {}
        response.update({'type':'DTHyperlink'})
        response_type = ''
        self.session_obj.gb_dt_current_cursor_row = int(row_no)
        self.session_obj.gb_dt_current_cursor_col = int(col_no)
        iterator = 0
        response['Tooltip'] = []
        response['Steps'] = []
        print(self.session_obj.gb_dt_current_cursor_row + 1, self.session_obj.gb_dt_end_row)
        print("Column no: ", self.session_obj.gb_dt_current_cursor_col)
        print("user_input : " , user_input['DTHyperlink'])
        print("topic : ",self.session_obj.gb_topic)
        for iterator in range (self.session_obj.gb_dt_current_cursor_row + 1, self.session_obj.gb_dt_end_row+1):
            print(iterator)
            row = data_sheet.row(iterator)
            if user_input['DTHyperlink'] in row[self.session_obj.gb_dt_current_cursor_col].value:
                if 'Script' == row[9].value:
                    Scripts = []
                    for iterator_row in range (iterator, self.session_obj.gb_dt_end_row + 1):
                        script_rows = data_sheet.row(iterator_row)
                        if 'Script' == script_rows[9].value:
                            if(script_rows[self.session_obj.gb_dt_current_cursor_col].value != user_input['DTHyperlink']):
                                iterator = iterator_row
                                break
                            Scripts.append(script_rows[self.session_obj.gb_dt_current_cursor_col + 1].value)
#                             if(script_rows[8].value != ''):
#                                 response['Tooltip'].append(script_rows[8].value)
#                             else:
#                                 response['Tooltip'].append('')
#                             if(script_rows[7].value != ''):
#                                 response['Steps'].append(script_rows[7].value)
#                             else:
#                                 response['Steps'].append('')
                            response.update({'Script':Scripts})
                            self.session_obj.gb_dt_current_cursor_row = iterator_row
                            iterator = iterator_row
                            if(script_rows[10].value!=''):
                                self.session_obj.gb_current_step = script_rows[10].value
                        else:
                            response.update({'Script':Scripts})
                            self.session_obj.gb_dt_current_cursor_row = iterator_row
                            iterator = iterator_row
                            break
                    if iterator_row == self.session_obj.gb_dt_end_row:
                        response.update({'Script':Scripts})
                        self.session_obj.gb_dt_current_cursor_row = iterator_row
                        response_type = 'Process Tree Processes'
                        break
                    response_type = 'Process Tree Processes'
                row = data_sheet.row(iterator)
                if(row[self.session_obj.gb_dt_current_cursor_col].value != user_input['DTHyperlink']):
                    iterator = iterator_row
                    break
                if 'Process' == row[9].value:
                    Processes = []
                    for iterator_row in range (iterator, self.session_obj.gb_dt_end_row + 1):
                        process_rows = data_sheet.row(iterator_row)
                        if 'Process' == process_rows[9].value:
                            if(process_rows[self.session_obj.gb_dt_current_cursor_col].value != user_input['DTHyperlink']):
                                iterator = iterator_row
                                break
                            Processes.append(process_rows[self.session_obj.gb_dt_current_cursor_col + 1].value)
                            if(process_rows[8].value != ''):
                                response['Tooltip'].append(process_rows[8].value)
                            else:
                                response['Tooltip'].append('')
                            if(process_rows[7].value != ''):
                                response['Steps'].append(process_rows[7].value)
                            else:
                                response['Steps'].append('')
                            response.update({'Process':Processes})
                            self.session_obj.gb_dt_current_cursor_row = iterator_row
                            iterator = iterator_row
                            if(process_rows[10].value!=''):
                                self.session_obj.gb_current_step = process_rows[10].value
                        else:
                            response.update({'Process':Processes})
                            self.session_obj.gb_dt_current_cursor_row = iterator_row
                            iterator = iterator_row
                            break
                    if iterator_row == self.session_obj.gb_dt_end_row:
                        response.update({'Process':Processes})
                        self.session_obj.gb_dt_current_cursor_row = iterator_row
                        response_type = 'Process Tree Processes'
                        break
                    response_type = 'Process Tree Processes'
                if 'iterator_row' in locals():
                    row = data_sheet.row(iterator_row)
                    if(row[self.session_obj.gb_dt_current_cursor_col].value != user_input['DTHyperlink']):
                        iterator = iterator_row
                        break
                if 'Process + Detail Node' == row[9].value:
                    if 'Processes' not in locals():
                        Processes = []
                    for iterator_row in range (iterator, self.session_obj.gb_dt_end_row + 1):
                        process_rows = data_sheet.row(iterator_row)
                        if 'Process' in process_rows[1].value:
                            if(process_rows[self.session_obj.gb_dt_current_cursor_col].value != user_input['DTHyperlink']):
                                iterator = iterator_row
                                break
                            Processes.append(process_rows[self.session_obj.gb_dt_current_cursor_col + 2].value)
                            if(process_rows[8].value != ''):
                                response['Tooltip'].append(process_rows[8].value)
                            else:
                                response['Tooltip'].append('')
                            if(process_rows[7].value != ''):
                                response['Steps'].append(process_rows[7].value)
                            else:
                                response['Steps'].append('')
                            response.update({'Process':Processes})
                            self.session_obj.gb_dt_current_cursor_row = iterator_row
                            iterator = iterator_row
                            if(process_rows[10].value!=''):
                                self.session_obj.gb_current_step = process_rows[10].value
                        else:
                            response.update({'Process':Processes})
                            self.session_obj.gb_dt_current_cursor_row = iterator_row
                            iterator = iterator_row
                            break
                    if iterator_row == self.session_obj.gb_dt_end_row:
                        response.update({'Process':Processes})
                        self.session_obj.gb_dt_current_cursor_row = iterator_row
                        response_type = 'Process Tree Processes'
                        break
                    response_type = 'Process Tree Processes'
                dt_row = data_sheet.row(iterator)
                dt_row_previous = data_sheet.row(iterator - 1)
                dt_row_next = data_sheet.row(iterator + 1)
                if 'Decision Tree' in dt_row[9].value:
                    if(self.session_obj.gb_dt_current_cursor_col == 12):
                        if(dt_row[self.session_obj.gb_dt_current_cursor_col].value != dt_row_next[self.session_obj.gb_dt_current_cursor_col].value):
                            break
                    else:
                        if not (dt_row_previous[self.session_obj.gb_dt_current_cursor_col].value == dt_row[self.session_obj.gb_dt_current_cursor_col].value == dt_row_next[self.session_obj.gb_dt_current_cursor_col].value):
                            if 'Processes' in locals():
                                break
                    Options = []
                    if(response.get('Process',[])==[]):
                        response['Process'] = [dt_row[11].value]
                        if(response['Process'] == ['']):
                            response['Process'] = [] 
                    else:
                        if(dt_row[11].value == ''):
                            pass
                        else:
                            response.get('Process',[]).append('\n' + dt_row[11].value)
                    for iterator_options in range (self.session_obj.gb_dt_current_cursor_col + 1, len(dt_row)):
                        if dt_row[iterator_options].value != '':
                            Options.append(dt_row[iterator_options].value)
                    response.update({'DTHyperlink':Options})
#                     response['Tooltip'] = dt_row[8].value
#                     if(dt_row[8].value != ''):
#                         response['Tooltip'].append(dt_row[8].value)
#                     else:
#                         response['Tooltip'].append('')
#                     if(dt_row[7].value != ''):
#                         response['Steps'].append(dt_row[7].value)
#                     else:
#                         response['Steps'].append('')
                    response.update({'line_no':[iterator for x in Options]})
                    response_type = 'Process Tree Options'
                    self.session_obj.gb_dt_current_cursor_col += 1
                    col_nos = [self.session_obj.gb_dt_current_cursor_col for x in Options]
                    response['col_no'] = col_nos
                    self.session_obj.gb_current_step = dt_row[10].value
                    break
                elif('Form' in dt_row[9].value):
                    print("current_cursor_col : ",self.session_obj.gb_dt_current_cursor_col)
                    print("current_cursor_row : ",self.session_obj.gb_dt_current_cursor_row)
                    process_rows = data_sheet.row(iterator)
                    Processes = [process_rows[self.session_obj.gb_dt_current_cursor_col+1].value]
                    self.session_obj.form_input_type = process_rows[self.session_obj.gb_dt_current_cursor_col+2].value
                    if('display form info' in self.session_obj.form_input_type):
                        pass
                    else:
                        self.session_obj.form_input_list.append(self.session_obj.form_input_type)
                    response.update({'Process':Processes})
                    response_type = "form_query"
                    self.session_obj.form_category = process_rows[self.session_obj.gb_dt_current_cursor_col].value
                    self.session_obj.gb_dt_current_cursor_row += 1
                    if('display form info' in self.session_obj.form_input_type):
                        response['Process'].extend(['\n'])
                        response['Process'].extend(['<br />'.join(['<strong>%s:</strong> %s' % (key, value) for (key, value) in self.session_obj.form_input_dict.items()])])
                        response_type = 'Process Tree Processes'
                        continue
#                         print(self.session_obj.form_input_dict)
                    break
                else:
                    response_type = 'Process Tree Processes'
#                     break
                
#                     for iterator in range (self.session_obj.gb_dt_current_cursor_row + 1, self.session_obj.gb_dt_end_row):
#                         print(iterator)
        del(iterator)
        if 'Processes' in locals():
            del Processes
        if 'Process' not in response:
            response['Process'] = []
        if 'Text' not in response:
            response['Text'] = []
        if 'Tooltip' not in response:
            response['Tooltip'] = []
        if 'Script' not in response:
            response['Script'] = []
            
        response.update({'topic': self.session_obj.gb_topic})
        response.update({'Step_list':self.session_obj.gb_step_list})
        response.update({'current_step':str(self.session_obj.gb_current_step)})
        print("topic : ",self.session_obj.gb_topic)
        print("Current step : ",str(self.session_obj.gb_current_step))
        return response, response_type

    def generate_first_response_mongo(self, mongo_db, session_id, collection_name, user_input, nouns, verbs, topic):
        collection = mongo_db[collection_name]
        for document in collection.find({'parent' : True}):
            response = document
            break           #Takes care of the case where there are multiple docs with parent=True(ideally shouldn't be so)
        response_type = 'Process Tree Processes'
        print(response)
        return response, response_type
    
    def generate_responses_mongo(self, mongo_db, session_id, user_input, document_id):
        pass