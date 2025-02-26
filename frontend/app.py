from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

ADD_STUDENT_URL = "https://b31i1zxvcd.execute-api.ap-south-1.amazonaws.com/prod/students"
GET_STUDENTS_URL = "https://fabj02e95h.execute-api.ap-south-1.amazonaws.com/prod/students"

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
