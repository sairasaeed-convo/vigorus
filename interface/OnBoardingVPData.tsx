export interface OnboardingViewPagerModalProps {
    visible: boolean;
    onClose: () => void;
    data: { title: string; image: any }[];  // Accepts an array of title and image objects
  }

  export const OnCameraBoardingData = [
    {
      title: "Hold your phone perpendicular to the mole",
      image: require("@/assets/images/react-logo.png"),
    },
    {
      title: "Have only skin be visible in the square view",
      image: require("@/assets/images/react-logo.png"),
    },
    {
      title: "Focus the camera clearly on the mole",
      image: require("@/assets/images/react-logo.png"),
    },
  ];

  export const OnGalleryCropBoardingData = [
    {
      title: "Crop the image until there is only one lesion",
      image: require("@/assets/images/react-logo.png"),
    },
    {
      title: "Have only skin be visible in the square view",
      image: require("@/assets/images/react-logo.png"),
    },
  ];