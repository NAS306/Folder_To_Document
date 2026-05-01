import { applyInitialTheme, toggleTheme } from './theme.js';
import { handleFolderInput } from './fileProcessor.js';
import { copyText, downloadText, toggleOption, syncToggleButtons } from './ui.js';

// 테마 초기화
applyInitialTheme();

// 테마 버튼 이벤트
document.getElementById('themeToggleBtn')?.addEventListener('click', toggleTheme);

// 폴더 선택 이벤트
const folderInput = document.getElementById('folderInput');
folderInput?.addEventListener('change', handleFolderInput);

// 토글 버튼 상태 초기화
window.addEventListener('DOMContentLoaded', syncToggleButtons);

// 메모 입력칸 blur 이벤트 - 메모가 닫힐 때마다 통합 문서에 반영
const memoInput = document.getElementById('memoInput');
memoInput.addEventListener('blur', updateMemoInOutput);

function updateMemoInOutput() {
    const memoText = memoInput.value.trim();
    const output = document.getElementById('output');
    // window.baseMergedContent는 파일 통합 시 저장된 기본 내용(메모 제외)
    if (window.baseMergedContent === undefined) {
        // 아직 파일이 로드되지 않았으면 아무것도 하지 않음
        return;
    }
    if (memoText !== "") {
        output.textContent = `=== 중요 메모 ===\n${memoText}\n\n` + window.baseMergedContent;
    } else {
        output.textContent = window.baseMergedContent;
    }
}

// 전역에서 HTML onclick 핸들러가 접근할 수 있도록 함수들을 window에 할당
window.toggleOption = toggleOption;
window.copyText = copyText;
window.downloadText = downloadText;

