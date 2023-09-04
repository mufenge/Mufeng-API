FROM maven:3.5-jdk-8-alpine as builder

WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN mvn package -DskipTests

CMD ["java","-jar","/app/target/mufengapi-1.2.jar","-Xms=256m","-Xmx=800m"]