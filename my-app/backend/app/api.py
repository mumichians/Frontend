from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "localhost:3000",
    "localhost:8000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/test", tags=["root"])
async def read_root() -> dict:
    return {"message": "This is proof the server works."}


@app.post('/query', tags=['query'])
def query(request: dict) -> dict:
    print(f"got this as the request: {request}")
    prompt = request['query']
    lyrics = prompt
    response_body = {
        "lyrics": {lyrics},
        "parsed_artist": "placeholder artist",
        "parsed_genre": "placeholder genre",
        "parsed_subject": "placeholder subject"
        
    }
    return response_body