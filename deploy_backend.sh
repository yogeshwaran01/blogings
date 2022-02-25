echo "Deploying Backend ..."

git subtree push --prefix backend/functions heroku master
