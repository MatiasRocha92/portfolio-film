from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

class Database:
    client: AsyncIOMotorClient = None
    db = None

db = Database()

async def connect_to_mongo():
    """Connect to MongoDB database"""
    print(f"Connecting to MongoDB at {settings.mongo_url}")
    db.client = AsyncIOMotorClient(settings.mongo_url)
    db.db = db.client.get_default_database()
    print("Connected to MongoDB successfully!")

async def close_mongo_connection():
    """Close MongoDB connection"""
    print("Closing MongoDB connection...")
    db.client.close()
    print("MongoDB connection closed!")

def get_database():
    """Get database instance"""
    return db.db
