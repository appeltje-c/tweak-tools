import { TextField } from "@mui/material"
import { useTweakStore } from "../../hooks/use-tweaks"

export const Vector3Input = ({ storeKey }: { storeKey: string }) => {

    const { state, setValue } = useTweakStore()
    const tweak = state[storeKey]

    return (
        <TextField
            value={tweak.value}
            sx={{ width: 100 }}
            onChange={event => {
                setValue('', storeKey, Number(event.target.value))
            }}
            size="small" />
    )
}