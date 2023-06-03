# Nobel laureate face search application

The application takes the user's photo with a webcam and outputs the top three past Nobel Prize winners that resemble the user's face.

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
