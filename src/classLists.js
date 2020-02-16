export const main = {
  outer: 'h-mainWrapper flex bg-tan shadow-inset',
  inner: 'relative w-full md:w-1/2',
}
export const mainList = {
  btn: `
    w-full mb-1 p-1
    bg-offwhite shadow-spread
    border border-gray border-b-3
    leading-tight text-left text-xl
    hover:bg-deeppink hover:text-white hover:border-transparent
  `,
  wrapper: 'p-3 overflow-y-scroll h-full lastItem-mb'
}
export const floatingBtn = {
  topSmall: `
    absolute top-0 right-0 mt-2 mr-2
    h-12 w-12 p-1
    text-sm leading-none
    bg-tan shadow-slategray
    border border-black rounded-full
  `,
  topLarge: `
    absolute top-0 right-0 mt-2 mr-2
    h-16 w-16 p-1
    leading-none
    bg-tan shadow-slategray
    border border-black rounded-full
  `,
}
export const modalInner = `
  h-10/12 w-10/12
  bg-white shadow-inset
  p-4 text-lg
  flex flex-col
`;

export const toggleBtn = {
  inactive: `
    relative p-3
    border border-black rounded-10
    btn-toggle
  `,
  active: ' shadow-sm bg-deeppink text-white'
}

export const heading = {
  futura: `
    font-futura text-center text-2xl underline font-bold
  `
}

export const futuraHeading = 'font-futura text-center font-bold';

export const input = {
  label: `border border-black shadow-card p-2 text-sm`,
  input: `block text-lg w-full`
}

export const btn = {
  empty: ``,
  full: ``
}

export const submitBtn = `
  block p-2 text-xl
  border-4 border-double border-black rounded-lg
  disabled:border-gray-500 disabled:text-gray-500
  songSubmit
`

export const setList = ``
