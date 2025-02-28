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
    setProperty: (label: string, key: string, value: any) => void
    setValue: (label: string, key: string, value: any) => void
}

type StateWithSetter = [State, (label: string, key: string, value: any) => void]

export const useTweakStore = create<Store>()(immer((set) => ({
    state: {},
    setProperty: (label, key, value) =>
        set((state) => ({
            state: {
                ...state.state,
                [label]: {
                    ...state.state[label],
                    [key]: value,
                },
            },
        })),
    setValue: (label: string, key: string, value: any) => set(store => {
        store.state[label][key].value = value
    })
})))

export const useTweaks = (label: string, initialValues: State, options?: {}): StateWithSetter => {

    // @todo make key path with labels 
    const { state, setProperty, setValue } = useTweakStore()

    useEffect(() => {
        Object.keys(initialValues).forEach((key) => {
            setProperty(label, key, initialValues[key])
        })
    }, [])

    const values = Object.keys(initialValues).reduce((acc, key) => {
        acc[key] = state[label] ? state[label][key].value : undefined
        return acc
    }, {} as State)

    renderTweaks({ options })

    return [values, setValue]
}

const renderTweaks = ({ ...args }) => {

    useEffect(() => {

        if (!tweaksInitialized) {

            console.info('!tweaksInitialized')

            let domNode = document.getElementById('tweak__tools')
            if (!domNode) {
                domNode = document.createElement('div')
                domNode.id = 'tweak__tools'
                document.body.appendChild(domNode)
            }

            const root = createRoot(domNode)
            root.render(<Tweaks {...args} />)
            tweaksInitialized = true
        }
    }, [])
}