#! /usr/bin/env python
import requests
import sys
import cgi, cgitb
import json
reload(sys)

cgitb.enable()

print "Content-Type: text/json\n"

key = 'key-3a991789584ec646b3e2e88d5a737923'
sandbox = 'sandbox2d09628f0b6b414ebc37579659ff9a21.mailgun.org'


form = cgi.FieldStorage()
email = form.getvalue('email')
message = form.getvalue('message')

if(email):
    request_url = 'https://api.mailgun.net/v2/{0}/messages'.format(sandbox)
    request = requests.post(request_url, auth=('api', key), data={
        'from': 'greetings@Scheistar.com',
        #'to': 'crucialupdate@sandbox2d09628f0b6b414ebc37579659ff9a21.mailgun.org',
        'to': email,
        'subject': 'Wow Great Job',
        #'subject': 'FOR GEORGE',
        'html': 'Successful contact.'
    })

    print 'Status: {0}'.format(request.status_code)
    print 'Body:   {0}'.format(request.text)
 else:
     print 'oops'
