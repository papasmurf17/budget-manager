FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app/

# see https://github.com/txchen/light-server/issues/45
RUN yarn global add light-server@2.5.1

# Copy app source
COPY docker-entrypoint.sh .
COPY build/ .

RUN chmod +x docker-entrypoint.sh

EXPOSE 7777
CMD [ "/usr/src/app/docker-entrypoint.sh" ]
