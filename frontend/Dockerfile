FROM nginx:alpine

# Copy React build files from dist folder to Nginx HTML directory
COPY dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
