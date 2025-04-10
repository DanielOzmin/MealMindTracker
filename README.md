MealMindTracker

📌 Project Overview

MealMindTracker is a full-stack application that helps users track their daily, weekly, and monthly nutrient intake (macronutrients, micronutrients, and calories). Users can upload their own recipes, which the application automatically evaluates for nutritional content.
The system utilizes artificial intelligence (AI) to provide personalized meal recommendations based on the user’s daily calorie needs and dietary habits.
Future development plans include a more advanced workout statistics and evaluation system, which will analyze training load and provide recommendations for optimizing workouts and meals.
The long-term goal is to make the application available as a mobile app, either natively or with a cross-platform solution, while integrating additional AI-powered features.

🎯 Key Features

✅ Add Recipes – Users can input ingredients, and the app will automatically calculate their nutritional values. Recipes can be saved for future use.
✅ Track Nutrient Intake – Users can log how much they consumed of a given food, and the app will store this data.
✅ AI-Generated Meal Recommendations – Using the OpenAI API, the app will analyze past nutrient intake and suggest the next meals accordingly.
✅ Workout Statistics & Load Optimization (Planned) – The app will analyze workout intensity and provide tailored nutrition and training recommendations.
✅ Image Upload – Users can upload food photos to accompany their recipes.
✅ Statistics & Analytics – Tracks macro- and micronutrient intake over daily, weekly, and monthly periods.
✅ Mobile Version (Planned) – The application will be optimized for mobile use and developed as a standalone mobile app.
✅ Additional AI Features – AI-driven insights for deeper analysis and personalized suggestions.

🛠 Tech Stack

Backend: ASP.NET Core, Entity Framework Core, MSSQL
Frontend: React + TypeScript
AI Integration: OpenAI API
Image Upload: AWS S3
Storage & Containerization: Docker, Azure Data Studio
Mobile Version: (Planned, likely with a cross-platform solution)
⚙️ Setup & Running the Application

1️⃣ Backend Setup

Clone the repository.

Configure the necessary keys in user-secrets:
OpenAI:ApiKey = "Your key"
Edamam:ApiKey = "Your key"
Edamam:ApiId = "Your Edamam ID"
ConnectionStrings:DefaultConnection = "Your connection string"
AWSKeys:S3_BUCKET_NAME = "Your bucket name"
AWSKeys:AWS_SECRET_KEY = "Your key"
AWSKeys:AWS_REGION = "Your region"
AWSKeys:AWS_ACCESS_KEY = "Your key"

Run database migrations:

dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run

2️⃣ Frontend Setup

Install dependencies:
npm i

Start the frontend application:
npm run dev

📅 Future Plans & Upcoming Features

🔹 Expanded Workout Statistics – More detailed training analysis and load tracking.
🔹 AI-Driven Workout & Meal Recommendations – Tailored suggestions based on individual diet and activity levels.
🔹 Mobile App – Dedicated mobile version for iOS and Android.
🔹 More In-Depth Nutrition Analytics – Tracking vitamins, minerals, and supplement recommendations.

If u have any great idea how it can be more effective let me know! :)
