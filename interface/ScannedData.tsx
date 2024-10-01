interface ScannedData {
    id: string;
    imageByteArray: string;
    bodyParName: string;
    bodyPartType: string;
    risk: string;
  }


const LOCAL_DB = [
    {
      id: "1",
      imageByteArray: "https://imgur.com/P0IJ1mD.png",
      bodyParName: "Head",
      bodyPartType: "Upper Body",
      risk: "Medium",
    },
    {
      id: "2",
      imageByteArray: "https://imgur.com/P0IJ1mD.png",
      bodyParName: "Chest",
      bodyPartType: "Upper Body ",
      risk: "Normal",
    },
    {
      id: "3",
      imageByteArray: "https://imgur.com/P0IJ1mD.png",
      bodyParName: "Left Hand",
      bodyPartType: "Lower Body ",
      risk: "High",
    },
  ];