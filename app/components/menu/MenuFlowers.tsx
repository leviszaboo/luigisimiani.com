import { menuFlowerContainerProps } from "./props";
import FlowerContainer from "../FlowerContainer";

export default function MenuFlowers() {
  return (
    <>
      {menuFlowerContainerProps.map((props, index) => (
        <FlowerContainer key={index} {...props} />
      ))}
    </>
  );
}
