# File Upload Frontend

Frontend UI for image processing service.

## How It Works

1. Client uploads a file via `POST /file`
2. API server saves the file and enqueues a background job in Redis
3. Client opens a WebSocket connection to receive real-time updates
4. RQ worker picks up the job, processes the file, and publishes status events to Redis
5. WebSocket handler forwards those events to the connected client

## Getting Started

### Installation

```bash
npm install
```

### Running in Dev Environment Server

```bash
npm run dev
```

## License

MIT
