## Nats
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

## Docker production
```
docker build -f dockerfile.prod -t client-gateway .
```