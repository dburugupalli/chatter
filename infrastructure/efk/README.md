# kubernetes-elk
Example to set up entire ELK (Elastic Search, Logstash and Kibana) stack with kubernetes and AWS Kubernetes Cluster

### Pre-requisite

- Docker

- AWS Kubernetes Cluster

- kubectl

### How to Run

- Execute `elk_up.sh` script from shell

    This will deploy and start following services:
    - Elastic Search 
    - Logstash
    - Kibana

### Test (on AWS Kubernetes cluster)

- Run `kubernetes dashboard` and view logs from all the components

- Run `kubectl get svc kibana`, this will open kibana dashboard in browser
	- Default `username:password = elastic:changeme`

- Logstash is listening for log messages on port 5000 and expecting logs in JSON format

### Cleanup

- Execute `elk_down.sh` script from shell, which will remove all the deployments, services and configMaps

- Run `terraform destroy` to stop kubernetes cluster