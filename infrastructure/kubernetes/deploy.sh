kubectl create -f mongodb.yaml
sleep 10
kubectl create -f redis-node-deployment.yaml
sleep 5
kubectl create -f twitter-server-deployment.yaml
sleep 5
kubectl create -f twitter-service-lb.yaml
sleep 5
kubectl create -f twitter-redis-deployment.yaml
sleep 5
kubectl create -f twitter-redis-service-lb.yaml
sleep 5
kubectl create -f frontend.yaml
sleep 5
bash metrics_server.sh
sleep 30
bash ../prometheus/monitoring_up.sh
sleep 5 
kubectl get all -n monitoring
sleep 5
bash ingress.sh
