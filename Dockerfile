# FROM https://medium.com/@cezary.zelisko/how-to-prepare-a-flutter-workspace-in-a-docker-container-e56e0c7c7dcd
FROM ubuntu:18.04

# Prerequisites
RUN apt update && apt update && apt install -y curl git unzip xz-utils zip libglu1-mesa openjdk-8-jdk wget
RUN && apt add --no-cache \
    ca-certificates \
    && update-ca-certificates 2>/dev/null || true

# Setup new user
RUN useradd -ms /bin/bash developer
USER developer
WORKDIR /home/developer

# Prepare Android directories and system variables
RUN mkdir -p Android/Sdk
ENV ANDROID_SDK_ROOT /home/developer/Android/Sdk
RUN mkdir -p .android && touch .android/repositories.cfg

# Setup Android SDK
RUN wget -O sdk-tools.zip https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip
RUN unzip sdk-tools.zip && rm sdk-tools.zip
RUN mv tools Android/Sdk/tools
RUN cd Android/Sdk/tools/bin && yes | ./sdkmanager --licenses
RUN cd Android/Sdk/tools/bin && ./sdkmanager "build-tools;29.0.2" "patcher;v4" "platform-tools" "platforms;android-29" "sources;android-29"

# Download Flutter SDK
RUN git clone https://github.com/flutter/flutter.git
ENV PATH "$PATH:/home/developer/flutter/bin"

WORKDIR /opt/app/da/front

# Run basic check to download Dark SDK
RUN flutter doctor

COPY ./Front .
RUN flutter pub get 
RUN flutter build web

RUN cp -r ./build/web ../back/web/

FROM node:14.15.0
WORKDIR /opt/app/da/back

COPY ./Back .

RUN npm install -g npm 
RUN npm install 
CMD [ "npm", "start" ]

EXPOSE 3000
EXPOSE 3000:3000

EXPOSE 27017
EXPOSE 27017:27017