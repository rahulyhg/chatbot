import sys,re
import global_variable
from fuzzywuzzy import fuzz
from smscorer import smscore
from xlrd import open_workbook
from collections import OrderedDict
from user_input_proc import User_Input_Proc

reload(sys)
sys.setdefaultencoding('utf8')

class Csv_Row_Matching(object):
    
    def __init__(self):
        pass
    
    def finding_rows_with_matching_nouns_n_verbs_old_format(self,sheet,nouns,verbs):
        match_rows=[]
        row_wise_frequency=[]
        iterator=1
        for cell in sheet.col(0): #
            if iterator>115:
                break
            for iterator_nouns in range (len(nouns)):
                nouns[iterator_nouns]=nouns[iterator_nouns].replace('charges','').replace('Charges','').replace('fee','').replace('fees','')
                if (nouns[iterator_nouns]).lower() in (cell.value).lower():
                    position=((cell.value).lower()).find(nouns[iterator_nouns].lower())
                    if position>0:
                        if ((cell.value).lower()[position-1].isalpha()) or ((position+len(nouns[iterator_nouns])<=len(cell.value)-1) and (cell.value).lower()[position+len(nouns[iterator_nouns])].isalpha()):
                            continue#this is to ensure exact match. Avoiding cases where DD is found in Add
                    if len(match_rows)>0:
                        if match_rows[len(match_rows)-1]==iterator:
                            row_wise_frequency[len(row_wise_frequency)-1]=row_wise_frequency[len(row_wise_frequency)-1]+1
                        else:
                            match_rows.append(iterator)
                            row_wise_frequency.append(1)
                    elif len(match_rows)==0:
                        match_rows.append(iterator)
                        row_wise_frequency.append(1)
            iterator+=1
        return match_rows, row_wise_frequency
    
    def finding_rows_with_matching_nouns_n_verbs_new_format(self,sheet,nouns,verbs):
        match_rows=[]
        row_wise_frequency=[]
        iterator=1
        for cell in sheet.col(0): #
            for iterator_nouns in range (len(nouns)):
                nouns[iterator_nouns]=nouns[iterator_nouns].replace('charges','').replace('Charges','').replace('fee','').replace('fees','')
                if (nouns[iterator_nouns]).lower() in (cell.value).lower():
                    position=((cell.value).lower()).find(nouns[iterator_nouns].lower())
                    if position>0:
                        if ((cell.value).lower()[position-1].isalpha()) or ((position+len(nouns[iterator_nouns])<=len(cell.value)-1) and (cell.value).lower()[position+len(nouns[iterator_nouns])].isalpha()):
                            continue#this is to ensure exact match. Avoiding cases where DD is found in Add
                    if len(match_rows)>0:
                        if match_rows[len(match_rows)-1]==iterator:
                            row_wise_frequency[len(row_wise_frequency)-1]=row_wise_frequency[len(row_wise_frequency)-1]+1
                        else:
                            match_rows.append(iterator)
                            row_wise_frequency.append(1)
                    elif len(match_rows)==0:
                        match_rows.append(iterator)
                        row_wise_frequency.append(1)
            iterator+=1
        return match_rows, row_wise_frequency
    
    def finding_rows_with_matching_nouns_n_verbs(self,master_info_sheet,data_sheet,nouns,verbs):
        match_rows=[]
        iterator=0
        dimension_column=master_info_sheet.cell(1,1).value
        for cell in data_sheet.col(int(dimension_column)): #
            if iterator==0:
                continue
            if cell.value in nouns:
                match_rows.append(iterator)
            else:
                for iterator_nouns in range(len(nouns)):
                    ratio=fuzz.token_set_ratio(nouns[iterator_nouns].lower(),(cell.value).lower())
                    if ratio>0.5:
                        match_rows.append(iterator)
            iterator+=1
        return match_rows
    
    def finding_rows_n_cols_with_matching_nouns_n_verbs_rate_card(self,sheet,nouns,verbs):
        match_rows=[]
        row_wise_frequency=[]
        iterator=1
        for cell in sheet.col(0): #
            if cell.value=='':
                continue
            for iterator_nouns in range (len(nouns)):
                nouns[iterator_nouns]=nouns[iterator_nouns].replace('charges','').replace('Charges','').replace('fee','').replace('fees','')
                ratio=fuzz.token_set_ratio(nouns[iterator_nouns].lower(),(cell.value).lower())
                if ratio==100:
                    position=((cell.value).lower()).find(nouns[iterator_nouns].lower())
                    if position>0:
                        if ((cell.value).lower()[position-1].isalpha()) or ((position+len(nouns[iterator_nouns])<=len(cell.value)-1) and (cell.value).lower()[position+len(nouns[iterator_nouns])].isalpha()):
                            continue#this is to ensure exact match. Avoiding cases where DD is found in Add
                    if len(match_rows)>0:
                        if match_rows[len(match_rows)-1]==iterator:
                            row_wise_frequency[len(row_wise_frequency)-1]=row_wise_frequency[len(row_wise_frequency)-1]+1
                        else:
                            match_rows.append(iterator)
                            row_wise_frequency.append(1)
                    elif len(match_rows)==0:
                        match_rows.append(iterator)
                        row_wise_frequency.append(1)
            iterator+=1
        match_cols=[]
        col_wise_frequency=[]
        iterator=1
        for cell in sheet.row(0): #
            if cell.value=='':
                continue
            for iterator_nouns in range (len(nouns)):
                nouns[iterator_nouns]=nouns[iterator_nouns].replace('charges','').replace('Charges','').replace('fee','').replace('fees','')
                ratio=fuzz.token_set_ratio(nouns[iterator_nouns].lower(),(cell.value).lower())
                if ratio==100:#(nouns[iterator_nouns]).lower() in (cell.value).lower():
                    position=((cell.value).lower()).find(nouns[iterator_nouns].lower())
                    if position>0:
                        if ((cell.value).lower()[position-1].isalpha()) or ((position+len(nouns[iterator_nouns])<=len(cell.value)-1) and (cell.value).lower()[position+len(nouns[iterator_nouns])].isalpha()):
                            continue#this is to ensure exact match. Avoiding cases where DD is found in Add
                    if len(match_cols)>0:
                        if match_cols[len(match_cols)-1]==iterator:
                            col_wise_frequency[len(col_wise_frequency)-1]=col_wise_frequency[len(col_wise_frequency)-1]+1
                        else:
                            match_cols.append(iterator)
                            col_wise_frequency.append(1)
                    elif len(match_cols)==0:
                        match_cols.append(iterator)
                        col_wise_frequency.append(1)
            iterator+=1
        return match_rows, row_wise_frequency,match_cols, col_wise_frequency
    
    def response_generation_tabular(self,db,session_id, master_info_sheet, data_sheet, user_input, nouns, verbs,topic, topic_destination):#, input_match_rows):
    
        dimension_column_nos=master_info_sheet.cell(1,1).value
        list_or_count = self.action_determination(user_input)
        match_rows=[]
        match_cols=[]
        response=''
        col_nos=[]
        dim_cols=[]
        if list_or_count=='list':
            if ',' in str(dimension_column_nos):
                col_nos=dimension_column_nos.split(',')
            else:
                col_nos.append(dimension_column_nos)
            for col in col_nos:
                dim_cols.append(data_sheet.col(int(col)))
    
            dimension_column=data_sheet.col(int(col_nos[0]))
            for iterator  in range (1,len(dimension_column)):
                match_string=''
                for col in dim_cols:
                    match_string=match_string +' '+str(col[iterator].value)
                len_match_string=len(match_string.split(' '))
                for noun in nouns:
                    len_noun=len(noun.split(' '))
                    noun_modified=(noun.lower()).replace('branch','').replace('branches','').replace('atm','').replace('atms','').replace('address','')
                    set_ratio=fuzz.token_set_ratio(match_string.lower(),(noun_modified).lower())
    #                 print("as : ",match_string.lower(),(noun_modified).lower())
                    #if set_ratio>25 and (len_match_string/len_noun)>1:
                    #    set_ratio=set_ratio*(len_match_string/len_noun)
                    if (set_ratio>75):
                        match_rows.append(iterator)
                for verb in verbs:
                    ratio=fuzz.token_set_ratio(match_string.lower(),(verb).lower())
                    if ratio>75:
                        match_rows.append(iterator)
    
            if len(match_rows)>1:#Trying to eliminate Kanpur and Kannur selection in one single search
                exact_match=0
                for iterator in range(len(match_rows)):
                    if exact_match==0:
                        match_string=''
                        for col in col_nos:
                            match_string=match_string +' '+str(data_sheet.col(int(col))[match_rows[iterator]].value)
                        for noun in nouns:
                            split_noun=noun.split(' ')
                            for split_noun_words in split_noun:
                                if split_noun_words.lower() in match_string.lower():
                                    exact_match=1
                                    break
                            if exact_match==1:
                                break
                    else:
                        break
                if exact_match==1:
                    new_match_rows=[]
                    for iterator in range(len(match_rows)):
                        row_added=0
                        match_string=''
                        for col in col_nos:
                            match_string=match_string +' '+str(data_sheet.col(int(col))[match_rows[iterator]].value)
                        for noun in nouns:
                            split_noun=noun.split(' ')
                            for split_noun_words in split_noun:
                                if split_noun_words.lower() in match_string.lower():
                                    new_match_rows.append(match_rows[iterator])
                                    row_added=1
                                    break
                            if row_added==1:
                                break
    
                    match_rows=new_match_rows
    
            if len(match_rows)==0:
                cursor_context_table=db.cursor()
                #cursor_current_topic_tree=db.cursor()
                cursor_context_table.execute("SELECT * FROM context_table")
                #cursor_current_topic_tree.execute("SELECT * FROM current_topic_tree")
                context_table_data=cursor_context_table.fetchall()
                #current_topic_data=cursor_current_topic_tree.fetchall()
                for iterator in range(len(context_table_data)):
                    if 1:#int(current_topic_data[len(current_topic_data)-1][1])==session_id:
                        if int(context_table_data[len(context_table_data)-1][1])==session_id:# and topic in context_table_data[len(context_table_data)-1][1]:
                            if (context_table_data[len(context_table_data)-1-iterator][14])!='':
                                rows=(context_table_data[len(context_table_data)-1-iterator][14]).split(',')
                                if len(rows)>1:
                                    for row in rows:
                                        match_rows.append(int(row))
                                    break
                cursor_context_table.close()
    
    
            dimensions=data_sheet.row(0)
            for iterator in range (0,len(dimensions)):
                if (',' in str(dimension_column_nos) and str(iterator) in dimension_column_nos) or iterator == dimension_column_nos:
                    continue
                for noun in nouns:
                    ratio=fuzz.token_set_ratio(((dimensions[iterator]).value).lower(),(noun).lower())
                    if ratio>80:
                        match_cols.append(iterator)
                for verb in verbs:
                    ratio=fuzz.token_set_ratio(((dimensions[iterator]).value).lower(),(verb).lower())
                    if ratio>80:
                        match_cols.append(iterator)
            if 0:#len(match_cols)==0:
                cursor_context_table=db.cursor()
                cursor_context_table.execute("SELECT * FROM context_table")
                context_table_data=cursor_context_table.fetchall()
                for iterator in range(len(context_table_data)):
                    if int(context_table_data[len(context_table_data)-1][1])==session_id:
                        if (context_table_data[len(context_table_data)-1-iterator][15])!='':
                            cols=(context_table_data[len(context_table_data)-1-iterator][15]).split(',')
                            for col in cols:
                                match_cols.append(int(col))
                            break
                cursor_context_table.close()
            #Start of new code
            max_set_ratio = 0
            max_set_rows = []
            if(len(match_rows)>1):
                print('Inside new check for tabular')
                for iterator in range(len(match_rows)):
                    row_added=0
                    match_string=''
                    print(match_rows)
                    print(iterator)
                    for col in col_nos:
                        match_string=match_string +' '+unicode(data_sheet.col(int(col))[match_rows[iterator]].value)
                    for noun in nouns:
                        if('nearest branch' in noun.lower()):
                            pass
                        else:
                            noun_modified=(noun.lower()).replace('branch','').replace('branches','').replace('atm','').replace('atms','')
                        set_ratio=smscore(match_string.lower(),(noun_modified).lower())
                        if(max_set_ratio<set_ratio):
                            max_set_ratio = set_ratio
                            max_set_rows.append(match_rows[iterator])
                            print("noun_modified : ",noun_modified)
                            print("match_string : ",match_string)
                            print("max_set_rows : ",max_set_rows)
                        elif((noun_modified).lower() in match_string.lower()):
                            max_set_ratio = set_ratio
                            max_set_rows.append(match_rows[iterator])
                max_set_rows = list(OrderedDict.fromkeys(max_set_rows))
                       
                if (len(max_set_rows)>1):
                    match_rows=max_set_rows[::-1]
                    print("Found more than one rows in tabular")
                else:
                    match_rows=max_set_rows
            print("match_rows : ",match_rows)
            #End of new code
            for iter_row in range(len(match_rows)):
                response=response+"<strong>"+str(dimension_column[0].value)+" : "+"</strong>"+str(dimension_column[match_rows[iter_row]].value)
                response=response+'\n'
                for iter_col in range(len(match_cols)):
                    value_str=str(data_sheet.cell(match_rows[iter_row], match_cols[iter_col]).value)
                    response=response+"<strong>"+dimensions[match_cols[iter_col]].value+" : "+"</strong>"+value_str+'\n\n'
            if len(match_cols)==0:
                if len(match_rows)==0:
                    response="Sorry couldn't understand, please ensure there are no errors in your response\n"
                    response_type="details provided"
                else:
                    response_type="details provided"
            elif len(match_rows)>0:
                response="The details for your query are provided below\n" + response
                response_type="details provided"
    
            if response==' ' or response =='':
                response="Sorry couldn't understand, please ensure there are no errors in your response\n" + response
                response_type="details provided"
    
        return response, response_type, match_rows, match_cols
    
    
    def response_generation_list(self,db,session_id, master_info_sheet, data_sheet, user_input, nouns, verbs,topic, topic_destination):#, input_match_rows):
    
        dimension_column_nos=master_info_sheet.cell(1,1).value
        list_or_count = self.action_determination(user_input)
        match_rows=[]
        match_cols=[]
        response=''
        col_nos=[]
        dim_cols=[]
        max_set_ratio = 0
        max_set_rows = []
        if list_or_count=='list':
            print("Inside list")
            if ',' in str(dimension_column_nos):
                col_nos=dimension_column_nos.split(',')
            else:
                col_nos.append(dimension_column_nos)
            for col in col_nos:
                dim_cols.append(data_sheet.col(int(col)))
    
            dimension_column=data_sheet.col(int(col_nos[0]))
            for iterator  in range (1,len(dimension_column)):
                match_string=''
                for col in dim_cols:
                    match_string=match_string +' '+unicode(col[iterator].value)
                len_match_string=len(match_string.split(' '))
                for noun in nouns:
                    len_noun=len(noun.split(' '))
                    noun_modified=(noun.lower()).replace('branch','').replace('branches','').replace('atm','').replace('atms','').replace('address','')
                    set_ratio=fuzz.token_set_ratio(match_string.lower(),(noun_modified).lower())
                    if(max_set_ratio<set_ratio):
                        max_set_ratio = set_ratio
                        max_set_rows.append(iterator)
    #                 print(match_string.lower(),(noun_modified).lower())
    #                 print("set_ratio : ",set_ratio)
                    #if set_ratio>25 and (len_match_string/len_noun)>1:
                    #    set_ratio=set_ratio*(len_match_string/len_noun)
                    if (set_ratio>75)  :
    #                     print(match_string.lower(),(noun_modified).lower())
                        match_rows.append(iterator)
                for verb in verbs:
                    ratio=fuzz.token_set_ratio(match_string.lower(),(verb).lower())
                    if ratio>75:
                        match_rows.append(iterator)
            print("match_rows : ",match_rows)
            if(match_rows==[]):
                for rows in max_set_rows:
                    match_rows.append(rows)
            if len(match_rows)>1:#Trying to eliminate Kanpur and Kannur selection in one single search
                exact_match=0
                for iterator in range(len(match_rows)):
                    if exact_match==0:
                        match_string=''
                        for col in col_nos:
                            match_string=match_string +' '+unicode(data_sheet.col(int(col))[match_rows[iterator]].value)
                        for noun in nouns:
                            split_noun=noun.split(' ')
                            for split_noun_words in split_noun:
                                if split_noun_words.lower() in match_string.lower():
                                    exact_match=1
                                    break
                            if exact_match==1:
                                break
                    else:
                        break
                if exact_match==1:
                    print("Found exact match in list")
                    print("before match_rows : ",match_rows)
                    new_match_rows=[]
                    for iterator in range(len(match_rows)):
                        row_added=0
                        match_string=''
                        for col in col_nos:
                            match_string=match_string +' '+unicode(data_sheet.col(int(col))[match_rows[iterator]].value)
                        for noun in nouns:
                            split_noun=noun.split(' ')
                            for split_noun_words in split_noun:
                                if split_noun_words.lower() in match_string.lower():
                                    new_match_rows.append(match_rows[iterator])
                                    row_added=1
                                    break
                            if row_added==1:
                                break
    
                    match_rows=new_match_rows
                    print("after match_rows : ",match_rows)
            #Start of new code
                max_set_ratio = 0
                max_set_rows = []
                if(len(match_rows)>1):
                    print('Inside new check in list')
                    for iterator in range(len(match_rows)):
                        row_added=0
                        match_string=''
                        for col in col_nos:
                            match_string=match_string +' '+unicode(data_sheet.col(int(col))[match_rows[iterator]].value)
                        for noun in nouns:
                            if('nearest branch' in  noun.lower()):
                                pass
                            else:
                                noun_modified=(noun.lower()).replace('branch','').replace('branches','').replace('atm','').replace('atms','')
                            set_ratio=smscore(match_string.lower(),(noun_modified).lower())
                            print("set_ratio : ",set_ratio)
                            print("match string,noun_mod : ",match_string.lower(),(noun_modified).lower())
                            if(max_set_ratio<set_ratio):
                                max_set_ratio = set_ratio
                                max_set_rows.append(match_rows[iterator])
                                print("noun_modified : ",noun_modified)
                                print("match_string : ",match_string)
                                print("max_set_rows : ",max_set_rows)
                    max_set_rows = list(OrderedDict.fromkeys(max_set_rows))
                    print("order : ",max_set_rows)
                    if (len(max_set_rows)>1)  :
    #                     match_rows=max_set_rows[::-1]
                        match_rows=max_set_rows[::-1]
                        print("Found more than one rows in list")
                    else:
                        match_rows=max_set_rows
            print("match_rows : ",match_rows)
            #End of new code
            if len(match_rows)==0:
                cursor_context_table=db.cursor()
                #cursor_current_topic_tree=db.cursor()
                cursor_context_table.execute("SELECT * FROM context_table")
                #cursor_current_topic_tree.execute("SELECT * FROM current_topic_tree")
                context_table_data=cursor_context_table.fetchall()
                #current_topic_data=cursor_current_topic_tree.fetchall()
                for iterator in range(len(context_table_data)):
                    if 1:#int(current_topic_data[len(current_topic_data)-1][1])==session_id:
                        if int(context_table_data[len(context_table_data)-1][1])==session_id:# and topic in context_table_data[len(context_table_data)-1][1]:
                            if (context_table_data[len(context_table_data)-1-iterator][14])!='':
                                rows=(context_table_data[len(context_table_data)-1-iterator][14]).split(',')
                                if len(rows)>1:
                                    for row in rows:
                                        match_rows.append(int(row))
                                    break
                cursor_context_table.close()
            for iter_row  in range(len(match_rows)):
    #             for dim_col_iterator in col_nos:
                for col in dim_cols:
                    try:
                        response=response+"<strong>"+unicode(col[0].value)+" : "+"</strong>"+self.replace_url_to_link(unicode(col[match_rows[iter_row]].value))
                    except Exception,e:
                        print("match_rows : ",match_rows)
                        print("dim_cols : ",dim_cols)
                        print("iter_row : ",iter_row)
                        print("col : ",col)
                        print()
                    response=response+'\n'
                for iter_col in range(len(col_nos),len(data_sheet.row_values(0))):
                    response = response+"<strong>"+unicode(data_sheet.cell(0,iter_col).value)+" : "+"</strong>"+self.replace_url_to_link(unicode(data_sheet.cell(match_rows[iter_row],iter_col).value))
                    response=response+'\n'
                response=response
    #                 value_str=str(data_sheet.cell(match_rows[iter_row], match_cols[iter_col]).value)
    #                 response=response+dimensions[match_cols[iter_col]].value+" : "+value_str+'\n\n'
    #         if len(match_cols)==0:
    #             if len(match_rows)==0:
    #                 response="Sorry couldn't understand, please ensure there are no errors in your response\n"
    #                 response_type="details provided"
    #             else:
    #                 response_type="details provided"
    #         elif len(match_rows)>0:
    #             response="The details for your query are provided below\n" + response
    #             response_type="details provided"
    
            if response==' ' or response =='':
                response="Sorry couldn't understand, please ensure there are no errors in your response\n" + response
                response_type="details provided"
            else:
                response_type = "details provided"
                data = response
                response = {}
                response['Text'] = data
                response['type'] = 'text'
        return response, response_type, match_rows, match_cols
    
    def action_determination(self,user_input):
        book=open_workbook(global_variable.framework_excel_path+'Action Matrix.xlsx', on_demand=True)
        sheet = book.sheet_by_name('Sheet1')
        column=sheet.col(0)
        row=sheet.row(0)
        iterator_col=0
        iterator_row=0
        for col in column:
            ratio=fuzz.ratio((col.value).lower(),(user_input).lower())
            if ratio>80:
                col_num=iterator_col
            iterator_col+=1
        for row_val in row:
            ratio=fuzz.ratio(row_val.value.lower(),(user_input).lower())
            if ratio>80:
                row_num=iterator_row
            iterator_row+=1
        return sheet.cell(iterator_col-1,iterator_row-1).value
    
    def finding_rows_with_matching_reply(self,sheet,earlier_response,user_input, matching_rows):
        earlier_response_split=earlier_response.split('\n')
        ratios_and_index=[]
        user_ip_proc_obj = User_Input_Proc()
        user_input_noun,user_input_verbs=user_ip_proc_obj.separate_nouns_n_verbs_for_overlap(user_input)
        for iterator in range(len(earlier_response_split)):
            row_found_from_earlier_response=earlier_response_split[iterator]
            this_line_noun, this_line_verb, context_this_line=user_ip_proc_obj.separate_nouns_n_verbs(row_found_from_earlier_response)
            n_overlap = user_ip_proc_obj.check_overlapping_nouns(user_input_noun,this_line_noun, user_input_verbs,this_line_verb)
            if n_overlap==0:
                continue
            ratio=fuzz.token_sort_ratio(row_found_from_earlier_response,user_input)
            if ratio>50:
                ratios_and_index.append((ratio,iterator))
        revised_match_rows=[]
        revised_row_wise_frequency=[]
        best_match_row=-1
        best_match_row_index=-1
        match_ratio_and_index=[]
        if len(ratios_and_index)==0:
            return revised_match_rows, revised_row_wise_frequency
        ratios_and_index= sorted(ratios_and_index, key=lambda x: x[0])
        print ratios_and_index[len(ratios_and_index)-1][1],earlier_response_split[ratios_and_index[len(ratios_and_index)-1][1]][3:len(earlier_response_split[iterator])-4]
        row_found=earlier_response_split[ratios_and_index[len(ratios_and_index)-1][1]]
        end_of_string_location=row_found.find('; or')
        if end_of_string_location>-1:
            correct_row=row_found[3:end_of_string_location]
        else:
            correct_row=row_found[3:len(row_found)]
        for iterator in range(len(matching_rows)):
            cell_value=str(sheet.row(int(matching_rows[iterator])-1)[0].value)
            if correct_row in cell_value or cell_value in correct_row:
                revised_match_rows.append(matching_rows[iterator])
                revised_row_wise_frequency.append(1)
                break
    
        return revised_match_rows,revised_row_wise_frequency
    
    def finding_rows_with_matching_reply_rate_card(self,sheet,earlier_response,user_input, matching_rows):
        earlier_response_split=earlier_response.split('\n')
        ratios_and_index=[]
        user_ip_proc_obj = User_Input_Proc()
        user_input_noun,user_input_verbs=user_ip_proc_obj.separate_nouns_n_verbs_for_overlap(user_input)
        for iterator in range(len(earlier_response_split)):
            row_found_from_earlier_response=earlier_response_split[iterator]
            this_line_noun, this_line_verb, context_this_line=user_ip_proc_obj.separate_nouns_n_verbs(row_found_from_earlier_response)
            n_overlap = user_ip_proc_obj.check_overlapping_nouns(user_input_noun,this_line_noun, user_input_verbs,this_line_verb)
            if n_overlap==0:
                continue
            ratio=fuzz.token_sort_ratio(row_found_from_earlier_response,user_input)
            if ratio>50:
                ratios_and_index.append((ratio,iterator))
        revised_match_rows=[]
        revised_row_wise_frequency=[]
        best_match_row=-1
        best_match_row_index=-1
        match_ratio_and_index=[]
        if len(ratios_and_index)==0:
            return revised_match_rows, revised_row_wise_frequency
        ratios_and_index= sorted(ratios_and_index, key=lambda x: x[0])
        print ratios_and_index[len(ratios_and_index)-1][1],earlier_response_split[ratios_and_index[len(ratios_and_index)-1][1]][3:len(earlier_response_split[iterator])-4]
        row_found=earlier_response_split[ratios_and_index[len(ratios_and_index)-1][1]]
        end_of_string_location=row_found.find('; or')
        if end_of_string_location>-1:
            correct_row=row_found[3:end_of_string_location]
        else:
            correct_row=row_found[3:len(row_found)]
        for iterator in range(len(matching_rows)):
            cell_value=str(sheet.row(int(matching_rows[iterator]))[0].value)
            if correct_row in cell_value or cell_value in correct_row:
                revised_match_rows.append(matching_rows[iterator])
                revised_row_wise_frequency.append(1)
                break
    
        return revised_match_rows,revised_row_wise_frequency
    
    def finding_cols_with_matching_reply_rate_card(self,sheet,earlier_response,user_input, matching_cols):
        earlier_response_split=earlier_response.split('\n')
        ratios_and_index=[]
        user_ip_proc_obj = User_Input_Proc()
        user_input_noun,user_input_verbs=user_ip_proc_obj.separate_nouns_n_verbs_for_overlap(user_input)
        for iterator in range(len(earlier_response_split)):
            row_found_from_earlier_response=earlier_response_split[iterator]
            this_line_noun, this_line_verb, context_this_line=user_ip_proc_obj.separate_nouns_n_verbs(row_found_from_earlier_response)
            n_overlap = user_ip_proc_obj.check_overlapping_nouns(user_input_noun,this_line_noun, user_input_verbs,this_line_verb)
            if n_overlap==0:
                continue
            ratio=fuzz.token_sort_ratio(row_found_from_earlier_response,user_input)
            if ratio>50:
                ratios_and_index.append((ratio,iterator))
        revised_match_cols=[]
        revised_col_wise_frequency=[]
        best_match_col=-1
        best_match_col_index=-1
        match_ratio_and_index=[]
        if len(ratios_and_index)==0:
            return revised_match_cols, revised_col_wise_frequency
        ratios_and_index= sorted(ratios_and_index, key=lambda x: x[0])
        print ratios_and_index[len(ratios_and_index)-1][1],earlier_response_split[ratios_and_index[len(ratios_and_index)-1][1]][len(earlier_response_split[iterator])-4]
        col_found=earlier_response_split[ratios_and_index[len(ratios_and_index)-1][1]]
        end_of_string_location=col_found.find('; or')
        if end_of_string_location>-1:
            correct_col=col_found[:end_of_string_location]
        else:
            correct_col=col_found[len(col_found)]
        for iterator in range(len(matching_cols)):
            cell_value=str(sheet.col(int(matching_cols[iterator]))[0].value)
            if correct_col in cell_value or cell_value in correct_col:
                revised_match_cols.append(matching_cols[iterator])
                revised_col_wise_frequency.append(1)
                break
    
        return revised_match_cols,revised_col_wise_frequency
    
    def replace_url_to_link(self,value):
        # Replace url to link
        urls = re.compile(r"((https?):((//)|(\\\\))+[\w\d:#@%/;$()~_?\+-=\\\.&]*)", re.MULTILINE|re.UNICODE)
        value = urls.sub(r'<a href="\1" target="_blank">\1</a>', value)
        # Replace email to mailto
        urls = re.compile(r"([\w\-\.]+@(\w[\w\-]+\.)+[\w\-]+)", re.MULTILINE|re.UNICODE)
        value = urls.sub(r'<a href="\1">\1</a>', value)
        return value