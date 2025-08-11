# 배포 가이드

GitHub에 코드를 올린 후 실제 웹사이트로 접속할 수 있도록 배포하는 방법들입니다.

## 현재 상황
- GitHub 저장소는 코드만 저장하는 곳입니다
- 실제 웹사이트를 보려면 서버에서 애플리케이션을 실행해야 합니다
- 다음 방법들로 배포할 수 있습니다

## 배포 옵션

### 1. Vercel (추천 - 무료)
가장 쉽고 빠른 방법입니다.

1. [vercel.com](https://vercel.com)에 가입
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. GitHub 저장소 선택 (`korean-gov-jobs`)
5. Framework Preset: "Vite" 선택
6. Environment Variables 설정:
   ```
   DATABASE_URL=your_neon_database_url
   ```
7. "Deploy" 클릭

**장점**: 무료, 자동 배포, 도메인 제공

### 2. Netlify (무료)
1. [netlify.com](https://netlify.com)에 가입
2. "New site from Git" 클릭
3. GitHub 저장소 연결
4. Build command: `npm run build`
5. Publish directory: `dist`
6. 환경변수 설정 후 배포

### 3. Railway (유료 - 백엔드 포함)
백엔드와 데이터베이스까지 모두 배포하려면:

1. [railway.app](https://railway.app)에 가입
2. "New Project" → "Deploy from GitHub repo"
3. 저장소 선택
4. 환경변수 설정
5. 자동 배포

### 4. Replit에서 직접 배포 (추천)
현재 Replit에서 작업 중이므로:

1. Replit에서 "Deploy" 버튼 클릭
2. "Static Site" 또는 "Autoscale" 선택
3. 자동으로 `.replit.app` 도메인 제공

## 환경변수 설정 필수사항

어떤 플랫폼을 사용하든 다음 환경변수가 필요합니다:

```
DATABASE_URL=postgresql://username:password@hostname:port/database
NODE_ENV=production
PORT=5000
```

## 데이터베이스 설정

### Neon Database (무료)
1. [neon.tech](https://neon.tech)에서 무료 계정 생성
2. 새 프로젝트 생성
3. Connection string 복사
4. 배포 플랫폼의 환경변수에 `DATABASE_URL`로 설정

### 배포 후 초기 설정
1. 배포 완료 후 사이트 접속
2. 데이터베이스 스키마 자동 생성 확인
3. 5분 후 첫 번째 채용공고 수집 시작

## 추천 배포 순서

1. **Neon Database** 생성 (무료)
2. **Vercel**에 프론트엔드 + 백엔드 배포 (무료)
3. 환경변수 설정
4. 도메인 연결 (선택사항)

이렇게 하면 `your-project.vercel.app` 같은 주소로 실제 웹사이트에 접속할 수 있습니다.

## 문제 해결

### 일반적인 오류들:
- **빌드 실패**: `package.json`의 스크립트 확인
- **환경변수 오류**: DATABASE_URL 설정 확인  
- **CORS 오류**: 백엔드 CORS 설정 확인

### 도움이 필요하면:
1. 어떤 배포 방법을 선택할지 알려주세요
2. 오류 메시지가 있다면 공유해 주세요
3. 단계별로 안내해 드리겠습니다

현재 Replit에서 실행 중인 애플리케이션을 그대로 배포하는 것이 가장 쉬운 방법입니다!