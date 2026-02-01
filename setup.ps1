# setup.ps1 - PowerShell script for Windows

Write-Host "Setting up React Assignment..." -ForegroundColor Green

# Remove old files
if (Test-Path "node_modules") {
    Write-Host "Removing node_modules..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force node_modules
}

if (Test-Path "package-lock.json") {
    Write-Host "Removing package-lock.json..." -ForegroundColor Yellow
    Remove-Item package-lock.json
}

# Clear cache
Write-Host "Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Install Tailwind CSS
Write-Host "Installing Tailwind CSS..." -ForegroundColor Yellow
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
Write-Host "Initializing Tailwind..." -ForegroundColor Yellow
npx tailwindcss init -p

# Create netlify.toml
Write-Host "Creating netlify.toml..." -ForegroundColor Yellow
@'
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
'@ | Out-File -FilePath netlify.toml -Encoding utf8

# Create vite.config.js
Write-Host "Creating vite.config.js..." -ForegroundColor Yellow
@'
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  }
})
'@ | Out-File -FilePath vite.config.js -Encoding utf8

# Update tailwind.config.js
Write-Host "Updating tailwind.config.js..." -ForegroundColor Yellow
@'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
'@ | Out-File -FilePath tailwind.config.js -Encoding utf8

# Create postcss.config.js
Write-Host "Creating postcss.config.js..." -ForegroundColor Yellow
@'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
'@ | Out-File -FilePath postcss.config.js -Encoding utf8

# Create src/index.css
Write-Host "Creating src/index.css..." -ForegroundColor Yellow
@'
@tailwind base;
@tailwind components;
@tailwind utilities;
'@ | Out-File -FilePath src/index.css -Encoding utf8

# Create README.md
Write-Host "Creating README.md..." -ForegroundColor Yellow
@'
# React Developer Intern Assignment

## Setup
1. npm install
2. npm run dev
3. Open http://localhost:5173

## Build
npm run build
'@ | Out-File -FilePath README.md -Encoding utf8

Write-Host "Setup complete! Starting development server..." -ForegroundColor Green
npm run dev