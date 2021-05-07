from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *


# Create your views here.


def get_yesterday():
    from datetime import date, timedelta
    today = date.today()
    return today - timedelta(days=1)


@csrf_exempt
def fetch(request):
    if request.method == 'GET':
        yesterday = get_yesterday().strftime("%d%m%Y")
        entries = AvailableBeds.objects.all()
        for entry in entries:
            if entry.date == yesterday:
                return JsonResponse({'id': str(entry._id), 'date': entry.date, 'data': entry.data}, safe=False)
    else:
        return JsonResponse('Invalid request type', safe=False)
