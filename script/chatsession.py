import time
import pymysql
from session_id_generator import Session_ID_Generator
import global_variable

class Session(object):
    """
    A single chat session.
    """

    def __init__(self):
        db = pymysql.connect(host=global_variable.db_host, user=global_variable.db_user, passwd=global_variable.db_passwd, db=global_variable.db_dbname)
        sess_id_gen_obj = Session_ID_Generator()
        self.id_string = sess_id_gen_obj.generate_new_session_id(db)
        # Initial conversation is empty
        self.data = {}
        self.DTHyperlink = ''
        self.LineNo = ''
        self.options = ''
        self.opts = ''
        self.row_by_framework_level = ''
        self.framework_level = 1
        self.response={}
        self.response_type =''
        #Form Variables
        self.form_input_type = ''
        self.form_input_dict = {}  
        self.form_input_list = []    
        self.form_category = ''
        #Context Management Variables
        self.Context=''
        self.Context_1=''
        self.Context_2=''
        self.Context_3=''
        self.Context_4=''
        self.Context_5=''
        
        #Process Tree Variables
        self.gb_dt_start_row=-1
        self.gb_dt_end_row=-1
        self.gb_dt_current_cursor_row=-1
        self.gb_dt_current_cursor_col=-1
        self.gb_dt_file_name=''
        self.gb_sub_topic_list = []
        self.gb_step_list = []
        self.gb_current_step = ''
        self.tooltip = []
        
        #For Topic Mapping
        self.gb_topic_tuple_array=[]
        self.gb_max_ratio_index_in_tuple=[]
        self.gb_topic=''
        
        
        #For Rate Card
        self.gb_matched_row_values=[]
        self.gb_matched_col_values=[]
    
    def get_id_string(self):
        return self.id_string


class ConversationSessionManager(object):
    """
    Object to hold and manage multiple chat sessions.
    """

    def __init__(self):
        self.sessions = {}

    def new(self):
        """
        Add a new chat session.
        """
        session = Session()
#         print("Created Session object with session_id : ",session.id_string)
#         self.sessions['id'] = session.id_string
        self.sessions[session.id_string] = session
		
        return session


    def get(self, session_id, default=None):
        """
        Return a session given a unique identifier.
        """
        return self.sessions.get(str(session_id), default)


    def update(self, session_id, conversance=time.strftime("%I:%M%p",time.localtime(time.time()))):
        """
        Add a conversance to a given session if the session exists.
        """
        session_id = str(session_id)
        if session_id in self.sessions:
            self.sessions[session_id].conversation.append(conversance)

    def setResponseType(self,session_id, response_type):
        self.sessions[session_id].response_type = response_type 

    def get_default(self):
        import warnings
        warnings.warn("get_default is deprecated. Use 'get' instead.", DeprecationWarning)

    def update_default(self, conversance):
        import warnings
        warnings.warn("update_default is deprecated. Use 'update' instead.", DeprecationWarning)
