
import { useRef } from "react"
import { SpotLight, SpotLightHelper } from "three"
import { Helper, TransformControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useTweaks } from "../../hooks/use-tweaks"

export const Spotlight = ({ label }: { label: string }) => {

    const spotLightRef = useRef<SpotLight>(null!)
    const [{ x, y, z, color, intensity, distance, angle, penumbra, decay, castShadow, helper, controls }, setValue] = useTweaks(label, {
        x: { value: 0 },
        y: { value: 0 },
        z: { value: 0 },
        color: { value: '#ffffff' },
        intensity: { value: 1, min: 0, max: 500, step: 0.1 },
        distance: { value: 0, min: 0, step: 1 },
        angle: { value: Math.PI / 3, min: 0, max: Math.PI / 2, step: 0.01 },
        penumbra: { value: 0, min: 0, max: 1, step: 0.01 },
        decay: { value: 2, min: 0, max: 7, step: 0.1 },
        castShadow: { value: false },
        helper: { value: true },
        controls: { value: true }
    }, {
        print: true
    })

    useFrame(() => {
        spotLightRef.current.position.set(x, y, z)
    })

    return (
        <>
            {
                controls &&
                <TransformControls
                    position={[x, y, z]}
                    onObjectChange={(event) => {
                        if (event) {
                            const position = (event.target as any).object.position
                            setValue(label, 'x', position.x)
                            setValue(label, 'y', position.y)
                            setValue(label, 'z', position.z)
                        }
                    }} />
            }

            <spotLight
                ref={spotLightRef}
                color={color}
                intensity={intensity}
                distance={distance}
                castShadow={castShadow}
                angle={angle}
                penumbra={penumbra}
                decay={decay} >
                {
                    helper &&
                    <Helper type={SpotLightHelper} args={['#fff']} />
                }
            </spotLight>
        </>
    )
}