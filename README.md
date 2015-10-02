# lavg

# Installing

## apt-get Installs

    sudo apt-get install -y rabbitmq-server
    sudo apt-get install -y phantomjs
    sudo apt-get install -y python-dev
    sudo apt-get install -y libx264-dev
    sudo apt-get install -y virtualenv

Also ensure you have python 2.7 installed
## Install ffmpeg

    sudo apt-get install ffmpeg

If not included in your version: https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu

## Install PIP

If install using apt-get does not work, try this:

    apt-get remove --auto-remove python-pip
    wget https://bootstrap.pypa.io/get-pip.py
    mv get-pip.py ~/bin/
    sudo python ~/bin/get-pip.py

## virtualenv

To run run project in virtual environment:

Create virtualenv (only done once):

    virtualenv venv
    virtualenv -p /usr/bin/python2.7 venv 

Use virtualenv: 

    source venv/bin/activate

## Install Python libs

    pip install -r requirements.txt


(To stop using virtual environment: run the command ``deactivate``, to remove virtual environment, delete ``venv`` folder )


# Misc
Create dir 'videos' under dir media.

    python manage.py makemigration
    python manage.py migrate

#Start servers
## Celery server:  

    celery -A dbt worker --loglevel=info 

## Django development server:

    python manage.py runserver


