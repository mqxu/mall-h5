import uuidv1 from "uuid/v1"

/**
 * 文件名重命名
 * @param {*} fileName 
 * @returns 
 */
export function renameFile (fileName) {
    const originalName = fileName   //原文件名
    const suffixName = originalName.substr(originalName.lastIndexOf(".")) //扩展名，如 .jpg
    console.log(suffixName)
    let targetName = uuidv1() + suffixName //uuid+扩展名=>新文件名
    return targetName
}