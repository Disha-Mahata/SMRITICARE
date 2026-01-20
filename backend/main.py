from flask import Flask, request, jsonify
from qdrant_store import setup_collection, store_memory, search_memory

app = Flask(__name__)

setup_collection()

@app.route("/add_observation", methods=["POST"])
def add_observation():
    data = request.json
    store_memory(
        patient_id=data["patient_id"],
        text=data["text"],
        data_type=data.get("type", "caregiver_note")
    )
    return jsonify({"status": "stored successfully"})

@app.route("/search", methods=["POST"])
def search():
    data = request.json
    results = search_memory(
        patient_id=data["patient_id"],
        query=data["query"]
    )

    response = []
    for r in results:
        response.append({
            "text": r.payload["text"],
            "type": r.payload["type"],
            "score": r.score
        })

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
