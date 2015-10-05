# lavg

# Installing

Instructions are mainly for installment on Ubuntu Linux. Some additional information for installation on Windows is provided, but has not been tested.

## General Installations

Ensure you have [RabbitMQ](https://www.rabbitmq.com/), [PhantomJS](http://phantomjs.org/) and [Python](https://www.python.org/) version [2.7](https://www.python.org/downloads/release/python-2710/) installed.

### Ubuntu

    sudo apt-get install -y rabbitmq-server
    sudo apt-get install -y phantomjs
    sudo apt-get install -y python-dev
    sudo apt-get install -y libx264-dev
    sudo apt-get install -y virtualenv

(Some additional packages may be required depending on your current installation)

## Install ffmpeg

[ffmpeg download page](https://www.ffmpeg.org/download.html)


### Ubuntu

    sudo apt-get install ffmpeg

If not included in your version: [Compile FFmpeg on Ubuntu, Debian, or Mint](https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu)

## Install PIP

``pip`` is really useful to ease the installment of Python packages.
[pip](https://pip.pypa.io/en/stable/)

### Ubuntu

sudo apt-get install python-pip

Or, if install using apt-get does not work properly, try this:

    apt-get remove --auto-remove python-pip
    wget https://bootstrap.pypa.io/get-pip.py
    mv get-pip.py ~/bin/
    sudo python ~/bin/get-pip.py

## virtualenv

To run run project in virtual environment, download and setup virtual environment:

[virtualenv](https://virtualenv.pypa.io/en/latest/index.html) (present in Ubuntu repo)

(Instructions are for Ubuntu but should not differ much for windows)

Create virtualenv (only done once) in the project directory (where dbt source code is located) or in the directory above:

    virtualenv venv
    virtualenv -p /usr/bin/python2.7 venv 

Use virtualenv: 

    source venv/bin/activate


## Install Python libs
(This may require superuser privileges)

     pip install -r requirements.txt

(To stop using virtual environment: run the command ``deactivate``, to remove virtual environment, delete ``venv`` folder )

# Miscellaneous
Create dir 'videos' under dir media in project directory.

Run the following commands (once again, in project directory):

    python manage.py makemigration
    python manage.py migrate
    python manage.py collectstatic


#Start servers
## Celery server:
Run command (in project directory)

    celery -A dbt worker --loglevel=info 

## Django development server:
Run command (in project directory) to start a development server on host:port [127.0.0.1:8000]

    python manage.py runserver
