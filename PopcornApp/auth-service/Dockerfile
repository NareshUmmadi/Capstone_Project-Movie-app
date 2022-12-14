FROM openjdk:11-jre-slim
WORKDIR usr/src
#EXPOSE 8085
ADD ./target/auth-service-0.0.1-SNAPSHOT.jar /usr/src/auth-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","auth-service-0.0.1-SNAPSHOT.jar"]