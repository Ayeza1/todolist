from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

todos = []
next_id = 1

@app.route("/todos", methods=["GET"])
def get_todos():
    return jsonify(todos)

@app.route("/todos", methods=["POST"])
def post_todos():
    global next_id
    data=request.get_json()
    if not data or "title" not in data or not data["title"].strip():
        return jsonify({"error":"Title required"}),400
    item={"id":next_id,"title":data["title"],"done":False}
    todos.append(item)
    next_id+=1
    return jsonify(item),201

@app.route("/todos/<int:todo_id>", methods=["PUT"])
def update_todo(todo_id):
    data= request.get_json()
    for item in todos:
        if item["id"]==todo_id:
            if "title" in data:
                item["title"]=data["title"]
            if "done" in data:
                item["done"]=data["done"]
            return jsonify(item)
    return jsonify({"error": "Todo not found"}), 404

@app.route("/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    global todos
    for item in todos:
        if item["id"]==todo_id:
            new_todos=[]
            for t in todos:
                if t["id"]!=todo_id:
                    new_todos.append(t)
            todos=new_todos
            return jsonify({"message":"Deleted "}),200
    return jsonify({"error": "Todo not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)