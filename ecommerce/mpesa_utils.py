import base64
import requests
from django.conf import settings
from requests.auth import HTTPBasicAuth
from datetime import datetime

def get_mpesa_access_token():
    consumer_key = settings.MPESA_CONSUMER_KEY
    consumer_secret = settings.MPESA_CONSUMER_SECRET
    api_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

    response = requests.get(api_url, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    json_response = response.json()
    access_token = json_response['access_token']
    return access_token

def lipa_na_mpesa_online(phone_number, amount, account_reference, transaction_desc):
    access_token = get_mpesa_access_token()
    api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    headers = {"Authorization": "Bearer %s" % access_token}

    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    password = base64.b64encode((settings.MPESA_SHORTCODE + settings.MPESA_PASSKEY + timestamp).encode('utf-8')).decode('utf-8')

    payload = {
        "BusinessShortCode": settings.MPESA_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,  # The phone number sending the money
        "PartyB": settings.MPESA_SHORTCODE,  # The organization shortcode
        "PhoneNumber": phone_number,  # The phone number receiving the STK push
        "CallBackURL": "https://yourdomain.com/api/mpesa/callback/",  # Your callback URL
        "AccountReference": account_reference,  # Could be the order ID or any identifier
        "TransactionDesc": transaction_desc
    }

    response = requests.post(api_url, json=payload, headers=headers)
    return response.json()
