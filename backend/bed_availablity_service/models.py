from djongo import models


# Create your models here.


class AvailableBeds(models.Model):
    _id = models.ObjectIdField()
    date = models.CharField(max_length=10)
    data = models.JSONField()
