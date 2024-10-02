import * as SQLite from "expo-sqlite";
import { LOCAL_DB, ScannedData } from "@/interface/ScannedData";


// Database table and attribute name
const dbName = "SkinCheckApp.db";
const TableScannedData = "scanned_data";
 
// Table Creation Queries
const sqlCreateScannedDataTable = `
CREATE TABLE IF NOT EXISTS ${TableScannedData} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  imageByteArray TEXT,
  bodyPartName TEXT,
  bodyPartType TEXT,
  risk TEXT
);
`
// Database queries
const sqlInsertQueryScannedData =
  "INSERT INTO " +
  TableScannedData +
  "(imageByteArray, bodyPartName, bodyPartType, risk) VALUES (?, ?, ?, ?)";
  
  const sqlRetrievalScannedData = "SELECT * FROM " + TableScannedData

// export const db = SQLite.openDatabaseSync(dbName);


// Create database
export const connectToDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    await createTables(db);
    return db;
  } catch (error) {
    console.error("Error connecting to database:", error);
    // Handle the error appropriately (e.g., display an error message)
    return null; // Or throw an error
  }
};

// Tables Creation
export const createTables = async (db: SQLite.SQLiteDatabase) => {
  try {
    await db.execAsync(sqlCreateScannedDataTable);
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

// Insert Scanned data
export const insertScannedData = async (data: ScannedData) => {
  try {

    const db = await connectToDatabase();
    if (db) {
      const insertScannedData = await db.prepareAsync(sqlInsertQueryScannedData);
    const existingData = await getScannedDataFromDataBase();
    const dataExists = existingData.some((item) => item.id === data.id);

      if (!dataExists) {
        let result = await insertScannedData.executeAsync([
          data.imageByteArray,
          data.bodyPartName,
          data.bodyPartType,
          data.risk,
        ]);
        console.log(
          "Data inserted successfully",
          result.lastInsertRowId,
          result.changes
        );
      } else {
        console.log("Data already present");
      }   
     } else {
      console.error("Error: Database connection is null.");
    }

  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
  }
};

// Get Scanned data
export const getScannedDataFromDataBase = async (): Promise<ScannedData[]> => {
  try {
    const db = await connectToDatabase();
    if (db) { 
      const scannedDataFromDatabase = await db.prepareAsync(sqlRetrievalScannedData);
      const result = await scannedDataFromDatabase.executeAsync({});
      const allRows = await result.getAllAsync();
      return Array.isArray(allRows) ? (LOCAL_DB as ScannedData[]) : [];
    } else {
      console.error("Error: Database connection is null.");
      return LOCAL_DB; 
    }
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return LOCAL_DB;
  } finally {  }
};