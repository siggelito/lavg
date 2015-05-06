from django.db import models

class Video(models.Model):
    company_name = models.CharField(max_length=100, default = None)
    video_name = models.CharField(max_length=100, default = None)
    
    
class Photo(models.Model):
    video = models.ForeignKey(Video, null=True, blank=True, default = None)
    #image_url = models.CharField(max_length=10000)
    photoFile = models.ImageField() #upload_to = 'images', default = 'images/None/no-img.jpg'
    # def save(self, *args, **kwargs):
    #     try:
    #         this = Photo.objects.get(id=self.id)
    #         if this.photoFile != self.photoFile:
    #             this.photoFile.delete()
    #     except: pass
    #     super(Photo, self).save(*args, **kwargs)
    
# Receive the pre_delete signal and delete the file associated with the model instance.
from django.db.models.signals import pre_delete
from django.dispatch.dispatcher import receiver

@receiver(pre_delete, sender=Photo)
def photo_delete(sender, instance, **kwargs):
    # Pass false so FileField doesn't save the model.
    instance.photoFile.delete(False)