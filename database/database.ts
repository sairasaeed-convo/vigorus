import * as SQLite from "expo-sqlite";
import { LOCAL_DB, ScannedData } from "@/interface/ScannedData";


// Database table and attribute name
const dbName = "SkinCheckApp.db";
const TableScannedData = "scanned_data";
 
// Table Creation Queries
const sqlCreateScannedDataTable = `
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS ${TableScannedData} (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        imageByteArray TEXT, 
        bodyPartName TEXT, 
        bodyPartType TEXT, 
        risk TEXT
    );
`;

// Database queries
const sqlInsertQueryScannedData = "INSERT INTO " + TableScannedData + " (id, imageByteArray, bodyPartName, bodyPartType, risk) VALUES (?, ?, ?, ?, ?)";
const sqlRetrievalScannedData = "SELECT * FROM " + TableScannedData


// Create database
const connectToDatabase = async () => {
  const db = await SQLite.openDatabaseAsync(dbName);
  await createTables(db)
  return db;
};

// Tables Creation
export const createTables = async (db: SQLite.SQLiteDatabase) => {
  await db.execAsync(sqlCreateScannedDataTable);
}


// Insert Scanned data
export const insertScannedData = async (data: ScannedData) => {
  
  const db = await connectToDatabase();

  const insertScannedData = await db.prepareAsync(sqlInsertQueryScannedData);

  try {
  // const existingData = await getScannedDataFromDataBase();
  // const dataExists = existingData.some((item) => item.id === data.id);

  // if (!dataExists) {

    let result = await insertScannedData.executeAsync({
      $imageByteArray: data.imageByteArray,
      $bodyPartName: data.bodyPartName,
      $bodyPartType: data.bodyPartType,
      $risk: data.risk,
    });
    console.log(
      "Data inserted successfully ",
      result.lastInsertRowId,
      result.changes
    );
  // }else{
  //   console.log(
  //     "Data already present"
  //   );
  // }
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await insertScannedData.finalizeAsync();
  }
};

// Get Scanned data
export const getScannedDataFromDataBase = async (): Promise<ScannedData[]> => {
  const db = await connectToDatabase();

  const scannedDataFromDatabase = await db.prepareAsync(sqlRetrievalScannedData);

  try {
    const result = await scannedDataFromDatabase.executeAsync<{
      id: string;
      imageByteArray: string;
      bodyPartName: string;
      bodyPartType: string;
      risk: string;
    }>({});

    const allRows = await result.getAllAsync();

    // Ensure allRows is always an array, returning [] if null or undefined
    return Array.isArray(allRows) ? allRows as ScannedData[] : [];
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return [];
  } finally {
    await scannedDataFromDatabase.finalizeAsync();
  }
};

