from django import forms
from models import Photo, Video, Logo
from django.forms.models import modelformset_factory

class PhotoForm(forms.ModelForm):
    """Image upload form."""
    oldPos = forms.IntegerField()
    newPos = forms.IntegerField()
    imgId = forms.IntegerField()
    class Meta:
    	model = Photo
    	fields = ('photoFile',)
    	widgets = {
            'photoFile': forms.FileInput(attrs={'id': 'input', 'multiple': 'true', 'onchange': 'this.form.submit();'}),
        }

class VideoForm(forms.ModelForm):
    """Video Create form."""
    class Meta:
    	model = Video
    	fields = ('company_name','video_name')

class PosForm(forms.ModelForm):
    """Video Create form."""
    oldPos = forms.IntegerField()
    newPos = forms.IntegerField()

class LogoForm(forms.ModelForm):
    class Meta:
        model = Logo
        fields = ('photoFile',)
        widgets = {
            'photoFile': forms.FileInput(attrs={'id': 'input-logo'}),
        }