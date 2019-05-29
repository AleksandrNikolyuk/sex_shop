module.exports = {
  db: {
    uri: 'mongodb://localhost:27017/sexshop',
    connect: {
      config: {
        autoIndex: false,
      },
      useNewUrlParser: true,
    },
  },
};
