from django.urls import path
from . views import *


urlpatterns = [
    # path('v1/fetch/', fetch),
    path('v1/address/all/old/', fetch_all),
    path('v1/address/all/', fetch_morphed_data),
    # path('v1/address/all/districts/', fetch_districts),
    path('v1/location/current/', fetch_current_location),
    path('v2/address/all/', fetch_all_new),
]
