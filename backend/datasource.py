import pprint
import time
import schedule
from webscrapper import get_daily_data
from configparser import ConfigParser

# this is a datasource scheduler.
# it will be executed everyday at 6 AM
# in he morning to capture the latest data


def get_yesterday():
    from datetime import date, timedelta
    today = date.today()
    return today - timedelta(days=1)


def scrapper():
    data = get_daily_data()
    return data


def extract_all_datasource():
    data = scrapper()
    pprint.pprint(data)
    yesterday = get_yesterday().strftime("%d%m%Y")
    return {'date': yesterday, 'data': data}


def connect_db():
    from pymongo import MongoClient
    return MongoClient(host="localhost", port=27017)


def get_db_collection(client):
    db = client.covibeds
    return db.bed_availablity_service_availablebeds


def disconnect_db(client):
    client.close()


def insert_datasource():
    data = extract_all_datasource()
    client = connect_db()
    collection = get_db_collection(client)
    action = collection.insert_one(data)
    object_id = action.inserted_id
    set_db_object_id(object_id)
    print('Data updated. Object id ', action.inserted_id)
    disconnect_db(client)


def set_db_object_id(object_id):
    config = ConfigParser()
    config.read('config.cfg')
    db = config['mongodb']
    db['object_id'] = f'{object_id}'
    with open('config.cfg', 'w') as conf:
        config.write(conf)


# insert_datasource()
schedule.every().day.at("06:00").do(insert_datasource)
while True:
    schedule.run_pending()
    time.sleep(1)
