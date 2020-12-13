# chatter

### Pre-requisites

```
1. Install Terraform 
2. Install Kubectl 
3. Configure aws credentials and provide with correct access policies
4. Install helm
5. Install network utility tools 
6. Install vi or nano, if any edits are required
```


### Bring up eks on aws
```
$ git clone git@github.com:dburugupalli/chatter.git
$ cd chatter
$ cd infrastructure/aws-eks
$ terraform init
$ terraform plan
$ terraform apply # when provided prompt click on yes
```

### Configure kubectl 

```
$  aws eks --region $(terraform output region) update-kubeconfig --name $(terraform output cluster_name)
```

### Bring up the application
```
$ cd infrastructure/kubernetes 
# will bring-up MERN stack application on kubernetes, metrics server and application monitoring 
# using prometheus
$ bash deploy.sh
```

### Bring up NGINX Ingress Controller for production grade kubernetes
```
$ cd infrastructure/kubernetes
# Install all-in-One load Balancer, Cache, API Gateway, and WAF for Kubernetes Requirements and application metrics
$ bash ingress.sh
# to view all the resources ingress-nginx 
$ kubectl get svc -n ingress-nginx
# this will contain the application endpoint to access the chatter application. 
# Happy tweeting.
```
