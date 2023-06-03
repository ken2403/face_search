# Backend for Nobel laureate face search application

## How to run API server

```bash
python manage.py runserver PORT
```

## API Endpoints

- `/api/search` (**POST**)
  - `200`: Success
    Returns information on the closest Nobel Prize winner to the submitted image.
  - `400`: Bad Request
    The submitted image is not a valid image.
  - `500`: Internal Server Error

## Directory structure

```bash
.
├── README.md
├── face_index.bin  # Face index file made by faiss
├── labels.npy      # Face label of nobel prize winners
├── query.csv       # Information of nobel prize winners from wikipedia
├── back/           # API server with django project
├── search/         # Search application with django app
└── manage.py       # Django management script
```
