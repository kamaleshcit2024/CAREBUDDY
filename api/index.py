from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Cancer Journey Companion API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Cancer Journey Companion API"}

@app.post("/intake")
async def process_intake(data: dict):
    from ai.issue_detection import detector
    issues = detector.detect_issues(data)
    return {
        "status": "success",
        "detected_issues": issues,
        "recommendations": [
            {"module": "Policy Navigator", "priority": "High"},
            {"module": "Resource Finder", "priority": "Medium"}
        ]
    }

@app.post("/chat")
async def chat(data: dict):
    from ai.policy_chat import policy_chat
    reply = policy_chat.get_reply(data.get("message", ""))
    return {"reply": reply}
