import datetime

def dailyDniParse(current, dni, lastAdded):
    timeStart = datetime.datetime.strptime(dni["date"], "%Y-%m-%d")
    if current>=timeStart:
        lastAdded = datetime.datetime.strptime(lastAdded, "%Y-%m-%d")
        interval = int(dni["interval"])
        if (current >=  lastAdded +  datetime.timedelta(days=interval) or (f"{current:%Y-%m-%d}"==f"{timeStart:%Y-%m-%d}")):
            return True
    return False

