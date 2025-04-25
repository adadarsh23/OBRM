import React from 'react';
import { useLottie } from 'lottie-react';
import AnimationData from "../assets/Animation - 1745487800730.json";

export default function Loading() {
  const options = {
    animationData: AnimationData,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {View}
      <p className=" text-lg text-gray-600">Please Wait find the Details</p>
    </div>
  );
}