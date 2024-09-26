# Use the official Python image from the Docker Hub
FROM python:3.12-slim

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    pkg-config \
    default-libmysqlclient-dev \
    gcc \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
# Copy the requirements file into the container
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# Copy the rest of the application code into the container
COPY . .
EXPOSE 8000
# Expose the port the app runs on
EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "todos.wsgi:application"]
# Run the application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "todos.wsgi:application"]