import json

import requests
from bson import ObjectId
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from configparser import ConfigParser
from .models import *


# Create your views here.


def get_db_object_id():
    config = ConfigParser()
    config.read('config.cfg')
    object_id = config['mongodb']['object_id']
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
            f'https://maps.googleapis.com/maps/api/geocode/json?address={search}&key=AIzaSyAbXbGA2ISQnS26IYk-wsnp54EL-o9q4Vk')
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
            f'https://maps.googleapis.com/maps/api/geocode/json?address={search}&key=AIzaSyAbXbGA2ISQnS26IYk-wsnp54EL-o9q4Vk')
        new_data = {'hospital': each['hospital'], 'district': each['district'],
                    'total_beds': each['total_beds'], 'available_beds': each['available_beds'], 'address': r.json()}
        pvt_response.append(new_data)
    return {'govt': govt_response, 'pvt': pvt_response}


@csrf_exempt
def fetch_all_new(request):
    if request.method == 'GET':
        object_id = get_db_object_id()
        entries = AvailableBeds.objects.get(_id=ObjectId(object_id))
        return JsonResponse({'response': {'hospitals': entries.hospitals, 'safe_homes': entries.safe_homes}}, safe=False)


@csrf_exempt
def fetch_all(request):
    if request.method == 'GET':
        govt = list()
        pvt = list()
        entries = (AvailableBeds.objects.get(_id=ObjectId('6099092352233916d0b22b99')))
        for each in entries.data['govt']:
            val = json.loads(json.dumps(each))
            if val:
                data = {'hospital': val['hospital'],
                        'district': val['district'],
                        'total_beds': val['total_beds'],
                        'available_beds': val['available_beds'],
                        'address': val['address']['results'][0]['formatted_address'],
                        'lat': val['address']['results'][0]['geometry']['location']['lat'],
                        'long': val['address']['results'][0]['geometry']['location']['lng']}
                govt.append(data)
        for each in entries.data['pvt']:
            val = json.loads(json.dumps(each))
            if val:
                data = {'hospital': val['hospital'],
                        'district': val['district'],
                        'total_beds': val['total_beds'],
                        'available_beds': val['available_beds'],
                        'address': val['address']['results'][0]['formatted_address'],
                        'lat': val['address']['results'][0]['geometry']['location']['lat'],
                        'long': val['address']['results'][0]['geometry']['location']['lng']}
                pvt.append(data)
        return JsonResponse({'response': {'govt': govt, 'pvt': pvt}}, safe=False)


@csrf_exempt
def fetch(request):
    if request.method == 'GET':
        yesterday = generate_yesterday().strftime("%d%m%Y")
        entries = AvailableBeds.objects.all()
        for entry in entries:
            data = generate_geolocation(entry.data)
            if entry.date == yesterday:
                return JsonResponse({'response': {'id': str(entry._id),
                                                  'date': entry.date,
                                                  'data': data}},
                                    safe=False)
            else:
                # return JsonResponse({'response': f"Entries not available for {yesterday}"})
                return JsonResponse({'response': {'id': str(entry._id),
                                                  'date': entry.date,
                                                  'data': data}},
                                    safe=False)
    else:
        return JsonResponse({'response': 'Invalid request type'}, safe=False)


def fetch_data():
    govt = list()
    pvt = list()
    entries = (AvailableBeds.objects.get(_id=ObjectId('6099092352233916d0b22b99')))
    for each in entries.data['govt']:
        val = json.loads(json.dumps(each))
        if val:
            if len(val['hospital']):
                data = {'hospital': val['hospital'],
                        'district': val['district'],
                        'total_beds': val['total_beds'],
                        'available_beds': val['available_beds'],
                        'address': val['address']['results'][0]['formatted_address'],
                        'lat': val['address']['results'][0]['geometry']['location']['lat'],
                        'long': val['address']['results'][0]['geometry']['location']['lng']}
                govt.append(data)
    for each in entries.data['pvt']:
        val = json.loads(json.dumps(each))
        if val:
            if len(val['hospital']):
                data = {'hospital': val['hospital'],
                        'district': val['district'],
                        'total_beds': val['total_beds'],
                        'available_beds': val['available_beds'],
                        'address': val['address']['results'][0]['formatted_address'],
                        'lat': val['address']['results'][0]['geometry']['location']['lat'],
                        'long': val['address']['results'][0]['geometry']['location']['lng']}
            pvt.append(data)
    return {'govt': govt, 'pvt': pvt}


def generate_districts_set():
    cities = set()
    resp = fetch_data()
    govt = resp['govt']
    pvt = resp['pvt']
    for entries in govt:
        cities.add(str(entries['district']).replace('\n', ' '))
    for entries in pvt:
        cities.add(str(entries['district']).replace('\n', ' '))
    return list(cities)


@csrf_exempt
def fetch_districts(request):
    if request.method == 'GET':
        cities = generate_districts_set()
        return JsonResponse({'response': cities}, safe=False)


def generate_district_dict():
    districts = generate_districts_set()
    district_dict = dict.fromkeys(districts)
    for key in district_dict.keys():
        district_dict[key] = {'govt': [], 'pvt': []}
    return district_dict


def generate_morphed_data():
    district_dict = generate_district_dict()
    resp = fetch_data()
    govt = resp['govt']
    pvt = resp['pvt']
    for item in govt:
        if item['district'] in district_dict:
            district_dict[item['district']]['govt'].append(item)
    for item in pvt:
        if item['district'] in district_dict:
            district_dict[item['district']]['pvt'].append(item)
    return district_dict


@csrf_exempt
def fetch_morphed_data(request):
    if request.method == 'GET':
        morphed_data = generate_morphed_data()
        # Paschim Bardhaman
        morphed_data['Paschim Bardhaman']['govt'] = [*morphed_data['Paschim Bardhaman']['govt'],
                                                     *morphed_data['Paschim Bardwan']['govt']]
        morphed_data['Paschim Bardhaman']['pvt'] = [*morphed_data['Paschim Bardhaman']['pvt'],
                                                    *morphed_data['Paschim Bardwan']['pvt']]
        del morphed_data['Paschim Bardwan']
        # North 24 Pgs
        morphed_data['North 24 Pgs']['govt'] = [*morphed_data['North 24 Pgs']['govt'], *morphed_data['N-24Pgs']['govt'],
                                                *morphed_data['N-24 Pgs']['govt']]
        morphed_data['North 24 Pgs']['pvt'] = [*morphed_data['North 24 Pgs']['pvt'], *morphed_data['N-24Pgs']['pvt'],
                                               *morphed_data['N-24 Pgs']['pvt']]
        del morphed_data['N-24Pgs']
        del morphed_data['N-24 Pgs']
        # South 24 Parganas
        morphed_data['South 24 Parganas']['govt'] = [*morphed_data['South 24 Parganas']['govt'],
                                                     *morphed_data['S-24 Pgs']['govt']]
        morphed_data['South 24 Parganas']['pvt'] = [*morphed_data['South 24 Parganas']['pvt'],
                                                    *morphed_data['S-24 Pgs']['pvt']]
        del morphed_data['S-24 Pgs']
        return JsonResponse({'response': morphed_data}, safe=False)


def fetch_current_location(request):
    if request.method == 'GET':
        r = requests.post(
            'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAbXbGA2ISQnS26IYk-wsnp54EL-o9q4Vk')
        loc = r.json()
        return JsonResponse({'response': {'lat': loc['location']['lat'], 'lng': loc['location']['lng']}})
    return JsonResponse({'response': {}})
