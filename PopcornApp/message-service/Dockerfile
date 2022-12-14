FROM openjdk:11-jre-slim
WORKDIR usr/src
ADD ./target/message-service-0.0.1-SNAPSHOT.jar /usr/src/message-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","message-service-0.0.1-SNAPSHOT.jar"]