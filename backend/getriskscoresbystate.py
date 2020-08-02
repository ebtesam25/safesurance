import os
import pymongo
import json




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

    # request_json = request.get_json()
    mongostr = os.environ.get('MONGOSTR')
    client = pymongo.MongoClient(mongostr)
    db = client["safesurance"]
    col = db.statedata
    results = []
    maxid = 0
    # lat = request_json['lat']
    # lon = request_json['lon']
    # quakescore = getquakescore(lat, lon)
    # firescore = getfirescore(lat, lon)
    # stormscore = getstormscore(lat, lon)
    # floodscore = getfloodscore(lat, lon)
    # overallscore = getoverallscore(lat, lon, quakescore, firescore, stormscore, floodscore)
    
   

    for x in col.find():
        item = {}
        item["state"] =  str(x["State"])
        item["lat"] = str(x["lat"])
        item["lon"] = str(x['lon'])
        item["quakerisk"] = str(x['quakerisk'])
        item["firerisk"] = str(x['firerisk'])
        item["stormrisk"] = str(x['stormrisk'])
        item["floodrisk"] = str(x['floodrisk'])

        lat = float(x["lat"])
        lon = float(x['lon'])
        quakescore = float(x['quakerisk'])
        firescore = float(x['firerisk'])
        stormscore = float(x['stormrisk'])
        floodscore = float(x['floodrisk'])
        overallscore = getoverallscore(lat, lon, quakescore, firescore, stormscore, floodscore)
        item["overallrisk"] =  str(overallscore)
        # item["status"] =  x["status"]
        # item["description"] =  x["description"]
        
            
        results.append(item)
        maxid +=1
    
    
    retjson = {}

    retjson['data'] = results
    # retjson['fire'] = firescore
    # retjson['storm'] = stormscore
    # retjson['flood'] = floodscore
    # retjson['overall'] = overallscore



    # retjson['mongoresult'] = str(maxid)

    return json.dumps(retjson)


    retstr = "action not done"

    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return retstr


