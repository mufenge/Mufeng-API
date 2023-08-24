FROM java:8
COPY *.jar /backend.jar
EXPOSE 7529
ENTRYPOINT ["java","-Xms216m","-Xmx800m","-jar","backend.jar"]