# Fetching the latest node image on alpine linux
FROM node:20.9.0 AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /react-app/

# Installing dependencies
COPY ./package*.json /react-app/

RUN npm install

# Copying all the files in our project
COPY . .

EXPOSE 3000

# Starting our application
CMD ["npm","start"]


# #Stage 1
# FROM node:20.9.0 as builder
# WORKDIR /app
# COPY package*.json .
# COPY yarn*.lock .
# RUN yarn install
# COPY . .
# RUN yarn build

# #Stage 2
# FROM nginx:1.19.0
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=builder /app/build .
# ENTRYPOINT ["nginx", "-g", "daemon off;"]