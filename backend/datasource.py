import time
import schedule
from webscrapper import get_daily_hospital_data, get_daily_safe_home_data, get_daily_ambulance_data
from configparser import ConfigParser
from datetime import date, timedelta, datetime


# this is a datasource scheduler.
# it will be executed everyday at 6 AM
# in he morning to capture the latest data


def get_yesterday():
    today = date.today()
    return (today - timedelta(days=1)).strftime("%d%m%Y")


def get_updated_at_time():
    return datetime.now().strftime("%d/%m/%Y %I:%M:%S %p")


def hospital_scrapper():
    hospital_data = get_daily_hospital_data()
    yesterday = get_yesterday()
    updated_at = get_updated_at_time()
    data = {'date': yesterday, 'updated_at': updated_at, 'hospitals': hospital_data}
    return data


def safe_home_scrapper():
    safe_home_data = get_daily_safe_home_data()
    yesterday = get_yesterday()
    updated_at = get_updated_at_time()
    data = {'date': yesterday, 'updated_at': updated_at, 'safe_homes': safe_home_data}
    return data


def ambulance_scrapper():
    ambulance_data = get_daily_ambulance_data()
    yesterday = get_yesterday()
    updated_at = get_updated_at_time()
    data = {'date': yesterday, 'updated_at': updated_at, 'ambulances': ambulance_data}
    return data


def connect_db():
    from pymongo import MongoClient
    return MongoClient(host="localhost", port=27017)


def set_db_object_id(object_prop, object_id):
    config = ConfigParser()
    config.read('config.cfg')
    db = config['mongodb']
    db[object_prop] = f'{object_id}'
    with open('config.cfg', 'w') as conf:
        config.write(conf)


def insert_hospital_beds(db, data):
    collection = db.bed_availablity_service_availablehospitalbeds
    action = collection.insert_one(data)
    object_id = action.inserted_id
    set_db_object_id('hospital_id', object_id)
    return object_id


def insert_safe_homes(db, data):
    collection = db.bed_availablity_service_availablesafehomes
    action = collection.insert_one(data)
    object_id = action.inserted_id
    set_db_object_id('safe_home_id', object_id)
    return object_id


def insert_ambulances(db, data):
    collection = db.bed_availablity_service_availableambulances
    action = collection.insert_one(data)
    object_id = action.inserted_id
    set_db_object_id('ambulance_id', object_id)
    return object_id


def disconnect_db(client):
    client.close()


def insert_datasource():
    start_time = time.time()
    client = connect_db()
    db = client.covibeds
    # insert hospital data
    hospital_data = hospital_scrapper()
    hospital_id = insert_hospital_beds(db, hospital_data)
    print('Hospital data updated. Object id ', hospital_id)
    # insert safe home data
    safe_home_data = safe_home_scrapper()
    safe_home_id = insert_safe_homes(db, safe_home_data)
    print('Safe home data updated. Object id ', safe_home_id)
    # insert ambulance data
    ambulance_data = ambulance_scrapper()
    ambulance_id = insert_ambulances(db, ambulance_data)
    print('Ambulance data updated. Object id ', ambulance_id)
    disconnect_db(client)
    end_time = time.time()
    execution_time = end_time - start_time
    print(f'Time taken {str(timedelta(seconds=execution_time))}')


# insert_datasource()
schedule.every(3).hours.do(insert_datasource)
while True:
    schedule.run_pending()
    time.sleep(1)
