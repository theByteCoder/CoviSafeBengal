import json

import requests
from bson import ObjectId
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *


# Create your views here.


def get_yesterday():
    from datetime import date, timedelta
    today = date.today()
    return today - timedelta(days=1)


def get_geolocation(data):
    govt_response = list()
    pvt_response = list()
    govt = json.loads(json.dumps(data['govt']))
    for each in govt:
        address = each['hospital'].split()
        search = ""
        for compos in address:
            search += f'{compos}+'
        search += each['district']
        r = requests.get(f'https://maps.googleapis.com/maps/api/geocode/json?address={search}&key=AIzaSyAbXbGA2ISQnS26IYk-wsnp54EL-o9q4Vk')
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
        r = requests.get(f'https://maps.googleapis.com/maps/api/geocode/json?address={search}&key=AIzaSyAbXbGA2ISQnS26IYk-wsnp54EL-o9q4Vk')
        new_data = {'hospital': each['hospital'], 'district': each['district'],
                'total_beds': each['total_beds'], 'available_beds': each['available_beds'], 'address': r.json()}
        pvt_response.append(new_data)
    return {'govt': govt_response, 'pvt': pvt_response}


@csrf_exempt
def fetch(request):
    if request.method == 'GET':
        yesterday = get_yesterday().strftime("%d%m%Y")
        entries = AvailableBeds.objects.all()
        for entry in entries:
            data = get_geolocation(entry.data)
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
