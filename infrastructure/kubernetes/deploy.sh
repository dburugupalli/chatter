kubectl create -f mongodb.yaml
kubectl create -f redis-node-deployment.yaml
kubectl create -f twitter-server-deployment.yaml
kubectl create -f twitter-service-lb.yaml
kubectl create -f twitter-redis-deployment.yaml
kubectl create -f twitter-redis-service-lb.yaml