from django.urls import path
from . views import *


urlpatterns = [
    # path('fetch/', fetch),
    path('address/all/', fetch_all),
    path('location/current/', get_curr_loc),
]
