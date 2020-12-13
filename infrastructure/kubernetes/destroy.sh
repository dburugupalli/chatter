kubectl delete -f mongodb.yaml
sleep 10
kubectl delete -f redis-node-deployment.yaml
sleep 10
kubectl delete -f twitter-server-deployment.yaml
sleep 10
kubectl delete -f twitter-service-lb.yaml
sleep 10
kubectl delete -f twitter-redis-deployment.yaml
sleep 10
kubectl delete -f twitter-redis-service-lb.yaml
