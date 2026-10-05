# Folder To Document

프로젝트 폴더의 파일 구조와 텍스트 파일 내용을 하나의 문서로 모으는 브라우저 도구입니다. 작은 프로젝트를 검토하거나 LLM에 프로젝트 문맥을 전달할 때 사용할 수 있습니다.

**[웹에서 실행](https://nas306.github.io/Folder_To_Document/)**

## 사용 방법

1. `Choose Folder`로 정리할 폴더를 선택합니다.
2. `node_modules`, `package.json`, `package-lock.json` 제외 옵션을 확인합니다. 옵션을 변경한 뒤에는 폴더를 다시 선택해 결과를 갱신합니다.
3. 필요한 설명을 메모에 입력합니다.
4. `Copy Text`로 복사하거나 `Download as .txt`로 저장합니다.

기본값은 `node_modules`와 `package-lock.json` 제외, `package.json` 포함입니다. 본문에 포함되는 확장자는 `txt`, `js`, `json`, `html`, `css`, `md`입니다. 그 외 파일은 구조 목록에는 나타날 수 있지만 본문은 합쳐지지 않습니다.

## 로컬 실행

저장소를 내려받아 정적 HTTP 서버의 루트로 사용하세요. 예를 들어 Python 3가 설치되어 있다면 저장소 폴더에서 실행합니다.

```sh
python -m http.server 8000 --bind 127.0.0.1
```

브라우저에서 `http://127.0.0.1:8000`을 엽니다. ES 모듈을 사용하므로 `index.html`을 `file://`로 직접 여는 방식보다 HTTP 실행을 권장합니다. 별도의 빌드나 npm 설치는 없습니다.

## 파일 구성

| 파일 | 역할 |
| --- | --- |
| [index.html](index.html) | 폴더 선택, 제외 옵션, 결과 화면 |
| [app.js](app.js) | 이벤트 연결과 초기화 |
| [fileProcessor.js](fileProcessor.js) | 제외 조건 적용, 파일 구조 생성, 본문 결합 |
| [utils.js](utils.js) | 확장자 판별, 파일 읽기, 구조 출력 |
| [ui.js](ui.js) | 옵션 표시, 복사, 다운로드 |
| [theme.js](theme.js) | 테마 전환 |
| [style.css](style.css) | 화면 스타일 |

## 데이터와 제약

- 선택한 파일은 브라우저의 FileReader로 읽습니다. 코드에 파일 내용을 서버로 업로드하는 처리 과정은 없습니다. 화면 글꼴은 Google Fonts에서 불러옵니다.
- API 키나 개인정보를 가리는 기능은 없습니다. 특히 JSON·JS 파일에 들어 있는 비밀정보를 포함한 채 다른 서비스에 전달하지 않도록 결과를 확인하세요.
- 많은 파일을 한 번에 메모리에서 처리하므로 대형 프로젝트에는 적합하지 않을 수 있습니다.
- 폴더 선택은 `webkitdirectory`를 사용하는 브라우저 기능에 의존합니다.

## 유지보수와 확인

텍스트 확장자를 추가할 때는 `utils.js`, 제외 조건을 변경할 때는 `fileProcessor.js`를 확인하세요. 기존 파일은 수정 전에 `파일명_BU.확장자`로 백업합니다. 현재 자동 테스트는 없습니다. 수정 후에는 작은 폴더로 파일 구조, 제외 옵션, 메모, 복사 및 TXT 다운로드를 확인하세요.
