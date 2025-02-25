import { create } from 'zustand'
import { Fragment, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Grid2 as Grid, Paper, TextField } from '@mui/material'
import { immer } from 'zustand/middleware/immer'
import { Vector3 } from 'three'
import { Numbers } from '../components/numbers'
import { getType } from '../tools/types'

let tweaksInitialized = false

interface State {
    [key: string]: any
}

interface Store {
    state: State
    setProperty: (key: string, value: any) => void
    setValue: (key: string, value: any) => void
}

export const useTweakStore = create<Store>()(immer((set) => ({
    state: {},
    setProperty: (key, value) =>
        set((state) => ({
            state: {
                ...state.state,
                [key]: value,
            },
        })),
    setValue: (key: string, value: any) => set((state) => {
        state.state[key].value = value
    })
})))

export const useTweaks = (label: string, initialValues: State) => {

    // @todo order by labels 
    const { state, setProperty } = useTweakStore()

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

    return values
}

const isColor = (color: string) => {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
}

const RenderString = ({ stateKey }: { stateKey: string }) => {

    const { state, setValue } = useTweakStore()

    if (isColor(state[stateKey].value)) {

        return (
            <input
                type="color"
                value={state[stateKey].value}
                onChange={(event) => setValue(stateKey, event.target.value)} />
        )
    }

    return (
        <TextField
            value={state[stateKey].value}
            sx={{ width: 100 }}
            onChange={event => setValue(stateKey, event.target.value)}
            size="small" />
    )
}

const RenderMatrix4 = ({ stateKey }: { stateKey: string }) => {

    const { state } = useTweakStore()
    const position = new Vector3().setFromMatrixPosition(state[stateKey].value)

    return (
        <>
            x: {position.x}
        </>
    )
}

const Tweaks = () => {

    const { state } = useTweakStore()

    return (
        <Paper elevation={2} sx={{ position: 'absolute', zIndex: 100000, top: 10, right: 10, width: 300, m: 1, p: 1 }}>
            <Grid container>
                {
                    Object.keys(state).map(key => {

                        const type = getType(state[key].value)

                        return (
                            <Fragment key={key}>
                                <Grid size={4}>
                                    {key}
                                </Grid>
                                <Grid size={8}>
                                    {type === 'number' && <Numbers storeKey={key} />}
                                    {type === 'string' && <RenderString stateKey={key} />}
                                    {type === 'matrix4' && <RenderMatrix4 stateKey={key} />}
                                </Grid>
                            </Fragment>
                        )
                    })
                }
            </Grid>
        </Paper>
    )
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