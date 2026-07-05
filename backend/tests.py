import pytest
import pandas as pd
from harmoHelpers import *

def loadCases():
    import datetime
    df = pd.read_excel("tests/test_daily.ods", engine="odf")
    rowKeys = {"A" : {"interval" : 1, "start": "2026-06-06", "lastAdded" : "2026-06-05"}, "B" : {"interval" : 2, "start": "2026-06-06", "lastAdded" : "2026-06-05"}, "C" : {"interval" : 3, "start": "2026-06-06", "lastAdded" : "2026-06-05"}, "D" : {"interval" : 5, "start": "2026-06-06", "lastAdded" : "2026-06-20"}, "E" : {"interval" : 7, "start": "2026-06-06", "lastAdded" : "2026-06-05"}, 
    "F" : {"interval" : 1, "start": "2026-06-12", "lastAdded" : "2026-06-05"}, "G" : {"interval" : 2, "start": "2026-06-12", "lastAdded" : "2026-06-05"}, "H" : {"interval" : 3, "start": "2026-06-12", "lastAdded" : "2026-06-05"}, "I" : {"interval" : 5, "start": "2026-06-12", "lastAdded" : "2026-06-05"}, "J" : {"interval" : 7, "start": "2026-06-12", "lastAdded" : "2026-06-05"}}
    cases = []
    date = datetime.datetime.strptime("2026-06-06", "%Y-%m-%d")
    for _,row in df.iterrows():
        if _ == 0:
            continue
        for key, value in rowKeys.items():
            interval = rowKeys[key]["interval"]
            cases.append((date, {'type': 'daily', 'interval' : interval,  'time': '21:00', 'date': rowKeys[key]["start"]},rowKeys[key]["lastAdded"], row[key]))
            if row[key]:
                rowKeys[key]["lastAdded"] = f"{date:%Y-%m-%d}"

        date = date + datetime.timedelta(days=1)
    return cases

@pytest.mark.parametrize("current, dni, lastAdded, expected", loadCases())
def testHarmonogramDaily(current, dni, lastAdded, expected):
    assert dailyDniParse(current, dni, lastAdded) == expected