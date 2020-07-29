export const readObject = data => {
    let id = Object.keys(data)[0];
    return {...data[id], id: id};
};

export const readObjects = data => {
    const objects = [];
    const keys = Object.keys(data);
    for (let idx = 0; idx < keys.length; idx++) {
        const id = keys[idx];
        const obj = data[id];
        obj.id = id;
        objects.push(obj);
    }
    return objects;
};