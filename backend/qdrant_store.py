from qdrant_client import QdrantClient
from qdrant_client.http.models import PointStruct
from embeddings import get_embedding
import uuid
import time

client = QdrantClient(":memory:")  # in-memory for demo

COLLECTION_NAME = "smriticare_memory"

def setup_collection():
    client.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config={"size": 384, "distance": "Cosine"},
    )

def store_memory(patient_id: str, text: str, data_type: str):
    vector = get_embedding(text)

    point = PointStruct(
        id=str(uuid.uuid4()),
        vector=vector,
        payload={
            "patient_id": patient_id,
            "text": text,
            "type": data_type,
            "timestamp": time.time()
        }
    )

    client.upsert(
        collection_name=COLLECTION_NAME,
        points=[point]
    )

def search_memory(patient_id: str, query: str, limit: int = 5):
    query_vector = get_embedding(query)

    results = client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=limit,
        query_filter={
            "must": [
                {"key": "patient_id", "match": {"value": patient_id}}
            ]
        }
    )

    return results
