FROM openjdk:8
COPY *.jar /gateway.jar
ENTRYPOINT ["java","-Xms216m","-Xmx500m","-jar","gateway.jar"]