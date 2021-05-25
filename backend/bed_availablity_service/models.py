from djongo import models


# Create your models here.


class AvailableBeds(models.Model):
    _id = models.ObjectIdField()
    date = models.CharField(max_length=10)
    hospitals = models.JSONField(default=dict)
    safe_homes = models.JSONField(default=dict)

    def __str__(self):
        return self._id
