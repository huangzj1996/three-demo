const generateRectangleMeta = (
    startPos: [number, number],
    w: number,
    h: number
) => {
    if (
        startPos &&
        Array.isArray(startPos) &&
        startPos.length >= 2 &&
        typeof w === 'number' &&
        typeof h === 'number'
    ) {
        const [a0, b0] = startPos
        const a1 = a0 + w
        const b1 = b0 + h
        return {
            startPos,
            w,
            h,
            endPos: [a1, b1],
            pos: [
                [a0, b0],
                [a1, b0],
                [a1, b1],
                [a0, b1]
            ]
        }
    } else {
        throw new Error('Please pass in the correct parameters')
    }
}

const generateCircleMeta = (pos: [number, number], r: number = 1) => {
    if (pos && Array.isArray(pos) && pos.length) {
        const [x, y] = pos
        return {
            startPos: [x - r, y - r],
            pos,
            r
        }
    } else {
        throw new Error('Please pass in the correct parameters')
    }
}

const generateLineMeta = (pos: [[number, number], [number, number]]) => {
    if (pos && Array.isArray(pos) && pos.length >= 2) {
        const [A, B] = pos
        const dx = B[0] - A[0]
        const dy = B[1] - A[1]
        const l = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
        const tanAB = dy / dx
        const AB = (Math.atan(tanAB) * 180) / Math.PI
        return {
            startPos: A,
            endPos: B,
            angle: AB,
            l
        }
    } else {
        throw new Error('Please pass in the correct parameters')
    }
}

const generateLinesMeta = (
    pos: [number, number][],
    isLine: boolean = false
) => {
    if (pos && Array.isArray(pos) && pos.length >= 2) {
        let i = 0,
            len = pos.length,
            result = []
        while (i < len) {
            if (isLine && !pos[i + 1]) {
                break
            }
            let A = pos[i]
            let B = pos[i + 1 > len - 1 ? 0 : i + 1]
            if (A[0] > B[0]) {
                ;[B, A] = [A, B]
            }
            const dx = B[0] - A[0]
            const dy = B[1] - A[1]
            const l = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
            const tanAB = dy / dx
            const AB = (Math.atan(tanAB) * 180) / Math.PI
            result.push({
                startPos: A,
                endPos: B,
                angle: AB,
                l
            })
            i++
        }

        return result
    } else {
        throw new Error('Please pass in the correct parameters')
    }
}
const getElPagePos = (el: HTMLElement) => {
    // ??????x??????
    let actualLeft = el.offsetLeft
    let actualTop = el.offsetTop
    let current = el.offsetParent as HTMLElement
    while (current != null) {
        actualLeft += current.offsetLeft
        actualTop += current.offsetTop
        current = current.offsetParent as HTMLElement
    }
    // ????????????
    return { x: actualLeft, y: actualTop }
}

export {
    generateRectangleMeta,
    generateCircleMeta,
    generateLineMeta,
    generateLinesMeta,
    getElPagePos
}
