from __future__ import absolute_import
from celery import shared_task
from subprocess import Popen, PIPE, STDOUT
from dbtapp.models import Video
from dbt.celery import app

from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)


@shared_task #(name='dbtapp.renderVideo')
def renderVideo(url,url_video, pk, video_name):

    logger.info("---------------- Entered renderVideo() ----------------")
    logger.info("url: " + url)
    logger.info("url_video: " + url_video)
    logger.info("pk: " + pk)
    logger.info("video_name: " +video_name)


    video = Video.objects.get(pk=pk)
    video.video_url = ""
    video.save()
    phantomjsCommand = 'phantomjs'
    phantomjsScript = 'dbtapp/phantomjsRenderVideo.js'
    
    ffmpegCommand = "ffmpeg -y -threads 2 -i /home/sigge/Downloads/ToTheTop.mp3 -c:v png -f image2pipe -r 60 -i - -c:a copy -c:v libx264 -pix_fmt yuv420p -movflags +faststart -shortest media/videos/"+str(pk)+"-"+video_name+".mp4"
    ffmpegCommand = ffmpegCommand.split(' ')

    #import pdb; pdb.set_trace()
    phantomProcess = Popen([phantomjsCommand, phantomjsScript, url], stdout=PIPE, shell=False)

    #ffmpegProcess = Popen(ffmpegCommand, stdin=phantomProcess.stdout, stdout=None, stderr=STDOUT, shell=False)

    try:
        #(out, error) =
        ffmpegProcess = Popen(ffmpegCommand, stdin=phantomProcess.stdout, stdout=None, stderr=STDOUT, shell=False)
        data = ffmpegProcess.communicate()[0]
        rc = ffmpegProcess.returncode
        video.video_url = url_video + "media/videos/" + str(pk) + "-" + video_name + ".mp4"
        video.save()
        #print(out, error)
    except Exception as e:        
        print("\t\tException: %s" % e)
        
        if phantomProcess != None:
            phantomProcess.kill()
        if ffmpegProcess != None:
            ffmpegProcess.kill()

