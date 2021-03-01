export function totalSum(items) {
    return items.reduce((prev, next) => {
        return prev + parseInt(next.price) * next.quantity
    }, 0)
}
