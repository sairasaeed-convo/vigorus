import * as SQLite from "expo-sqlite";

const dbName = "SkinCheckApp.db";
const TableScannedData = "scanned_data";

// Create database
const openDatabaseAsync = async () => {
  const db = SQLite.openDatabaseSync(dbName);
  return db;
};

// Insert Scanned data
export const insertDataToDatabase = async (data: ScannedData) => {
  const db = await openDatabaseAsync();

  const insertScannedData = await db.prepareAsync(
    "INSERT INTO saved_data (imageByteArray, bodyParName, bodyPartType, risk) VALUES (?, ?, ?, ?)"
  );

  try {
    let result = await insertScannedData.executeAsync({
      $imageByteArray: data.imageByteArray,
      $bodyParName: "",
      $bodyPartType: "",
      $risk: "",
    });
    console.log(
      "Data inserted successfully ",
      result.lastInsertRowId,
      result.changes
    );
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await insertScannedData.finalizeAsync();
  }
};

// Get Scanned data
export const getScannedDataFromDataBase = async (data: any) => {
  const db = await openDatabaseAsync();

  const scannedDataFromDatabase = await db.prepareAsync(
    "SELECT * FROM scanned_data"
  );

  try {
    const result = await scannedDataFromDatabase.executeAsync<{
      id: string;
      imageByteArray: string;
      bodyParName: string;
      bodyPartType: string;
      risk: string;
    }>({}); // Empty object for parameters, as we're selecting all rows

    const allRows = await result.getAllAsync();
    for (const row of allRows) {
      console.log(
        row.id,
        row.imageByteArray,
        row.bodyParName,
        row.bodyPartType,
        row.risk
      );
    }
  } finally {
    await scannedDataFromDatabase.finalizeAsync();
  }
};
