FROM mysql:5.7.15


ENV MYSQL_DATABASE=<syllabot> \
    MYSQL_ROOT_PASSWORD=<>

ADD syllabot_dump.sql /docker-entrypoint-initdb.d

EXPOSE 3306