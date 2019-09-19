let seed = 0;
export default function GUID() {
    return `${Date.now()}_${seed++}`;
}