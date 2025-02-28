import { TextField } from "@mui/material";
import { useTweakStore } from "../../hooks/use-tweaks"

const isColor = (color: string) => {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
}

export const StringInput = ({ label, storeKey }: { label: string, storeKey: string }) => {

    const { state, setValue } = useTweakStore()
    const tweak = state[label][storeKey]

    if (isColor(tweak.value)) {

        return (
            <input
                type="color"
                value={tweak.value}
                onChange={(event) => setValue(label, storeKey, event.target.value)} />
        )
    }

    return (
        <TextField
            value={tweak.value}
            sx={{ width: 100 }}
            onChange={event => setValue(label, storeKey, event.target.value)}
            size="small" />
    )
}