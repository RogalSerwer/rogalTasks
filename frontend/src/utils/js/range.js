export function range(start, end, step = 1) {
    const output = [];
    if (end != null)
    {
        for (let i = start; i<= end; i+=step) output.push(i);
    }
    return output
};