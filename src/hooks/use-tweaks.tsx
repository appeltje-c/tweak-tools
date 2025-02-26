import { create } from 'zustand'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { immer } from 'zustand/middleware/immer'
import { Tweaks } from '../components/tweaks/tweaks'

let tweaksInitialized = false

interface State {
    [key: string]: any
}
interface Store {
    state: State
    setProperty: (key: string, value: any) => void
    setValue: (key: string, value: any) => void
}

type StateWithSetter = [State, setValue: Function]

export const useTweakStore = create<Store>()(immer((set) => ({
    state: {},
    setProperty: (key, value) =>
        set((state) => ({
            state: {
                ...state.state,
                [key]: value,
            },
        })),
    setValue: (key: string, value: any) => set(store => {
        store.state[key].value = value
    })
})))

export const useTweaks = (label: string, initialValues: State): StateWithSetter => {

    // @todo make key path with labels 
    const { state, setProperty, setValue } = useTweakStore()

    useEffect(() => {

        Object.keys(initialValues).forEach((key) => {
            setProperty(key, initialValues[key])
        })
    }, [])

    const values = Object.keys(initialValues).reduce((acc, key) => {
        acc[key] = state[key] ? state[key].value : undefined
        return acc
    }, {} as State)

    renderTweaks()

    return [values, setValue]
}

const renderTweaks = () => {

    useEffect(() => {

        if (!tweaksInitialized) {
            let domNode = document.getElementById('tweak__tools')
            if (!domNode) {
                domNode = document.createElement('div')
                domNode.id = 'tweak__tools'
                document.body.appendChild(domNode)
            }

            const root = createRoot(domNode)
            root.render(<Tweaks />)
            tweaksInitialized = true
        }
    }, [])
}