from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import GPT2LMHeadModel
import torch
import load_model

app = FastAPI()

model_directory = "model_epoch_5/"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

pt_model = GPT2LMHeadModel.from_pretrained(model_directory)
pt_model = pt_model.to(device)

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
    my_arr = prompt.split(',')
    genre = my_arr[0]
    artist = my_arr[1]
    title = my_arr[2]
    lyrics = load_model.generate(pt_model, genre, artist, title)
    response_body = {
        "lyrics": {lyrics},
        "parsed_artist": "placeholder artist",
        "parsed_genre": "placeholder genre",
        "parsed_subject": "placeholder subject"
        
    }
    return response_body