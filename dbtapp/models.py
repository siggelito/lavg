from django.db import models
from django.forms import Field
from django.utils.translation import ugettext_lazy
from celery.worker.strategy import default

Field.default_error_messages = {
    'required': ugettext_lazy("Hoppsan, detta fylldes inte i!")}

class Logo(models.Model):
    photoFile = models.ImageField()

class Video(models.Model):
    company_name = models.CharField(max_length=100, default = None)
    video_name = models.CharField(max_length=100, default = None)
    video_url = models.CharField(max_length=500, null=True, blank=True, default=None)
    logo = models.ForeignKey(Logo, null=True, blank=True, default = None)
    
class Photo(models.Model):
    video = models.ForeignKey(Video, null=True, blank=True, default = None)
    photoFile = models.ImageField()
    order = models.IntegerField()
    photoType = models.IntegerField(null=True, blank=True, default = None) 
    description = models.CharField(max_length=100, null=True, blank=True, default=None)
    # """
    # Description: Model Description
    # """
    # pass
   
# Receive the pre_delete signal and delete the file associated with the model instance.
from django.db.models.signals import pre_delete
from django.dispatch.dispatcher import receiver

@receiver(pre_delete, sender=Photo)
def photo_delete(sender, instance, **kwargs):
    # Pass false so ImageField doesn't save the model.
    instance.photoFile.delete(False)

@receiver(pre_delete, sender=Logo)
def logo_delete(sender, instance, **kwargs):
    # Pass false so ImageField doesn't save the model.
    instance.photoFile.delete(False)