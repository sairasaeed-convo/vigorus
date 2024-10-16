export interface ScannedData {
  id: number,
  imageByteArray: string;
  bodyPartName: string;
  bodyPartType: string;
  risk: string;
}

export const LOCAL_DB = [
  {
    id: 1,
    imageByteArray: "https://imgur.com/P0IJ1mD.png",
    bodyPartName: "Head",
    bodyPartType: "Upper Body",
    risk: "Medium",
  },
  {
    id: 2,
    imageByteArray: "https://imgur.com/P0IJ1mD.png",
    bodyPartName: "Chest",
    bodyPartType: "Upper Body",
    risk: "Normal",
  },
  {
    id: 3,
    imageByteArray: "https://imgur.com/P0IJ1mD.png",
    bodyPartName: "Right Hand",
    bodyPartType: "Lower Body",
    risk: "High",
  },

  {
    id: 4,
    imageByteArray: "https://imgur.com/P0IJ1mD.png",
    bodyPartName: "Left Hand",
    bodyPartType: "Lower Body",
    risk: "High",
  },
];
