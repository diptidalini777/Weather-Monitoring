
**Overview**
This project is a real-time weather monitoring system designed to fetch weather data from the OpenWeatherMap API, process it at regular intervals, and provide summarized insights like daily weather summaries, alerts based on configurable thresholds, and visualizations. The system continuously tracks weather for the major metros in India (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad).


**Features**
-Fetch real-time weather data (temperature, weather conditions) at a configurable interval.
-Convert temperature values from Kelvin to Celsius (or Fahrenheit based on user preference).
-Calculate daily weather summaries (average, max, min temperature, and dominant condition).
-Trigger alerts if temperature exceeds a defined threshold.
-Store and visualize historical trends.


**********Backend Setup**********

Navigate to the backend directory:
cd weatherMonitoring/backend

Install backend dependencies:
npm install

Configure .env file with your MongoDB connection string:
API_KEY=<your_openweather_api_key>
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.kcbvv.mongodb.net/weatherMonitoring?retryWrites=true&w=majority&appName=Cluster0

Start the backend server:
nodemon src/server.js
The backend will be running at http://localhost:5000.


*******Frontend Setup*******

Navigate to the frontend directory:
cd weatherMonitoring/frontend

Install frontend dependencies:
npm install

Run the frontend:
npm start
The frontend will be available at http://localhost:3000.
