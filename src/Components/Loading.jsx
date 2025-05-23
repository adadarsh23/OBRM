import React from 'react';
// import { useLottie } from 'lottie-react';
import Lottie from 'lottie-react';
import AnimationData from "../assets/Animation - 1745487800730.json";

export default function Loading() {
  // const options = {
  //   animationData: AnimationData,
  //   loop: true,
  //   autoplay: true,
  // };

  // const { View } = useLottie(options);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Lottie animationData={AnimationData} loop autoplay />;
      <p className=" text-lg text-gray-600">Please Enter the valid Details</p>
    </div>
  );
}