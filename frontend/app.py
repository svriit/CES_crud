from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

ADD_STUDENT_URL = "https://your-lambda-url/add_student"
GET_STUDENTS_URL = "https://your-lambda-url/get_students"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/add_student", methods=["POST"])
def add_student():
    data = request.json
    response = requests.post(ADD_STUDENT_URL, json=data)
    return jsonify(response.json())

@app.route("/get_students", methods=["GET"])
def get_students():
    response = requests.get(GET_STUDENTS_URL)
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)
