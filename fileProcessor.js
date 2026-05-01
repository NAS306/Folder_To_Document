import { isTextFile, readFile, generateStructureText } from './utils.js';

export async function handleFolderInput(e) {
    const excludeNodeModules = document.getElementById('excludeNodeModules').checked;
    const excludePackageJson = document.getElementById('excludePackageJson').checked;
    const excludePackageLock = document.getElementById('excludePackageLock').checked;
    document.getElementById('loadingMessage').style.display = 'block';

    const output = document.getElementById('output');
    const files = Array.from(e.target.files);
    
    let folderName = 'document';
    if (files.length > 0) {
        folderName = files[0].webkitRelativePath.split('/')[0];
        output.setAttribute('data-folder', folderName);
    }
    
    const structure = { name: 'root', children: [] };
    let validFiles = [];

    files.forEach(file => {
        const path = file.webkitRelativePath;
        if (
            (excludeNodeModules && path.includes('node_modules')) ||
            (excludePackageJson && path.endsWith('package.json')) ||
            (excludePackageLock && path.endsWith('package-lock.json'))
        ) {
            return;
        }

        validFiles.push(file);

        const pathParts = path.split('/');
        let currentLevel = structure.children;

        pathParts.slice(0, -1).forEach((part) => {
            let existing = currentLevel.find(child => child.name === part);
            if (!existing) {
                existing = { name: part, children: [] };
                currentLevel.push(existing);
            }
            currentLevel = existing.children;
        });

        currentLevel.push({
            name: pathParts[pathParts.length - 1],
            content: file
        });
    });

    const contentPromises = validFiles.map(async (file) => {
        if (isTextFile(file.name)) {
            const content = await readFile(file);
            return `\n\n=== 파일명: ${file.webkitRelativePath} ===\n${content}\n`;
        } else {
            return '';
        }
    });

    const contents = await Promise.all(contentPromises);
    const folderStructure = generateStructureText(structure.children);

    let mergedContent =
`=== 파일 구조 ===
${folderStructure}
`;

    mergedContent += contents.join('');

    // 기본 통합 문서 내용(메모 제외)을 전역 변수에 저장
    window.baseMergedContent = mergedContent;

    // 초기 출력: 만약 메모 입력칸에 내용이 있으면 메모와 함께, 없으면 기본 내용만
    const memoInput = document.getElementById('memoInput');
    if (memoInput && memoInput.value.trim() !== "") {
        output.textContent = `=== 중요 메모 ===\n${memoInput.value.trim()}\n\n` + mergedContent;
    } else {
        output.textContent = mergedContent;
    }

    document.getElementById('loadingMessage').style.display = 'none';
}
