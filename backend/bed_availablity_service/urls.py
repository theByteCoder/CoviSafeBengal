from django.urls import path
from . views import *


urlpatterns = [
    # path('fetch/', fetch),
    path('address/all/old/', fetch_all),
    path('address/all/', fetch_morphed_data),
    # path('address/all/districts/', fetch_districts),
    path('location/current/', fetch_current_location),
]
