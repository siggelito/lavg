from __future__ import absolute_import

from celery import shared_task
from subprocess import Popen, PIPE, STDOUT

@shared_task
def renderVideo(url,pk, video_name):
    
    phantomjsCommand = 'phantomjs'
    phantomjsScript = 'dbtapp/phantomjsRenderVideo.js'
    
    ffmpegCommand = "ffmpeg -y -c:v png -f image2pipe -r 60 -i - -c:v libx264 -pix_fmt yuv420p -movflags +faststart media/videos/"+str(pk)+"-"+video_name+".mp4"
    print(ffmpegCommand)
    ffmpegCommand = ffmpegCommand.split(' ')

    #import pdb; pdb.set_trace()
    phantomProcess = Popen([phantomjsCommand, phantomjsScript, url], stdout=PIPE)
    ffmpegProcess = Popen(ffmpegCommand, stdin=phantomProcess.stdout, stdout=None, stderr=STDOUT, shell=False)

    try:
        #(out, error) = 
        ffmpegProcess.communicate()
        #print(out, error)
    except Exception as e:
        print("\t\tException: %s" % e)
        phantomProcess.kill()
        ffmpegProcess.kill()

# from celery import Celery

# app = Celery('tasks', broker='amqp://guest@localhost//')

# @app.task
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