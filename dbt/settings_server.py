from .settings import *

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.sqlite3',
		'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
	}
			
# 	'default': {
# 		'ENGINE': 'django.db.backends.postgresql_psycopg2',
# 		'NAME': 'dbt',
# 		'HOST': 'localhost',
# 		'USER': 'dbt',
# 		'PASSWORD': 'dbt',
# 		'ATOMIC_REQUESTS': True,
# 	}
}
BASE_DIR = '/var/www/dbt/project/'
STATIC_ROOT = BASE_DIR + 'static'
MEDIA_ROOT = BASE_DIR + 'media'
