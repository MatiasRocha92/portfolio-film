from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    Create a .env file based on .env.example to configure.
    """
    # MongoDB
    mongo_url: str = "mongodb://localhost:27017/portfolio"
    
    # API
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    
    # CORS
    cors_origins: str = "http://localhost:3000,http://localhost:3001"
    
    # Optional: Admin API Key
    admin_api_key: str | None = None
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
