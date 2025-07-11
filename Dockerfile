FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11
WORKDIR /app
COPY ./backend /app
RUN pip install --no-cache-dir -r requirements.txt
