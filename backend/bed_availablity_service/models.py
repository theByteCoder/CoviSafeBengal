from djongo import models


# Create your models here.


class AvailableBeds(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    date = models.CharField(max_length=10)
    data = models.JSONField()

    def __str__(self):
        return self._id
