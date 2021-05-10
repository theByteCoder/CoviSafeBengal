from django.urls import path
from . views import *


urlpatterns = [
    path('fetch/', fetch),
    path('fetchall/', fetch_all),
]
