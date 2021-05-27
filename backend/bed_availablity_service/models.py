from djongo import models


# Create your models here.


class AvailableHospitalBeds(models.Model):
    _id = models.ObjectIdField()
    date = models.CharField(max_length=10, default="01012021")
    updated_at = models.CharField(max_length=24, default="01/01/2021 00:00:01 AM")
    hospitals = models.JSONField(default=dict)

    def __str__(self):
        return self._id


class AvailableSafeHomes(models.Model):
    _id = models.ObjectIdField()
    date = models.CharField(max_length=10, default="01012021")
    updated_at = models.CharField(max_length=24, default="01/01/2021 00:00:01 AM")
    safe_homes = models.JSONField(default=dict)

    def __str__(self):
        return self._id


class AvailableAmbulances(models.Model):
    _id = models.ObjectIdField()
    date = models.CharField(max_length=10, default="01012021")
    updated_at = models.CharField(max_length=24, default="01/01/2021 00:00:01 AM")
    ambulances = models.JSONField(default=dict)

    def __str__(self):
        return self._id
