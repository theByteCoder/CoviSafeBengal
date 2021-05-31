import json
import requests
from bson import ObjectId
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *
from common import get_db_object_id


# Create your views here.


def generate_yesterday():
    from datetime import date, timedelta
    today = date.today()
    return today - timedelta(days=1)


def generate_geolocation(data):
    api_key = get_db_object_id('google', 'api_key')
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
            f'https://maps.googleapis.com/maps/api/geocode/json?address={search}&key={api_key}')
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
            f'https://maps.googleapis.com/maps/api/geocode/json?address={search}&key={api_key}')
        new_data = {'hospital': each['hospital'], 'district': each['district'],
                    'total_beds': each['total_beds'], 'available_beds': each['available_beds'], 'address': r.json()}
        pvt_response.append(new_data)
    return {'govt': govt_response, 'pvt': pvt_response}


@csrf_exempt
def fetch_hospitals(request):
    if request.method == 'GET':
        object_id = get_db_object_id('mongodb', 'hospital_id')
        entries = AvailableHospitalBeds.objects.get(_id=ObjectId(object_id))
        return JsonResponse({'hospitals': entries.hospitals, 'updated_at': entries.updated_at}, safe=False)


@csrf_exempt
def fetch_safe_homes(request):
    if request.method == 'GET':
        object_id = get_db_object_id('mongodb', 'safe_home_id')
        entries = AvailableSafeHomes.objects.get(_id=ObjectId(object_id))
        return JsonResponse({'safe_homes': entries.safe_homes, 'updated_at': entries.updated_at}, safe=False)


@csrf_exempt
def fetch_ambulances(request):
    if request.method == 'GET':
        object_id = get_db_object_id('mongodb', 'ambulance_id')
        entries = AvailableAmbulances.objects.get(_id=ObjectId(object_id))
        return JsonResponse({'ambulances': entries.ambulances, 'updated_at': entries.updated_at}, safe=False)


def fetch_current_location(request):
    if request.method == 'GET':
        api_key = get_db_object_id('google', 'api_key')
        r = requests.post(
            f'https://www.googleapis.com/geolocation/v1/geolocate?key={api_key}')
        loc = r.json()
        return JsonResponse({'response': {'lat': loc['location']['lat'], 'lng': loc['location']['lng']}})
    return JsonResponse({'response': {}})
