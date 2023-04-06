
import torch
torch.manual_seed(42)

from transformers import GPT2LMHeadModel, GPT2TokenizerFast, GPT2Config, GPT2Tokenizer
from torch.utils.data import Dataset, DataLoader, random_split, RandomSampler, SequentialSampler


def get_token_types(input, enc):
    """
    This method generates toke_type_ids that correspond to the given input_ids.
    :param input: Input_ids (tokenised input)
    :param enc: Model tokenizer object
    :return: A list of toke_type_ids corresponding to the input_ids
    """
    meta_dict = {
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

    tok_type_ids = [0] * len(input)

    for feature in meta_dict.keys():
        start_tok_id = enc.added_tokens_encoder[meta_dict[feature]["st_token"]]
        end_tok_id = enc.added_tokens_encoder[meta_dict[feature]["end_token"]]
        tok_type_val = meta_dict[feature]["tok_type_id"]

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

checkpoint = "gpt2-medium"

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model_directory = "model_epoch_5/"

pt_model = GPT2LMHeadModel.from_pretrained(model_directory)
pt_model = pt_model.to(device)

tokenizer = GPT2Tokenizer.from_pretrained(model_directory)

genre = "Metal"
artist = "Frank Ocean"
song_name = "Smoked Kielbasa"

context = "[s:genre]" + genre + "[e:genre]" + \
          "[s:artist]" + artist + "[e:artist]" + \
          "[s:title]" + song_name + "[e:title]" + \
          "[s:lyrics]"

end_token = "[e:lyrics]"
end_token_id = tokenizer.added_tokens_encoder[end_token]

new_context = tokenizer.encode(context)

input_ids = torch.tensor(new_context, device=device, dtype=torch.long).unsqueeze(0)
position_ids = torch.arange(0, len(new_context), device=device, dtype=torch.long).unsqueeze(0)
token_type_ids = torch.tensor(get_token_types(new_context, tokenizer), device=device, dtype=torch.long).unsqueeze(0)


sample_outputs = pt_model.generate(
                                input_ids=input_ids,
                                position_ids=position_ids,
                                token_type_ids=token_type_ids,
                                do_sample=True,
                                top_k=50,
                                max_length = 2000,
                                top_p=0.95,
                                num_return_sequences=3,
                                eos_token_id=end_token_id,
                                repetition_penalty=1.1
                                )

for i, sample_output in enumerate(sample_outputs):
  output = tokenizer.decode(sample_output, skip_special_tokens=True)
  output = output.replace(genre + artist + song_name, "")
  print(f'{i}: prompt: \"{context}\"\nOutput:\n{output}\n\n')