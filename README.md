# Setting Up an Angular Project Locally

## Prerequisites
- **Node.js** (LTS version recommended): [Download Node.js](https://nodejs.org)
- **npm** (comes bundled with Node.js)

### Check if Node.js and npm are installed:
```bash
node -v   # should return a version number
npm -v    # should return a version number
```

## Install Angular CLI
```bash
npm install -g @angular/cli
```
Check if Angular CLI is installed:
```bash
ng version
```

## Install Dependencies for an Existing Project
If you already have an Angular project, navigate to its folder and run:
```bash
npm install
```

## Serve the Application
```bash
ng serve
```
Open your browser and visit `http://localhost:4200`

### Notes:
- Ensure your Node.js version is compatible with the latest Angular version.
- Use `--force` flag if you encounter version conflicts during installation.
