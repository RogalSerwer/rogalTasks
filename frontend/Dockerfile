FROM node:22
WORKDIR /tasksFrontend
COPY package*.json ./
RUN npm ci
CMD ["npm", "run", "dev", "--", "--host", "--port", "3000"]