FROM node:22
WORKDIR /tasksFrontend
COPY package.json .
RUN npm cache clean --force && npm install --legacy-peer-deps --no-audit --no-fund
CMD ["npm", "run", "dev", "--", "--host", "--port", "3000"]