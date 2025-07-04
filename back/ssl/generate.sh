#!/bin/bash

BIN_DIR="$HOME/.local/bin"
mkdir -p "$BIN_DIR"

if ! command -v mkcert &> /dev/null; then
    curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
    
    chmod +x mkcert-v*-linux-amd64
    mv mkcert-v*-linux-amd64 "$BIN_DIR/mkcert"
else
    echo "mkcert is already installed"
fi

export PATH="$BIN_DIR:$PATH"

mkcert -install
mkcert -cert-file cert.pem -key-file key.pem localhost
