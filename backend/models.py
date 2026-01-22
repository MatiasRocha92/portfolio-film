from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ContactMessage(BaseModel):
    """Contact form submission model"""
    email: str = Field(..., description="User email address")
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Project(BaseModel):
    """Portfolio project model"""
    id: int = Field(..., description="Project ID")
    title: str = Field(..., description="Project title")
    category: str = Field(..., description="Project category (e.g., Motion Design)")
    subcategory: str = Field(..., description="Project subcategory (e.g., Art Direction)")
    description: str = Field(..., description="Project description")
    videoUrl: str = Field(..., description="Video URL (Vimeo or direct)")
    
class ProjectCreate(BaseModel):
    """Model for creating a new project"""
    title: str
    category: str
    subcategory: str
    description: str
    videoUrl: str
