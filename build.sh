docker-compose down
docker-compose build
docker-compose up -d
id=$(docker inspect --format="{{.Id}}" gadgetgate_api_1)
docker exec -it $id bash
# prisma2 lift save --name 'latest'
# prisma2 lift up