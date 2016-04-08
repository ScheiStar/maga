#!/usr/bin/env python
# -*- coding: UTF-8 -*-
import requests
import re
import sys
import ssl
import cgi, cgitb
import json
reload(sys)
sys.setdefaultencoding("utf-8")
cgitb.enable()

#print "Content-Type: text/plain;charset=utf-8"

print "Content-Type: text/html"

print

key = 'key-3a991789584ec646b3e2e88d5a737923'
sandbox = 'sandbox2d09628f0b6b414ebc37579659ff9a21.mailgun.org'

##Email Types:
#Application Confirmation
#Contact Admin Confirmation
#Email to Admin with Message
#Application Acceptance
#Password Recovery

form = cgi.FieldStorage()
email = form.getvalue('email')
contentMessage = form.getvalue('contentMessage')
emailType = form.getvalue('emailType')

emailTypeList = ['appConfirm', 'contactAdminConfirm', 'emailToAdmin', 'appAcceptance', 'passRecovery']

if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
    print 'Invalid Email. Returning...'
    sys.exit()

if emailType not in emailTypeList:
    print 'Invalid Email Type. Returning...'
    sys.exit()


if(email and emailType):

    if emailType == 'appConfirm':
        f = open("html/confirmApp.html","r")
        message = f.read()

    elif emailType == 'contactAdminConfirm':
        f = open("html/confirmAdminFirst.html","r")
        message = f.read() + str(contentMessage) + '</p></body></html>'

    elif emailType == 'emailToAdmin':
        f = open("html/emailAdmin.html","r")
        message = f.read() + str(contentMessage) + '</p><br>' + str(email) + '</body></html>'
        #input whoever admin email in. For this purpose we only have one admin
        email = 'jaycem@smu.edu'

    elif emailType == 'appAcceptance':
        f = open("html/appAcceptance.html","r")
        message = f.read()

    elif emailType == 'passRecovery':
        message = '<html><body><h1>Password reset.</h1><p>Hi. Your password is: <br>' + str(contentMessage) + '<br>  Please remember it this time!</p></body></html>'

    else:
        print 'No behavior defined for that input'
        sys.exit()

else:
    print "Missing params!!!"
    sys.exit()


request_url = 'https://api.mailgun.net/v2/{0}/messages'.format(sandbox)
request = requests.post(request_url, auth=('api', key), data={
    'from': 'jiceResources@Scheistar.com',
    'to': email,
    'subject': 'Scheistar HR',
    'html': message
})

print 'Status: {0}'.format(request.status_code)
print 'Body:   {0}'.format(request.text)
