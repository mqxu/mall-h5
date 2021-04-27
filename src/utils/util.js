import uuidv1 from "uuid/v1"
export function renameFile (fileName) {
    let originalName = fileName
    const index = originalName.lastIndexOf(".")
    const suffixName = originalName.substr(index)
    console.log(suffixName)
    let targetName = uuidv1() + originalName.substr(index)
    return targetName
}