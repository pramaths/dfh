import React from "react";
import { TextRevealCard, TextRevealCardTitle, TextRevealCardDescription, MemoizedStars } from "../../components/ui/text-card";
import { Button } from "../../components/ui/button"; // Adjust the import path accordingly
import { useRouter } from "next/navigation";

const careerOptions = [
  {
    text: "Personality & Skills Quiz",
    revealText: "Discover your strengths and match them with your ideal career.",
    id: "quiz",
    route: "/growth",
  },
  {
    text: "LinkedIn Profile",
    revealText: "Unlock opportunities based on your professional network.",
    id: "linkedin",
    route: "/linkedIn",
  },
  {
    text: "Resume Insights",
    revealText: "Gain insights tailored to your experience for a personalized career journey.",
    id: "resume",
    route: "/resume",
  },
];
const buttonGradientStyle = {
    background: 'linear-gradient(45deg, #007BFF, #8811AA)', // Example gradient
    color: '#FFF', // Adjust text color as needed
    padding:"1rem"
  };

function CareerOptions() {
  const router = useRouter();

  const navigate = (route) => {
    router.push(route);
  };

  return (
    <div className="flex flex-row w-full justify-center items-center gap-6">
      {careerOptions.map(({ text, revealText, id, route }) => (
        <TextRevealCard key={id} text={text} revealText={revealText} className="m-4">
          <TextRevealCardTitle>{text}</TextRevealCardTitle>
          <TextRevealCardDescription>
            Explore your potential with our {text}.
          </TextRevealCardDescription>
          <Button
            variant="secondary" // Choose the variant based on your design system
            size='large'// Adjust size as needed
            onClick={() => navigate(route)}
            className="mt-4" // Add margin top or adjust as needed for spacing
            style={buttonGradientStyle}
          >
            Learn More
          </Button>
        </TextRevealCard>
      ))}
    </div>
  );
}

export default CareerOptions;
