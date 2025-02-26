import { TextField } from "@mui/material";
import { useTweakStore } from "../../hooks/use-tweaks"

const isColor = (color: string) => {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
}

export const StringInput = ({ storeKey }: { storeKey: string }) => {

    const { state, setValue } = useTweakStore()

    if (isColor(state[storeKey].value)) {

        return (
            <input
                type="color"
                value={state[storeKey].value}
                onChange={(event) => setValue(storeKey, event.target.value)} />
        )
    }

    return (
        <TextField
            value={state[storeKey].value}
            sx={{ width: 100 }}
            onChange={event => setValue(storeKey, event.target.value)}
            size="small" />
    )
}