from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import GPT2LMHeadModel
import torch

import spacy
from spacy.tokens import DocBin
from tqdm import tqdm
from spacy import displacy
import json
import sys

#copied
import torch
torch.manual_seed(42)

from transformers import GPT2LMHeadModel, GPT2TokenizerFast, GPT2Config, GPT2Tokenizer
from torch.utils.data import Dataset, DataLoader, random_split, RandomSampler, SequentialSampler

#copied
model_directory = "app/model_epoch_5/"

app = FastAPI()

# load ner model
app.nlp_ner = spacy.load("app/model-best/")

# Load model
app.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
app.model = GPT2LMHeadModel.from_pretrained(model_directory)
app.model.to(app.device)
app.tokenizer = GPT2Tokenizer.from_pretrained(model_directory)
app.end_token_id = app.tokenizer.added_tokens_encoder["[e:lyrics]"]
app.meta_dict = {
        "title": {
            "st_token": "[s:title]",
            "end_token": "[e:title]",
            "tok_type_id": 1
        },
        "artist": {
            "st_token": "[s:artist]",
            "end_token": "[e:artist]",
            "tok_type_id": 2
        },
        "genre": {
            "st_token": "[s:genre]",
            "end_token": "[e:genre]",
            "tok_type_id": 3
        },
        "lyrics": {
            "st_token": "[s:lyrics]",
            "end_token": "[e:lyrics]",
            "tok_type_id": 4
        }
    }


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
    lyrics = generate('Pop', 'Taylor Swift', '22')
    print(lyrics)
    return {"message": {lyrics}}


@app.post('/query', tags=['query'])
def query(request: dict) -> dict:
    print(f"got this as the request: {request}")
    prompt = request['query']
    genre, artist, title = get_entities(prompt)
    lyrics = generate(genre, artist, title)
    response_body = {
        "lyrics": {lyrics},
        "parsed_artist": artist,
        "parsed_genre": genre,
        "parsed_subject": title
        
    }
    return response_body



#copied 

def get_token_types(input, enc):
    """
    This method generates toke_type_ids that correspond to the given input_ids.
    :param input: Input_ids (tokenised input)
    :param enc: Model tokenizer object
    :return: A list of toke_type_ids corresponding to the input_ids
    """

    tok_type_ids = [0] * len(input)

    for feature in app.meta_dict.keys():
        start_tok_id = enc.added_tokens_encoder[app.meta_dict[feature]["st_token"]]
        end_tok_id = enc.added_tokens_encoder[app.meta_dict[feature]["end_token"]]
        tok_type_val = app.meta_dict[feature]["tok_type_id"]

        # If this feature exists in the input, find out its indexes
        if start_tok_id and end_tok_id in input:
            st_indx = input.index(start_tok_id)
            end_indx = input.index(end_tok_id)
            tok_type_ids[st_indx:end_indx+1] = [tok_type_val] * ((end_indx-st_indx) + 1)
        # This means that this is the token we are currently predicting
        elif start_tok_id in input:
            st_indx = input.index(start_tok_id)
            tok_type_ids[st_indx:] = [tok_type_val] * (len(input)-st_indx)

    return tok_type_ids



def generate(genre, artist, song_name):

    context = "[s:genre]" + genre + "[e:genre]" + \
            "[s:artist]" + artist + "[e:artist]" + \
            "[s:title]" + song_name + "[e:title]" + \
            "[s:lyrics]"

    context = app.tokenizer.encode(context)

    input_ids = torch.tensor(context, device=app.device, dtype=torch.long).unsqueeze(0)
    position_ids = torch.arange(0, len(context), device=app.device, dtype=torch.long).unsqueeze(0)
    token_type_ids = torch.tensor(get_token_types(context, app.tokenizer), device=app.device, dtype=torch.long).unsqueeze(0)


    sample_outputs = app.model.generate(
                                    input_ids=input_ids,
                                    position_ids=position_ids,
                                    token_type_ids=token_type_ids,
                                    do_sample=True,
                                    top_k=50,
                                    max_length = 2000,
                                    top_p=0.95,
                                    num_return_sequences=1,
                                    eos_token_id=app.end_token_id,
                                    repetition_penalty=1.1
                                    )

    output = app.tokenizer.decode(sample_outputs[0], skip_special_tokens=True)
    output = output.replace(genre + artist + song_name, "")
    return output
    
    
    # final_output = []
    # for sample_output in sample_outputs:
    #     output = tokenizer.decode(sample_output, skip_special_tokens=True)
    #     output = output.replace(genre + artist + song_name, "")
    #     final_output.append(output)
    # return final_output
  
def get_entities(prompt):
    doc = app.nlp_ner(prompt) 

    artist = ""
    title = ""
    genre = ""
    for e in doc.ents:    
        if (e.label_ == "ARTIST"):
            artist += (str(e) + " ")
        if (e.label_ == "TITLE"):
            title += (str(e) + " ")
        if (e.label_ == "GENRE"):
            genre += (str(e) + " ")
    
    return genre.strip(), artist.strip(), title.strip()