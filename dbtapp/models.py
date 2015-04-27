from django.db import models

class Video(models.Model):
    video_name = models.CharField(max_length=100)
    
class Image(models.Model):
    ImageVideoId = models.ForeignKey(Video)
    image_url = models.CharField(max_length=10000)
    