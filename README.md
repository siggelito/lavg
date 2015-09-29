# lavg

# Installing

## apt-get Installs

    sudo apt-get install -y rabbitmq-server
    sudo apt-get install -y phantomjs
    sudo apt-get install -y python-dev
    sudo apt-get install -y virtualenv

Also ensure you have python 2.7 installed
## Install ffmpeg

    sudo apt-get install ffmpeg

If not included in your version: https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu

## Install PIP

If install using apt-get does not work try this:

    apt-get remove --auto-remove python-pip
    wget https://bootstrap.pypa.io/get-pip.py
    mv get-pip.py ~/bin/
    sudo python ~/bin/get-pip.py

# virtualenv

Run in project dir to create virtual environment: 

    virtualenv venv
    virtualenv -p /usr/bin/python2.7 venv 
    source venv/bin/activate


Then to install necessary yhon libs in virtual environment
 
    pip install -r requirements.txt


(To stop using virtual environment: run the command ``deactivate``, to remove virtual environment, delete ``venv`` folder )



#Start Celery server:  

    celery -A dbt worker --loglevel=info 

