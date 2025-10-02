# Express Server Project

This is a simple Express server project that listens on port 8001. It is set up to use nodemon for automatic code reloading during development.

## Project Structure

```
express-server
├── src
│   ├── index.js          # Entry point of the application
│   └── routes
│       └── index.js      # Route definitions (currently empty)
├── .dockerignore          # Files and directories to ignore in Docker
├── Dockerfile             # Instructions to build the Docker image
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

Make sure you have `Node.js` and `yarn` installed on your machine.

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd express-server
   ```

2. Install dependencies:
   ```
   yarn install
   ```

### Running the Server

To start the server with automatic reloading, run:
```
yarn start
```

The server will be available at `http://localhost:8001`.

### Building the Docker Image

To build the Docker image, run:
```
docker build -t express-server .
```

### Running the Docker Container

To run the Docker container, use:
```
docker run -p 8001:8001 express-server
```

The server will be accessible at `http://localhost:8001` from your host machine.