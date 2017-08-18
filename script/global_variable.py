from xlrd import open_workbook
from textblob import TextBlob
db_host="localhost"
db_user="root"
db_passwd="Mysql@123"
db_dbname="tenaliramachatbot"
mongo_port = 27017
framework_excel_path = 'C:/node/chatbot/script/framework_excel/'
input_file = framework_excel_path + 'Input.xlsx'
cache_file = framework_excel_path + 'cache_file.csv'
#gv_temp_path='C:/Users/Eighteen/workspace/kotak_chatbot2/kotak2/static/temp_session_files/'
gv_temp_path='C:/node/chatbot/script/temp_session_files/'
new_topic_book = open_workbook(framework_excel_path+'new_topic_mapping.xlsx',on_demand=True)
topic_book = open_workbook(framework_excel_path+'Topic_mapping.xlsx',on_demand=True)
#framework_excel_path = "C:/Users/Eighteen/workspace/kotak_chatbot2/kotak2/static/framework_excel/"
response={}
response_type=''
#Context Management Variables
Context=''
Context_1=''
Context_2=''
Context_3=''
Context_4=''
Context_5=''

#Process Tree Variables
gb_dt_start_row=-1
gb_dt_end_row=-1
gb_dt_current_cursor_row=-1
gb_dt_current_cursor_col=-1
gb_dt_file_name=''

#For Topic Mapping
gb_topic_tuple_array=[]
gb_max_ratio_index_in_tuple=[]
gb_topic=''

#For Rate Card
gb_matched_row_values=[]
gb_matched_col_values=[]