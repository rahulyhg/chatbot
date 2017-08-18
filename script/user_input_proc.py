from global_variable import TextBlob
from nltk.corpus import stopwords
import datetime

class User_Input_Proc(object):
    
    def __init__(self):
        pass
    
    def separate_nouns_n_verbs(self,user_input):
        if(type(user_input)!=dict):
            temp = user_input
            user_input = {}
            user_input['Text'] = temp
            user_input['id'] = []
            del temp
        print('Before Blob : ' + datetime.datetime.now().strftime("%H:%M:%S"))
        blob= TextBlob(user_input['Text'])
        print('After Blob : ' + datetime.datetime.now().strftime("%H:%M:%S"))
        words_n_tags_list=blob.tags
        print('After Tags : ' + datetime.datetime.now().strftime("%H:%M:%S"))
#         print("tags :",words_n_tags_list)
        stop = set(stopwords.words('english'))
        if(len(user_input['id'])!=0):
            stop.remove('not')
        nouns=[]
        verbs=[]
        last_noun_index=-1
        last_verb_index=-1
        Context=''
        no_stop_found = 0
        for iterator in range (len(words_n_tags_list)):
            if words_n_tags_list[iterator][0].lower() not in stop:
                no_stop_found = 1
            else:
                no_stop_found = 0
                break
        if(no_stop_found == 1):
            words_n_tags_list = [(i[0],'NNP') for i in words_n_tags_list]
        for iterator in range (len(words_n_tags_list)):
            if words_n_tags_list[iterator][0].lower() not in stop:
                if words_n_tags_list[iterator][1]=='JJ' or words_n_tags_list[iterator][1]=='NN' or words_n_tags_list[iterator][1]=='NNP' or words_n_tags_list[iterator][1]=='NNS' or words_n_tags_list[iterator][1]=='RB':
                    if iterator>0 and iterator-last_noun_index==1:
                        nouns[len(nouns)-1]=nouns[len(nouns)-1]+' '+words_n_tags_list[iterator][0]
                    else:
                        nouns.append(words_n_tags_list[iterator][0])
                    Context=Context+words_n_tags_list[iterator][0]+' '
                    last_noun_index=iterator
                elif words_n_tags_list[iterator][1]=='VBZ' or words_n_tags_list[iterator][1]=='VBN' or words_n_tags_list[iterator][1]=='CD':
                    if iterator>0 and iterator-last_verb_index==1:
                        verbs[len(verbs)-1]=verbs[len(verbs)-1]+' '+words_n_tags_list[iterator][0]
                    else:
                        verbs.append(words_n_tags_list[iterator][0])
                    Context=Context+words_n_tags_list[iterator][0]+' '
                    last_verb_index=iterator
        return nouns, verbs,Context
    
    def separate_nouns_n_verbs_for_overlap(self,user_input):
        blob= TextBlob(user_input)
        words_n_tags_list=blob.tags
        stop = set(stopwords.words('english'))
        nouns=[]
        verbs=[]
        last_noun_index=-1
        last_verb_index=-1
        for iterator in range (len(words_n_tags_list)):
            if words_n_tags_list[iterator][0] not in stop and (words_n_tags_list[iterator][0].lower()!='charges' and words_n_tags_list[iterator][0].lower()!='charge' and words_n_tags_list[iterator][0].lower()!='fee' and words_n_tags_list[iterator][0].lower()!='fees'):
                if words_n_tags_list[iterator][1]=='JJ' or words_n_tags_list[iterator][1]=='NN' or words_n_tags_list[iterator][1]=='NNP' or words_n_tags_list[iterator][1]=='NNS':
                    nouns.append(words_n_tags_list[iterator][0])
                elif words_n_tags_list[iterator][1]=='VBZ' or words_n_tags_list[iterator][1]=='VBN':
                    verbs.append(words_n_tags_list[iterator][0])
        return nouns, verbs
    
    def get_input_type(self,user_input):
        type_dictionary=['why','what','how','when','who','want to know','where','which','please provide','provide','please give', 'give','please share', 'share', 'help']
        for iterator in range  (len(type_dictionary)):
            if type_dictionary[iterator] in user_input.lower():
                return "Question"
    
        user_input_split=user_input.lower().split(' ')
        if user_input_split[0]=='is' or user_input_split[0]=='are':
            return "Info"
        return "Info"
    
    def pre_process(self,user_input):
        while(1):#Removing extra spaces
            if "  " in user_input:
                user_input=user_input.replace("  "," ")
            else:
                break
        user_input=user_input.replace('\r','')
        find_phrase=['contact no', 'mobile no', 'board line no', 'board no', 'contact #', 'mobile #', 'fax no', 'location', 'license no', 'reference no' , 'CCC','OPR']
        replace_phrase=['contact number', 'mobile number', 'board line number', 'board number', 'contact number', 'mobile number', 'fax number','address', 'license number', 'reference number', 'Contact Call Centre', 'Operator']
        for iterator in range(len(find_phrase)):
            if find_phrase[iterator] in user_input:
                user_input=user_input.replace(find_phrase[iterator],replace_phrase[iterator])
    
        return user_input
    
    def check_overlapping_nouns(self,user_input_noun,this_line_noun, user_input_verbs,this_line_verb):
        n_overlap=0
        for iterator_input in range(len(user_input_noun)):
            for iterator_this_line in range(len(this_line_noun)):
                if user_input_noun[iterator_input].lower()in this_line_noun[iterator_this_line].lower() or this_line_noun[iterator_this_line].lower() in user_input_noun[iterator_input].lower():
                    n_overlap+=1
    
        for iterator_input in range(len(user_input_verbs)):
            for iterator_this_line in range(len(this_line_verb)):
                if user_input_verbs[iterator_input].lower() in this_line_verb[iterator_this_line].lower() or this_line_verb[iterator_this_line].lower() in user_input_verbs[iterator_input].lower():
                    n_overlap+=1
        return n_overlap