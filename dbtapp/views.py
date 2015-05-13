from django.shortcuts import render
from django.shortcuts import render_to_response
from django.shortcuts import redirect
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from django import forms
from django.forms.formsets import formset_factory
import json
from subprocess import Popen, PIPE, STDOUT

from .models import Photo, Video
from .forms import PhotoForm, VideoForm, PosForm, LogoForm
from django.core.files.base import File


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
        if photo is not None:
            photo.delete()
    if video.logo is not None:
        video.logo.delete()
    video.delete()
    return redirect('dbtapp:videoList')



def videoEdit(request, pk):
    video = Video.objects.get(pk=pk)
    photos = Photo.objects.filter(video = video)
    orderedPhotos = [None] * len(photos)
    for photo in photos:
        orderedPhotos[photo.order] = photo
    if request.method == 'POST':
        #form = PhotoForm(request.POST, request.FILES)
        #import pdb; pdb.set_trace()
        #print(len(form.files('photoFile')))
        count = len(photos)    
        if 'photoFile' in request.FILES:
            print(request.FILES)
            for afile in request.FILES.getlist('photoFile'):
                Photo(video=video, photoFile=afile, order=count).save()
                count = count + 1
            photos = Photo.objects.filter(video = video)
            orderedPhotos = [None] * len(photos)
            for photo in photos:
                orderedPhotos[photo.order] = photo
            return render(
                request,
                'dbtapp/preview.html',
                {'images': orderedPhotos, 'video': video, 'form': PhotoForm(), 'logoForm': LogoForm(), 'logo': video.logo},
            )
        else:
            if request.is_ajax():
                #import pdb; pdb.set_trace()
                #import os; print(os.path.join(os.path.dirname( __file__ ))
                print("AJAX!!!")
                print("Old position: " + request.POST['oldPos'] + " New position: " + request.POST['newPos'] + " pk: " + request.POST['imgId'])
                oldPos = int(request.POST['oldPos'])
                newPos = int(request.POST['newPos'])
                key = request.POST['imgId']
                #import pdb; pdb.set_trace()
                if ((oldPos is not None) and (newPos is not None)):

                    orderedPhotos[oldPos].order = newPos
                    orderedPhotos[oldPos].save()

                    if oldPos < newPos:
                        #import pdb; pdb.set_trace()
                        minVal = oldPos
                        maxVal = newPos
                        xr = xrange(minVal+1,maxVal+1)
                        for i in xr:
                            orderedPhotos[i].order = i - 1
                            orderedPhotos[i].save()
                    else:
                        #import pdb; pdb.set_trace()
                        minVal = newPos
                        maxVal = oldPos
                        xr = xrange(minVal,maxVal)
                        for i in xr:
                            orderedPhotos[i].order = i + 1
                            orderedPhotos[i].save()
                    return HttpResponse('')

                
    else:
        form = PhotoForm()
        logoForm = LogoForm()
        # Render list page with the documents and the form
        return render(
            request,
            'dbtapp/preview.html',
            {'images': orderedPhotos, 'video': video, 'form': form, 'logoForm': logoForm, 'logo': video.logo},
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


def phantomjs(request):
    command = 'phantomjs'
    phantomjs_script = './dbtapp/phantomTest.js'
    
    #url = ('https://www.google.se')
    #fileName = './media/pictures/test.jpg'
    
    #celery
    
    phantomProcess = Popen([command, phantomjs_script], stdout=PIPE, stderr=PIPE)
    
    ffmpegProcess = Popen(['ffmpeg ', '-y ', '-c:v ', 'png ', '-f ', 'image2pipe ', '-r ', '25 ', '-t ', '1 ', '-i ', '-c:v ', 'libx264 ', '-pix_fmt ', 'yuv420p ', '-movflags ', '+faststart ', 'test.mp4'], stdin=phantomProcess.communicate(), stdout=PIPE, stderr=STDOUT)
    
    #returnFile = File(open(fileName, 'r'))
    #response = HttpResponse(returnFile, mimetype='application/force-download')
    #response['Content-Disposition'] = 'attachment; filename=test.jpg'
    
    #try:
    #    output = process.communicate(timeout=30)
#     except Exception as e:
#         print("\t\tException: %s" % e)
#         process.kill()
#     
#     phantom_output = ''
#     for out_line in output.splitlines():
#         phantom_output += out_line.decode('utf-8')
#        
#     return HttpResponse('')
    #return response

def phantomjswithpk(request, pk):
    command = "phantomjs"
    phantomjs_script = './dbtapp/phantomTest.js'
    url = (request.url)
    fileName = './media/' + pk + '/picture/test.jpg'
    process = Popen([command, phantomjs_script, url, fileName])
    
    #returnFile = File(open(fileName, 'r'))
    #response = HttpResponse(returnFile, mimetype='application/force-download')
    #response['Content-Disposition'] = 'attachment; filename=test.jpg'
    
    #try:
    #    output = process.communicate(timeout=30)
    #except Exception as e:
    #    print("\t\tException: %s" % e)
    #    process.kill()
    
    #phantom_output = ''
    #for out_line in output.splitlines():
    #   phantom_output += out_line.decode('utf-8')
       
    return HttpResponse('')
