import json
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("Students")

def lambda_handler(event, context):
    try:
        response = table.scan()
        return {
            "statusCode": 200,
            "body": json.dumps(response["Items"]),
            "headers": {"Content-Type": "application/json"}
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}),
            "headers": {"Content-Type": "application/json"}
        }
