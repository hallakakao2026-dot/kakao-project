# GitHub–Vercel 연결

현재는 게임 개발 전 배포 연결 확인용 정적 페이지입니다. 패키지 설치나 빌드 명령이 필요하지 않습니다.

## 처음 연결하기

1. Vercel에서 GitHub 계정으로 로그인합니다.
2. Add New → Project에서 `hallakakao2026-dot/kakao-project`를 Import합니다.
3. 저장소가 없으면 GitHub 앱 접근을 해당 저장소에 허용합니다.
4. Root Directory는 저장소 루트, Framework Preset은 Other로 설정합니다.
5. 빌드 명령은 비워 둡니다. Output Directory는 `public`입니다. 저장소의 `vercel.json`에 설정되어 있습니다.
6. Deploy를 누릅니다. Git 설정의 Production Branch가 `main`인지 확인합니다.
7. 배포 성공 후 실제 주소를 열어 ‘학과 체험 프로젝트 · 준비 중’이 표시되는지 확인합니다.

이 안내 파일이 존재하는 것만으로 Vercel 연결이나 배포가 완료된 것은 아닙니다.

## 이후 개발 흐름

- 작업을 시작할 때 GitHub의 최신 `main`과 기존 변경을 확인합니다.
- 개발 브랜치에서 작업하고, 필요한 검증 후 커밋·푸시합니다.
- Vercel Git 연동이 활성화되면 개발 브랜치/PR의 Preview 배포를 확인합니다. 프로젝트 보호 설정에 따라 로그인 권한이 필요할 수 있습니다.
- GitHub Pull Request에서 변경을 검토한 뒤 `main`에 병합하면 Production 배포가 실행됩니다.
- 매번 Vercel 배포 성공 여부와 실제 화면을 확인합니다. 푸시 성공은 배포 성공을 의미하지 않습니다.
- 프레임워크를 도입할 때는 `vercel.json`의 정적 페이지 설정을 실제 빌드에 맞게 변경합니다.
- 비밀 값은 커밋하지 않습니다. 필요한 경우 Vercel의 환경 변수 설정을 이용하며, 브라우저에 전달되는 값은 비밀로 취급할 수 없습니다.

Codex 환경의 Publish와 Vercel의 웹사이트 Deploy는 서로 다른 작업입니다.
