from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger
import logging
import firebase_admin
from firebase_admin import credentials
import os

logging.basicConfig(level=logging.DEBUG, format="[%(asctime)s] %(levelname)s: %(message)s", datefmt="%Y-%m-%d %H:%M:%S")
logger = logging.getLogger(__name__)
scheduler = BlockingScheduler(timezone="Europe/Warsaw")
android = False
if os.path.exists("firebase.json"):
    cred = credentials.Certificate("firebase.json")
    firebase_admin.initialize_app(cred)
    android = True
    logger.info("Proceeding with Android notification functionality")
else:
    logger.info("Proceeding without Android notification functionality")
from harmo import update
scheduler.add_job(update, trigger=CronTrigger(minute=0), id="harmonogram",  max_instances=1, args=(android,))
scheduler.start()
logger.info("Scheduler started!")