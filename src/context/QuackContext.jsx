import React, { createContext, useState } from 'react'

const ctxValueDefault = {
    uid: localStorage.getItem('uid'),
    ducks: JSON.parse(localStorage.getItem('ducks') || '[]'),
    nests: JSON.parse(localStorage.getItem('nests') || '[]'),
    balance: JSON.parse(localStorage.getItem('balance') || '[]'),
    eggLevels: JSON.parse(localStorage.getItem('eggLevels')|| '[]'),
    isCollect: false
}
export const QuackCtx = createContext(ctxValueDefault)

export const QuackConsumer = QuackCtx.Consumer;

export default function QuackContext({children}) {
    const [ctxValue, setctxValue] = useState(ctxValueDefault)
    function updateContext(values) {
        setctxValue(pre => ({...pre, ...values}))
    }

    return (
        <QuackCtx.Provider value={{...ctxValue, updateContext}}>
            {children}
        </QuackCtx.Provider>
  )
}
