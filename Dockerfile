# Use the base image with Node.js
FROM node:16 as build

# Set working directory for future use
WORKDIR /app
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

# Install the dependencies from package.json
RUN yarn install

# Copy the current directory into the Docker image
COPY . .

RUN yarn build

# CMD npm serve

FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80