/**
 * 洗牌算法
 */
export function shuffle(array: any[]) {
    // 创建数组副本以避免修改原数组
    const newArray = [...array]

    // 使用 Fisher-Yates 洗牌算法
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }

    return newArray
}
