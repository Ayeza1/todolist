# Todo App — Deployed

The task 3 todo app (Flask backend + vanilla JS frontend), deployed live to production hosting, with performance and SEO improvements. Built as a practice task for my frontend internship to learn what it actually takes to ship an app properly, not just run it on localhost.

## Live Deployment

- Frontend: https://tubular-sprite-f28934.netlify.app/
- Backend API: https://ayeza.pythonanywhere.com/todos

## What was done

- Deployed the backend to PythonAnywhere and the frontend to Netlify, connected to each other over the real internet instead of localhost
- Updated the backend to read its port from an environment variable, as required by production hosting
- Added a page title and meta description for basic SEO
- Ran a Lighthouse audit on the deployed frontend: Accessibility, Best Practices, and SEO all scored 100/100
- Performance started at 84 and improved to 95 after two fixes:
  - Inlined the CSS directly into the HTML to remove a render-blocking network request
  - Minified the JavaScript bundle (`script.min.js`) to reduce its size, while keeping the original readable `script.js` for reference
- Confirmed the live site works correctly on both desktop and mobile

## Built with

**Backend:**
- Python
- Flask
- Flask-CORS
- Hosted on PythonAnywhere

**Frontend:**
- HTML
- CSS (inlined for performance)
- Vanilla JavaScript (minified for production)
- Hosted on Netlify

## Architecture overview
todo-app-deploy/
backend/
app.py
requirements.txt
frontend/
index.html
script.js
script.min.js
style.css


## Running it locally

1. In `backend/`, install dependencies and run the server:
2. pip install -r requirements.txt
python app.py
2. Open `frontend/index.html` in a browser, or use a local server like VS Code Live Server. Note: `script.js` points to the live backend URL rather than localhost, so update it if testing locally.

## What I learned

Deploying for real was a lot more involved than running things on localhost. I hit real issues that had nothing to do with my actual code — a hosting platform requiring a card even on its free tier, a different platform not recognizing a repo it should have had access to, and a file getting corrupted while editing directly in a terminal-based text editor. Working through those taught me to verify things directly (checking file contents and git state with commands, rather than trusting what a webpage appeared to show) instead of assuming a step worked. I also learned that a Lighthouse score isn't just about JavaScript logic — things like render-blocking CSS and unminified files have a real, measurable effect on load performance.
The frontend (static HTML/CSS/JS) is hosted separately from the backend (a Flask API), and they communicate over HTTPS. The frontend calls the backend's `/todos` endpoints directly from the browser, with CORS enabled on the backend to allow requests from the Netlify domain.

## Project structure
