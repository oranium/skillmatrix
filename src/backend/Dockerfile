FROM python:3.6-stretch
RUN mkdir /app
WORKDIR /app
ADD requirements.txt .
RUN pip install -r requirements.txt
ADD src/ src
EXPOSE 5000
CMD ["python", "/app/src/app.py"]
