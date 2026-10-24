FROM python:3.13
WORKDIR /tasksMigration
COPY requirements.txt ./
RUN apt update && apt install -y default-libmysqlclient-dev build-essential pkg-config
RUN pip install -r requirements.txt
CMD ["python3", "migration.py"]