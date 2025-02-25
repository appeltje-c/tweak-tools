import { Matrix4 } from "three"

export const getType = ({ value }: { value: any }) => {

    let type: string = typeof value

    if (value instanceof Matrix4) {
        type = 'matrix4'
    }

    if (Array.isArray(value)) {
        console.info('array')
    }

    return type
}