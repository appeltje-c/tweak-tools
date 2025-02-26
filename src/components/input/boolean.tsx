import { Checkbox } from "@mui/material"
import { useTweakStore } from "../../hooks/use-tweaks"
import { ChangeEvent } from "react"

export const BooleanInput = ({ storeKey }: { storeKey: string }) => {

    const { state, setValue } = useTweakStore()
    const tweak = state[storeKey]

    return (
        <Checkbox
            checked={tweak.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setValue(storeKey, event.target.checked)
            }} />
    )
}