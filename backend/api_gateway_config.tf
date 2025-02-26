provider "aws" {
  region = "ap-south-1"
}

resource "aws_api_gateway_rest_api" "student_api" {
  name = "student-api"
}

# Resource for /students
resource "aws_api_gateway_resource" "students" {
  rest_api_id = aws_api_gateway_rest_api.student_api.id
  parent_id   = aws_api_gateway_rest_api.student_api.root_resource_id
  path_part   = "students"
}

# POST method for adding students
resource "aws_api_gateway_method" "add_student" {
  rest_api_id   = aws_api_gateway_rest_api.student_api.id
  resource_id   = aws_api_gateway_resource.students.id
  http_method   = "POST"
  authorization = "NONE"
}

# GET method for retrieving students
resource "aws_api_gateway_method" "get_students" {
  rest_api_id   = aws_api_gateway_rest_api.student_api.id
  resource_id   = aws_api_gateway_resource.students.id
  http_method   = "GET"
  authorization = "NONE"
}

# Enable CORS
resource "aws_api_gateway_method" "students_options" {
  rest_api_id   = aws_api_gateway_rest_api.student_api.id
  resource_id   = aws_api_gateway_resource.students.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}
