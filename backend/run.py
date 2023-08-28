from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
app.config.update(SESSION_COOKIE_SAMESITE = "None")
CORS(app, supports_credentials=True)

@app.route("/")
def hello_world():
    return "Trello Clone (Aakash Rajpurkar)"

@app.route("/tasks")
def get_tasks():
  f = open('tasks.json')
  data = json.load(f)
  
  return jsonify(data)
  
@app.route("/submitTask", methods = ['POST'])
def submitTask():
  
  with open("tasks.json") as f:
    taskData = json.load(f)
    form_data = json.loads(request.get_data())
    
    task_id = form_data['task_id']
    task_title = form_data['task_title']
    task_description = form_data['task_description']
    task_status = form_data['task_status']

    
    if task_title == None or task_description == None or task_status == None:
      return "Null values", 401
    
    if task_status not in ('todo', 'doing', 'done'):
      return "Incorrect values", 401
    
    for task in taskData:
      
      if task['task_id'] == task_id:
        return 'Duplicate task_id found', 401
    
    taskData.append({
      "task_id": int(task_id),
      "task_title": task_title, 
      "task_description": task_description, 
      "task_status": task_status})
    
    with open('tasks.json', 'w') as json_file:
      json.dump(taskData,
                json_file, 
                indent=4,  
                separators=(',',': '))
    
  return 'Task Submitted', 200

@app.route('/editTask', methods=['PUT'])
def editTask():
  with open("tasks.json") as f:
    taskData = json.load(f)
    form_data = json.loads(request.get_data())
    
    c=0
    task_id = form_data['task_id']
    task_title = form_data['task_title']
    task_description = form_data['task_description']
    task_status = form_data['task_status']
    
    for task in taskData:
        
        if task['task_id'] == int(task_id):
          c+=1
          task['task_title'] = task_title
          task['task_description'] = task_description
          task['task_status'] = task_status
    
    with open('tasks.json', 'w') as json_file:
        json.dump(taskData,
                  json_file, 
                  indent=4,  
                  separators=(',',': '))
    
    if c==0:
      return 'Task not found', 401
    
    return 'Task Submitted', 200

@app.route('/deleteTask', methods=['DELETE'])
def deleteTask():
  with open("tasks.json") as f:
    taskData = json.load(f)
    
    task_id = request.args.get('task_id')
    c=0
   
    for task in taskData:  
      if task['task_id'] == int(task_id):
        c+=1
        taskData.remove(task)
    
    with open('tasks.json', 'w') as json_file:
        json.dump(taskData,
                  json_file, 
                  indent=4,  
                  separators=(',',': '))
    if c==0:
     return 'Task Not Found', 400 
    return 'Task Deleted', 200

if __name__ == '__main__':
  app.run(debug=True)