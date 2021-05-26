from djongo import models


# Create your models here.


class AvailableHospitalBeds(models.Model):
    _id = models.ObjectIdField()
    date = models.CharField(max_length=10, default="01012021")
    updated_at = models.CharField(max_length=16, default="01012021000000")
    hospitals = models.JSONField(default=dict)

    def __str__(self):
        return self._id


class AvailableSafeHomes(models.Model):
    _id = models.ObjectIdField()
    date = models.CharField(max_length=10, default="01012021")
    updated_at = models.CharField(max_length=16, default="01012021000000")
    safe_homes = models.JSONField(default=dict)

    def __str__(self):
        return self._id


class AvailableAmbulances(models.Model):
    _id = models.ObjectIdField()
    date = models.CharField(max_length=10, default="01012021")
    updated_at = models.CharField(max_length=16, default="01012021000000")
    ambulances = models.JSONField(default=dict)

    def __str__(self):
        return self._id
