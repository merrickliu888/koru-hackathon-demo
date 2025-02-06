## Backend

- FastAPI

### To Start

1. Install dependencies

```bash
pipenv install
```

2. Create a `.env` file and set the `COHERE_API_KEY` environment variable

```bash
COHERE_API_KEY=<your-cohere-api-key>
```

3. Start the server

```bash
pipenv run uvicorn main:app --reload
```

## Frontend

- Next.js

### To Start

1. Install dependencies

```bash
npm install
```

2. Create a `.env.local` file and set the `NEXT_PUBLIC_API_URL` environment variable

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. Start the server

```bash
npm run dev
```


