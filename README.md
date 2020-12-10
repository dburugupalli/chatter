# chatter

How to use Helm Chart </br>
Check all the values in the Helm chart are correct  - **helm lint ./twitterhelmchart** </br>
Dry Run (Check everything is running well without deploying actual services) -  **helm install --dry-run --debug ./twitterhelmchart --generate-name** </br>
Run the Helm chart - **helm install example ./twitterhelmchart/ --set service.type=NodePort** 
