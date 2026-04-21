import type { FlowerContainerProps } from "../FlowerContainer";

export const menuFlowerContainerProps: FlowerContainerProps[] = [
  {
    className: "flower-container-5",
    imageClassName: "flower-5",
    imageSrc: "/images/galleries/flower-2.png",
    id: "1",
    initial: {
      scale: 0.65,
      opacity: 0
    },
    animate: {
      scale: 1,
      opacity: 1,
    },
    exit: {
      scale: 0.65,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  },
  {
    className: "flower-container-6",
    imageClassName: "flower-6",
    imageSrc: "/images/galleries/flower-3.png",
    id: "2",
    initial: {
      scale: 0.65,
      opacity: 0
    },
    animate: {
      scale: 1,
      opacity: 1,
    },
    exit: {
      scale: 0.5,
      opacity: 0,
      transition: {
        duration: 0.25,
        delay: 0.1,
        ease: "easeInOut"
      }
    },
    transition: {
      duration: 0.7,
      delay: 0.15,
      ease: "easeOut"
    }
  },
  {
    className: "flower-container-7",
    imageClassName: "flower-7",
    imageSrc: "/images/galleries/flower-2.png",
    id: "3",
    initial: {
      scale: 0.65,
      opacity: 0
    },
    animate: {
      scale: 1,
      opacity: 1,
    },
    exit: {
      scale: 0.65,
      opacity: 0,
      transition: {
        duration: 0.3,
        delay: 0.2,
        ease: "easeInOut"
      }
    },
    transition: {
      duration: 0.55,
      delay: 0.25,
      ease: "easeOut"
    }
  }
];
