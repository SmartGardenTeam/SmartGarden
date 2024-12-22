FROM openjdk:17-oracle
COPY target/*.jar server.jar
EXPOSE 8282
ENTRYPOINT ["java","-jar","server.jar"]
