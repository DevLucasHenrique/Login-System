# ...existing code...
from flask import Flask, jsonify, request
from flask_cors import CORS
from pathlib import Path
import json

app = Flask(__name__)
CORS(app)

DATA_PATH = Path(__file__).resolve().parent / "data" / "users.json"

def load_users():
  if not DATA_PATH.exists():
    return []
  with DATA_PATH.open('r', encoding='utf-8') as f:
    return json.load(f)

def save_users(users):
  with DATA_PATH.open('w', encoding='utf-8') as f:
    json.dump(users, f, ensure_ascii=False, indent=2)

users = load_users()

@app.route('/users', methods=['GET'])
def getUsers():
  return jsonify(users), 200

@app.route('/users/<string:name>', methods=['GET'])
def getUsersByName(name):
  for user in users:
    if user.get('name') == name:
      return jsonify(user), 200
  return jsonify({"message": "User not found"}), 404

@app.route('/users/<string:name>', methods=['PUT'])
def editUser(name):
  editedUser = request.get_json(silent=True)
  if not isinstance(editedUser, dict):
    return jsonify({"message": "Invalid body"}), 400
  for i, user in enumerate(users):
    if user.get('name') == name:
      users[i].update(editedUser)
      save_users(users)
      return jsonify(users[i]), 200
  return jsonify({"message": "User not found"}), 404

@app.route('/users', methods=['POST'])
def createNewUser():
  newUser = request.get_json(silent=True)
  if not isinstance(newUser, dict) or 'name' not in newUser:
    return jsonify({"message": "Invalid body"}), 400
  if any(u.get('name') == newUser['name'] for u in users):
    return jsonify({"message": "User already exists"}), 409
  users.append(newUser)
  save_users(users)
  return jsonify(newUser), 201

@app.route('/users/<string:name>', methods=['DELETE'])
def deleteUser(name):
  for i, user in enumerate(users):
    if user.get('name') == name:
      deleted = users.pop(i)
      save_users(users)
      return jsonify({"message": "User deleted", "user": deleted}), 200
  return jsonify({"message": "User not found"}), 404

if __name__ == "__main__":
  app.run(port=5000, host='localhost', debug=True)