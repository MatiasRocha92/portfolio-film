# NAHUEL | Filmmaker Portfolio

A high-performance, visually immersive portfolio website designed for a professional filmmaker. This project leverages modern web technologies to deliver a cinematic user experience, featuring smooth animations, a responsive design, and a clean aesthetic.

![portfolio-preview](image.png)

## 🚀 Features

- **Cinematic Intro**: Engaging opening sequence to captivate visitors immediately.
- **Interactive Showcase**: Dynamic gallery to display film works and projects.
- **Smooth Animations**: powered by **GSAP** and **Framer Motion** for a premium feel.
- **Responsive Design**: Fully optimized for all devices (Desktop, Tablet, Mobile).
- **Backend Integration**: Scalable **FastAPI** backend for handling requests and data (optional).

## 🛠️ Tech Stack

### Frontend

- **React**: Library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Framer Motion**: Production-ready motion library for React.
- **GSAP**: Professional-grade animation library.
- **Radix UI**: Unstyled, accessible components for building high-quality design systems.

### Backend

- **Python**: Core language.
- **FastAPI**: Modern, fast (high-performance) web framework for building APIs.
- **Motor**: Asynchronous MongoDB driver.

## 📦 Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Python](https://www.python.org/) (v3.9 or higher)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/MatiasRocha92/portfolio-film.git
cd portfolio-film
```

### 2. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### 3. Backend Setup (Optional)

If you need to run the backend services:

```bash
cd backend
# Create a virtual environment
python -m venv venv
# Activate the virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run the server
uvicorn server:app --reload
```

The API will be available at [http://localhost:8000](http://localhost:8000).

## 🔌 API Documentation

Once the backend is running, you can interact with the following endpoints:

### Contact

- **POST** `/api/contact`
  - **Body**: `{ "email": "user@example.com" }`
  - **Description**: Stores contact form submissions.

### Projects

- **GET** `/api/projects`
  - **Description**: Retrieves all projects to be displayed in the "Selected Works" section.
- **POST** `/api/projects`
  - **Body**:
    ```json
    {
      "title": "Project Title",
      "category": "Motion Design",
      "subcategory": "Art Direction",
      "description": "Project description...",
      "videoUrl": "https://vimeo.com/..."
    }
    ```
  - **Description**: Adds a new project to the portfolio.

> [!TIP]
> **Swagger UI**: You can view the interactive API documentation at [http://localhost:8000/docs](http://localhost:8000/docs) when the server is running.

## 📂 Project Structure

```bash
portfolio-film/
├── frontend/           # React Frontend Application
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── ui/         # Base UI elements
│   │   └── ...
│   └── ...
├── backend/            # FastAPI Backend Application
│   ├── server.py       # Main entry point
│   └── ...
└── README.md           # Project Documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Developed by [Nahuel]**
