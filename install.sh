#!/bin/bash
echo "This is an installation script for Rogal Tasks web application, that sets up the whole environment around the application."
echo "Note that this script is only compatible with Debian 13"

echo "Installing Docker"

# Docker installation script taken directly from the docker docs
sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/debian
Suites: $(. /etc/os-release && echo "$VERSION_CODENAME")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "Setting up the environment"

mkdir -p "$HOME/.config/rogaltasks/main"
chmod 700 "$HOME/.config/rogaltasks/main"
read -p "Enter database user name (leave blank for default - rogal) " db_user
read -p "Enter database name (leave blank for default - tasks) " database
pass=""
while [[ -z $pass ]]; do
    read -sp "Enter database password (it cannot be empty)" pass
    echo ""
done
read -p "Enter set up backend url (leave blank for default - http://127.0.0.1:5000/) " url
read -p "Enter frontend port (leave blank for default - 3000) " frontendPort
backendPort=""
if [[ -z $url ]]; then
    backendPort=5000
    url="http://127.0.0.1:5000/"
else
    read -p "Enter backend port (leave blank for default - 5000) " backendPort
    backendPort="${backendPort:-5000}"
fi
frontendPort="${frontendPort:-3000}"
db_user="${db_user:-rogal}"
database="${database:-tasks}"

echo "Saving environment data"

cat <<EOM >"$HOME/.config/rogaltasks/main/.env"
DB_USER=$db_user
PASSWORD=$pass
DATABASE=$database
BACKEND_URL=$url
BACKEND_PORT=$backendPort
FRONTEND_PORT=$frontendPort
EOM
