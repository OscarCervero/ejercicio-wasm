// takeuchi.js

let wasmInstance = null;

async function getWasmInstance() {
    if (wasmInstance) return wasmInstance;

    try {
        // Carga recomendada para WebAssembly en navegadores
        const response = await fetch('./takeuchi.wasm');
        if (!response.ok) {
            throw new Error(`No se encontro takeuchi.wasm (HTTP ${response.status})`);
        }
        const bytes = await response.arrayBuffer();
        const { instance } = await WebAssembly.instantiate(bytes, {});
        wasmInstance = instance;
        return wasmInstance;
    } catch (e) {
        console.error("Error cargando WASM:", e);
        throw e;
    }
}

// 1. Version WASM
export async function takWasm(x, y, z) {
    const inst = await getWasmInstance();
    return inst.exports.tak(x | 0, y | 0, z | 0);
}

// 2. Version JS puro
export function takJS(x, y, z) {
    if (x <= y) {
        return y;
    }
    return takJS(
        takJS(x - 1, y, z),
        takJS(y - 1, z, x),
        takJS(z - 1, x, y)
    );
}