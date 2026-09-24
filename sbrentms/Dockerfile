FROM amazoncorretto:17
WORKDIR /opt/app
EXPOSE 8080
COPY target/sbrentms-0.1.0-SNAPSHOT.jar /opt/app/sbrentms.jar
ENTRYPOINT ["java", "-jar", "sbrentms.jar"]
