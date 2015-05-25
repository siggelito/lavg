from __future__ import absolute_import

from celery import shared_task
from subprocess import Popen, PIPE, STDOUT
from dbtapp.models import Video

@shared_task
def renderVideo(url,url_video, pk, video_name):
    print(pk)
    video = Video.objects.get(pk=pk)
    video.video_url = None    
    video.save()
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
        video.video_url = url_video + "media/videos/" + str(pk) + "-" + video_name + ".mp4"
        video.save()
        #print(out, error)
    except Exception as e:
        print("\t\tException: %s" % e)
        phantomProcess.kill()
        ffmpegProcess.kill()

    