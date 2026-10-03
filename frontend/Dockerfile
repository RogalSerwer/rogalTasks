FROM node:22
WORKDIR /tasksFrontend
COPY package*.json ./
RUN npm install
CMD ["npm", "run", "dev", "--", "--host", "--port", "3000"]