from django.shortcuts import render
from django.shortcuts import render_to_response
from django.shortcuts import redirect
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse

from .models import Photo, Video
from .forms import PhotoForm, VideoForm

def index(request):
    return render(request, 'dbtapp/Riktigindex.html')

def videoList(request):
    video_list = Video.objects.all()
    return render(
        request,
        'dbtapp/videoList.html',
        {'video_list': video_list},
    )

def newVideo(request):
    if request.method == 'POST':
        form = VideoForm(request.POST)
        if form.is_valid():
            model = form.save()
            form = PhotoForm()
            return redirect('dbtapp:videoEdit', pk=model.pk)

    else:
        form = VideoForm()
    return render(
        request,
        'dbtapp/newVideo.html',
        {'form': form},
    )

def videoRemove(request, pk):
    video = Video.objects.get(pk=pk)
    photos = Photo.objects.filter(video = video)
    for photo in photos:
        photo.delete()
    video.delete()
    return redirect('dbtapp:videoList')

def videoEdit(request, pk):
    video = Video.objects.get(pk=pk)

    if request.method == 'POST':
        #form = PhotoForm(request.POST, request.FILES)
        #import pdb; pdb.set_trace()
        #print(len(form.files('photoFile')))
        import pdb; pdb.set_trace()
        for afile in request.FILES.getlist('photoFile'):
            Photo(video=video, photoFile=afile).save()
        # if form.is_valid():
        #     photo = form.save(commit=False)
        #     photo.video = video
        #     photo.save()

        photos = Photo.objects.filter(video = video)
        return render(
            request,
            'dbtapp/preview.html',
            {'images': photos, 'video': video, 'form': PhotoForm()},
        )
    else:
        form = PhotoForm()

    # Load documents for the list page
    photos = Photo.objects.filter(video = video)
    #photos = Photo.objects.all()

    # Render list page with the documents and the form
    return render(
        request,
        'dbtapp/preview.html',
        {'images': photos, 'video': video, 'form': form},
    )

