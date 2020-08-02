import os
import pymongo
import json
# import math
from math import radians, cos, sin, asin, sqrt

def haversine(lat1, lon1, lat2, lon2):
    """
    Calculate the great circle distance between two points 
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians 
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine formula 
    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    r = 6371 # Radius of earth in kilometers. Use 3956 for miles
    return c * r


# def haversine(origin, destination):
#     lat1, lon1 = origin
#     lat2, lon2 = destination
#     radius = 6371.0 # km

#     dlat = math.radians(lat2-lat1)
#     dlon = math.radians(lon2-lon1)
#     a = math.sin(dlat/2) * math.sin(dlat/2) + math.cos(math.radians(lat1)) \
#         * math.cos(math.radians(lat2)) * math.sin(dlon/2) * math.sin(dlon/2)
#     c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
#     d = radius * c

#     return d


def lookup(lat, lon, col):
    mindist = 99999.99

    for x in col.find():
        dist = haversine(lat,lon, float(x['lat']),float(x['lon']))
        if dist<mindist:
            q = float(x['quakerisk'])
            fi = float(x['firerisk'])
            s = float(x['stormrisk'])
            fl = float(x['floodrisk'])
            sc = str(x['statecode'])
            mindist = dist
    return q, fi, s, fl, sc




def getquakescore(lat, lon):

    score = 50.0
    # calculate quake score here


    return score


def getstormscore(lat, lon):

    score = 50.0
    # calculate  score here

    return score

def getfirescore(lat, lon):

    score = 50.0
    # calculate score here

    return score

def getfloodscore(lat, lon):

    score = 50.0
    # calculate  score here

    return score

def getoverallscore(lat, lon, q, fi, s, fl):

    qm = 1.0
    fim = 1.0
    sm = 1.0
    flm = 1.0

    # calculate coefficients and balance here

    oscore =  (qm*q) + (fim*fi) + (sm*s) + (flm*fl)
    oscore = oscore/4.0


    return oscore



def dummy(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    if request.method == 'OPTIONS':
        # Allows GET requests from origin https://mydomain.com with
        # Authorization header
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '3600',
            'Access-Control-Allow-Credentials': 'true'
        }
        return ('', 204, headers)

    # Set CORS headers for main requests
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    }

    request_json = request.get_json()
    mongostr = os.environ.get('MONGOSTR')
    client = pymongo.MongoClient(mongostr)
    db = client["safesurance"]
    col = db.statedata
    results = []
    maxid = 0
    lat = float(request_json['lat'])
    lon = float(request_json['lon'])
    # clat, clon = lookup(lat, lon, col)
    # quakescore = getquakescore(lat, lon)
    # firescore = getfirescore(lat, lon)
    # stormscore = getstormscore(lat, lon)
    # floodscore = getfloodscore(lat, lon)
    quakescore, firescore, stormscore, floodscore, sc = lookup(lat, lon, col)
    overallscore = getoverallscore(lat, lon, quakescore, firescore, stormscore, floodscore)
    
    
    
    retjson = {}

    retjson['quake'] = quakescore
    retjson['fire'] = firescore
    retjson['storm'] = stormscore
    retjson['flood'] = floodscore
    retjson['overall'] = overallscore
    retjson['sc'] = sc



    # retjson['mongoresult'] = str(maxid)

    return json.dumps(retjson)


    retstr = "action not done"

    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return retstr

