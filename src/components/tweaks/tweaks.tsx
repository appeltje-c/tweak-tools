import { Grid2 as Grid, Paper } from "@mui/material"
import { useTweakStore } from "../../hooks/use-tweaks"
import { getType } from "../../tools/types"
import { Fragment } from "react/jsx-runtime"
import { NumberInput, StringInput } from "../input"
import { BooleanInput } from "../input/boolean"

export const Tweaks = ({ ...args }) => {

    const { state } = useTweakStore()
    const { options } = args

    return (
        <Paper elevation={2} sx={{ position: 'absolute', zIndex: 100000, top: 10, right: 10, width: 300, m: 1, p: 1 }}>
            <Grid container>
                {
                    Object.keys(state).map(label => {

                        return (
                            <Fragment key={label}>
                                <Grid size={12}>
                                    {label}
                                </Grid>
                                {
                                    Object.keys(state[label]).map(key => {

                                        const type = getType(state[label][key].value)

                                        return (
                                            <Fragment key={key}>
                                                <Grid size={4}>
                                                    {key}
                                                </Grid>
                                                <Grid size={8}>
                                                    {type === 'number' && <NumberInput label={label} storeKey={key} />}
                                                    {type === 'string' && <StringInput label={label} storeKey={key} />}
                                                    {type === 'boolean' && <BooleanInput label={label} storeKey={key} />}
                                                </Grid>
                                            </Fragment>
                                        )
                                    })
                                }
                            </Fragment>
                        )
                    })
                }

            </Grid>
        </Paper>
    )
}
