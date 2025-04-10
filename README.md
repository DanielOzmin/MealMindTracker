# 🧠🍽️ MealMindTracker – Smart Nutrition, Smarter You

![Main](./ScreenShots/Képernyőfotó%202025-04-10%20-%209.43.16.png)
![Statistics](./ScreenShots/Képernyőfotó%202025-04-10%20-%209.43.28.png)
![Meals](./ScreenShots/Képernyőfotó%202025-04-10%20-%209.43.54.png)

> **MealMindTracker** is your intelligent companion for mastering your nutrition. Whether you're a fitness enthusiast, a health-conscious individual, or someone just starting out—this app helps you **track, plan, and optimize** your meals with the power of AI.

---

## 🚀 Why MealMindTracker?

MealMindTracker tailors your experience using advanced technology:

- 📊 Track your **macros**, **micros**, and **calories** daily, weekly, and monthly  
- 🧠 Let **AI** recommend meals based on your goals and habits  
- 📸 Upload your own recipes – the app calculates nutrition for you  
- 💪 Plan smarter workouts and meals (coming soon!)  
- 📱 Mobile version in the works for full accessibility  

---

## ✨ Core Features

- ✅ **Smart Recipe Logging** – Add ingredients, auto-calculated nutrition  
- ✅ **Nutrition Tracking** – Log your food intake over time  
- ✅ **AI-Powered Meal Planning** – Personalized suggestions via OpenAI  
- ✅ **Photo Upload** – Attach images to your meals  
- ✅ **Analytics Dashboard** – View daily, weekly, monthly nutrient stats  
- ✅ **Workout Integration** *(Coming Soon)*  
- ✅ **Mobile Version** *(Coming Soon)*  
- ✅ **Deeper AI Insights** *(Coming Soon)*

---

## ⚙️ Tech Stack

| Layer             | Technology                       |
|------------------|----------------------------------|
| **Backend**       | ASP.NET Core, Entity Framework Core, MSSQL |
| **Frontend**      | React + TypeScript               |
| **AI Integration**| OpenAI API                       |
| **Image Upload**  | AWS S3                           |
| **Containerization** | Docker                        |
| **DevOps & DB**   | Azure Data Studio                |

---

## 🧪 Getting Started

### 🔧 Backend Setup

1. Clone the repository  
2. Set the following secrets using `dotnet user-secrets`:

```bash
OpenAI:ApiKey = "your-api-key"
Edamam:ApiKey = "your-api-key"
Edamam:ApiId = "your-edamam-id"
ConnectionStrings:DefaultConnection = "your-connection-string"
AWSKeys:S3_BUCKET_NAME = "your-bucket"
AWSKeys:AWS_SECRET_KEY = "your-secret"
AWSKeys:AWS_REGION = "your-region"
AWSKeys:AWS_ACCESS_KEY = "your-access-key"

3. Run the backend:
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
🌐 Frontend Setup
npm install
npm run dev
📅 Roadmap

🔹 Workout Statistics – Detailed training analytics
🔹 AI-Based Meal + Workout Sync – Food + fitness in harmony
🔹 Mobile App – Native or cross-platform iOS & Android version
🔹 Expanded Nutrition Insights – Vitamins, minerals, supplements
💡 Contribute or Suggest!

Got a cool idea? Want to help build the future of smart nutrition?
Create an issue, fork the repo, or send your suggestions – we’d love to hear from you! 🙌
