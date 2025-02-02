import secrets
import urllib.parse

import requests
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse, RedirectResponse
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import logging
from typing import Optional, Dict, Any
from sql_query_generator import get_results
from get_user_data_agent import workflow, UserDataState, UserDataResponse
from langchain_core.messages import HumanMessage
from dotenv import load_dotenv
import os

app = FastAPI()
load_dotenv()

# In-memory session storage (for demonstration)
sessions = {}

# Add session middleware to securely store session data (like our OAuth state).
app.add_middleware(SessionMiddleware, secret_key="SESSION_SECRET_KEY")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000", "http://localhost:3000", "http://127.0.0.1:3000/results"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Replace these with your actual Google OAuth credentials.
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

# This URL must be registered in your Google Developer Console.
REDIRECT_URI = os.getenv('REDIRECT_URI')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
API_BASE_URL = "http://api.tbotechnology.in/TBOHolidays_HotelAPI"
AUTH = {
    "username": os.getenv('TBO_USERNAME'),
    "password": os.getenv('TBO_PASSWORD')
}
class HotelRequest(BaseModel):
    # Add any specific request fields you need
    params: Dict[str, Any]

@app.get("/")
def home():
    """
    A simple home endpoint. In a real app, you might serve an HTML login page.
    """
    return {"message": "Welcome to the FastAPI Google OAuth2 Demo. Go to /login to begin."}


@app.get("/login")
def login(request: Request):
    state = secrets.token_urlsafe(16)
    request.session["oauth_state"] = state
    params = {
        "client_id": CLIENT_ID,
        "response_type": "code",
        "scope": "openid email profile",
        "redirect_uri": REDIRECT_URI,
        "state": state,
        "access_type": "offline",
        "prompt": "consent",
    }
    google_auth_url = "https://accounts.google.com/o/oauth2/v2/auth?" + urllib.parse.urlencode(params)
    return RedirectResponse(url=google_auth_url)

@app.get("/auth/callback")
def auth_callback(request: Request, code: str = None, state: str = None, error: str = None):
    if error:
        raise HTTPException(status_code=400, detail=f"Error from Google: {error}")

    session_state = request.session.get("oauth_state")
    if not state or not session_state or state != session_state:
        raise HTTPException(status_code=400, detail="Invalid or missing state parameter.")

    # Remove the state value so it can’t be reused.
    request.session.pop("oauth_state", None)

    if not code:
        raise HTTPException(status_code=400, detail="Missing authorization code.")

    token_endpoint = "https://oauth2.googleapis.com/token"
    token_data = {
        "code": code,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "grant_type": "authorization_code",
    }

    token_response = requests.post(token_endpoint, data=token_data)
    if token_response.status_code != 200:
        raise HTTPException(status_code=token_response.status_code,
                            detail="Failed to fetch token from Google.")
    token_json = token_response.json()
    access_token = token_json.get("access_token")
    if not access_token:
        raise HTTPException(status_code=400, detail="Access token not found in response.")

    userinfo_endpoint = "https://www.googleapis.com/oauth2/v3/userinfo"
    userinfo_response = requests.get(
        userinfo_endpoint, headers={"Authorization": f"Bearer {access_token}"}
    )
    if userinfo_response.status_code != 200:
        raise HTTPException(status_code=userinfo_response.status_code,
                            detail="Failed to fetch user info from Google.")

    user_info = userinfo_response.json()

    # Store user info in the session so that /me can return it.
    request.session["user"] = user_info

    # Redirect back to your React app home page.
    return RedirectResponse(url="http://127.0.0.1:3000/")

@app.get("/auth/check")
def get_current_user(request: Request):
    # This is just a placeholder. In a real app, check the session or token.
    user = request.session.get("user")
    if not user:
        raise HTTPException(status_code=401, detail="Not logged in")
    return user

@app.get("/logout")
def logout(request: Request):
    request.session.clear()
    # Redirect to login page or home where the login modal will be shown
    return RedirectResponse(url="http://127.0.0.1:3000/login")


@app.post("/api/hotel-details")
async def get_hotel_details(request: HotelRequest):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{API_BASE_URL}/HotelDetails",
                json=request.params,
                auth=(AUTH["username"], AUTH["password"]),
                headers={"Content-Type": "application/json"}
            )
            
            response.raise_for_status()
            return response.json()
            
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP Status Error: {e.response.status_code} - {e.response.text}")
        raise HTTPException(status_code=e.response.status_code, detail=str(e))
    except Exception as e:
        logger.error(f"Error fetching hotel details: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    

class ChatMessage(BaseModel):
    session_id: int
    user_input: str

class ChatbotResponse(BaseModel):
    complete: bool  # Whether all required info is available
    data: dict = None  # The extracted travel data if complete
    prompt: str = None  # Follow-up prompt asking for missing info if incomplete


# --- Utility Function ---
def is_data_complete(extracted: dict) -> bool:
    """
    Check if the required keys exist and are not None.
    (Here we consider city, check_in, check_out, and persons as required.)
    """
    required_keys = ["city", "check_in", "check_out", "persons"]
    return all(extracted.get(key) for key in required_keys)


# --- Chatbot Endpoint ---
@app.post("/chat", response_model=ChatbotResponse)
def chat_endpoint(session_id: int, user_input: str):
    print(f"User input: {user_input}")

    if not user_input:
        raise HTTPException(status_code=400, detail="User input cannot be empty.")

    # Get or create the session state
    if session_id in sessions:
        state: UserDataState = sessions[session_id]
    else:
        # Create a new state instance for the session
        state = UserDataState(
            session_id=session_id,
            chat_history=[]
        )
        sessions[session_id] = state

    # Append the new message to the chat history
    state.chat_history.append(HumanMessage(content=user_input))
    
    # Optionally increment a try counter (if you want to limit attempts)
    state.tries += 1

    # Invoke the workflow with the updated state
    result = workflow.invoke(state)
    # Expecting result to be a dict like:
    #   {"response": <LLM structured response>, "missing_data": <prompt string>}
    llm_response = result.get("response")
    missing_data_prompt = result.get("missing_data")
    state.response=llm_response

    if not llm_response:
        raise HTTPException(status_code=500, detail="No response from workflow.")

    # If llm_response is not already a dict, try converting it (or use pydantic parsing)
    if isinstance(llm_response, dict):
        extracted_data = llm_response
    else:
        # Assume it's a pydantic model (UserDataResponse)
        extracted_data = llm_response.dict()

    # Decide whether the data is complete
    sessions[session_id]=state
    if is_data_complete(extracted_data):
        return ChatbotResponse(complete=True, data=extracted_data)
    else:
        # Data is incomplete – return the missing data prompt for the frontend to display
        return ChatbotResponse(complete=False, prompt=missing_data_prompt)
    

@app.get("/get_hotels")
def send_user_data(session_id: int):
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found.")
    
    state: UserDataState = sessions[session_id]
    results = get_results(state)
    # sessions.pop(session_id, None)
    return results
