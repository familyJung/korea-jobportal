# 기여 가이드

한국 정부 채용정보 통합 플랫폼 프로젝트에 기여해 주셔서 감사합니다!

## 기여하기 전에

1. [Issues](https://github.com/yourusername/korean-gov-jobs/issues)를 확인하여 중복된 제안이나 버그 리포트가 없는지 확인해 주세요.
2. 새로운 기능을 추가하기 전에 이슈를 생성하여 논의해 주세요.

## 개발 환경 설정

### 필수 요구사항
- Node.js 18.0.0 이상
- PostgreSQL (또는 Neon Database 계정)

### 설정 단계
1. 저장소를 포크합니다
2. 로컬에 클론합니다:
   ```bash
   git clone https://github.com/yourusername/korean-gov-jobs.git
   cd korean-gov-jobs
   ```
3. 의존성을 설치합니다:
   ```bash
   npm install
   ```
4. 환경 변수를 설정합니다:
   ```bash
   cp .env.example .env
   # .env 파일을 편집하여 DATABASE_URL 등을 설정
   ```
5. 데이터베이스를 초기화합니다:
   ```bash
   npm run db:push
   ```
6. 개발 서버를 실행합니다:
   ```bash
   npm run dev
   ```

## 코딩 스타일

### TypeScript
- 모든 새로운 코드는 TypeScript로 작성해야 합니다
- `any` 타입 사용을 피하고 명시적인 타입을 정의하세요
- 컴포넌트는 함수형 컴포넌트를 사용하세요

### 스타일링
- Tailwind CSS 클래스를 우선적으로 사용하세요
- shadcn/ui 컴포넌트를 활용하세요
- 일관된 색상 테마를 유지하세요 (정부 블루 테마)

### 파일 구조
```
client/src/
├── components/     # 재사용 가능한 UI 컴포넌트
├── pages/          # 페이지 컴포넌트
├── hooks/          # 커스텀 훅
├── lib/            # 유틸리티 함수
└── types/          # 타입 정의

server/
├── routes.ts       # API 라우트
├── storage.ts      # 데이터 액세스
├── scraper.ts      # 웹 스크래핑
└── db.ts           # 데이터베이스 연결
```

## 커밋 메시지 가이드

다음 형식을 따라주세요:

```
type(scope): description

[optional body]

[optional footer]
```

### 타입
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅 (로직 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드 프로세스나 도구 변경

### 예시
```
feat(scraper): add support for new ministry website
fix(pagination): resolve page number display issue
docs(readme): update installation instructions
```

## Pull Request 가이드

1. 새로운 브랜치를 생성합니다:
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. 변경사항을 커밋합니다:
   ```bash
   git commit -m 'feat: add amazing feature'
   ```

3. 브랜치에 푸시합니다:
   ```bash
   git push origin feature/amazing-feature
   ```

4. Pull Request를 생성합니다:
   - 명확한 제목과 설명을 작성해주세요
   - 변경사항과 그 이유를 설명해주세요
   - 스크린샷이나 GIF가 있다면 포함해주세요

## 이슈 리포팅

버그를 발견하거나 기능 요청이 있으면 다음 정보를 포함하여 이슈를 생성해 주세요:

### 버그 리포트
- 문제 설명
- 재현 단계
- 예상 동작
- 실제 동작
- 환경 정보 (브라우저, OS 등)
- 스크린샷 (해당되는 경우)

### 기능 요청
- 기능에 대한 명확한 설명
- 사용 사례
- 대안 고려사항

## 웹 스크래핑 관련 기여

정부 웹사이트 스크래핑 로직을 개선할 때:

1. 해당 웹사이트의 robots.txt를 확인하세요
2. 과도한 요청을 피하기 위해 적절한 딜레이를 설정하세요
3. 웹사이트 구조 변경에 대비한 에러 핸들링을 포함하세요
4. 새로운 데이터 필드를 추가할 때는 데이터베이스 스키마도 업데이트하세요

## 테스트

- 새로운 기능에는 적절한 테스트를 포함해주세요
- 기존 테스트가 통과하는지 확인해주세요
- 가능한 경우 단위 테스트와 통합 테스트를 모두 작성해주세요

## 문의

질문이나 도움이 필요하면:
- GitHub Issues에 질문을 올려주세요
- 관련 이슈에 댓글을 달아주세요

감사합니다! 🙏