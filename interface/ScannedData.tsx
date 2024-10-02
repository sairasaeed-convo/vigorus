export interface ScannedData {
  id: number,
  imageByteArray: string;
  bodyPartName: string;
  bodyPartType: string;
  risk: string;
}

export const LOCAL_DB = [
  {
    imageByteArray: "https://imgur.com/P0IJ1mD.png",
    bodyPartName: "Head",
    bodyPartType: "Upper Body",
    risk: "Medium",
  },
  {
    imageByteArray: "https://imgur.com/P0IJ1mD.png",
    bodyPartName: "Chest",
    bodyPartType: "Upper Body",
    risk: "Normal",
  },
  {
    imageByteArray: "https://imgur.com/P0IJ1mD.png",
    bodyPartName: "Left Hand",
    bodyPartType: "Lower Body",
    risk: "High",
  },
];
