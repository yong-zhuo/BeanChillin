
import { Check, UserRound, ListPlus, Bean } from "lucide-react";


const Stepper = (props: { step: number }) => {
  const index = props.step;
  
  const steps =  [
    {label:"Customise your profile", icon: <UserRound height={24}/>},
    {label:"Tell us about yourself", icon: <ListPlus height={24}/>},
    {label:"Welcome to BeanChillin", icon: <Bean height={24}/>},
  ];
  
  return (
    <div className="flex justify-between">
      {steps?.map((step, i) => (
        <div
          key={i}
          className={`step-item ${index === i + 1 && "active"} ${
            (i + 1 < index ) && "complete"
          } `}
        >
          <div className="step">
            {(i + 1 < index ) ? <Check height={24} /> : step.icon }
          </div>
          <p className="font-bold text-gray-500">{step.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
