# SmritiCare – Qdrant-Based Dementia Memory Assistant

SmritiCare is an AI-powered dementia care assistant designed for Indian caregivers and doctors.
It uses Qdrant as a semantic memory engine to store and retrieve patient behavioral history.

---

## Why Qdrant?
Traditional databases fail to capture unstructured caregiver notes.
Qdrant enables semantic similarity search over patient memories, allowing doctors to detect
patterns across time.

---

## Architecture
Caregiver / Doctor Input → Embedding Model → Qdrant Vector DB → Semantic Retrieval → Analyzer

---

## Setup Instructions

### 1. Install dependencies
```bash
pip install -r requirements.txt
