FROM node:13 as nest-built
WORKDIR /var/www/sphere-api
COPY package.json package.json
RUN npm install --silent
COPY . .
RUN npm run prebuild
RUN npm run build

FROM node:13
ENV PORT 3000
WORKDIR /var/www/sphere-api
LABEL author="Matthieu Walterspieler (for Blacksmith)"

#Pre-requisite on the server
RUN apt-get update

# Bundle app source
COPY package.json package-lock.json ./
RUN npm install --silent
COPY --from=nest-built /var/www/sphere-api/.env ./
COPY --from=nest-built /var/www/sphere-api/dist ./
ENV NODE_ENV production

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
