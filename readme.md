## Remote Import

### Setup

- Install the latest Node.js and NPM.
- Run `npm i` in projects root directory
- Define CSV URL and MongoDB settings in `src/config/index.js`

### Built with

- [NodeJS 9.2.0](https://nodejs.org/en/)
- [Mongoose](http://mongoosejs.com/)
- [Valid Url](https://github.com/ogt/valid-url)
- [CSV Parser](http://csv.adaltas.com/parse/)

### Commands

- `npm run start`
- `npm run test`

### Structure

The application is structured into the following:

- `src/config` The config allows the developer a central place where they can set an array of CSV files to process and to configure the connection to the db.
- `src/db` Mongo Schemas and connection management.
- `src/retrieve-file` Connect to the remote data source over HTTP or HTTPS and returns the raw data a chucks
- `src/process-file` Process file uses CSV Parser to format the raw data from `retrieve-file` into an object. Further data massaging is designed to be done here.
- `src/store-data` Stores massaged data into the database
