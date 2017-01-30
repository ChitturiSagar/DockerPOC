# create a file named Dockerfile
FROM node:argon
RUN mkdir /app
WORKDIR /app
COPY . /app
EXPOSE 3000
RUN ls -al
CMD ["npm", "start"]