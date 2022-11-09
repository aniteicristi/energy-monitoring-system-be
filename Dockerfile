FROM node:14 as dev


WORKDIR /app/project
COPY package.json .

RUN npm install

COPY . .
CMD npm start
# RUN npm run build

# FROM node:fermium-alpine as prod

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install --production

# COPY . .

# COPY --from=dev /usr/src/app/dist ./dist

# CMD ["node", "dist/main"]