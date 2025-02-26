import json
import boto3
import uuid

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("Students")

def lambda_handler(event, context):
    try:
        body = json.loads(event["body"])
        student_id = str(uuid.uuid4())
        
        item = {
            "id": student_id,
            "name": body["name"],
            "email": body["email"]
        }
        
        table.put_item(Item=item)
        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Student added successfully", "id": student_id}),
            "headers": {"Content-Type": "application/json"}
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}),
            "headers": {"Content-Type": "application/json"}
        }
