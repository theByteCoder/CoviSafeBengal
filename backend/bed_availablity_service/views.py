import json
import requests
from bson import ObjectId
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from configparser import ConfigParser
from .models import *


# Create your views here.


def get_db_object_id(object_id):
    config = ConfigParser()
    config.read('config.cfg')
    object_id = config['mongodb'][object_id]
    return object_id


def generate_yesterday():
    from datetime import date, timedelta
    today = date.today()
    return today - timedelta(days=1)


def generate_geolocation(data):
    govt_response = list()
    pvt_response = list()
    govt = json.loads(json.dumps(data['govt']))
    for each in govt:
        address = each['hospital'].split()
        search = ""
        for compos in address:
            search += f'{compos}+'
        search += each['district']
        r = requests.get(
            f'https://maps.googleapis.com/maps/api/geocode/json?address={search}&key=<api key here>')
        new_data = {'hospital': each['hospital'], 'district': each['district'],
                    'total_beds': each['total_beds'], 'available_beds': each['available_beds'], 'address': r.json()}
        govt_response.append(new_data)
    pvt = json.loads(json.dumps(data['pvt']))
    for each in pvt:
        address = each['hospital'].split()
        search = ""
        for compos in address:
            search += f'{compos}+'
        search += each['district']
        r = requests.get(
            f'https://maps.googleapis.com/maps/api/geocode/json?address={search}&key=<api key here>')
        new_data = {'hospital': each['hospital'], 'district': each['district'],
                    'total_beds': each['total_beds'], 'available_beds': each['available_beds'], 'address': r.json()}
        pvt_response.append(new_data)
    return {'govt': govt_response, 'pvt': pvt_response}


@csrf_exempt
def fetch_hospitals(request):
    if request.method == 'GET':
        object_id = get_db_object_id('hospital_id')
        entries = AvailableHospitalBeds.objects.get(_id=ObjectId(object_id))
        return JsonResponse({'hospitals': entries.hospitals, 'updated_at': entries.updated_at}, safe=False)


@csrf_exempt
def fetch_safe_homes(request):
    if request.method == 'GET':
        object_id = get_db_object_id('safe_home_id')
        entries = AvailableSafeHomes.objects.get(_id=ObjectId(object_id))
        return JsonResponse({'safe_homes': entries.safe_homes, 'updated_at': entries.updated_at}, safe=False)


@csrf_exempt
def fetch_ambulances(request):
    if request.method == 'GET':
        object_id = get_db_object_id('ambulance_id')
        entries = AvailableAmbulances.objects.get(_id=ObjectId(object_id))
        return JsonResponse({'ambulances': entries.ambulances, 'updated_at': entries.updated_at}, safe=False)


def fetch_current_location(request):
    if request.method == 'GET':
        r = requests.post(
            'https://www.googleapis.com/geolocation/v1/geolocate?key=<api key here>')
        loc = r.json()
        return JsonResponse({'response': {'lat': loc['location']['lat'], 'lng': loc['location']['lng']}})
    return JsonResponse({'response': {}})
