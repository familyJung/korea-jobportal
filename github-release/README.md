# 한국 정부 채용정보 통합 플랫폼

한국 중앙정부 25개 기관(19부, 3처, 5위원회)의 채용공고를 실시간으로 수집하고 통합하여 제공하는 웹 플랫폼입니다.

## 🌟 주요 기능

- **실시간 채용정보 수집**: 25개 정부기관 웹사이트를 5분마다 자동 모니터링
- **스마트 필터링**: 부처별, 직종별, 고용형태별 검색 및 필터링
- **접수기간 자동 관리**: 접수가 완료된 공고는 자동으로 제외
- **페이지네이션**: 페이지당 10개씩 깔끔한 목록 표시
- **상세정보 모달**: 채용공고 상세내용과 PDF 첨부파일 조회
- **통계 대시보드**: 총 채용공고, 긴급공고, 신규공고, 참여기관 수 실시간 표시
- **자동 데이터 정리**: 60일 이상 된 공고는 자동 삭제

## 🏛️ 지원 기관 (25개)

### 중앙행정기관 (19부)
- 기획재정부, 교육부, 과학기술정보통신부, 외교부, 통일부
- 법무부, 국방부, 행정안전부, 국가보훈부, 문화체육관광부
- 농림축산식품부, 산업통상자원부, 보건복지부, 환경부, 고용노동부
- 여성가족부, 국토교통부, 인사혁신처, 법제처

### 처 (3개)
- 식품의약품안전처

### 위원회 (5개)
- 공정거래위원회, 국민권익위원회, 금융위원회, 개인정보보호위원회, 원자력안전위원회

## 🛠️ 기술 스택

### Frontend
- **React 18** - UI 프레임워크
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 스타일링
- **shadcn/ui** - UI 컴포넌트 라이브러리
- **TanStack Query** - 서버 상태 관리
- **Wouter** - 라우팅

### Backend
- **Node.js** - 런타임 환경
- **Express.js** - 웹 프레임워크
- **TypeScript** - 타입 안전성
- **PostgreSQL** - 데이터베이스
- **Drizzle ORM** - 데이터베이스 ORM

### DevOps & Tools
- **Vite** - 빌드 도구
- **Drizzle Kit** - 데이터베이스 마이그레이션
- **Neon Database** - 서버리스 PostgreSQL

## 🚀 설치 및 실행

### 사전 요구사항
- Node.js 18.0.0 이상
- PostgreSQL 데이터베이스 (또는 Neon Database)

### 설치
```bash
git clone https://github.com/yourusername/korean-gov-jobs
cd korean-gov-jobs
npm install
```

### 환경 변수 설정
`.env` 파일을 생성하고 다음 변수를 설정하세요:
```bash
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

### 데이터베이스 설정
```bash
# 데이터베이스 스키마 생성
npm run db:push
```

### 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:5000`으로 접속하세요.

## 📁 프로젝트 구조

```
├── client/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/     # UI 컴포넌트
│   │   ├── pages/          # 페이지 컴포넌트
│   │   ├── hooks/          # 커스텀 훅
│   │   ├── lib/            # 유틸리티 라이브러리
│   │   └── types/          # TypeScript 타입 정의
├── server/                 # Express 백엔드
│   ├── routes.ts           # API 라우트
│   ├── storage.ts          # 데이터 액세스 레이어
│   ├── scraper.ts          # 웹 스크래핑 로직
│   ├── initializeData.ts   # 초기 데이터 설정
│   └── db.ts               # 데이터베이스 연결
├── shared/                 # 공유 타입 및 스키마
│   └── schema.ts           # Drizzle ORM 스키마
└── README.md
```

## 🔄 자동화 기능

### 웹 스크래핑
- **주기**: 5분마다 실행
- **대상**: 25개 정부기관 채용게시판
- **중복 방지**: 제목과 부처명으로 기존 공고 확인
- **신규 표시**: 새로 수집된 공고는 "신규" 태그로 표시

### 데이터 정리
- **주기**: 매일 자정
- **규칙**: 생성일로부터 60일 이상 된 공고 자동 삭제
- **로그**: 삭제된 공고 수 콘솔에 기록

## 📊 API 엔드포인트

- `GET /api/jobs` - 채용공고 목록 조회 (필터링, 페이지네이션 지원)
- `GET /api/jobs/:id` - 특정 채용공고 상세 조회
- `GET /api/statistics` - 통계 정보 조회
- `GET /api/pdfs/:filename` - PDF 파일 조회

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요.

---

**⚠️ 주의사항**: 이 프로젝트는 공개된 정부 채용정보를 수집하여 제공하는 목적으로 개발되었습니다. 실제 지원 시에는 반드시 해당 기관의 공식 웹사이트에서 최신 정보를 확인하시기 바랍니다.