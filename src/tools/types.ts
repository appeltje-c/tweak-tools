import { Matrix4 } from "three"

export const getType = (value: any) => {

    let type: string = typeof value

    if (value instanceof Matrix4) {
        type = 'matrix4'
    }

    if (Array.isArray(value)) {
        if (value.length === 2) type = 'vector2'
        if (value.length === 3) type = 'vector3'
    }

    return type
}