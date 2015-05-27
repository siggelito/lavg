from django import forms
from .models import Photo, Video, Logo
from django.forms.models import modelformset_factory

class PhotoForm(forms.ModelForm):
    """Image upload form."""
    oldPos = forms.IntegerField(required=False)
    newPos = forms.IntegerField(required=False)
    imgId = forms.IntegerField(required=False)
    class Meta:
    	model = Photo
    	fields = ('photoFile','description')
    	widgets = {
            'photoFile': forms.FileInput(
                attrs={'id': 'input', 'multiple': 'true', 'onchange': 'this.form.submit();'}
            ),
        }

class VideoForm(forms.ModelForm):
    """Video Create form."""
    class Meta:
    	model = Video
    	fields = ('company_name','video_name')

class PosForm(forms.ModelForm):
    oldPos = forms.IntegerField()
    newPos = forms.IntegerField()

class LogoForm(forms.ModelForm):
    class Meta:
        model = Logo
        fields = ('photoFile',)
        widgets = {
            'photoFile': forms.FileInput(attrs={'id': 'input-logo','onchange': 'postLogoForm(this);'}),
        }

class SettingsPhotoForm(forms.ModelForm):
    animation = forms.ChoiceField(choices=[(1, "Fade")] + [(2, "Slide")] + [(3, "Zoom")])
    class Meta:
        model = Photo
        fields = ('description',)
        widgets = {
            'description': forms.TextInput(
                attrs={'id': 'post-description-text', 'required': False, 'placeholder': 'Write here...'}
            ),
        }

