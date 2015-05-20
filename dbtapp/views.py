from django.shortcuts import render
from django.shortcuts import render_to_response
from django.shortcuts import redirect
from django.shortcuts import get_object_or_404
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from django import forms
from django.forms.formsets import formset_factory
import json
from subprocess import Popen, PIPE, STDOUT


from .models import Photo, Video
from .forms import *
from django.core.files.base import File
from django.conf.urls import url


def index(request):
    return render(request, 'dbtapp/Riktigindex.html')

def videoList(request):
    video_list = Video.objects.all()
    return render(
        request,
        'dbtapp/videoList.html',
        {'video_list': video_list},
    )

def videoUpdate(request, pk):
    #import pdb; pdb.set_trace()
    try:
        instance = Video.objects.get(pk=pk)
    except Video.DoesNotExist:
        instance = None
    form = VideoForm(request.POST or None, instance=instance)
    if form.is_valid():
        model = form.save()
        return redirect('dbtapp:videoStep', pk=model.pk, imgtype=1)
    if pk is not None:
        return render(
            request,
            'dbtapp/videoNew.html',
            {'form': form, 'videoKey': pk},
        )
    else:
        return render(
            request,
            'dbtapp/videoNew.html',
            {'form': form,'videoKey': None},
        )

def videoRemove(request, pk):
    video = Video.objects.get(pk=pk)
    photos = Photo.objects.filter(video = video)
    for photo in photos:
        if photo is not None:
            photo.delete()
    if video.logo is not None:
        video.logo.delete()
    video.delete()
    return redirect('dbtapp:videoList')

def photoRemove(request, videoId, imgtype, photoId):
    video = Video.objects.get(pk=videoId)
    if video is not None:
        photos = getSortedPhotos(video)
        found = False
        for i in xrange(0,len(photos)):
            p = photos[i]
            if p.pk == int(photoId):
                p.delete()
                found = True
            elif found:
                p.order = i-1
                p.save()
    return redirect('dbtapp:videoStep', pk = videoId, imgtype = imgtype)

def photoRemoveEdit(request, videoId, photoId):
    video = Video.objects.get(pk=videoId)
    if video is not None:
        photos = getSortedPhotos(video)
        found = False
        for i in xrange(0,len(photos)):
            p = photos[i]
            if p.pk == int(photoId):
                p.delete()
                found = True
            elif found:
                p.order = i-1
                p.save()
    return redirect('dbtapp:videoEdit', pk = videoId)


def getSortedPhotos(video):
    photos = Photo.objects.filter(video = video)
    orderedPhotos = [None] * len(photos)
    for photo in photos:
        orderedPhotos[photo.order] = photo
    return orderedPhotos

def generateSettings(photos):
    settingsForms = [None] * len(photos)
    for i in range(0,len(photos)):
        settingsForms[i] = SettingsPhotoForm(instance=photos[i])
    return settingsForms

def videoStep(request, pk, imgtype):
    video = Video.objects.get(pk=pk)
    photos = getSortedPhotos(video=video)
    #import pdb; pdb.set_trace()
    if request.method == 'POST':
        if 'photoFile' in request.FILES:
            count = len(photos) 
            for afile in request.FILES.getlist('photoFile'):
                photo = Photo(video=video, photoFile=afile, order=count, photoType=imgtype)
                photos.append(photo)
                photo.save()
                count = count + 1
    settingsForms = generateSettings(photos)
    return render (
        request,
        'dbtapp/step'+imgtype+'.html',
        {'settings': settingsForms, 'video': video, 'form': PhotoForm(), 'imgtype': imgtype},
    )

def videoEdit(request, pk):
    video = Video.objects.get(pk=pk)
    photos = getSortedPhotos(video=video)
    if request.method == 'POST':
        #form = PhotoForm(request.POST, request.FILES)
        #import pdb; pdb.set_trace()
        count = len(photos)    
        if 'photoFile' in request.FILES:
            print(request.FILES)
            for afile in request.FILES.getlist('photoFile'):
                photo = Photo(video=video, photoFile=afile, order=count)
                photos.append(photo)
                photo.save()
                count = count + 1
            return render(
                request,
                'dbtapp/preview.html',
                {'images': generateSettings(photos), 'video': video, 'form': PhotoForm(), 'logoForm': LogoForm(), 'logo': video.logo},
            )
        else:
            if request.is_ajax():
                #import pdb; pdb.set_trace()
                #import os; print(os.path.join(os.path.dirname( __file__ ))
                #print("AJAX!!!")
                #print("Old position: " + request.POST['oldPos'] + " New position: " + request.POST['newPos'] + " pk: " + request.POST['imgId'])
                oldPos = int(request.POST['oldPos'])
                newPos = int(request.POST['newPos'])
                key = request.POST['imgId']
                #import pdb; pdb.set_trace()
                if ((oldPos is not None) and (newPos is not None)):

                    photos[oldPos].order = newPos
                    photos[oldPos].save()

                    if oldPos < newPos:
                        #import pdb; pdb.set_trace()
                        minVal = oldPos
                        maxVal = newPos
                        xr = xrange(minVal+1,maxVal+1)
                        for i in xr:
                            photos[i].order = i - 1
                            photos[i].save()
                    else:
                        #import pdb; pdb.set_trace()
                        minVal = newPos
                        maxVal = oldPos
                        xr = xrange(minVal,maxVal)
                        for i in xr:
                            photos[i].order = i + 1
                            photos[i].save()
                    return HttpResponse('')
    else:
        form = PhotoForm()
        logoForm = LogoForm()
        # Render list page with the documents and the form
        return render(
            request,
            'dbtapp/preview.html',
            {'settings': generateSettings(photos), 'video': video, 'form': form, 'logoForm': logoForm, 'logo': video.logo},
        )

def logoPost(request, pk):
    if request.method == 'POST':
        #import pdb; pdb.set_trace()
        form = LogoForm(request.POST, request.FILES)
        if form.is_valid():
            video = Video.objects.get(pk=pk)
            if video is not None:
                model = form.save()
                if video.logo is not None:
                    video.logo.delete()
                video.logo = model
                video.save() 
                print("logo insert sucsess!!!")
                return HttpResponse('<h1>sucsess!!!</h1>')
            print("video does not exist")
        print("form not valid....")
        return HttpResponse('<h1>Not Valid post...</h1>')
    else:
        print("loading page... (not good)")
        return HttpResponse('<h1>loading...</h1>')

def photoDescriptionPost(request, videoId, photoId):
    if request.method == 'POST':
        instance = Photo.objects.get(pk=photoId)
        form = SettingsPhotoForm(request.POST, instance=instance)
        if form.is_valid():
            model = form.save()

            response_data = {}
            response_data['result'] = 'Create post successful!'
            response_data['photo_pk'] = model.pk
            response_data['description'] = model.description

            return HttpResponse(
                json.dumps(response_data),
                content_type="application/json"
            )
    else:
        return HttpResponse(
            json.dumps({"nothing to see": "this isn't happening"}),
            content_type="application/json"
        )




def videoRender(request, pk):
    video = Video.objects.get(pk=pk)
    photos = getSortedPhotos(video=video)
    #import pdb; pdb.set_trace()
    
    return render (
        request,
        'dbtapp/videoRender.html',
        {'settings': generateSettings(photos), 'video': video},
    )
    

# import threading
# import time
# from celery import Celery
# from tasks import add
# from multiprocessing import Process, Queue
from dbtapp.tasks import renderVideo

def phantomjspk(request, pk):

    path = reverse('dbtapp:videoRender', kwargs={'pk': pk})
    url = request.build_absolute_uri(path)
    video = Video.objects.get(pk=pk)
    renderVideo.delay(url, pk, video.video_name)  # @UndefinedVariable

    # queue = Queue()
    # p = Process(target=renderVideo, args=(request, pk))
    # p.start()
    # p.join() # this blocks until the process terminates
    # result = queue.get()
    # print result
    # app = Celery('tasks', broker='amqp://guest@localhost//')
    # _thread = threading.Thread(target=renderVideo(request,pk))
    # import pdb; pdb.set_trace()
    # _thread.setDaemon(True)
    # _thread.start()
    return HttpResponse('<h1>Sucsess</h1>')

# #@app.task
# def renderVideo(request,pk):
#     video = Video.objects.get(pk=pk)
#     phantomjsCommand = 'phantomjs'
#     phantomjsScript = 'dbtapp/phantomjsRenderVideo.js'
    
#     ffmpegCommand = "ffmpeg -y -c:v png -f image2pipe -r 25 -i - -c:v libx264 -pix_fmt yuv420p -movflags +faststart media/videos/"+str(video.pk)+"-"+video.video_name+".mp4"
#     print(ffmpegCommand)
#     ffmpegCommand = ffmpegCommand.split(' ')
#     path = reverse('dbtapp:videoRender', kwargs={'pk': pk})
#     url = request.build_absolute_uri(path)
#     print(url)
#     #import pdb; pdb.set_trace()
#     phantomProcess = Popen([phantomjsCommand, phantomjsScript, url], stdout=PIPE)
#     ffmpegProcess = Popen(ffmpegCommand, stdin=phantomProcess.stdout, stdout=None, stderr=STDOUT, shell=False)

#     try:
#         #(out, error) = 
#         ffmpegProcess.communicate()
#         #print(out, error)
#     except Exception as e:
#         print("\t\tException: %s" % e)
#         phantomProcess.kill()
#         ffmpegProcess.kill()
