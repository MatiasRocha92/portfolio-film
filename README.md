# NAHUEL | Filmmaker Portfolio

A high-performance, visually immersive portfolio website designed for a professional filmmaker. This project leverages modern web technologies to deliver a cinematic user experience, featuring smooth animations, a responsive design, and a clean aesthetic.

![portfolio-preview](image.png)

## 🚀 Features

- **Cinematic Intro**: Engaging opening sequence to captivate visitors immediately.
- **Interactive Showcase**: Dynamic gallery to display film works and projects.
- **Smooth Animations**: Powered by **GSAP** and **Framer Motion** for a premium feel.
- **Responsive Design**: Fully optimized for all devices (Desktop, Tablet, Mobile).
- **Modern Stack**: Built with React, Tailwind CSS, and CRACO for optimal performance.

## 🛠️ Tech Stack

- **React**: Library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Framer Motion**: Production-ready motion library for React
- **GSAP**: Professional-grade animation library
- **Radix UI**: Unstyled, accessible components for building high-quality design systems
- **CRACO**: Create React App Configuration Override for custom webpack config
- **Lenis**: Smooth scroll library for premium scrolling experience

## 📦 Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/MatiasRocha92/portfolio-film.git
cd portfolio-film
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

> **Note**: We use `--legacy-peer-deps` due to peer dependency conflicts between React 19 and some UI libraries.

### 3. Start Development Server

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### 4. Backend Setup (Optional)

The backend is a **template** ready for you to configure with your own credentials.

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Copy environment template and configure
cp .env.example .env
# Edit .env with your MongoDB connection string

# Run the backend server
python main.py
```

The API will be available at [http://localhost:8000](http://localhost:8000).

**See [backend/README.md](backend/README.md) for detailed setup instructions.**

### 5. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## 📂 Project Structure

```bash
portfolio-film/
├── backend/            # FastAPI Backend (Template)
│   ├── main.py         # API application
│   ├── config.py       # Configuration
│   ├── database.py     # MongoDB connection
│   ├── models.py       # Data models
│   ├── .env.example    # Environment template
│   └── README.md       # Backend documentation
├── public/             # Static assets
│   └── assets/         # Images, videos, etc.
├── src/
│   ├── components/     # React components
│   │   ├── ui/         # Reusable UI components (Radix)
│   │   ├── MainHero.jsx
│   │   ├── WorksSection.jsx
│   │   ├── AboutSection.jsx
│   │   └── ContactSection.jsx
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   ├── index.css       # Global styles & Tailwind config
│   └── index.js        # Application entry point
├── craco.config.js     # CRACO configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── package.json        # Dependencies
└── README.md           # This file
```

## 🎨 Design System

The project uses a **cinematic, editorial design system** with:

- **Monochromatic color palette**: Deep blacks and pure whites
- **Premium typography**: Bebas Neue for headings, Inter for body text
- **Smooth transitions**: Custom cubic-bezier easing functions
- **Subtle animations**: GSAP-powered scroll triggers and reveals
- **Film grain texture**: Noise overlay for authentic cinematic feel

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Configure the following settings:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install --legacy-peer-deps`

4. Add environment variables:
   - `NPM_CONFIG_LEGACY_PEER_DEPS` = `true`
   - `CI` = `false`

5. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Developed by [Nahuel]**
