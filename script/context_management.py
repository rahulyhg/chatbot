from xlrd import open_workbook
import json, global_variable
from operator import itemgetter
from collections import Counter
from fuzzywuzzy import fuzz
from textblob import TextBlob
import datetime
# from time import strftime

class Context_Management(object):
    
    def __init__(self,session_obj):
        self.session_obj = session_obj
    
    def multiple_matches(self):
        self.session_obj.gb_topic_tuple_array
        self.session_obj.gb_max_ratio_index_in_tuple
        response={}
        response['type']='text'
        text='Which of the following are you looking for \n'
        for iterator in range (len(self.session_obj.gb_max_ratio_index_in_tuple)):
            text=text+self.session_obj.gb_topic_tuple_array[self.session_obj.gb_max_ratio_index_in_tuple[iterator]][0]+'\n'
    
        response['Text']=text
        response_type='multiple matches'
        return response, response_type
    
    def topic_determination(self,db,nouns, verbs, user_input, response, response_type):
        if(len(user_input['id'])!=0):
            print("Before : ",datetime.datetime.now().strftime("%H:%M:%S"))
            def all_same(items):
                return all(x == items[0] for x in items)
            print("After : ",datetime.datetime.now().strftime("%H:%M:%S"))
            row_no = user_input['id'].split(",")
#             book = open_workbook(global_variable.framework_excel_path+'new_topic_mapping.xlsx',on_demand=True)
            sheet = global_variable.new_topic_book.sheet_by_name('Sheet1')
            topic_tuple_array = []
            print("After reading : ",datetime.datetime.now().strftime("%H:%M:%S"))
            for row in row_no:
                #location,topic,value
                topic_tuple_array.append((sheet.cell(int(row)+1,3).value,sheet.cell(int(row)+1,1).value,sheet.cell(int(row)+1,2).value))
            print(topic_tuple_array)
            check_list = [x[0] for x in topic_tuple_array]
            if(all_same(check_list)):
                print(topic_tuple_array)
                self.session_obj.gb_topic=topic_tuple_array[0][1]
                sub_topic=topic_tuple_array[0][2]
                topic_location=topic_tuple_array[0][0]
            self.session_obj.response_type = ''
            return self.session_obj.gb_topic, sub_topic, topic_location
    #         for cell in sheet.col(1):
    #             for iterator in range(len(row_no)):
    #                 if row_no[iterator] in cell.value:
        user_input = user_input['Text']
#         book = open_workbook(global_variable.framework_excel_path+"Topic_mapping.xlsx",on_demand=True)
        sheet = global_variable.topic_book.sheet_by_name('Sheet1')
        if response_type=="rc_further query" or response_type=="rc_further options" or response_type=="further options":
            return self.session_obj.gb_topic,'',''
        elif response_type=="multiple matches":
            for iterator in range(len(self.session_obj.gb_topic_tuple_array)):
                if user_input in self.session_obj.gb_topic_tuple_array[iterator][0]:
                    #print global_variable.gb_topic_tuple_array[iterator][0],global_variable.gb_topic_tuple_array[iterator][1],global_variable.gb_topic_tuple_array[iterator][2]
                    return self.session_obj.gb_topic_tuple_array[iterator][0],self.session_obj.gb_topic_tuple_array[iterator][1],self.session_obj.gb_topic_tuple_array[iterator][2]
        elif(response_type=="form_query"):
            #store the response in respective field in database. Might need to maintain the type of info requested.
            #Change the input to 
            return self.session_obj.gb_topic,'',''
    
        self.session_obj.gb_topic_tuple_array=[]
        self.session_obj.gb_max_ratio_index_in_tuple=[]
        column_iterator=0
        topics=[]
        sub_topic=[]
        topics_location=[]
        topic_tuple_array=[]
        match_string=[]
        exact_match=0
        max_ratio=-10
        max_ratio_index_in_tuple=[]
        row_count=-1
        for cell in sheet.col(1):
            for iterator in range(len(nouns)):
                ratio=fuzz.token_set_ratio(nouns[iterator].lower(),(cell.value).lower())
                if ratio>76:
                    topics.append(sheet.cell(column_iterator,0).value)
                    match_string.append(sheet.cell(column_iterator,1).value)
                    topics_location.append(sheet.cell(column_iterator,3).value)
                    sub_topic.append(sheet.cell(column_iterator,2).value)
                    topic_tuple=(sheet.cell(column_iterator,0).value,sheet.cell(column_iterator,2).value, sheet.cell(column_iterator,3).value,nouns[iterator].lower(),sheet.cell(column_iterator,1).value,ratio)
                    topic_tuple_array.append(topic_tuple)
                    row_count+=1
                    if ratio==100:
                        if len(nouns[iterator].split(' '))==len((cell.value).split(' ')):
                            exact_match=1

                    if ratio==100 and ratio>max_ratio and exact_match==1:
                        max_ratio=ratio
                        max_ratio_index_in_tuple=[]
                        max_ratio_index_in_tuple.append(row_count)
                    elif ratio==100 and max_ratio==100:
                        max_ratio_index_in_tuple.append(row_count)
                    elif ratio==max_ratio:
                        max_ratio_index_in_tuple.append(row_count)
                    elif max_ratio!=100 and abs(ratio-max_ratio)<5:
                        max_ratio_index_in_tuple.append(row_count)
            column_iterator+=1
    
        if len(max_ratio_index_in_tuple)>1:
            self.session_obj.gb_topic_tuple_array=topic_tuple_array
            self.session_obj.gb_max_ratio_index_in_tuple=max_ratio_index_in_tuple
            return '', '',''
        topic=''
        topic_location=''
        revised_topic_tuple_array=[]
        topic_tuple_array=sorted(topic_tuple_array,key=itemgetter(1))
        if len(topic_tuple_array)>1:
            active_or_passive = self.check_form_of_speech(user_input)
            for iterator in range(len(topic_tuple_array)):# this is to check for cases where the system gets confused between different topics. For example: Are there ATMs in Branches. The system would not know if this would be found in ATM Locator or Branch Locator. This helps resolve this confusion by looking at next layer of topic key words
                for iterator_nouns in range(len(nouns)):
                    ratio=fuzz.token_set_ratio(nouns[iterator_nouns].lower(),(topic_tuple_array[iterator][4]).lower())
                    if (exact_match==1 and ratio==100):
                        if len(nouns[iterator_nouns].split(' '))==len(topic_tuple_array[iterator][4].split(' ')):
                            topic_tuple=topic_tuple_array[iterator]
                            revised_topic_tuple_array.append(topic_tuple)
                    elif ratio>80:
                        topic_tuple=topic_tuple_array[iterator]
                        revised_topic_tuple_array.append(topic_tuple)
                    if active_or_passive=="active":
                        break
            if len(revised_topic_tuple_array)>0:
                topic_tuple_array = revised_topic_tuple_array
        if len(topic_tuple_array)>1:
            count_array=Counter(elem[0] for elem in topic_tuple_array)
            for iterator in range (len(topic_tuple_array)):
                if str(count_array.most_common(1)[0][0]) in str(topic_tuple_array[iterator][0]):
                    topic=topic_tuple_array[iterator][0]
                    sub_topic=topic_tuple_array[iterator][1]
                    topic_location=topic_tuple_array[iterator][2]
        elif len(topic_tuple_array)==1:
            topic=topic_tuple_array[0][0]
            sub_topic=topic_tuple_array[0][1]
            topic_location=topic_tuple_array[0][2]
        return topic, sub_topic, topic_location
    
    def check_form_of_speech(self,user_input):
        blob= TextBlob(user_input)
        words_n_tags_list=blob.tags
        verb_position=-1
        previous_noun_position=-1
        noun_position=-1
        for iterator in range (len(words_n_tags_list)):
            #print words_n_tags_list[iterator][0],words_n_tags_list[iterator][1]
            if 'NNP' in words_n_tags_list[iterator][1] or 'NNS' in words_n_tags_list[iterator][1] or 'NN' in words_n_tags_list[iterator][1]:
                if noun_position==-1:
                    noun_position=iterator
                else:
                    previous_noun_position=noun_position
                    noun_position=iterator
                    if verb_position<noun_position and verb_position>previous_noun_position:
                        return "passive"
            if 'VBP' in words_n_tags_list[iterator][1] or 'VBZ' in words_n_tags_list[iterator][1]:
                verb_position=iterator
    
        return "active"
    
    def setting_current_topic(self,db,session_id,topic, sub_topic, topic_destination):
        cursor_current_topic_tree_write=db.cursor()
        print("topic, sub_topic, topic_destination ",topic, sub_topic, topic_destination)
        if topic=='':
            topic=' '
        if sub_topic=='':
            sub_topic=' '
        if topic_destination=='':
            topic_destination=' '
        cursor_current_topic_tree_write.execute("INSERT INTO current_topic_tree(Session_Id, Main_Topic, Product_Name, Content_URL) VALUES(%(Session_Id)s,%(Main_Topic)s,%(Product_Name)s,%(Content_URL)s)",{'Session_Id':session_id,'Main_Topic':topic,'Product_Name': sub_topic,'Content_URL':topic_destination})
        db.commit()
    
    def setting_current_context(self,db,session_id,user_input, input_type,nouns, verbs, topic, topic_destination, response,response_type, context_current, match_rows, match_cols,row_wise_frequency):
        self.session_obj.Context_5=self.session_obj.Context_4
        self.session_obj.Context_4=self.session_obj.Context_3
        self.session_obj.Context_3=self.session_obj.Context_2
        self.session_obj.Context_2=self.session_obj.Context_1
        self.session_obj.Context_1=self.session_obj.Context
        self.session_obj.Context=context_current
        cursor_context_write=db.cursor()
        row_values=' '
        col_values=' '
        row_wise_frequency_values=' '
        if match_rows!='' and len(match_rows)>0:
            row_values=[','.join(map(str, match_rows))]
        if match_cols!='' and len(match_cols)>0:
            col_values=[','.join(map(str, match_cols))]
        if row_wise_frequency!='' and len(row_wise_frequency)>0:
            row_wise_frequency_values=[','.join(map(str, row_wise_frequency))]
    
        if self.session_obj.Context=='':
            self.session_obj.Context=' '
        if self.session_obj.Context_1=='':
            self.session_obj.Context_1=' '
        if self.session_obj.Context_2=='':
            self.session_obj.Context_2=' '
        if self.session_obj.Context_3=='':
            self.session_obj.Context_3=' '
        if self.session_obj.Context_4=='':
            self.session_obj.Context_4=' '
        if self.session_obj.Context_5=='':
            self.session_obj.Context_5=' '
        if topic=='':
            topic=' '
        if topic_destination=='':
            topic_destination=' '
        if response=='':
            response=' '
        if response_type=='':
            response_type=' '
        if len(nouns)==0:
            nouns=' '
        elif len(nouns)>1:
            nouns=[','.join(map(str, nouns))]
        if len(verbs)==0:
            verbs=0
        elif len(verbs)>1:
            verbs=[','.join(map(str, verbs))]
        #print session_id,global_variable.Context, global_variable.Context_1,global_variable.Context_2,global_variable.Context_3,global_variable.Context_4,global_variable.Context_5,input_type,user_input, nouns, verbs,response_type
        #print response, row_values,col_values,row_wise_frequency_values
    
        cursor_context_write.execute("INSERT INTO context_table(Session_Id, Context, Context_1, Context_2, Context_3, Context_4, Context_5, Type_of_Input, User_Input,Nouns_in_Input, Verbs_in_Input, Response_Type,Response, Match_Rows, Match_Cols, Row_Wise_Frequency) VALUES(%(Session_Id)s,%(Context)s, %(Context_1)s,%(Context_2)s, %(Context_3)s, %(Context_4)s,%(Context_5)s, %(Type_of_Input)s, %(User_Input)s,%(Nouns_in_Input)s, %(Verbs_in_Input)s, %(Response_Type)s,%(Response)s,%(Match_Rows)s, %(Match_Cols)s,%(Row_Wise_Frequency)s)",
                                     {'Session_Id':session_id,'Context':self.session_obj.Context,'Context_1': self.session_obj.Context_1,'Context_2':self.session_obj.Context_2, 'Context_3':self.session_obj.Context_3,'Context_4':self.session_obj.Context_4,'Context_5':self.session_obj.Context_5,'Type_of_Input':input_type,'User_Input':json.dumps(user_input), 'Nouns_in_Input':nouns, 'Verbs_in_Input': verbs,'Response_Type':response_type, 'Response':json.dumps(response), 'Match_Rows':row_values, 'Match_Cols':col_values,'Row_Wise_Frequency':row_wise_frequency_values})
        cursor_context_write.close()
        db.commit()