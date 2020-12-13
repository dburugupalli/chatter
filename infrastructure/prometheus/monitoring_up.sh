helm repo add stable https://charts.helm.sh/stable
kubectl create ns monitoring
helm install prometheus stable/prometheus-operator --namespace monitoring
kubectl --namespace monitoring get pods -l "release=prometheus"
kubectl get pod -n monitoring|grep grafana
echo "Grafana password is extracted using following command"
kubectl get secret -n monitoring prometheus-grafana -o yaml
sleep 1 
kubectl create -f service-monitor.yaml
