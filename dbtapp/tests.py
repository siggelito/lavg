import subprocess
from django.test import LiveServerTestCase

class pjsTest(LiveServerTestCase):
    def test_phantom_js(self):
        args = ["phantomjs", "static/dbtapp/js/phantomTest.js", self.live_server_url]
        result = subprocess.check_output(args)
        self.assertEqual(result, "")  # No result means no error

