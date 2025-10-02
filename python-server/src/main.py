from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI()

class Task(BaseModel):
    text: str

tasks = [
    "Write a diary entry from the future",
    "Create a time machine from a cardboard box",
    "Plan a trip to the dinosaurs",
    "Draw a futuristic city",
    "List items to bring on a time-travel adventure"
]

@app.middleware("http")
async def log_requests(request, call_next):
    logger.info(f"{request.method} {request.url.path}")
    response = await call_next(request)
    return response

@app.get("/")
def get_root():
    try:
        return "Hello World"
    except Exception as e:
        logger.error(f"Error in GET /: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/tasks")
def add_task(task: Task):
    try:
        if not task.text:
            logger.warning("POST /tasks: Missing text field")
            raise HTTPException(status_code=400, detail="Missing required field: text")
        
        tasks.append(task.text)
        logger.info(f'Task added: "{task.text}". Total tasks: {len(tasks)}')
        return {"message": "Task added successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in POST /tasks: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/tasks")
def get_tasks():
    try:
        logger.info(f"Fetching {len(tasks)} tasks")
        return {"tasks": tasks}
    except Exception as e:
        logger.error(f"Error in GET /tasks: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
