// ui.js

export function toggleOption(btn) {
    const targetId = btn.getAttribute('data-target');
    const checkbox = document.getElementById(targetId);
    checkbox.checked = !checkbox.checked;

    const filename = btn.dataset.label || targetId.replace('exclude', '');
    if (checkbox.checked) {
        btn.classList.remove('active');
        btn.textContent = `❌${filename}`;
    } else {
        btn.classList.add('active');
        btn.textContent = `✅${filename}`;
    }
}

export function syncToggleButtons() {
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        const targetId = btn.dataset.target;
        const checkbox = document.getElementById(targetId);
        const filename = btn.dataset.label || targetId.replace('exclude', '');

        if (!checkbox.checked) {
            btn.classList.add('active');
            btn.textContent = `✅${filename}`;
        } else {
            btn.classList.remove('active');
            btn.textContent = `❌${filename}`;
        }
    });
}

export function copyText() {
    const output = document.getElementById('output');
    if (!output) return;

    const text = output.textContent;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => alert('Copied to clipboard!'))
            .catch(err => {
                fallbackCopy(text);
                alert('Copied (fallback)');
            });
    } else {
        fallbackCopy(text);
        alert('Copied (fallback)');
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';  // 화면에서 안 보이게
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}


export function downloadText() {
    const output = document.getElementById('output');
    const folderName = output.getAttribute('data-folder') || 'document';
    if (!output) return;
    const blob = new Blob([output.textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${folderName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}
