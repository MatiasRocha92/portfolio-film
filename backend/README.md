# Portfolio Film - Backend API

Backend API for the filmmaker portfolio website built with FastAPI and MongoDB.

## 🚀 Quick Start

### Prerequisites

- Python 3.9 or higher
- MongoDB (local or MongoDB Atlas)

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection string and other settings:

```env
MONGO_URL=mongodb://localhost:27017/portfolio
# or for MongoDB Atlas:
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/portfolio

API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

### 3. Run the Server

```bash
python main.py
```

Or with uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### 4. View API Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📚 API Endpoints

### Contact Form

- **POST** `/api/contact` - Save contact form submission

  ```json
  {
    "email": "user@example.com"
  }
  ```

- **GET** `/api/contacts` - Get all contact submissions (admin)

### Portfolio Projects

- **GET** `/api/projects` - Get all projects
- **POST** `/api/projects` - Create new project (admin)
  ```json
  {
    "title": "Project Title",
    "category": "Motion Design",
    "subcategory": "Art Direction",
    "description": "Project description...",
    "videoUrl": "https://vimeo.com/..."
  }
  ```
- **DELETE** `/api/projects/{id}` - Delete project (admin)

## 🗄️ Database Setup

### Local MongoDB

1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/portfolio`

### MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string from "Connect" → "Connect your application"
4. Update `MONGO_URL` in `.env`

### Seed Initial Data (Optional)

You can manually add projects through:

- The API docs at `/docs`
- MongoDB Compass
- Direct database insertion

Example project document:

```json
{
  "id": 1,
  "title": "Overmono",
  "category": "Motion Design",
  "subcategory": "Dirección de Arte",
  "description": "Project description here...",
  "videoUrl": "https://player.vimeo.com/video/1068632533?h=65cbc639f4"
}
```

## 🔒 Security Notes

> **Important**: This is a template backend. For production use:

1. **Add Authentication**: Protect admin endpoints (POST, DELETE) with API keys or JWT
2. **Rate Limiting**: Add rate limiting to prevent abuse
3. **Input Validation**: Already implemented with Pydantic models
4. **HTTPS**: Use HTTPS in production
5. **Environment Variables**: Never commit `.env` file to git

## 📁 Project Structure

```
backend/
├── main.py              # FastAPI application & routes
├── config.py            # Configuration settings
├── database.py          # MongoDB connection
├── models.py            # Pydantic data models
├── requirements.txt     # Python dependencies
├── .env.example         # Environment template
└── README.md            # This file
```

## 🛠️ Development

### Running Tests

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

### Code Formatting

```bash
# Install formatting tools
pip install black isort

# Format code
black .
isort .
```

## 📝 License

MIT License - Feel free to use this template for your own projects!
