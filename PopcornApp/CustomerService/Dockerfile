FROM openjdk:11-jre-slim

WORKDIR usr/src/myapp

ENV MONGO_DATABASE=movieapp
ENV MONGO_URL=mongodb://localhost:27017/movieapp

ADD ./target/CustomerService-0.0.1-SNAPSHOT.jar usr/src/myapp/CustomerService-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java","-jar","usr/src/myapp/CustomerService-0.0.1-SNAPSHOT.jar"]