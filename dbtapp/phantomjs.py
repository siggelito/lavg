import subprocess


class PhantomjsTest():
    def test_phantomjs_js(self):
        command = "phantomjs --ignore-ssl-errors=true " + "/static/dbtapp/js/phantomTest.js"
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
        
        # make sure phantomjs has time to download/process the page
        # but if we get nothing after 30 sec, just move on
        try:
            output, errors = process.communicate(timeout=30)
        except Exception as e:
            print("\t\tException: %s" % e)
            process.kill()
        
        # output will be weird, decode to utf-8 to save heartache
        phantom_output = ''
        for out_line in output.splitlines():
            phantom_output += out_line.decode('utf-8')