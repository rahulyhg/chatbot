import win32com.client as win32
from PIL import ImageGrab
from win32com.client import Dispatch
from xlrd import open_workbook
import os, pythoncom
import global_variable
from ctypes import windll

def process_sheet(topic, sub_topic, topic_destination,session_id):
    pythoncom.CoInitialize()
    #xlApp = win32.gencache.EnsureDispatch('Excel.Application')
    xlApp=win32.Dispatch('Excel.Application')
    wb = xlApp.Workbooks.Open(topic_destination)
    r = wb.Worksheets('Sheet1')
    counter=1
    path_images=global_variable.gv_temp_path
    path_clipboard=global_variable.gv_temp_path
    for shapes in r.Shapes:
        shapes.Copy()
        try:
            im = ImageGrab.grabclipboard()
            if not os.path.exists(path_images+str(session_id)+"/Temp/"):
                os.makedirs(path_images+str(session_id)+"/Temp/")
            im.save(path_images+str(session_id)+"/Temp/"+"image-00"+str(counter)+".png","PNG")
            counter+=1
        except Exception,e:
            print(e)

    iterator=1
    start_line=0
    image_counter=1
    while (1):
        if r.Cells(iterator,2).Value=="Image" and start_line==0:
            image_counter+=1
        if r.Cells(iterator,1).Value==topic:
            start_line=iterator
        elif start_line>0 and r.Cells(iterator,1).Value is not None:
            last_line=iterator-1
            break
        if r.Cells(iterator,1).Value=="End" or r.Cells(iterator,1).Value=="end":
            last_line=iterator-1
            break
        iterator+=1
    if start_line==0 and last_line>0:
        print "No Match Found"
        return
    Instruction_list=[]
    Instruction={}
    text=''
    image=''
    note=''
    image_path=''
    clipboard_image_count=1
    print last_line
    iterator_row=start_line
    while iterator_row<last_line:
        for iterator_col in range(2,22):
            if iterator_col==2 and r.Cells(iterator_row,2).Value=="Image":#Either it looks for text and image combination or the next instruction to add in the dictionary
                if not os.path.exists(path_images+str(session_id)+"/Temp/"):
                    os.makedirs(path_images+str(session_id)+"/Temp/")
                image_path=path_images+str(session_id)+"/Temp/"+"image-00"+str(image_counter)+".png"
                image_counter+=1
                Instruction["Text"]=text
                Instruction['Image']=image_path
                Instruction["type"]="Image"
                Instruction_list.append(Instruction)
                Instruction={}
                text=''
                image_path=''
                break
            elif iterator_col==2 and r.Cells(iterator_row,2).Value=="Note":
                #to capture 10 lines for note
                while(1):
                    if iterator_row>last_line:
                        break
                    if iterator_row+30>last_line:
                        to_line=last_line
                    else:
                        to_line=iterator_row+30
                    for iterator_capture in range(iterator_row,to_line):
                        if r.Cells(iterator_capture,2).Value is not None and r.Cells(iterator_capture,2).Value!='Note':
                            break
                    r.Range(r.Cells(iterator_row,4),r.Cells(iterator_capture-1,20)).Copy()
                    im = ImageGrab.grabclipboard()
                    if not os.path.exists(path_images+str(session_id)+"/Clipboard/"):
                        os.makedirs(path_images+str(session_id)+"/Clipboard/")
                    clipboard_image_path=path_clipboard+str(session_id)+"/Clipboard/"+"image-00"+str(clipboard_image_count)+".png"
                    try:
                        im.save(clipboard_image_path,"PNG")
                    except:
                        print "break"
                    clipboard_image_count+=1
                    Instruction["type"]="Image"
                    Instruction["Text"]=text
                    Instruction["Image"]=clipboard_image_path
                    Instruction_list.append(Instruction)
                    Instruction={}
                    iterator_row=iterator_capture-1
                    if r.Cells(iterator_capture,2).Value is not None and r.Cells(iterator_capture,2).Value!='Note':
                        break
                    if iterator_row+30>last_line:
                        break
            elif text!='' and iterator_col==3 and r.Cells(iterator_row,3).Value is not None:# This is to capture cases where there are no images in the instructions and we are able to show different instructions separately
                Instruction["type"]="Image"
                Instruction["Text"]=text
                Instruction["Image"]=image_path
                Instruction_list.append(Instruction)
                Instruction={}
                text=''
                image_path=''
                break
            else:
                if r.Cells(iterator_row, iterator_col).Value is not None:
                    try:
                        text=text+" "+str(r.Cells(iterator_row, iterator_col))
                    except:
                        text=text+" "+str(r.Cells(iterator_row, iterator_col).Value.encode('ascii','ignore'))

        if text!='':
            text=text+"\n"
        iterator_row+=1
    print Instruction_list
    if windll.user32.OpenClipboard(None):
        windll.user32.EmptyClipboard()
        windll.user32.CloseClipboard()
    wb.Close(False)
    response={}
    response["type"]="Instruction"
    response["imagelist"]=Instruction_list
    return response,"Instruction"

#path_t='C:\Users\RohitMathur\Documents\EDL\Clients\KMB\Tenalirama\DC International Usage.xlsx'
#process_sheet("DC International Usage","New Domestic & International Limits",path_t)
