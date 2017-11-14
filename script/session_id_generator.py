import datetime

class Session_ID_Generator(object):
    
    def __init__(self):
        pass
    
    def generate_new_session_id(self,db):
        session_cursor=db.cursor()
        session_cursor.execute("SELECT * FROM session_id_master")
        current_time=datetime.datetime.now()
        session_cursor.execute("""INSERT INTO session_id_master(time_stamp) VALUES (%(time_stamp)s)""", {'time_stamp':current_time})
        db.commit()
        session_cursor.execute("SELECT * FROM session_id_master WHERE Session_id IN (SELECT MAX(Session_id) FROM session_id_master)")
        row= session_cursor.fetchone()
    #     print row
        return row[0]