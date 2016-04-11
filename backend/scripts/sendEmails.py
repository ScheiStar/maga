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

key = 'key-3a991789584ec646b3e2e88d5a737923'
sandbox = 'sandbox2d09628f0b6b414ebc37579659ff9a21.mailgun.org'

##Email Types:
#Application Confirmation
#Contact Admin Confirmation
#Email to Admin with Message
#Application Acceptance
#Tutor quitting
#Password Recovery

email = sys.argv[1]
contentMessage = sys.argv[2]
emailType = sys.argv[3]

emailTypeList = ['appConfirm', 'contactAdminConfirm', 'emailToAdmin', 'appAcceptance', 'passRecovery', 'tutorQuit']

if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
    print 'Invalid Email. Returning...'
    sys.exit()

if emailType not in emailTypeList:
    print 'Invalid Email Type. Returning...'
    sys.exit()


if(email and emailType):

    if emailType == 'appConfirm':
        f = open("/var/www/maga/scripts/html/html/confirmApp.html","r")
        message = f.read()

    elif emailType == 'contactAdminConfirm':
        f = open("/var/www/maga/scripts/html/html/confirmAdminFirst.html","r")
        message = f.read() + str(contentMessage) + '</p></body></html>'

    elif emailType == 'emailToAdmin':
        f = open("/var/www/maga/scripts/html/html/emailAdmin.html","r")
        message = f.read() + str(contentMessage) + '</p><br>' + str(email) + '</body></html>'
        #input whoever admin email in. For this purpose we only have one admin
        email = 'jaycem@smu.edu'

    elif emailType == 'tutorQuit':
        f = open("/var/www/maga/scripts/html/html/tutorQuit.html","r")
        message = f.read() + str(contentMessage) + '</p><br>' + str(email) + '</body></html>'
        #input whoever admin email in. For this purpose we only have one admin
        email = 'jaycem@smu.edu'

    elif emailType == 'appAcceptance':
        f = open("/var/www/maga/scripts/html/html/appAcceptance.html","r")
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
    'from': 'jiceResources@scheistar.com',
    'to': email,
    'subject': 'Scheistar HR',
    'html': message
})

print request.text
