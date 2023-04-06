# Running backend app w/ model

create and activate env in backend
install requirement.txt
pip install pytorch
pip install transformers

install model in backend/app -
"scp -r convai@clarity3.eecs.umich.edu:/home/convai/gpt-2/transformers/tuned_models/lyrics_one_genre_varied/gpt2-medium_final/model_epoch_5 ."


install fastrequirement.txt

python main.py