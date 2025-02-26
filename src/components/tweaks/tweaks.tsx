import { Grid2 as Grid, Paper } from "@mui/material"
import { useTweakStore } from "../../hooks/use-tweaks"
import { getType } from "../../tools/types"
import { Fragment } from "react/jsx-runtime"
import { NumberInput, StringInput } from "../input"
import { BooleanInput } from "../input/boolean"

export const Tweaks = () => {

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
                                    {type === 'number' && <NumberInput storeKey={key} />}
                                    {type === 'string' && <StringInput storeKey={key} />}
                                    {type === 'boolean' && <BooleanInput storeKey={key} />}
                                </Grid>
                            </Fragment>
                        )
                    })
                }
            </Grid>
        </Paper>
    )
}
