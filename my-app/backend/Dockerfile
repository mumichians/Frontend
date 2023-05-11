# FROM ubuntu:20.04
FROM python:3.10.6
COPY . /docker-app
WORKDIR /docker-app
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install -r fast_requirements.txt

CMD python main.py
EXPOSE 8000