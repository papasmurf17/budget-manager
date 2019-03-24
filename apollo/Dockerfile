FROM node:11.10.1-alpine

# Create app directory
WORKDIR /usr/bm

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json yarn.lock ./

RUN yarn install

COPY src ./src

EXPOSE 4000
CMD [ "yarn", "start" ]
