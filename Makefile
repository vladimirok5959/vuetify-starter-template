VERSION="1.0.0"
DOCKER_USER := vladimirok5959
DOCKER_IMG_NAME := vuetify-starter-template

.PHONY: default build

default: build

build:
	yarn build

docker-build: build
	@-docker rmi ${DOCKER_IMG_NAME}:latest
	docker build -t ${DOCKER_IMG_NAME}:latest ./

docker-export:
	@-rm ./build/${DOCKER_IMG_NAME}.tar
	docker save ${DOCKER_IMG_NAME}:latest > ./build/${DOCKER_IMG_NAME}.tar

docker-import:
	@-docker rmi ${DOCKER_IMG_NAME}:latest
	docker load < ./build/${DOCKER_IMG_NAME}.tar

docker-push: docker-build
	docker tag ${DOCKER_IMG_NAME}:latest ${DOCKER_USER}/${DOCKER_IMG_NAME}:${VERSION}
	docker tag ${DOCKER_IMG_NAME}:latest ${DOCKER_USER}/${DOCKER_IMG_NAME}:latest
	docker login
	docker push ${DOCKER_USER}/${DOCKER_IMG_NAME}:${VERSION}
	docker push ${DOCKER_USER}/${DOCKER_IMG_NAME}:latest
	docker rmi ${DOCKER_USER}/${DOCKER_IMG_NAME}:${VERSION}
	docker rmi ${DOCKER_USER}/${DOCKER_IMG_NAME}:latest

docker-test:
	docker run --rm \
		-p 3000:80 --name ${DOCKER_IMG_NAME}-test -it ${DOCKER_IMG_NAME}:latest
