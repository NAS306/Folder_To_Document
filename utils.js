// utils.js

export function isTextFile(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    return ['txt', 'js', 'json', 'html', 'css', 'md'].includes(ext);
}

export function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsText(file);
    });
}

export function generateStructureText(nodes, indent = '') {
    let text = '';
    nodes.forEach(node => {
        if (node.children) {
            text += `${indent}📁 ${node.name}\n`;
            text += generateStructureText(node.children, indent + '  ');
        } else {
            text += `${indent}📄 ${node.name}\n`;
        }
    });
    return text;
}