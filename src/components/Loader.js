import React from 'react';

const mainClassName = `
  relative top-0 right-0
  h-screen
  flex flex-col justify-center
  bg-tan
  border-double border-black border-10
  font-metal text-center
  z-100
  animation-shake
`;

const Loader = () => {
  return (
    <main className={mainClassName}>
      <h1 className="text-6xl leading-none text-shadow-white-red animation-rushShake">
        Barnyard Sharks
      </h1>
      <p className="mt-0 animation-fadeIn animation-delay-md text-3xl">
        Are Coming For You<span className="animation-blink">...</span>
      </p>
    </main>
  )
}

export default Loader;
