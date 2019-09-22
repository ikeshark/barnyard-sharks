import React from 'react';

const styles = {
  wrapper: `
    flex flex-wrap justify-center -mx-2 md:mx-0 md:flex
  `,
  btn: `
    relative m-1 p-3 flex-grow
    border border-black rounded-10
    btn-toggle
  `,
  heading: `
    hidden md:block w-full -mb-1
    font-futura font-bold text-lg text-center
  `,
}


const VocalBtns = ({ sharks, filterView, vocalsFilter, filterByVocals }) => {
  const getName = uid => {
    if (sharks.active) {
      return sharks.active[uid].name;
    }
  }
  return (
    <div
      id="vocalsWrapper"
      className={filterView === 'vocals' ? styles.wrapper : styles.wrapper + "hidden"}
    >
      <h4 className={styles.heading}>
        VOCALIST FILTER
      </h4>
      <button
        type="button"
        onClick={filterByVocals}
        value="05x2qzOXABfcDkMGTClzDZxzBBt2"
        className={vocalsFilter === "05x2qzOXABfcDkMGTClzDZxzBBt2" ? styles.btn + " bg-deeppink text-white shadow-sm" : styles.btn}
      >
        {getName('05x2qzOXABfcDkMGTClzDZxzBBt2')}
      </button>
      <button
        type="button"
        onClick={filterByVocals}
        value="r6hSiQpBaNfqiPgKatywDJCDRL13"
        className={vocalsFilter === "r6hSiQpBaNfqiPgKatywDJCDRL13" ? styles.btn + " bg-deeppink text-white shadow-sm" : styles.btn}
      >
        {getName('r6hSiQpBaNfqiPgKatywDJCDRL13')}
      </button>
      <button
        type="button"
        onClick={filterByVocals}
        value="fUek7qwanvg3Sp8BJlp0NLswllO2"
        className={vocalsFilter === "fUek7qwanvg3Sp8BJlp0NLswllO2" ? styles.btn + " bg-deeppink text-white shadow-sm" : styles.btn}
      >
        {getName('fUek7qwanvg3Sp8BJlp0NLswllO2')}
      </button>
      <button
        type="button"
        onClick={filterByVocals}
        value="gang"
        className={vocalsFilter === "gang" ? styles.btn + " bg-deeppink text-white shadow-sm" : styles.btn}
      >
        Gang
      </button>
      <button
        type="button"
        onClick={filterByVocals}
        value="instrumental"
        className={vocalsFilter === "instrumental" ? styles.btn + " bg-deeppink text-white shadow-sm" : styles.btn}
      >
        Instrumental
      </button>
    </div>
  )
}
export default VocalBtns;
