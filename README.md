# Url-Shortener-Frontend

This is the frontend app created with Vite (React + TypeScript)

## Getting started

1. Clone this repo

```bash
  git clone https://github.com/santisolari17/url-shortener-frontend.git
```

2. Navigate to the project directory

```bash
  cd url-shortener-frontend
```

2. Create a .env file

```
  VITE_BACKEND_URL=http://your-dev-server #Set it to your dev backend server URL
  VITE_CONFIG_VERSION=0.0.1 // A version label shown at the application footer
```

3. Install dependencies

```bash
  npm install
```

4. Run the app in development mode

```bash
  npm run dev
```

## Build

1. Run de build command

```bash
  npm run build
```

## Build and run as a Docker image

1. Build the Docker image

```bash
  docker build -t <your-image-name> .
```

2. Start the container

```bash
  docker run -p <your-host-port>:80 <your-image-name>
```
