const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '../../.env'),
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
    jwtMailerSecret: process.env.JWT_MAILER_SECRET,
    jwtMailerExpiration: process.env.JWT_MAILER_EXP,
    jwtQrSecret: process.env.JWT_QR_SECRET,
    jwtQrExpiration: process.env.JWT_QR_EXP,
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
    emailConfig: {
      email: process.env.NODEMAILER_EMAIL,
      password: process.env.NODEMAILER_PASSWORD,
      confirmationURL: process.env.NODEMAILER_URL_CONFIRMATION
    },
    redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_URL,
      expire: process.env.REDIS_SESSION_EXPIRE
    },
    rataDb:{
      host:process.env.RATA_HOST,
      username:process.env.RATA_USER,
      password:process.env.RATA_PASSWORD,
      database:process.env.RATA_DB,
      dialect:'mysql',
      logging: process.env.NODE_ENV !== 'production' ? true : false,
      pool:{
        max: 10,
        min: 1,
        idle: 2000000,
        acquire: 2000000
      },
        dialectOptions: {
        //useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
      },
      timezone: '+08:00' /**for writing to database**/
    },
    helios_customer_db:{
      host:process.env.HOST,
      username:process.env.USER,
      password:process.env.PASSWORD,
      database:process.env.DB,
      dialect:'mysql',
      logging: process.env.NODE_ENV !== 'production' ? true : false,
      pool:{
        max: 10,
        min: 1,
        idle: 2000000,
        acquire: 2000000
      },
        dialectOptions: {
        //useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
      },
      timezone: '+08:00' /**for writing to database**/
    },
    helios_db:{
      host:process.env.HELIOS_HOST,
      username:process.env.HELIOS_USER,
      password:process.env.HELIOS_PASSWORD,
      database:'heliosDB',
      //process.env.HELIOS_DB,
      dialect:'mssql',
      logging: process.env.NODE_ENV !== 'production' ? true : false,
      dialectOptions:{
        option:{
          pool:{
            max: 10,
            min: 1,
            idle: 2000000,
            acquire: 2000000
          }
        }
      }
    },
    kronos_db:{
      host:process.env.KRONOS_HOST,
      username:process.env.KRONOS_USER,
      password:process.env.KRONOS_PASSWORD,
      database:process.env.KRONOS_DB,
      dialect:'mysql',
      logging: process.env.NODE_ENV !== 'production' ? true : false,
      pool:{
        max: 10,
        min: 1,
        idle: 2000000,
        acquire: 2000000
      },
      dialectOptions: {
        //useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
      },
      timezone: '+08:00' /**for writing to database**/
    },
    tms_db: {
      host:process.env.TMS_HOST,
      username:process.env.TMS_USER,
      password:process.env.TMS_PASSWORD,
      database:process.env.TMS_DB,
      dialect:'mssql',
      logging: process.env.NODE_ENV !== 'production' ? true : false,
      dialectOptions:{
        option:{
          pool:{
            max: 10,
            min: 1,
            idle: 2000000,
            acquire: 2000000
          }
        }
      }
      // pool:{
      //   max: 10,
      //   min: 1,
      //   idle: 2000000,
      //   acquire: 2000000
      // },
    }
};