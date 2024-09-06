export default async function checkFilledForm(newObj: any) {
    let exceptions = ["template", "status"]
    for (let key in newObj) {
        if (exceptions.includes(key)) continue;
        if (newObj[key] == '') return false
    }
    return true
}