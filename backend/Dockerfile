FROM python:3.13
# Do production zrobic COPY . . i usunac bind mounta
WORKDIR /tasksBackend
COPY requirements.txt ./
RUN apt update && apt install -y default-libmysqlclient-dev build-essential pkg-config
RUN pip install -r requirements.txt
CMD ["python3", "main.py"]