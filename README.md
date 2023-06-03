# Nobel laureate face search application

This application uses **AI** to search for faces that resemble past Nobel Prize winners (in physics, chemistry, physiology/medicine, and literature).

## Usage

First, copy docker files and env file.

```shell
cp docker/Dockerfile.back .
cp docker/Dockerfile.front .

cp ./front.env.default ./front.env
```

Fill environment variables with appropriate values and then build the services.

```shell
docker compose build
```

Run services.

```shell
docker compose up
```
