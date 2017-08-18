from xlrd import open_workbook
import global_variable

def finding_the_main_topic(db,sheet,user_input, nouns, matching_rows, row_wise_frequencies,topic, sub_topic, topic_destination):
    later=0
    ###finding best match row
    best_match_row=-1
    best_match_row_index=-1
    Options=''
    response={}
    response['type'] = 'text'
    for iterator in range(len(matching_rows)):
        if int(row_wise_frequencies[iterator])==best_match_row and int(matching_rows[iterator])<115:#### Following piece of code is to provide different options to the user in case of multiple match.*************
            second_option= sheet.row(int(matching_rows[iterator])-1)[0].value
            for extractor in range (len(second_option)):
                if second_option[len(second_option)-extractor-1].isalpha():#It removes * or #which appears for footnotes
                    break
            second_option=second_option[:len(second_option)-extractor+1]
            if Options=='':
                first_option=sheet.row(int(matching_rows[iterator-1])-1)[0].value
                for extractor in range (len(first_option)):
                    if first_option[len(first_option)-extractor-1].isalpha():
                        break
                first_option=first_option[:len(first_option)-extractor]

                Options="1. "+first_option+ "; or\n2. "+ second_option
                options_count=3
            else:
                Options=Options+"; or\n" + str(options_count)+". "+second_option
                options_count+=1
        if int(row_wise_frequencies[iterator])>best_match_row and int(matching_rows[iterator])<115:###Please change the hard cording to generated no
            best_match_row=int(row_wise_frequencies[iterator])
            best_match_row_index=iterator

    ###checking if there are multiple rows with best match
    if Options!='':
        response['Text']="Please let me know which one of the following are you looking for \n"+ Options
        response_type="further options"
        return response, response_type
    ###finding the topic for best match row
    sheet_row= sheet.row(int(matching_rows[best_match_row_index])-1)
    need_to_check_product_type=0
    for iterator in range(len(sheet_row)):
        if iterator>1:
            if sheet_row[iterator] !='Free':
                need_to_check_product_type=1
                break
    if need_to_check_product_type==1:
        product_col=-1
        if str(sub_topic)!='' and str(sub_topic)!=' ':
            #Matching Product_type with Product types in heading
            products_in_sheet=sheet.row(5)
            for iterator_products_in_sheet in range(len(products_in_sheet)):
                if (products_in_sheet[iterator_products_in_sheet].value)!='' and '/' in products_in_sheet[iterator_products_in_sheet].value:
                    products_split=(products_in_sheet[iterator_products_in_sheet].value).split('/')
                    for iterator_individual_product_split in range(len(products_split)):
                        if str(products_split[iterator_individual_product_split]) in str(sub_topic):
                            product_col=iterator_products_in_sheet
                            later=iterator_individual_product_split
                elif (products_in_sheet[iterator_products_in_sheet].value)!='' :
                    if products_in_sheet[iterator_products_in_sheet].value in sub_topic:
                        product_col=iterator_products_in_sheet

            if sheet_row[product_col]=='Free' or sheet_row[product_col]=='NA':
                response['Text'] = sheet_row[1].encode('ascii','ignore')
            else:
                if sheet_row[1].value=='NA' or sheet_row[1].value=='Free':
                    if '/' in sheet_row[product_col].value:
                        response['Text'] = ((sheet_row[product_col].value).split('/')[later]).encode('ascii','ignore')
                else:
                    if '/' in sheet_row[product_col].value:
                        response['Text'] = ((sheet_row[product_col].value).split('/')[later]).encode('ascii','ignore') +'. \n'+'In addition to the above, '+ (sheet_row[1].value).encode('ascii','ignore')
                    elif 'Std charges'.lower() in (sheet_row[product_col].value).lower():
                        response['Text'] = (sheet_row[product_col].value).encode('ascii','ignore') +'. \n'+'Standard Charges, '+ (sheet_row[1].value).encode('ascci','ignore')
                    elif '*' in (sheet_row[product_col].value).lower():
                        response['Text'] = (sheet_row[1].value).encode('ascii','ignore')
                    else:
                        response['Text'] = (sheet_row[product_col].value).encode('ascii','ignore') +'. \n'+'In addition to the above, '+ (sheet_row[1].value).encode('ascii','ignore')


            response_type="details provided"
        else:
            response['Text'] = "Please enter your " + topic+ " type"
            response_type="further query"
            global_variable.gb_topic=topic
    else:
        response['Text'] = "There are no charges for this"
        response_type="details provided"

#    if(type(response['Text'])==str):
#        response['Text'] = [response['Text']]
    return response, response_type

def new_format_finding_the_main_topic(db,sheet, matching_rows, row_wise_frequencies,topic, sub_topic, topic_destination):
    later=0
    ###finding best match row
    best_match_row=-1
    best_match_row_index=-1
    Options=''
    response={}
    response['type'] = 'text'
    for iterator in range(len(matching_rows)):
        if int(row_wise_frequencies[iterator])==best_match_row:#### Following piece of code is to provide different options to the user in case of multiple match.*************
            second_option= sheet.row(int(matching_rows[iterator])-1)[0].value
            for extractor in range (len(second_option)):
                if second_option[len(second_option)-extractor-1].isalpha():#It removes * or #which appears for footnotes
                    break
            second_option=second_option[:len(second_option)-extractor+1]
            if Options=='':
                first_option=sheet.row(int(matching_rows[iterator-1])-1)[0].value
                for extractor in range (len(first_option)):
                    if first_option[len(first_option)-extractor-1].isalpha():
                        break
                first_option=first_option[:len(first_option)-extractor]

                Options="1. "+first_option+ "; or\n2. "+ second_option
                options_count=3
            else:
                Options=Options+"; or\n" + str(options_count)+". "+second_option
                options_count+=1
        if int(row_wise_frequencies[iterator])>best_match_row:###Please change the hard cording to generated no
            best_match_row=int(row_wise_frequencies[iterator])
            best_match_row_index=iterator

    ###checking if there are multiple rows with best match
    if Options!='':
        response['Text']="Please let me know which one of the following are you looking for \n"+ Options
        response_type="further options"
        return response, response_type
    ###finding the topic for best match row
    sheet_row= sheet.row(int(matching_rows[best_match_row_index])-1)
    need_to_check_product_type=0
    for iterator in range(len(sheet_row)):
        if iterator>1:
            if sheet_row[iterator] !='Free':
                need_to_check_product_type=1
                break
    if need_to_check_product_type==1:
        product_col=-1
        if str(sub_topic)!='' and str(sub_topic)!=' ':
            #Matching Product_type with Product types in heading
            products_in_sheet=sheet.row(0)
            for iterator_products_in_sheet in range(len(products_in_sheet)):
                if (products_in_sheet[iterator_products_in_sheet].value)!='' and '/' in products_in_sheet[iterator_products_in_sheet].value:
                    products_split=(products_in_sheet[iterator_products_in_sheet].value).split('/')
                    for iterator_individual_product_split in range(len(products_split)):
                        if str(products_split[iterator_individual_product_split]) in str(sub_topic):
                            product_col=iterator_products_in_sheet
                            later=iterator_individual_product_split
                            break
                elif (products_in_sheet[iterator_products_in_sheet].value)!='' :
                    if products_in_sheet[iterator_products_in_sheet].value in sub_topic:
                        product_col=iterator_products_in_sheet

            if sheet_row[product_col]=='Free' or sheet_row[product_col]=='-' or sheet_row[product_col]==' ' or sheet_row[product_col]=='':
                response['Text'] = 'Free'
            else:
                if '/' in sheet_row[product_col].value:
                    response['Text'] = ((sheet_row[product_col].value).split('/')[later]).encode('ascii','ignore') +'.'
                else:
                    response['Text'] = (sheet_row[product_col].value).encode('ascii','ignore') +'.'
            response_type="details provided"
        else:
            response['Text'] = "Please enter your " + topic+ " type"
            response_type="further query"
    else:
        response['Text'] = "There are no charges for this"
        response_type="details provided"

    return response, response_type

