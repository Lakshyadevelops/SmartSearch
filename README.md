# Hotel Booking Chatbot

##  Folder Structure

### **Frontend (React.js App)**
```
frontend/
├── public/
├── src/
│   ├── assets/                 # Contains images
│   ├── services/               # Connects APIs of TBO for rendering
│   ├── views/
│   │   ├── AuthProvider/
│   │   ├── Card/
│   │   ├── Carousel/
│   │   ├── ChatBotHome/
│   │   ├── Header/
│   │   ├── HomePage/
│   │   ├── HotelBooking/
│   │   ├── HotelCard/
│   │   ├── HotelModal/
│   │   ├── Login/
│   │   ├── LogoutButton/
│   │   ├── MessageCard/
│   │   ├── PhotoGallery/
│   │   ├── ProtectedRoute/
│   │   ├── Results/
│   │   ├── SearchBox/
│   │   ├── Slider/
│   │   ├── UserVerifyModal/
│   ├── App.js
│   ├── App.css
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tailwind.config.js
```

### **Backend (FastAPI)**
```
backend/
├── .env
├── db.py                        # Database connection handling
├── get_user_data_agent.py       # Fetching user data and processing
├── main.py                      # Entry point for FastAPI server
├── requirements.txt             # Python dependencies
├── sql_query_generator.py       # Generates SQL queries dynamically
```

## 🚀 Setup Guide

### **Frontend Setup**
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/hotel-chatbot.git
   cd hotel-chatbot/frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:** (Create a `.env` file in `frontend/` and add your API keys)
4. **Start the React development server:**
   ```sh
   npm start
   ```

### **Backend Setup**
1. **Navigate to the backend directory:**
   ```sh
   cd backend
   ```
2. **Create a virtual environment:**
   ```sh
   python -m venv venv
   source venv/bin/activate   # For macOS/Linux
   venv\Scripts\activate      # For Windows
   ```
3. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```
4. **Set up environment variables:** (Create a `.env` file in `backend/` and add necessary keys)
5. **Run the FastAPI server:**
   ```sh
   uvicorn main:app --reload
   ```
6. **API Documentation:**
   - Open `http://127.0.0.1:8000/docs` in your browser to access interactive API documentation.

---

## 🌟 Features

### ✅ **Google Authentication**
- Secure and seamless user login with **Google OAuth**.
- Users can log in without creating a new account manually.

### 🤖 **AI Assistant (Always with You and for You)**
- An interactive chatbot powered by **NLP models**.
- Smartly understands user preferences and provides hotel recommendations.
  ![image](https://github.com/user-attachments/assets/8a5b9464-4c65-4c4c-a9cd-29c5fa522c94)



### 🗣 **Interact with Users**
- The chatbot engages in dynamic conversations to refine user preferences.
- Provides follow-up questions to improve search accuracy.

### 🧠 **Smartly Understand Natural Language Queries**
- Supports queries like:
  - *"Give me 5 star hotels in Dubai near Dubai Mall having cctv,wifi and ac.We will be 3 persons checking on 5th Feb and checking out on 7th feb"*
  - *"Give me hotels in Madinah for 3 persons as we are going for hazz from 5th feb to 7th feb"*
    ![image](https://github.com/user-attachments/assets/d1eafcda-7669-405e-8228-801a04c8932b)


### 🎯 **Personalized Results**
- Custom-tailored hotel listings based on user preferences.
- Uses **machine learning** to improve recommendations over time.

### 🖼 **Image Searching**
- Users can search for hotels using images.
- AI-powered image recognition helps find similar hotels.
  ![image](https://github.com/user-attachments/assets/d2e32957-edde-4388-8f89-d0b717078154)


### 🎙 **Supports Voice Search**
- Users can **speak** their hotel preferences instead of typing.
- Uses **speech recognition** to interpret user commands.

### 🔓 **Access Premium Section**
- Exclusive deals and premium hotel listings available for subscribed users.
- Unlock **VIP customer support** and **personalized recommendations**.
  ![image](https://github.com/user-attachments/assets/c0466448-eb17-4a8b-8f2b-8dffc7ee15e1)


### 🗺 **Supports Precise Location & Surrounding Access (Google Maps)**
- Uses **Google Maps API** to find nearby hotels.
- Allows users to explore hotel locations with an **interactive map**.
  ![image](https://github.com/user-attachments/assets/46af8f5e-6e57-455e-8dbe-ed7acee11fc7)


---

## 📑 API Documentation

### **BackEndpoints and Their Functions**

#### `GET /login`
- Redirects the user to the **login page**.

#### `GET /auth/callback`
- Handles the **Google Authentication callback** after login.

#### `GET /auth/check`
- Returns the **current authenticated user** details.

#### `GET /logout`
- Logs the user out and **clears session data**.

#### `POST /api/hotel-details`
- Fetches detailed information about a **specific hotel**.

#### `POST /chat`
- The **chatbot interaction endpoint** for responding to user queries.

#### `GET /get_hotels`
- Fetches hotel data based on **user preferences and search criteria**.

---
