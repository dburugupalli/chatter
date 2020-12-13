kubectl create ns ingress-nginx
sleep 10
# make sure your system is configured with helm 
# this will help to install the helm charts on k8s cluster
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install ingress-controller ingress-nginx/ingress-nginx --namespace ingress-nginx
sleep 10
kubectl get svc --namespace ingress-nginx
sleep 10 
kubectl create -f ingress-controller-conf.yaml