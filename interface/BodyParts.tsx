
export interface BodyParts {
    name: string;
    bodyType: "UpperBody" | "LowerBody";
    image: string; // Added image property
  }
  
  export const bodyPartsData: BodyParts[] = [
    { name: "Head", bodyType: "UpperBody", image: "https://via.placeholder.com/40" },
    { name: "Chest", bodyType: "UpperBody", image: "https://via.placeholder.com/40" },
    { name: "Left Shoulder", bodyType: "UpperBody", image: "https://via.placeholder.com/40" },
    { name: "Right Shoulder", bodyType: "UpperBody", image: "https://via.placeholder.com/40" },
    { name: "Left Arm", bodyType: "UpperBody", image: "https://via.placeholder.com/40" },
    { name: "Right Arm", bodyType: "UpperBody", image: "https://via.placeholder.com/40" },
    { name: "Abdomen", bodyType: "UpperBody", image: "https://via.placeholder.com/40" },
    { name: "Pelvis", bodyType: "LowerBody", image: "https://via.placeholder.com/40" },
    { name: "Gluteus", bodyType: "LowerBody", image: "https://via.placeholder.com/40" },
    { name: "Left Upper Leg", bodyType: "LowerBody", image: "https://via.placeholder.com/40" },
    { name: "Right Upper Leg", bodyType: "LowerBody", image: "https://via.placeholder.com/40" },
    { name: "Left Lower Leg", bodyType: "LowerBody", image: "https://via.placeholder.com/40" },
    { name: "Right Lower Leg", bodyType: "LowerBody", image: "https://via.placeholder.com/40" },
    { name: "Left Foot", bodyType: "LowerBody", image: "https://via.placeholder.com/40" },
    { name: "Right Foot", bodyType: "LowerBody", image: "https://via.placeholder.com/40" },
    { name: "Upper Back", bodyType: "UpperBody", image: "https://via.placeholder.com/40" },
    { name: "Lower Back", bodyType: "LowerBody", image: "https://via.placeholder.com/40" },
  ];