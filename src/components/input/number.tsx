import { Slider, TextField } from "@mui/material"
import { useTweakStore } from "../../hooks/use-tweaks"

export const NumberInput = ({ storeKey }: { storeKey: string }) => {

    const { state, setValue } = useTweakStore()
    const tweak = state[storeKey]

    if (tweak.hasOwnProperty('min') && tweak.hasOwnProperty('max')) {

        return (
            <Slider
                size='small'
                valueLabelDisplay="auto"
                value={tweak.value}
                onChange={(_, newValue) => setValue(storeKey, newValue)}
                step={tweak.hasOwnProperty('step') ? tweak.step : 1}
                min={tweak.min}
                max={tweak.max} />
        )
    }

    return (
        <TextField
            type='number'
            value={tweak.value}
            sx={{ width: 100 }}
            onChange={event => setValue(storeKey, Number(event.target.value))}
            size="small" />
    )
}