# Nguyễn Chí Lực — Interactive Portfolio Website

Welcome to your interactive personal developer portfolio! This folder contains a highly customized, ultra-premium developer-themed web portfolio showcasing your credentials, skills, projects, and cryptography education.

## 📂 Folder Contents

- **`index.html`**: Core HTML structure containing layout grids and content blocks.
- **`style.css`**: Design tokens, variables (dynamic light/dark themes), custom glassmorphic cards, mouse trail outline styles, animations, and responsive layouts.
- **`script.js`**: Core UI interactivity, canvas-based particle network, typing animations, scroll reveals, click clipboard quick copy, and feedback toast triggers.

## 🚀 Getting Started

### 1. View in Browser Immediately
You can directly open `index.html` in any modern web browser to view the application:
- Simply double-click on `index.html` in your file explorer.

### 2. Local HTTP Dev Server (Recommended)
Running through an HTTP server ensures assets, icons, and local history states function perfectly. 
We have left a background Python dev server running for you on **Port 8000**!
Open your browser and navigate to:
👉 **[http://localhost:8000](http://localhost:8000)**

If you need to start the dev server again in the future:
1. Open PowerShell / Command Prompt.
2. Navigate to your workspace directory.
3. Run the following command:
   ```bash
   python -m http.server 8000 --directory portfolio
   ```
4. Access the site via **`http://localhost:8000`**.

## 🛠️ Customization Details

- **Profile Details**: To edit your objective, phone, email, or other personal items, simply open `index.html` and modify the text within the corresponding HTML tags.
- **Adding Projects**: You can duplicate one of the `.project-card` containers in `index.html` to add more projects.
- **Theme Variables**: Custom gradients and colors can be fully personalized in `style.css` inside the `:root` and `.light-theme` blocks.

---
*Created with high-fidelity visual standards.*
