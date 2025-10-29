from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

with open('src/backend/data/users.json', 'r', encoding='UTF-8') as data:
  users = json.load(data)

@app.route('/users', methods=['GET'])
def getUsers():
  try:
    return jsonify(users)
  except:
    return jsonify({"menssage": "users not found"}), 404

@app.route('/users/<string:name>', methods=['GET'])
def getUsersByName(name):
  try:
    for user in users:
      if user.get('name') == name:
        return jsonify(user)
      else:
        return jsonify({"menssage": "User not found"}), 404
  except:
    return jsonify({"menssage": "internal server Error"}), 500
    
@app.route('/users/<string:name>', methods=['PUT'])
def editUser(name):
  try:
    try:
      editedUser = request.get_json()
    except:
      return jsonify({"menssage": "Not accepted"}), 406
    
    for index,user in enumerate(users):
      if user.get('name') == name:
        users[index].update(editedUser)
    return jsonify(users)
  except: 
    return jsonify({"menssage": "Server Error"}), 500

@app.route('/users', methods=['POST'])
def createNewUser():
  try:
    newUser = request.get_json()
    users.append(newUser)
    return jsonify(users)
  except:
    return jsonify({"menssage": "Not accepted"}), 406

@app.route('/users/<string:name>', methods=['DELETE'])
def deleteUser(name):
  for index,user in enumerate(users):
    if user['name'] == name:
      del users[index]
  return jsonify({"menssage": "usuário excluido com secesso!"}, users)

app.run(port=5000, host='localhost', debug=True)