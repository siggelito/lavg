from django import forms
from models import Photo, Video


class PhotoForm(forms.ModelForm):
    """Image upload form."""
    class Meta:
    	model = Photo
    	fields = ('photoFile',)
    	widgets = {
            'photoFile': forms.FileInput(attrs={'id': 'input', 'multiple': 'true', 'onchange': 'this.form.submit();'}),
        }

class VideoForm(forms.ModelForm):
    """Image upload form."""
    class Meta:
    	model = Video
    	fields = ('company_name','video_name')
