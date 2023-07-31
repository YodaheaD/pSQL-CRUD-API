import { Pool } from "pg";
import Logger from "../utils/logger";
import dotenv from "dotenv";
import { pusherServer } from "../lib/pusher";
import NodeCache from "node-cache";
const myCache = new NodeCache();
dotenv.config();
export interface TableLikeProps {}

export class TableLike<TableLikeProps> {
  private Conn?: any;

  constructor(
    public readonly tableName: string,
    public readonly tableColumns?: any,
    public readonly tableData?: any,
    public readonly reponse?: any
  ) {
    // Creating the connection string for Postgres
    this.Conn = new Pool({
      host: String(process.env.PGHOST),
      port: 5432,
      user: "postgres",
      password: "Tiger1153$$Damian",
      database: "postgres",
      /** host: "localhost",
      port: 5432,
      user: "postgres",
      password: "postgres",
      database: "pg-promise-demo",
       user: (process.env.PGHOST),
      host: (process.env.PGUSER),
      database: (process.env.PGDATABASE),
      password: process.env.PGPASSWORD ,
      port: 5432,*/
    });
    this.tableColumns = this.getColumnNames();
    this.tableData = this.getAllData();
    this.EstablishPusherConnection();
  }

  /**
   * Functions List
   * ______________________
   *  -> 'catcher()'
   * Error catcher function.
   *
   *  -> 'createTable()'
   * Function to create a table.
   *
   *  -> 'addToDb()'
   * Function to add entity to table.
   *
   *  -> 'deleteFromDb()'
   * Function to delete item from DB using product's id.
   *
   * -> 'getAllData()'
   * Function for getting all the data entries from table.
   *
   * -> 'getDataWId()'
   * Function for getting a data entry using product's id.
   *
   */
  private async EstablishPusherConnection() {
    let list = await this.tableColumns;
    Logger.info(` -> Data from table: ${this.tableColumns.data} `);
    pusherServer.trigger("my_channel", "my_event", {
      data: { list },
    });
  }
  // -> Error catcher function
  private catcher(err: any) {
    if (err.statusCode !== 409) {
      throw err;
    }
  }
  async createTable() {
    try {
      const data = await this.Conn?.query(
        "CREATE TABLE itemtable(id INT GENERATED ALWAYS AS IDENTITY,title VARCHAR(50));"
      );

      return data;
    } catch (err) {
      Logger.error(err);
    }
  }

  // 'getAllData()' function - Gathers all data and stores in cache before returning
  async getAllData() {
    const value: any = myCache.get("myKey");
    Logger.info(
      `-> Cached data from table: ${this.tableName} is ${JSON.stringify(
        value
      )} rows`
    ); // const res = await this.Conn.query('SELECT * FROM items')
    if (value == undefined) {
      try {
        Logger.info(`-> Getting all data from table: ${this.tableName} `); // const res = await this.Conn.query('SELECT * FROM items')
        const { rows } = await this.Conn?.query(
          `SELECT * FROM  ${this.tableName}`
        );
        myCache.set("myKey", rows, 10000);
        return rows;
      } catch (err) {
        Logger.error(err);
      }
    }
    return value;
  }
  ////
  async insertData(data: any) {
    const { id, title } = data;

    Logger.info(
      `-> Inserting ${id}+${title} to table: ${this.tableName} `

      // `-> Inserting ${JSON.stringify(id,data)} to table: ${this.tableName} `
    );

    const { rows } = await this.Conn?.query(
      `INSERT INTO ${this.tableName}(id, title) VALUES ($1, $2) RETURNING *`,
      [id, title]
    );
    return rows;
  }

  /// More Function Section
  // Quick functions used in larger

  // Function to add column to Postgres table
  async addColumn(data: any) {
    const { columnName, columnType } = data;

    // Veryfing column name is not already in table
    const doesInclude = await this.CheckColumnNameExists(columnName);
    if (doesInclude) {
      Logger.warn("Column already exists");
      return "Column already exists";
    } else {
      try {
        const data = await this.Conn?.query(
          `ALTER TABLE ${this.tableName} ADD COLUMN ${columnName} ${columnType};`
        );

        return this.tableColumns;
      } catch (err) {
        Logger.error(err);
      }
    }
  }

  // Function to deleter column from Postgres table
  async deleteColumn(data: any) {
    const { columnDetails } = data;
    Logger.warn(
      `-> Deleting column ${columnDetails} from table: ${this.tableName} `
    );
    // Veryfing column name is not already in table
    //   const doesInclude= await this.CheckColumnNameExists(columnDetails);

    try {
      const data = await this.Conn?.query(
        `ALTER TABLE ${this.tableName} DROP COLUMN ${columnDetails};`
      );
    } catch (err) {
      Logger.error(err);
    }
    const listColumns = await this.tableColumns;

    return listColumns;
  }

  async getColumnNames() {
    let dataArr = ["o"];
    dataArr.pop();
    if (this.tableColumns) {
      let columnames = await this.tableColumns;
      pusherServer.trigger("my_channel", "my_event", {
        data: { columnames },
      });
      return this.tableColumns;
    } else {
      try {
        const { rows } = await this.Conn?.query(
          `SELECT column_name FROM information_schema.columns WHERE table_name = '${this.tableName}';`
        );
        rows.forEach((element: any) => {
          Logger.info(`-> Column name: ${element.column_name} `);
          dataArr.push(element.column_name);
        });
        let columnames = dataArr;
        pusherServer.trigger("my_channel", "my_event", {
          data: { columnames },
        });
        return dataArr;
      } catch (err) {
        Logger.error(err);
      }
    }
  }

  async CheckColumnNameExists(columnName: any) {
    const listColumns = await this.tableColumns;
    const doesInclude = listColumns.includes(columnName.toLowerCase());

    return doesInclude;
  }
}
