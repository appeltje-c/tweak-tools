import type { TweakInputProps, Vector3d, VectorObj } from '../../types'
import type { InternalVectorSettings } from '../Vector/vector-types'

export type InternalVector3dSettings = InternalVectorSettings<string, [string, string, string]>
export type Vector3dProps = TweakInputProps<Vector3d, InternalVector3dSettings, VectorObj>
