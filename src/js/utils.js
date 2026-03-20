//export the APIs as internal functions

export async function getJson(name) {
    return window.resources.getJson(name);
}
export async function getCompletePath(name) {
    return window.resources.getCompletePath(name);
}
export async function editJson(name, content) {
    return window.resources.editJson(name, content);
}