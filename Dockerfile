FROM node:11.10-alpine

ENV APP_DIR=/app
RUN mkdir APP_DIR
RUN cp -R . $APP_DIR
RUN cd $APP_DIR
RUN npm install

CMD echo "I'm done"
