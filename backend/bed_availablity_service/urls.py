from django.urls import path
from .views import *

urlpatterns = [
    # path('v1/location/current/', fetch_current_location),
    path('v3/address/hospitals/', fetch_hospitals),
    path('v3/address/safehomes/', fetch_safe_homes),
    path('v3/address/ambulances/', fetch_ambulances),
]
