from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from config import settings
from database import connect_to_mongo, close_mongo_connection, get_database
from models import ContactMessage, Project, ProjectCreate
from datetime import datetime

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifespan events"""
    # Startup
    await connect_to_mongo()
    yield
    # Shutdown
    await close_mongo_connection()

# Initialize FastAPI app
app = FastAPI(
    title="Portfolio Film API",
    description="Backend API for filmmaker portfolio website",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
origins = settings.cors_origins.split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== ROUTES ====================

@app.get("/")
async def root():
    """API root endpoint"""
    return {
        "message": "Portfolio Film API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

# ==================== CONTACT ENDPOINTS ====================

@app.post("/api/contact")
async def create_contact(contact: ContactMessage):
    """
    Save a contact form submission
    
    - **email**: User's email address
    """
    try:
        db = get_database()
        contact_dict = contact.model_dump()
        result = await db.contacts.insert_one(contact_dict)
        
        return {
            "message": "Contact saved successfully",
            "id": str(result.inserted_id)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving contact: {str(e)}")

@app.get("/api/contacts")
async def get_contacts():
    """
    Get all contact submissions (admin only in production)
    
    Note: In production, this should be protected with authentication
    """
    try:
        db = get_database()
        contacts = await db.contacts.find().to_list(length=100)
        
        # Convert ObjectId to string
        for contact in contacts:
            contact["_id"] = str(contact["_id"])
        
        return contacts
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching contacts: {str(e)}")

# ==================== PROJECT ENDPOINTS ====================

@app.get("/api/projects", response_model=list[Project])
async def get_projects():
    """
    Get all portfolio projects
    
    Returns a list of all projects to display in the portfolio
    """
    try:
        db = get_database()
        projects = await db.projects.find().to_list(length=100)
        
        # Convert ObjectId to string and remove it
        for project in projects:
            if "_id" in project:
                del project["_id"]
        
        return projects
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching projects: {str(e)}")

@app.post("/api/projects", response_model=Project)
async def create_project(project: ProjectCreate):
    """
    Create a new portfolio project
    
    Note: In production, this should be protected with authentication
    
    - **title**: Project title
    - **category**: Project category (e.g., "Motion Design")
    - **subcategory**: Project subcategory (e.g., "Art Direction")
    - **description**: Project description
    - **videoUrl**: Video URL (Vimeo or direct link)
    """
    try:
        db = get_database()
        
        # Get the next ID
        last_project = await db.projects.find_one(sort=[("id", -1)])
        next_id = (last_project["id"] + 1) if last_project else 1
        
        # Create project with ID
        project_dict = project.model_dump()
        project_dict["id"] = next_id
        
        await db.projects.insert_one(project_dict)
        
        return Project(**project_dict)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating project: {str(e)}")

@app.delete("/api/projects/{project_id}")
async def delete_project(project_id: int):
    """
    Delete a project by ID
    
    Note: In production, this should be protected with authentication
    """
    try:
        db = get_database()
        result = await db.projects.delete_one({"id": project_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
        
        return {"message": "Project deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting project: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.api_host,
        port=settings.api_port,
        reload=True
    )
