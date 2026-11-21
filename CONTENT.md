# 체험 콘텐츠 편집

`public/content.js`에서 학과 표시명, 안내 문구, 콘텐츠 상태와 문항을 관리합니다. `catalog`의 각 행은 학과 ID, 표시명, 시연 활동 이름, 첫 활동 카드 이름 순서입니다. 새 학과는 고유 ID로 행을 추가하세요. 문구만 고칠 때에는 기존 ID를 유지하세요. 현재 여덟 학과는 같은 진행 방식을 쓰는 카드 탐색 시연이며, 실제 전공 수업 자료는 아직 없습니다.

## 확정 문항 연결

1. 검토가 끝난 학과의 문항 배열을 `finalContent`에 학과 ID로 추가합니다. 아래는 구조 설명용 한 문항입니다.
2. `contentMode`를 만든 뒤 `contentMode.rail = 'final'`처럼 지정합니다. `departments`를 생성하기 전에 지정하세요. 최종 데이터를 비워 두면 해당 학과의 상태는 `unavailable`입니다.
3. 확정 활동의 소개는 `finalIntros`에 학과 ID로 추가합니다. 생략하면 학과명으로 간단히 인사합니다.
4. 문항을 추가하거나 제거한 뒤 데이터 버전 `CONTENT_VERSION`을 갱신합니다. 진행 수와 결과의 분모는 문항 배열 길이를 따릅니다.

```js
export const finalContent = {
  rail: [{
    id: 'activity-01',
    course: '확정 과목명',
    title: '검토된 미션 제목',
    lesson: '질문에 앞서 읽을 개념 설명',
    scene: '상황 설명',
    prompt: '상황에 적용할 질문',
    background: './assets/campus.png',
    portrait: './assets/jiwoo.png',
    choices: [
      { id: 'a', text: '첫 선택지', reaction: '첫 반응', explanation: '첫 해설', preference: null },
      { id: 'b', text: '둘째 선택지', reaction: '둘째 반응', explanation: '둘째 해설', preference: null },
      { id: 'c', text: '셋째 선택지', reaction: '셋째 반응', explanation: '셋째 해설', preference: null },
    ],
    recommended: 'b',
  }],
};
```

각 학과 ID는 전체에서, 문항 ID는 학과 안에서, 선택지 ID는 문항 안에서 고유해야 합니다. 불러올 때 `validateContent()`가 필수 문구, 자산 경로, 중복 ID, 선택지 수, 권장 답 참조, 문항 유무와 상태의 일치를 검사합니다. 다음 명령으로 브라우저 없이도 검사할 수 있습니다.

```sh
node --input-type=module < public/content.js
```

`demoContent`와 `finalContent`는 별도 데이터입니다. `preference`는 향후 **정답 없는 선호 선택**과 별도 기준이 확정되면 사용할 확장 필드입니다. 현재 선택에 가중치나 적합도 점수를 부여하지 않습니다.
