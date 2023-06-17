#!/bin/python3

import requests
import json
from datetime import datetime, timedelta
from faker import Faker
import random
from time import sleep


fake = Faker()

def generate_random_json_1(actualMonth):
    current_date = datetime.now()
    start_date = current_date - timedelta(days=7)

    if(actualMonth != True):
        start_date = start_date - timedelta(days=365)
        current_date = current_date - timedelta(days=31)

    random_date = fake.date_between_dates(start_date, current_date)
    random_time = fake.time(pattern="%H:%M:%S")

    timestamp = {
        'date': random_date.strftime("%Y-%m-%d"),
        'time': random_time
    }
    value = str(random.choice([random.uniform(45, 60), random.uniform(100, 150)]))
    vehicleID = fake.uuid4()

    data = {
        'timestamp': timestamp,
        'value': value,
        'vehicleID': vehicleID
    }
    return json.dumps(data)

def generate_random_json_2(actualMonth):
    current_date = datetime.now()
    start_date = current_date - timedelta(days=7)

    if(actualMonth != True):
        start_date = start_date - timedelta(days=365)
        current_date = current_date - timedelta(days=31)

    random_date = fake.date_between_dates(start_date, current_date)
    random_time = fake.time(pattern="%H:%M:%S")

    timestamp = {
        'date': random_date.strftime("%Y-%m-%d"),
        'time': random_time
    }
    value = str(random.choice([random.uniform(3, 6), random.uniform(-6, -3)]))
    vehicleID = fake.uuid4()

    data = {
        'timestamp': timestamp,
        'value': value,
        'vehicleID': vehicleID
    }
    return json.dumps(data)

def post_to_rest_api(url, json_data):
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, data=json_data, headers=headers)
    if response.status_code != 200:
        print(f'Failed to post JSON to {url}. Status code: {response.status_code}')

# URLs of the REST APIs
url1 = 'http://localhost:3000/api/post/heartAlert'
url2 = 'http://localhost:3000/api/post/driveAlert'


print("Generating last year Alerts...")
# Generate alert in the past Year
for i in range(random.randint(300,600)):
    url = random.choice([url1, url2])  # Choose random URL
    if url == url1:
        post_to_rest_api(url, generate_random_json_1(False))  # heart alerts
    else:
        post_to_rest_api(url, generate_random_json_2(False))  # drive alerts

print("Generating last week alert (infinite loop)")
# Post weekly JSONs to the REST APIs
while True:
    url = random.choice([url1, url2])  # Choose random URL
    if url == url1:
        post_to_rest_api(url, generate_random_json_1(True))  # heart alerts
    else:
        post_to_rest_api(url, generate_random_json_2(True))  # drive alerts
    sleep(1)
