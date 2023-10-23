FROM mcr.microsoft.com/devcontainers/go:1-1.21-bullseye

ENV GO111MODULE=on
ENV CGO_ENABLED=1

RUN apt-get update && apt-get install -y wget gcc g++ make
RUN wget https://github.com/edenhill/librdkafka/archive/v2.0.2.tar.gz && tar xvzf v2.0.2.tar.gz
RUN cd librdkafka-2.0.2/ && ./configure && make && make install && ldconfig