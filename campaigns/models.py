from django.db import models

# Create your models here.
class Campaign(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        """
        returns the name of the campaign
        """
        return self.name
