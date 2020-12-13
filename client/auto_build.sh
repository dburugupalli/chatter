### redeploy the frontend, which dynamic eld dns server 
### execute this when env variables are changing
npm install
npm run build
rm -rf node_modules
docker build -t devopschatter/twitter-client:latest .
docker push devopschatter/twitter-client:latest
