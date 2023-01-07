sudo docker build . -f frontend.DOCKERFILE
This will result in the id of an image. With that id, run:
sudo docker run -p 8080:80 <id>
