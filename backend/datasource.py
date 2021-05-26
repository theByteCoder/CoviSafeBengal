import pprint
import time
import schedule
from webscrapper import get_daily_hospital_data, get_daily_safe_home_data
from configparser import ConfigParser
from datetime import date, timedelta, datetime


# this is a datasource scheduler.
# it will be executed everyday at 6 AM
# in he morning to capture the latest data


def get_yesterday():
    today = date.today()
    return (today - timedelta(days=1)).strftime("%d%m%Y")


def get_updated_at_time():
    return datetime.now().strftime("%d%m%Y%H%M%S")


def hospital_scrapper():
    hospital_data = get_daily_hospital_data()
    return hospital_data


def safe_home_scrapper():
    safe_home_data = get_daily_safe_home_data()
    return safe_home_data


def extract_all_datasource():
    hospital_data = hospital_scrapper()
    safe_home_data = safe_home_scrapper()
    yesterday = get_yesterday()
    updated_at = get_updated_at_time()
    data = {'date': yesterday, 'updated_at': updated_at, 'hospitals': hospital_data, 'safe_homes': safe_home_data}
    pprint.pprint(data)
    return data


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


insert_datasource()
# schedule.every().day.at("06:00").do(insert_datasource)
# while True:
#     schedule.run_pending()
#     time.sleep(1)
