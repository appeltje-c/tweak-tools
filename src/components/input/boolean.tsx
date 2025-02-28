import { Checkbox } from "@mui/material"
import { useTweakStore } from "../../hooks/use-tweaks"
import { ChangeEvent } from "react"

export const BooleanInput = ({ label, storeKey }: { label: string, storeKey: string }) => {

    const { state, setValue } = useTweakStore()
    const tweak = state[label][storeKey]

    return (
        <Checkbox
            checked={tweak.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setValue(label, storeKey, event.target.checked)
            }} />
    )
}