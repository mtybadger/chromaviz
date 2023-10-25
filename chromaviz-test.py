from chromaviz import visualize_collection
import chromadb
from chromadb.config import Settings
import random

chromadb_settings = Settings(anonymized_telemetry=False)
client = chromadb.Client(settings=chromadb_settings)
collection = client.get_or_create_collection(name="test")

WORDS = open('./tests/wordlist.txt').read().splitlines()

def randomString(prefix: str):
    return prefix + ''.join(random.choice(WORDS))

for i in range(126):
    collection.add(
        documents=[randomString('doc_')],
        metadatas=[{"meta1": randomString('meta_'), "meta2": randomString('meta_')}],
        ids=[randomString('id_')]
    )

visualize_collection(collection)

